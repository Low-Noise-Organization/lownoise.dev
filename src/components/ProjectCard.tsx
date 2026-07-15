"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";
import { useTheme } from "@/lib/ThemeContext";

interface ProjectCardProps {
  project: Project;
  index: number;
  expanded?: boolean;
}

const statusColorKeys: Record<string, string> = {
  "Published": "var(--color-green)",
  "Active Development": "var(--color-yellow)",
  "Research": "var(--color-sky)",
  "Planning": "var(--color-overlay0)",
};

const statusLabelKeys: Record<string, string> = {
  "Published": "status.published",
  "Active Development": "status.activeDev",
  "Research": "status.research",
  "Planning": "status.planning",
};

export function ProjectCard({ project, index, expanded = false }: ProjectCardProps) {
  const { t } = useTheme();
  const dotColor = statusColorKeys[project.status] || "var(--color-overlay0)";
  const statusLabel = t(statusLabelKeys[project.status] || "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <article
        className="pixel-card group relative h-full p-5 transition-all duration-100 hover:border-accent-border sm:p-6"
        style={expanded ? { borderColor: "var(--color-accent-border)" } : {}}
      >
        <div className="flex items-start justify-between gap-3">
          <span className="text-[11px] tracking-wider" style={{ color: "var(--color-mauve)" }}>
            ◆ {project.category}
          </span>
          <span
            className="inline-flex items-center gap-1.5 px-2 py-1 text-[11px] tracking-wider uppercase"
            style={{
              border: "1px solid var(--color-border)",
              color: "var(--color-overlay0)",
              boxShadow: "inset -1px -1px 0 0 var(--color-surface0), inset 1px 1px 0 0 var(--color-overlay1)",
            }}
          >
            <span className="h-1.5 w-1.5" style={{ backgroundColor: dotColor }} />
            {statusLabel}
          </span>
        </div>

        <h3
          className="mt-3 text-sm tracking-wider transition-colors duration-100 group-hover:text-accent"
          style={{ color: "var(--color-text)" }}
        >
          {project.name}
        </h3>

        <p className="mt-2 text-[12px] leading-relaxed" style={{ color: "var(--color-overlay1)" }}>
          {project.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[11px]"
              style={{
                border: "1px solid var(--color-surface1)",
                color: "var(--color-subtext0)",
                boxShadow: "inset -1px -1px 0 0 var(--color-surface0), inset 1px 1px 0 0 var(--color-overlay1)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {expanded && (
          <div className="mt-4 space-y-4 pt-4" style={{ borderTop: "2px dashed var(--color-border)" }}>
            <div>
              <span className="text-[11px] tracking-wider" style={{ color: "var(--color-mauve)" }}>◆ {t("project.techStack")}</span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[11px]"
                    style={{
                      border: "1px solid var(--color-accent-border)",
                      color: "var(--color-accent)",
                      boxShadow: "inset -1px -1px 0 0 var(--color-surface0), inset 1px 1px 0 0 var(--color-overlay1)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[11px] tracking-wider" style={{ color: "var(--color-mauve)" }}>◆ {t("project.features")}</span>
              <ul className="mt-2 space-y-1">
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[12px]" style={{ color: "var(--color-subtext1)" }}>
                    <span className="mt-0.5 text-[9px]" style={{ color: "var(--color-accent)" }}>▸</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {project.highlights.length > 0 && (
              <div>
                <span className="text-[11px] tracking-wider" style={{ color: "var(--color-mauve)" }}>◆ {t("project.highlights")}</span>
                <div className="mt-2 grid gap-1.5 sm:grid-cols-3">
                  {project.highlights.map((h) => (
                    <div
                      key={h}
                      className="px-2 py-1.5 text-[11px]"
                      style={{
                        border: "1px solid var(--color-accent-border)",
                        color: "var(--color-teal)",
                        boxShadow: "inset -1px -1px 0 0 var(--color-surface0), inset 1px 1px 0 0 var(--color-overlay1)",
                      }}
                    >
                      {h}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {project.github && (
          <div className="mt-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[12px] tracking-wider uppercase transition-colors duration-100 hover:text-accent"
              style={{ color: "var(--color-overlay0)" }}
            >
              <span style={{ color: "var(--color-accent)" }}>◆</span>
              {t("project.viewGithub")}
            </a>
          </div>
        )}
      </article>
    </motion.div>
  );
}
