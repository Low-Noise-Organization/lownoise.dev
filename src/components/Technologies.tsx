"use client";

import { techGroups } from "@/lib/technologies";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { useTheme } from "@/lib/ThemeContext";

export default function Technologies() {
  const { t } = useTheme();

  return (
    <section id="technologies" aria-label="Technologies" className="relative py-24 md:py-32">
      <Reveal>
        <SectionHeader
          title={
            <>
              {t("tech.title")}
              <span className="ml-2 text-sm" style={{ color: "var(--color-mauve)" }}>◆</span>
            </>
          }
          subtitle={t("tech.subtitle")}
        />
      </Reveal>

      <div className="mt-16 grid gap-3 sm:grid-cols-3">
        {techGroups.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.08}>
            <div className="pixel-card p-5 transition-all duration-100 hover:border-accent-border md:p-6">
              <div className="h-1 w-full pixel-divider mb-3" />
              <h3 className="text-[12px] tracking-wider" style={{ color: "var(--color-mauve)" }}>
                ◆ {group.title}
              </h3>
              <div className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <div key={item} className="group/item flex items-center gap-2">
                    <span
                      className="text-[11px] transition-all duration-100"
                      style={{ color: "var(--color-overlay0)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-accent)"; e.currentTarget.style.marginRight = "4px"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-overlay0)"; e.currentTarget.style.marginRight = "0"; }}
                    >
                      ▸
                    </span>
                    <span className="text-[13px]" style={{ color: "var(--color-subtext1)" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
