"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-1 origin-left"
      style={{
        background: "repeating-linear-gradient(90deg, var(--color-accent) 0px, var(--color-accent) 4px, var(--color-mauve) 4px, var(--color-mauve) 8px)",
        transform: `scaleX(${progress})`,
      }}
    />
  );
}
