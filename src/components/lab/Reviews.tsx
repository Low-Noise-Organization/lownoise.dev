"use client";

import dynamic from "next/dynamic";
import { useState, useSyncExternalStore } from "react";
import { FORMSPREE_ID, type Lang } from "@/lib/content";
import { H } from "@/lib/hidden";
import { ArrowRight, Check, Cross } from "../Icons";
import { useMobile, useReducedMotion } from "../hooks";

const NoiseScene = dynamic(() => import("../three/NoiseSphere"), { ssr: false });
const noop = () => () => {};
const getSent = () => new URLSearchParams(location.search).get("sent") === "1";
const getOrigin = () => location.origin;
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Review form. It posts natively to the same Formspree form as the contact page (a public id, not a secret):
 * the old version embedded a Discord webhook URL in the client, which anyone could read and abuse.
 */
export default function Reviews({ lang }: { lang: Lang }) {
  const t = H[lang].rev;
  const [business, setBusiness] = useState("");
  const [product, setProduct] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [showErr, setShowErr] = useState(false);
  const sent = useSyncExternalStore(noop, getSent, () => false);
  const origin = useSyncExternalStore(noop, getOrigin, () => "");
  const mobile = useMobile();
  const reduced = useReducedMotion();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    const hp = (e.currentTarget.elements.namedItem("_gotcha") as HTMLInputElement | null)?.value;
    if (hp || !business.trim() || !product || !rating) { e.preventDefault(); if (!hp) setShowErr(true); return; }
    setShowErr(false);
  };

  // Calm sphere = good rating. Before choosing, a medium amount of noise.
  const noise = rating ? 0.8 - (rating - 1) * 0.19 : 0.45;

  return (
    <div className="rev-grid">
      <div className="rev-3d">
        <NoiseScene
          label="Sphere that becomes calmer as the rating goes up"
          noise={noise} still={reduced} mobile={mobile} scale={1.15} interactive={!reduced}
          fallback={/* eslint-disable-next-line @next/next/no-img-element */ <img src={`${BASE}/art/hero.png`} alt="" width={800} height={800} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} />}
        />
        <p className="cap2 mono"><span>{t.noise}</span><span>{rating ? `${Math.round(noise * 100)}%` : "—"}</span></p>
      </div>

      <div>
        {!FORMSPREE_ID ? (
          <p className="hint">Form not configured.</p>
        ) : (
          <form className="rform" action={`https://formspree.io/f/${FORMSPREE_ID}`} method="POST" onSubmit={submit} noValidate>
            <input type="hidden" name="_subject" value="Low Noise — Review" />
            <input type="hidden" name="_next" value={`${origin}${BASE}/hidden/reviews/?sent=1`} />
            <input type="hidden" name="valoracion" value={rating ? `${rating}/5` : ""} />
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" />

            <div className="field">
              <label className="mono" htmlFor="r-biz">{t.business} *</label>
              <input id="r-biz" name="negocio" value={business} onChange={(e) => setBusiness(e.target.value)} aria-invalid={showErr && !business.trim()} autoComplete="organization" />
            </div>
            <div className="field">
              <label className="mono" htmlFor="r-prod">{t.product} *</label>
              <select id="r-prod" name="producto" value={product} onChange={(e) => setProduct(e.target.value)} aria-invalid={showErr && !product}>
                <option value="">{t.pick}</option>
                {t.products.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="field">
              <span className="mono" id="r-rate" style={{ textTransform: "uppercase", opacity: 0.6 }}>{t.rating} *</span>
              <div className="rate" role="radiogroup" aria-labelledby="r-rate">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" role="radio" aria-checked={rating === n} className={n <= rating ? "on" : ""} onClick={() => setRating(n)}>{n}</button>
                ))}
              </div>
              <p className="rate-lab mono">{t.ratings[rating]}</p>
              <p className="hint">{t.noiseHint}</p>
            </div>
            <div className="field">
              <label className="mono" htmlFor="r-msg">{t.message}</label>
              <textarea id="r-msg" name="mensaje" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
            <div className="field">
              <label className="mono" htmlFor="r-mail">{t.email}</label>
              <input id="r-mail" name="email" type="email" autoComplete="email" />
              <p className="hint">{t.emailHint}</p>
            </div>
            {showErr && (!business.trim() || !product || !rating) && <p className="msg" role="alert"><Cross className="ic" />{t.required}</p>}
            <button className="pill solid" type="submit">{t.send}<ArrowRight className="ic" /></button>
            {sent && <p className="msg ok" role="status"><Check className="ic" />{t.sent}</p>}
            <p className="hint">{t.note}</p>
          </form>
        )}
      </div>
    </div>
  );
}
