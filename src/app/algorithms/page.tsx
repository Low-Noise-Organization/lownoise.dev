"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { algorithms } from "@/lib/algorithms";
import SortingVisualizer from "@/components/algorithms/SortingVisualizer";

const codeLanguages = ["JavaScript", "Python", "Java", "Rust", "C++"];

export default function AlgorithmsPage() {
  const [selectedAlgo, setSelectedAlgo] = useState(0);
  const [selectedLang, setSelectedLang] = useState(0);
  const algo = algorithms[selectedAlgo];

  return (
    <main className="relative min-h-screen pb-24">
      <div className="mx-auto max-w-7xl px-6 pt-28 sm:px-10 md:px-16">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[11px] tracking-widest" style={{ color: "var(--color-mauve)" }}>
            ◆ ALGORITHMS
          </p>
          <h1 className="mt-2 text-[22px] font-bold tracking-wider" style={{ color: "var(--color-text)" }}>
            SORTING ALGORITHMS
          </h1>
          <p className="mt-2 text-[12px] leading-relaxed max-w-2xl" style={{ color: "var(--color-overlay1)" }}>
            Interactive visualizations and implementations of classic sorting algorithms in multiple languages.
            Select an algorithm to see how it works and study its code.
          </p>
        </div>

        {/* Visualizer section */}
        <section className="mb-16">
          <h2 className="text-[12px] tracking-wider mb-4" style={{ color: "var(--color-subtext0)" }}>
            ◆ VISUALIZER
          </h2>
          <div
            className="pixel-card p-5"
            style={{ border: "2px solid var(--color-border)" }}
          >
            <SortingVisualizer />
          </div>
        </section>

        {/* Algorithm selector tabs */}
        <div className="flex flex-wrap gap-1 mb-8">
          {algorithms.map((algo, i) => (
            <button
              key={algo.name}
              onClick={() => setSelectedAlgo(i)}
              className={`px-3 py-2 text-[11px] tracking-wider uppercase transition-all duration-100 ${
                selectedAlgo === i ? "pixel-btn-primary" : "pixel-btn"
              }`}
              style={selectedAlgo !== i ? { color: "var(--color-overlay1)" } : {}}
            >
              {selectedAlgo === i ? "▶ " : ""}{algo.name}
            </button>
          ))}
        </div>

        {/* Algorithm details */}
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Description */}
          <div>
            <h3 className="text-[13px] tracking-wider mb-2" style={{ color: "var(--color-accent)" }}>
              ◆ {algo.name}
            </h3>
            <p className="text-[12px] leading-relaxed" style={{ color: "var(--color-overlay1)" }}>
              {algo.description}
            </p>

            <h4 className="text-[11px] tracking-wider mt-6 mb-3" style={{ color: "var(--color-subtext0)" }}>
              COMPLEXITY
            </h4>
            <div className="space-y-2">
              {[
                { label: "BEST", value: algo.complexity.best },
                { label: "AVERAGE", value: algo.complexity.average },
                { label: "WORST", value: algo.complexity.worst },
                { label: "SPACE", value: algo.complexity.space },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center px-3 py-2 text-[11px]"
                  style={{
                    border: "2px solid var(--color-border)",
                    boxShadow: "inset -1px -1px 0 0 var(--color-surface0), inset 1px 1px 0 0 var(--color-overlay1)",
                  }}
                >
                  <span style={{ color: "var(--color-subtext0)" }}>{label}</span>
                  <span style={{ color: "var(--color-text)" }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code */}
          <div className="lg:col-span-2">
            <div className="flex gap-1 mb-3">
              {codeLanguages.map((lang, i) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLang(i)}
                  className={`px-3 py-1 text-[10px] tracking-wider uppercase transition-all duration-100 ${
                    selectedLang === i ? "pixel-btn-primary" : "pixel-btn"
                  }`}
                  style={selectedLang !== i ? { color: "var(--color-overlay1)" } : {}}
                >
                  {lang}
                </button>
              ))}
            </div>
            <pre
              className="p-4 text-[11px] leading-relaxed overflow-x-auto whitespace-pre-wrap"
              style={{
                color: "var(--color-text)",
                border: "2px solid var(--color-border)",
                boxShadow: "inset 2px 2px 0 0 var(--color-surface0), inset -2px -2px 0 0 var(--color-overlay1)",
                background: "var(--color-crust)",
              }}
            >
              <code>{algo.code[codeLanguages[selectedLang]] || "// Coming soon"}</code>
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}
