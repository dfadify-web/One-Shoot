"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SpotlightCard from "./bits/SpotlightCard";
import Reveal from "./Reveal";
import { MENU, type MenuCategory, type MenuItem } from "@/lib/menu";
import { SearchIcon, WhatsAppIcon } from "./icons";
import { WHATSAPP_URL } from "@/lib/site";

const ease = [0.23, 1, 0.32, 1] as const;

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

function Price({ item, labels }: { item: MenuItem; labels?: string[] }) {
  if (Array.isArray(item.price)) {
    return (
      <span className="flex shrink-0 gap-3 text-right font-display text-lg text-peach">
        {item.price.map((p, i) => (
          <span key={i} className="flex flex-col items-end leading-none">
            {labels && <span className="mb-1 font-sans text-[9px] font-semibold uppercase tracking-widest text-cream/40">{labels[i]}</span>}
            {p}
          </span>
        ))}
      </span>
    );
  }
  return <span className="shrink-0 font-display text-xl text-peach">{item.price}</span>;
}

function Row({ item, labels, category }: { item: MenuItem; labels?: string[]; category?: string }) {
  return (
    <li className="group py-4">
      <div className="flex items-end gap-3">
        <h4 className="font-display text-xl uppercase leading-none tracking-wide text-cream">
          {item.name}
          {item.tag && (
            <span className="ml-2 inline-block -translate-y-0.5 rounded-md bg-brick px-1.5 py-0.5 align-middle font-sans text-[10px] font-bold uppercase tracking-wider text-cream">
              {item.tag}
            </span>
          )}
        </h4>
        <span className="leader" />
        <Price item={item} labels={labels} />
      </div>
      {(item.desc || category) && (
        <p className="mt-1.5 max-w-[46ch] text-sm leading-snug text-cream/55">
          {category && <span className="mr-1 font-semibold text-coral">{category} ·</span>}
          {item.desc}
        </p>
      )}
    </li>
  );
}

export default function Menu() {
  const [active, setActive] = useState(MENU[0].id);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return null;
    return MENU.flatMap((c) =>
      c.items
        .filter((i) => normalize(`${i.name} ${i.desc ?? ""}`).includes(q))
        .map((i) => ({ item: i, cat: c }))
    );
  }, [query]);

  const current = MENU.find((c) => c.id === active) as MenuCategory;
  const panelRef = useRef<HTMLDivElement>(null);

  const selectTab = (id: string, btn: HTMLButtonElement) => {
    setQuery("");
    setActive(id);
    btn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    // Si ya estabas bajando por la lista, vuelve al principio de la nueva categoría
    const panel = panelRef.current;
    if (panel) {
      const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 64;
      const top = panel.getBoundingClientRect().top - headerH - 64;
      if (top < 0) window.scrollBy({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="carta" className="relative py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-hand text-xl text-coral">Lo que hay</p>
            <h2 className="font-display text-6xl uppercase leading-[0.9] text-cream sm:text-8xl">La carta</h2>
          </div>
          <label className="relative block w-full md:w-80">
            <span className="sr-only">Buscar en la carta</span>
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/40" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Busca: bacon, cabra, pollo…"
              enterKeyHint="search"
              autoComplete="off"
              className="w-full rounded-full border-2 border-peach/20 bg-coal py-3 pl-11 pr-4 text-cream placeholder:text-cream/35 focus:border-peach focus:outline-none"
            />
          </label>
        </Reveal>

        {/* Tabs */}
        <div className="sticky top-[calc(var(--header-h)+env(safe-area-inset-top))] z-30 -mx-4 mt-10 border-b border-peach/10 bg-ink px-4 py-2.5 sm:-mx-6 sm:px-6">
          <div
            role="tablist"
            aria-label="Categorías de la carta"
            className={`no-scrollbar flex gap-1.5 overflow-x-auto overscroll-x-contain pr-16 transition-opacity duration-200 [mask-image:linear-gradient(to_right,black_82%,transparent)] sm:gap-2 sm:[mask-image:none] ${results ? "opacity-40" : ""}`}
          >
            {MENU.map((c) => {
              const on = c.id === active && !results;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={on}
                  onClick={(e) => selectTab(c.id, e.currentTarget)}
                  className={`press relative shrink-0 rounded-full px-3.5 py-2 text-xs font-bold sm:px-4 sm:text-sm uppercase tracking-wider ${
                    on ? "text-ink" : "text-cream/70 hover:text-cream"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="tab-pill"
                      className="absolute inset-0 rounded-full bg-peach"
                      transition={{ type: "spring", duration: 0.45, bounce: 0.15 }}
                    />
                  )}
                  <span className="relative">{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div ref={panelRef} />
        <SpotlightCard
          className="mt-4 !rounded-[28px] !border-peach/15 !bg-coal !p-5 sm:!p-10"
          spotlightColor="rgba(255, 183, 154, 0.10)"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={results ? `q-${query}` : active}
              initial={{ opacity: 0, filter: "blur(2px)", transform: "translateY(6px)" }}
              animate={{ opacity: 1, filter: "blur(0px)", transform: "translateY(0px)" }}
              exit={{ opacity: 0, filter: "blur(2px)", transition: { duration: 0.12 } }}
              transition={{ duration: 0.25, ease }}
              className="relative"
            >
              {results ? (
                results.length ? (
                  <>
                    <p className="mb-2 text-sm text-cream/50">
                      {results.length} resultado{results.length > 1 ? "s" : ""} para “{query}”
                    </p>
                    <ul className="grid gap-x-14 divide-y divide-peach/10 md:grid-cols-2 md:divide-y-0">
                      {results.map(({ item, cat }, i) => (
                        <Row key={cat.id + item.name + i} item={item} labels={cat.priceLabels} category={cat.label} />
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="py-10 text-center text-cream/60">
                    No hay nada con “{query}”. Pregúntanos por WhatsApp, igual te lo preparamos.
                  </p>
                )
              ) : (
                <>
                  <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-dashed border-peach/20 pb-4">
                    <h3 className="font-display text-4xl uppercase text-peach">{current.label}</h3>
                    {current.note && <span className="font-hand text-lg text-cream/70">{current.note}</span>}
                    {current.priceLabels && (
                      <span className="text-xs font-semibold uppercase tracking-widest text-cream/50">
                        Pequeña · Mediana · Familiar
                      </span>
                    )}
                  </div>
                  <ul className="grid gap-x-14 md:grid-cols-2">
                    {current.items.map((item, i) => (
                      <Row key={item.name + i} item={item} labels={current.priceLabels} />
                    ))}
                  </ul>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </SpotlightCard>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border-2 border-dashed border-peach/25 px-6 py-5 text-center sm:flex-row sm:text-left">
          <p className="text-cream/75">
            ¿Ya lo tienes claro? <span className="text-cream">Mándanos tu pedido y te decimos cuándo está listo.</span>
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="press inline-flex shrink-0 items-center gap-2 rounded-full bg-peach px-5 py-3 text-sm font-bold uppercase tracking-wider text-ink hover:bg-coral"
          >
            <WhatsAppIcon className="h-4 w-4" /> Pedir ahora
          </a>
        </div>
      </div>
    </section>
  );
}
