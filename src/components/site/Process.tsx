"use client";

import { T, type Lang } from "@/lib/content";
import { Reveal } from "../ui";
import { SecHead } from "./Services";

export default function Process({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <section id="process" className="sec sec-k">
      <div className="wrap">
        <SecHead n={2} label={t.process.title} />
        <ol className="steps">
          {t.process.steps.map(([title, body], i) => (
            <li key={title}>
              <Reveal delay={i * 90}>
                <span className="big" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal><p className="promise">{t.process.promise}</p></Reveal>
      </div>
    </section>
  );
}
