export default function Footer() {
  return (
    <footer className="relative border-t border-border py-12 md:py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 text-center sm:px-10 md:px-16">
        <div>
          <p className="font-heading text-lg font-light tracking-tight text-text-primary">
            Low Noise
          </p>
          <p className="mt-1 text-sm tracking-wide text-text-quaternary">
            Independent software engineering studio.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-xs tracking-wider text-text-quaternary/60 uppercase">
          <a
            href="https://github.com/Low-Noise-Organization"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 hover:text-text-tertiary"
          >
            GitHub
          </a>
          <a
            href="https://www.youtube.com/@Low_Noise-n4e"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 hover:text-text-tertiary"
          >
            YouTube
          </a>
          <a
            href="https://www.linkedin.com/in/adrian-velasco-manas/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 hover:text-text-tertiary"
          >
            LinkedIn
          </a>
          <a
            href="#hero"
            className="transition-colors duration-200 hover:text-text-tertiary"
          >
            Back to top ↑
          </a>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>

        <p className="max-w-md text-xs leading-relaxed text-text-quaternary/40 transition-all duration-300 hover:text-text-quaternary/70">
          Built with Java, Rust, Kotlin, and the occasional Bash one-liner.
          Open source by default. No AI was asked to write this footer.
        </p>
      </div>
    </footer>
  );
}
