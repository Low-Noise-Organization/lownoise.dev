"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center"
    >
      <div className="pointer-events-none absolute inset-0 bg-glow-accent" />

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 flex justify-center"
        >
          <div className="rounded-full border-2 border-accent/30 p-1.5">
            <img
              src="/images/Low_Noise_Logo.png"
              alt="Low Noise"
              className="h-28 w-28 rounded-full object-cover opacity-90 md:h-36 md:w-36 lg:h-40 lg:w-40"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-heading text-6xl font-light tracking-tight text-text-primary sm:text-7xl md:text-8xl lg:text-9xl">
            Low Noise
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            delay: 0.4,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mt-6 max-w-lg text-base leading-relaxed tracking-wide text-text-tertiary md:text-lg"
        >
          Software engineering.
          <br />
          Precision. Clarity. Intention.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-20"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-text-quaternary uppercase">
            Scroll
          </span>
          <div className="mx-auto mt-3 h-16 w-px bg-gradient-to-b from-text-quaternary/80 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
