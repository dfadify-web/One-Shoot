# Catálogo completo de React Bits

Generado con `node scripts/bits.mjs catalog` desde https://github.com/DavidHDev/react-bits.git. Regenerar cuando el repo crezca.

Coste: 🟢 ligero (DOM/CSS) · 🟡 JS/animación (pausar fuera de pantalla) · 🔴 WebGL (solo desktop con fallback estático). ✚ = hay versión parcheada en `template/components/bits`.

## Animations

| | Componente | Qué hace | Deps | Avisos |
|---|---|---|---|---|
| 🟡 | **AnimatedContent** | Wrapper that animates any children on scroll or mount with configurable direction, distance, duration, easing and disappear options. | gsap |  |
| 🟡 | **BlobCursor** | Organic blob cursor that smoothly follows the pointer with inertia and elastic morphing. | gsap | efecto de cursor: inútil en táctil → solo (hover:hover) |
| 🟡 | **ClickSpark** ✚ | Creates particle spark bursts at click position. | — |  |
| 🟡 | **Crosshair** | Custom crosshair cursor with tracking, and link hover effects. | gsap | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🟡 | **Cubes** | 3D rotating cube cluster. Supports auto-rotation or hover interaction. | gsap | bucle por frame: pausar fuera de pantalla (useInViewRef); usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🟡 | **ElectricBorder** | Jittery electric energy border with animated arcs, glow and adjustable intensity. | — | bucle por frame: pausar fuera de pantalla (useInViewRef); blend/blur costoso: evitar a pantalla completa en móvil |
| 🟡 | **FadeContent** | Simple directional fade / slide entrance / exit wrapper with threshold-based activation. | gsap |  |
| 🟢 | **GlareHover** | Adds a realistic moving glare highlight on hover over any element. | — |  |
| 🟢 | **GradualBlur** | Progressively un-blurs content based on scroll or trigger creating a cinematic reveal. | mathjs | blend/blur costoso: evitar a pantalla completa en móvil |
| 🔴 | **ElectricLogo** | Turns any SVG or PNG into a living lightning outline, with flowing strands, arcs that leap off the edges and a charge that follows the cursor. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef); manipula píxeles de canvas por frame: muy caro; usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🔴 | **DitherVeil** | A photo printed as a 1-bit dither that the cursor burns through to full colour, leaving a trail that knits back cell by cell. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef); manipula píxeles de canvas por frame: muy caro |
| 🔴 | **GlowCursor** | Shader-powered light trail that smoothly follows the pointer with customizable glow, color, taper and pulse. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef); efecto de cursor: inútil en táctil → solo (hover:hover) |
| 🔴 | **GhostCursor** | Semi-transparent ghost cursor that smoothly follows the real cursor with a trailing effect. | three | bucle por frame: pausar fuera de pantalla (useInViewRef); blend/blur costoso: evitar a pantalla completa en móvil; efecto de cursor: inútil en táctil → solo (hover:hover); usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🟡 | **ImageTrail** | Cursor-based image trail with several built-in variants. | gsap | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🟡 | **LogoLoop** | Continuously looping marquee of brand or tech logos with seamless repeat and hover pause. | — | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🟢 | **Magnet** ✚ | Elements magnetically ease toward the cursor then settle back with spring physics. | — |  |
| 🟢 | **MagnetLines** | Animated field lines bend toward the cursor. | — |  |
| 🔴 | **MetaBalls** | Liquid metaball blobs that merge and separate with smooth implicit surface animation. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **Strands** | Glowing ribbon-like strands that ripple and weave across a transparent canvas. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **MetallicPaint** | Liquid metallic paint shader which can be applied to SVG elements. | — | bucle por frame: pausar fuera de pantalla (useInViewRef); manipula píxeles de canvas por frame: muy caro |
| 🟡 | **Noise** | Animated film grain / noise overlay adding subtle texture and motion. | — | asume pantalla completa (h-screen/w-screen): ajustar tamaño al contenedor; bucle por frame: pausar fuera de pantalla (useInViewRef); manipula píxeles de canvas por frame: muy caro; usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🔴 | **PixelTrail** | Pixelated cursor trail emitting fading squares with retro digital feel. | three, @react-three/fiber, @react-three/drei |  |
| 🟡 | **PixelTransition** | Pixel dissolve transition for content reveal on hover. | gsap |  |
| 🟢 | **PixelSwap** | Pixel fragments assemble into a full cover, swap arbitrary content, then dissolve away with reversible colors and triggers. | — |  |
| 🔴 | **Ribbons** | Flowing responsive ribbons/cursor trail driven by physics and pointer motion. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef); usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🔴 | **ShapeBlur** | Morphing blurred geometric shape. The effect occurs on hover. | three | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **SplashCursor** | Liquid splash burst at cursor with curling ripples and waves. | — | asume pantalla completa (h-screen/w-screen): ajustar tamaño al contenedor; bucle por frame: pausar fuera de pantalla (useInViewRef); efecto de cursor: inútil en táctil → solo (hover:hover); usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🟢 | **StarBorder** ✚ | Animated star / sparkle border orbiting content with twinkle pulses. | — |  |
| 🟡 | **StickerPeel** | Sticker corner lift + peel interaction using 3D transform and shadow depth. | gsap |  |
| 🟡 | **TargetCursor** | A cursor follow animation with 4 corners that lock onto targets. | gsap | bucle por frame: pausar fuera de pantalla (useInViewRef); efecto de cursor: inútil en táctil → solo (hover:hover) |
| 🔴 | **LaserFlow** | Dynamic laser light that flows onto a surface, customizable effect. | three | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **Antigravity** | 3D antigravity particle field that repels from the cursor with smooth motion. | three, @react-three/fiber | bucle por frame: pausar fuera de pantalla (useInViewRef); usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🟡 | **OrbitImages** | SVG Path customizable orbiting images effect | motion |  |
| 🔴 | **MagicRings** | Interactive magic rings effect with customizable parameters. | three | bucle por frame: pausar fuera de pantalla (useInViewRef) |

