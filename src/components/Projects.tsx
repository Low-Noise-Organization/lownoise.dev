"use client";

import Link from "next/link";
import { projects } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { useTheme } from "@/lib/ThemeContext";

export default function Projects() {
  const { t } = useTheme();
  const featured = projects.slice(0, 2);

  return (
    <section id="projects" aria-label="Projects" className="relative py-24 md:py-32">
      <Reveal>
        <SectionHeader
          title={
            <>
              {t("projects.title")}
              <span className="ml-2 text-sm" style={{ color: "var(--color-mauve)" }}>◆</span>
            </>
          }
          subtitle={t("projects.subtitle")}
        />
      </Reveal>

      <div className="mt-16">
        <div className="grid gap-4 sm:grid-cols-2">
          {featured.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={index}
            />
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-8 flex justify-center">
            <Link
              href="/projects"
              className="pixel-btn-primary px-8 py-4 text-[13px] tracking-wider uppercase inline-flex items-center gap-2"
            >
              {t("projects.viewAll")}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
