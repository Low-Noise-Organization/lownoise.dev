"use client";

import Link from "next/link";

const hiddenPages = [
  {
    title: "SORTING ALGORITHMS",
    url: "/algorithms",
    description: "Interactive visualizer and code samples for 9 sorting algorithms in 5 languages.",
    icon: "⇅",
  },
  {
    title: "LOW NOISE REVIEWS",
    url: "/reviews",
    description: "Submit a review for Low Noise products and services via Discord.",
    icon: "★",
  },
  {
    title: "Test 404 error",
    url: "/error",
    description: "No hay ninguna web, pero provoca un error",
    icon: "⇅",
  },
];

export default function HidenPage() {
  return (
    <main className="relative min-h-screen pb-24">
      <div className="mx-auto max-w-7xl px-6 pt-28 sm:px-10 md:px-16">
        <div className="mb-10">
          <p className="text-[11px] tracking-widest" style={{ color: "var(--color-mauve)" }}>
            ◆ HIDDEN
          </p>
          <h1 className="mt-2 text-[22px] font-bold tracking-wider" style={{ color: "var(--color-text)" }}>
            HIDDEN PAGES
          </h1>
          <p className="mt-2 text-[12px] leading-relaxed max-w-2xl" style={{ color: "var(--color-overlay1)" }}>
            Index of pages not linked from the main site. Bookmark this page or remember the URLs.
          </p>
        </div>

        <div className="space-y-4">
          {hiddenPages.map((page) => (
            <Link
              key={page.url}
              href={page.url}
              className="pixel-card group flex items-center gap-5 px-6 py-5 transition-all duration-100 hover:border-accent-border"
            >
              <span
                className="flex h-10 w-10 items-center justify-center text-[18px]"
                style={{
                  border: "2px solid var(--color-border)",
                  boxShadow: "inset -1px -1px 0 0 var(--color-surface0), inset 1px 1px 0 0 var(--color-overlay1)",
                }}
              >
                {page.icon}
              </span>
              <div className="flex-1">
                <span
                  className="text-[13px] tracking-wider transition-colors duration-200 group-hover:text-accent"
                  style={{ color: "var(--color-subtext1)" }}
                >
                  {page.title}
                </span>
                <p className="mt-0.5 text-[11px]" style={{ color: "var(--color-overlay0)" }}>
                  {page.description}
                </p>
              </div>
              <span
                className="text-[11px] tracking-wider px-2 py-1"
                style={{
                  color: "var(--color-overlay0)",
                  border: "1px solid var(--color-border)",
                  boxShadow: "inset -1px -1px 0 0 var(--color-surface0), inset 1px 1px 0 0 var(--color-overlay1)",
                }}
              >
                {page.url}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}