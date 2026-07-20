"use client";

import { useEffect, useState } from "react";
import { CORPUS } from "@/lib/data";

const PHRASE = "Who is really making the film?";

export default function Hero() {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setTyped(PHRASE.slice(0, i));
      if (i >= PHRASE.length) clearInterval(t);
    }, 52);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pt-24 pb-16"
    >
      <div className="mx-auto w-full max-w-[var(--maxw)]">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* left: editorial copy */}
          <div className="lg:col-span-7">
            <span className="label flex items-center gap-2.5">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: "var(--btl-grp)", animation: "pulseGlow 2.2s ease-in-out infinite" }}
              />
              UROP · A Visual Survey
            </span>

            <h1 className="font-display mt-7 text-[2.7rem] font-light leading-[1.0] tracking-[-0.022em] text-[var(--ink)] sm:text-[4.4rem]">
              <span className="caret">{typed || " "}</span>
            </h1>

            <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-[var(--muted)]">
              A survey of {CORPUS.total} AI-assisted filmmaking systems, mapping{" "}
              <em className="font-display not-italic text-[var(--ink)]">where</em>{" "}
              AI assistance sits in the production hierarchy,{" "}
              <em className="font-display not-italic text-[var(--ink)]">what</em>{" "}
              forms of labor it brings into scope, and{" "}
              <em className="font-display not-italic text-[var(--ink)]">how</em>{" "}
              that labor is allocated between human and AI.
            </p>

            {/* metadata row */}
            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2">
              <Meta k="Author" v="Yuying Tang" />
              <Dot />
              <Meta k="Supervisors" v="Prof. Huamin Qu · Prof. Xiaojuan Ma" />
              <Dot />
              <Meta k="Corpus" v={`${CORPUS.total} systems · through 2025`} />
            </div>
          </div>

          {/* right: bespoke line-art motif */}
          <div className="lg:col-span-5">
            <LensMotif />
          </div>
        </div>
      </div>

      <button
        onClick={() =>
          document.getElementById("framework")?.scrollIntoView({ behavior: "smooth" })
        }
        className="absolute inset-x-0 bottom-7 mx-auto flex w-max flex-col items-center gap-2 text-[var(--faint)] transition-colors hover:text-[var(--ink)]"
        style={{ animation: "floatY 2.6s ease-in-out infinite" }}
        aria-label="Scroll to begin"
      >
        <span className="label">Begin the survey</span>
        <svg width="16" height="24" viewBox="0 0 18 26" fill="none">
          <rect x="1" y="1" width="16" height="24" rx="8" stroke="currentColor" strokeOpacity="0.45" />
          <circle cx="9" cy="8" r="2.5" fill="currentColor" />
        </svg>
      </button>
    </section>
  );
}

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <span className="flex flex-col">
      <span className="label text-[0.6rem]">{k}</span>
      <span className="mt-0.5 text-sm font-medium text-[var(--fg)]">{v}</span>
    </span>
  );
}
function Dot() {
  return <span className="hidden h-8 w-px bg-[var(--hairline)] sm:block" />;
}

/** Film frame dissolving into a labor-node graph — the "lens → algorithm" motif. */
function LensMotif() {
  const nodes = [
    { x: 372, y: 46, c: "var(--exec)" },
    { x: 430, y: 92, c: "var(--struct)" },
    { x: 356, y: 116, c: "var(--meaning)" },
    { x: 418, y: 150, c: "var(--relational)" },
  ];
  const src = { x: 250, y: 100 };
  return (
    <div className="relative" style={{ animation: "floatY 6s ease-in-out infinite" }}>
      <svg viewBox="0 0 470 200" className="w-full" fill="none">
        {/* film strip */}
        <g stroke="var(--border-strong)" strokeWidth="1.4">
          <rect x="24" y="40" width="150" height="120" rx="8" />
          {[70, 100, 130].map((y, i) => (
            <line key={i} x1="24" y1={y} x2="174" y2={y} strokeOpacity="0.5" />
          ))}
        </g>
        {/* perforations */}
        <g fill="var(--border-strong)">
          {[40, 66, 92, 118, 144].map((y) => (
            <rect key={`l${y}`} x="30" y={y} width="6" height="9" rx="1.5" />
          ))}
          {[40, 66, 92, 118, 144].map((y) => (
            <rect key={`r${y}`} x="162" y={y} width="6" height="9" rx="1.5" />
          ))}
        </g>
        {/* connector fan (animated draw) */}
        <g stroke="var(--ink)" strokeOpacity="0.28" strokeWidth="1.2">
          {nodes.map((n, i) => (
            <path
              key={i}
              d={`M${src.x - 76},${src.y} C ${src.x},${src.y} ${n.x - 60},${n.y} ${n.x},${n.y}`}
              strokeDasharray="240"
              strokeDashoffset="240"
              style={{ animation: `dash 1.4s ease-out ${0.3 + i * 0.15}s forwards` }}
            />
          ))}
        </g>
        {/* inter-node links */}
        <g stroke="var(--ink)" strokeOpacity="0.18" strokeWidth="1">
          <line x1={nodes[0].x} y1={nodes[0].y} x2={nodes[1].x} y2={nodes[1].y} />
          <line x1={nodes[1].x} y1={nodes[1].y} x2={nodes[3].x} y2={nodes[3].y} />
          <line x1={nodes[2].x} y1={nodes[2].y} x2={nodes[1].x} y2={nodes[1].y} />
          <line x1={nodes[2].x} y1={nodes[2].y} x2={nodes[3].x} y2={nodes[3].y} />
        </g>
        {/* nodes */}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="9" fill={n.c} fillOpacity="0.16" />
            <circle cx={n.x} cy={n.y} r="4.5" fill={n.c} />
          </g>
        ))}
        {/* aperture mark on the strip */}
        <circle cx="99" cy="100" r="15" stroke="var(--atl-ind)" strokeWidth="1.4" strokeOpacity="0.7" />
        <circle cx="99" cy="100" r="4" fill="var(--atl-ind)" fillOpacity="0.7" />
      </svg>
      <div className="mt-2 flex justify-between px-2">
        <span className="label text-[0.58rem]">The Lens</span>
        <span className="label text-[0.58rem]">The Algorithm</span>
      </div>
    </div>
  );
}
