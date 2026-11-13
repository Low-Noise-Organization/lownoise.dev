"use client";

import { useState } from "react";
import { projects } from "@/lib/projects";
import { T } from "@/lib/content";
import { useLang } from "@/lib/lang";
import { useCount, useScrollSpy, useSeen } from "./hooks";
import Header, { SECTIONS } from "./site/Header";
import Hero from "./site/Hero";
import Services from "./site/Services";
import AI from "./site/AI";
import Process from "./site/Process";
import Work from "./site/Work";
import Code, { LANGS } from "./site/Code";
import Contact from "./site/Contact";
import Footer from "./site/Footer";

const CATS = 5;
const ACTIVE = projects.filter((p) => p.status === "active").length;

function Stat({ n, label, go }: { n: number; label: string; go: boolean }) {
  const v = useCount(n, go);
  return (
    <div className="stat">
      <b aria-label={String(n)}>{String(v).padStart(2, "0")}</b>
      <span className="mono">{label}</span>
    </div>
  );
}

export default function Site() {
  const [lang, setLang] = useLang();
  const t = T[lang];
  const [typeIdx, setTypeIdx] = useState(0);
  const { active, progress } = useScrollSpy([...SECTIONS]);
  const [statsRef, statsSeen] = useSeen<HTMLDivElement>(0.4);

  return (
    <>
      <a className="skip" href="#main">{t.skip}</a>
      <Header lang={lang} setLang={setLang} active={active} progress={progress} />
      <main id="main">
        <Hero lang={lang} />
        <div className="stats" ref={statsRef}>
          <div className="wrap">
            <Stat n={projects.length} label={t.stats.projects} go={statsSeen} />
            <Stat n={LANGS.length} label={t.stats.languages} go={statsSeen} />
            <Stat n={CATS} label={t.stats.areas} go={statsSeen} />
            <Stat n={ACTIVE} label={t.stats.active} go={statsSeen} />
          </div>
        </div>
        <Services lang={lang} onAsk={setTypeIdx} />
        <AI lang={lang} onAsk={setTypeIdx} />
        <Process lang={lang} />
        <Work lang={lang} />
        <Code lang={lang} />
        <Contact lang={lang} typeIdx={typeIdx} setTypeIdx={setTypeIdx} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
