"use client";

import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const details = [
  { label: "Founded", value: "2024" },
  { label: "Focus", value: "Software engineering" },
  { label: "Approach", value: "Quiet, intentional" },
];

export default function About() {
  return (
    <section id="about" className="relative py-32 md:py-40">
      <Reveal>
        <SectionHeader
          number="001"
          title="About"
          subtitle="Why Low Noise exists and the philosophy behind the work."
        />
      </Reveal>

      <div className="mt-20 grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-7" delay={0.1}>
          <div className="space-y-5 text-base leading-relaxed text-text-secondary md:text-lg">
            <p>
              Low Noise was born from a simple belief: software should be
              quiet. Not silent, but uncluttered. Intentional. Every line of
              code should earn its place.
            </p>
            <p>
              I started writing software because I fell in love with the act
              of creation. Taking an idea, shaping it, refining it until it
              feels right. That love evolved into a philosophy:
              craftsmanship over speed, clarity over complexity,
              maintainability over cleverness.
            </p>
            <p>
              Low Noise is not just a name. It is a promise. Every project
              under this studio is built with patience, curiosity, and an
              unwavering commitment to quality.
            </p>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.2}>
          <div className="panel rounded-lg p-6 md:p-8">
            <span className="font-mono text-[10px] tracking-[0.2em] text-text-quaternary uppercase">
              Overview
            </span>
            <div className="mt-6 space-y-5">
              {details.map((d) => (
                <div key={d.label}>
                  <span className="font-mono text-[11px] tracking-wider text-text-quaternary uppercase">
                    {d.label}
                  </span>
                  <p className="font-heading mt-1 text-base font-medium text-text-primary">
                    {d.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
