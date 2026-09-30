---
name: oneshot
description: One-Shoot — crea desde el primer prompt una landing/web increíble para un negocio (restaurantes, tiendas, servicios locales…) con Next.js 14 + Tailwind + motion, eligiendo entre los 211+ componentes de React Bits los que mejor encajan con esa marca y aplicando la filosofía de animación de Emil Kowalski. Parte de un PRD/brief, unos pocos assets (fotos, vídeo, logo) y una paleta de colores. Cada web tiene su propia dirección de arte (no se parecen entre sí). Incluye optimización móvil, verificación con capturas iPhone, Lighthouse y deploy en Vercel. Úsala con /oneshot o cuando pidan crear una web/landing para un negocio pasando assets y paleta, o mencionen react-bits / emil kowalski para una web nueva.
---

# One-Shoot 🎯

Objetivo: **una web de cliente espectacular, completa, verificada y desplegada en una sola pasada**, que no se parezca a la anterior. Se entrega a la primera: sin "versión base para iterar".

Tres ideas mandan:
1. **La marca decide el diseño**, no la plantilla: dirección de arte propia por web (`references/art-directions.md`).
2. **Todo React Bits está disponible**: se eligen los componentes que mejor cuentan ESTE negocio (`scripts/bits.mjs`), no un set fijo.
3. **La base técnica no se negocia**: rendimiento móvil, animación estilo Emil, contenido honesto y verificación real (todo lo que ya funcionaba, abajo).

Rutas: `SK` = carpeta donde está este SKILL.md (plugin o `~/.claude/skills/oneshot`).
- `references/emil-design-eng.md` — filosofía de Emil Kowalski (léela entera al empezar; es la autoridad en animación).
- `references/art-directions.md` — 12 direcciones de arte, 12 composiciones de hero y alternativas por sección.
- `references/react-bits-notes.md` — cómo elegir por *papel*, presupuesto de rendimiento, cómo integrar cualquier componente, parches y lista negra.
- `references/react-bits-catalog.md` — catálogo completo generado (descripción, deps, coste 🟢🟡🔴, avisos).
- `scripts/bits.mjs` — acceso en vivo a React Bits: `sync`, `list`, `info`, `add`, `catalog`, `history`, `log`.
- `scripts/optimize-media.mjs` — assets → webp/mp4/webm/póster sin recortar; imprime ratio y color de fondo.
- `scripts/mobile-check.mjs` — iPhone emulado: desbordes, capturas, FPS de scroll, errores.
- `template/` — base técnica probada (config, CSS de animación, Reveal, pausa fuera de pantalla, bits parcheados) y `*.example.tsx` como **referencia de técnica, no de maqueta**.
- Primera vez: `npm i --prefix "$SK/scripts"` (puppeteer-core + sharp; usa el Chrome instalado). Vídeo requiere `ffmpeg`. `bits.mjs` solo necesita git + Node 18.

## Entradas que dará el usuario
1. **PRD / brief** (md o texto): negocio, datos de contacto, secciones, carta/servicios.
2. **Carpeta de assets** (pocos: fotos de producto, logo, quizá un vídeo).
3. **Paleta** (imagen o hex) + a veces un **color principal** explícito.

Si la paleta llega como "[Image #N]" pero no ves la imagen, dilo y usa los hex del PRD; no inventes. Pregunta solo lo imprescindible (auto mode: decide y sigue). One-shot = no parar a pedir aprobación del diseño: decide con criterio y entrega.

## Reglas de contenido (no negociables)
- **No inventar datos**: horarios, reseñas, años, premios, platos, precios, cifras. Lo que no esté confirmado → se omite (no placeholder visible) y se lista como "pendiente" al final.
- Pies de foto honestos: no nombrar un plato/producto concreto si no sabes que la foto es eso.
- Créditos de terceros (p.ej. "Hecho por X") → quitar salvo que el PRD diga mantener.
- Textos en español natural, cercanos, específicos del negocio; sin relleno de IA ("experiencia única", "pasión por…", "calidad y confianza").

## Flujo

### 1. Leer y preparar (en paralelo)
- Leer PRD; ver cada asset con Read (qué muestran, fondo, encuadre, calidad).
- `node $SK/scripts/bits.mjs sync` (clon parcial ~14 MB de React Bits en `~/.oneshot/react-bits`).
- `node $SK/scripts/bits.mjs history` → qué direcciones y componentes se usaron en las últimas webs.
- Leer `references/emil-design-eng.md`, `references/art-directions.md` y `references/react-bits-notes.md`.

