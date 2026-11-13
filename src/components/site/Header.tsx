"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { T, type Lang } from "@/lib/content";
import { ArrowRight, Cross } from "../Icons";
import Mark from "../Mark";

export const SECTIONS = ["services", "process", "work", "code", "contact"] as const;

interface Props {
  lang: Lang;
  setLang: (l: Lang) => void;
  active: string;
  progress: number;
  /** Links point to "/#id" when the header is used outside the home page. */
  home?: boolean;
}

export default function Header({ lang, setLang, active, progress, home = true }: Props) {
  const t = T[lang];
  const [open, setOpen] = useState(false);
  const [hide, setHide] = useState(false);
  const lastY = useRef(0);
  const href = (id: string) => (home ? `#${id}` : `/#${id}`);

  // Hides while scrolling down (it would overlap the content) and returns as soon as the user scrolls up.
  useEffect(() => {
    lastY.current = scrollY;
    const on = () => {
      const y = scrollY;
      if (y < 80 || y < lastY.current - 6) setHide(false);
      else if (y > lastY.current + 6) setHide(true);
      lastY.current = y;
    };
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`top${hide ? " hide" : ""}`}>
      <div className="top-in">
        <Link className="brand" href={home ? "#top" : "/"} aria-label="Low Noise"><Mark className="mark" />Low Noise</Link>
        <nav className="menu" aria-label="Main">
          {SECTIONS.map((id) => (
            <a key={id} href={href(id)} aria-current={active === id ? "true" : undefined}>{t.nav[id]}</a>
          ))}
        </nav>
        <div className="top-end">
          <div className="toggle" role="group" aria-label="Language">
            {(["en", "es"] as const).map((l) => (
              <button key={l} aria-pressed={lang === l} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
            ))}
          </div>
          <a className="top-cta" href={href("contact")}>{t.hero.cta}<ArrowRight className="ic" /></a>
          <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(true)}><i /><i /></button>
        </div>
      </div>
      <i className="progress" aria-hidden="true" style={{ transform: `scaleX(${progress})` }} />
      {/* In a portal: the header uses mix-blend-mode, and a fixed overlay inside it would be clipped to the header. */}
      {open && createPortal(
        <div className="mnav" role="dialog" aria-modal="true" aria-label="Menu">
          <button className="mnav-x" aria-label="Close" onClick={() => setOpen(false)}><Cross className="ic" /></button>
          <nav>
            {SECTIONS.map((id, i) => (
              <a key={id} href={href(id)} onClick={() => setOpen(false)}><small>0{i + 1}</small>{t.nav[id]}</a>
            ))}
          </nav>
          <div className="mnav-foot mono">
            <div className="toggle" role="group" aria-label="Language">
              {(["en", "es"] as const).map((l) => (
                <button key={l} aria-pressed={lang === l} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
              ))}
            </div>
            <a href={href("contact")} onClick={() => setOpen(false)}>{t.hero.cta}</a>
          </div>
        </div>,
        document.body,
      )}
    </header>
  );
}
