# Direcciones de arte

Cada web de One-Shoot parte de **una** dirección de arte elegida para ESE negocio (sector + paleta + assets + público), no de la última web que se hizo. La dirección fija tipografía, composición, ritmo de animación y qué componentes de React Bits encajan. Luego se personaliza con la marca.

**Cómo elegir** (paso 3 del SKILL):
1. Descarta las que chocan con la paleta (una paleta pastel no pide "Neón nocturno").
2. Descarta la dirección de la última web (`bits.mjs history`) salvo que el brief la exija.
3. De las que quedan, elige la que mejor cuente **qué hace distinto a este negocio**. Puedes mezclar dos (p. ej. "Editorial" + "Artesanal"), pero una debe mandar.
4. Escríbela en el brief de diseño con su id.

Fuentes: todas de Google Fonts vía `next/font/google`. Nunca Inter/Roboto/Arial como display.

---

## `rotulo-de-barrio` — Rótulo de barrio
- **Vibe**: bar de toda la vida con orgullo; pizarra, neón de tienda, pegatinas. Directo y cálido.
- **Encaja**: hamburgueserías, pizzerías, kebabs, bares, take-away, talleres, tiendas de barrio.
- **Tipos**: display condensada (Anton, Bebas Neue, Oswald 700, Big Shoulders Display) + sans (Archivo, Barlow) + manuscrita de acento (Permanent Marker, Caveat Brush).
- **Color**: fondo oscuro o crema; principal del cliente en CTA y chips; sombras duras `5px 5px 0`.
- **Firma**: franjas diagonales, sello girando, precios con línea de puntos, doodles SVG a mano.
- **Movimiento**: rápido, con rebote leve en detalles (bounce 0.15); marquee inclinado.
- **Bits candidatos**: RotatingText, CircularText, ScrollVelocity, CurvedLoop, TiltedCard, SpotlightCard, StickerPeel, SplitFlapText (precios/horario), SlideCommit ("desliza para pedir").
- **Evita**: glassmorphism, gradientes SaaS.