### 2. Brief de diseño (antes de escribir código)
Escribe (para ti, en 10-15 líneas) y luego **cúmplelo**:
- **Dirección de arte** (id de `art-directions.md`) y por qué encaja con ESTE negocio, paleta y fotos. Distinta de la última del historial salvo que el brief lo exija.
- **Idea central / momento firma**: lo único que se recordará (p.ej. calculadora de tamaño, vídeo girando, carta como panel de estación, collage de stickers…). Sale del negocio, no del catálogo.
- **Composición del hero** (una de las 12 de `art-directions.md`, distinta a la de la última web).
- **Tipografías** (display + texto [+ acento]) y **uso de la paleta** (fondo, texto, acción, acentos).
- **Mapa de secciones** según el PRD, eligiendo para cada una la solución de "Alternativas por sección".
- **Componentes de React Bits (8-14)**, cada uno con su *papel* y su *porqué*:
  1. `node $SK/scripts/bits.mjs list --q "<palabras del concepto>"` y/o `--cat <Categoría>` para explorar TODO el catálogo (no te quedes con los que ya conoces).
  2. Preselecciona por papel (tabla de `react-bits-notes.md`) y por la dirección.
  3. `node $SK/scripts/bits.mjs info <A> <B> …` para leer props/uso/avisos de los candidatos.
  4. Regla anti-repetición: **al menos la mitad de los componentes no deben estar en la web anterior**; ninguno se elige "porque siempre funciona". Si repites alguno, que sea porque es claramente el mejor para ese papel.
  5. Presupuesto: máx. 1 🔴 WebGL (solo desktop, con fallback), máx. 2 bucles continuos visibles a la vez.

### 3. Proyecto
```bash
cd <carpeta de trabajo del usuario> && npx --yes create-next-app@14 <slug>-web --ts --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm
cd <slug>-web && npm i motion
rm -rf app/fonts app/favicon.ico
cp $SK/template/{tailwind.config.ts,next.config.mjs,.eslintrc.json} . && cp $SK/template/app/globals.css app/
cp $SK/template/app/layout.example.tsx app/layout.tsx   # OBLIGATORIO: el layout por defecto importa app/fonts (borrado); adaptar fuentes y metadatos
mkdir -p components lib && cp $SK/template/components/{Reveal.tsx,useInViewPause.ts} components/
node $SK/scripts/bits.mjs add <Componentes elegidos…> --project . --install
```
- Los `*.example.tsx`, `icons.tsx` y `lib/*.example.ts` del template se **consultan** para técnica (vídeo con IO, tabs con layoutId, buscador sin tildes, sizer anti-CLS, datos del negocio centralizados), no se copian como maqueta.
- (Windows) Nunca editar ficheros con `Get-Content | Set-Content` de PowerShell 5.1: rompe UTF-8 (tildes → `Ã­`). Usar Edit/Write o bash `sed`.
- `tailwind.config.ts`: sustituir los tokens de color de ejemplo por la paleta del cliente con nombres semánticos. Conservar `future.hoverOnlyWhenSupported`, easings y keyframes de StarBorder (si no se usa, se pueden quitar).
- `globals.css`: adaptar colores (`::selection`, `:focus-visible`, `body`) y los motivos a la dirección (`.stripes` es de "rótulo"; sustitúyelo por el motivo de tu dirección). Mantener siempre `.enter`, `.enter-tilt`, `.js .reveal`, `.press`, `--header-h` y el bloque `prefers-reduced-motion`.
- Datos del negocio en un único `lib/site.ts` (ver `template/lib/site.example.ts`).

