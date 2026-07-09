"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

function PvcCard() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(springY, [0, 1], [5, -5]);
  const rotateY = useTransform(springX, [0, 1], [-5, 5]);

  const shadowX = useTransform(springX, [0, 1], [10, -10]);
  const shadowY = useTransform(springY, [0, 1], [10, -10]);

  const spotlight = useTransform(
    [springX, springY] as const,
    ([x, y]: number[]) => {
      const px = (x as number) * 100;
      const py = (y as number) * 100;
      return [
        `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 25%, transparent 65%)`,
        `radial-gradient(circle at ${100 - px}% ${100 - py}%, rgba(0,0,0,0.4) 0%, transparent 60%)`,
      ].join(",");
    },
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div style={{ perspective: 800 }} className="shrink-0">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          boxShadow: useTransform(
            [shadowX, shadowY] as const,
            ([x, y]: number[]) =>
              [
                `${(x as number)}px ${(y as number)}px 40px rgba(0,0,0,0.55)`,
                `${(x as number) * 0.5}px ${(y as number) * 0.5}px 80px rgba(0,0,0,0.35)`,
                `inset 0 0 60px rgba(0,0,0,0.3)`,
              ].join(","),
          ),
        }}
        initial={{ opacity: 0, x: 80, rotateY: 25 }}
        animate={{ opacity: 1, x: 0, rotateY: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-[230px] w-[360px] cursor-default overflow-hidden rounded-xl"
      >
        {/* Deep black base */}
        <div className="absolute inset-0 rounded-xl bg-[#030303]" />

        {/* Dark gradient for depth */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-black via-[#030303] to-[#050505]" />

        {/* Dynamic dual spotlight */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{ background: spotlight }}
        />

        {/* Specular edge reflection */}
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/[0.02] via-transparent to-black/30" />

        {/* Left edge subtle light */}
        <div className="pointer-events-none absolute inset-y-4 left-0 w-px bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />

        {/* ─── Surface wear: scratches & scuffs ─── */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-60"
          style={{
            backgroundImage: [
              "repeating-linear-gradient(72deg, transparent 0px, transparent 38px, rgba(255,255,255,0.012) 38px, rgba(255,255,255,0.012) 39px, transparent 39px, transparent 100px)",
              "repeating-linear-gradient(-38deg, transparent 0px, transparent 72px, rgba(255,255,255,0.007) 72px, rgba(255,255,255,0.007) 73px, transparent 73px, transparent 140px)",
              "repeating-linear-gradient(15deg, transparent 0px, transparent 120px, rgba(255,255,255,0.005) 120px, rgba(255,255,255,0.005) 121px, transparent 121px, transparent 200px)",
              "radial-gradient(ellipse 60% 40% at 75% 85%, rgba(255,255,255,0.015) 0%, transparent 100%)",
              "radial-gradient(ellipse 30% 50% at 20% 10%, rgba(255,255,255,0.01) 0%, transparent 100%)",
            ].join(","),
          }}
        />

        {/* Random isolated scratches */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
          viewBox="0 0 360 230"
          fill="none"
          preserveAspectRatio="none"
        >
          <line x1="45" y1="30" x2="62" y2="28" stroke="white" strokeWidth="0.5" opacity="0.15" />
          <line x1="140" y1="55" x2="170" y2="52" stroke="white" strokeWidth="0.3" opacity="0.1" />
          <line x1="280" y1="180" x2="310" y2="178" stroke="white" strokeWidth="0.4" opacity="0.12" />
          <line x1="20" y1="190" x2="55" y2="188" stroke="white" strokeWidth="0.3" opacity="0.08" />
          <line x1="300" y1="25" x2="320" y2="23" stroke="white" strokeWidth="0.5" opacity="0.1" />
          <line x1="190" y1="195" x2="215" y2="192" stroke="white" strokeWidth="0.3" opacity="0.09" />
          <line x1="250" y1="60" x2="265" y2="58" stroke="white" strokeWidth="0.4" opacity="0.07" />
          <line x1="80" y1="160" x2="110" y2="157" stroke="white" strokeWidth="0.3" opacity="0.11" />
          {/* Scuff mark */}
          <ellipse cx="310" cy="40" rx="12" ry="4" stroke="white" strokeWidth="0.3" opacity="0.06" fill="white" fillOpacity="0.04" />
          <ellipse cx="50" cy="120" rx="8" ry="3" stroke="white" strokeWidth="0.3" opacity="0.05" fill="white" fillOpacity="0.03" />
        </svg>

        {/* Corner wear */}
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent via-transparent to-white/[0.015]" />
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-bl from-transparent via-transparent to-white/[0.008]" />

        {/* Border */}
        <div className="pointer-events-none absolute inset-0 rounded-xl border border-white/[0.07]" />

        {/* Inner subtle border */}
        <div className="pointer-events-none absolute inset-[1px] rounded-xl border border-white/[0.02]" />

        {/* ─── Gold chip with wear and engraving ─── */}
        <div className="absolute left-[7px] top-[7px] z-20 flex items-center gap-2">
          <div className="relative h-9 w-12 overflow-hidden rounded-md border border-white/10">
            {/* Chip gold gradient base */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4A853]/55 via-[#C49B3C]/45 to-[#8B6F2E]/30" />
            {/* Inner shadow for depth */}
            <div className="absolute inset-0 shadow-[inset_0_1px_2px_rgba(255,255,255,0.06),inset_0_-1px_2px_rgba(0,0,0,0.2)]" />
            {/* Chip surface scratches */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: [
                  "repeating-linear-gradient(85deg, transparent 0px, transparent 8px, rgba(255,255,255,0.015) 8px, rgba(255,255,255,0.015) 8.5px, transparent 8.5px, transparent 20px)",
                  "repeating-linear-gradient(-25deg, transparent 0px, transparent 16px, rgba(0,0,0,0.02) 16px, rgba(0,0,0,0.02) 16.5px, transparent 16.5px, transparent 30px)",
                  "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.04) 40%, rgba(0,0,0,0.04) 42%, transparent 42%)",
                ].join(","),
              }}
            />
            {/* Engraved text on chip */}
            <span className="absolute left-1 top-1 font-mono text-[5px] font-semibold tracking-[0.1em] text-white/30">
              LN
            </span>
            <span className="absolute bottom-1 right-1 font-mono text-[4px] font-semibold tracking-[0.05em] text-white/20">
              01
            </span>
            {/* Decorative engraved lines */}
            <svg
              className="absolute inset-0 h-full w-full opacity-20"
              viewBox="0 0 48 36"
              fill="none"
              preserveAspectRatio="none"
            >
              <line x1="8" y1="18" x2="40" y2="18" stroke="white" strokeWidth="0.3" opacity="0.3" />
              <line x1="12" y1="22" x2="36" y2="22" stroke="white" strokeWidth="0.2" opacity="0.2" />
              <rect x="10" y="12" width="28" height="2" rx="1" stroke="white" strokeWidth="0.2" opacity="0.15" />
            </svg>
            {/* Gold wear — darker worn spots */}
            <div className="absolute bottom-0 left-0 h-3 w-3 rounded-br-md bg-gradient-to-tl from-black/15 to-transparent" />
            <div className="absolute right-0 top-0 h-2 w-2 rounded-tr-md bg-gradient-to-bl from-black/10 to-transparent" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center px-6 pt-5 pb-4">
          {/* Logo */}
          <div className="flex flex-col items-center">
            <div className="flex h-[88px] w-[88px] items-center justify-center overflow-hidden rounded-full border border-white/[0.06] bg-black/60 p-[5px] shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
              <Image
                src="/images/Low_Noise_Corporation_Logo.png"
                alt="Low Noise"
                width={88}
                height={88}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>

          {/* Company name and role */}
          <div className="mt-3 text-center">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-white">
              Low Noise
            </h2>
            <p className="mt-0.5 font-mono text-xs font-medium tracking-[0.25em] text-white/60 uppercase">
              Software Engineering
            </p>
          </div>

          {/* NFC indicator */}
          <div className="mt-4 flex w-full items-center justify-end">
            <div className="flex items-center gap-1">
              <span className="font-mono text-[6px] tracking-[0.3em] text-white/15 uppercase">
                NFC
              </span>
              <div className="h-1.5 w-1.5 rounded-full border border-white/10" />
            </div>
          </div>

          {/* Tagline with dividers */}
          <div className="mt-3 flex w-full items-center gap-4 px-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
            <span className="font-mono text-[9px] font-medium tracking-[0.2em] text-white/40 uppercase whitespace-nowrap">
              Precision · Clarity · Intention
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
          </div>

          {/* Bottom info */}
          <div className="mt-auto flex w-full items-center justify-between border-t border-white/[0.04] pt-3">
            <span className="font-mono text-[8px] tracking-[0.25em] text-white/20 uppercase">
              LN-DEV-2024
            </span>
            <span className="font-mono text-[8px] tracking-[0.15em] text-white/20 uppercase">
              Corporate ID
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center"
    >
      <div className="pointer-events-none absolute inset-0 bg-glow-accent" />

      <div className="relative z-10 flex flex-col items-center gap-10 px-6 lg:flex-row lg:gap-20">
        {/* Text block */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center lg:text-left"
        >
          <h1 className="font-heading text-6xl font-light tracking-tight text-text-primary sm:text-7xl md:text-8xl lg:text-9xl">
            Low Noise
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: 0.4,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto mt-6 max-w-lg text-base leading-relaxed tracking-wide text-text-tertiary md:text-lg lg:mx-0"
          >
            Software engineering.
            <br />
            Precision. Clarity. Intention.
          </motion.p>
        </motion.div>

        {/* PVC Corporate Card */}
        <PvcCard />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-12"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-text-quaternary uppercase">
          Scroll
        </span>
        <div className="mx-auto mt-3 h-16 w-px bg-gradient-to-b from-text-quaternary/80 to-transparent" />
      </motion.div>
    </section>
  );
}
