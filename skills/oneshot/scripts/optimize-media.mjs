// Optimiza los assets del cliente para web. NO recorta nunca: conserva la proporción e imprime el ratio
// para que la maqueta se adapte a la foto (no la foto a la maqueta).
// Uso: node optimize-media.mjs <carpetaAssets> <proyecto>/public/media [--suffix=v1]
//   imágenes (jpg/png/webp/heic*) → <nombre>-<suffix>.webp (máx 1200px lado largo, q74)
//   vídeos (mp4/mov/webm)         → <nombre>-<suffix>.mp4 (H.264 crf27, sin audio, faststart)
//                                   + .webm (VP9 crf38) + <nombre>-<suffix>-poster.webp (primer frame)
// Requiere ffmpeg en PATH para vídeo. Los originales no se tocan.
import sharp from "sharp";
import { execFileSync } from "node:child_process";
import { readdirSync, mkdirSync, statSync } from "node:fs";
import { join, extname, basename } from "node:path";

const [src, dst] = process.argv.slice(2);
const suffix = (process.argv.find((a) => a.startsWith("--suffix=")) || "--suffix=v1").split("=")[1];
if (!src || !dst) {
  console.error("Uso: node optimize-media.mjs <carpetaAssets> <public/media> [--suffix=v1]");
  process.exit(1);
}
mkdirSync(dst, { recursive: true });

const slug = (s) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "img";
const kb = (f) => Math.round(statSync(f).size / 1024) + "KB";

for (const f of readdirSync(src)) {
  const p = join(src, f);
  if (statSync(p).isDirectory()) continue;
  const ext = extname(f).toLowerCase();
  const name = `${slug(basename(f, ext))}-${suffix}`;

  if ([".jpg", ".jpeg", ".png", ".webp", ".avif"].includes(ext)) {
    const meta = await sharp(p).metadata();
    const out = join(dst, `${name}.webp`);
    await sharp(p).rotate().resize({ width: 1200, height: 1200, fit: "inside", withoutEnlargement: true }).webp({ quality: 74 }).toFile(out);
    const { data } = await sharp(p).resize(4, 4).raw().toBuffer({ resolveWithObject: true });
    console.log(
      `IMG ${f} ${meta.width}x${meta.height} ratio=${(meta.width / meta.height).toFixed(4)} ` +
        `fondo≈rgb(${data[0]},${data[1]},${data[2]}) → ${out} ${kb(out)}`
    );
  } else if ([".mp4", ".mov", ".webm", ".m4v"].includes(ext)) {
    const mp4 = join(dst, `${name}.mp4`), webm = join(dst, `${name}.webm`), jpg = join(dst, `${name}-poster.jpg`);
    const ff = (args) => execFileSync("ffmpeg", ["-v", "error", "-y", ...args], { stdio: "inherit" });
    ff(["-i", p, "-an", "-c:v", "libx264", "-profile:v", "high", "-preset", "slow", "-crf", "27", "-pix_fmt", "yuv420p", "-vf", "scale='min(1080,iw)':-2", "-movflags", "+faststart", mp4]);
    ff(["-i", p, "-an", "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "38", "-row-mt", "1", "-deadline", "good", "-cpu-used", "2", "-vf", "scale='min(1080,iw)':-2", webm]);
    ff(["-i", p, "-frames:v", "1", "-q:v", "3", jpg]);
    const poster = join(dst, `${name}-poster.webp`);
    await sharp(jpg).resize({ width: 720, withoutEnlargement: true }).webp({ quality: 60 }).toFile(poster);
    const meta = await sharp(jpg).metadata();
    console.log(`VID ${f} ${meta.width}x${meta.height} ratio=${(meta.width / meta.height).toFixed(4)} → ${mp4} ${kb(mp4)} | ${webm} ${kb(webm)} | ${poster} ${kb(poster)}`);
    console.log(`    (borra ${jpg} si no lo necesitas; el color de fondo del vídeo sirve de bg del contenedor)`);
  } else {
    console.log(`-- ignorado: ${f}`);
  }
}
