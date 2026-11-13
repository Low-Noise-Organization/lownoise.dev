"use client";

import dynamic from "next/dynamic";
import { T, type Lang } from "@/lib/content";
import { ArrowRight } from "../Icons";
import { useMobile, useReducedMotion } from "../hooks";
import { useInView } from "../useInView";
import { Reveal } from "../ui";
import { SecHead } from "./Services";

const RobotScene = dynamic(() => import("../three/Robot"), { ssr: false });

// Static drawing for browsers without WebGL.
function RobotFlat() {
  return (
    <svg viewBox="0 0 200 240" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" aria-hidden="true" className="robot-flat">
      <rect x="52" y="70" width="96" height="70" rx="26" />
      <rect x="70" y="88" width="60" height="34" rx="14" fill="currentColor" stroke="none" opacity="0.14" />
      <path d="M86 98v14M114 98v14" strokeLinecap="round" strokeWidth="6" />
      <path d="M100 70V50" strokeLinecap="round" /><circle cx="100" cy="44" r="5" fill="currentColor" />
      <rect x="64" y="150" width="72" height="62" rx="22" />
      <path d="M52 160l-14 36M148 160l14 36" strokeLinecap="round" strokeWidth="9" />
    </svg>
  );
}

export default function AI({ lang, onAsk }: { lang: Lang; onAsk: (i: number) => void }) {
  const t = T[lang];
  const a = t.ai;
  const reduced = useReducedMotion();
  const mobile = useMobile();
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <section id="ai" className="sec sec-k ai">
      <div className="wrap">
        <SecHead n={2} label={a.label} title={a.title} lead={a.lead} />
        <div className="ai-grid">
          <div className="ai-stage" ref={ref}>
            <RobotScene label={a.robot} still={reduced} active={inView} mobile={mobile} interactive={!reduced} fallback={<RobotFlat />} />
            <span className="hint-corner mono">{a.hint}</span>
          </div>
          <div className="ai-copy">
            <Reveal><p className="ai-intro">{a.intro}</p></Reveal>
            <ul className="ai-items">
              {a.items.map((it, i) => (
                <li key={it.name}>
                  <Reveal delay={i * 70}>
                    <span className="mono num">A{String(i + 1).padStart(2, "0")}</span>
                    <h3>{it.name}</h3>
                    <p>{it.body}</p>
                    <span className="stack mono">{it.stack.split(" · ").map((x) => <i key={x}>{x}</i>)}</span>
                  </Reveal>
                </li>
              ))}
            </ul>
            <div className="cta">
              <a className="pill solid" href="#contact" onClick={() => onAsk(4)}>{a.cta}<ArrowRight className="ic" /></a>
            </div>
          </div>
        </div>
        <div className="ai-how">
          <h3 className="mono">{a.howTitle.toUpperCase()}</h3>
          <ol>
            {a.how.map(([title, body], i) => (
              <li key={title}>
                <Reveal delay={i * 80}>
                  <h4>{title}</h4>
                  <p>{body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
          <p className="ai-privacy mono">{a.privacy}</p>
        </div>
      </div>
    </section>
  );
}
