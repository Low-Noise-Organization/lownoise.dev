"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BOGO_INDEX, algorithms, randomArray, type SortStep } from "@/lib/algorithms";
import { H } from "@/lib/hidden";
import type { Lang } from "@/lib/content";
import { useMobile, useReducedMotion } from "../hooks";
import { useWebGL } from "../three/useWebGL";
import { toView, type SortView } from "../three/SortScene";

const SortScene = dynamic(() => import("../three/SortScene"), { ssr: false });
const SIZE_DEFAULT = 32;
const idle = (arr: number[]): SortView => ({ array: arr, states: new Array(arr.length).fill(0) });

type Status = "idle" | "running" | "paused" | "done";

export default function Algorithms({ lang }: { lang: Lang }) {
  const t = H[lang].algo;
  const webgl = useWebGL();
  const mobile = useMobile();
  const reduced = useReducedMotion();
  const [algoIdx, setAlgoIdx] = useState(0);
  const [size, setSize] = useState(SIZE_DEFAULT);
  const [speed, setSpeed] = useState(58);
  const [mode, setMode] = useState<"3d" | "2d">("3d");
  const [status, setStatus] = useState<Status>("idle");
  const [steps, setSteps] = useState(0);
  const [progress, setProgress] = useState(0);
  const [view, setView] = useState<SortView>(() => idle(randomArray(SIZE_DEFAULT)));
  const [langIdx, setLangIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const gen = useRef<Generator<SortStep> | null>(null);
  const viewRef = useRef<SortView>(view);
  const speedRef = useRef(speed);
  const algo = algorithms[algoIdx];
  const use3d = webgl && mode === "3d";

  useEffect(() => { viewRef.current = view; }, [view]);
  useEffect(() => { speedRef.current = speed; }, [speed]);

  const reset = useCallback((n: number) => {
    gen.current = null;
    setStatus("idle"); setSteps(0); setProgress(0);
    setView(idle(randomArray(n)));
  }, []);

  const advance = useCallback((count: number) => {
    const g = gen.current;
    if (!g) return false;
    let last: SortStep | null = null;
    let n = 0;
    for (let i = 0; i < count; i++) {
      const r = g.next();
      if (r.done) { gen.current = null; setStatus("done"); setProgress(100); setView((v) => ({ array: last?.array ?? v.array, states: new Array((last?.array ?? v.array).length).fill(3) })); setSteps((s) => s + n); return true; }
      last = r.value; n++;
    }
    if (last) { setView(toView(last)); setProgress(Math.round((last.sorted.length / last.array.length) * 100)); setSteps((s) => s + n); }
    return true;
  }, []);

  const begin = useCallback(() => {
    gen.current = algo.sort([...viewRef.current.array]);
    setSteps(0); setProgress(0);
    setStatus("running");
  }, [algo]);

  // Animation loop: steps per second grows exponentially with the speed slider; frames never do more than 200 steps.
  useEffect(() => {
    if (status !== "running") return;
    let raf = 0, last = performance.now(), acc = 0;
    const tick = (now: number) => {
      acc += ((now - last) / 1000) * 2 * Math.pow(1.075, speedRef.current);
      last = now;
      const n = Math.min(Math.floor(acc), 200);
      if (n > 0) { acc -= n; if (!advance(n)) return; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [status, advance]);

  const pickAlgo = (i: number) => { setAlgoIdx(i); setLangIdx(0); reset(size); };
  const codeKeys = useMemo(() => Object.keys(algo.code), [algo]);
  const codeKey = codeKeys[Math.min(langIdx, codeKeys.length - 1)];
  const code = algo.code[codeKey] || t.soon;
  const busy = status === "running";

  const copy = async () => {
    try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1400); } catch {}
  };

  const legend = [["#3b3b3b", t.legend[0]], ["#fff", t.legend[1]], ["#fff", t.legend[2]], ["#a6a6a6", t.legend[3]]];
  const maxV = Math.max(...view.array, 1);

  return (
    <>
      <div className="viz">
        <div className="viz-bar">
          {status === "running" ? (
            <button className="btn solid" onClick={() => setStatus("paused")}>{t.pause}</button>
          ) : (
            <button className="btn solid" onClick={() => (status === "paused" ? setStatus("running") : begin())}>{status === "paused" ? t.resume : t.sort}</button>
          )}
          <button className="btn" onClick={() => { if (status === "idle") begin(); gen.current && advance(1); setStatus("paused"); }} disabled={busy}>{t.step}</button>
          <button className="btn" onClick={() => reset(size)} disabled={false}>{t.shuffle}</button>
          <span className="grow" />
          <label className="range mono">{t.speed}<input type="range" min={1} max={100} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} aria-label={t.speed} /></label>
          <label className="range mono">{t.size}<input type="range" min={8} max={64} value={size} disabled={busy} onChange={(e) => { const n = Number(e.target.value); setSize(n); reset(n); }} aria-label={t.size} /><span>{size}</span></label>
          {webgl && (
            <div className="seg" role="group" aria-label={t.view}>
              <button aria-pressed={mode === "3d"} onClick={() => setMode("3d")}>3D</button>
              <button aria-pressed={mode === "2d"} onClick={() => setMode("2d")}>2D</button>
            </div>
          )}
        </div>
        <div className="progress-line" aria-hidden="true"><i style={{ width: `${progress}%` }} /></div>
        <div className="stage" role="img" aria-label={`${algo.name}: ${status === "done" ? t.done : status}`}>
          {use3d ? (
            <SortScene view={viewRef} mobile={mobile} />
          ) : (
            <div className="bars2d">
              {view.array.map((v, i) => (
                <i key={i} className={["", "c", "w", "s"][view.states[i]]} style={{ height: `${(v / maxV) * 100}%` }} />
              ))}
            </div>
          )}
          {use3d && <span className="hint-corner mono">{t.dragHint}</span>}
        </div>
        <div className="legend mono">
          {legend.map(([c, l], i) => (<span key={l}><b style={{ background: c, outline: i === 2 ? "2px solid #fff" : undefined, outlineOffset: i === 2 ? 1 : undefined }} />{l}</span>))}
          <span className="grow" style={{ flex: 1 }} />
          <span>{steps} {t.steps}{status === "done" ? ` · ${t.done}` : ""}</span>
        </div>
      </div>
      {reduced && <p className="hint mono" style={{ marginTop: 12 }}>prefers-reduced-motion</p>}

      <div className="tabs" role="group" aria-label={t.algorithm}>
        {algorithms.map((a, i) => (<button key={a.name} className="tab" aria-pressed={algoIdx === i} onClick={() => pickAlgo(i)}>{a.name}</button>))}
      </div>

      <div className="algo-grid">
        <div className="algo-info">
          <h3>{algo.name}</h3>
          <p>{algo.description}</p>
          {algoIdx === BOGO_INDEX && <p className="hint mono" style={{ marginTop: 12 }}>{t.bogoNote}</p>}
          <dl className="cx">
            {[[t.best, algo.complexity.best], [t.average, algo.complexity.average], [t.worst, algo.complexity.worst], [t.space, algo.complexity.space]].map(([k, v]) => (
              <div key={k}><dt className="mono">{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </div>
        <div>
          <div className="code-head">
            <div className="chips" role="group" aria-label={t.code}>
              {codeKeys.map((k, i) => (<button key={k} className="chip" aria-pressed={codeKey === k} onClick={() => setLangIdx(i)}>{k}</button>))}
            </div>
            <button className="btn" onClick={copy}>{copied ? t.copied : t.copy}</button>
          </div>
          <pre className="code" tabIndex={0}><code>{code}</code></pre>
        </div>
      </div>
    </>
  );
}
