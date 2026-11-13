"use client";

import { useMemo, useRef, useState } from "react";
import { ORG, projects, type Category } from "@/lib/projects";
import { T, type Lang } from "@/lib/content";
import { ArrowUpRight } from "../Icons";
import ProjectIcon from "../ProjectIcon";
import { SecHead } from "./Services";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const CATS: Category[] = ["systems", "apps", "tools", "games", "learning"];
export const ART: Record<string, string> = {
  "TUI-OS_Arching": "tui-os", "N-Sharp": "n-sharp", lownoiseOS: "vega-os", Voxen: "voxen", sysTUI: "systui", FileTUI: "filetui",
  Low_Noise_BashPrompt: "prompt", LowNoise_Contact_Suite: "contact-suite", "ryoku-transit": "transit", AndroidDrop: "androiddrop",
  MusicPlayer: "music-player", CipherKey: "cipherkey", "Pretty-Chat": "pchat", NotesAppMobile: "misnotas", CheckMateTUI: "chess-tui",
  RetroTUIGames: "retrotui", Master_Chess: "master-chess", "Community-JavaRPG": "hollowforge", De_0_a_Java: "de-0-a-java", Exercism_Stack_Lenguages: "exercism",
};
export const LANGS = Object.entries(
  projects.reduce<Record<string, number>>((a, p) => ((a[p.lang] = (a[p.lang] ?? 0) + 1), a), {}),
).sort((a, b) => b[1] - a[1]);
const pad = (n: number) => String(n).padStart(2, "0");

export default function Code({ lang }: { lang: Lang }) {
  const t = T[lang];
  const [cat, setCat] = useState<Category | "all">("all");
  const [lg, setLg] = useState("all");
  const [q, setQ] = useState("");
  const [peek, setPeek] = useState<string | null>(null);
  const peekEl = useRef<HTMLDivElement>(null);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return projects.filter(
      (p) => (cat === "all" || p.category === cat) && (lg === "all" || p.lang === lg) && (!needle || `${p.name} ${p.lang} ${p.en} ${p.es}`.toLowerCase().includes(needle)),
    );
  }, [cat, lg, q]);

  // The preview follows the mouse without re-rendering (mouse only; touch gets the plain list).
  const follow = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !peekEl.current) return;
    peekEl.current.style.transform = `translate3d(${e.clientX + 28}px, ${e.clientY - 110}px, 0)`;
  };

  return (
    <section id="code" className="sec sec-k">
      <div className="wrap">
        <SecHead n={4} label={t.code.title} />
        <p className="mono count">{pad(shown.length)} / {projects.length}</p>
        <div className="tools">
          <div className="chips" role="group" aria-label="Category">
            <button className="chip" aria-pressed={cat === "all"} onClick={() => setCat("all")}>{t.code.all}</button>
            {CATS.map((c) => (<button key={c} className="chip" aria-pressed={cat === c} onClick={() => setCat(c)}>{t.code.cat[c]}</button>))}
          </div>
          <input className="search" type="search" placeholder={t.code.search} aria-label={t.code.search} value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="chips langs" role="group" aria-label={t.code.langs}>
          {LANGS.map(([l, n]) => (<button key={l} className="chip" aria-pressed={lg === l} onClick={() => setLg(lg === l ? "all" : l)}>{l} <span>{n}</span></button>))}
        </div>
        {shown.length === 0 ? (
          <p className="empty">{t.code.none}</p>
        ) : (
          <ul className="list" onPointerMove={follow} onPointerLeave={() => setPeek(null)}>
            {shown.map((p, i) => (
              <li key={p.repo}>
                <a className="row" href={`https://github.com/${ORG}/${p.repo}`}
                  onPointerEnter={(e) => { if (e.pointerType === "mouse") setPeek(p.repo); }}
                  onFocus={() => setPeek(null)}>
                  <span className="mono idx">{pad(i + 1)}</span>
                  <span className="nm"><ProjectIcon repo={p.repo} className="pico" />{p.name}</span>
                  <span className="ds">{p[lang]}</span>
                  <span className="meta mono"><i>{p.lang}</i><i>{t.code.cat[p.category]}</i><i className={`st ${p.status}`}>{t.code.status[p.status]}</i></span>
                  <ArrowUpRight className="ic go" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="peek" ref={peekEl} data-on={peek ? "1" : "0"} aria-hidden="true">
        {peek && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={`${BASE}/art/${ART[peek]}.png`} alt="" width={960} height={720} />
        )}
      </div>
    </section>
  );
}
