"use client";

import Link from "next/link";
import { H } from "@/lib/hidden";
import type { Lang } from "@/lib/content";
import { ArrowUpRight } from "../Icons";

export default function Index({ lang }: { lang: Lang }) {
  const t = H[lang].index;
  return (
    <div className="wrap">
      <header className="lab-head">
        <p className="mono"><span className="badge">{t.badge}</span></p>
        <h1 className="h2">{t.title}</h1>
        <p className="sec-lead">{t.lead}</p>
      </header>
      <ol className="dir">
        {t.items.map(([name, body, href], i) => {
          const inner = (
            <>
              <span className="mono dim">{String(i + 1).padStart(2, "0")}</span>
              <h2>{name}</h2>
              <p>{body}</p>
              <span className="path mono">{href}</span>
              <ArrowUpRight className="ic go" />
            </>
          );
          // The 404 test is a full page load on purpose: the server answers with the real not-found page.
          return <li key={href}>{href.includes("404") ? <a href={href}>{inner}</a> : <Link href={href}>{inner}</Link>}</li>;
        })}
      </ol>
    </div>
  );
}
