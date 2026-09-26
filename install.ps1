# Instalación manual de la skill lizard-bits en Windows (PowerShell 5.1+).
# Uso:  irm https://raw.githubusercontent.com/dfadify-web/lizard-bits/main/install.ps1 | iex
#   o, desde un clon del repo:  .\install.ps1
$ErrorActionPreference = "Stop"

$Repo = "https://github.com/dfadify-web/lizard-bits.git"
$SkillsDir = if ($env:CLAUDE_SKILLS_DIR) { $env:CLAUDE_SKILLS_DIR } else { Join-Path $HOME ".claude\skills" }
$Dest = Join-Path $SkillsDir "lizard-bits"

$Src = $null
if ($PSScriptRoot -and (Test-Path (Join-Path $PSScriptRoot "skills\lizard-bits\SKILL.md"))) {
  $Src = Join-Path $PSScriptRoot "skills\lizard-bits"
} else {
  if (-not (Get-Command git -ErrorAction SilentlyContinue)) { throw "Necesitas git instalado." }
  $Tmp = Join-Path ([IO.Path]::GetTempPath()) ("lizard-bits-" + [guid]::NewGuid())
  git clone --depth 1 $Repo $Tmp | Out-Null
  $Src = Join-Path $Tmp "skills\lizard-bits"
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

Write-Host "OK lizard-bits instalada en $Dest"
Write-Host "   Reinicia Claude Code y usa /lizard-bits."
