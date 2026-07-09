"use client";

import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const values = [
  {
    title: "Clarity",
    description:
      "Code should be readable by someone unfamiliar with the project. We prefer descriptive names, minimal nesting, and comments that explain why, not what. A codebase should reveal its intent at a glance.",
  },
  {
    title: "Maintainability",
    description:
      "Software is never finished. Every decision considers the person who will modify this code in six months — often ourselves. We choose boring, proven patterns over clever one-liners. Future-proofing is not optional.",
  },
  {
    title: "Clean Architecture",
    description:
      "Structure reveals intent. We separate concerns not because fashion demands it, but because a well-layered codebase is cheaper to change, easier to test, and simpler to reason about at 2 AM.",
  },
  {
    title: "User Experience",
    description:
      "Software should respect the user's attention. Every click, every screen, every message should be necessary. We ship features that solve real problems, not features that inflate a changelog.",
  },
  {
    title: "Open Source",
    description:
      "Knowledge grows when shared. Every Low Noise project is open by default — not because open source is trendy, but because transparent development produces better software. Our code is our documentation.",
  },
  {
    title: "Continuous Learning",
    description:
      "Every project teaches something. We deliberately explore unfamiliar languages, paradigms, and domains. CipherKey taught us Rust's memory model. Voxen is teaching us graphics pipelines. The studio grows with every commit.",
  },
];

export default function About() {
  return (
    <section id="about" aria-label="About" className="relative py-24 md:py-32">
      <Reveal>
        <SectionHeader
          title="About"
          subtitle="Why Low Noise exists and the philosophy that guides every project."
        />
      </Reveal>

      <div className="mt-20 grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-7" delay={0.1}>
          <div className="space-y-5 text-base leading-relaxed text-text-secondary md:text-lg">
            <p>
              Low Noise was born from a simple belief: software should be
              quiet. Not silent, but uncluttered. Intentional. Every line of
              code should earn its place, every feature should justify its
              existence, every dependency should prove it is necessary.
            </p>
            <p>
              This is not theoretical. When building AndroidDrop, we chose
              Rust for the backend not because it is fashionable, but because
              zero-cost abstractions and memory safety matter for a tool
              that moves files across a network. When designing CipherKey,
              we spent weeks on the CLI interface — not because the
              encryption logic was hard, but because a security tool that is
              confusing to use is a security risk in itself.
            </p>
            <p>
              These decisions are invisible to the user. That is the point.
              Good engineering disappears. What remains is software that
              works, that feels natural, that does not get in the way.
            </p>
            <p>
              Low Noise is not just a name. It is a promise. Every project
              under this studio is built with patience, curiosity, and an
              unwavering commitment to quality — because software built
              with care outlasts software built with haste.
            </p>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.2}>
          <div className="panel rounded-lg p-6 md:p-8">
            <span className="font-mono text-xs tracking-[0.2em] text-text-quaternary uppercase">
              Overview
            </span>
            <div className="mt-6 space-y-5">
              <div>
                <span className="font-mono text-xs tracking-wider text-text-quaternary uppercase">
                  Founded
                </span>
                <p className="font-heading mt-1 text-base font-medium text-text-primary">
                  2024
                </p>
              </div>
              <div>
                <span className="font-mono text-xs tracking-wider text-text-quaternary uppercase">
                  Focus
                </span>
                <p className="font-heading mt-1 text-base font-medium text-text-primary">
                  Software engineering
                </p>
              </div>
              <div>
                <span className="font-mono text-xs tracking-wider text-text-quaternary uppercase">
                  Approach
                </span>
                <p className="font-heading mt-1 text-base font-medium text-text-primary">
                  Quiet, intentional, precise
                </p>
              </div>
              <div>
                <span className="font-mono text-xs tracking-wider text-text-quaternary uppercase">
                  License
                </span>
                <p className="font-heading mt-1 text-base font-medium text-text-primary">
                  Open source by default
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-32">
        <Reveal>
          <SectionHeader
            title="Principles"
            subtitle="The values that shape every architectural decision, code review, and release."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
            These are not aspirational posters on a wall. They are
            decision-making tools. When we face a trade-off, we come back
            to these principles and ask: which choice aligns?
          </p>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.04}>
              <div className="group relative h-full bg-bg-elevated p-6 transition-all duration-500 hover:bg-bg-tertiary md:p-8">
                <h3 className="font-heading text-base font-medium text-text-primary transition-colors duration-300 group-hover:text-accent">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {value.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
