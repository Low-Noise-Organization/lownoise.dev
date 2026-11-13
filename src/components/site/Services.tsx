"use client";

import { T, type Lang } from "@/lib/content";
import { ArrowUpRight } from "../Icons";
import { Reveal } from "../ui";

const pad = (n: number) => String(n).padStart(2, "0");

export function SecHead({ n, label, lead, title }: { n: number; label: string; lead?: string; title?: string }) {
  return (
    <header className="sec-head">
      <p className="mono sh">{pad(n)} / {label.toUpperCase()}</p>
      <h2 className="h2">{title ?? `${label}.`}</h2>
      {lead && <p className="sec-lead">{lead}</p>}
    </header>
  );
}

export default function Services({ lang, onAsk }: { lang: Lang; onAsk: (i: number) => void }) {
  const t = T[lang];
  return (
    <section id="services" className="sec sec-w">
      <div className="wrap">
        <SecHead n={1} label={t.services.title} lead={t.services.lead} />
        <ol className="svcs">
          {t.services.items.map((s, i) => (
            <li key={s.name}>
              <Reveal delay={i * 60}>
                <a className="svc" href="#contact" onClick={() => onAsk(i)}>
                  <span className="mono num">S{pad(i + 1)}</span>
                  <h3>{s.name}</h3>
                  <p>{s.body}</p>
                  <span className="svc-side">
                    <span className="stack mono">{s.stack.split(" · ").map((x) => <i key={x}>{x}</i>)}</span>
                    <span className="ask mono">{t.services.ask}<ArrowUpRight className="ic" /></span>
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
