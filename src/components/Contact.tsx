"use client";

import { useState, useCallback } from "react";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

const EMAIL = "adricoding647@gmail.com";

const links = [
  { href: "https://github.com/Low-Noise-Studio", label: "GitHub" },
  { href: "https://linkedin.com/in/your-profile", label: "LinkedIn" },
  { label: "Email", isEmail: true },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = EMAIL;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }, []);

  return (
    <section id="contact" className="relative py-32 md:py-40">
      <Reveal>
        <SectionHeader number="006" title="Contact" subtitle="Connect." />
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-20 flex flex-wrap gap-3">
          {links.map((link) =>
            link.isEmail ? (
              <button
                key="email"
                onClick={handleCopy}
                className="panel-accent group relative rounded-lg px-5 py-3 text-left"
              >
                <span className="font-mono text-xs tracking-wider text-text-secondary transition-colors duration-200 group-hover:text-accent">
                  {copied ? "Copied!" : "Email"}
                </span>
                <span className="ml-2 font-mono text-[10px] text-text-quaternary transition-colors duration-200">
                  {copied ? "✓" : "→"}
                </span>
              </button>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="panel-accent group rounded-lg px-5 py-3"
              >
                <span className="font-mono text-xs tracking-wider text-text-secondary transition-colors duration-200 group-hover:text-accent">
                  {link.label}
                </span>
                <span className="ml-2 font-mono text-[10px] text-text-quaternary transition-colors duration-200 group-hover:text-accent/60">
                  →
                </span>
              </a>
            ),
          )}
        </div>
      </Reveal>
    </section>
  );
}
