"use client";

import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { useTheme } from "@/lib/ThemeContext";

const values = [
  {
    titleKey: "principle.clarity",
    descKey: "principle.clarityDesc",
  },
  {
    titleKey: "principle.maintainability",
    descKey: "principle.maintainabilityDesc",
  },
  {
    titleKey: "principle.architecture",
    descKey: "principle.architectureDesc",
  },
  {
    titleKey: "principle.ux",
    descKey: "principle.uxDesc",
  },
  {
    titleKey: "principle.opensource",
    descKey: "principle.opensourceDesc",
  },
  {
    titleKey: "principle.learning",
    descKey: "principle.learningDesc",
  },
];

const overview = [
  { labelKey: "about.founded", valueKey: "about.founded" },
  { labelKey: "about.focus", value: "Software engineering" },
  { labelKey: "about.approach", value: "Quiet, intentional, precise" },
  { labelKey: "about.license", valueKey: "about.openSource" },
];

export default function About() {
  const { t } = useTheme();

  return (
    <section id="about" aria-label="About" className="relative py-24 md:py-32">
      <Reveal>
        <SectionHeader
          title={
            <>
              {t("about.title")}
              <span className="ml-2 text-sm" style={{ color: "var(--color-mauve)" }}>◆</span>
            </>
          }
          subtitle={t("about.subtitle")}
        />
      </Reveal>

      <div className="mt-16 grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-7" delay={0.1}>
          <div className="space-y-4 text-[13px] leading-relaxed" style={{ color: "var(--color-overlay1)" }}>
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p>{t("about.p3")}</p>
            <p>{t("about.p4")}</p>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.2}>
          <div className="pixel-card p-5">
            <div className="h-1.5 w-full pixel-divider mb-4" />
            <span className="text-[11px] tracking-wider" style={{ color: "var(--color-mauve)" }}>◆ {t("about.overview")}</span>
            <div className="mt-4 space-y-4">
              {overview.map((item) => (
                <div key={item.labelKey}>
                  <span className="text-[11px] tracking-wider" style={{ color: "var(--color-overlay0)" }}>
                    {t(item.labelKey)}
                  </span>
                  <p className="mt-0.5 text-[13px]" style={{ color: "var(--color-text)" }}>
                    {item.value || t(item.valueKey || "")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-24">
        <Reveal>
          <SectionHeader
            title={
              <>
                {t("about.principlesTitle")}
                <span className="ml-2 text-sm" style={{ color: "var(--color-mauve)" }}>◆</span>
              </>
            }
            subtitle={t("about.principlesSub")}
          />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 text-[13px] leading-relaxed max-w-2xl" style={{ color: "var(--color-overlay1)" }}>
            {t("about.principlesDesc")}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-px sm:grid-cols-2 lg:grid-cols-3" style={{ border: "2px solid var(--color-border)" }}>
          {values.map((value, i) => (
            <Reveal key={value.titleKey} delay={i * 0.04}>
              <div
                className="pixel-card-flat h-full p-5 transition-all duration-100 hover:bg-surface0 md:p-6"
                onMouseEnter={(e) => { const h3 = e.currentTarget.querySelector("h3"); if (h3) h3.style.color = "var(--color-accent)"; }}
                onMouseLeave={(e) => { const h3 = e.currentTarget.querySelector("h3"); if (h3) h3.style.color = "var(--color-text)"; }}
              >
                <h3 className="text-[13px] tracking-wider transition-colors duration-100" style={{ color: "var(--color-text)" }}>
                  ◆ {t(value.titleKey)}
                </h3>
                <p className="mt-2 text-[12px] leading-relaxed" style={{ color: "var(--color-overlay1)" }}>
                  {t(value.descKey)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
