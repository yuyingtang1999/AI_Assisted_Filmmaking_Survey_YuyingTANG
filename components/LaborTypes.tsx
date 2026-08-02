"use client";

import { useMemo, useState } from "react";
import { TYPES, YEARS, PAPERS, type LaborType } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import TypeCoverageChart from "./TypeCoverageChart";

export default function LaborTypes() {
  const [yearIdx, setYearIdx] = useState(YEARS.length - 1);
  const year = YEARS[yearIdx];

  // cumulative count of systems (up to `year`) touching each type
  const counts = useMemo(() => {
    const m = {} as Record<LaborType, number>;
    TYPES.forEach((t) => {
      m[t.id] = PAPERS.filter(
        (p) => p.year <= year && p.laborTypes.includes(t.id)
      ).length;
    });
    return m;
  }, [year]);

  const max = Math.max(...Object.values(counts), 1);

  const insight =
    year <= 2021
      ? "In 2021 the field is almost purely executional — AI accelerates concrete, bounded output."
      : "By 2025 structural and meaning-making support have expanded markedly with GenAI — yet relational labor stays scarce.";

  return (
    <section id="types" className="relative mx-auto max-w-[var(--maxw)] px-6 py-28 sm:py-36">
      <SectionHeader
        eyebrow="Layer 2 · RQ2"
        num="02"
        accent="var(--struct)"
        title={
          <>
            Labor Types — <em>What?</em>
          </>
        }
      >
        <p className="lede">
          Four forms of filmmaking labor are involved in system use. Drag the
          timeline to watch AI&apos;s reach spread outward from executional
          labor.
        </p>
      </SectionHeader>

      {/* type cards */}
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TYPES.map((t, i) => {
          const c = counts[t.id];
          const scale = 0.35 + 0.65 * (c / max);
          return (
            <Reveal key={t.id} delay={i * 80}>
              <div
                className="card relative h-full overflow-hidden p-5 transition-all duration-500"
                style={{
                  borderColor: c > 0 ? `${t.color}66` : "var(--border)",
                  background:
                    c > 0
                      ? `linear-gradient(180deg, ${t.soft}, transparent)`
                      : "linear-gradient(180deg, var(--panel), var(--panel-2))",
                  opacity: c > 0 ? 1 : 0.5,
                }}
              >
                <div className="flex items-center justify-between">
                  <TypeGlyph color={t.color} scale={scale} />
                  <span
                    className="text-3xl font-semibold tabular-nums transition-all duration-500"
                    style={{ color: t.color, opacity: c > 0 ? 1 : 0.4 }}
                  >
                    {c}
                  </span>
                </div>
                <h3 className="font-display mt-4 text-xl font-normal tracking-tight">{t.id}</h3>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-[var(--muted)]">
                  {t.definition}
                </p>
                <p className="mt-3 text-[0.72rem] italic text-[var(--faint)]">
                  {t.actions}
                </p>

                {/* progress bar of coverage at this year */}
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-[var(--track)]">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(c / PAPERS.length) * 100}%`,
                      background: t.color,
                    }}
                  />
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* timeline slider */}
      <Reveal delay={120}>
        <div className="card mt-10 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="label flex items-center gap-1.5">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4M6 11L2 7l4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Drag or tap a year — interactive
              </p>
              <p className="mt-1.5 text-sm text-[var(--muted)]">
                How many systems cover each labor type, up to
              </p>
            </div>
            <span className="font-display text-3xl font-semibold tabular-nums">
              {year}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={YEARS.length - 1}
            value={yearIdx}
            onChange={(e) => setYearIdx(Number(e.target.value))}
            className="mt-4 w-full accent-[var(--exec)]"
            aria-label="Year"
          />
          <div className="mt-1 flex justify-between font-mono text-xs text-[var(--faint)]">
            {YEARS.map((y) => (
              <button
                key={y}
                onClick={() => setYearIdx(YEARS.indexOf(y))}
                className="transition-colors hover:text-[var(--fg)]"
                style={{ color: y === year ? "var(--fg)" : undefined }}
              >
                {y}
              </button>
            ))}
          </div>
          <p className="mt-5 border-t border-[var(--border)] pt-4 text-sm leading-relaxed text-[var(--muted)]">
            {insight}
          </p>
        </div>
      </Reveal>

      <Reveal className="mt-12">
        <div className="card p-5 sm:p-6">
          <TypeCoverageChart />
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-10 rounded-xl border border-[var(--border)] bg-[var(--panel)] p-6">
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            <strong className="text-[var(--fg)]">The through-line.</strong>{" "}
            Coverage broadened from a stable executional core toward greater
            structural and meaning-making support, while relational labor —
            coordination and trust across people — remained limited throughout.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function TypeGlyph({ color, scale }: { color: string; scale: number }) {
  return (
    <span
      className="flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-500"
      style={{
        background: `${color}22`,
        border: `1px solid ${color}55`,
        transform: `scale(${scale})`,
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="3.2" stroke={color} strokeWidth="1.6" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={10 + Math.cos(a) * 5}
              y1={10 + Math.sin(a) * 5}
              x2={10 + Math.cos(a) * 8}
              y2={10 + Math.sin(a) * 8}
              stroke={color}
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          );
        })}
      </svg>
    </span>
  );
}
