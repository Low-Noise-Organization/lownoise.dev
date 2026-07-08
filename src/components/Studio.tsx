"use client";

import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

const values = [
  {
    title: "Clarity",
    description: "Code that is simple to read and understand.",
  },
  {
    title: "Maintainability",
    description: "Built to last, designed to evolve.",
  },
  {
    title: "Clean Architecture",
    description: "Structure that reveals intent, not obscures it.",
  },
  {
    title: "User Experience",
    description: "Software that respects the user's attention.",
  },
  {
    title: "Open Source",
    description: "Sharing knowledge to build better together.",
  },
  {
    title: "Continuous Learning",
    description: "Every project is an opportunity to grow.",
  },
];

export default function Studio() {
  return (
    <section id="studio" className="relative py-32 md:py-40">
      <Reveal>
        <SectionHeader
          number="002"
          title="The Studio"
          subtitle="An independent software workshop."
        />
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-8 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
          <p>
            Low Noise is more than a GitHub organization. It is an
            independent software workshop focused on creating tools,
            applications, and experiences with care. Every project reflects
            the principles that define us.
          </p>
        </div>
      </Reveal>

      <div className="mt-20 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {values.map((value, i) => (
          <Reveal key={value.title} delay={i * 0.04}>
            <div className="group relative h-full bg-bg-elevated p-6 transition-all duration-500 hover:bg-bg-tertiary md:p-8">
              <span className="font-mono text-[10px] tracking-[0.2em] text-text-quaternary/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-heading mt-3 text-base font-medium text-text-primary transition-colors duration-300 group-hover:text-accent">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {value.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
