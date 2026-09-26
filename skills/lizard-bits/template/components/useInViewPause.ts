"use client";

import { useEffect, useRef, type RefObject } from "react";

/** Devuelve un ref booleano que indica si el elemento está en pantalla (para pausar bucles rAF). */
export function useInViewRef(target: RefObject<Element | null>, margin = "100px") {
  const visible = useRef(true);
  useEffect(() => {
    const el = target.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [target, margin]);
  return visible;
}
