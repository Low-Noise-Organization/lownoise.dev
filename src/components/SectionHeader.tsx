interface SectionHeaderProps {
  title: string | React.ReactNode;
  subtitle: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      <div className="pixel-card inline-block px-4 py-2 mb-4">
        <span className="text-[12px]" style={{ color: "var(--color-mauve)" }}>
          ◆ SECTION ◆
        </span>
      </div>
      <h2
        className="text-2xl leading-tight tracking-tight sm:text-3xl md:text-4xl"
        style={{
          color: "var(--color-text)",
          textShadow: "2px 2px 0 rgba(0,0,0,0.3)",
          letterSpacing: "0.05em",
        }}
      >
        {title}
      </h2>
      <div
        className="mt-3 h-1.5 w-16"
        style={{
          background: "repeating-linear-gradient(90deg, var(--color-accent) 0px, var(--color-accent) 4px, transparent 4px, transparent 8px)",
        }}
      />
      <p className="mt-3 text-[13px] leading-relaxed max-w-xl" style={{ color: "var(--color-overlay1)" }}>
        {subtitle}
      </p>
    </div>
  );
}
