export default function Footer() {
  return (
    <footer className="relative border-t border-border py-16 md:py-20">
      <div className="flex flex-col items-center gap-6 text-center">
        <p className="font-heading text-xl font-light tracking-tight text-text-primary">
          Low Noise
        </p>
        <p className="text-sm tracking-wide text-text-quaternary">
          Crafted with intention.
        </p>
        <div className="flex items-center gap-4 font-mono text-[10px] tracking-wider text-text-quaternary/60 uppercase">
          <a
            href="https://github.com/Low-Noise-Studio"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 hover:text-text-tertiary"
          >
            GitHub
          </a>
          <span className="h-3 w-px bg-border" />
          <a
            href="https://youtube.com/@LowNoiseStudio"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 hover:text-text-tertiary"
          >
            YouTube
          </a>
          <span className="h-3 w-px bg-border" />
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
