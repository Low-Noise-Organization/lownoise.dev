"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { ORG, projects, type Category } from "@/lib/projects";
import { FORMSPREE_ID, T, WA_MAX_PER_DAY, WA_MIN_CHARS, WA_MIN_GAP_MS, WHATSAPP_PHONE, contactEmail, type Lang } from "@/lib/content";
import { ArrowRight, ArrowUpRight } from "./Icons";
import Mark from "./Mark";
import ProjectIcon from "./ProjectIcon";
import { useCount, useScrollSpy, useSeen } from "./hooks";

const CATS: Category[] = ["systems", "apps", "tools", "games", "learning"];
const SECTIONS = ["services", "process", "work", "code", "contact"] as const;
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Image per project (rendered in-house by art/halftone_art.py).
const ART: Record<string, string> = {
  "TUI-OS_Arching": "tui-os", "N-Sharp": "n-sharp", lownoiseOS: "vega-os", Voxen: "voxen", sysTUI: "systui", FileTUI: "filetui",
  Low_Noise_BashPrompt: "prompt", LowNoise_Contact_Suite: "contact-suite", "ryoku-transit": "transit", AndroidDrop: "androiddrop",
  MusicPlayer: "music-player", CipherKey: "cipherkey", "Pretty-Chat": "pchat", NotesAppMobile: "misnotas", CheckMateTUI: "chess-tui",
  RetroTUIGames: "retrotui", Master_Chess: "master-chess", "Community-JavaRPG": "hollowforge", De_0_a_Java: "de-0-a-java", Exercism_Stack_Lenguages: "exercism",
};
const art = (repo: string) => `${BASE}/art/${ART[repo]}.png`;

// Real numbers, computed from the project list.
const LANGS = Object.entries(
  projects.reduce<Record<string, number>>((a, p) => ((a[p.lang] = (a[p.lang] ?? 0) + 1), a), {}),
).sort((a, b) => b[1] - a[1]);
const ACTIVE = projects.filter((p) => p.status === "active").length;
const pad = (n: number) => String(n).padStart(2, "0");

function store(key: string, value?: string): string | null {
  try {
    if (value !== undefined) localStorage.setItem(key, value);
    return value ?? localStorage.getItem(key);
  } catch {
    return value ?? null;
  }
}

// Language lives outside React (localStorage / <html>), so read it as an external store.
const listeners = new Set<() => void>();
const subscribe = (fn: () => void) => { listeners.add(fn); return () => { listeners.delete(fn); }; };
const notify = () => listeners.forEach((fn) => fn());

const getLang = (): Lang => {
  const l = store("ln-lang");
  if (l === "es" || l === "en") return l;
  return navigator.language.startsWith("es") ? "es" : "en";
};
const getSent = () => new URLSearchParams(location.search).get("sent") === "1";
const getOrigin = () => location.origin;

function Stat({ n, label, go }: { n: number; label: string; go: boolean }) {
  const v = useCount(n, go);
  return (
    <div className="stat">
      <b aria-label={String(n)}>{v}</b>
      <span>{label}</span>
    </div>
  );
}

function SecHead({ n, label }: { n: number; label: string }) {
  return <p className="sh mono">{pad(n)} / {label.toUpperCase()}</p>;
}

