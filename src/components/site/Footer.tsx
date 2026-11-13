"use client";

import { ORG } from "@/lib/projects";
import { T, type Lang } from "@/lib/content";
import { ArrowUpRight } from "../Icons";
import Mark from "../Mark";

export default function Footer({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <footer className="foot">
      <div className="wrap">
        <p className="wordmark" aria-hidden="true"><Mark className="mark" />Low Noise</p>
        <div className="foot-row mono">
          <span>{t.footer}</span>
          <a href={`https://github.com/${ORG}`}>GITHUB<ArrowUpRight className="ic" /></a>
          <a href={`https://github.com/${ORG}/lownoise.dev`}>{t.sourceNote.toUpperCase()}<ArrowUpRight className="ic" /></a>
        </div>
        <div className="foot-row mono dim">
          <span>© Low Noise</span>
          <span>{t.fontCredit}</span>
          <span>{t.artCredit}</span>
          <span className="legal">{t.legal}</span>
        </div>
      </div>
    </footer>
  );
}
