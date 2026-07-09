import HeroBadge from "./HeroBadge";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative flex min-h-screen flex-col items-center justify-center pt-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-glow-accent" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <HeroBadge />
        <div className="animate-hero-fade">
          <h1 className="font-heading text-5xl font-light tracking-tight text-text-primary sm:text-6xl md:text-7xl lg:text-8xl">
            Low Noise
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed tracking-wide text-text-secondary md:text-lg">
            An independent software engineering studio.
            <br />
            Quiet, intentional, precise.
          </p>
        </div>
      </div>
    </section>
  );
}
