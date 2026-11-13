"use client";

import { H } from "@/lib/hidden";
import { useLang } from "@/lib/lang";
import Algorithms from "./Algorithms";
import Index from "./Index";
import LabShell from "./LabShell";
import Reviews from "./Reviews";

function Head({ badge, title, lead }: { badge: string; title: string; lead: string }) {
  return (
    <header className="lab-head">
      <p className="mono"><span className="badge">{badge}</span></p>
      <h1 className="h2">{title}</h1>
      <p className="sec-lead">{lead}</p>
    </header>
  );
}
const Space = () => <div style={{ height: "clamp(64px, 9vw, 130px)" }} />;

export function IndexPage() {
  const [lang] = useLang();
  return <LabShell><Index lang={lang} /></LabShell>;
}

export function AlgorithmsPage() {
  const [lang] = useLang();
  const t = H[lang].algo;
  return (
    <LabShell>
      <div className="wrap">
        <Head badge={t.badge} title={t.title} lead={t.lead} />
        <Algorithms lang={lang} />
        <Space />
      </div>
    </LabShell>
  );
}

export function ReviewsPage() {
  const [lang] = useLang();
  const t = H[lang].rev;
  return (
    <LabShell>
      <div className="wrap">
        <Head badge={t.badge} title={t.title} lead={t.lead} />
        <Reviews lang={lang} />
        <Space />
      </div>
    </LabShell>
  );
}
