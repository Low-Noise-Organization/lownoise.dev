"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { adapters } from "low-noise-contact-suite/adapters";
import type { ChannelConfig } from "low-noise-contact-suite";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { useTheme } from "@/lib/ThemeContext";

const EMAIL = ["adricoding647", "@", "gmail", ".com"].join("");
const WHATSAPP_NUMBER = "34644250482";
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1527004811831148694/nkblkEvsjiQf49kefmFRIziz9LEY3gyUu4S2DvlCIohzQNZ2nIB5Gk3ERXXPyAHaFA2S";
const DISCORD_USERNAME = "adrilaso647";
const EMAILJS_PUBLIC_KEY = "Jy1NNYYSWEaDl3AXs";
const EMAILJS_SERVICE_ID = "service_gosjtbe";
const EMAILJS_TEMPLATE_ID = "template_llrubbc";

const socialLinks = [
  {
    href: "https://github.com/Low-Noise-Organization",
    labelKey: "contact.githubDesc",
    icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/adrian-velasco-manas/",
    labelKey: "contact.linkedinDesc",
    icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    label: "LinkedIn",
  },
  { labelKey: "contact.emailDesc", isEmail: true, label: "Email" },
  {
    href: "https://discord.gg/ubJVXBRwfy",
    labelKey: "contact.discordDesc",
    icon: "M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.054C1.483 8.218.579 11.956.72 15.64a.08.08 0 0 0 .032.058 19.912 19.912 0 0 0 5.99 3.028.077.077 0 0 0 .084-.027 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.131 13.131 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.028.077.077 0 0 0 .032-.054c.188-4.183-.64-7.913-2.74-11.215a.063.063 0 0 0-.031-.053zM8.02 14.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z",
    label: "Discord",
  },
];

interface FormData {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

function toFormData(data: FormData): globalThis.FormData {
  const fd = new globalThis.FormData();
  fd.append("name", data.name);
  fd.append("phone", data.phone);
  fd.append("email", data.email);
  fd.append("subject", data.subject);
  fd.append("message", data.message);
  return fd;
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [contactMethod, setContactMethod] = useState<"form" | "whatsapp" | "discord">("form");
  const [formData, setFormData] = useState<FormData>({ name: "", phone: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTheme();

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

  // --- LowNoise Contact Suite adapters ---
  const handleSendEmail = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const emailConfig: ChannelConfig = {
        type: "emailjs",
        publicKey: EMAILJS_PUBLIC_KEY,
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_TEMPLATE_ID,
      };
      await adapters.emailjs.send(emailConfig, toFormData(formData));
      setSent(true);
      setFormData({ name: "", phone: "",email: "", subject: "", message: "" });
    } catch {
      setError("Failed to send. Check EmailJS config.");
    } finally {
      setSending(false);
    }
  }, [formData]);

