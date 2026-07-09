"use client";

import { useState, useCallback } from "react";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

const EMAIL = ["adricoding647", "@", "gmail", ".com"].join("");

const links = [
  {
    href: "https://github.com/Low-Noise-Organization",
    label: "GitHub",
    description: "Explore repositories, open issues, submit PRs",
  },
  {
    href: "https://www.linkedin.com/in/adrian-velasco-manas/",
    label: "LinkedIn",
    description: "Professional profile and connections",
  },
  { label: "Email", isEmail: true, description: "Direct messages" },
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
    <section id="contact" aria-label="Contact" className="relative py-24 md:py-32">
      <Reveal>
        <SectionHeader title="Contact" subtitle="Get in touch." />
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-text-secondary">
          Found a bug? Want to contribute? Have an idea for a project?
          Each channel has a purpose — use the one that fits.
        </p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-quaternary">
          Also open to: bad puns about segfaults, architecture debates,
          and recommendations for good terminal fonts.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-10 space-y-3" role="group" aria-label="Contact channels">
          {links.map((link) =>
            link.isEmail ? (
              <button
                key="email"
                onClick={handleCopy}
                className="panel-accent group flex w-full max-w-md items-center justify-between rounded-lg px-5 py-4 text-left"
                aria-live="polite"
                aria-label={copied ? "Email address copied to clipboard" : "Copy email address"}
              >
                <div>
                  <span className="font-mono text-xs tracking-wider text-text-secondary transition-colors duration-200 group-hover:text-accent">
                    {copied ? "Copied!" : "Email"}
                  </span>
                  <p className="mt-0.5 text-xs text-text-quaternary">
                    {link.description}
                  </p>
                </div>
                <span className="ml-4 font-mono text-xs text-text-quaternary transition-colors duration-200">
                  {copied ? "✓" : "→"}
                </span>
              </button>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="panel-accent group flex w-full max-w-md items-center justify-between rounded-lg px-5 py-4"
              >
                <div>
                  <span className="font-mono text-xs tracking-wider text-text-secondary transition-colors duration-200 group-hover:text-accent">
                    {link.label}
                  </span>
                  <p className="mt-0.5 text-xs text-text-quaternary">
                    {link.description}
                  </p>
                </div>
                <span className="ml-4 font-mono text-xs text-text-quaternary transition-colors duration-200 group-hover:text-accent/60">
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
