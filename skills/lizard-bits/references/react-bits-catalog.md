# Catálogo React Bits — criterio de uso para webs de negocio local

Repo: https://github.com/DavidHDev/react-bits (licencia MIT + Commons Clause: se pueden usar en webs de clientes, no revender los componentes sueltos).
Variante a copiar SIEMPRE: `src/ts-tailwind/<Categoría>/<Componente>/<Componente>.tsx`.
Al copiar: añadir `'use client';` arriba (Next app router) y revisar clases que asumen pantalla completa (`min-h-screen`, `h-screen w-screen`).

Leyenda de coste: 🟢 DOM/CSS barato · 🟡 motion/gsap, bucle rAF (pausar fuera de pantalla) · 🔴 WebGL (ogl/three): solo desktop o con fallback estático; en móvil evitar.

## Ya parcheados en `template/components/bits/` (usar estos, no los originales)
| Componente | Uso típico | Parche aplicado |
|---|---|---|
| RotatingText 🟡 | Palabra que rota en el titular ("Hamburguesas / Pizzas…") | — (envolver en inline-grid con sizer invisible de la palabra más larga → CLS 0) |
| CircularText 🟡 | Sello giratorio "DESDE 2000 ✦ CIUDAD" sobre la foto/vídeo | — (tamaño con `!h-[] !w-[]` y `[&>span]:!text-*`) |
| ScrollVelocity 🟡 | Franja marquee que acelera con el scroll | pausa fuera de pantalla, sin `drop-shadow`, `will-change-transform` |
| CurvedLoop 🟡 | Texto curvo "Pide por WhatsApp ✦ tel" | SIN setState por frame; pausa fuera de pantalla; drag solo ratón; `onPointerCancel`; sin `min-h-screen` |
| CountUp 🟡 | "22 años", "+5000 clientes" | — |
| TiltedCard 🟡 | Fotos de producto con inclinación 3D al hover | `loading=lazy`, `decoding=async`, `draggable=false` |
| SpotlightCard 🟢 | Contenedor de la carta/servicios | — (override `!bg-* !border-* !p-*`) |
| Magnet 🟢 | CTA principal | pasar `disabled={!finePointer}` (solo ratón) |
| ClickSpark 🟢 | Chispas al pulsar CTAs | envolver SOLO la zona de botones, nunca la página (canvas del tamaño del padre) |
| StarBorder 🟢 | Botón secundario con brillo que recorre el borde | requiere keyframes en tailwind.config (ya en template) |
| ShinyText, BlurText 🟡 | Titulares/etiquetas | — |

## Buenas opciones adicionales (copiar del repo cuando encajen)
- **Textos**: SplitText (gsap), ScrollReveal (gsap), ScrollFloat (gsap), DecryptedText, TextType (typewriter), GradientText, TrueFocus, VariableProximity, FoldText, MaskedHeading, SplitFlapText (rótulo de estación, ideal para horarios/precios), StrokeText.
- **Galerías/producto**: BounceCards (gsap), CardSwap (gsap), Stack (motion, cartas apiladas swipeables → genial en móvil), Carousel (motion), Masonry (gsap), ChromaGrid (equipo), ProfileCard (equipo/chef), FlipCard (micro), AccordionGallery, DepthCarousel, CircularGallery 🔴.
- **Navegación**: PillNav, CardNav, StaggeredMenu (menú móvil a pantalla completa), GooeyNav, Dock, BubbleMenu, FlowingMenu (lista de categorías con marquee al hover).
- **Micro-interacciones** (Micro/): HoldButton, SlideCommit (deslizar para pedir), PeekRating (reseñas), WarmTooltip, SwipeToast, CallChip (botón llamar), StatusMark, SpringCheck.
- **Contenido/scroll**: AnimatedContent / FadeContent (gsap; preferir el `Reveal` CSS del template, más ligero), ScrollStack (lenis — cuidado, secuestra el scroll), ScrollExpand, GradualBlur, LogoLoop (logos de marcas/proveedores), MagicBento (grid de servicios), AnimatedList, Counter, Stepper (cómo pedir en 3 pasos).
- **Cursor/fondos** 🔴 casi todos WebGL: Aurora, Silk, Grainient, Threads, Particles, DotGrid (gsap, 🟡), LetterGlitch, ShapeGrid 🟢, Waves 🟢. Si se usan: solo `lg:` y `@media (hover:hover)`, con fondo CSS de respaldo en móvil.

## Evitar (aprendido en producción)
- **Noise**: `putImageData` de 1024² aleatorio cada 2 frames → congela la página. Usar grano SVG estático o nada.
- **Capas fijas a pantalla completa con `mix-blend-mode`** (grano, overlays): recomponen toda la pantalla cada frame sobre vídeo → cuelgan el renderer y las capturas.
- **`blur-[100px+]` en elementos grandes**: caro en móvil. Usar `radial-gradient(closest-side, rgba(...), transparent)`.
- Cursores personalizados (SplashCursor, BlobCursor, TargetCursor, GhostCursor): inútiles en táctil y pesados.
- Cualquier cosa con face-api, Lanyard, FluidGlass, ModelViewer para negocio local: sobredimensionado.

