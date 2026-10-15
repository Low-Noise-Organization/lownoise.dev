"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { ORG, projects, type Category } from "@/lib/projects";
import { FORMSPREE_ID, T, contactEmail, type Lang } from "@/lib/content";

type Theme = "grafito" | "washi";

const CATS: Category[] = ["systems", "apps", "tools", "games", "learning"];

function store(key: string, value?: string): string | null {
  try {
    if (value !== undefined) localStorage.setItem(key, value);
    return value ?? localStorage.getItem(key);
  } catch {
    return value ?? null;
  }
}

// Language and theme live outside React (localStorage / <html>), so read them as an external store.
const listeners = new Set<() => void>();
const subscribe = (fn: () => void) => { listeners.add(fn); return () => { listeners.delete(fn); }; };
const notify = () => listeners.forEach((fn) => fn());

const getLang = (): Lang => {
  const l = store("ln-lang");
  if (l === "es" || l === "en") return l;
  return navigator.language.startsWith("es") ? "es" : "en";
};
const getTheme = (): Theme => (document.documentElement.dataset.theme === "washi" ? "washi" : "grafito");

function Illustration({ caption }: { caption: string }) {
  return (
    <svg className="ill" viewBox="0 0 340 260" role="img" aria-label="Terminal window">
      <defs>
        <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="var(--ink)" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="340" height="260" fill="url(#dots)" opacity="0.5" />
      <rect className="f1" x="46" y="46" width="240" height="150" />
      <rect className="s paper" x="40" y="40" width="240" height="150" />
      <path className="s thin" d="M40 64h240" />
      <circle cx="54" cy="52" r="4" fill="var(--brand)" />
      <path className="s" d="M58 92l14 10-14 10M84 114h40" />
      <path className="s thin" d="M58 140h150M58 158h96" />
      <rect x="196" y="104" width="10" height="16" fill="var(--ink)" />
      <path className="s thin" d="M20 20h10M25 15v10M310 240h10M315 235v10" />
      <text className="t" x="40" y="222">{caption}</text>
    </svg>
  );
}