export default function Site() {
  const lang = useSyncExternalStore(subscribe, getLang, () => "en" as Lang);
  const [cat, setCat] = useState<Category | "all">("all");
  const [lg, setLg] = useState("all");
  const [q, setQ] = useState("");
  const [typeIdx, setTypeIdx] = useState(0);
  const [whenIdx, setWhenIdx] = useState(0);
  const [about, setAbout] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [replyTo, setReplyTo] = useState("");
  const sentOk = useSyncExternalStore(subscribe, getSent, () => false);
  const origin = useSyncExternalStore(subscribe, getOrigin, () => "");
  const [waMsg, setWaMsg] = useState("");
  const [loadedAt] = useState(() => Date.now());
  const { active, progress } = useScrollSpy([...SECTIONS]);
  const [statsRef, statsSeen] = useSeen<HTMLDivElement>(0.4);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = T[lang];
  const email = contactEmail();
  const pickLang = (l: Lang) => { store("ln-lang", l); notify(); };

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return projects.filter(
      (p) =>
        (cat === "all" || p.category === cat) &&
        (lg === "all" || p.lang === lg) &&
        (!needle || `${p.name} ${p.lang} ${p.en} ${p.es}`.toLowerCase().includes(needle)),
    );
  }, [cat, lg, q]);

  const send = (e: React.FormEvent<HTMLFormElement>) => {
    const c = t.contact;
    const emailOk = !FORMSPREE_ID || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyTo.trim());
    const hp = (e.currentTarget.elements.namedItem("_gotcha") as HTMLInputElement | null)?.value;
    if (!about.trim() || !emailOk || hp) {
      e.preventDefault();
      if (!hp) setShowErr(true);
      return;
    }
    setShowErr(false);
    if (FORMSPREE_ID) return; // native POST to Formspree: it shows its own reCAPTCHA, then redirects back here
    e.preventDefault();
    const body = `${c.lines.type}: ${c.types[typeIdx]}\n${c.lines.when}: ${c.whens[whenIdx]}\n\n${c.lines.about}:\n${about.trim()}\n`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Low Noise — ${c.subject}`)}&body=${encodeURIComponent(body)}`;
  };

  const sendWhatsApp = () => {
    const c = t.contact;
    const text = about.trim();
    if (text.length < WA_MIN_CHARS) { setWaMsg(c.waShort); return; }
    const now = Date.now();
    if (now - loadedAt < 3000) return; // too fast to be a person reading the form
    let sent: number[] = [];
    try { sent = (JSON.parse(localStorage.getItem("ln-wa") ?? "[]") as number[]).filter((x) => now - x < 86_400_000); } catch {}
    if (sent.length >= WA_MAX_PER_DAY) { setWaMsg(c.waDaily); return; }
    if (sent.length && now - sent[sent.length - 1] < WA_MIN_GAP_MS) { setWaMsg(c.waWait); return; }
    try { localStorage.setItem("ln-wa", JSON.stringify([...sent, now])); } catch {}
    setWaMsg("");
    const msg = `Low Noise — ${c.subject}\n${c.lines.type}: ${c.types[typeIdx]}\n${c.lines.when}: ${c.whens[whenIdx]}\n\n${text}`;
    // The number is not in the HTML, but it is in the JS bundle: anyone who reads the code can get it.
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const caseArt = ["transit", "voxen", "tui-os"];
  const dossier = [
    [t.dossier.studio, "Low Noise"],
    [t.dossier.focus, "Backend / Android / Rust / Web"],
    [t.dossier.open, `${projects.length} ${t.dossier.projects}`],
    [t.dossier.langs, "EN / ES"],
  ];

  return (
    <>
      <a className="skip" href="#main">{t.skip}</a>
      <header className="top">
        <div className="wrap">
          <a className="brand" href="#top"><Mark className="mark" />Low Noise</a>
          <nav className="menu" aria-label="Main">
            {SECTIONS.map((id) => (
              <a key={id} className="hide-sm" href={`#${id}`} aria-current={active === id ? "true" : undefined}>{t.nav[id]}</a>
            ))}
          </nav>
          <div className="top-end">
            <div className="toggle" role="group" aria-label="Language">
              {(["en", "es"] as const).map((l) => (
                <button key={l} aria-pressed={lang === l} onClick={() => pickLang(l)}>{l.toUpperCase()}</button>
              ))}
            </div>
            <a className="pill hide-sm" href="#contact">{t.hero.cta}</a>
          </div>
        </div>
        <i className="progress" aria-hidden="true" style={{ transform: `scaleX(${progress})` }} />
      </header>

      <main id="main">
        <div className="hero" id="top">
          <div className="hero-art" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${BASE}/art/hero.png`} alt="" width={1600} height={900} fetchPriority="high" />
          </div>
          <div className="wrap hero-in">
            <p className="mono eyebrow">{t.hero.kicker.replace(" // ", " / ").toUpperCase()}</p>
            <h1 className="title">{t.hero.title}</h1>
            <p className="lead">{t.hero.lead}</p>
            <div className="cta">
              <a className="pill solid" href="#contact">{t.hero.cta}<ArrowRight className="ic" /></a>
              <a className="pill" href="#work">{t.hero.secondary}</a>
            </div>
            <dl className="dossier">
              {dossier.map(([k, v]) => (
                <div key={k}><dt className="mono">{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          </div>
        </div>

        <div className="stats" ref={statsRef}>
          <div className="wrap">
            <Stat n={projects.length} label={t.stats.projects} go={statsSeen} />
            <Stat n={LANGS.length} label={t.stats.languages} go={statsSeen} />
            <Stat n={CATS.length} label={t.stats.areas} go={statsSeen} />
            <Stat n={ACTIVE} label={t.stats.active} go={statsSeen} />
          </div>
        </div>

        <section id="services">
          <div className="wrap">
            <SecHead n={1} label={t.services.title} />
            <h2 className="h2">{t.services.title}.</h2>
            <p className="dim sec-lead">{t.services.lead}</p>
            <div className="svcs">
              {t.services.items.map((s, i) => (
                <article className="svc" key={s.name}>
                  <span className="mono num">S{i + 1}</span>
                  <h3>{s.name}</h3>
                  <p className="dim">{s.body}</p>
                  <div className="svc-side">
                    <ul className="stack mono">{s.stack.split(" · ").map((x) => <li key={x}>{x}</li>)}</ul>
                    <a className="ask mono" href="#contact" onClick={() => setTypeIdx(i)}>{t.services.ask}<ArrowUpRight className="ic" /></a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="process">
          <div className="wrap">
            <SecHead n={2} label={t.process.title} />
            <h2 className="h2">{t.process.title}.</h2>
            <ol className="steps">
              {t.process.steps.map(([title, body], i) => (
                <li key={title}>
                  <span className="big" aria-hidden="true">{pad(i + 1)}</span>
                  <h3>{title}</h3>
                  <p className="dim">{body}</p>
                </li>
              ))}
            </ol>
            <p className="promise">{t.process.promise}</p>
          </div>
        </section>

        <section id="work">
          <div className="wrap">
            <SecHead n={3} label={t.work.title} />
            <h2 className="h2">{t.work.title}.</h2>
            <p className="dim sec-lead">{t.work.note}</p>
            <div className="cases">
              {t.work.cases.map((c, i) => (
                <article className={`case${i % 2 ? " flip" : ""}`} key={c.repo}>
                  <a className="plate" href={`https://github.com/${ORG}/${c.repo}`} tabIndex={-1} aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${BASE}/art/${caseArt[i]}.png`} alt="" width={960} height={720} loading="lazy" decoding="async" />
                    <span className="cap mono">{pad(i + 1)} / {c.name.toUpperCase()}</span>
                  </a>
                  <div className="case-body">
                    <p className="mono muted">{c.kind.toUpperCase()}</p>
                    <h3>{c.name}</h3>
                    <dl>
                      <dt className="mono">{t.work.labels.problem}</dt><dd>{c.problem}</dd>
                      <dt className="mono">{t.work.labels.decision}</dt><dd>{c.decision}</dd>
                      <dt className="mono">{t.work.labels.status}</dt><dd>{c.status}</dd>
                    </dl>
                    <a className="ask mono" href={`https://github.com/${ORG}/${c.repo}`}>{t.work.view}<ArrowUpRight className="ic" /></a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="code">
          <div className="wrap">
            <SecHead n={4} label={t.code.title} />
            <h2 className="h2">{t.code.title}.</h2>
            <p className="mono muted count">{pad(shown.length)} / {projects.length}</p>
            <div className="tools">
              <div className="chips" role="group" aria-label="Category">
                <button className="chip" aria-pressed={cat === "all"} onClick={() => setCat("all")}>{t.code.all}</button>
                {CATS.map((c) => (
                  <button key={c} className="chip" aria-pressed={cat === c} onClick={() => setCat(c)}>{t.code.cat[c]}</button>
                ))}
              </div>
              <input className="search" type="search" placeholder={t.code.search} aria-label={t.code.search} value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <div className="chips langs" role="group" aria-label={t.code.langs}>
              {LANGS.map(([l, n]) => (
                <button key={l} className="chip" aria-pressed={lg === l} onClick={() => setLg(lg === l ? "all" : l)}>{l} <span>{n}</span></button>
              ))}
            </div>
            {shown.length === 0 ? (
              <p className="empty">{t.code.none}</p>
            ) : (
              <div className="gallery">
                {shown.map((p, i) => (
                  <a className="card" key={p.repo} href={`https://github.com/${ORG}/${p.repo}`}>
                    <div className="shot">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={art(p.repo)} alt="" width={960} height={720} loading="lazy" decoding="async" />
                      <ProjectIcon repo={p.repo} className="pico" />
                      <span className="cap mono">{pad(i + 1)} / {p.name.toUpperCase()}</span>
                    </div>
                    <div className="card-body">
                      <h3><span>{p.name}</span><ArrowUpRight className="ic go" /></h3>
                      <p>{p[lang]}</p>
                      <div className="meta mono">
                        <span>{p.lang}</span>
                        <span>{t.code.cat[p.category]}</span>
                        <span className={`st ${p.status}`}>{t.code.status[p.status]}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="contact">
          <div className="wrap contact-grid">
            <div className="contact-side">
              <SecHead n={5} label={t.contact.title} />
              <h2 className="h2">{t.contact.title}.</h2>
              <p className="dim" style={{ maxWidth: "46ch", marginTop: 16 }}>{t.contact.lead}</p>
              <ul className="expect">{t.contact.expect.map((x) => <li key={x}>{x}</li>)}</ul>
              <h3 className="mono ch-title">{t.contact.channelsTitle.toUpperCase()}</h3>
              <ul className="channels">
                {t.contact.channels.map(([name, body, kind]) => {
                  const href = {
                    mail: `mailto:${email}`,
                    issues: `https://github.com/${ORG}/.github/issues`,
                    security: `https://github.com/${ORG}/.github/blob/main/SECURITY.md`,
                    youtube: "https://www.youtube.com/@Low_Noise-n4e",
                  }[kind];
                  return (
                    <li key={kind}>
                      <a href={href}><span className="mono">{name.toUpperCase()}</span><i aria-hidden="true" />{kind === "mail" ? <span className="addr">{email}</span> : <ArrowUpRight className="ic" />}</a>
                      <p className="dim">{body}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="contact-form">
              <form className="brief" onSubmit={send} noValidate
                {...(FORMSPREE_ID ? { action: `https://formspree.io/f/${FORMSPREE_ID}`, method: "POST" } : {})}>
                {FORMSPREE_ID && (
                  <>
                    <input type="hidden" name="tipo" value={t.contact.types[typeIdx]} />
                    <input type="hidden" name="plazo" value={t.contact.whens[whenIdx]} />
                    <input type="hidden" name="_subject" value={`Low Noise — ${t.contact.subject}`} />
                    <input type="hidden" name="_next" value={`${origin}${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/?sent=1`} />
                  </>
                )}
                <div className="field">
                  <label className="mono" htmlFor="f-type">{t.contact.type}</label>
                  <select id="f-type" value={typeIdx} onChange={(e) => setTypeIdx(Number(e.target.value))}>
                    {t.contact.types.map((x, i) => <option key={x} value={i}>{x}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label className="mono" htmlFor="f-when">{t.contact.when}</label>
                  <select id="f-when" value={whenIdx} onChange={(e) => setWhenIdx(Number(e.target.value))}>
                    {t.contact.whens.map((x, i) => <option key={x} value={i}>{x}</option>)}
                  </select>
                </div>
                {FORMSPREE_ID && (
                  <div className="field wide">
                    <label className="mono" htmlFor="f-email">{t.contact.email}</label>
                    <input id="f-email" name="email" type="email" autoComplete="email" value={replyTo}
                      aria-invalid={showErr && !emailRe.test(replyTo.trim())}
                      onChange={(e) => setReplyTo(e.target.value)} />
                    <p className="hint">{t.contact.emailHint}</p>
                    {showErr && !emailRe.test(replyTo.trim()) && <p className="msg" role="alert">✕ {t.contact.emailInvalid}</p>}
                  </div>
                )}
                <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" />
                <div className="field wide">
                  <label className="mono" htmlFor="f-about">{t.contact.about}</label>
                  <textarea id="f-about" name="mensaje" rows={5} value={about} placeholder={t.contact.aboutHint}
                    aria-invalid={showErr} aria-describedby={showErr ? "f-err" : undefined}
                    className={showErr ? "is-error" : undefined}
                    onChange={(e) => { setAbout(e.target.value); if (showErr) setShowErr(false); }} />
                  {showErr && !about.trim() && <p className="msg" id="f-err" role="alert">✕ {t.contact.required}</p>}
                </div>
                <div className="wide cta" style={{ marginTop: 0 }}>
                  <button className="pill solid" type="submit">{FORMSPREE_ID ? t.contact.send : t.contact.sendMail}</button>
                  {WHATSAPP_PHONE && (
                    <button className="pill" type="button" onClick={sendWhatsApp}>{t.contact.whatsapp}</button>
                  )}
                </div>
                {sentOk && <p className="wide status-line sent" role="status">✓ {t.contact.sent}</p>}
                {WHATSAPP_PHONE && <p className="wide hint" role="status" aria-live="polite">{waMsg || t.contact.waNote}</p>}
              </form>
              <p className="promise">{t.contact.safety}</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <p className="wordmark" aria-hidden="true"><Mark className="mark" />Low Noise</p>
          <div className="foot-row mono">
            <span>{t.footer}</span>
            <a href={`https://github.com/${ORG}`}>GITHUB<ArrowUpRight className="ic" /></a>
            <a href="https://github.com/Low-Noise-Organization/lownoise.dev">{t.sourceNote.toUpperCase()}<ArrowUpRight className="ic" /></a>
            <span>{t.fontCredit}</span>
            <span>{t.artCredit}</span>
            <span>© Low Noise</span>
            <span className="legal">{t.legal}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
