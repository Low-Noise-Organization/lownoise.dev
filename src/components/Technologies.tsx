"use client";

import { techGroups } from "@/lib/technologies";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

export default function Technologies() {
  return (
    <section id="technologies" className="relative py-32 md:py-40">
      <Reveal>
        <SectionHeader
          number="004"
          title="Technologies"
          subtitle="Languages, platforms, and disciplines."
        />
      </Reveal>

      <div className="mt-20 grid gap-4 sm:grid-cols-3">
        {techGroups.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.08}>
            <div className="panel rounded-lg p-6 md:p-8">
              <span className="font-mono text-[10px] tracking-[0.2em] text-text-quaternary/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-mono mt-3 text-xs tracking-[0.15em] text-text-tertiary uppercase">
                {group.title}
              </h3>
              <div className="mt-5 space-y-2.5">
                {group.items.map((item) => (
                  <div
                    key={item}
                    className="group flex items-center gap-3"
                  >
                    <span className="h-px w-5 bg-text-quaternary/30 transition-all duration-300 group-hover:w-8 group-hover:bg-accent/60" />
                    <span className="text-sm text-text-secondary transition-colors duration-300 group-hover:text-text-primary">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
