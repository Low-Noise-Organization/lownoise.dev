"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { algorithms, randomArray, type SortStep } from "@/lib/algorithms";

type BarState = "default" | "comparing" | "swapping" | "sorted";

export default function SortingVisualizer() {
  const [selectedAlgo, setSelectedAlgo] = useState(0);
  const [array, setArray] = useState<number[]>(() => randomArray(24));
  const [barStates, setBarStates] = useState<BarState[]>([]);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [progress, setProgress] = useState(0);
  const genRef = useRef<Generator<SortStep> | null>(null);
  const animRef = useRef<number | null>(null);

  const resetArray = useCallback(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    setRunning(false);
    const newArr = randomArray(24);
    setArray(newArr);
    setBarStates(new Array(newArr.length).fill("default"));
    setProgress(0);
    genRef.current = null;
  }, []);

  const startSort = useCallback(() => {
    if (running) return;
    const algo = algorithms[selectedAlgo];
    genRef.current = algo.sort([...array]);
    setBarStates(new Array(array.length).fill("default"));
    setRunning(true);
    setProgress(0);
  }, [selectedAlgo, array, running]);

  useEffect(() => {
    if (!running || !genRef.current) return;
    let lastTime = performance.now();
    const delay = 101 - speed;
    let paused = false;

    function step(time: number) {
      if (!genRef.current) return;
      if (time - lastTime < delay) {
        animRef.current = requestAnimationFrame(step);
        return;
      }
      lastTime = time;

      const result = genRef.current.next();
      if (result.done) {
        setRunning(false);
        genRef.current = null;
        setProgress(100);
        return;
      }

      const stepData = result.value as SortStep;
      setArray([...stepData.array]);
      setProgress(Math.round((stepData.sorted.length / stepData.array.length) * 100));

      const states: BarState[] = new Array(stepData.array.length).fill("default");
      for (const idx of stepData.sorted) states[idx] = "sorted";
      if (stepData.swapping) {
        states[stepData.swapping[0]] = "swapping";
        states[stepData.swapping[1]] = "swapping";
      } else if (stepData.comparing) {
        states[stepData.comparing[0]] = "comparing";
        states[stepData.comparing[1]] = "comparing";
      }
      setBarStates(states);

      animRef.current = requestAnimationFrame(step);
    }

    animRef.current = requestAnimationFrame(step);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [running, speed]);

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const maxVal = Math.max(...array, 1);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <select
          value={selectedAlgo}
          onChange={(e) => { setSelectedAlgo(Number(e.target.value)); resetArray(); }}
          disabled={running}
          className="px-3 py-2 text-[12px] bg-crust border-2 border-border"
          style={{
            color: "var(--color-text)",
            boxShadow: "inset 2px 2px 0 0 var(--color-surface0), inset -2px -2px 0 0 var(--color-overlay1)",
            outline: "none",
          }}
        >
          {algorithms.map((algo, i) => (
            <option key={i} value={i}>{algo.name}</option>
          ))}
        </select>

        <button
          onClick={startSort}
          disabled={running}
          className="pixel-btn-primary px-4 py-2 text-[12px] tracking-wider uppercase"
        >
          ▶ SORT
        </button>

        <button
          onClick={resetArray}
          disabled={running}
          className="pixel-btn px-4 py-2 text-[12px] tracking-wider uppercase"
          style={{ color: "var(--color-overlay1)" }}
        >
          ↺ RESET
        </button>

        <div className="flex items-center gap-2 ml-auto">
          <span className="text-[11px]" style={{ color: "var(--color-overlay0)" }}>SPEED</span>
          <input
            type="range"
            min="5"
            max="100"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-24"
            style={{ accentColor: "var(--color-accent)" }}
          />
          <span className="text-[11px]" style={{ color: "var(--color-overlay0)" }}>{speed}%</span>
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="mb-4 h-2"
        style={{
          border: "2px solid var(--color-border)",
          boxShadow: "inset 1px 1px 0 0 var(--color-surface0), inset -1px -1px 0 0 var(--color-overlay1)",
        }}
      >
        <div
          className="h-full transition-all duration-75"
          style={{
            width: `${progress}%`,
            background: "var(--color-accent)",
            boxShadow: "inset -1px -1px 0 0 var(--color-sapphire), inset 1px 1px 0 0 var(--color-lavender)",
          }}
        />
      </div>

      {/* Bars */}
      <div
        className="flex items-end gap-[2px] p-3 min-h-[200px]"
        style={{
          border: "2px solid var(--color-border)",
          boxShadow: "inset -2px -2px 0 0 var(--color-surface0), inset 2px 2px 0 0 var(--color-overlay1)",
          background: "var(--color-mantle)",
        }}
      >
        {array.map((val, i) => {
          const height = (val / maxVal) * 180;
          let bg: string;
          switch (barStates[i]) {
            case "comparing":
              bg = "var(--color-yellow)";
              break;
            case "swapping":
              bg = "var(--color-red)";
              break;
            case "sorted":
              bg = "var(--color-green)";
              break;
            default:
              bg = "var(--color-accent)";
          }
          return (
            <div
              key={i}
              className="flex-1 transition-all duration-75"
              style={{
                height: `${height}px`,
                background: bg,
                border: "2px solid var(--color-surface0)",
                boxShadow: `inset -1px -1px 0 0 var(--color-surface0), inset 1px 1px 0 0 var(--color-overlay1)`,
                opacity: barStates[i] === "default" ? 0.7 : 1,
              }}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-3">
        {[
          { color: "var(--color-accent)", label: "UNSORTED" },
          { color: "var(--color-yellow)", label: "COMPARING" },
          { color: "var(--color-red)", label: "SWAPPING" },
          { color: "var(--color-green)", label: "SORTED" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3"
              style={{
                background: item.color,
                border: "2px solid var(--color-surface0)",
                boxShadow: "inset -1px -1px 0 0 var(--color-surface0), inset 1px 1px 0 0 var(--color-overlay1)",
              }}
            />
            <span className="text-[10px]" style={{ color: "var(--color-overlay0)" }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
