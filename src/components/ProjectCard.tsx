import type { Project } from "@/lib/projects";
import { Reveal } from "./Reveal";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const statusColors: Record<string, string> = {
  "Published": "bg-emerald-500",
  "Active Development": "bg-amber-500",
  "Research": "bg-sky-500",
  "Planning": "bg-text-quaternary",
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const dotColor = statusColors[project.status] || "bg-text-quaternary";

  const card = (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <span className="font-mono text-xs tracking-[0.2em] text-text-quaternary uppercase">
          {project.category}
        </span>
        <h3 className="font-heading mt-2 text-xl font-medium tracking-tight text-text-primary transition-colors duration-300 group-hover:text-accent">
          {project.name}
        </h3>
      </div>
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded border border-border bg-bg-tertiary/50 px-2.5 py-1 font-mono text-xs tracking-wider text-text-quaternary uppercase">
        <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
        {project.status}
      </span>
    </div>
  );

  const body = (
    <>
      <p className="mt-4 text-sm leading-relaxed text-text-secondary">
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded border border-border bg-bg-tertiary/30 px-2.5 py-0.5 font-mono text-xs text-text-quaternary"
          >
            {tag}
          </span>
        ))}
      </div>
    </>
  );

  return (
    <Reveal delay={index * 0.05}>
      <article className="panel-accent group rounded-lg p-6 sm:p-8">
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            {card}
            {body}
            <div className="mt-6 flex items-center gap-4">
              <span className="font-mono text-xs tracking-wider text-text-tertiary uppercase transition-colors duration-200 group-hover:text-accent">
                GitHub →
              </span>
            </div>
          </a>
        ) : (
          <>
            {card}
            {body}
          </>
        )}
      </article>
    </Reveal>
  );
}