## Catálogo completo (dependencias entre paréntesis; — = ninguna)
### Animations
AnimatedContent (gsap) · Antigravity (@react-three three) · BlobCursor (gsap) · ClickSpark (—) · Crosshair (gsap) · Cubes (gsap) · CursorGrid (—) · DitherVeil (ogl) · ElasticMesh (ogl) · ElectricBorder (—) · ElectricLogo (ogl) · FadeContent (gsap) · GhostCursor (three) · GlareHover (—) · GlowCursor (ogl) · GradualBlur (—) · HalftoneReveal (ogl) · ImageTrail (gsap) · LaserFlow (three) · LogoLoop (—) · MagicRings (three) · Magnet (—) · MagnetLines (—) · MetaBalls (ogl) · MetallicPaint (—) · Noise (—) · OrbitImages (motion) · PixelSwap (—) · PixelTrail (@react-three three) · PixelTransition (gsap) · Ribbons (ogl) · RippleDistortion (ogl) · ScrollExpand (—) · ShapeBlur (three) · SplashCursor (—) · StarBorder (—) · StickerPeel (gsap) · Strands (ogl) · SwarmCursor (ogl) · TargetCursor (gsap)
### Backgrounds
AcidSquares (ogl) · AeroShards (—) · Aurora (ogl) · Balatro (ogl) · Ballpit (gsap three) · Beams (@react-three three) · CRTWarp (three) · ColorBends (three) · DarkVeil (ogl) · Dither (@react-three postprocessing three) · DotField (—) · DotGrid (gsap) · EvilEye (ogl) · FaultyTerminal (ogl) · Ferrofluid (ogl) · FloatingLines (three) · Galaxy (ogl) · GhostFibers (ogl) · GradientBlinds (ogl) · GradientWaves (ogl) · Grainient (ogl) · GridDistortion (three) · GridMotion (gsap) · GridScan (face-api.js postprocessing three) · Hyperspeed (postprocessing three) · Iridescence (ogl) · LetterGlitch (—) · LightPillar (three) · LightRays (ogl) · LightTunnel (ogl) · Lightfall (ogl) · Lightning (—) · LineWaves (ogl) · LiquidChrome (ogl) · LiquidEther (three) · MoltenMetal (ogl) · Orb (ogl) · Particles (ogl) · PixelBlast (postprocessing three) · PixelSnow (three) · Plasma (—) · PlasmaWave (ogl) · Prism (ogl) · PrismaticBurst (ogl) · Radar (ogl) · RippleGrid (ogl) · Scanner (ogl) · ShapeGrid (—) · ShapeWaves (—) · SideRays (ogl) · Silk (@react-three three) · SlicedWaves (ogl) · SoftAurora (ogl) · Threads (ogl) · Topography (ogl) · Waves (—) · WebThreads (ogl)
### Components
AccordionGallery (gsap) · AnimatedList (motion) · BorderGlow (—) · BounceCards (gsap) · BubbleMenu (gsap) · CardNav (gsap) · CardSwap (gsap) · Carousel (motion) · ChromaGrid (gsap) · CircularGallery (ogl) · Counter (motion) · CurvedInput (—) · DecayCard (gsap) · DepthCarousel (gsap) · Dock (motion) · DomeGallery (@use-gesture) · DriftWall (—) · ElasticSlider (motion) · FlowingMenu (gsap) · FluidGlass (@react-three maath three) · FlyingPosters (ogl) · Folder (—) · GlassIcons (—) · GlassSurface (—) · GooeyNav (—) · InfiniteMenu (—) · InfiniteSpiral (—) · Lanyard (@react-three meshline three) · LineSidebar (—) · MagicBento (gsap) · Masonry (gsap) · ModelViewer (@react-three three) · MorphSlider (gsap ogl) · OptionWheel (—) · PillNav (gsap) · PixelCard (—) · ProfileCard (—) · ReflectiveCard (—) · ScrollStack (lenis) · SpecularButton (ogl) · SpotlightCard (—) · Stack (motion) · StaggeredMenu (gsap) · Stepper (motion) · TiltedCard (motion)
### Micro
BellToggle (motion) · BranchedMenu (—) · CallChip (—) · CodeSlots (motion) · CometDial (motion) · DodgeField (motion) · FlipCard (motion) · FolderFloat (matter-js) · FuseButton (—) · GlideSelect (—) · HoldButton (—) · JellyRadio (motion) · LatticeLoader (—) · PaperCrumple (three) · PeekRating (—) · PromptBar (motion) · PulseHeart (—) · RefineFrame (—) · RubberSegment (motion) · ScrubField (motion) · Shredder (—) · SlideCommit (motion) · SlingButton (motion) · SloshGauge (—) · SpringCheck (motion) · SquishSwitch (motion) · StatusMark (motion) · SwipeRow (motion) · SwipeToast (motion) · TearTicket (motion) · ThoughtLine (motion) · VoicePill (—) · WakeSlider (motion) · WarmTooltip (motion)
### TextAnimations
ASCIIText (three) · BlurText (motion) · CircularText (motion) · CountUp (motion) · CurvedLoop (—) · DecryptedText (motion) · DepthText (—) · EchoText (—) · FallingText (matter-js) · FoldText (gsap) · FuzzyText (—) · GlitchText (—) · GradientText (motion) · MaskedHeading (gsap) · ParticleText (—) · RotatingText (motion) · ScrambledText (gsap) · ScrollFloat (gsap) · ScrollReveal (gsap) · ScrollVelocity (motion) · ShinyText (motion) · Shuffle (gsap) · SplitFlapText (—) · SplitText (gsap) · StrokeText (gsap) · TechText (—) · TextCursor (motion) · TextLoop (gsap) · TextPressure (—) · TextType (gsap) · TrueFocus (motion) · VariableProximity (motion) · WarpText (ogl)

Nota: el catálogo crece. Antes de elegir, `git pull` del repo y listar `src/ts-tailwind/*/` por si hay nuevos.
