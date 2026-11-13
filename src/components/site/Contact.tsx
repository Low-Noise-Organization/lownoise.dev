"use client";

import { useState, useSyncExternalStore } from "react";
import { ORG } from "@/lib/projects";
import { FORMSPREE_ID, T, WA_MAX_PER_DAY, WA_MIN_CHARS, WA_MIN_GAP_MS, WHATSAPP_PHONE, contactEmail, type Lang } from "@/lib/content";
import { ArrowRight, ArrowUpRight, Check, Cross } from "../Icons";
import { Reveal } from "../ui";
import { SecHead } from "./Services";

const noop = () => () => {};
const getSent = () => new URLSearchParams(location.search).get("sent") === "1";
const getOrigin = () => location.origin;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact({ lang, typeIdx, setTypeIdx }: { lang: Lang; typeIdx: number; setTypeIdx: (i: number) => void }) {
  const t = T[lang];
  const c = t.contact;
  const email = contactEmail();
  const [whenIdx, setWhenIdx] = useState(0);
  const [about, setAbout] = useState("");
  const [replyTo, setReplyTo] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [waMsg, setWaMsg] = useState("");
  const [loadedAt] = useState(() => Date.now());
  const sentOk = useSyncExternalStore(noop, getSent, () => false);
  const origin = useSyncExternalStore(noop, getOrigin, () => "");

  const send = (e: React.FormEvent<HTMLFormElement>) => {
    const emailOk = !FORMSPREE_ID || emailRe.test(replyTo.trim());
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

  const channelHref = {
    mail: `mailto:${email}`,
    issues: `https://github.com/${ORG}/.github/issues`,
    security: `https://github.com/${ORG}/.github/blob/main/SECURITY.md`,
    youtube: "https://www.youtube.com/@Low_Noise-n4e",
  } as const;

  return (
    <section id="contact" className="sec sec-w">
      <div className="wrap contact-grid">
        <div className="contact-side">
          <SecHead n={6} label={c.title} lead={c.lead} />
          <ul className="expect">{c.expect.map((x) => <li key={x}><Check className="ic" />{x}</li>)}</ul>
          <h3 className="mono ch-title">{c.channelsTitle.toUpperCase()}</h3>
          <ul className="channels">
            {c.channels.map(([name, body, kind]) => (
              <li key={kind}>
                <a href={channelHref[kind as keyof typeof channelHref]}>
                  <span className="mono">{name.toUpperCase()}</span><i aria-hidden="true" />
                  {kind === "mail" ? <span className="addr">{email}</span> : <ArrowUpRight className="ic" />}
                </a>
                <p>{body}</p>
              </li>
            ))}
          </ul>
        </div>
        <Reveal className="contact-form">
          <form className="brief" onSubmit={send} noValidate
            {...(FORMSPREE_ID ? { action: `https://formspree.io/f/${FORMSPREE_ID}`, method: "POST" } : {})}>
            {FORMSPREE_ID && (
              <>
                <input type="hidden" name="tipo" value={c.types[typeIdx]} />
                <input type="hidden" name="plazo" value={c.whens[whenIdx]} />
                <input type="hidden" name="_subject" value={`Low Noise — ${c.subject}`} />
                <input type="hidden" name="_next" value={`${origin}${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/?sent=1`} />
              </>
            )}
            <div className="field">
              <label className="mono" htmlFor="f-type">{c.type}</label>
              <select id="f-type" value={typeIdx} onChange={(e) => setTypeIdx(Number(e.target.value))}>
                {c.types.map((x, i) => <option key={x} value={i}>{x}</option>)}
              </select>
            </div>
            <div className="field">
              <label className="mono" htmlFor="f-when">{c.when}</label>
              <select id="f-when" value={whenIdx} onChange={(e) => setWhenIdx(Number(e.target.value))}>
                {c.whens.map((x, i) => <option key={x} value={i}>{x}</option>)}
              </select>
            </div>
            {FORMSPREE_ID && (
              <div className="field wide">
                <label className="mono" htmlFor="f-email">{c.email}</label>
                <input id="f-email" name="email" type="email" autoComplete="email" value={replyTo}
                  aria-invalid={showErr && !emailRe.test(replyTo.trim())} onChange={(e) => setReplyTo(e.target.value)} />
                <p className="hint">{c.emailHint}</p>
                {showErr && !emailRe.test(replyTo.trim()) && <p className="msg" role="alert"><Cross className="ic" />{c.emailInvalid}</p>}
              </div>
            )}
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" />
            <div className="field wide">
              <label className="mono" htmlFor="f-about">{c.about}</label>
              <textarea id="f-about" name="mensaje" rows={5} value={about} placeholder={c.aboutHint}
                aria-invalid={showErr && !about.trim()} aria-describedby={showErr ? "f-err" : undefined}
                onChange={(e) => { setAbout(e.target.value); if (showErr) setShowErr(false); }} />
              {showErr && !about.trim() && <p className="msg" id="f-err" role="alert"><Cross className="ic" />{c.required}</p>}
            </div>
            <div className="wide cta">
              <button className="pill solid" type="submit">{FORMSPREE_ID ? c.send : c.sendMail}<ArrowRight className="ic" /></button>
              {WHATSAPP_PHONE && <button className="pill" type="button" onClick={sendWhatsApp}>{c.whatsapp}</button>}
            </div>
            {sentOk && <p className="wide msg ok" role="status"><Check className="ic" />{c.sent}</p>}
            {WHATSAPP_PHONE && <p className="wide hint" role="status" aria-live="polite">{waMsg || c.waNote}</p>}
          </form>
          <p className="safety">{c.safety}</p>
        </Reveal>
      </div>
    </section>
  );
}
