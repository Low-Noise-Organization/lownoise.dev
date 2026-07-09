"use client";

import { useState, useMemo } from "react";
import { projects } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

const categories = [
  "All",
  ...new Set(projects.map((p) => p.category)),
] as const;

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? projects
        : projects.filter((p) => p.category === activeCategory),
    [activeCategory],
  );

  return (
    <section id="projects" aria-label="Projects" className="relative py-24 md:py-32">
      <Reveal>
        <SectionHeader
          title="Projects"
          subtitle="A curated collection of tools, applications, and experiments."
        />
      </Reveal>

      <div className="mt-20">
        <Reveal delay={0.1}>
          <div className="mb-8 flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects by category">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`rounded-lg border px-4 py-2 font-mono text-xs tracking-wider uppercase transition-all duration-200 ${
                  activeCategory === cat
                    ? "border-accent/40 bg-accent-subtle text-accent"
                    : "border-border text-text-quaternary hover:border-border-light hover:text-text-tertiary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