## TextAnimations

| | Componente | Qué hace | Deps | Avisos |
|---|---|---|---|---|
| 🔴 | **AsciiText** | Renders text with an animated ASCII background for a retro feel. | three | bucle por frame: pausar fuera de pantalla (useInViewRef); blend/blur costoso: evitar a pantalla completa en móvil; manipula píxeles de canvas por frame: muy caro; usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🟡 | **BlurText** ✚ | Text starts blurred then crisply resolves for a soft-focus reveal effect. | motion |  |
| 🟡 | **CircularText** ✚ | Layouts characters around a circle with optional rotation animation. | motion |  |
| 🟡 | **CountUp** ✚ | Animated number counter supporting formatting and decimals. | motion |  |
| 🟡 | **CurvedLoop** ✚ | Flowing looping text path along a customizable curve with drag interaction. | — |  |
| 🟡 | **DecryptedText** | Hacker-style decryption cycling random glyphs until resolving to real text. | motion | usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🟡 | **FallingText** | Characters fall with gravity + bounce creating a playful entrance. | matter-js | bucle por frame: pausar fuera de pantalla (useInViewRef); usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🟡 | **FuzzyText** | Vibrating fuzzy text with controllable hover intensity. | — | bucle por frame: pausar fuera de pantalla (useInViewRef); usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🟢 | **GlitchText** | RGB split and distortion glitch effect with jitter effects. | — |  |
| 🟡 | **GradientText** | Animated gradient sweep across live text with speed and color control. | motion | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🟡 | **RotatingText** ✚ | Cycles through multiple phrases with 3D rotate / flip transitions. | motion |  |
| 🟡 | **ScrambledText** | Detects cursor position and applies a distortion effect to text. | gsap |  |
| 🟡 | **ScrollFloat** | Text gently floats / parallax shifts on scroll. | gsap |  |
| 🟡 | **ScrollReveal** | Text gently unblurs and reveals on scroll. | gsap |  |
| 🟡 | **ScrollVelocity** ✚ | Text marquee animatio - speed and distortion scale with user's scroll velocity. | motion |  |
| 🟡 | **ShinyText** ✚ | Metallic sheen sweeps across text producing a reflective highlight. | motion |  |
| 🟡 | **SplitText** | Splits text into characters / words for staggered entrance animation. | gsap, @gsap/react |  |
| 🟡 | **TextCursor** | Make any text element follow your cursor, leaving a trail of copies behind it. | motion | efecto de cursor: inútil en táctil → solo (hover:hover); usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🟡 | **TextPressure** | Characters scale / warp interactively based on pointer pressure zone. | — | bucle por frame: pausar fuera de pantalla (useInViewRef); posible setState por frame: revisar |
| 🟡 | **TextType** | Typewriter effect with blinking cursor and adjustable typing cadence. | gsap | usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🟡 | **TrueFocus** | Applies dynamic blur / clarity based over a series of words in order. | motion |  |
| 🟡 | **VariableProximity** | Letter styling changes continuously with pointer distance mapping. | motion | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🟡 | **Shuffle** | Animated text reveal where characters shuffle before settling. | gsap, @gsap/react | usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🟡 | **ParticleText** | Text assembles from drifting particles that scatter and reform on demand. | — | bucle por frame: pausar fuera de pantalla (useInViewRef); manipula píxeles de canvas por frame: muy caro |
| 🟡 | **SplitFlapText** | Mechanical split-flap departure board that clacks through to each new phrase. | — | bucle por frame: pausar fuera de pantalla (useInViewRef); usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🔴 | **WarpText** | WebGL warp that bends and refracts the text around the pointer. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🟡 | **TechText** | A wordmark whose letters turn into dashed vector paths under the cursor. Grab any letter to drag it off the baseline and it springs back home. | — | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🟡 | **StrokeText** | Outlined letterforms draw themselves on, then flood with fill. | gsap |  |
| 🟡 | **DepthText** | Layered extruded type with parallax that shifts against the pointer. | — | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🟡 | **FoldText** | Lines unfold into place like creased paper opening flat. | gsap | blend/blur costoso: evitar a pantalla completa en móvil |
| 🟡 | **EchoText** | Ghosted copies trail behind the text and settle into a single word. | — | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🟡 | **MaskedHeading** | A large headline with a drifting colour mesh or image showing through the glyphs, revealed word by word. | gsap | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🟡 | **TextLoop** | A seamless text marquee that flows along curved SVG paths. | gsap |  |

