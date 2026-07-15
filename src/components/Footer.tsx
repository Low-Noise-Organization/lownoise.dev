"use client";

import Link from "next/link";
import { asset } from "@/lib/assets";
import { useTheme } from "@/lib/ThemeContext";

const footerLinks = [
  {
    headingKey: "footer.pages",
    links: [
      { href: "/", label: "Home", external: false },
      { href: "/projects", label: "Projects", external: false },
      { href: "/#about", label: "About", external: false },
      { href: "/#technologies", label: "Tech", external: false },
    ],
  },
  {
    headingKey: "footer.more",
    links: [
      { href: "/#contact", label: "Contact", external: false },
    ],
  },
  {
    headingKey: "footer.connect",
    links: [
      { href: "https://github.com/Low-Noise-Organization", label: "GitHub", external: true },
      { href: "https://www.youtube.com/@Low_Noise-n4e", label: "YouTube", external: true },
      { href: "https://www.linkedin.com/in/adrian-velasco-manas/", label: "LinkedIn", external: true },
    ],
  },
];

export default function Footer() {
  const { t } = useTheme();

  return (
    <footer className="relative" style={{ borderTop: "2px solid var(--color-border)" }}>
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background: "repeating-linear-gradient(90deg, var(--color-accent) 0px, var(--color-accent) 1px, transparent 1px, transparent 4px)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-10 md:px-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <img
                src={asset("/images/Low_Noise_Logo.png")}
                alt="Low Noise"
                className="h-6 w-6"
                style={{ imageRendering: "pixelated" }}
              />
              <span className="text-[14px] tracking-wider" style={{ color: "var(--color-accent)" }}>
                LOW NOISE
              </span>
            </Link>
            <p className="mt-3 text-[12px] leading-relaxed max-w-xs" style={{ color: "var(--color-overlay0)" }}>
              {t("footer.tagline")}
            </p>
            <div className="mt-4 flex gap-2">
              {[
                { href: "https://github.com/Low-Noise-Organization", label: "GH", color: "var(--color-accent)" },
                { href: "https://www.youtube.com/@Low_Noise-n4e", label: "YT", color: "var(--color-red)" },
                { href: "https://www.linkedin.com/in/adrian-velasco-manas/", label: "LI", color: "var(--color-sky)" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 text-[11px] tracking-wider uppercase transition-colors duration-100"
                  style={{
                    border: "1px solid var(--color-border)",
                    color: "var(--color-overlay1)",
                    boxShadow: "inset -1px -1px 0 0 var(--color-surface0), inset 1px 1px 0 0 var(--color-overlay1)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = s.color; e.currentTarget.style.borderColor = s.color; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-overlay1)"; e.currentTarget.style.borderColor = "var(--color-border)"; }}
                >
                  [{s.label}]
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((col) => (
            <div key={col.headingKey}>
              <h3 className="text-[12px] tracking-wider mb-3" style={{ color: "var(--color-mauve)" }}>
                ◆ {t(col.headingKey)}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[12px] transition-colors duration-100 hover:text-accent"
                        style={{ color: "var(--color-overlay0)" }}
                      >
                        ▸ {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-[12px] transition-colors duration-100 hover:text-accent"
                        style={{ color: "var(--color-overlay0)" }}
                      >
                        ▸ {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between" style={{ borderTop: "2px dashed var(--color-border)" }}>
          <p className="text-[11px]" style={{ color: "var(--color-overlay0)" }}>
            &copy; {new Date().getFullYear()} LOW NOISE. {t("footer.rights")}
          </p>
          <p className="text-[11px]" style={{ color: "var(--color-overlay0)" }}>
            {t("footer.built")}
          </p>
        </div>
      </div>
    </footer>
  );
}
