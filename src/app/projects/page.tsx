"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader";
import { useTheme } from "@/lib/ThemeContext";

const categories = ["All", ...new Set(projects.map((p) => p.category))] as const;

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const { t } = useTheme();

  const filtered = useMemo(
    () => (activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory)),
    [activeCategory],
  );

  const toggleExpand = (name: string) => {
    setExpandedProject(expandedProject === name ? null : name);
  };

  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-depth" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grid-pixel" />

      <div className="relative z-10 mx-auto min-h-screen max-w-7xl px-6 py-24 sm:px-10 md:px-16 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[12px] tracking-wider uppercase transition-colors duration-100 hover:text-accent"
            style={{ color: "var(--color-overlay0)" }}
          >
            <span>←</span>
            <span>{t("allProjects.back")}</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-8"
        >
          <SectionHeader
            title={
              <>
                {t("allProjects.title")}
                <span className="ml-2 text-sm" style={{ color: "var(--color-mauve)" }}>◆</span>
              </>
            }
            subtitle={t("allProjects.subtitle")}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-12"
        >
          <div className="mb-6 flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects by category">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`px-3 py-2 text-[12px] tracking-wider uppercase transition-all duration-100 ${
                  activeCategory === cat ? "pixel-btn-primary" : "pixel-btn"
                }`}
                style={activeCategory !== cat ? { color: "var(--color-overlay1)" } : {}}
              >
                {activeCategory === cat ? "▶ " : ""}{cat}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                key={project.name}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
              >
                <div onClick={() => toggleExpand(project.name)} className="cursor-pointer">
                  <ProjectCard project={project} index={index} expanded={expandedProject === project.name} />
                </div>
                {index < filtered.length - 1 && <div className="hairline my-3" />}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
