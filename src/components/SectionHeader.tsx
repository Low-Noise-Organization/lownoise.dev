interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle: string;
}

export function SectionHeader({
  number,
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      <span className="font-mono text-[10px] tracking-[0.25em] text-text-quaternary uppercase">
        {number}
      </span>
      <h2 className="font-heading mt-4 text-3xl font-light tracking-tight text-text-primary md:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-4 max-w-xl text-sm leading-relaxed tracking-wide text-text-tertiary md:text-base">
        {subtitle}
      </p>
    </div>
  );
}
