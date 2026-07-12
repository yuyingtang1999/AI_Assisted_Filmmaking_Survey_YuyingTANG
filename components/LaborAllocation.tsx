"use client";

import { useMemo, useState } from "react";
import {
  TYPES,
  PAPERS,
  ALLOCATIONS,
  typeById,
  type LaborType,
  type Allocation,
} from "@/lib/data";
import Reveal from "./Reveal";

function counts(type: LaborType) {
  const c = { "Human Only": 0, HA: 0, "AI Only": 0 } as Record<Allocation, number>;
  PAPERS.forEach((p) => {
    const a = p.allocation[type];
    if (a) c[a] += 1;
  });
  return c;
}

export default function LaborAllocation() {
  const [active, setActive] = useState<LaborType>("Executional");
  const c = useMemo(() => counts(active), [active]);
  const total = c["Human Only"] + c.HA + c["AI Only"];
  const t = typeById(active);

  const humanShare = ((c["Human Only"] + c.HA * 0.5) / (total || 1)) * 100;

  return (
    <section id="allocation" className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="chip">Layer 3 · RQ3</span>
          <span className="h-px flex-1 bg-[var(--border)]" />
        </div>
        <h2 className="section-title mt-4">Labor Allocation — Who Leads?</h2>
        <p className="lede mt-5">
          For every labor type a system touches, the work is split between human
          and machine as <strong>human-only</strong>, <strong>AI-only</strong>, or{" "}
          <strong>human–AI collaboration</strong>. Select a labor type to see
          where control sits.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        {/* selector rows */}
        <div className="space-y-2.5">
          {TYPES.map((ty, i) => {
            const cc = counts(ty.id);
            const tot = cc["Human Only"] + cc.HA + cc["AI Only"];
            const on = active === ty.id;
            return (
              <Reveal key={ty.id} delay={i * 70}>
                <button
                  onClick={() => setActive(ty.id)}
                  onMouseEnter={() => setActive(ty.id)}
                  className="w-full rounded-2xl border p-4 text-left transition-all"
                  style={{
                    borderColor: on ? ty.color : "var(--border)",
                    background: on ? ty.soft : "rgba(255,255,255,0.02)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2.5 text-sm font-semibold">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: ty.color }}
                      />
                      {ty.id}
                    </span>
                    <span className="text-xs text-[var(--faint)]">
                      {tot} system{tot === 1 ? "" : "s"}
                    </span>
                  </div>
                  {/* stacked bar */}
                  <div className="mt-3 flex h-2.5 w-full overflow-hidden rounded-full bg-white/5">
                    {ALLOCATIONS.map((a) => {
                      const w = tot ? (cc[a.id] / tot) * 100 : 0;
                      return (
                        <div
                          key={a.id}
                          style={{ width: `${w}%`, background: a.color }}
                          className="h-full transition-all"
                        />
                      );
                    })}
                  </div>
                </button>
              </Reveal>
            );
          })}

          <div className="flex flex-wrap gap-3 pt-1">
            {ALLOCATIONS.map((a) => (
              <span key={a.id} className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: a.color }} />
                {a.label}
              </span>
            ))}
          </div>
        </div>

        {/* human vs AI stage */}
        <Reveal delay={90}>
          <div className="card h-full p-6">
            <div className="flex items-center justify-between">
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: t.soft, color: t.color }}
              >
                {t.id} labor
              </span>
              <span className="text-xs text-[var(--faint)]">
                {total} system{total === 1 ? "" : "s"} in scope
              </span>
            </div>

            {/* tug-of-war bar */}
            <div className="mt-6">
              <div className="flex justify-between text-xs font-medium">
                <span className="flex items-center gap-1.5 text-[var(--fg)]">
                  <HumanIcon /> Human
                </span>
                <span className="flex items-center gap-1.5 text-[var(--fg)]">
                  AI <AiIcon />
                </span>
              </div>
              <div className="relative mt-2 h-4 w-full overflow-hidden rounded-full bg-white/5">
                <div
                  className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                  style={{
                    width: `${humanShare}%`,
                    background:
                      "linear-gradient(90deg, #3b4a6b, #2f8f7f)",
                  }}
                />
                <div
                  className="absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-white/60 transition-all duration-500"
                  style={{ left: `${humanShare}%` }}
                />
              </div>
              <p className="mt-2 text-center text-xs text-[var(--faint)]">
                {Math.round(humanShare)}% human-weighted control
              </p>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {ALLOCATIONS.map((a) => (
                <div
                  key={a.id}
                  className="rounded-xl border border-[var(--border)] p-3 text-center"
                >
                  <p
                    className="text-2xl font-semibold tabular-nums"
                    style={{ color: a.color }}
                  >
                    {c[a.id]}
                  </p>
                  <p className="mt-1 text-[0.68rem] leading-tight text-[var(--muted)]">
                    {a.label}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 border-t border-[var(--border)] pt-4 text-sm leading-relaxed text-[var(--muted)]">
              {t.evolution}
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={80}>
        <div className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-6">
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            <strong className="text-[var(--fg)]">Finding.</strong> Human–AI
            collaboration concentrates in <em>executional</em> and{" "}
            <em>structural</em> work, where artifacts are concrete and feedback
            is immediate. <em>Meaning-making</em> and <em>relational</em> labor
            stay human-led — interpretation, aesthetic judgment, trust and
            accountability resist delegation. AI-only hand-off clusters in{" "}
            <em>BTL execution</em>; relational work remains human-only across the
            board.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function HumanIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="4.5" r="2.6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.5 14c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function AiIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <rect x="3" y="4" width="10" height="8" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 4V2M6 8h.01M10 8h.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
