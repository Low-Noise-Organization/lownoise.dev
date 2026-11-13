"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { H } from "@/lib/hidden";
import { useLang } from "@/lib/lang";
import { ArrowRight } from "./Icons";
import { useMobile, useReducedMotion } from "./hooks";
import Mark from "./Mark";

const NoiseScene = dynamic(() => import("./three/NoiseSphere"), { ssr: false });

/** 404: the sphere at maximum noise; holding the pointer silences it. */
export default function NotFoundView() {
  const [lang] = useLang();
  const t = H[lang].nf;
  const mobile = useMobile();
  const reduced = useReducedMotion();
  return (
    <main className="nf" id="main">
      <header className="lab-top" style={{ position: "relative", zIndex: 3, borderBottom: 0 }}>
        <Link className="brand" href="/"><Mark className="mark" />Low Noise</Link>
      </header>
      <div className="hero-3d">
        <NoiseScene label="Noisy 3D sphere" noise={0.8} still={reduced} mobile={mobile} scale={mobile ? 1.1 : 1.5} offsetX={mobile ? 0 : 1.6} interactive={!reduced}
          fallback={null} />
      </div>
      <div className="hero-in wrap" style={{ marginTop: "auto" }}>
        <p className="mono eyebrow">ERROR / NOT FOUND</p>
        <h1 className="display">{t.title}</h1>
        <div className="hero-row">
          <p className="lead">{t.lead}</p>
          <div className="cta"><Link className="pill solid" href="/">{t.home}<ArrowRight className="ic" /></Link></div>
        </div>
        <p className="mono dim" style={{ marginTop: 28, textTransform: "uppercase" }}>{t.hint}</p>
      </div>
    </main>
  );
}
