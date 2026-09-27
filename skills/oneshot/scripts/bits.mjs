#!/usr/bin/env node
// bits.mjs — acceso a TODO el catálogo de React Bits desde la skill One-Shoot.
//
//   node bits.mjs sync                         clona/actualiza react-bits en ~/.oneshot/react-bits
//   node bits.mjs list [--cat X] [--q texto] [--cost light|medium|heavy] [--json]
//                                              lista componentes con descripción, deps, coste y avisos
//   node bits.mjs info <Nombre>                descripción, props, uso oficial, deps, avisos de rendimiento
//   node bits.mjs add <Nombre...> --project <dir> [--install]
//                                              copia la variante TS+Tailwind a <dir>/components/bits
//                                              (usa la versión parcheada de la skill si existe) y
//                                              opcionalmente instala dependencias
//   node bits.mjs catalog [--out file.md]      genera el catálogo completo en Markdown
//   node bits.mjs history                      webs anteriores (dirección + componentes) para no repetir
//   node bits.mjs log --name <web> --direction <id> --bits A,B,C [--url U]
//                                              registra la web entregada en el historial
//
// Sin dependencias: solo Node 18+ y git.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { homedir, tmpdir } from "node:os";
import { fileURLToPath, pathToFileURL } from "node:url";

const HOME = process.env.ONESHOT_HOME || join(homedir(), ".oneshot");
const RB = process.env.REACT_BITS_DIR || join(HOME, "react-bits");
const HISTORY = join(HOME, "history.json");
const SKILL = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PATCHED = join(SKILL, "template", "components", "bits");
const REPO = "https://github.com/DavidHDev/react-bits.git";

const args = process.argv.slice(2);
const cmd = args[0];
const flag = (n) => {
  const i = args.indexOf(`--${n}`);
  return i > -1 ? args[i + 1] : undefined;
};
const has = (n) => args.includes(`--${n}`);
const VALUE_FLAGS = ["project", "cat", "q", "cost", "out", "name", "direction", "bits", "url"];
const positional = args.slice(1).filter((a, i, arr) => !a.startsWith("--") && !(i > 0 && VALUE_FLAGS.includes(arr[i - 1].slice(2))));

function sync(quiet = false) {
  mkdirSync(HOME, { recursive: true });
  if (existsSync(join(RB, ".git"))) {
    try {
      execFileSync("git", ["-C", RB, "pull", "-q", "--ff-only"], { stdio: quiet ? "ignore" : "inherit" });
    } catch {
      if (!quiet) console.error("⚠ git pull falló; uso la copia local.");
    }
  } else {
    if (!quiet) console.error(`→ Clonando React Bits (solo código y metadatos) en ${RB} …`);
    // Clon parcial: el repo completo pesa >250 MB por los vídeos de la web de demos
    execFileSync("git", ["clone", "--depth", "1", "--filter=blob:none", "--sparse", "-q", REPO, RB], { stdio: "inherit" });
    execFileSync("git", ["-C", RB, "sparse-checkout", "set", "src/ts-tailwind", "src/constants", "src/demo"], { stdio: "inherit" });
  }
}
function ensure() {
  if (!existsSync(join(RB, "src", "constants", "Information.js"))) sync();
}

// ---------- metadatos ----------
async function loadMeta() {
  ensure();
  const src = readFileSync(join(RB, "src", "constants", "Information.js"), "utf8");
  const tmp = join(tmpdir(), `oneshot-info-${process.pid}.mjs`);
  writeFileSync(tmp, src);
  const mod = await import(pathToFileURL(tmp).href);
  return mod.componentMetadata || mod.default;
}

const tsxPath = (key) => {
  const [cat, name] = key.split("/");
  const dir = join(RB, "src", "ts-tailwind", cat, name);
  return existsSync(dir) ? dir : null;
};

