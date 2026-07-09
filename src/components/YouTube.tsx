"use client";

import { Play } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

const topics = [
  "Linux development workflows and tooling",
  "Rust systems programming and architecture",
  "Java patterns, performance, and legacy",
  "TUI and CLI design philosophy",
  "Honest build logs and postmortems",
];

export default function YouTubeSection() {
  return (
    <section id="youtube" aria-label="YouTube" className="relative py-24 md:py-32">
      <Reveal>
        <SectionHeader
          title="YouTube"
          subtitle="Real software engineering, recorded without a script."
        />
      </Reveal>

      <div className="mt-20 grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-7" delay={0.1}>
          <div className="space-y-5 text-base leading-relaxed text-text-secondary md:text-lg">
            <p>
              Low Noise shares real software engineering content. Not
              tutorials that assume perfect conditions, but honest
              development logs showing the full picture — including the
              mistakes, the dead ends, and the refactors.
            </p>
            <ul className="space-y-2">
              {topics.map((topic) => (
                <li key={topic} className="flex items-center gap-3">
                  <span className="h-px w-4 bg-accent/60" />
                  <span className="text-sm text-text-tertiary">{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.15}>
          <a
            href="https://www.youtube.com/@Low_Noise-n4e"
            target="_blank"
            rel="noopener noreferrer"
            className="panel-accent group flex items-start gap-4 rounded-lg p-5 md:p-6"
          >
            <Play className="mt-0.5 h-4 w-4 shrink-0 text-text-tertiary transition-colors duration-200 group-hover:text-accent" />
            <div>
              <span className="font-mono text-xs tracking-wider text-text-tertiary uppercase transition-colors duration-200 group-hover:text-accent">
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
