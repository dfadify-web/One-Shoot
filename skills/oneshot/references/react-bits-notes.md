# React Bits — cómo elegir y cómo integrar

El catálogo completo (211+, con descripción, deps, coste y avisos) está en `react-bits-catalog.md` y en vivo con `node scripts/bits.mjs list`. Este archivo es el **criterio**: cómo elegir bien entre todos, cómo integrarlos sin romper el rendimiento y qué ya sabemos que falla.

Licencia React Bits: MIT + Commons Clause → se pueden usar en webs de clientes; no se revenden los componentes sueltos.

---

## 1. Elegir por PAPEL, no por costumbre

Cada web necesita cubrir unos papeles. Para cada papel hay muchas opciones; la dirección de arte (`art-directions.md`) y el historial (`bits.mjs history`) deciden cuál. **No existe un set por defecto.**

| Papel | Opciones en React Bits (no exhaustivo, mira el catálogo) |
|---|---|
| **Titular del hero** (1) | RotatingText, SplitText, BlurText, TextType, DecryptedText, ScrambledText, Shuffle, SplitFlapText, TrueFocus, VariableProximity, TextPressure, FoldText, MaskedHeading, GradientText, ShinyText, StrokeText, FuzzyText, GlitchText, DepthText, EchoText, WarpText 🔴, AsciiText 🔴 |
| **Fondo / atmósfera del hero** (0-1) | CSS propio (franjas, grid, gradiente radial) · 🟢 ShapeGrid, Waves, DotField, LetterGlitch, Lightning, AeroShards, ShapeWaves · 🟡 DotGrid, GridMotion · 🔴 Aurora, Silk, Grainient, Threads, Particles, Iridescence, LiquidChrome, DarkVeil, SoftAurora, LightRays, Plasma, Beams, Galaxy, Orb… |
| **Media del hero** (foto/vídeo/ilustración) | marco propio + TiltedCard, PixelTransition, StickerPeel, GlareHover, ScrollExpand, HalftoneReveal 🔴, RippleDistortion 🔴, MetallicPaint |
| **Sello / badge** | CircularText, StarBorder, ElectricBorder, BorderGlow, GlassSurface |
| **Transición entre secciones** | ScrollVelocity, LogoLoop, CurvedLoop, TextLoop, GradualBlur, ScrollFloat, ScrollReveal |
| **Galería / productos** | Stack (swipe, ideal móvil), CardSwap, BounceCards, Carousel, DepthCarousel, Masonry, AccordionGallery, ChromaGrid, FlyingPosters 🔴, CircularGallery 🔴, DomeGallery, InfiniteMenu, OrbitImages, ImageTrail (solo desktop) |
| **Servicios / ventajas** | MagicBento, SpotlightCard, PixelCard, DecayCard, ReflectiveCard, GlassIcons, Folder, FlipCard, AnimatedList |
| **Cifras** | CountUp, Counter, SloshGauge, CometDial |
| **Proceso / pasos** | Stepper, ScrollStack (secuestra scroll, con cuidado), AnimatedList, TearTicket |
| **Carta / precios / catálogo** | SpotlightCard + tabs propios, AnimatedList, GlideSelect, RubberSegment, OptionWheel |
| **Equipo / personas** | ProfileCard, ChromaGrid, Lanyard 🔴 (solo si es muy de marca) |
| **Reseñas** | PeekRating, Stack, CardSwap, AnimatedList |
| **Navegación** | PillNav, CardNav, StaggeredMenu (menú móvil a pantalla completa), GooeyNav, BubbleMenu, Dock, FlowingMenu, LineSidebar, BranchedMenu |
| **CTA** | Magnet, ClickSpark, StarBorder, SpecularButton 🔴, FuseButton, SlingButton, SlideCommit (deslizar para pedir/reservar), HoldButton, CallChip |
| **Micro-feedback** | SpringCheck, StatusMark, SwipeToast, WarmTooltip, BellToggle, JellyRadio, SquishSwitch, PulseHeart |
| **Detalle lúdico / easter egg** | FallingText, StickerPeel, PaperCrumple 🔴, FolderFloat, DodgeField, Shredder |