### 4. Assets
```bash
node $SK/scripts/optimize-media.mjs "<carpeta assets>" public/media --suffix=v1
```
- Usa el **ratio** impreso para dimensionar cada foto (nunca forzar cuadrado con object-cover si recorta el producto). Ej. TiltedCard: `containerWidth="min(46vw,300px)" containerHeight="calc(min(46vw,300px) / <ratio>)"`.
- Usa el **color de fondo** impreso como `bg-[#...]` del contenedor de vídeo/foto (sin flash al cargar).
- Logo con fondo blanco y texto → `object-contain p-0.5` en círculo/placa blanca; recortar con sharp si tiene mucho aire.
- Genera `app/icon.png` (64), `app/apple-icon.png` (180), `app/opengraph-image.jpg` (1200 ancho) desde logo/foto hero.
- **Al reemplazar una imagen, cambia el nombre (`-v2`, `-v3`)**: `/media/*` va con caché de 1 semana; mismo nombre = el cliente sigue viendo la vieja.
- Guarda originales fuera de `public/` (p.ej. `<carpeta assets>/_originales-web`).
- Pocos assets o flojos → la dirección debe apoyarse en tipografía, ilustración CSS/SVG propia o un componente tipográfico fuerte (como hizo Trasteros con su nave en CSS), no en fotos de stock.

### 5. Construir según el brief
- Cada sección con la solución elegida en el brief. Componentes integrados según `react-bits-notes.md` §2 (tamaños al contenedor, colores de la marca, pausa fuera de pantalla, táctil, accesibilidad).
- Color principal del cliente = acción y acentos. Contraste AA mínimo en todo texto.
- Detalles de artesanía de la dirección (motivos SVG propios, números de sección, sellos, filetes…) hechos a mano: son lo que hace que no parezca plantilla.
- Botón flotante de WhatsApp/llamada solo si el negocio vende/atiende así.

### 6. Animación (Emil, resumido — la referencia manda)
- Entradas del hero con **CSS** (`.enter` + `--d` delay) → se pintan antes de hidratar. Nunca `initial={{opacity:0}}` de motion en contenido above-the-fold.
- El elemento LCP (foto/póster del hero) **no** anima opacity: solo transform (`.enter-tilt`).
- Reveal al scroll con `components/Reveal.tsx` (IO + transición CSS; oculta solo si `html.js`).
- Easing `cubic-bezier(0.23,1,0.32,1)`; UI < 300 ms; nunca `ease-in`; nunca desde `scale(0)`; `:active scale(0.97)` en todo lo pulsable (`.press`); stagger 30-80 ms; blur ≤ 4px en crossfades (2px en móvil).
- La **personalidad** del movimiento la marca la dirección (editorial lento, técnico crisp, pop con rebote…), dentro de estas reglas.
- Tabs: pill con `layoutId` (spring `duration .45 bounce .15`), contenido con AnimatePresence `mode="wait"`.
- Respetar `prefers-reduced-motion` (ya en globals.css).

### 7. Móvil y rendimiento (obligatorio antes de entregar)
- `body { overflow-x: clip }`; grids con `grid-cols-1` explícito + `min-w-0` en hijos (si no, desbordan en móvil).
- `viewportFit: "cover"`, safe-areas en header (`pt-[env(safe-area-inset-top)]`) y FAB (`bottom-[calc(1rem+env(safe-area-inset-bottom))]`).
- Hover solo con puntero fino (`hoverOnlyWhenSupported`); Magnet `disabled` en táctil; drags solo ratón si compiten con el scroll.
- Bucles rAF pausados fuera de pantalla (`useInViewRef`); vídeo con IO play/pause, `muted playsInline autoPlay loop`, `<source>` webm + mp4, `poster` precargado con `<link rel=preload fetchPriority=high>`.
- WebGL 🔴: `next/dynamic` con `ssr:false`, montado solo en `lg:` + `(hover:hover)`, fallback CSS/imagen en móvil.
- Componentes con aleatoriedad o fecha al renderizar (`bits.mjs` lo avisa: SplitFlapText, Stack con `randomRotation`, MagicBento…) → `next/dynamic({ ssr:false })`, o fallan con errores de hidratación #418/#423/#425. Si están above-the-fold, reservar su tamaño para no provocar CLS.
- Textos que cambian (rotatorios, split-flap…) con ancho fijo (sizer invisible / `padTo`) → CLS 0.
- Tabs horizontales: `text-xs` en móvil, `scrollIntoView({inline:"center"})` al elegir, máscara de degradado a la derecha + `pr-16`, volver al inicio del panel si estabas abajo.
- Inputs ≥16px (evita zoom iOS), `enterKeyHint` adecuado.
- Sin `mix-blend` a pantalla completa, sin Noise, sin blur gigante (ver notas).

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

