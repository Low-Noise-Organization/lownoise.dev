"use client";

import { ORG } from "@/lib/projects";
import { T, type Lang } from "@/lib/content";
import { ArrowUpRight } from "../Icons";
import { Reveal, Tilt } from "../ui";
import { ProjectArt } from "./art";
import { SecHead } from "./Services";


export default function Work({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <section id="work" className="sec sec-w">
      <div className="wrap">
        <SecHead n={3} label={t.work.title} lead={t.work.note} />
        <div className="cases">
          {t.work.cases.map((c, i) => (
            <article className={`case${i % 2 ? " flip" : ""}`} key={c.repo}>
              <Reveal className="case-plate">
                <Tilt>
                  <a className="plate" href={`https://github.com/${ORG}/${c.repo}`} tabIndex={-1} aria-hidden="true">
                    <ProjectArt repo={c.repo} />
                    <span className="cap mono">{String(i + 1).padStart(2, "0")} / {c.name.toUpperCase()}</span>
                  </a>
                </Tilt>
              </Reveal>
              <Reveal className="case-body" delay={120}>
                <p className="mono kind">{c.kind.toUpperCase()}</p>
                <h3>{c.name}</h3>
                <dl>
                  <dt className="mono">{t.work.labels.problem}</dt><dd>{c.problem}</dd>
                  <dt className="mono">{t.work.labels.decision}</dt><dd>{c.decision}</dd>
                  <dt className="mono">{t.work.labels.status}</dt><dd>{c.status}</dd>
                </dl>
                <a className="ask mono" href={`https://github.com/${ORG}/${c.repo}`}>{t.work.view}<ArrowUpRight className="ic" /></a>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