Presupuesto por web (para que sea espectacular y a la vez fluida):
- **8-14 componentes** en total, cada uno con un *porqué* (Emil: "¿por qué anima esto?").
- **Máx. 1 🔴 WebGL**, solo `lg:` + `(hover:hover)`, con fondo CSS equivalente en móvil, montado con `next/dynamic({ ssr:false })` y pausado fuera de pantalla.
- **Máx. 2 bucles continuos visibles a la vez** (marquee, texto rotando, sello girando…).
- **1 solo "momento firma"** que la gente recuerde (la calculadora de Trasteros, el vídeo girando de Mès Que Bo). El resto, discreto.

## 2. Integración (vale para cualquier componente)
1. `node scripts/bits.mjs info <Nombre>` → leer props, uso oficial y avisos **antes** de maquetar.
2. `node scripts/bits.mjs add <Nombres…> --project . --install` → copia TS+Tailwind con `'use client'` (o la versión parcheada de la skill si existe) e instala deps con versiones compatibles con React 18.
3. Según los avisos que imprime:
   - *asume pantalla completa* → quitar `min-h-screen/h-screen/w-screen` y dimensionar por el contenedor.
   - *bucle por frame* → `useInViewRef` (en `components/useInViewPause.ts`) y `if (!visible.current) return` dentro del loop.
   - *setState por frame* → mover a ref + `element.setAttribute/style` (ver parche de CurvedLoop).
   - *cursor* → montar solo si `matchMedia('(hover: hover) and (pointer: fine)')`.
   - *drag/pointer* → ignorar `pointerType !== 'mouse'` si compite con el scroll; añadir `onPointerCancel`.
   - *aleatoriedad/fecha* → importar con `next/dynamic(() => import(...), { ssr: false })` (si no: errores de hidratación #418/#423/#425) y reservar su alto si está arriba.
   - `add` ya pone `// @ts-nocheck` en la copia (sus tipos internos no siempre casan con React 18) y adapta `RefObject<T | null>`; sus props exportadas siguen tipadas.
4. Colores: pasar la paleta del cliente por props/clases; nunca dejar los colores de la demo (cian, violeta, #5227FF…).
5. Accesibilidad: texto animado con equivalente legible (`aria-label` / `sr-only`), `prefers-reduced-motion` → estado final estático.
6. Si modificas un componente de forma reutilizable, **añádelo a `template/components/bits/`** para la próxima vez (y a la tabla de abajo).

## 3. Versiones parcheadas en `template/components/bits/`
`bits.mjs add` las usa automáticamente en lugar del original.

| Componente | Parche |
|---|---|
| CurvedLoop | sin setState por frame; pausa fuera de pantalla; drag solo ratón + `onPointerCancel`; sin `min-h-screen` |
| ScrollVelocity | pausa fuera de pantalla; sin `drop-shadow`; `will-change-transform` |
| TiltedCard | `loading=lazy`, `decoding=async`, `draggable=false` |
| RotatingText | — (uso: envolver en `inline-grid` con sizer invisible de la palabra más larga → CLS 0) |
| CircularText | — (tamaño con `!h-[] !w-[]` y `[&>span]:!text-*`) |
| Magnet | — (pasar `disabled={!finePointer}`) |
| ClickSpark | — (envolver SOLO la zona de botones; su canvas mide lo que su padre) |
| StarBorder | — (keyframes ya en `template/tailwind.config.ts`) |
| Counter | hooks antes del return en `Digit` (si no, `react-hooks/rules-of-hooks` rompe `next build`) |
| LogoLoop | pausa fuera de pantalla (IntersectionObserver en el track) |
| TextPressure | pausa fuera de pantalla; rango de ejes subido (wdth 70-200, wght 500-900): con los valores de demo el texto lejos del cursor queda ilegible de fino |
| CountUp, SpotlightCard, ShinyText, BlurText | — |

## 4. Evitar (aprendido en producción)
- **Noise**: `putImageData` de 1024² cada 2 frames → congela la página. Grano: SVG estático o nada.
- **Capas fijas a pantalla completa con `mix-blend-mode`** sobre vídeo → cuelgan el renderer.
- **`blur` > 60px en elementos grandes** → caro en móvil; usar `radial-gradient(closest-side, …, transparent)`.
- **Cursores** (SplashCursor, BlobCursor, GhostCursor, TargetCursor…) en negocio local: inútiles en táctil. Si la dirección los pide (portfolio creativo), solo desktop.
- **face-api / GridScan, ModelViewer, FluidGlass** para negocio local: sobredimensionado salvo brief muy concreto.
- **ScrollStack / lenis**: secuestra el scroll y rompe anclas; solo si la sección entera es la experiencia.
