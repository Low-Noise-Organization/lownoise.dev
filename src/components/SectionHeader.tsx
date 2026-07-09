interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

export function SectionHeader({
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      <h2 className="font-heading text-3xl font-light tracking-tight text-text-primary md:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-4 max-w-xl text-sm leading-relaxed tracking-wide text-text-tertiary md:text-base">
        {subtitle}
      </p>
    </div>
  );
}