## `editorial` — Revista / editorial
- **Vibe**: portada de revista gastronómica o de diseño. Mucho aire, tipografía protagonista, fotos grandes.
- **Encaja**: restaurantes de autor, vinotecas, floristerías, estudios de arquitectura/interiorismo, librerías.
- **Tipos**: serif de alto contraste (Fraunces, Playfair Display, DM Serif Display, Instrument Serif, Bodoni Moda) + sans neutra (Inter Tight, Manrope) en tamaños pequeños con tracking.
- **Color**: fondo papel (#f6f1ea / blanco roto) o negro tinta; la paleta en acentos finos (filetes, números de sección).
- **Firma**: números de sección gigantes ("01 — La cocina"), columnas asimétricas, pies de foto en cursiva, drop caps.
- **Movimiento**: lento y elegante (600-900 ms, ease-out suave, sin rebote); revelados con máscara (clip-path).
- **Bits candidatos**: SplitText, ScrollReveal, MaskedHeading, FoldText, BlurText, GradualBlur, AccordionGallery, Masonry, ScrollFloat, TextType (subtítulos).
- **Evita**: sombras duras, badges chillones, más de 1 elemento que se mueva a la vez.

## `artesanal` — Artesanal / orgánico
- **Vibe**: obrador, papel kraft, manos, producto natural. Cercano y honesto.
- **Encaja**: panaderías, pastelerías, cafeterías de especialidad, queserías, cosmética natural, ceramistas, huertos.
- **Tipos**: serif amable (Fraunces soft, Recoleta-like → "Young Serif", "Gloock"), redondeada (Nunito, Quicksand) + manuscrita (Caveat, Kalam).
- **Color**: tonos tierra de la paleta; texturas suaves (SVG grain estático), esquinas muy redondeadas, formas orgánicas (blobs SVG).
- **Firma**: fotos recortadas en formas orgánicas, etiquetas tipo sello de caucho, ilustraciones a línea.
- **Movimiento**: suave, flotante (springs bounce 0.2), nada mecánico.
- **Bits candidatos**: BlurText, Stack, BounceCards, CircularText (sello de obrador), FlipCard, PeekRating, Folder, ShapeWaves 🟢, Waves 🟢, SoftAurora 🔴 (solo desktop).
- **Evita**: neón, glitch, grids técnicos.

## `lujo-sobrio` — Lujo sobrio
- **Vibe**: joyería, hotel boutique. Silencio, lujo que no grita.
- **Encaja**: clínicas estéticas, joyerías, inmobiliarias premium, barberías de alto nivel, spas, bodegas.
- **Tipos**: serif fina o didona (Cormorant Garamond, Italiana, Bodoni Moda) + sans geométrica ligera (Jost 300, Montserrat 300) en mayúsculas espaciadas.
- **Color**: fondo muy oscuro o marfil; un único acento (dorado, champán o el principal del cliente muy dosificado).
- **Firma**: líneas finas de 1px, mucho espacio negativo, imágenes a sangre, números romanos.
- **Movimiento**: muy lento (800-1200 ms), fades con blur mínimo, parallax sutil.
- **Bits candidatos**: ShinyText, BlurText, GradualBlur, GlareHover, ReflectiveCard, MetallicPaint, Silk 🔴 / Iridescence 🔴 (fondo hero desktop), ScrollExpand, DepthCarousel.
- **Evita**: rebotes, colores saturados, más de 2 tipos.

## `neon-nocturno` — Neón nocturno
- **Vibe**: noche, club, arcade, cócteles. Energía.
- **Encaja**: coctelerías, discotecas, salas de juegos, tatuajes, estudios de música, eventos.
- **Tipos**: display ancha o futurista (Unbounded, Syne 800, Monoton para detalles, Orbitron con moderación) + mono (JetBrains Mono, Space Mono).
- **Color**: negro profundo; principal del cliente como luz (glow con `box-shadow` coloreado, no blur gigante).
- **Firma**: bordes que brillan, textos con glitch puntual, líneas de escaneo sutiles.
- **Movimiento**: rápido, con picos (glitch 120 ms), loops rítmicos.
- **Bits candidatos**: GlitchText, DecryptedText, ElectricBorder, BorderGlow, LetterGlitch, Lightning, FaultyTerminal 🔴, LightRays 🔴, Hyperspeed 🔴 (solo hero desktop), GooeyNav, TextPressure.
- **Evita**: fondo blanco, serif clásica.

## `suizo-tecnico` — Suizo / técnico
- **Vibe**: diseño suizo, grid visible, datos claros. Confianza por precisión.
- **Encaja**: trasteros, logística, gestorías, ingenierías, clínicas, academias, reformas, SaaS local.
- **Tipos**: grotesca (Space Grotesk, Inter Tight, Archivo, Familjen Grotesk) + mono para datos (IBM Plex Mono, JetBrains Mono).
- **Color**: fondo claro con grid; paleta en bloques planos; un color de acción.
- **Firma**: grid de fondo, etiquetas mono tipo "A-02", diagramas a escala, tablas limpias, calculadoras.
- **Movimiento**: crisp (150-250 ms), sin rebote, transiciones de estado precisas.
- **Bits candidatos**: SplitFlapText, Counter, CountUp, DotGrid, ShapeGrid, GridMotion, Stepper, RubberSegment, GlideSelect, ScrubField, StatusMark, MagicBento.
- **Evita**: manuscritas, texturas de papel.

## `brutalista` — Brutalista / zine
- **Vibe**: fanzine, póster fotocopiado, cruda y memorable.
- **Encaja**: tiendas de ropa urbana, skate, estudios creativos, música, galerías, tatuaje.
- **Tipos**: grotesca pesada o mono gigante (Archivo Black, Space Mono 700, Rubik Mono One) sin miedo a tamaños enormes.
- **Color**: 2-3 colores planos de la paleta, blanco/negro puro, bordes gruesos de 3-4px.
- **Firma**: bloques desalineados a propósito, texto rotado 90°, stickers, tipografía que desborda.
- **Movimiento**: instantáneo o a saltos (steps), hovers que desplazan bloques.
- **Bits candidatos**: StickerPeel, FallingText, Shuffle, ScrambledText, TextPressure, VariableProximity, DodgeField, PixelTransition, Masonry, LogoLoop.
- **Evita**: sombras suaves, degradados.

## `retro-70s` — Retro 70s / cálido
- **Vibe**: póster de los 70, curvas, sol, arcoíris de 3 bandas.
- **Encaja**: heladerías, food trucks, tiendas vintage, surf, cafeterías, peluquerías con estilo.
- **Tipos**: display redondeada gruesa (Shrikhand, Righteous, Bagel Fat One, Chango) + sans suave (DM Sans).
- **Color**: paleta cálida saturada; bandas de color curvas; fondo crema.
- **Firma**: arcos y ondas SVG, badges en forma de estrella, textos en arco.
- **Movimiento**: juguetón, springs con rebote 0.25, balanceo.
- **Bits candidatos**: CurvedLoop (curva marcada), CircularText, BounceCards, Stack, JellyRadio, SquishSwitch, PulseHeart, ShapeWaves, Waves, FlipCard.
- **Evita**: grids técnicos, negro puro.

## `minimal-calido` — Minimal cálido
- **Vibe**: nórdico/japonés, calma, materiales naturales.
- **Encaja**: fisioterapia, yoga, psicología, estudios de interiorismo, alojamientos rurales, dentistas modernos.
- **Tipos**: sans humanista (Manrope, Outfit, Plus Jakarta Sans) + serif opcional para titulares (Newsreader, Lora).
- **Color**: neutros cálidos + la paleta muy desaturada; un acento.
- **Firma**: fotos con bordes suaves, iconografía de línea fina, mucho aire, pocas secciones muy bien resueltas.
- **Movimiento**: sutil (fade + 8px), stagger 60 ms, casi nada en bucle.
- **Bits candidatos**: BlurText, AnimatedContent (o Reveal CSS), GradualBlur, Carousel, Stepper, PeekRating, WarmTooltip, SoftAurora 🔴 (muy tenue, desktop), Folder.
- **Evita**: marquees, glitch, sellos girando.

## `playful-pop` — Pop juguetón
- **Vibe**: color a tope, ilustración, diversión, familias.
- **Encaja**: jugueterías, ludotecas, academias infantiles, heladerías, parques de bolas, tiendas de caramelos, veterinarios.
- **Tipos**: display redondeada (Baloo 2, Fredoka, Lilita One, Luckiest Guy) + sans amable (Nunito).
- **Color**: paleta completa del cliente en bloques; fondos de color, no blanco.
- **Firma**: formas que rebotan, personajes/ilustraciones, botones gordos 3D.
- **Movimiento**: bouncy (springs 0.3), wiggle en hover, confeti en CTA.
- **Bits candidatos**: Ballpit 🔴, BounceCards, FallingText, ClickSpark, SlingButton, JellyRadio, SquishSwitch, GooeyNav, BubbleMenu, Stack, MetaBalls 🔴.
- **Evita**: serif, grises.

## `inmersivo-3d` — Inmersivo / 3D
- **Vibe**: experiencia, tecnología, "wow" al entrar.
- **Encaja**: estudios creativos, eventos, marcas tech, concesionarios, escape rooms, realidad virtual.
- **Tipos**: display geométrica (Clash Display-like → "Syne", "Unbounded", "Space Grotesk") + sans.
- **Color**: oscuro con la paleta como luz; degradados solo dentro del WebGL.
- **Firma**: fondo 3D interactivo en el hero (1 solo), resto de la web sobria para compensar.
- **Movimiento**: fluido, parallax por scroll, transiciones de sección grandes.
- **Bits candidatos**: (elige 1 🔴) Silk, LiquidEther, Galaxy, Hyperspeed, Prism, Orb, Iridescence, ColorBends, ModelViewer; + ScrollExpand, DepthText, GradualBlur, InfiniteMenu, DomeGallery, CircularGallery.
- **Evita**: más de un 🔴; en móvil, póster/vídeo estático del mismo fondo.

## `mediterraneo` — Mediterráneo luminoso
- **Vibe**: luz, cal, azul, terracota, verano. Fresco y turístico.
- **Encaja**: arrocerías, chiringuitos, alquiler vacacional, escuelas de vela, heladerías de costa, tiendas de cerámica, turismo local.
- **Tipos**: serif con carácter (Gloock, DM Serif Display, Fraunces) + sans luminosa (Figtree, Karla).
- **Color**: blanco cal + la paleta como azulejo/terracota; patrones de azulejo en SVG.
- **Firma**: arcos (ventanas), ondas de mar SVG, fotos a sangre con luz.
- **Movimiento**: ondulante, suave, loops lentos (olas).
- **Bits candidatos**: Waves 🟢, ShapeWaves, CurvedLoop (curva suave), BlurText, Carousel, AccordionGallery, OrbitImages, LogoLoop, PeekRating.
- **Evita**: negro dominante, glitch.

---

## Composiciones de hero (elige una distinta a la última web)
1. **Texto izquierda + media en marco inclinado derecha** (la de Mès Que Bo / Trasteros — ya muy usada).
2. **Titular gigante a sangre** que ocupa el ancho; la foto asoma recortada por detrás/entre letras.
3. **Media a pantalla completa** (vídeo/foto) con titular abajo-izquierda y degradado de legibilidad.
4. **Split 50/50 vertical**: mitad color plano con texto, mitad foto; en móvil, foto arriba.
5. **Centrado editorial**: sobretítulo, titular serif enorme centrado, 1 foto horizontal debajo.
6. **Collage / stickers**: 3-5 fotos recortadas, rotadas y superpuestas alrededor del titular.
7. **Tablero / dashboard**: el hero ES la herramienta (calculadora, buscador, selector de tamaño, reserva).
8. **Tipografía como ilustración**: una palabra enorme con TextPressure / VariableProximity / FallingText; sin foto.
9. **Carrusel de producto protagonista**: Stack / CardSwap / DepthCarousel con el titular al lado.
10. **Fondo WebGL + texto centrado** (solo `inmersivo-3d`/`lujo-sobrio`/`neon-nocturno`).
11. **Cartel / póster**: composición en rejilla rígida con bloques de color, como un cartel de concierto.
12. **Scroll-story**: hero corto que se expande al hacer scroll (ScrollExpand) hacia la primera sección.

## Alternativas por sección (evita repetir la misma solución)
- **Carta / catálogo**: tabs con píldora · acordeón por categoría · índice lateral sticky (desktop) + chips (móvil) · "pizarra" con SplitFlapText para destacados · cards con Stack en móvil · tabla editorial con números.
- **Servicios**: MagicBento · lista numerada editorial · cards que se voltean (FlipCard) · FlowingMenu (lista con marquee al hover) · Folder por servicio.
- **Proceso**: Stepper · línea de tiempo vertical con Reveal · 3 columnas numeradas · TearTicket como "ticket" de pasos.
- **Prueba social**: PeekRating · Stack de reseñas · cita gigante editorial · LogoLoop de medios/proveedores · contador de clientes.
- **Ubicación**: mapa con filtro de color · ilustración de mapa SVG propia + botón "Cómo llegar" · foto de fachada + horario en SplitFlapText (solo si el horario está confirmado).
- **CTA final**: CurvedLoop · banda a sangre con ScrollVelocity · SlideCommit "Desliza para pedir" · titular gigante + botón · formulario corto (si el PRD lo pide).
