"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import RotatingText from "./bits/RotatingText";
import CircularText from "./bits/CircularText";
import Magnet from "./bits/Magnet";
import ClickSpark from "./bits/ClickSpark";
import StarBorder from "./bits/StarBorder";
import { WhatsAppIcon, BurgerDoodle, PizzaDoodle } from "./icons";
import { WHATSAPP_URL, PHONE, PHONE_PRETTY, SINCE } from "@/lib/site";

const WORDS = ["Hamburguesas", "Pizzas", "Cachopos", "Arepas", "Bocatas", "Shawarma"];
const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties;

function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      v.pause();
      return;
    }
    // Solo reproduce cuando está en pantalla: ahorra batería y CPU en móvil
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="aspect-[4/5] w-full object-cover"
      poster="/media/poster.webp"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      aria-label="Producto estrella en vídeo"
    >
      <source src="/media/hero.webm" type="video/webm" />
      <source src="/media/hero.mp4" type="video/mp4" />
    </video>
  );
}

export default function Hero() {
  const [finePointer, setFinePointer] = useState(false);
  useEffect(() => setFinePointer(window.matchMedia("(hover: hover) and (pointer: fine)").matches), []);

  return (
    <section id="top" className="relative overflow-hidden pt-[var(--header-h)]">
      <div className="stripes-thin pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute -right-40 top-0 h-[640px] w-[640px]"
        style={{ background: "radial-gradient(closest-side, rgba(255,131,96,0.22), transparent)" }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-8 lg:pb-24 lg:pt-16">
        {/* Texto */}
        <div className="relative z-10 min-w-0">
          <p className="enter font-hand text-lg text-peach sm:text-2xl" style={d(0)}>
            Desde {SINCE} en Ciudad
          </p>

          <h1
            className="enter mt-2 font-display text-[clamp(3.4rem,17vw,6.5rem)] uppercase leading-[0.88] tracking-tight text-cream sm:mt-3"
            style={d(60)}
          >
            Comida
            <br />
            para llevar
          </h1>

          <div className="enter mt-4 flex flex-wrap items-center gap-x-3 gap-y-2" style={d(140)}>
            {/* Ancho fijo = palabra más larga: el cambio de palabra no mueve nada alrededor */}
            <span className="inline-grid -rotate-1 rounded-xl bg-peach px-3 py-1 font-display text-[clamp(2.1rem,10vw,3.75rem)] uppercase leading-[1.1] text-ink sm:px-4">
              <span aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">
                {WORDS[0]}
              </span>
              <RotatingText
                texts={WORDS}
                mainClassName="col-start-1 row-start-1 overflow-hidden justify-center"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.015}
                splitLevelClassName="overflow-hidden pb-1"
                transition={{ type: "spring", damping: 32, stiffness: 520 }}
                rotationInterval={2200}
              />
            </span>
            <span className="font-display text-[clamp(1.6rem,7vw,2.25rem)] uppercase text-cream/60">y mucho más</span>
          </div>

          <p className="enter mt-6 max-w-md text-base leading-relaxed text-cream/75 sm:text-lg" style={d(220)}>
            Solo recogida y envío a domicilio, <strong className="text-cream">sin reservas</strong>. Escríbenos por
            WhatsApp, lo preparamos al momento y te lo llevamos.
          </p>

          <div className="enter mt-8" style={d(300)}>
            <ClickSpark sparkColor="#FFB79A" sparkSize={12} sparkRadius={22} sparkCount={10} duration={420}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Magnet padding={60} magnetStrength={4} disabled={!finePointer} wrapperClassName="w-full sm:w-auto" innerClassName="w-full">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="press inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-peach px-6 py-4 font-bold uppercase tracking-wider text-ink shadow-[5px_5px_0_#9C2B1B] hover:bg-coral sm:w-auto"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Pedir por WhatsApp
                  </a>
                </Magnet>
                <StarBorder
                  as="a"
                  href="#carta"
                  color="#FF8360"
                  speed="5s"
                  backgroundColor="#141110"
                  textColor="#FFE8D6"
                  borderColor="rgba(255,183,154,0.25)"
                  className="press w-full rounded-2xl font-bold uppercase tracking-wider sm:w-auto [&>div:last-child]:rounded-2xl"
                >
                  Ver carta
                </StarBorder>
              </div>
            </ClickSpark>
            <p className="mt-4 text-center text-sm text-cream/50 sm:text-left">
              o llama al{" "}
              <a href={`tel:+34${PHONE}`} className="font-semibold text-peach underline-offset-4 hover:underline">
                {PHONE_PRETTY}
              </a>
            </p>
          </div>
        </div>

        {/* Vídeo */}
        <div className="enter-tilt relative mx-auto w-[88%] max-w-[520px] rotate-2 sm:w-full" style={d(0)}>
          <div className="stripes absolute inset-0 translate-x-3 translate-y-3 rounded-[28px] opacity-90 sm:translate-x-4 sm:translate-y-4 sm:rounded-[32px]" />
          <div className="relative overflow-hidden rounded-[28px] border-4 border-peach bg-[#d9603f] sm:rounded-[32px]">
            <HeroVideo />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/80 to-transparent" />
          </div>

          <div className="absolute -left-5 -top-7 grid h-[112px] w-[112px] place-items-center rounded-full bg-brick shadow-xl sm:-left-10 sm:-top-8 sm:h-[170px] sm:w-[170px]">
            <CircularText
              text={`DESDE ${SINCE} ✦ CIUDAD ✦ `}
              spinDuration={18}
              onHover="speedUp"
              className="!h-[96px] !w-[96px] font-display !font-normal text-cream sm:!h-[150px] sm:!w-[150px] [&>span]:!text-[13px] sm:[&>span]:!text-lg"
            />
            <BurgerDoodle className="absolute h-9 w-9 text-peach sm:h-12 sm:w-12" />
          </div>

          <PizzaDoodle className="absolute -bottom-9 -right-3 h-14 w-14 rotate-12 text-coral sm:-bottom-10 sm:-right-8 sm:h-16 sm:w-16" />
        </div>
      </div>
    </section>
  );
}
