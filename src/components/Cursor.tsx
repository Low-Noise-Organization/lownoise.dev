"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const springX = useSpring(cursorX, { stiffness: 250, damping: 24 });
  const springY = useSpring(cursorY, { stiffness: 250, damping: 24 });

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    },
    [cursorX, cursorY],
  );

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const interactiveElements = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select",
    );

    const onEnter = () => {
      ring.style.width = "40px";
      ring.style.height = "40px";
      ring.style.borderColor = "rgba(74, 140, 255, 0.4)";
      ring.style.backgroundColor = "rgba(74, 140, 255, 0.04)";
      dot.style.backgroundColor = "rgba(74, 140, 255, 0.9)";
      dot.style.width = "5px";
      dot.style.height = "5px";
    };

    const onLeave = () => {
      ring.style.width = "28px";
      ring.style.height = "28px";
      ring.style.borderColor = "rgba(255, 255, 255, 0.1)";
      ring.style.backgroundColor = "transparent";
      dot.style.backgroundColor = "rgba(212, 168, 83, 0.8)";
      dot.style.width = "4px";
      dot.style.height = "4px";
    };

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[9999]">
      <motion.div
        ref={ringRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height] duration-200"
        style={{
          x: springX,
          y: springY,
          width: 28,
          height: 28,
          borderColor: "rgba(255, 255, 255, 0.1)",
          backgroundColor: "transparent",
        }}
      />
      <motion.div
        ref={dotRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height] duration-200"
        style={{
          x: cursorX,
          y: cursorY,
          width: 4,
          height: 4,
          backgroundColor: "rgba(212, 168, 83, 0.8)",
        }}
      />
    </div>
  );
}
