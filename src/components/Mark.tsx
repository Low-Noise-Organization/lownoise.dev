// Low Noise mark: a waveform that settles into a flat line ("less noise").
export default function Mark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">
      <path d="M2 14L5 6L8 22L11 10L14 18L16.5 14H26" />
    </svg>
  );
}
