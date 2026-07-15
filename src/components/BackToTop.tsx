"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 px-3 py-2 text-[12px] tracking-wider uppercase transition-all duration-200 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
      style={{
        border: "2px solid var(--color-border)",
        color: "var(--color-overlay1)",
        boxShadow: "inset -1px -1px 0 0 var(--color-surface0), inset 1px 1px 0 0 var(--color-overlay1)",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-accent)"; e.currentTarget.style.borderColor = "var(--color-accent-border)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-overlay1)"; e.currentTarget.style.borderColor = "var(--color-border)"; }}
    >
      ↑ TOP
    </button>
  );
}