function codeInfo(key) {
  const [cat] = key.split("/");
  const dir = join(RB, "src", "constants", "code", cat);
  if (!existsSync(dir)) return {};
  for (const f of readdirSync(dir)) {
    const s = readFileSync(join(dir, f), "utf8");
    if (!s.includes(`@ts-tailwind/${key}/`) && !s.includes(`/${key}/`)) continue;
    const deps = (s.match(/dependencies:\s*`([^`]*)`/) || [])[1];
    const usage = (s.match(/usage:\s*`([\s\S]*?)`\s*,\s*\n/) || [])[1];
    return { deps: deps ? deps.trim().split(/\s+/).filter(Boolean) : [], usage: usage?.trim() };
  }
  return {};
}

function propInfo(key) {
  const [cat, name] = key.split("/");
  const f = join(RB, "src", "demo", cat, `${name}Demo.jsx`);
  if (!existsSync(f)) return [];
  const s = readFileSync(f, "utf8");
  const block = (s.match(/propData\s*=\s*useMemo\(\s*\(\)\s*=>\s*\[([\s\S]*?)\]\s*,\s*\[/) || s.match(/propData\s*=\s*\[([\s\S]*?)\];/) || [])[1];
  if (!block) return [];
  const props = [];
  const re = /\{\s*name:\s*['"`]([^'"`]+)['"`]\s*,\s*type:\s*['"`]([^'"`]*)['"`]\s*,\s*default:\s*(['"`])([\s\S]*?)\3\s*,\s*description:\s*(['"`])([\s\S]*?)\5\s*\}/g;
  let m;
  while ((m = re.exec(block))) props.push({ name: m[1], type: m[2], default: m[4], description: m[6] });
  return props;
}

const HEAVY = ["three", "ogl", "@react-three/fiber", "@react-three/drei", "@react-three/rapier", "postprocessing", "face-api.js", "meshline", "maath", "gl-matrix"];
function analyse(key) {
  const dir = tsxPath(key);
  const code = codeInfo(key);
  let src = "";
  if (dir) for (const f of readdirSync(dir)) if (/\.(tsx?|css)$/.test(f)) src += readFileSync(join(dir, f), "utf8");
  const importDeps = [...src.matchAll(/from\s+['"]([^./'"][^'"]*)['"]/g)]
    .map((m) => m[1])
    .map((d) => (d.startsWith("@") ? d.split("/").slice(0, 2).join("/") : d.split("/")[0]))
    .filter((d) => d !== "react" && d !== "react-dom");
  const deps = [...new Set([...(code.deps || []), ...importDeps])];
  const warn = [];
  if (/\b(min-h-screen|h-screen|w-screen|100vh|100vw)\b/.test(src)) warn.push("asume pantalla completa (h-screen/w-screen): ajustar tamaño al contenedor");
  if (/requestAnimationFrame|useAnimationFrame|useFrame\(|gsap\.ticker/.test(src)) warn.push("bucle por frame: pausar fuera de pantalla (useInViewRef)");
  if (/set[A-Z]\w*\([^)]*\)\s*;?\s*\n?[^}]*requestAnimationFrame/.test(src)) warn.push("posible setState por frame: revisar");
  if (/mix-blend|backdrop-filter|blur\(\s*[3-9]\d|blur-\[\d{3}/.test(src)) warn.push("blend/blur costoso: evitar a pantalla completa en móvil");
  if (/Cursor/.test(key)) warn.push("efecto de cursor: inútil en táctil → solo (hover:hover)");
  if (/putImageData|getImageData/.test(src)) warn.push("manipula píxeles de canvas por frame: muy caro");
  if (/Math\.random|Date\.now\(|new Date\(/.test(src)) warn.push("usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false })");
  const heavy = deps.some((d) => HEAVY.includes(d)) || /WebGL|webgl|getContext\(['"]webgl/.test(src);
  const cost = heavy ? "heavy" : deps.some((d) => ["gsap", "motion", "framer-motion", "lenis", "matter-js", "@use-gesture/react"].includes(d)) || warn.some((w) => w.startsWith("bucle")) ? "medium" : "light";
  const patched = existsSync(join(PATCHED, `${key.split("/")[1]}.tsx`));
  return { deps, warn: patched ? [] : warn, cost, usage: code.usage, hasTs: !!dir, patched };
}
const COST = { light: "🟢", medium: "🟡", heavy: "🔴" };

async function list() {
  const meta = await loadMeta();
  const cat = flag("cat")?.toLowerCase();
  const q = flag("q")?.toLowerCase();
  const cost = flag("cost");
  const rows = [];
  for (const [key, m] of Object.entries(meta)) {
    if (cat && !key.toLowerCase().startsWith(cat)) continue;
    const hay = `${key} ${m.description} ${(m.tags || []).join(" ")}`.toLowerCase();
    if (q && !q.split(/\s+/).every((w) => hay.includes(w))) continue;
    const a = analyse(key);
    if (!a.hasTs) continue;
    if (cost && a.cost !== cost) continue;
    rows.push({ key, description: m.description, tags: m.tags || [], ...a, usage: undefined });
  }
  if (has("json")) return console.log(JSON.stringify(rows, null, 1));
  let last = "";
  for (const r of rows) {
    const c = r.key.split("/")[0];
    if (c !== last) console.log(`\n## ${(last = c)}`);
    console.log(`${COST[r.cost]} ${r.key.split("/")[1]}${r.patched ? " ✚parcheado" : ""} — ${r.description}` + (r.deps.length ? ` [${r.deps.join(", ")}]` : "") + (r.warn.length ? ` ⚠ ${r.warn.join("; ")}` : ""));
  }
  console.log(`\n${rows.length} componentes. 🟢 ligero · 🟡 JS/animación (pausar fuera de pantalla) · 🔴 WebGL (solo desktop + fallback)`);
}

