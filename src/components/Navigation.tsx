"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-5 left-1/2 z-50 -translate-x-1/2"
        >
          <div className="flex items-center gap-5 rounded-lg border border-border bg-bg-deep/80 px-4 py-2 backdrop-blur-lg">
            <img
              src="/images/Low_Noise_Logo.png"
              alt="Low Noise"
              className="h-7 w-7 rounded-full object-cover"
            />
            <span className="h-3 w-px bg-border" />
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-[11px] tracking-wider text-text-tertiary uppercase transition-colors duration-200 hover:text-text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
