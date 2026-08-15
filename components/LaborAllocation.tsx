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
import SectionHeader from "./SectionHeader";
import AllocationMethod from "./AllocationMethod";
import AllocationTimeline from "./AllocationTimeline";

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


  return (
    <section id="allocation" className="relative mx-auto max-w-[var(--maxw)] px-6 py-28 sm:py-36">
      <SectionHeader
        eyebrow="Layer 3 · RQ3"
        num="03"
        accent="var(--meaning)"
        title={
          <>
            Labor Allocation — <em>How?</em>
          </>
        }
      >
        <p className="lede">
          For every labor type a system touches, the work is allocated between
          human creators and AI systems as <strong>human-only</strong>,{" "}
          <strong>AI-only</strong>, or <strong>human–AI collaboration</strong>.
          Select a labor type to see how it splits.
        </p>
      </SectionHeader>

      <Reveal className="mt-12">
        <AllocationMethod />
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
                    background: on ? ty.soft : "var(--fill-2)",
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
                  <div className="mt-3 flex h-2.5 w-full overflow-hidden rounded-full bg-[var(--track)]">
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

            {/* allocation split bar (real proportions) */}
            <div className="mt-6">
              <div className="flex justify-between text-xs font-medium">
                <span className="flex items-center gap-1.5 text-[var(--fg)]">
                  <HumanIcon /> Human-only
                </span>
                <span className="flex items-center gap-1.5 text-[var(--fg)]">
                  AI-only <AiIcon />
                </span>
              </div>
              <div className="mt-2 flex h-4 w-full overflow-hidden rounded-full bg-[var(--track)]">
                {ALLOCATIONS.map((a) => {
                  const w = total ? (c[a.id] / total) * 100 : 0;
                  return (
                    <div
                      key={a.id}
                      className="h-full transition-all duration-500"
                      style={{ width: `${w}%`, background: a.color }}
                      title={`${a.label}: ${c[a.id]}`}
                    />
                  );
                })}
              </div>
              <p className="mt-2 text-center text-xs text-[var(--faint)]">
                Share of {total} system{total === 1 ? "" : "s"} that bring{" "}
                {t.id.toLowerCase()} labor into scope
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

      <Reveal delay={70}>
        <div className="mt-16">
          <p className="label">Over time · RQ3</p>
          <h3 className="t-h3 mt-2">How allocation shifted across the timeline</h3>
          <p className="lede mt-2 max-w-2xl">
            The same split, read year by year: as the corpus grew, where did
            human–AI collaboration expand, and where did work stay human-only?
          </p>
          <div className="card mt-6 p-5 sm:p-7">
            <AllocationTimeline />
          </div>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-6">
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            <strong className="text-[var(--fg)]">Finding.</strong> Human–AI
            collaboration concentrates in <em>executional</em> and{" "}
            <em>structural</em> work, where artifacts are concrete and feedback
            is immediate. For <em>meaning-making</em>, the human-only share is
            largest, and <em>relational</em> labor is entirely human-only —
            interpretation, aesthetic judgment, trust and accountability resist
            delegation. AI-only hand-off, in turn, clusters in{" "}
            <em>BTL execution</em>.
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
