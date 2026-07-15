"use client";

import { motion } from "framer-motion";
import PVCCard from "./PVCCard";
import { useTheme } from "@/lib/ThemeContext";

export default function Hero() {
  const { t } = useTheme();

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-depth" />
      <div className="pointer-events-none absolute inset-0 bg-grid-pixel" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 h-40 w-40 border-2"
          style={{
            borderColor: "var(--color-accent-border)",
            boxShadow: "0 0 40px rgba(137, 180, 250, 0.05)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 h-48 w-48 border-2"
          style={{
            borderColor: "var(--color-accent-border)",
            boxShadow: "0 0 40px rgba(203, 166, 247, 0.05)",
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        />
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute h-1.5 w-1.5"
            style={{
              backgroundColor: i % 2 === 0 ? "var(--color-accent)" : "var(--color-mauve)",
              opacity: 0.15,
              top: `${15 + i * 20}%`,
              left: `${10 + i * 25}%`,
            }}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 2 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          />
        ))}
      </div>

      <div className="relative z-10 flex w-full max-w-7xl flex-col items-center px-6 sm:px-10 md:px-16 lg:flex-row lg:items-center lg:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <div className="pixel-card inline-block px-4 py-2 mb-4">
            <span className="text-[12px]" style={{ color: "var(--color-mauve)" }}>
              ◆ {t("hero.est")} ◆
            </span>
          </div>

          <h1
            className="text-4xl leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            style={{
              color: "var(--color-text)",
              textShadow: "3px 3px 0 rgba(0,0,0,0.3)",
              letterSpacing: "0.05em",
            }}
          >
            <span className="block">{t("hero.title")}</span>
          </h1>

          <div
            className="mt-3 h-2 w-24"
            style={{
              background: "repeating-linear-gradient(90deg, var(--color-accent) 0px, var(--color-accent) 6px, transparent 6px, transparent 12px)",
            }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 text-sm leading-relaxed max-w-md"
            style={{ color: "var(--color-overlay1)" }}
          >
            {t("hero.subtitle1")}
            <br />
            {t("hero.subtitle2")}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <a href="#projects" className="pixel-btn-primary px-5 py-3 text-[12px] tracking-wider uppercase">
              {t("hero.viewProjects")}
            </a>
            <a
              href="#contact"
              className="pixel-btn px-5 py-3 text-[12px] tracking-wider uppercase"
              style={{ color: "var(--color-accent)", borderColor: "var(--color-accent-border)" }}
            >
              {t("hero.hireUs")}
            </a>
          </motion.div>

          <motion.div
            className="mt-10 flex gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {["█", "▓", "▒", "░", "▒", "▓", "█"].map((c, i) => (
              <span
                key={i}
                className="text-[8px]"
                style={{
                  color: `var(--color-${i % 3 === 0 ? "accent" : i % 3 === 1 ? "mauve" : "surface2"})`,
                  opacity: 0.3 + i * 0.05,
                }}
              >
                {c}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12 lg:mt-0 lg:ml-16"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <PVCCard />
        </motion.div>
      </div>
    </section>
  );
}
