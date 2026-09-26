---
name: lizard-bits
description: Crea landings/webs para negocios (restaurantes, tiendas, servicios locales) con Next.js 14 + Tailwind + motion, componentes de React Bits y la filosofía de animación de Emil Kowalski, a partir de un PRD, unos pocos assets (fotos, vídeo, logo) y una paleta de colores del cliente. Úsala cuando el usuario pida crear una web/landing para un negocio pasando assets + paleta para una web de cliente, o mencione react-bits / emil kowalski para una web nueva. Incluye optimización móvil, verificación con capturas iPhone, Lighthouse y deploy en Vercel.
---

# lizard-bits 🦎

Web de cliente premium y rápida en una sesión. Nació de una landing real de hamburguesería (take-away): los `*.example.tsx` del template son esa web anonimizada; si dudas de cómo resolver algo, míralos.

Rutas: `SK` = carpeta donde está este SKILL.md (instalada como plugin o en `~/.claude/skills/lizard-bits`).
- `references/emil-design-eng.md` — filosofía de Emil Kowalski (léela entera al empezar; es la autoridad en animación).
- `references/react-bits-catalog.md` — qué componente usar para qué, coste en móvil y cuáles evitar.
- `template/` — base probada: `tailwind.config.ts`, `app/globals.css`, `next.config.mjs`, `.eslintrc.json`, `components/{Reveal,useInViewPause,icons}`, `components/bits/*` (React Bits ya parcheados), y `*.example.tsx` (Hero con vídeo, Menu con tabs+buscador, layout).
- `scripts/optimize-media.mjs` — assets → webp/mp4/webm/poster sin recortar, imprime ratio y color de fondo.
- `scripts/mobile-check.mjs` — emulación iPhone real: desbordes horizontales, capturas, FPS de scroll, errores.
- Scripts: la primera vez `npm i --prefix "$SK/scripts"` (puppeteer-core + sharp; usa el Chrome ya instalado, no descarga navegador). Vídeo requiere `ffmpeg` en PATH.

## Entradas que dará el usuario
1. **PRD / brief** (md o texto): negocio, datos de contacto, secciones, carta/servicios.
2. **Carpeta de assets** (pocos: fotos de producto, logo, quizá un vídeo).
3. **Paleta** (imagen o hex) + a veces un **color principal** explícito.

Si la paleta llega como "[Image #N]" pero no ves la imagen, dilo y usa los hex del PRD; no inventes. Pregunta solo lo imprescindible (auto mode: decide y sigue).

## Reglas de contenido (no negociables)
- **No inventar datos**: horarios, reseñas, años, premios, platos, precios. Lo que no esté confirmado → se omite (no placeholder visible) y se lista como "pendiente" al final.
- Pies de foto honestos: no nombrar un plato concreto si no sabes que la foto es ese plato ("Smash con bacon" sí si se ve; no "Bacon Love").
- Créditos de terceros (p.ej. "Hecho por X") → quitar salvo que el PRD diga mantener.
- Textos en español natural, cercanos, sin relleno de IA ("experiencia única", "pasión por…").

## Flujo

### 1. Leer y preparar (en paralelo)
- Leer PRD, ver cada asset con Read (mirar las fotos: qué muestran, fondo, encuadre).
- Clonar fuentes al scratchpad: `git clone --depth 1 https://github.com/DavidHDev/react-bits.git` y `https://github.com/emilkowalski/skills.git` (por si hay novedades respecto a `references/`).
- Leer `references/emil-design-eng.md` y `references/react-bits-catalog.md`.

### 2. Proyecto
```bash
cd <carpeta de trabajo del usuario> && npx --yes create-next-app@14 <slug>-web --ts --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm
cd <slug>-web && npm i motion gsap @gsap/react
rm -rf app/fonts app/favicon.ico
cp -r $SK/template/. .      # luego renombrar/adaptar los *.example.tsx
```
- (Windows) Nunca editar ficheros con `Get-Content | Set-Content` de PowerShell 5.1: rompe UTF-8 (tildes → `Ã­`). Usar Edit/Write o bash `sed`.
- `tailwind.config.ts`: sustituir los tokens de color (`ink, coal, peach, coral, cream, brick, gold`) por la paleta del cliente, con nombres semánticos propios del proyecto. Conservar `future.hoverOnlyWhenSupported`, easings y keyframes de StarBorder.
- `globals.css`: adaptar colores de `.stripes`, `::selection`, `:focus-visible`, `body`. Mantener `.enter`, `.enter-tilt`, `.js .reveal`, `.press`, `--header-h`.