## Components

| | Componente | Qué hace | Deps | Avisos |
|---|---|---|---|---|
| 🟡 | **AnimatedList** | List items enter with staggered motion variants for polished reveals. | motion |  |
| 🟡 | **BounceCards** | Cards bounce that bounce in on mount. | gsap |  |
| 🟡 | **BubbleMenu** | Floating circular expanding menu with staggered item reveal. | gsap |  |
| 🟡 | **CardNav** | Expandable navigation bar with card panels revealing nested links. | gsap, react-icons |  |
| 🟡 | **CardSwap** | Cards animate position swapping with smooth layout transitions. | gsap |  |
| 🟡 | **Carousel** | Responsive carousel with touch gestures, looping and transitions. | motion, react-icons | bucle por frame: pausar fuera de pantalla (useInViewRef); posible setState por frame: revisar |
| 🟡 | **ChromaGrid** | A responsive grid of grayscale tiles. Hovering the grid reaveals their colors. | gsap |  |
| 🔴 | **FlexCarousel** | An infinite image row that flows through invisible liquid glass at its edges, with four bend presets, five entrances, a speed squeeze and click to focus. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef); manipula píxeles de canvas por frame: muy caro |
| 🟡 | **DepthCarousel** | Cards recede into depth on a 3D rail, with drag, keyboard and auto-advance. | gsap | blend/blur costoso: evitar a pantalla completa en móvil |
| 🟡 | **AccordionGallery** | Panels expand on hover or focus, revealing parallax imagery and captions. | gsap |  |
| 🔴 | **MorphSlider** | WebGL slider that melts between images with a displacement transition. | ogl, gsap | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🟡 | **DriftWall** | An endless perspective wall of tiles drifting past, lifting on hover. | — | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **CircularGallery** | Circular orbit gallery rotating images. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef); usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🟡 | **Counter** | Flexible animated counter supporting increments + easing. | motion |  |
| 🟡 | **DecayCard** | Hover parallax effect that disintegrates the content of a card. | gsap | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🟡 | **Dock** | macOS style magnifying dock with proximity scaling of icons. | motion |  |
| 🟡 | **DomeGallery** | Immersive 3D dome gallery projecting images on a hemispheric surface. | @use-gesture/react | bucle por frame: pausar fuera de pantalla (useInViewRef); posible setState por frame: revisar |
| 🟡 | **ElasticSlider** | Slider handle stretches elastically then snaps with spring physics. | motion |  |
| 🟡 | **FlowingMenu** | Liquid flowing active indicator glides between menu items. | gsap |  |
| 🔴 | **FluidGlass** | Glassmorphism container with animated liquid distortion refraction. | three, @react-three/fiber, @react-three/drei, maath | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **FlyingPosters** | 3D posters rotate on scroll infinitely. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🟢 | **Folder** | Interactive folder opens to reveal nested content smooth motion. | — |  |
| 🟢 | **GlassIcons** | Icon set styled with frosted glass blur. | — | blend/blur costoso: evitar a pantalla completa en móvil |
| 🟢 | **GlassSurface** | Advanced Apple-style glass surface with real-time distortion + lighting. | — | blend/blur costoso: evitar a pantalla completa en móvil |
| 🟡 | **GooeyNav** | Navigation indicator morphs with gooey blob transitions between items. | — | bucle por frame: pausar fuera de pantalla (useInViewRef); posible setState por frame: revisar; blend/blur costoso: evitar a pantalla completa en móvil; usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🟡 | **InfiniteSpiral** | An endlessly looping 3D helix of images with customizable motion, depth, spacing and interaction. | — | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **InfiniteMenu** | Horizontally looping menu effect that scrolls endlessly with seamless wrap. | gl-matrix | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **Lanyard** | Swinging 3D lanyard / badge card with realistic inertial motion. | three, meshline, @react-three/fiber, @react-three/drei, @react-three/rapier | asume pantalla completa (h-screen/w-screen): ajustar tamaño al contenedor; bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🟡 | **MagicBento** | Interactive bento grid tiles expand + animate with various options. | gsap | blend/blur costoso: evitar a pantalla completa en móvil; usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🟡 | **Masonry** | Responsive masonry layout with animated reflow + gaps optimization. | gsap | usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🔴 | **ModelViewer** | Three.js model viewer with orbit controls and lighting presets. | three, @react-three/fiber, @react-three/drei | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🟡 | **PillNav** | Minimal pill nav with sliding active highlight + smooth easing. | gsap, react-router-dom |  |
| 🟡 | **PixelCard** | Card content revealed through pixel expansion transition. | — | bucle por frame: pausar fuera de pantalla (useInViewRef); usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🟡 | **ProfileCard** | Animated profile card glare with 3D hover effect. | — | bucle por frame: pausar fuera de pantalla (useInViewRef); posible setState por frame: revisar; blend/blur costoso: evitar a pantalla completa en móvil |
| 🟡 | **ScrollStack** | Overlapping card stack reveals on scroll with depth layering. | lenis | asume pantalla completa (h-screen/w-screen): ajustar tamaño al contenedor; bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🟢 | **SpotlightCard** ✚ | Dynamic spotlight follows cursor casting gradient illumination. | — |  |
| 🟡 | **BorderGlow** | Glowing mesh-gradient border that follows cursor direction and intensifies near edges. | — | bucle por frame: pausar fuera de pantalla (useInViewRef); posible setState por frame: revisar |
| 🟡 | **LineSidebar** | Static list navigation with a cursor-proximity effect that shifts and highlights nearby items. | — | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🟡 | **OptionWheel** | Curved option picker that spins via scroll, drag, or arrow keys, fading and tilting items away from the selection. | — | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **SpecularButton** | Glass button with a shader-driven specular rim light that sweeps around the edge and follows the cursor. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef); blend/blur costoso: evitar a pantalla completa en móvil |

