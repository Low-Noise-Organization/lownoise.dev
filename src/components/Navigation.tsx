"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { asset } from "@/lib/assets";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#technologies", label: "Technologies" },
  { href: "#youtube", label: "YouTube" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-bg-deep/80 backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-10 md:px-16">
        <a href="#hero" className="flex items-center gap-2 py-3">
          <Image
            src={asset("/images/Low_Noise_Logo.png")}
            alt="Low Noise"
            width={24}
            height={24}
            className="h-6 w-6 rounded-full transition-transform duration-500 hover:rotate-12"
          />
          <span className="font-heading text-sm font-medium text-text-primary">
            Low Noise
          </span>
        </a>

        <div className="flex items-center gap-1 overflow-x-auto">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-md px-3 py-2 font-mono text-xs tracking-wider text-text-tertiary uppercase transition-colors duration-200 hover:bg-accent-subtle hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
