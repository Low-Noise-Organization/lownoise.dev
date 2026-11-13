"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang";
import { H } from "@/lib/hidden";
import { ArrowRight } from "../Icons";
import Mark from "../Mark";

/** Frame shared by the hidden pages: black page, minimal bar, language toggle. */
export default function LabShell({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useLang();
  const t = H[lang];
  return (
    <div className="lab">
      <header className="lab-top">
        <Link className="brand" href="/hidden/"><Mark className="mark" />Low Noise<span className="mono dim lab-tag">/ LAB</span></Link>
        <nav>
          <div className="toggle" role="group" aria-label="Language">
            {(["en", "es"] as const).map((l) => (<button key={l} aria-pressed={lang === l} onClick={() => setLang(l)}>{l.toUpperCase()}</button>))}
          </div>
          <Link className="back mono" href="/"><ArrowRight className="ic" /><span className="lbl">{t.back}</span></Link>
        </nav>
      </header>
      <main id="main">{children}</main>
    </div>
  );
}