## Animations

| | Componente | Qué hace | Deps | Avisos |
|---|---|---|---|---|
| 🔴 | **ElasticMesh** | Spring-mesh surface that stretches under the pointer and settles back with damped physics. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **RippleDistortion** | Pointer-driven water displacement that warps content and leaves a decaying wake. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **SwarmCursor** | Flocking particle swarm that chases the pointer, jostles for space and drifts apart at rest. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef); efecto de cursor: inútil en táctil → solo (hover:hover); usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🔴 | **HalftoneReveal** | Print-style halftone dot matrix that resolves into sharp content around the cursor. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🟡 | **ScrollExpand** | A rounded media frame that grows to full bleed as it scrolls through the viewport. | — | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🟡 | **CursorGrid** | Canvas grid whose cells light up around the cursor with configurable radius, falloff and click pulses. | — | bucle por frame: pausar fuera de pantalla (useInViewRef); efecto de cursor: inútil en táctil → solo (hover:hover) |

## Components

| | Componente | Qué hace | Deps | Avisos |
|---|---|---|---|---|
| 🟢 | **CurvedInput** | Arc-bent input bar with text, caret and submit button all following the curve. | — |  |
| 🟡 | **Stack** | Layered stack with swipe animations, autoplay and smooth transitions. | motion | usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🟡 | **Stepper** | Animated multi-step progress indicator with active state transitions. | motion |  |
| 🟡 | **TiltedCard** ✚ | 3D perspective tilt card reacting to pointer. | motion |  |
| 🟡 | **StaggeredMenu** | Menu with staggered item animations and smooth transitions on open/close. | gsap | asume pantalla completa (h-screen/w-screen): ajustar tamaño al contenedor; blend/blur costoso: evitar a pantalla completa en móvil |
| 🟢 | **ReflectiveCard** | Card with dynamic webcam reflection and glare effects that respond to cursor movement. | lucide-react | blend/blur costoso: evitar a pantalla completa en móvil |

