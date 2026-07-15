"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { asset } from "@/lib/assets";

const LANYARD_COLORS = ["#f38ba8", "#89b4fa", "#a6e3a1", "#f9e2af", "#cba6f7"];
const lanyardColor = LANYARD_COLORS[0];

const cordPath = {
  initial: "M60,0 Q60,15 60,30 Q60,45 55,55 Q50,65 60,75 Q70,85 60,95",
  swing1: "M60,0 Q65,15 58,30 Q52,45 60,55 Q68,65 55,75 Q48,85 60,95",
  swing2: "M60,0 Q55,15 62,30 Q68,45 60,55 Q52,65 65,75 Q72,85 60,95",
};

export default function PVCCard() {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(mouseX, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const card = document.getElementById("pvc-card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      mouseX.set(dx / 20);
      mouseY.set(-dy / 20);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const cardVariants = [
    { x: 0, y: 0, rotate: 0 },
    { x: 2, y: -3, rotate: 1 },
    { x: -1, y: 2, rotate: -0.5 },
    { x: -2, y: -1, rotate: -0.8 },
    { x: 1, y: 3, rotate: 0.5 },
  ];

  const [idlePose, setIdlePose] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdlePose((prev) => (prev + 1) % cardVariants.length);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="pvc-card"
      className="relative mx-auto flex w-[340px] flex-col items-center sm:w-[400px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{ perspective: "1000px" }}
    >
      {/* Cord / Lanyard */}
      <div className="relative z-0 h-20 w-full overflow-visible">
        <motion.svg
          viewBox="0 0 120 100"
          className="absolute left-1/2 -top-2 h-28 w-28 -translate-x-1/2"
          fill="none"
          animate={isHovered ? "swing1" : "initial"}
          variants={{
            initial: { rotate: 0, x: 0 },
            swing1: { rotate: [0, 4, -3, 2, -1, 0], x: [0, 3, -2, 1, -1, 0] },
          }}
          transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
        >
          <motion.path
            d="M60,0 Q60,15 58,30 Q56,45 60,55 Q64,65 58,75 Q52,85 60,95"
            stroke={lanyardColor}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            animate={
              isHovered
                ? {
                    d: [
                      "M60,0 Q60,15 58,30 Q56,45 60,55 Q64,65 58,75 Q52,85 60,95",
                      "M60,0 Q64,15 56,30 Q52,45 62,55 Q68,65 54,75 Q48,85 60,95",
                      "M60,0 Q56,15 62,30 Q66,45 58,55 Q52,65 64,75 Q70,85 60,95",
                    ],
                  }
                : {
                    d: [
                      "M60,0 Q60,15 58,30 Q56,45 60,55 Q64,65 58,75 Q52,85 60,95",
                      "M60,0 Q62,14 57,29 Q53,44 61,55 Q67,65 56,76 Q50,86 60,95",
                    ],
                  }
            }
            transition={{
              duration: isHovered ? 0.8 : 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Clip at top */}
          <rect x="54" y="0" width="12" height="6" rx="1" fill={lanyardColor} opacity="0.8" />
          <rect x="56" y="1" width="8" height="4" rx="1" fill={lanyardColor} opacity="0.5" />
        </motion.svg>
      </div>

      {/* PVC Card */}
      <motion.div
        className="relative z-10 w-full cursor-default"
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        animate={
          !isHovered
            ? {
                x: cardVariants[idlePose].x,
                y: cardVariants[idlePose].y,
                rotate: cardVariants[idlePose].rotate,
              }
            : {}
        }
        transition={
          !isHovered
            ? { duration: 0.8, ease: "easeInOut" }
            : {}
        }
      >
        {/* Card glow */}
        <div
          className="absolute -inset-1 rounded-sm opacity-40 blur-md transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${lanyardColor}44, #89b4fa44, #cba6f744)`,
          }}
        />

        {/* Card body */}
        <div
          className="relative overflow-hidden rounded-sm"
          style={{
            border: "2px solid var(--color-border-light)",
            background: "linear-gradient(160deg, #1e1e2e 0%, #181825 50%, #11111b 100%)",
            boxShadow:
              "0 2px 0 #313244, 0 4px 0 #45475a, 0 6px 0 #585b70, 0 8px 12px rgba(0,0,0,0.4)",
          }}
        >
          {/* Card lanyard hole */}
          <div className="absolute top-4 left-1/2 z-20 h-4 w-4 -translate-x-1/2 rounded-full"
            style={{
              border: "3px solid var(--color-surface1)",
              background: "var(--color-crust)",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.5)",
            }}
          />
          <div className="absolute top-4 left-1/2 z-10 h-6 w-6 -translate-x-1/2 rounded-full"
            style={{
              border: "1px solid var(--color-surface0)",
              background: "transparent",
            }}
          />

          {/* Card shine overlay */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)",
            }}
          />

          <div className="relative z-0 p-5 pt-8">
            {/* Top section: Photo + Name */}
            <div className="flex items-start gap-4">
              {/* Photo */}
              <div
                className="relative h-16 w-16 shrink-0 overflow-hidden"
                style={{
                  border: "2px solid var(--color-surface1)",
                  boxShadow: "inset -2px -2px 0 0 var(--color-surface0), inset 2px 2px 0 0 var(--color-overlay1)",
                }}
              >
                <Image
                  src={asset("/assets/FotoPerfil.png")}
                  alt="Profile"
                  fill
                  sizes="64px"
                  className="object-cover"
                  style={{ imageRendering: "pixelated" }}
                />
              </div>

              {/* Name + Title */}
              <div className="flex-1 min-w-0">
                <h2
                  className="text-[10px] leading-tight"
                  style={{
                    color: "var(--color-text)",
                    textShadow: "2px 2px 0 rgba(0,0,0,0.3)",
                  }}
                >
                  ADRIAN VELASCO
                </h2>
                <p
                  className="mt-1 text-[7px] leading-tight"
                  style={{ color: "var(--color-overlay1)" }}
                >
                  SOFTWARE ENGINEERING
                </p>

                {/* ID-like line */}
                <div
                  className="mt-2 h-px w-full"
                  style={{
                    background: "repeating-linear-gradient(90deg, var(--color-surface1) 0px, var(--color-surface1) 3px, transparent 3px, transparent 6px)",
                  }}
                />

                <p
                  className="mt-1.5 text-[6px] tracking-wider"
                  style={{ color: "var(--color-overlay0)" }}
                >
                  ID: LN-2026-001
                </p>
              </div>
            </div>

            {/* Branding */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <div
                className="h-px flex-1"
                style={{
                  background: "repeating-linear-gradient(90deg, var(--color-surface1) 0px, var(--color-surface1) 2px, transparent 2px, transparent 4px)",
                }}
              />
              <span
                className="text-xs tracking-[0.3em]"
                style={{
                  color: "var(--color-accent)",
                  textShadow: "0 0 8px rgba(137, 180, 250, 0.3)",
                  fontFamily: "var(--font-pixel), monospace",
                }}
              >
                LOW NOISE
              </span>
              <div
                className="h-px flex-1"
                style={{
                  background: "repeating-linear-gradient(90deg, var(--color-surface1) 0px, var(--color-surface1) 2px, transparent 2px, transparent 4px)",
                }}
              />
            </div>

            {/* Motto */}
            <p
              className="mt-2 text-center text-[7px] leading-tight"
              style={{ color: "var(--color-overlay0)" }}
            >
              QUIET · INTENTIONAL · PRECISE
            </p>

            {/* Social Links */}
            <div className="mt-4 flex justify-center gap-3">
              {[
                { label: "GH", href: "https://github.com/Low-Noise-Organization" },
                { label: "LI", href: "https://www.linkedin.com/in/adrian-velasco-manas/" },
                { label: "YT", href: "https://www.youtube.com/@Low_Noise-n4e" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 text-[7px] tracking-wider uppercase transition-all duration-100"
                  style={{
                    border: "1px solid var(--color-surface1)",
                    color: "var(--color-overlay1)",
                    boxShadow: "inset -1px -1px 0 0 var(--color-surface0), inset 1px 1px 0 0 var(--color-overlay1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-accent)";
                    e.currentTarget.style.borderColor = "var(--color-accent-border)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--color-overlay1)";
                    e.currentTarget.style.borderColor = "var(--color-surface1)";
                  }}
                >
                  [{s.label}]
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
