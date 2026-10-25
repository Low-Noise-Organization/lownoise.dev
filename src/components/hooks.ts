"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const RM = "(prefers-reduced-motion: reduce)";
const subRM = (fn: () => void) => { const m = matchMedia(RM); m.addEventListener("change", fn); return () => m.removeEventListener("change", fn); };
// Reads the OS setting as an external store, so components can derive their final state instead of setting it in an effect.
export const useReducedMotion = () => useSyncExternalStore(subRM, () => matchMedia(RM).matches, () => false);

// True once the element has been on screen (stays true: used to start one-shot animations).
export function useSeen<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [seen, threshold]);
  return [ref, seen] as const;
}

// Highlights the section that crosses the middle of the viewport and reports scroll progress (0..1).
export function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState("");
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      setProgress(max > 0 ? Math.min(1, scrollY / max) : 0);
      let cur = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= innerHeight * 0.4) cur = id;
      }
      setActive(cur);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(calc); };
    calc();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [ids]);
  return { active, progress };
}

// Counts from 0 to `to` once `go` is true (the final value straight away with reduced motion).
export function useCount(to: number, go: boolean, ms = 1100) {
  const [v, setV] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!go || reduced) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, go, ms, reduced]);
  return reduced && go ? to : v;
}
