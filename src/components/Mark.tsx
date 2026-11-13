// Low Noise mark: a ring (the sphere) crossed by a waveform that starts out noisy and leaves as a straight line ("less noise").
export default function Mark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">
      <circle cx="16" cy="16" r="13.2" />
      <path d="M6 16L8.6 8L11.6 23.6L14.2 11L16.6 19.4L18.6 14L20.2 16H31" />
    </svg>
  );
}
