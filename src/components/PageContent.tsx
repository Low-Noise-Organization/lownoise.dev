import ScrollProgress from "./ScrollProgress";
import BackToTop from "./BackToTop";
import Hero from "./Hero";
import About from "./About";
import Projects from "./Projects";
import Technologies from "./Technologies";
import YouTubeSection from "./YouTube";
import Contact from "./Contact";

export default function PageContent() {
  return (
    <>
      <ScrollProgress />

      <div className="pointer-events-none fixed inset-0 -z-10 bg-depth" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grid-pixel" />

      <div className="relative z-10 mx-auto min-h-screen max-w-7xl px-6 sm:px-10 md:px-16">
        <Hero />

        <div className="hairline-accent my-12 md:my-16" />
        <About />

        <div className="hairline-accent my-12 md:my-16" />
        <Projects />

        <div className="hairline-accent my-12 md:my-16" />
        <Technologies />

        <div className="hairline-accent my-12 md:my-16" />
        <YouTubeSection />

        <div className="hairline-accent my-12 md:my-16" />
        <Contact />
      </div>

      <BackToTop />
    </>
  );
}