  const handleDiscord = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const payload = {
        username: "Portfolio Contact",
        embeds: [{
          title: formData.subject,
          color: 0x5865F2,
          fields: [
            { name: "Name", value: formData.name, inline: true },
            { name: "Phone", value: formData.phone, inline: true},
            { name: "Email", value: formData.email, inline: true },
            { name: "Message", value: formData.message },
          ],
          timestamp: new Date().toISOString(),
        }],
      };
      await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setSent(true);
      setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
    } catch {
      setError("Failed to send. Check Discord webhook URL.");
    } finally {
      setSending(false);
    }
  }, [formData]);

  const handleWhatsApp = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const whatsappConfig: ChannelConfig = {
      type: "whatsapp",
      number: WHATSAPP_NUMBER,
      messageTemplate: "*New Project Inquiry*\n\nName: {name}\nPhone: {phone}\nEmail: {email}\nSubject: {subject}\n\nMessage:\n{message}",
    };
    adapters.whatsapp.send(whatsappConfig, toFormData(formData));
    setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
  }, [formData]);

  const handleFormSubmit = contactMethod === "whatsapp" ? handleWhatsApp : contactMethod === "discord" ? handleDiscord : handleSendEmail;

  const formFields = [
    { labelKey: "contact.name", key: "name" as const, type: "text" },
    { labelKey: "PHONE", key: "phone" as const, type: "phone"},
    { labelKey: "contact.emailLabel", key: "email" as const, type: "email" },
    { labelKey: "contact.subject", key: "subject" as const, type: "text" },
  ];

  return (
    <section id="contact" aria-label="Contact" className="relative py-24 md:py-32">
      <Reveal>
        <SectionHeader
          title={
            <>
              {t("contact.title")}
              <span className="ml-2 text-sm" style={{ color: "var(--color-mauve)" }}>◆</span>
            </>
          }
          subtitle={t("contact.subtitle")}
        />
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal delay={0.1}>
          <div>
            <p className="text-[13px] leading-relaxed" style={{ color: "var(--color-overlay1)" }}>
              {t("contact.desc1")}
            </p>
            <p className="mt-2 text-[12px] leading-relaxed" style={{ color: "var(--color-overlay0)" }}>
              {t("contact.desc2")}
            </p>

            <div className="mt-6 space-y-2" role="group" aria-label="Contact channels">
              {socialLinks.map((link) =>
                link.isEmail ? (
                  <button
                    key="email"
                    onClick={handleCopy}
                    className="pixel-card group flex w-full items-center justify-between px-5 py-3 text-left transition-all duration-100 hover:border-accent-border cursor-pointer"
                    aria-live="polite"
                    aria-label={copied ? "Email copied" : "Copy email"}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 items-center justify-center" style={{ border: "2px solid var(--color-surface1)", boxShadow: "inset -1px -1px 0 0 var(--color-surface0), inset 1px 1px 0 0 var(--color-overlay1)" }}>
                        <svg className="h-3 w-3" style={{ color: "var(--color-overlay1)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[12px] tracking-wider transition-colors duration-200 group-hover:text-accent" style={{ color: "var(--color-subtext1)" }}>
                          {copied ? t("contact.copied") : t("contact.emailLabel")}
                        </span>
                        <p className="mt-0.5 text-[11px]" style={{ color: "var(--color-overlay0)" }}>
                          {t(link.labelKey || "")}
                        </p>
                      </div>
                    </div>
                    <span className="text-[12px]" style={{ color: "var(--color-overlay0)" }}>
                      {copied ? "✓" : "→"}
                    </span>
                  </button>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pixel-card group flex w-full items-center justify-between px-5 py-3 transition-all duration-100 hover:border-accent-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 items-center justify-center" style={{ border: "2px solid var(--color-surface1)", boxShadow: "inset -1px -1px 0 0 var(--color-surface0), inset 1px 1px 0 0 var(--color-overlay1)" }}>
                        <svg className="h-3 w-3" style={{ color: "var(--color-overlay1)" }} viewBox="0 0 24 24" fill="currentColor">
                          <path d={link.icon} />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[12px] tracking-wider transition-colors duration-200 group-hover:text-accent" style={{ color: "var(--color-subtext1)" }}>
                          {link.label}
                        </span>
                        <p className="mt-0.5 text-[11px]" style={{ color: "var(--color-overlay0)" }}>
                          {t(link.labelKey || "")}
                        </p>
                      </div>
                    </div>
                    <span className="text-[12px] transition-colors duration-200 group-hover:text-accent" style={{ color: "var(--color-overlay0)" }}>
                      →
                    </span>
                  </a>
                ),
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div>
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { id: "form" as const, labelKey: "contact.email" },
                { id: "whatsapp" as const, labelKey: "contact.whatsapp" },
                { id: "discord" as const, labelKey: "contact.discord" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setContactMethod(m.id)}
                  className={`px-4 py-2 text-[12px] tracking-wider uppercase transition-all duration-100 ${
                    contactMethod === m.id ? "pixel-btn-primary" : "pixel-btn"
                  }`}
                  style={contactMethod !== m.id ? { color: "var(--color-overlay1)" } : {}}
                >
                  {contactMethod === m.id ? "▶ " : ""}{t(m.labelKey)}
                </button>
              ))}
            </div>

            <form onSubmit={handleFormSubmit}>
              <div className="pixel-card p-5 space-y-4">
                {formFields.map((f) => (
                  <div key={f.key}>
                    <label className="block text-[12px] tracking-wider mb-1" style={{ color: "var(--color-subtext0)" }}>
                      {t(f.labelKey)}
                    </label>
                    <input
                      type={f.type}
                      required
                      value={formData[f.key]}
                      onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                      className="w-full px-3 py-2 text-[13px] bg-crust border-2 border-border"
                      style={{
                        color: "var(--color-text)",
                        boxShadow: "inset 2px 2px 0 0 var(--color-surface0), inset -2px -2px 0 0 var(--color-overlay1)",
                        outline: "none",
                      }}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-[12px] tracking-wider mb-1" style={{ color: "var(--color-subtext0)" }}>
                    {t("contact.message")}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 text-[13px] bg-crust border-2 border-border resize-none"
                    style={{
                      color: "var(--color-text)",
                      boxShadow: "inset 2px 2px 0 0 var(--color-surface0), inset -2px -2px 0 0 var(--color-overlay1)",
                      outline: "none",
                    }}
                  />
                </div>

                {error && (
                  <p className="text-[12px]" style={{ color: "var(--color-red)" }}>{error}</p>
                )}

                <button
                  type="submit"
                  disabled={sending || sent}
                  className="pixel-btn-primary w-full py-3 text-[13px] tracking-wider"
                >
                  {sending ? t("contact.sending") : sent ? t("contact.sent") : contactMethod === "whatsapp" ? t("contact.sendWhatsApp") : contactMethod === "discord" ? t("contact.sendDiscord") : t("contact.sendEmail")}
                </button>

                {contactMethod === "form" && (
                  <p className="text-[10px] text-center" style={{ color: "var(--color-overlay0)" }}>
                    {t("contact.emailjsConfig")}
                  </p>
                )}
                {contactMethod === "discord" && (
                  <p className="text-[10px] text-center" style={{ color: "var(--color-overlay0)" }}>
                    {t("contact.discordConfig")}
                  </p>
                )}
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