### 3. Assets
```bash
node $SK/scripts/optimize-media.mjs "<carpeta assets>" public/media --suffix=v1
```
- Usa el **ratio** impreso para dimensionar cada foto (nunca forzar cuadrado con object-cover si recorta el producto). Ej. TiltedCard: `containerWidth="min(46vw,300px)" containerHeight="calc(min(46vw,300px) / <ratio>)"`.
- Usa el **color de fondo** impreso como `bg-[#...]` del contenedor de vídeo/foto (sin flash al cargar).
- Logo con fondo blanco y texto → `object-contain p-0.5` en círculo blanco; recortar con sharp si tiene mucho aire.
- Genera `app/icon.png` (64), `app/apple-icon.png` (180), `app/opengraph-image.jpg` (1200 ancho) desde logo/foto hero.
- **Al reemplazar una imagen, cambia el nombre (`-v2`, `-v3`)**: `/media/*` va con caché de 1 semana; mismo nombre = el cliente sigue viendo la vieja.
- Guarda originales fuera de `public/` (p.ej. `<carpeta assets>/_originales-web`).

### 4. Dirección de arte
- Personalidad del negocio > plantilla. Tipografía display con carácter (next/font: Anton, Bebas Neue, Archivo Black, Oswald, Fraunces, DM Serif…) + sans legible + opcional una manuscrita (Permanent Marker, Caveat) para acentos. Nunca Inter/Arial como display.
- Color principal del cliente = CTA y acentos; el resto de la paleta para bandas, badges, sombras duras (`shadow-[5px_5px_0_<oscuro>]`).
- Detalles de "rótulo" en vez de glassmorphism/gradientes SaaS: franjas diagonales, doodles SVG a mano (`icons.tsx`), sellos girando, marquees inclinados, líneas de puntos en precios.
- Estructura típica (ajustar al PRD): Header fijo (logo + 1-2 links + CTA) → Hero (titular + palabra rotando + subtítulo + 2 CTAs; foto/vídeo a la derecha en marco inclinado con franjas y sello CircularText) → Marquee ScrollVelocity → Sobre nosotros (texto corto + CountUp + TiltedCards) → Carta/servicios (tabs sticky + buscador sin tildes + SpotlightCard) → CurvedLoop CTA → Ubicación (mapa iframe con filtro oscuro + tarjetas de contacto + aviso) → Footer. Botón WhatsApp flotante si el negocio vende por WhatsApp.
- Usar **muchos** componentes de React Bits (el usuario lo quiere), pero cada uno con propósito (Emil: ¿por qué anima esto?).

### 5. Animación (Emil, resumido — la referencia manda)
- Entradas del hero con **CSS** (`.enter` + `--d` delay) → se pintan antes de hidratar. Nunca `initial={{opacity:0}}` de motion en contenido above-the-fold.
- El elemento LCP (foto/póster del hero) **no** anima opacity: solo transform (`.enter-tilt`).
- Reveal al scroll con `components/Reveal.tsx` (IO + transición CSS; oculta solo si `html.js`).
- Easing `cubic-bezier(0.23,1,0.32,1)`; UI < 300 ms; nunca `ease-in`; nunca desde `scale(0)`; `:active scale(0.97)` en todo lo pulsable (`.press`); stagger 30-80 ms; blur ≤ 4px en crossfades (2px en móvil).
- Tabs: pill con `layoutId` (spring `duration .45 bounce .15`), contenido con AnimatePresence `mode="wait"`.
- Respetar `prefers-reduced-motion` (ya en globals.css).

