// 32x32 line pictograms, one per project (1.5 stroke, square joins, tinted by currentColor).
const G: Record<string, React.ReactNode> = {
  "TUI-OS_Arching": <><path d="M4 8h24M7 12h18M10 8v18M22 8v18M10 18h12" /></>,
  "N-Sharp": <><path d="M12 5l-2 22M22 5l-2 22M5 12h22M4 20h22" /></>,
  lownoiseOS: <><circle cx="16" cy="16" r="5" /><ellipse cx="16" cy="16" rx="13" ry="4.5" transform="rotate(-22 16 16)" /></>,
  Voxen: <><rect x="4" y="5" width="15" height="7" /><rect x="13" y="13" width="15" height="7" /><rect x="4" y="21" width="15" height="7" /><path d="M8 5v7M12 5v7M17 13v7M21 13v7M8 21v7M12 21v7" /></>,
  sysTUI: <><path d="M5 27V20M10 27V12M15 27V17M20 27V6M25 27V14M3 28h26" /></>,
  FileTUI: <><rect x="3" y="5" width="8" height="22" /><rect x="12" y="5" width="8" height="22" /><rect x="21" y="5" width="8" height="22" /><path d="M5 10h4M5 14h4M14 10h4M14 14h4M23 10h4M23 14h4" /></>,
  Low_Noise_BashPrompt: <><path d="M6 9l10 7-10 7M18 24h9" /></>,
  LowNoise_Contact_Suite: <><rect x="3" y="7" width="26" height="18" /><path d="M3 8l13 10L29 8" /></>,
  "ryoku-transit": <><rect x="5" y="6" width="22" height="18" rx="2" /><path d="M5 15h22M10 24v3M22 24v3" /><circle cx="10" cy="20" r="1.2" /><circle cx="22" cy="20" r="1.2" /></>,
  AndroidDrop: <><rect x="9" y="3" width="14" height="22" rx="2" /><path d="M16 11v9M12 17l4 4 4-4M9 28h14" /></>,
  MusicPlayer: <><circle cx="16" cy="16" r="12" /><circle cx="16" cy="16" r="6" /><circle cx="16" cy="16" r="1.4" /></>,
  CipherKey: <><circle cx="10" cy="10" r="5.5" /><path d="M14 14l13 13M21 21l3-3M25 25l3-3" /></>,
  "Pretty-Chat": <><path d="M4 5h18v12H12l-5 4v-4H4z" /><path d="M13 22h9l5 4v-4h2V12h-6" /></>,
  NotesAppMobile: <><rect x="8" y="4" width="19" height="24" /><path d="M3 9h6M3 15h6M3 21h6M13 10h9M13 15h9M13 20h6" /></>,
  CheckMateTUI: <><path d="M8 28h16M10 28V16h12v12M8 16h16M8 16V8h3v3h3V8h4v3h3V8h3v8" /></>,
  RetroTUIGames: <><rect x="3" y="11" width="26" height="14" rx="7" /><path d="M10 14.5v7M6.5 18h7" /><circle cx="21" cy="17" r="1.3" /><circle cx="25" cy="20" r="1.3" /></>,
  Master_Chess: <><path d="M16 3v7M13 6h6" /><path d="M10 28h12M11 28l1.5-9h7L21 28M12.5 19c0-5 2-7.5 3.500-7.500S19.500 14 19.500 19" /></>,
  "Community-JavaRPG": <><path d="M3 9h21c0 4-3 6-7 6h-6l-3-3" /><path d="M11 15v5h10v-5M8 25h16v3H8z" /></>,
  De_0_a_Java: <><path d="M5 12h18v8a6 6 0 0 1-6 6h-6a6 6 0 0 1-6-6z" /><path d="M23 14h3a3.500 3.500 0 0 1 0 7h-3M10 3c0 2.500 2.500 2.500 2.500 5M16 3c0 2.500 2.500 2.500 2.500 5" /></>,
  Exercism_Stack_Lenguages: <><path d="M3 16h26M7 10v12M11 7v18M25 10v12M21 7v18" /></>,
};

export default function ProjectIcon({ repo, className }: { repo: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">
      {G[repo] ?? <circle cx="16" cy="16" r="9" />}
    </svg>
  );
}