export default function Site() {
  const lang = useSyncExternalStore(subscribe, getLang, () => "en" as Lang);
  const theme = useSyncExternalStore(subscribe, getTheme, () => "grafito" as Theme);
  const [cat, setCat] = useState<Category | "all">("all");
  const [q, setQ] = useState("");
  const [typeIdx, setTypeIdx] = useState(0);
  const [whenIdx, setWhenIdx] = useState(0);
  const [about, setAbout] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [replyTo, setReplyTo] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = T[lang];
  const email = contactEmail();

  const pickLang = (l: Lang) => { store("ln-lang", l); notify(); };
  const pickTheme = (th: Theme) => {
    if (th === "washi") document.documentElement.dataset.theme = "washi";
    else delete document.documentElement.dataset.theme;
    store("ln-theme", th);
    notify();
  };

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return projects.filter(
      (p) =>
        (cat === "all" || p.category === cat) &&
        (!needle || `${p.name} ${p.lang} ${p.en} ${p.es}`.toLowerCase().includes(needle)),
    );
  }, [cat, q]);

  const send = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const c = t.contact;
    const emailOk = !FORMSPREE_ID || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyTo.trim());
    if (!about.trim() || !emailOk) { setShowErr(true); return; }
    setShowErr(false);
    const hp = (e.currentTarget.elements.namedItem("_gotcha") as HTMLInputElement | null)?.value;
    if (hp) return; // honeypot: bots fill hidden fields
    if (FORMSPREE_ID) {
      setState("sending");
      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ email: replyTo.trim(), tipo: c.types[typeIdx], plazo: c.whens[whenIdx], mensaje: about.trim() }),
        });
        if (!res.ok) throw new Error(String(res.status));
        setState("sent");
        setAbout("");
      } catch {
        setState("failed");
      }
      return;
    }
    const body = `${c.lines.type}: ${c.types[typeIdx]}\n${c.lines.when}: ${c.whens[whenIdx]}\n\n${c.lines.about}:\n${about.trim()}\n`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Low Noise — ${c.subject}`)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <a className="skip" href="#main">{t.skip}</a>
      <header className="top">
        <div className="wrap">
          <a className="brand" href="#top"><span className="disc" aria-hidden="true" />LOW NOISE</a>
          <nav className="menu" aria-label="Main">
            <a className="hide-sm" href="#services">{t.nav.services}</a>
            <a className="hide-sm" href="#process">{t.nav.process}</a>
            <a className="hide-sm" href="#work">{t.nav.work}</a>
            <a className="hide-sm" href="#code">{t.nav.code}</a>
            <a className="hide-sm" href="#contact">{t.nav.contact}</a>
            <div className="toggle" role="group" aria-label="Language">
              {(["en", "es"] as const).map((l) => (
                <button key={l} aria-pressed={lang === l} onClick={() => pickLang(l)}>{l.toUpperCase()}</button>
              ))}
            </div>
            <div className="toggle" role="group" aria-label="Theme">
              <button aria-pressed={theme === "grafito"} onClick={() => pickTheme("grafito")}>Grafito</button>
              <button aria-pressed={theme === "washi"} onClick={() => pickTheme("washi")}>Washi</button>
            </div>
          </nav>
        </div>
      </header>

      <main id="main">
        <div className="hero" id="top">
          <div className="sun" aria-hidden="true" />
          <div className="wrap">
            <div>
              <p className="label">{t.hero.kicker}</p>
              <h1 className="display" style={{ marginTop: 8 }}>{t.hero.title}</h1>
              <p className="lead">{t.hero.lead}</p>
              <div className="cta">
                <a className="btn primary" href="#contact">{t.hero.cta}</a>
                <a className="btn" href="#work">{t.hero.secondary}</a>
              </div>
            </div>
            <Illustration caption={t.ill} />
          </div>
        </div>

        <section id="services">
          <div className="wrap">
            <div className="sec-head"><span className="n">00 //</span><h2>{t.services.title}</h2></div>
            <div className="principles services">
              {t.services.items.map((s) => (
                <div className="card" key={s.name}>
                  <h3>{s.name}</h3>
                  <p className="dim">{s.body}</p>
                  <p className="stack">{s.stack}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="process">
          <div className="wrap">
            <div className="sec-head"><span className="n">01 //</span><h2>{t.process.title}</h2></div>
            <ol className="steps">
              {t.process.steps.map(([title, body], i) => (
                <li key={title}>
                  <span className="label">0{i + 1}</span>
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
            <div className="sec-head"><span className="n">02 //</span><h2>{t.work.title}</h2></div>
            <p className="dim" style={{ marginBottom: 24, maxWidth: "62ch" }}>{t.work.note}</p>
            <div className="cases">
              {t.work.cases.map((c) => (
                <a className="case" key={c.repo} href={`https://github.com/${ORG}/${c.repo}`}>
                  <p className="label">{c.kind}</p>
                  <h3>{c.name} <span className="muted" aria-hidden="true">↗</span></h3>
                  <dl>
                    <dt>{t.work.labels.problem}</dt><dd>{c.problem}</dd>
                    <dt>{t.work.labels.decision}</dt><dd>{c.decision}</dd>
                    <dt>{t.work.labels.status}</dt><dd>{c.status}</dd>
                  </dl>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="code">
          <div className="wrap">
            <div className="sec-head"><span className="n">03 //</span><h2>{t.code.title}</h2><span className="muted">{shown.length}</span></div>
            <div className="tools">
              <div className="chips" role="group" aria-label="Category">
                <button className="chip" aria-pressed={cat === "all"} onClick={() => setCat("all")}>{t.code.all}</button>
                {CATS.map((c) => (
                  <button key={c} className="chip" aria-pressed={cat === c} onClick={() => setCat(c)}>{t.code.cat[c]}</button>
                ))}
              </div>
              <input className="search" type="search" placeholder={t.code.search} aria-label={t.code.search} value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            {shown.length === 0 ? (
              <p className="empty">{t.code.none}</p>
            ) : (
              <div className="grid">
                {shown.map((p) => (
                  <a className="proj" key={p.repo} href={`https://github.com/${ORG}/${p.repo}`}>
                    <h3><span>{p.name}</span><span className="muted" aria-hidden="true">↗</span></h3>
                    <p>{p[lang]}</p>
                    <div className="meta">
                      <span>{p.lang}</span>
                      <span>{t.code.cat[p.category]}</span>
                      <span className={`status ${p.status}`}>{t.code.status[p.status]}</span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="contact">
          <div className="wrap">
            <div className="sec-head"><span className="n">04 //</span><h2>{t.contact.title}</h2></div>
            <p className="dim" style={{ maxWidth: "60ch", marginBottom: 24 }}>{t.contact.lead}</p>
            <form className="brief" onSubmit={send} noValidate>
              <div className="field">
                <label htmlFor="f-type">{t.contact.type}</label>
                <select id="f-type" value={typeIdx} onChange={(e) => setTypeIdx(Number(e.target.value))}>
                  {t.contact.types.map((x, i) => <option key={x} value={i}>{x}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="f-when">{t.contact.when}</label>
                <select id="f-when" value={whenIdx} onChange={(e) => setWhenIdx(Number(e.target.value))}>
                  {t.contact.whens.map((x, i) => <option key={x} value={i}>{x}</option>)}
                </select>
              </div>
              {FORMSPREE_ID && (
                <div className="field wide">
                  <label htmlFor="f-email">{t.contact.email}</label>
                  <input id="f-email" type="email" autoComplete="email" value={replyTo}
                    aria-invalid={showErr && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyTo.trim())}
                    onChange={(e) => { setReplyTo(e.target.value); setState("idle"); }} />
                  <p className="hint">{t.contact.emailHint}</p>
                  {showErr && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyTo.trim()) && <p className="msg" role="alert">✕ {t.contact.emailInvalid}</p>}
                </div>
              )}
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" />
              <div className="field wide">
                <label htmlFor="f-about">{t.contact.about}</label>
                <textarea id="f-about" rows={5} value={about} placeholder={t.contact.aboutHint}
                  aria-invalid={showErr} aria-describedby={showErr ? "f-err" : undefined}
                  className={showErr ? "is-error" : undefined}
                  onChange={(e) => { setAbout(e.target.value); if (showErr) setShowErr(false); }} />
                {showErr && !about.trim() && <p className="msg" id="f-err" role="alert">✕ {t.contact.required}</p>}
              </div>
              <div className="wide cta" style={{ marginTop: 0 }}>
                <button className="btn primary" type="submit" disabled={state === "sending"}>
                  {state === "sending" ? t.contact.sending : FORMSPREE_ID ? t.contact.send : t.contact.sendMail}
                </button>
              </div>
              <p className={`wide status-line ${state}`} role="status" aria-live="polite">
                {state === "sent" && `✓ ${t.contact.sent}`}
                {state === "failed" && `✕ ${t.contact.failed}`}
              </p>
            </form>
            <p className="muted" style={{ marginTop: 24 }}>
              {t.contact.or} <a href={`mailto:${email}`}>{email}</a> · <a href={`https://github.com/${ORG}/.github/issues`}>{t.contact.issues}</a>
            </p>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap"><span>{t.footer}</span><span>© Low Noise</span></div>
      </footer>
    </>
  );
}
