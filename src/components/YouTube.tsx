"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { useTheme } from "@/lib/ThemeContext";

const topics = [
  "Linux development workflows and tooling",
  "Rust systems programming and architecture",
  "Java patterns, performance, and legacy",
  "TUI and CLI design philosophy",
  "Honest build logs and postmortems",
];

export default function YouTubeSection() {
  const { t } = useTheme();

  return (
    <section id="youtube" aria-label="YouTube" className="relative py-24 md:py-32">
      <Reveal>
        <SectionHeader
          title={
            <>
              {t("youtube.title")}
              <span className="ml-2 text-sm" style={{ color: "var(--color-red)" }}>◆</span>
            </>
          }
          subtitle={t("youtube.subtitle")}
        />
      </Reveal>

      <div className="mt-16 grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-7" delay={0.1}>
          <div className="space-y-4 text-[13px] leading-relaxed" style={{ color: "var(--color-overlay1)" }}>
            <p>{t("youtube.desc")}</p>
            <ul className="space-y-1.5">
              {topics.map((topic) => (
                <li key={topic} className="flex items-center gap-2">
                  <span className="text-[11px]" style={{ color: "var(--color-red)" }}>▶</span>
                  <span className="text-[13px]" style={{ color: "var(--color-subtext1)" }}>{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.15}>
          <motion.a
            href="https://www.youtube.com/@Low_Noise-n4e"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.1 }}
            className="pixel-card group flex items-start gap-3 p-5 transition-all duration-100 hover:border-accent-border md:p-6"
          >
            <div
              className="flex h-10 w-10 items-center justify-center shrink-0"
              style={{
                border: "2px solid var(--color-red)",
                color: "var(--color-red)",
                boxShadow: "inset -1px -1px 0 0 var(--color-surface0), inset 1px 1px 0 0 var(--color-overlay1)",
              }}
            >
              <span style={{ fontSize: "14px" }}>▶</span>
            </div>
            <div>
              <span
                className="text-[12px] tracking-wider uppercase transition-colors duration-100 group-hover:text-accent"
                style={{ color: "var(--color-subtext1)" }}
              >
                @LowNoiseStudio
              </span>
              <p className="mt-0.5 text-[11px]" style={{ color: "var(--color-overlay0)" }}>
                {t("youtube.watch")}
              </p>
            </div>
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}
