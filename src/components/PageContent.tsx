"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Cursor from "./Cursor";
import Navigation from "./Navigation";
import Hero from "./Hero";
import About from "./About";
import Studio from "./Studio";
import Projects from "./Projects";
import Technologies from "./Technologies";
import YouTubeSection from "./YouTube";
import Contact from "./Contact";
import Footer from "./Footer";

export default function PageContent() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <div className="min-h-screen">
      <Cursor />

      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-px origin-left bg-accent/60"
        style={{ scaleX }}
      />

      <div className="pointer-events-none fixed inset-0 z-0 bg-depth" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-glow-ambient" />
      <Navigation />

      <main className="relative z-10 mx-auto min-h-screen max-w-7xl px-6 sm:px-10 md:px-16">
        <Hero />

        <div className="hairline-accent my-12 md:my-16" />
        <About />

        <div className="hairline-accent my-12 md:my-16" />
        <Studio />

        <div className="hairline-accent my-12 md:my-16" />
        <Projects />

        <div className="hairline-accent my-12 md:my-16" />
        <Technologies />

        <div className="hairline-accent my-12 md:my-16" />
        <YouTubeSection />

        <div className="hairline-accent my-12 md:my-16" />
        <Contact />

        <Footer />
      </main>
    </div>
  );
}
