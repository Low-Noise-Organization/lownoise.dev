"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { asset } from "@/lib/assets";
import { useTheme } from "@/lib/ThemeContext";
import { languages } from "@/lib/i18n";

const pageLinks = [
  { href: "/", labelKey: "nav.home" },
  { href: "/projects", labelKey: "nav.projects" },
  { href: "/#about", labelKey: "nav.about" },
  { href: "/#technologies", labelKey: "nav.tech" },
  { href: "/#contact", labelKey: "nav.contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { theme, toggleTheme, language, setLanguage, t } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setLangOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? "border-b-2 border-border bg-crust/95" : ""
      }`}
      style={scrolled ? { boxShadow: "inset 0 -2px 0 0 var(--color-surface0)" } : {}}
    >
      <nav aria-label="Main navigation" className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-10 md:px-16">
        <Link href="/" className="flex items-center gap-2 py-3">
          <Image
            src={asset("/images/Low_Noise_Logo.png")}
            alt="Low Noise"
            width={24}
            height={24}
            className="h-6 w-6"
            style={{ imageRendering: "pixelated" }}
          />
          <span className="text-[14px] tracking-wider" style={{ color: "var(--color-accent)" }}>
            LOW NOISE
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {pageLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-[12px] tracking-wider uppercase transition-all duration-100"
                style={{
                  color: isActive ? "var(--color-accent)" : "var(--color-overlay1)",
                  border: isActive ? "2px solid var(--color-accent-border)" : "2px solid transparent",
                  boxShadow: isActive ? "inset -1px -1px 0 0 var(--color-surface0), inset 1px 1px 0 0 var(--color-overlay1)" : "none",
                }}
                aria-current={isActive ? "page" : undefined}
              >
                {isActive ? "▸ " : ""}{t(link.labelKey)}
              </Link>
            );
          })}

          {/* Language switcher */}
          <div className="relative ml-2">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="px-2 py-2 text-[12px] tracking-wider uppercase transition-all duration-100"
              style={{
                color: "var(--color-overlay1)",
                border: "2px solid var(--color-border)",
                boxShadow: "inset -1px -1px 0 0 var(--color-surface0), inset 1px 1px 0 0 var(--color-overlay1)",
              }}
            >
              {language.toUpperCase()}
            </button>
            {langOpen && (
              <div
                className="absolute top-full right-0 mt-1 z-50 min-w-[100px]"
                style={{
                  border: "2px solid var(--color-border)",
                  boxShadow: "inset -1px -1px 0 0 var(--color-surface0), inset 1px 1px 0 0 var(--color-overlay1)",
                  background: "var(--color-base)",
                }}
              >
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLanguage(l.code); setLangOpen(false); }}
                    className="w-full px-3 py-2 text-[12px] tracking-wider text-left uppercase transition-colors duration-100 hover:text-accent"
                    style={{
                      color: language === l.code ? "var(--color-accent)" : "var(--color-overlay1)",
                      background: language === l.code ? "var(--color-accent-subtle)" : "transparent",
                    }}
                  >
                    {l.flag} {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="px-2 py-2 text-[14px] transition-all duration-100"
            style={{
              color: "var(--color-overlay1)",
              border: "2px solid var(--color-border)",
              boxShadow: "inset -1px -1px 0 0 var(--color-surface0), inset 1px 1px 0 0 var(--color-overlay1)",
            }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀" : "☽"}
          </button>
        </div>

        {/* Mobile trigger */}
        <button
          className="flex items-center justify-center p-2 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className="text-[16px]" style={{ color: "var(--color-text)" }}>
            {menuOpen ? "✕" : "☰"}
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-crust/98"
          role="dialog" aria-modal="true"
          style={{ border: "2px solid var(--color-border)" }}
        >
          {pageLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-base tracking-wider uppercase"
                style={{ color: isActive ? "var(--color-accent)" : "var(--color-overlay1)" }}
                onClick={() => setMenuOpen(false)}
              >
                {isActive ? "▸ " : ""}{t(link.labelKey)}
              </Link>
            );
          })}

          {/* Mobile language + theme */}
          <div className="flex gap-3 mt-4">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLanguage(l.code); setMenuOpen(false); }}
                className="px-3 py-2 text-[12px] uppercase"
                style={{
                  color: language === l.code ? "var(--color-accent)" : "var(--color-overlay1)",
                  border: "2px solid var(--color-border)",
                  boxShadow: "inset -1px -1px 0 0 var(--color-surface0), inset 1px 1px 0 0 var(--color-overlay1)",
                }}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={toggleTheme}
              className="px-3 py-2 text-[14px]"
              style={{
                border: "2px solid var(--color-border)",
                boxShadow: "inset -1px -1px 0 0 var(--color-surface0), inset 1px 1px 0 0 var(--color-overlay1)",
              }}
            >
              {theme === "dark" ? "☀" : "☽"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
