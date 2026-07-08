"use client";

import { Play } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

export default function YouTubeSection() {
  return (
    <section id="youtube" className="relative py-32 md:py-40">
      <Reveal>
        <SectionHeader
          number="005"
          title="YouTube"
          subtitle="Software engineering, Linux, and real development."
        />
      </Reveal>

      <div className="mt-20 grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-7" delay={0.1}>
          <div className="text-base leading-relaxed text-text-secondary md:text-lg">
            <p>
              Low Noise shares real software engineering content. Linux
              workflows, programming architecture, tooling deep dives, and
              honest development logs. No fluff. No fake scenarios. Just
              practical knowledge from real experience.
            </p>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.15}>
          <a
            href="https://youtube.com/@LowNoiseStudio"
            target="_blank"
            rel="noopener noreferrer"
            className="panel-accent group flex items-start gap-4 rounded-lg p-5 md:p-6"
          >
            <Play className="mt-0.5 h-4 w-4 shrink-0 text-text-tertiary transition-colors duration-200 group-hover:text-accent" />
            <div>
              <span className="font-mono text-[11px] tracking-wider text-text-tertiary uppercase transition-colors duration-200 group-hover:text-accent">
                @LowNoiseStudio
              </span>
              <p className="mt-1 text-xs text-text-quaternary">
                Watch on YouTube
              </p>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