async function info() {
  const meta = await loadMeta();
  for (const want of positional) {
    const key = Object.keys(meta).find((k) => k.toLowerCase() === want.toLowerCase() || k.split("/")[1].toLowerCase() === want.toLowerCase());
    if (!key) {
      console.log(`✗ ${want}: no existe. Prueba: node bits.mjs list --q ${want}`);
      continue;
    }
    const m = meta[key];
    const a = analyse(key);
    const props = propInfo(key);
    console.log(`\n# ${key} ${COST[a.cost]} ${a.cost}${a.patched ? "  (✚ versión parcheada disponible en la skill)" : ""}`);
    console.log(m.description);
    if (m.tags?.length) console.log(`tags: ${m.tags.join(", ")}`);
    console.log(`docs: ${m.docsUrl}`);
    console.log(`deps: ${a.deps.join(" ") || "ninguna"}`);
    if (a.warn.length) console.log(`avisos: \n  - ${a.warn.join("\n  - ")}`);
    if (props.length) {
      console.log(`\nprops:`);
      for (const p of props) console.log(`  ${p.name}: ${p.type} = ${p.default} — ${p.description}`);
    }
    if (a.usage) console.log(`\nuso oficial:\n${a.usage}`);
  }
}

// Adapta código escrito para tipos de React 19 a un proyecto con React 18 (Next 14)
function toReact18(s) {
  return s
    .replace(/RefObject<([^<>]+?)\s*\|\s*null>/g, "RefObject<$1>")
    .replace(/React\.RefObject<([^<>]+?)\s*\|\s*null>/g, "React.RefObject<$1>");
}

function projectReactMajor(project) {
  try {
    const pkg = JSON.parse(readFileSync(join(project, "package.json"), "utf8"));
    return parseInt(String(pkg.dependencies?.react || "18").replace(/[^\d.]/g, ""), 10) || 18;
  } catch {
    return 18;
  }
}