## Backgrounds

| | Componente | Qué hace | Deps | Avisos |
|---|---|---|---|---|
| 🔴 | **MicroSlats** | A wall of tiny slats that becomes a rolling sea in perspective, with glinting crests, four presets, a real fluid the cursor stirs and an intro that rolls in from the horizon. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🟡 | **ShapeWaves** | A WebGPU field of triangles, circles and squares that brighten and grow along rolling waves, with an optional text cutout the waves flow around. | vgpu | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🟡 | **AeroShards** | A GPU-driven wind sculpture of folded foil shards with crisp detail, content-safe placements, and responsive pointer interactions. | vgpu | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **GhostFibers** | A deep-blue recursive fiber field with luminous bands, radial twisting and soft atmospheric glow. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **Aurora** | Flowing aurora gradient background. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **Balatro** | The balatro shader, fully customizalbe and interactive. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **Ballpit** | Physics ball pit simulation with bouncing colorful spheres. | three, gsap | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **Beams** | Crossing animated ribbons with customizable properties. | three, @react-three/fiber, @react-three/drei | bucle por frame: pausar fuera de pantalla (useInViewRef); usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🔴 | **ColorBends** | Vibrant color bends with smooth flowing animation. | three | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **CRTWarp** | Full-canvas CRT plasma with curved distortion, scanlines, bloom and pointer interaction. | three | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **DarkVeil** | Subtle dark background with a smooth animation and postprocessing. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **Dither** | Retro dithered noise shader background. | @react-three/fiber, @react-three/postprocessing, postprocessing, three | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🟡 | **DotField** | Interactive dot grid with cursor bulge, glow, sparkle, and wave effects. | — | bucle por frame: pausar fuera de pantalla (useInViewRef); usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🟡 | **DotGrid** | Animated dot grid with cursor interactions. | gsap | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **FaultyTerminal** | Terminal CRT scanline squares effect with flicker + noise. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef); usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🔴 | **Galaxy** | Parallax realistic starfield with pointer interactions. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **GradientBlinds** | Layered gradient blinds with spotlight and noise distortion. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **Lightfall** | Colorful light streaks raining down a glowing tunnel with a cursor light. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **Ferrofluid** | A churning magnetic fluid traced by glowing contour lines, with a cursor magnet. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **MoltenMetal** | Swirling caustic plasma filaments with molten, white-hot cores. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **GradientWaves** | Raymarched sine waves rolling toward a soft, hazy horizon. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **WebThreads** | Glowing sine threads woven through a luminous convergence point. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **Topography** | A living contour map with glowing, elevation-tinted lines. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **LightTunnel** | A radial fibre-optic tunnel with light pulses racing into depth. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **SlicedWaves** | A grid of soft glowing bars rippling like a slatted equalizer. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **AcidSquares** | A crystalline corridor of stacked squares receding into depth. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **Scanner** | Calm interference bands sweeping across the screen like an oscilloscope. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **Grainient** | Grainy gradient swirls with soft wave distortion. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **GridScan** | Animated grid room 3D scan effect and cool interactions. | three, face-api.js, postprocessing | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **GridDistortion** | Warped grid mesh distorts smoothly reacting to cursor. | three | bucle por frame: pausar fuera de pantalla (useInViewRef); usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🟡 | **GridMotion** | Perspective moving grid lines based on cusror position. | gsap | asume pantalla completa (h-screen/w-screen): ajustar tamaño al contenedor; bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **Hyperspeed** | Animated lines continuously moving to simulate hyperspace travel on click hold. | three, postprocessing | bucle por frame: pausar fuera de pantalla (useInViewRef); usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🔴 | **Iridescence** | Slick iridescent shader with shifting waves. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🟡 | **LetterGlitch** | Matrix style letter animation. | — | bucle por frame: pausar fuera de pantalla (useInViewRef); usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🔴 | **LightRays** | Volumetric light rays/beams with customizable direction. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **Lightning** | Procedural lightning bolts with branching and glow flicker. | — | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **LineWaves** | Animated line wave pattern with colorful warped distortion. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **EvilEye** | Procedural evil eye shader with animated iris, slit pupil, and fiery outer glow. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **Radar** | Radar sweep effect with concentric rings, radial spokes, and a rotating beam. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **SoftAurora** | Soft aurora borealis shader with 3D Perlin noise and cosine gradient palettes. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **LiquidChrome** | Liquid metallic chrome shader with flowing reflective surface. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **Orb** | Floating energy orb with customizable hover effect. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **Particles** | Configurable particle system. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef); usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🔴 | **PixelBlast** | Exploding pixel particle bursts with optional liquid postprocessing. | three, postprocessing | bucle por frame: pausar fuera de pantalla (useInViewRef); usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🔴 | **Plasma** | Organic plasma gradients swirl + morph with smooth turbulence. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **PlasmaWave** | Raymarched plasma waves with dual-wave interference and OGL. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **Prism** | Rotating prism with configurable intensity, size, and colors. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef); usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🔴 | **PrismaticBurst** | Burst of light rays with controllable color, distortion, amount. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **RippleGrid** | A grid that continuously animates with a ripple effect. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **Silk** | Smooth waves background with soft lighting. | @react-three/fiber, three | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **SideRays** | Animated light rays emanating from the side with customizable colors and speed. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🟡 | **ShapeGrid** | Animated grid with shape variants (square, hexagon, circle, triangle) + direction customization. | — | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **Threads** | Animated pattern of lines forming a fabric-like motion. | ogl | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🟡 | **Waves** | Layered lines that form smooth wave patterns with animation. | — | bucle por frame: pausar fuera de pantalla (useInViewRef); posible setState por frame: revisar; usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🔴 | **LiquidEther** | Interactive liquid shader with flowing distortion and customizable colors. | three | bucle por frame: pausar fuera de pantalla (useInViewRef); usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🔴 | **FloatingLines** | 3D floating lines that react to cursor movement. | three | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **LightPillar** | Vertical pillar of light with glow effects. | three | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **PixelSnow** | Falling pixelated snow effect with customizable density and speed. | three | bucle por frame: pausar fuera de pantalla (useInViewRef) |

