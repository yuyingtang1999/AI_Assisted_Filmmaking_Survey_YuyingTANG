"use client";

import { useMemo, useState } from "react";
import {
  TYPES,
  ALLOCATIONS,
  YEARS,
  allocationByTypeYear,
  typeById,
  type LaborType,
  type Allocation,
} from "@/lib/data";

const ALLOC_ORDER: Allocation[] = ["Human Only", "HA", "AI Only"];
const allocColor = (a: Allocation) => ALLOCATIONS.find((x) => x.id === a)!.color;
const allocLabel = (a: Allocation) => ALLOCATIONS.find((a2) => a2.id === a)!.label;

type Mode = "count" | "share";

export default function AllocationTimeline() {
  const [mode, setMode] = useState<Mode>("count");
  const [hi, setHi] = useState<Allocation | null>(null);

  return (
    <figure>
      {/* controls: legend (hover to isolate) + count/share toggle */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {ALLOC_ORDER.map((a) => (
            <button
              key={a}
              onMouseEnter={() => setHi(a)}
              onMouseLeave={() => setHi(null)}
              className="flex items-center gap-1.5 text-xs font-medium transition-opacity"
              style={{ opacity: hi && hi !== a ? 0.4 : 1 }}
            >
              <span className="h-2.5 w-2.5 rounded-sm" style={{ background: allocColor(a) }} />
              <span className="text-[var(--muted)]">{allocLabel(a)}</span>
            </button>
          ))}
        </div>
        <div className="flex overflow-hidden rounded-lg border border-[var(--border)]">
          {(["count", "share"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="px-3 py-1 text-xs font-medium transition-colors"
              style={{
                background: mode === m ? "var(--ink)" : "transparent",
                color: mode === m ? "var(--on-accent)" : "var(--muted)",
              }}
            >
              {m === "count" ? "Count" : "Share %"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        {TYPES.map((t) => (
          <Mini key={t.id} type={t.id} mode={mode} hi={hi} />
        ))}
      </div>

      <figcaption className="mt-5 text-xs leading-relaxed text-[var(--faint)]">
        How each labor type&rsquo;s allocation shifted over time — the systems
        introduced each year, split between human-only, human&ndash;AI
        collaboration, and AI-only. Human&ndash;AI collaboration leads executional
        and structural work; meaning-making stays majority human-only and
        relational labor entirely so. Hover a segment for exact counts; hover a
        legend key to isolate one allocation, or switch to within-year share.
      </figcaption>
    </figure>
  );
}

function Mini({ type, mode, hi }: { type: LaborType; mode: Mode; hi: Allocation | null }) {
  const [tip, setTip] = useState<
    { x: number; y: number; year: number; alloc: Allocation; count: number; total: number } | null
  >(null);

  const series = useMemo(() => allocationByTypeYear(type), [type]);
  const maxTotal = Math.max(1, ...series.map((s) => s.total));
  const yMax = mode === "share" ? 100 : Math.max(2, Math.ceil(maxTotal / 2) * 2);

  const VB_W = 320;
  const VB_H = 196;
  const M = { top: 20, right: 10, bottom: 30, left: 30 };
  const plotW = VB_W - M.left - M.right;
  const plotH = VB_H - M.top - M.bottom;
  const slot = plotW / YEARS.length;
  const barW = Math.min(30, slot * 0.6);
  const yOf = (v: number) => M.top + plotH - (v / yMax) * plotH;
  const ticks = mode === "share" ? [0, 50, 100] : [0, yMax / 2, yMax];
  const t = typeById(type);

  return (
    <div className="relative">
      <div className="mb-1 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: t.color }} />
        <span className="font-display text-sm font-semibold text-[var(--ink)]">{type} labor</span>
      </div>
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full" onMouseLeave={() => setTip(null)}>
        {/* gridlines + y labels */}
        {ticks.map((tk) => (
          <g key={tk}>
            <line x1={M.left} y1={yOf(tk)} x2={VB_W - M.right} y2={yOf(tk)} stroke="var(--hairline)" />
            <text x={M.left - 6} y={yOf(tk) + 3.5} textAnchor="end" fontSize="9.5" fill="var(--faint)">
              {mode === "share" ? `${tk}%` : tk}
            </text>
          </g>
        ))}

        {series.map((s, i) => {
          const cx = M.left + i * slot + slot / 2;
          const x = cx - barW / 2;
          let yCursor = M.top + plotH;
          return (
            <g key={s.year}>
              {s.total > 0 &&
                ALLOC_ORDER.map((a) => {
                  const c = s.counts[a];
                  if (!c) return null;
                  const v = mode === "share" ? (c / s.total) * 100 : c;
                  const h = (v / yMax) * plotH;
                  yCursor -= h;
                  const y = yCursor;
                  const dim = hi && hi !== a;
                  return (
                    <rect
                      key={a}
                      x={x}
                      y={y}
                      width={barW}
                      height={Math.max(h, 0.6)}
                      fill={allocColor(a)}
                      fillOpacity={dim ? 0.16 : 0.92}
                      style={{ transition: "fill-opacity 0.2s, height 0.35s, y 0.35s", cursor: "pointer" }}
                      onMouseEnter={() =>
                        setTip({ x: cx, y, year: s.year, alloc: a, count: c, total: s.total })
                      }
                    />
                  );
                })}
              {/* total label */}
              {mode === "count" && s.total > 0 && (
                <text x={cx} y={yOf(s.total) - 5} textAnchor="middle" fontSize="9.5" fontWeight="600" fill="var(--faint)">
                  {s.total}
                </text>
              )}
              {/* year label */}
              <text x={cx} y={VB_H - M.bottom + 15} textAnchor="middle" fontSize="10" fill="var(--muted)">
                {`’${String(s.year).slice(2)}`}
              </text>
            </g>
          );
        })}

        {/* axis line */}
        <line x1={M.left} y1={M.top + plotH} x2={VB_W - M.right} y2={M.top + plotH} stroke="var(--border-strong)" />
      </svg>

      {tip && (
        <div
          className="pointer-events-none absolute z-10 w-48 -translate-x-1/2 -translate-y-[112%] rounded-lg border border-[var(--border)] bg-[var(--panel)] p-2.5 shadow-[var(--card-shadow)]"
          style={{ left: `${(tip.x / VB_W) * 100}%`, top: `${(tip.y / VB_H) * 100}%` }}
        >
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-sm" style={{ background: allocColor(tip.alloc) }} />
            <span className="text-xs font-semibold">{allocLabel(tip.alloc)}</span>
          </div>
          <p className="mt-1 text-[0.7rem] text-[var(--muted)]">
            {type} · {tip.year}: {tip.count} of {tip.total} system{tip.total === 1 ? "" : "s"}
            {" "}({Math.round((tip.count / tip.total) * 100)}%)
          </p>
        </div>
      )}
    </div>
  );
}
