"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="panel-accent group rounded-lg p-6 sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <span className="font-mono text-[10px] tracking-[0.2em] text-text-quaternary uppercase">
            {project.category}
          </span>
          <h3 className="font-heading mt-2 text-xl font-medium tracking-tight text-text-primary transition-colors duration-300 group-hover:text-accent">
            {project.name}
          </h3>
        </div>
        <span className="shrink-0 rounded border border-border bg-bg-tertiary/50 px-2.5 py-1 font-mono text-[10px] tracking-wider text-text-quaternary uppercase">
          {project.status}
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-text-secondary">
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded border border-border bg-bg-tertiary/30 px-2.5 py-0.5 font-mono text-[10px] text-text-quaternary"
          >
            {tag}
          </span>
        ))}
      </div>

      {project.github && (
        <div className="mt-6 flex items-center gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] tracking-wider text-text-tertiary uppercase transition-colors duration-200 hover:text-accent"
          >
            GitHub →
          </a>
        </div>
      )}
    </motion.article>
  );
}