### 6. Móvil y rendimiento (obligatorio antes de entregar)
Checklist ya resuelto en el template; verificar que se mantiene:
- `body { overflow-x: clip }`; grids con `grid-cols-1` explícito + `min-w-0` en hijos (si no, desbordan en móvil).
- `viewportFit: "cover"`, safe-areas en header (`pt-[env(safe-area-inset-top)]`) y FAB (`bottom-[calc(1rem+env(safe-area-inset-bottom))]`).
- Hover solo con puntero fino (`hoverOnlyWhenSupported`); Magnet `disabled` en táctil; drag de CurvedLoop solo ratón.
- Bucles rAF pausados fuera de pantalla (`useInViewRef`); vídeo con IO play/pause, `muted playsInline autoPlay loop`, `<source>` webm + mp4, `poster` precargado con `<link rel=preload fetchPriority=high>`.
- Palabra rotatoria con ancho fijo (sizer invisible) → CLS 0.
- Tabs horizontales: `text-xs` en móvil, `scrollIntoView({inline:"center"})` al elegir, máscara de degradado a la derecha + `pr-16`, volver al inicio del panel si estabas abajo.
- Inputs ≥16px (evita zoom iOS), `enterKeyHint="search"`.
- Sin `mix-blend` a pantalla completa, sin Noise, sin blur gigante (ver catálogo).

Verificación (build de producción, no dev):
```bash
npm run build && npx next start -p 3100   # en background
node $SK/scripts/mobile-check.mjs http://localhost:3100/ m 8          # iPhone: mirar capturas con Read
node $SK/scripts/mobile-check.mjs http://localhost:3100/ d 5 --desktop
```
- Criterios: `scrollW == clientW`, `errors []`, `longFrames` ≈ 0. Revisar TODAS las capturas (texto cortado, logos recortados, solapes con el FAB, dirección completa…).
- Las capturas con `chrome --headless --window-size=390,...` NO sirven en Windows (ancho mínimo ~500px): usar solo `mobile-check.mjs`.
- La extensión Claude-in-Chrome se cuelga con páginas pesadas; preferir puppeteer.
- `npm run build` con `next dev` corriendo rompe `.next` → parar dev antes.

### 7. Deploy (Vercel CLI; si no hay sesión, pedir al usuario `! npx vercel login`)
```bash
npx vercel --prod --yes 2>&1 | grep -E "Aliased|rror"
```
Luego Lighthouse móvil contra producción:
```bash
npx --yes lighthouse@12 <url> --form-factor=mobile --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=lh.json --chrome-flags="--headless=new" --quiet
```
(Si Lighthouse no encuentra Chrome, exportar `CHROME_PATH` con la ruta del ejecutable.)
Objetivo: Perf ≥ 88 (varía entre pasadas), A11y/BP/SEO 100, CLS 0, TBT < 50 ms. Si falla: mirar `lcp-breakdown-insight` (render delay → animación con opacity en el LCP), `image-delivery-insight` (reducir ancho/calidad), `label-content-name-mismatch` (no poner aria-label distinto del texto visible).

### 8. Entrega
- Respuesta corta en español: URL, qué incluye, qué componentes de React Bits, pendientes del cliente (datos no confirmados), y lo que no se pudo verificar.
- Si hay sistema de memoria, guardar el proyecto (ruta, URL, pendientes).

## Errores ya cometidos (no repetir)
| Error | Solución |
|---|---|
| Noise de React Bits congela la página | No usarlo |
| Overlay fijo `mix-blend-overlay` cuelga renderer | Nada de blend a pantalla completa |
| CurvedLoop `setState` cada frame | Parche en template |
| Texto curvo congelado en táctil (pointercancel) | Parche en template |
| Hero invisible hasta hidratar (motion initial opacity 0) | `.enter` CSS |
| LCP +600 ms por animar opacity del póster | `.enter-tilt` solo transform |
| Palabra rotatoria desplaza texto vecino (CLS) | inline-grid + sizer |
| Grid desborda en móvil | `grid-cols-1` + `min-w-0` + `overflow-x: clip` |
| Fotos recortadas por forzar cuadrado | tamaño según ratio real |
| Cliente ve imagen vieja tras reemplazar | renombrar con `-vN` |
| Tildes rotas por PowerShell Set-Content | Edit/Write o sed |
| Dirección sin número (`split(",")[0]`) | Mostrar dirección completa, revisar capturas |
| Caption inventando nombre de plato | Pies de foto genéricos/verificables |