### 8. Control de calidad "one-shot" (antes de desplegar)
Mira las capturas de escritorio y móvil como lo haría un director de arte y corrige hasta que todo sea "sí":
- ¿Se entiende en 3 segundos qué es, dónde está y cómo se pide/contacta?
- ¿Tiene un momento firma claro y se nota la dirección elegida en cada sección (tipos, motivos, ritmo)?
- ¿Si tapas el logo, podría ser de otro negocio? (si sí → falta personalidad: más detalle propio, menos genérico)
- ¿Se parece a la web anterior del historial (misma composición de hero, mismos 3-4 efectos)? Si sí → cambia.
- Jerarquía, ritmo vertical, alineaciones y contraste correctos; nada cortado ni solapado en 390px.
- Ningún componente queda con colores/textos de demo; todo anima con propósito; nada distrae del CTA.
- Todo el contenido del PRD está; nada inventado.

### 9. Deploy (Vercel CLI; si no hay sesión, pedir al usuario `! npx vercel login`)
```bash
npx vercel --prod --yes 2>&1 | grep -E "Aliased|rror"
```
Luego Lighthouse móvil contra producción:
```bash
npx --yes lighthouse@12 <url> --form-factor=mobile --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=lh.json --chrome-flags="--headless=new" --quiet
```
(Si Lighthouse no encuentra Chrome, exportar `CHROME_PATH` con la ruta del ejecutable.)
Objetivo: Perf ≥ 88 (varía entre pasadas), A11y/BP/SEO 100, CLS 0, TBT < 50 ms. Si falla: mirar `lcp-breakdown-insight` (render delay → animación con opacity en el LCP), `image-delivery-insight` (reducir ancho/calidad), `label-content-name-mismatch` (no poner aria-label distinto del texto visible).

### 10. Entrega
- Registrar en el historial (para que la próxima web sea distinta):
  `node $SK/scripts/bits.mjs log --name "<Negocio>" --direction <id> --bits A,B,C --url <url>`
- Respuesta corta en español: URL, dirección de arte y momento firma, componentes de React Bits usados, pendientes del cliente (datos no confirmados) y lo que no se pudo verificar.
- Si hay sistema de memoria, guardar el proyecto (ruta, URL, pendientes).
- Si has parcheado un componente de forma reutilizable o descubierto un fallo nuevo, añádelo a `template/components/bits/`, a `react-bits-notes.md` y a la tabla de abajo.

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
| Webs distintas que salen iguales (mismo hero + sello + marquee + palabra rotatoria) | Brief de diseño con dirección propia, `bits.mjs history` y regla anti-repetición |
| `@react-three/fiber` 9 no funciona con React 18 (Next 14) | `bits.mjs add` fija fiber@8 / drei@9 |
| Componentes nuevos de React Bits con tipos de React 19 / timers de DOM rompen `next build` | `bits.mjs add` adapta `RefObject<T\|null>` y pone `// @ts-nocheck` (1ª línea, antes de `'use client'`) |
| `three` sin tipos rompe el build | `bits.mjs add --install` instala `@types/three` |
| `layout.tsx` por defecto importa `app/fonts` borrado | copiar `template/app/layout.example.tsx` como layout |
| Errores de hidratación #418/#423/#425 por `Math.random` al renderizar | `next/dynamic({ ssr:false })` para esos componentes |
| Counter de React Bits rompe `next build` (rules-of-hooks) | Versión parcheada en template |
| BorderGlow (y cualquier glow con `inset` negativo) ensancha el viewport en móvil | `overflow-x-clip` en la sección que lo contiene |
| `aria-label` en un `<span>` sin rol → A11y < 100 | Texto en `sr-only` y la animación con `aria-hidden` |
| LCP con render delay alto por animar opacity en h1/subtítulo del hero | `.enter-tilt` (solo transform) también en los textos grandes del hero |
| `// eslint-disable-next-line @typescript-eslint/...` en un componente rompe `next build` (regla no definida) | `bits.mjs add` ya los quita |
| AccordionGallery oculto con `hidden sm:block` sigue descargando todas sus imágenes en móvil | Montarlo solo si `matchMedia('(min-width:640px)')` |
| `<link rel=preload>` a `/media/x.webp` cuando la imagen va por `next/image` (sirve `/_next/image`) → descarga doble | Preload solo para `<img>`/póster sin `next/image`; con `next/image`, `priority` |
| Titulares del hero dentro de `overflow-hidden` para la entrada tipo máscara → LCP tardío | Sin recorte: `.enter-tilt` directo sobre el texto |

