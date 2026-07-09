const tickPositions = Array.from({ length: 8 }, (_, i) => {
  const angle = (i * 45 * Math.PI) / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x1: 60 + 52 * cos,
    y1: 60 + 52 * sin,
    x2: 60 + 55.5 * cos,
    y2: 60 + 55.5 * sin,
    major: i % 2 === 0,
  };
});

const dotPositions = [45, 135, 225, 315].map((angle) => {
  const rad = (angle * Math.PI) / 180;
  return {
    x: 60 + 52 * Math.cos(rad),
    y: 60 + 52 * Math.sin(rad),
  };
});

const sinePath =
  "M 12,60 C 20.74,52 27.26,52 36,60 C 44.74,68 51.26,68 60,60 C 68.74,52 75.26,52 84,60 C 92.74,68 99.26,68 108,60";

export default function HeroBadge() {
  return (
    <div className="animate-badge-in mb-10 flex items-center justify-center">
      <svg
        viewBox="0 0 120 120"
        className="h-44 w-44 md:h-72 md:w-72"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="wave-fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0" />
            <stop offset="25%" stopColor="var(--color-accent)" stopOpacity="0.35" />
            <stop offset="50%" stopColor="var(--color-accent)" stopOpacity="0.8" />
            <stop offset="75%" stopColor="var(--color-accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <circle
          cx="60" cy="60" r="52"
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="0.4"
        />

        <circle
          cx="60" cy="60" r="47"
          fill="none"
          stroke="var(--color-border-light)"
          strokeWidth="0.3"
          className="opacity-40"
        />

        {tickPositions.map((t, i) => (
          <line
            key={i}
            x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
            stroke={t.major ? "var(--color-border-light)" : "var(--color-border)"}
            strokeWidth={t.major ? 0.6 : 0.3}
          />
        ))}

        {dotPositions.map((d, i) => (
          <circle
            key={i}
            cx={d.x} cy={d.y} r="1.2"
            fill="var(--color-accent)"
            className="opacity-40"
          />
        ))}

        <path
          d={sinePath}
          fill="none"
          stroke="url(#wave-fade)"
          strokeWidth="1.2"
          strokeLinecap="round"
          className="animate-wave-glow"
        />

        <circle r="3" fill="var(--color-accent)" className="opacity-20">
          <animateMotion dur="4s" repeatCount="indefinite" path={sinePath} />
        </circle>

        <circle r="1.5" fill="var(--color-accent)" className="opacity-85">
          <animateMotion dur="4s" repeatCount="indefinite" path={sinePath} />
        </circle>

        <text
          x="60" y="51"
          textAnchor="middle"
          dominantBaseline="central"
          className="font-heading tracking-widest"
          style={{ fill: "var(--color-text-primary)", fontSize: "22px", fontWeight: 300 }}
        >
          LN
        </text>

        <text
          x="60" y="71"
          textAnchor="middle"
          dominantBaseline="central"
          className="font-mono"
          style={{
            fill: "var(--color-text-tertiary)",
            fontSize: "4.5px",
            letterSpacing: "0.35em",
            opacity: 0.6,
          }}
        >
          ENGINEERING · STUDIO
        </text>
      </svg>
    </div>
  );
}
