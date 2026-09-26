// Chequeo móvil real (emulación iPhone con el Chrome instalado) + capturas + FPS de scroll.
// Uso: node mobile-check.mjs <url> [prefijo=m] [nCapturas=8] [--desktop]
// Salida: JSON con desbordes horizontales, FPS en scroll, errores de consola; capturas <prefijo>-N.png en el cwd.
import puppeteer from "puppeteer-core";
import { existsSync } from "node:fs";

const [url = "http://localhost:3000/", out = "m", n = "8"] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const desktop = process.argv.includes("--desktop");
const CANDIDATES = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  `${process.env.LOCALAPPDATA}/Google/Chrome/Application/chrome.exe`,
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "/snap/bin/chromium",
];
const CHROME = CANDIDATES.find((p) => p && existsSync(p));
if (!CHROME) {
  console.error("No encuentro Chrome/Chromium/Edge. Exporta CHROME_PATH con la ruta del ejecutable.");
  process.exit(1);
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--autoplay-policy=no-user-gesture-required"] });
const page = await browser.newPage();
if (desktop) await page.setViewport({ width: 1440, height: 900 });
else
  await page.emulate({
    viewport: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  });

const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
await new Promise((r) => setTimeout(r, 1500));

const layout = await page.evaluate(() => {
  const w = document.documentElement.clientWidth;
  const offenders = [...document.querySelectorAll("body *")]
    .filter((el) => el.getBoundingClientRect().right > w + 1 && getComputedStyle(el).position !== "fixed")
    .slice(0, 10)
    .map((el) => `${el.tagName}.${String(el.className).slice(0, 70)} → ${Math.round(el.getBoundingClientRect().right)}px`);
  return { clientW: w, scrollW: document.documentElement.scrollWidth, pageH: document.documentElement.scrollHeight, offenders };
});
console.log("layout", JSON.stringify(layout, null, 1));
if (layout.scrollW > layout.clientW) console.log("!! HAY SCROLL HORIZONTAL");

const step = desktop ? 850 : 800;
for (let i = 0; i < Number(n); i++) {
  await page.evaluate((y) => window.scrollTo(0, y), i * step);
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: `${out}-${i}.png` });
}

const scroll = await page.evaluate(async () => {
  window.scrollTo(0, 0);
  let frames = 0, long = 0, last = performance.now();
  const t0 = last;
  await new Promise((res) => {
    const f = (t) => {
      frames++;
      if (t - last > 50) long++;
      last = t;
      window.scrollBy(0, 12);
      if (t - t0 < 4000) requestAnimationFrame(f);
      else res();
    };
    requestAnimationFrame(f);
  });
  return { fps: Math.round(frames / 4), longFrames: long };
});
console.log("scroll", JSON.stringify(scroll));
console.log("errors", JSON.stringify(errors));
await browser.close();
