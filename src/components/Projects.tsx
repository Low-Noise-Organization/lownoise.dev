"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

const categories = [
  "All",
  ...new Set(projects.map((p) => p.category)),
] as const;

export default function Projects() {
  const [showBrowser, setShowBrowser] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? projects
        : projects.filter((p) => p.category === activeCategory),
    [activeCategory],
  );

  const handleOpen = useCallback(() => setShowBrowser(true), []);
  const handleClose = useCallback(() => {
    setShowBrowser(false);
    setActiveCategory("All");
  }, []);

  return (
    <section id="projects" className="relative py-32 md:py-40">
      <Reveal>
        <SectionHeader
          number="003"
          title="Projects"
          subtitle="A curated collection of tools, applications, and experiments."
        />
      </Reveal>

      {!showBrowser ? (
        <div className="mt-20">
          <Reveal delay={0.1}>
            <p className="mb-8 max-w-xl text-sm leading-relaxed text-text-tertiary">
              Explore the full catalog of Low Noise projects — from active
              tools to research and planning.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <button
              onClick={handleOpen}
              className="panel-accent group inline-flex items-center gap-3 rounded-lg px-6 py-3.5"
            >
              <span className="font-mono text-xs tracking-wider text-text-secondary transition-colors duration-200 group-hover:text-accent">
                Show all
              </span>
              <span className="font-mono text-[10px] text-text-quaternary transition-colors duration-200 group-hover:text-accent/60">
                {projects.length}
              </span>
            </button>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.name}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key="browser"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-20"
          >
            <div className="mb-6 flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-lg border px-4 py-2 font-mono text-[10px] tracking-wider uppercase transition-all duration-200 ${
                    activeCategory === cat
                      ? "border-accent/40 bg-accent-subtle text-accent"
                      : "border-border text-text-quaternary hover:border-border-light hover:text-text-tertiary"
                  }`}
                >
                  {cat}
                </button>
              ))}
              <button
                onClick={handleClose}
                className="ml-auto rounded-lg border border-border px-4 py-2 font-mono text-[10px] tracking-wider text-text-quaternary uppercase transition-all duration-200 hover:border-border-light hover:text-text-tertiary"
              >
                Close
              </button>
            </div>

            <motion.div layout className="grid gap-4 sm:grid-cols-2">
              {filtered.map((project, index) => (
                <ProjectCard
                  key={project.name}
                  project={project}
                  index={index}
                />
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  );
}
