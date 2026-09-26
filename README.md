# 🦎 lizard-bits

**Skill para [Claude Code](https://claude.com/claude-code) que crea landings premium y rápidas para negocios locales** (restaurantes, tiendas, peluquerías, talleres…).

Le pasas un **PRD/brief**, **unos pocos assets** (fotos, logo, quizá un vídeo) y una **paleta de colores**, y Claude:

1. Monta un proyecto **Next.js 14 + Tailwind + motion**.
2. Usa muchos componentes de **[React Bits](https://github.com/DavidHDev/react-bits)** (ya parcheados para móvil).
3. Anima siguiendo la filosofía de **[Emil Kowalski](https://github.com/emilkowalski/skills)** (curvas, duraciones, `:active`, stagger, reduced-motion…).
4. Optimiza los assets (WebP, vídeo mp4+webm con póster) **sin recortar tus fotos**.
5. Verifica en **iPhone emulado** (desbordes, capturas, FPS de scroll, errores de consola).
6. Despliega en **Vercel** y pasa **Lighthouse** móvil (objetivo: 90+, CLS 0).

Sin inventar datos: horarios, reseñas o precios que no estén en el brief se omiten y se te listan como pendientes.

---

## Instalación

### Opción A — Plugin de Claude Code (recomendada)
Dentro de Claude Code:
```
/plugin marketplace add dfadify-web/lizard-bits
/plugin install lizard-bits@lizard-bits
```
Las dependencias de los scripts (`puppeteer-core`, `sharp`) las instala la propia skill la primera vez que la usas.

### Opción B — Script (copia a `~/.claude/skills/lizard-bits`)
**macOS / Linux / Git Bash**
```bash
curl -fsSL https://raw.githubusercontent.com/dfadify-web/lizard-bits/main/install.sh | bash
```
**Windows (PowerShell)**
```powershell
irm https://raw.githubusercontent.com/dfadify-web/lizard-bits/main/install.ps1 | iex
```

### Opción C — Manual
```bash
git clone https://github.com/dfadify-web/lizard-bits.git
cp -R lizard-bits/skills/lizard-bits ~/.claude/skills/
npm install --prefix ~/.claude/skills/lizard-bits/scripts
```

Reinicia Claude Code tras instalar.

### Requisitos
- **Node.js 18+** y npm
- **Google Chrome** (o Chromium/Edge) instalado — los scripts lo usan vía `puppeteer-core`, no descargan navegador. Si no lo detecta: `export CHROME_PATH=/ruta/a/chrome`.
- **ffmpeg** (solo si hay vídeo): `brew install ffmpeg` · `winget install Gyan.FFmpeg` · `sudo apt install ffmpeg`
- Cuenta de **Vercel** para el deploy (`npx vercel login`)

---

## Uso

```
/lizard-bits
```
o simplemente:

> Crea una landing para mi negocio. Brief en `~/Downloads/brief.md`, assets en `~/Desktop/assets-cliente`, color principal `#FFB79A` y esta paleta: #FFE8D6 #FF8360 #9C2B1B.

Qué conviene pasarle:
| Entrada | Ejemplo |
|---|---|
| Brief / PRD | nombre, contacto (WhatsApp, IG, dirección), secciones, carta o servicios con precios |
| Assets | 2-6 fotos de producto, logo, opcional un vídeo corto vertical |
| Paleta | hex o una imagen con los colores + cuál es el principal |

---

## Qué incluye

```
skills/lizard-bits/
├── SKILL.md                      # flujo completo + reglas + errores ya cometidos
├── references/
│   ├── emil-design-eng.md        # filosofía de animación de Emil Kowalski (MIT)
│   └── react-bits-catalog.md     # 209 componentes: para qué sirven, coste en móvil, cuáles evitar
├── template/                     # base probada en producción
│   ├── tailwind.config.ts, next.config.mjs, .eslintrc.json
│   ├── app/globals.css, app/layout.example.tsx
│   ├── components/bits/*         # React Bits parcheados (pausa fuera de pantalla, táctil, CLS…)
│   ├── components/Reveal.tsx, useInViewPause.ts, icons.tsx
│   ├── components/Hero.example.tsx, Menu.example.tsx
│   └── lib/site.example.ts, menu.example.ts
└── scripts/
    ├── optimize-media.mjs        # assets → webp/mp4/webm/póster, sin recortar; imprime ratio y color de fondo
    └── mobile-check.mjs          # iPhone emulado: desbordes, capturas, FPS, errores
```

### Lecciones incorporadas (para que no te pasen)
- `Noise` de React Bits y overlays `mix-blend` a pantalla completa **congelan** la página → prohibidos.
- `CurvedLoop` hacía `setState` en cada frame y se congelaba en táctil → parcheado.
- Hero invisible hasta hidratar (motion `initial opacity 0`) → entradas en CSS.
- Animar la opacidad del póster del vídeo retrasa el LCP ~600 ms → solo transform.
- Palabra rotatoria que empuja el texto (CLS) → ancho fijo con sizer invisible.
- Al cambiar una imagen con el mismo nombre, la caché muestra la vieja → versionar (`-v2`).

---

## Créditos y licencias
- Código propio de este repo: **MIT** (ver `LICENSE`).
- `references/emil-design-eng.md`: © Emil Kowalski, **MIT** — [emilkowalski/skills](https://github.com/emilkowalski/skills).
- `template/components/bits/*`: basados en **React Bits** © David Haz, **MIT + Commons Clause** — [DavidHDev/react-bits](https://github.com/DavidHDev/react-bits). Puedes usarlos en webs (también de clientes); no puedes vender los componentes en sí. Ver `THIRD_PARTY_NOTICES.md`.

Proyecto no afiliado a Anthropic, Emil Kowalski ni React Bits.
