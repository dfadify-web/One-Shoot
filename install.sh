#!/usr/bin/env bash
# Instalación manual de la skill One-Shoot (/oneshot) (macOS / Linux / Git Bash en Windows).
# Uso:  curl -fsSL https://raw.githubusercontent.com/dfadify-web/One-Shoot/main/install.sh | bash
#   o, desde un clon del repo:  ./install.sh
set -euo pipefail

REPO="https://github.com/dfadify-web/One-Shoot.git"
DEST="${CLAUDE_SKILLS_DIR:-$HOME/.claude/skills}/oneshot"

here="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" 2>/dev/null && pwd || true)"
if [ -n "$here" ] && [ -f "$here/skills/oneshot/SKILL.md" ]; then
  src="$here/skills/oneshot"
else
  tmp="$(mktemp -d)"
  trap 'rm -rf "$tmp"' EXIT
  git clone --depth 1 "$REPO" "$tmp/repo" >/dev/null
  src="$tmp/repo/skills/oneshot"
fi

mkdir -p "$(dirname "$DEST")"
rm -rf "$DEST"
cp -R "$src" "$DEST"

if command -v npm >/dev/null 2>&1; then
  echo "→ Instalando dependencias de los scripts (puppeteer-core, sharp)…"
  npm install --prefix "$DEST/scripts" --no-audit --no-fund --silent || echo "⚠ npm install falló; ejecútalo luego en $DEST/scripts"
else
  echo "⚠ No hay npm. Instala Node.js 18+ y ejecuta: npm install --prefix \"$DEST/scripts\""
fi

command -v ffmpeg >/dev/null 2>&1 || echo "ℹ ffmpeg no encontrado: solo hace falta si vas a optimizar vídeos."

# Precarga React Bits (clon parcial ~14 MB) para que el primer /oneshot vaya directo
if command -v node >/dev/null 2>&1; then
  node "$DEST/scripts/bits.mjs" sync || echo "ℹ React Bits se descargará en el primer uso."
fi

echo "✓ One-Shoot instalada en $DEST"
echo "  Reinicia Claude Code y usa /oneshot (o pide: \"crea una landing para mi negocio con estos assets y esta paleta\")."
