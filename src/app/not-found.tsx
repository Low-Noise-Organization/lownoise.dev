import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-bg-deep px-6">
      <div className="pointer-events-none absolute inset-0 bg-glow-accent" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <span
        className="pointer-events-none absolute select-none font-heading text-[180px] font-light leading-none tracking-tighter text-text-primary/[0.04] sm:text-[260px] md:text-[400px]"
        aria-hidden="true"
      >
        404
      </span>

      <div className="relative z-10 mb-10 w-36 opacity-25 md:w-48">
        <svg viewBox="0 0 200 16" className="w-full" aria-hidden="true">
          <path
            d="M 0,10 L 25,10 L 30,3 L 35,10 L 40,13 L 45,10 L 50,9 L 55,11 L 60,10 L 200,10"
            fill="none"
            stroke="var(--color-text-tertiary)"
            strokeWidth="0.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <p className="font-mono text-xs tracking-[0.3em] text-accent/60 uppercase">
          Error 404
        </p>

        <h1 className="font-heading mt-5 text-5xl font-light tracking-tight text-text-primary sm:text-6xl md:text-7xl">
          Signal lost.
        </h1>

        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-text-tertiary md:text-base">
          This page is experiencing radio silence. The noise floor is
          empty, the signal never arrived, and the bits are floating
          somewhere in the ether.
        </p>

        <p className="mt-3 text-sm leading-relaxed text-text-quaternary">
          Kind of like a segfault, but for URLs.
        </p>

        <Link
          href="/"
          className="panel-accent group mt-10 inline-flex items-center gap-3 rounded-lg px-6 py-3.5"
        >
          <span className="font-mono text-xs tracking-wider text-text-secondary transition-colors duration-200 group-hover:text-accent">
            ← Back to base
          </span>
        </Link>
      </div>

      <div className="pointer-events-none fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-deep to-transparent" />
    </div>
  );
}