## Micro

| | Componente | Qué hace | Deps | Avisos |
|---|---|---|---|---|
| 🟡 | **SquishSwitch** | Drag-scrubbable switch whose thumb stretches by how fast it moves, flips at the midpoint and squashes against the track end on a flick. | motion |  |
| 🟡 | **HoldButton** | Hold-to-confirm button whose liquid fill rises while pressed, snaps back on an early release and swaps its label through a blur when the hold completes. | — | bucle por frame: pausar fuera de pantalla (useInViewRef); posible setState por frame: revisar |
| 🟢 | **PeekRating** | Star rating you can try before you commit: sweeping the row lifts a trailing wave of stars up to the pointer while a tip hops along with the label; a click commits with a pop. | @hugeicons/react, @hugeicons/core-free-icons |  |
| 🟡 | **SpringCheck** | Checkbox row where a single spring fills the box, draws the tick, strikes the label and dims the words in one press. | motion, @hugeicons/core-free-icons |  |
| 🟡 | **PulseHeart** | Like button that contracts to a dot, flips colour at its smallest frame and pulses back while the count swaps one glyph. | @hugeicons/core-free-icons | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🟡 | **RubberSegment** | Segmented control with a rubber thumb: taps stretch it across the gap and squash it onto the target, and you can grab, drag and flick it between slots. | motion |  |
| 🟡 | **SlideCommit** | Slide-to-confirm handle that plants with a spinner while your action runs, unfurls into a done pill on success and springs home with a squash and shake on failure. | motion, @hugeicons/react, @hugeicons/core-free-icons |  |
| 🟡 | **WarmTooltip** | Tooltip group with one shared delay: the first label waits and pops from its trigger, then siblings open instantly while the group is warm, with an optional velocity lean. | motion | bucle por frame: pausar fuera de pantalla (useInViewRef); usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🟢 | **FuseButton** | Action button whose done state carries its own undo on a burning fuse: press, the label crossfades to Undo, a hairline burns for the undo window, and Undo or Escape runs it back. | @hugeicons/react, @hugeicons/core-free-icons |  |
| 🟡 | **ScrubField** | Number chip you drag to scrub: the value follows the hand, pushes past the range on a rubber band, and a click without moving opens it for typing. | motion |  |
| 🟢 | **LatticeLoader** | Inline agent-status row: a 3x3 or 4x4 lattice whose cells brighten in a phase-offset wave beside a verb and a live stopwatch, resolving into a check or a cross when the task ends. | — |  |
| 🟡 | **DodgeField** | Wrapper that makes any child flee the pointer inside a bounded field, dodges once per approach, then relents after a few tries and glides home. | motion | bucle por frame: pausar fuera de pantalla (useInViewRef); posible setState por frame: revisar |
| 🟡 | **CodeSlots** | One-time-code input where a hidden overlay input owns focus, paste and SMS autofill while each slot lands its digit on one spring: the fill swells from the centre, the digit rises and the caret glides; a wrong code drains the slots in a cascade, a right one merges them into a single accent wash. | motion, @hugeicons/react, @hugeicons/core-free-icons |  |
| 🟡 | **WakeSlider** | Range slider drawn as thin bars with no thumb: drag speed raises a wake that trails behind the handle and flattens again at rest. | motion |  |
| 🟡 | **CometDial** | Tick-ring dial you flick by angle: the reading launches on a spring and a velocity-driven comet streaks behind the lit head, trailing the direction of travel and vanishing at rest. | motion | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🟡 | **JellyRadio** | Radio group of labelled chips where the chosen one swells wide-then-tall on two springs and barges its neighbours outward with a travelling stagger, so a selection reads as a force moving through the row. | motion |  |
| 🟡 | **SwipeRow** | List row that swipes open to reveal actions, snaps by flick velocity, and deletes on a full swipe that stretches the action colour across the row. | motion, @hugeicons/react, @hugeicons/core-free-icons |  |
| 🟢 | **GlideSelect** | Select chip whose menu pops out of its own corner and whose single hover highlight glides between rows, remembering where you left it so re-entry slides from there instead of blinking in. | @hugeicons/react, @hugeicons/core-free-icons |  |
| 🟡 | **StatusMark** | A 20px status glyph for agent task lists that morphs in place from a dashed idle ring to a spinning or real-progress arc, then draws a check or a cross, with an optional label strike. | motion |  |
| 🟡 | **CallChip** | Inline tool-call chip whose fill wipes across while a live ms counter ticks, completing with a green wash on success or stopping short and shaking red with a retry glyph on error. | @hugeicons/react, @hugeicons/core-free-icons | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🟡 | **BellToggle** | Pill toggle that answers a press at three tempos: the bell rings on damped keyframes, the label blur-crossfades, and the pill unfurls to the longer label through a clip-path on a critically damped spring. The pressed state is the receipt. | motion, @hugeicons/react, @hugeicons/core-free-icons |  |
| 🟡 | **SlingButton** | Send button you pull back like a slingshot: the band stretches, a power arc arms it, and releasing fires the action with the flick's velocity. | motion, @hugeicons/react, @hugeicons/core-free-icons | bucle por frame: pausar fuera de pantalla (useInViewRef); usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🟡 | **SwipeToast** | Single toast that rises through its bottom edge, swipes down to dismiss on a flick or a distance, and burns a thin fuse for exactly its remaining time; hover pauses it and an inline mode keeps it inside any container. | motion, @hugeicons/react, @hugeicons/core-free-icons | asume pantalla completa (h-screen/w-screen): ajustar tamaño al contenedor; bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🟡 | **PromptBar** | Chat composer with an @ sources menu, a / commands menu, a model picker, dictation and attachments, whose send tile charges to ink the moment there is something to send and morphs its arrow into a stop square while busy. | motion, @hugeicons/react, @hugeicons/core-free-icons | bucle por frame: pausar fuera de pantalla (useInViewRef); usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |
| 🟡 | **SloshGauge** | Tank gauge whose liquid chases the value with mass, tilts with its own speed and splashes against the top when it slams full; optionally a vertical slider. | — | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🟡 | **VoicePill** | Mic button that swells into a tinted capsule of level-driven equalizer bars and an elapsed clock while held or toggled, then relaxes back into the mic on release; simulated voice by default, real microphone as an opt-in. | @hugeicons/react, @hugeicons/core-free-icons | bucle por frame: pausar fuera de pantalla (useInViewRef); posible setState por frame: revisar |
| 🟡 | **ThoughtLine** | Reasoning-trace header: a glyph and a label breathe beside a live clock while steps appear beneath, then the line settles on one beat into "Thought for 4.2s" through a blur crossfade and the trace folds into it. | motion, @hugeicons/react, @hugeicons/core-free-icons |  |
| 🟡 | **RefineFrame** | Reserved-aspect frame that walks any media through queued, generating, refining and complete without layout shift: each stage is one blur, saturate, scale and opacity tween, a soft band sweeps while it works, a chip reports the stage, and an error dims the picture behind a retry pill. | @hugeicons/react, @hugeicons/core-free-icons | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🟡 | **FolderFloat** | Folder that opens on hover or press: the flap tilts toward you, a paper edge rises, and its notes spring out from behind the flap into a floating cloud to pick from, then sink back when the folder closes. | matter-js | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🟢 | **BranchedMenu** | Collapsible menu whose sections unfold into a trunk with a curved branch to each child, and an accent line that travels down the trunk and around the curve to whatever you pick, while a marker glides to the open section. | @hugeicons/react, @hugeicons/core-free-icons |  |
| 🟡 | **FlipCard** | Two-faced card that flips in 3D on a click, a drag or a flick, settling on a spring that carries your release velocity, with an optional cursor tilt, a sheen that follows the pointer and a shadow that narrows as it turns edge on. | motion |  |
| 🟡 | **TearTicket** | Ticket whose perforated stub tears off by hand: paper bridges stretch into fibres and snap one by one from the far end, the torn edges are jagged and fit each other, the freed stub dangles and drops, and the body is stamped as used. The artwork tilts in 3D with parallax on hover. | motion | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🔴 | **PaperCrumple** | An image that crumples into a textured 3D sheet while held and follows the grabbed point as you drag. Release it as a crumpled ball, unfold it flat, or leave the paper creased, with customizable folds, paper grain, lighting and shadows. | three | bucle por frame: pausar fuera de pantalla (useInViewRef) |
| 🟡 | **Shredder** | A list with a paper shredder at the bottom. Drag a row into the slit and the rollers tug it in, pull it through and cut it into strips that curl out underneath, tumble away and fade out. The rest of the list settles down on a spring and the shredded item is handed to you to delete. | — | bucle por frame: pausar fuera de pantalla (useInViewRef); usa aleatoriedad/fecha: si se renderiza en servidor da error de hidratación → importar con next/dynamic({ ssr: false }) |

_211 componentes._
