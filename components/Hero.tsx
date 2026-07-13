"use client";

import { useEffect, useMemo, useState } from "react";
import { CORPUS } from "@/lib/data";
import { useParallax } from "./hooks";

const PHRASE = "Who is really making the film?";
const SNIPPETS = [
  "gen(scene)", "align()", "render", "diffuse", "prompt →", "storyboard",
  "cut()", "kinematics", "previs", "LLM", "compose", "// direction",
  "frame_i", "t=2025", "collab", "sequence", "meaning?", "handoff",
];

export default function Hero() {
  const [typed, setTyped] = useState("");
  const [filmRef, filmOffset] = useParallax<HTMLDivElement>(0.12);
  const [contentRef, contentOffset] = useParallax<HTMLDivElement>(-0.05);

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setTyped(PHRASE.slice(0, i));
      if (i >= PHRASE.length) clearInterval(t);
    }, 52);
    return () => clearInterval(t);
  }, []);

  const columns = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => {
        const seed = (i * 9301 + 49297) % 233280;
        const r = seed / 233280;
        return {
          left: (i / 22) * 100 + (r * 3 - 1.5),
          delay: r * 8,
          dur: 7 + r * 8,
          text: SNIPPETS[i % SNIPPETS.length],
          op: 0.16 + r * 0.5,
        };
      }),
    []
  );

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* code rain */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {columns.map((c, i) => (
          <span
            key={i}
            className="absolute top-0 font-mono text-[11px] tracking-tight"
            style={{
              left: `${c.left}%`,
              color: "var(--meaning)",
              opacity: c.op,
              animation: `codeRain ${c.dur}s linear ${c.delay}s infinite`,
            }}
          >
            {c.text}
          </span>
        ))}
      </div>

      {/* film-strip band panning behind the title (parallax) */}
      <div
        ref={filmRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-28 -translate-y-1/2 opacity-[0.12]"
        style={{ transform: `translateY(calc(-50% + ${filmOffset}px))` }}
      >
        <div className="flex h-full w-[200%]" style={{ animation: "filmPan 42s linear infinite" }}>
          {Array.from({ length: 48 }).map((_, i) => (
            <div
              key={i}
              className="flex h-full flex-col justify-between border-x border-white/40 px-1"
              style={{ width: "4.1666%" }}
            >
              <div className="mt-1 h-2 rounded-sm bg-white/50" />
              <div className="h-14 rounded-sm bg-white/10" />
              <div className="mb-1 h-2 rounded-sm bg-white/50" />
            </div>
          ))}
        </div>
      </div>

      <div
        ref={contentRef}
        className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center"
        style={{ transform: `translateY(${contentOffset}px)` }}
      >
        <span className="chip mb-8">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--btl-grp)", animation: "pulseGlow 2.2s ease-in-out infinite" }}
          />
          UROP · Research Showcase
        </span>

        <p className="font-display mb-4 text-lg italic text-[var(--muted)] sm:text-xl">
          Algorithm behind the Lens
        </p>

        <h1 className="font-mono text-[1.7rem] font-semibold leading-tight tracking-tight sm:text-5xl">
          <span className="caret">{typed}</span>
        </h1>

        <p className="mt-9 max-w-xl text-pretty text-base leading-relaxed text-[var(--muted)] sm:text-lg">
          A survey of how AI is woven into filmmaking — mapping{" "}
          <span className="font-display italic text-[var(--fg)]">where</span>{" "}
          assistance sits,{" "}
          <span className="font-display italic text-[var(--fg)]">what</span>{" "}
          labor it touches, and{" "}
          <span className="font-display italic text-[var(--fg)]">who</span>{" "}
          ultimately leads the work, across {CORPUS.total} systems from{" "}
          {CORPUS.span}.
        </p>

        <p className="mt-5 font-mono text-[0.68rem] uppercase tracking-[0.25em] text-[var(--faint)]">
          Yuying Tang · Mapping the Labor Landscape of AI-Assisted Filmmaking
        </p>

        <button
          onClick={() =>
            document.getElementById("framework")?.scrollIntoView({ behavior: "smooth" })
          }
          className="mt-14 flex flex-col items-center gap-2 text-[var(--faint)] transition-colors hover:text-[var(--fg)]"
          style={{ animation: "floatY 2.6s ease-in-out infinite" }}
          aria-label="Scroll to begin"
        >
          <span className="text-[0.68rem] uppercase tracking-[0.25em]">Begin</span>
          <svg width="18" height="26" viewBox="0 0 18 26" fill="none">
            <rect x="1" y="1" width="16" height="24" rx="8" stroke="currentColor" strokeOpacity="0.5" />
            <circle cx="9" cy="8" r="2.5" fill="currentColor" />
          </svg>
        </button>
      </div>
    </section>
  );
}
