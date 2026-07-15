"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { asset } from "@/lib/assets";

const skills = [
  "Java", "Rust", "Kotlin", "Linux", "Android", "System Design",
];

const socials = [
  { label: "GitHub", href: "https://github.com/Low-Noise-Organization" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/adrian-velasco-manas/" },
];

export default function CVCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative mx-auto w-full max-w-sm"
    >
      <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-accent via-purple-accent to-cyan-500 opacity-50 blur-xl transition-all duration-500 group-hover:opacity-80" />
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-accent via-purple-accent to-cyan-500 opacity-75 transition-all duration-500 group-hover:opacity-100" />

      <div className="glass-card relative rounded-2xl p-6 sm:p-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-accent-border">
              <Image
                src={asset("/assets/FotoPerfil.png")}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-heading text-lg font-medium text-text-primary">
                Adrian Velasco Mañas
              </h3>
              <p className="mt-0.5 text-sm text-text-tertiary">
                Software Engineering Studio
              </p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] tracking-wider text-emerald-400 uppercase">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Available
          </span>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-text-secondary">
          Quiet, intentional, precise. Building elegant, open-source tools and
          applications with obsessive attention to quality and maintainability.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <span
              key={skill}
              className="rounded-md border border-accent-border bg-accent-subtle px-2.5 py-1 font-mono text-[11px] text-accent transition-all duration-300 hover:bg-accent/20"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="panel-accent group/btn flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-mono tracking-wider text-text-tertiary uppercase transition-all duration-300 hover:text-accent"
            >
              <span>{s.label}</span>
              <span className="transition-transform duration-300 group-hover/btn:translate-x-0.5">→</span>
            </a>
          ))}
          <a
            href="#contact"
            className="ml-auto rounded-lg bg-accent/10 px-4 py-2 font-mono text-xs tracking-wider text-accent uppercase transition-all duration-300 hover:bg-accent/20"
          >
            Hire Me
          </a>
        </div>
      </div>
    </motion.div>
  );
}