function add() {
  ensure();
  const project = resolve(flag("project") || ".");
  const react18 = projectReactMajor(project) < 19;
  const dest = join(project, "components", "bits");
  mkdirSync(dest, { recursive: true });
  const deps = new Set();
  const index = readdirSync(join(RB, "src", "ts-tailwind"));
  for (const want of positional) {
    let key;
    for (const c of index) {
      const n = readdirSync(join(RB, "src", "ts-tailwind", c)).find((x) => x.toLowerCase() === want.toLowerCase());
      if (n) key = `${c}/${n}`;
    }
    if (!key) {
      console.log(`✗ ${want}: no encontrado`);
      continue;
    }
    const name = key.split("/")[1];
    const a = analyse(key);
    a.deps.forEach((d) => deps.add(d));
    const patched = join(PATCHED, `${name}.tsx`);
    if (existsSync(patched)) {
      copyFileSync(patched, join(dest, `${name}.tsx`));
      console.log(`✓ ${name} (versión parcheada de la skill)`);
    } else {
      const dir = tsxPath(key);
      for (const f of readdirSync(dir)) {
        const p = join(dir, f);
        if (statSync(p).isDirectory()) continue;
        let s = readFileSync(p, "utf8");
        if (/\.tsx?$/.test(f) && !/^['"]use client['"]/.test(s.trimStart())) s = `'use client';\n${s}`;
        if (react18 && /\.tsx?$/.test(f)) s = toReact18(s);
        // Código de terceros: sus tipos internos se escriben para otros entornos (React 19, DOM vs Node timers…)
        // y rompen `next build`. Se desactiva el chequeo DENTRO del fichero; sus props exportadas siguen tipadas.
        // (@ts-nocheck debe ir antes de cualquier sentencia, incluido 'use client'; los comentarios sí pueden precederlo)
        if (/\.tsx?$/.test(f) && !s.includes("@ts-nocheck")) s = `// @ts-nocheck — componente de React Bits copiado tal cual (ver skill One-Shoot)\n${s}`;
        writeFileSync(join(dest, f), s);
      }
      console.log(`✓ ${name} ${COST[a.cost]}`);
    }
    if (a.warn.length && !existsSync(patched)) a.warn.forEach((w) => console.log(`   ⚠ ${w}`));
    if (a.deps.includes("gsap") || a.deps.includes("@gsap/react")) deps.add("@gsap/react");
  }
  if (existsSync(join(dest, "..", "useInViewPause.ts")) === false && existsSync(join(SKILL, "template", "components", "useInViewPause.ts"))) {
    copyFileSync(join(SKILL, "template", "components", "useInViewPause.ts"), join(dest, "..", "useInViewPause.ts"));
  }
  // React 18 (Next 14) no es compatible con @react-three/fiber 9 / drei 10 → fijar versiones compatibles
  const pin = react18 ? { "@react-three/fiber": "@react-three/fiber@^8", "@react-three/drei": "@react-three/drei@^9", "@react-three/rapier": "@react-three/rapier@^1" } : {};
  const list = [...deps].filter((d) => d && d !== "react").map((d) => pin[d] || d);
  if (!list.length) return console.log("deps: ninguna nueva");
  console.log(`deps: npm i ${list.join(" ")}`);
  const needsThreeTypes = list.some((d) => d === "three" || d.startsWith("three@"));
  if (has("install")) {
    const npm = (a) => execFileSync("npm", a, { cwd: project, stdio: "inherit", shell: process.platform === "win32" });
    npm(["i", ...list]);
    if (needsThreeTypes) npm(["i", "-D", "@types/three"]);
  } else if (needsThreeTypes) console.log("dev: npm i -D @types/three");
}

async function catalog() {
  const meta = await loadMeta();
  let md = `# Catálogo completo de React Bits\n\nGenerado con \`node scripts/bits.mjs catalog\` desde ${REPO}. Regenerar cuando el repo crezca.\n\nCoste: 🟢 ligero (DOM/CSS) · 🟡 JS/animación (pausar fuera de pantalla) · 🔴 WebGL (solo desktop con fallback estático). ✚ = hay versión parcheada en \`template/components/bits\`.\n`;
  let last = "";
  let n = 0;
  for (const [key, m] of Object.entries(meta)) {
    const a = analyse(key);
    if (!a.hasTs) continue;
    const [c, name] = key.split("/");
    if (c !== last) md += `\n## ${(last = c)}\n\n| | Componente | Qué hace | Deps | Avisos |\n|---|---|---|---|---|\n`;
    md += `| ${COST[a.cost]} | **${name}**${a.patched ? " ✚" : ""} | ${m.description.replace(/\|/g, "/")} | ${a.deps.join(", ") || "—"} | ${a.warn.join("; ") || ""} |\n`;
    n++;
  }
  md += `\n_${n} componentes._\n`;
  const out = flag("out");
  if (out) {
    writeFileSync(out, md);
    console.log(`✓ ${n} componentes → ${out}`);
  } else console.log(md);
}

function readHistory() {
  try {
    return JSON.parse(readFileSync(HISTORY, "utf8"));
  } catch {
    return [];
  }
}
function history() {
  const h = readHistory();
  if (!h.length) return console.log("Historial vacío: esta es la primera web. Libertad total.");
  const count = {};
  for (const e of h) for (const b of e.bits) count[b] = (count[b] || 0) + 1;
  console.log("Webs anteriores (más reciente primero):");
  for (const e of [...h].reverse().slice(0, 8)) console.log(`- ${e.date} · ${e.name} · dirección: ${e.direction} · ${e.bits.join(", ")}${e.url ? ` · ${e.url}` : ""}`);
  const top = Object.entries(count).sort((a, b) => b[1] - a[1]).slice(0, 12);
  console.log(`\nComponentes más usados (evita repetirlos salvo que sean claramente lo mejor): ${top.map(([k, v]) => `${k}×${v}`).join(", ")}`);
  const last = h[h.length - 1];
  console.log(`Última dirección: ${last.direction} → elige otra distinta.`);
}
function log() {
  const h = readHistory();
  const e = {
    date: new Date().toISOString().slice(0, 10),
    name: flag("name") || "sin-nombre",
    direction: flag("direction") || "?",
    bits: (flag("bits") || "").split(",").map((s) => s.trim()).filter(Boolean),
    url: flag("url"),
  };
  h.push(e);
  mkdirSync(HOME, { recursive: true });
  writeFileSync(HISTORY, JSON.stringify(h, null, 1));
  console.log(`✓ registrado en ${HISTORY}`);
}

const cmds = { sync: () => sync(), list, info, add, catalog, history, log };
if (!cmds[cmd]) {
  console.log(readFileSync(fileURLToPath(import.meta.url), "utf8").split("\n").slice(1, 18).map((l) => l.replace(/^\/\/ ?/, "")).join("\n"));
  process.exit(cmd ? 1 : 0);
}
await cmds[cmd]();
