# Instalación manual de la skill One-Shoot (/oneshot) en Windows (PowerShell 5.1+).
# Uso:  irm https://raw.githubusercontent.com/dfadify-web/One-Shoot/main/install.ps1 | iex
#   o, desde un clon del repo:  .\install.ps1
$ErrorActionPreference = "Stop"

$Repo = "https://github.com/dfadify-web/One-Shoot.git"
$SkillsDir = if ($env:CLAUDE_SKILLS_DIR) { $env:CLAUDE_SKILLS_DIR } else { Join-Path $HOME ".claude\skills" }
$Dest = Join-Path $SkillsDir "oneshot"

$Src = $null
if ($PSScriptRoot -and (Test-Path (Join-Path $PSScriptRoot "skills\oneshot\SKILL.md"))) {
  $Src = Join-Path $PSScriptRoot "skills\oneshot"
} else {
  if (-not (Get-Command git -ErrorAction SilentlyContinue)) { throw "Necesitas git instalado." }
  $Tmp = Join-Path ([IO.Path]::GetTempPath()) ("oneshot-" + [guid]::NewGuid())
  git clone --depth 1 $Repo $Tmp | Out-Null
  $Src = Join-Path $Tmp "skills\oneshot"
}

New-Item -ItemType Directory -Force $SkillsDir | Out-Null
if (Test-Path $Dest) { Remove-Item -Recurse -Force $Dest }
Copy-Item -Recurse $Src $Dest

if (Get-Command npm -ErrorAction SilentlyContinue) {
  Write-Host "-> Instalando dependencias de los scripts (puppeteer-core, sharp)..."
  npm install --prefix (Join-Path $Dest "scripts") --no-audit --no-fund --silent
} else {
  Write-Host "! No hay npm. Instala Node.js 18+ y ejecuta: npm install --prefix `"$Dest\scripts`""
}
if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
  Write-Host "i ffmpeg no encontrado: solo hace falta si vas a optimizar videos (winget install Gyan.FFmpeg)."
}
if ($Tmp -and (Test-Path $Tmp)) { Remove-Item -Recurse -Force $Tmp }

# Precarga React Bits (clon parcial ~14 MB) para que el primer /oneshot vaya directo
if (Get-Command node -ErrorAction SilentlyContinue) {
  try { node (Join-Path $Dest "scripts\bits.mjs") sync } catch { Write-Host "i React Bits se descargara en el primer uso." }
}

Write-Host "OK One-Shoot instalada en $Dest"
Write-Host "   Reinicia Claude Code y usa /oneshot."
