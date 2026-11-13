"use client";

import dynamic from "next/dynamic";
import { projects } from "@/lib/projects";
import { T, type Lang } from "@/lib/content";
import { ArrowRight } from "../Icons";
import { useMobile, useReducedMotion } from "../hooks";
import { useInView } from "../useInView";

const NoiseScene = dynamic(() => import("../three/NoiseSphere"), { ssr: false });
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Hero({ lang }: { lang: Lang }) {
  const t = T[lang];
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLElement>();
  const mobile = useMobile();
  const dossier: [string, string][] = [
    [t.dossier.studio, "Low Noise"],
    [t.dossier.focus, "Backend / Android / Rust / Web"],
    [t.dossier.open, `${projects.length} ${t.dossier.projects}`],
  ];
  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero-3d">
        <NoiseScene
          label="Interactive 3D sphere made of points: the surface is noisy and becomes smooth where the cursor is."
          noise={0.42}
          still={reduced}
          active={inView}
          mobile={mobile}
          offsetX={mobile ? 0 : 1.15}
          scale={mobile ? 1.05 : 1.35}
          interactive={!reduced}
          fallback={
            // eslint-disable-next-line @next/next/no-img-element
            <img className="hero-img" src={`${BASE}/art/hero.png`} alt="" width={1600} height={900} />
          }
        />
      </div>
      <div className="hero-in wrap">
        <p className="mono eyebrow">{t.hero.kicker.replace(" // ", " / ").toUpperCase()}</p>
        <h1 className="display">{t.hero.title}</h1>
        <div className="hero-row">
          <p className="lead">{t.hero.lead}</p>
          <div className="cta">
            <a className="pill solid" href="#contact">{t.hero.cta}<ArrowRight className="ic" /></a>
            <a className="pill" href="#work">{t.hero.secondary}</a>
          </div>
        </div>
      </div>
      <div className="hero-foot wrap mono">
        <span className="hint">{lang === "es" ? "Mueve el cursor para calmar el ruido · mantén pulsado para silenciarlo" : "Move the cursor to calm the noise · hold to silence it"}</span>
        <dl className="dossier">
          {dossier.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
        </dl>
      </div>
    </section>
  );
}
