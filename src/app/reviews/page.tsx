"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const DISCORD_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1527004811831148694/nkblkEvsjiQf49kefmFRIziz9LEY3gyUu4S2DvlCIohzQNZ2nIB5Gk3ERXXPyAHaFA2S";

const ratingLabels = ["", "★☆☆☆☆", "★★☆☆☆", "★★★☆☆", "★★★★☆", "★★★★★"];

export default function ReviewsPage() {
  const [businessName, setBusinessName] = useState("");
  const [productType, setProductType] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }
    setSending(true);
    setError("");
    try {
      const payload = {
        username: "Low Noise Reviews",
        embeds: [
          {
            title: "\u2605 New Review \u2605",
            color: 0xf5bde6,
            fields: [
              { name: "Business", value: businessName, inline: true },
              { name: "Product", value: productType, inline: true },
              {
                name: "Rating",
                value: `${"\u2605".repeat(rating)}${"\u2606".repeat(5 - rating)} (${rating}/5)`,
                inline: true,
              },
              { name: "Message", value: message || "(No message)" },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      };
      const res = await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSent(true);
      setBusinessName("");
      setProductType("");
      setRating(0);
      setMessage("");
    } catch {
      setError("Failed to send. Try again later.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="relative min-h-screen pb-24">
      <div className="mx-auto max-w-7xl px-6 pt-28 sm:px-10 md:px-16">
        {/* Header */}
        <div className="mb-10 text-center">
          <p
            className="text-[11px] tracking-widest"
            style={{ color: "var(--color-mauve)" }}
          >
            ◆ REVIEWS
          </p>
          <h1
            className="mt-2 text-[22px] font-bold tracking-wider"
            style={{ color: "var(--color-text)" }}
          >
            LOW NOISE REVIEWS
          </h1>
          <p
            className="mt-2 text-[12px] leading-relaxed"
            style={{ color: "var(--color-overlay1)" }}
          >
            Tell us about your experience with Low Noise products and services.
            Your feedback helps us improve.
          </p>
        </div>

        {/* Form */}
        <div className="mx-auto max-w-2xl">
          <div
            className="pixel-card p-6"
            style={{ border: "2px solid var(--color-border)" }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Business Name */}
              <div>
                <label
                  className="mb-1.5 block text-[12px] tracking-wider"
                  style={{ color: "var(--color-subtext0)" }}
                >
                  NOMBRE NEGOCIO *
                </label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-3 py-2.5 text-[13px]"
                  style={{
                    color: "var(--color-text)",
                    background: "var(--color-crust)",
                    border: "2px solid var(--color-border)",
                    boxShadow:
                      "inset 2px 2px 0 0 var(--color-surface0), inset -2px -2px 0 0 var(--color-overlay1)",
                    outline: "none",
                  }}
                />
              </div>

              {/* Product Type */}
              <div>
                <label
                  className="mb-1.5 block text-[12px] tracking-wider"
                  style={{ color: "var(--color-subtext0)" }}
                >
                  TIPO DE PRODUCTO *
                </label>
                <select
                  required
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className="w-full px-3 py-2.5 text-[13px] appearance-none"
                  style={{
                    color: "var(--color-text)",
                    background: "var(--color-crust)",
                    border: "2px solid var(--color-border)",
                    boxShadow:
                      "inset 2px 2px 0 0 var(--color-surface0), inset -2px -2px 0 0 var(--color-overlay1)",
                    outline: "none",
                  }}
                >
                  <option value="" disabled>-- Selecciona una opción --</option>
                  <option value="Pagina web">Pagina web</option>
                  <option value="Producto digital">Producto digital</option>
                  <option value="Programa a medida">Programa a medida</option>
                </select>
              </div>

              {/* Star Rating */}
              <div>
                <label
                  className="mb-2 block text-[12px] tracking-wider"
                  style={{ color: "var(--color-subtext0)" }}
                >
                  VALORACIÓN *
                </label>
                <div
                  className="flex justify-center gap-3 px-6 py-5"
                  style={{
                    border: "2px solid var(--color-border)",
                    boxShadow:
                      "inset -2px -2px 0 0 var(--color-surface0), inset 2px 2px 0 0 var(--color-overlay1)",
                  }}
                >
                  {[1, 2, 3, 4, 5].map((star) => {
                    const active = star <= (hoveredRating || rating);
                    return (
                      <motion.button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="relative leading-none transition-colors duration-100"
                        style={{
                          fontSize: "3.5rem",
                          color: active
                            ? "var(--color-yellow)"
                            : "var(--color-surface1)",
                          textShadow: active
                            ? "0 0 10px var(--color-yellow), 0 0 20px var(--color-yellow)"
                            : "none",
                        }}
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.85 }}
                        animate={
                          active && !hoveredRating
                            ? {
                                scale: [1, 1.15, 1],
                                transition: {
                                  duration: 1.2,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                },
                              }
                            : { scale: 1 }
                        }
                      >
                        {active ? "\u2605" : "\u2606"}
                      </motion.button>
                    );
                  })}
                </div>
                {rating > 0 && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mt-1.5 text-[11px]"
                    style={{ color: "var(--color-overlay0)" }}
                  >
                    {ratingLabels[rating]}
                  </motion.p>
                )}
              </div>

              {/* Optional Message */}
              <div>
                <label
                  className="mb-1.5 block text-[12px] tracking-wider"
                  style={{ color: "var(--color-subtext0)" }}
                >
                  MENSAJE (opcional)
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w resize-none w-full px-3 py-2.5 text-[13px]"
                  style={{
                    color: "var(--color-text)",
                    background: "var(--color-crust)",
                    border: "2px solid var(--color-border)",
                    boxShadow:
                      "inset 2px 2px 0 0 var(--color-surface0), inset -2px -2px 0 0 var(--color-overlay1)",
                    outline: "none",
                  }}
                />
              </div>

              {error && (
                <p className="text-[12px]" style={{ color: "var(--color-red)" }}>
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={sending || sent}
                className="pixel-btn-primary w-full py-3 text-[13px] tracking-wider uppercase"
              >
                {sending
                  ? "ENVIANDO..."
                  : sent
                    ? "\u2713 ENVIADO"
                    : "ENVIAR"}
              </button>

              {sent && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-[11px]"
                  style={{ color: "var(--color-green)" }}
                >
                  Thank you for your review! Sent successfully via Discord.
                </motion.p>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
