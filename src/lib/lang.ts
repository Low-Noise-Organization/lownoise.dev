"use client";

import { useEffect, useSyncExternalStore } from "react";
import type { Lang } from "./content";

// Language lives outside React (localStorage + <html lang>), so it is read as an external store and
// every page (home and hidden pages) shares the same choice.
const KEY = "ln-lang";
const listeners = new Set<() => void>();
const subscribe = (fn: () => void) => { listeners.add(fn); return () => { listeners.delete(fn); }; };
const notify = () => listeners.forEach((fn) => fn());

function read(): Lang {
  try {
    const l = localStorage.getItem(KEY);
    if (l === "es" || l === "en") return l;
  } catch {}
  return navigator.language.startsWith("es") ? "es" : "en";
}

export function setLang(l: Lang) {
  try { localStorage.setItem(KEY, l); } catch {}
  notify();
}

export function useLang(): [Lang, (l: Lang) => void] {
  const lang = useSyncExternalStore(subscribe, read, () => "en" as Lang);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  return [lang, setLang];
}
