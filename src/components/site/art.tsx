import type { ReactNode } from "react";
import { AI_ART } from "@/lib/ai-art";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Halftone illustration per project (rendered in-house by art/halftone_art.py).
export const ART: Record<string, string> = {
  "TUI-OS_Arching": "tui-os", "N-Sharp": "n-sharp", lownoiseOS: "vega-os", Voxen: "voxen", sysTUI: "systui", FileTUI: "filetui",
  Low_Noise_BashPrompt: "prompt", LowNoise_Contact_Suite: "contact-suite", "ryoku-transit": "transit", AndroidDrop: "androiddrop",
  MusicPlayer: "music-player", CipherKey: "cipherkey", "Pretty-Chat": "pchat", NotesAppMobile: "misnotas", CheckMateTUI: "chess-tui",
  RetroTUIGames: "retrotui", Master_Chess: "master-chess", "Community-JavaRPG": "hollowforge", De_0_a_Java: "de-0-a-java", Exercism_Stack_Lenguages: "exercism",
};

// Projects that ship their own icon: it is used instead of an illustration (taken from the project's repository).
export const ICONS: Record<string, string> = {
  "ryoku-transit": "transit", MusicPlayer: "music-player", CipherKey: "cipherkey",
};

/** The project's picture: its own icon on black when it has one, otherwise the illustration. `eager` = no lazy loading. */
export function ProjectArt({ repo, width = 960, height = 720, lazy = true }: { repo: string; width?: number; height?: number; lazy?: boolean }): ReactNode {
  const icon = ICONS[repo];
  if (icon) {
    return (
      <span className="iconplate">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${BASE}/icons/${icon}.png`} alt="" loading={lazy ? "lazy" : undefined} decoding="async" />
      </span>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`${BASE}/art/${ART[repo]}.${AI_ART.includes(ART[repo]) ? "webp" : "png"}`} alt="" width={width} height={height} loading={lazy ? "lazy" : undefined} decoding="async" />;
}
