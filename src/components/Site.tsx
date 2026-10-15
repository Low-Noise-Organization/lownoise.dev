"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { ORG, projects, type Category } from "@/lib/projects";

type Lang = "en" | "es";
type Theme = "grafito" | "washi";

const T = {
  en: {
    projects: "Projects", about: "Philosophy", contact: "Contact",
    tagline: "Software crafted with intention.",
    lead: "We build thoughtful software for developers, creators and curious minds. Less noise. More craftsmanship.",
    seeProjects: "See projects", github: "GitHub",
    aboutTitle: "Philosophy",
    principles: [
      ["Earn its place", "Every line, feature and dependency has to justify itself. If it adds noise, it goes."],
      ["Honest status", "Each project says where it really is: design, experimental or stable. No invented numbers."],
      ["Built to last", "Small, readable, tested. Software made with care outlasts software made in a hurry."],
    ],
    projectsTitle: "Projects",
    all: "All", search: "Search projects", none: "No project matches.",
    cat: { systems: "Systems", apps: "Apps", tools: "Tools", games: "Games", learning: "Learning" },
    status: { active: "active", experimental: "experimental", design: "design", stable: "stable" },
    contactTitle: "Contact",
    contactText: "Everything happens in the open. Issues and discussions on GitHub are the best way to reach us.",
    issues: "Open an issue", footer: "Built with care. Powered by curiosity.",
    illCaption: "01 // WINDOW",
  },
  es: {
    projects: "Proyectos", about: "Filosofía", contact: "Contacto",
    tagline: "Software hecho con intención.",
    lead: "Creamos software cuidado para desarrolladores, creadores y mentes curiosas. Menos ruido. Más oficio.",
    seeProjects: "Ver proyectos", github: "GitHub",
    aboutTitle: "Filosofía",
    principles: [
      ["Ganarse el sitio", "Cada línea, función y dependencia tiene que justificarse. Si añade ruido, fuera."],
      ["Estado honesto", "Cada proyecto dice dónde está de verdad: diseño, experimental o estable. Sin cifras inventadas."],
      ["Hecho para durar", "Pequeño, legible, probado. El software hecho con cuidado dura más que el hecho con prisa."],
    ],
    projectsTitle: "Proyectos",
    all: "Todos", search: "Buscar proyectos", none: "Ningún proyecto coincide.",
    cat: { systems: "Sistemas", apps: "Apps", tools: "Herramientas", games: "Juegos", learning: "Aprendizaje" },
    status: { active: "activo", experimental: "experimental", design: "diseño", stable: "estable" },
    contactTitle: "Contacto",
    contactText: "Todo ocurre en abierto. Las issues y discusiones en GitHub son la mejor vía para escribirnos.",
    issues: "Abrir una issue", footer: "Hecho con cuidado. Movido por la curiosidad.",
    illCaption: "01 // VENTANA",
  },
} as const;

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

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = T[lang];

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

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="top">
        <div className="wrap">
          <a className="brand" href="#top"><span className="disc" aria-hidden="true" />LOW NOISE</a>
          <nav className="menu" aria-label="Main">
            <a className="hide-sm" href="#projects">{t.projects}</a>
            <a className="hide-sm" href="#about">{t.about}</a>
            <a className="hide-sm" href="#contact">{t.contact}</a>
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
              <p className="label">Low Noise // Open source</p>
              <h1 className="display" style={{ marginTop: 8 }}>{t.tagline}</h1>
              <p className="lead">{t.lead}</p>
              <div className="cta">
                <a className="btn primary" href="#projects">{t.seeProjects}</a>
                <a className="btn" href={`https://github.com/${ORG}`}>{t.github}</a>
              </div>
            </div>
            <Illustration caption={t.illCaption} />
          </div>
        </div>

        <section id="about">
          <div className="wrap">
            <div className="sec-head"><span className="n">00 //</span><h2>{t.aboutTitle}</h2></div>
            <div className="principles">
              {t.principles.map(([title, body]) => (
                <div className="card" key={title}><h3>{title}</h3><p className="dim">{body}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects">
          <div className="wrap">
            <div className="sec-head"><span className="n">01 //</span><h2>{t.projectsTitle}</h2><span className="muted">{shown.length}</span></div>
            <div className="tools">
              <div className="chips" role="group" aria-label="Category">
                <button className="chip" aria-pressed={cat === "all"} onClick={() => setCat("all")}>{t.all}</button>
                {CATS.map((c) => (
                  <button key={c} className="chip" aria-pressed={cat === c} onClick={() => setCat(c)}>{t.cat[c]}</button>
                ))}
              </div>
              <input className="search" type="search" placeholder={t.search} aria-label={t.search} value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            {shown.length === 0 ? (
              <p className="empty">{t.none}</p>
            ) : (
              <div className="grid">
                {shown.map((p) => (
                  <a className="proj" key={p.repo} href={`https://github.com/${ORG}/${p.repo}`}>
                    <h3><span>{p.name}</span><span className="muted" aria-hidden="true">↗</span></h3>
                    <p>{p[lang]}</p>
                    <div className="meta">
                      <span>{p.lang}</span>
                      <span>{t.cat[p.category]}</span>
                      <span className={`status ${p.status}`}>{t.status[p.status]}</span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="contact">
          <div className="wrap">
            <div className="sec-head"><span className="n">02 //</span><h2>{t.contactTitle}</h2></div>
            <p className="dim" style={{ maxWidth: "56ch" }}>{t.contactText}</p>
            <div className="links">
              <a className="btn primary" href={`https://github.com/${ORG}/.github/issues`}>{t.issues}</a>
              <a className="btn" href={`https://github.com/${ORG}`}>{t.github}</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap"><span>{t.footer}</span><span>© Low Noise</span></div>
      </footer>
    </>
  );
}
