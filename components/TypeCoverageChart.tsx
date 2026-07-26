"use client";

import { useMemo, useState } from "react";
import { PAPERS, SITES, TYPES, siteById, type LaborType, type SiteId } from "@/lib/data";

const VB_W = 720;
const VB_H = 360;
const M = { top: 18, right: 16, bottom: 66, left: 48 };
const PLOT_W = VB_W - M.left - M.right;
const PLOT_H = VB_H - M.top - M.bottom;

type Mode = "share" | "count";

export default function TypeCoverageChart() {
  const [mode, setMode] = useState<Mode>("share");
  const [hiType, setHiType] = useState<LaborType | null>(null);
  const [tip, setTip] = useState<
    { x: number; y: number; site: SiteId; type: LaborType; count: number; total: number } | null
  >(null);

  const sites = useMemo(() => SITES.filter((s) => s.id !== "cross"), []);
  const data = useMemo(() => {
    return sites.map((s) => {
      const inSite = PAPERS.filter((p) => p.site === s.id);
      const counts = {} as Record<LaborType, number>;
      TYPES.forEach((t) => {
        counts[t.id] = inSite.filter((p) => p.laborTypes.includes(t.id)).length;
      });
      return { site: s.id, total: inSite.length, counts };
    });
  }, [sites]);

  const yMax = mode === "share" ? 100 : 20;
  const ticks = mode === "share" ? [0, 25, 50, 75, 100] : [0, 5, 10, 15, 20];
  const val = (count: number, total: number) =>
    mode === "share" ? (total ? (count / total) * 100 : 0) : count;

  const groupW = PLOT_W / sites.length;
  const barW = 21;
  const gap = 6;
  const clusterW = TYPES.length * barW + (TYPES.length - 1) * gap;
  const yOf = (v: number) => M.top + PLOT_H - (v / yMax) * PLOT_H;

  return (
    <figure>
      {/* controls */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {TYPES.map((t) => (
            <button
              key={t.id}
              onMouseEnter={() => setHiType(t.id)}
              onMouseLeave={() => setHiType(null)}
              className="flex items-center gap-1.5 text-xs font-medium transition-opacity"
              style={{ opacity: hiType && hiType !== t.id ? 0.4 : 1 }}
            >
              <span className="h-2.5 w-2.5 rounded-sm" style={{ background: t.color }} />
              <span className="text-[var(--muted)]">{t.id}</span>
            </button>
          ))}
        </div>
        <div className="flex overflow-hidden rounded-lg border border-[var(--border)]">
          {(["share", "count"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="px-3 py-1 text-xs font-medium capitalize transition-colors"
              style={{
                background: mode === m ? "var(--ink)" : "transparent",
                color: mode === m ? "var(--on-accent)" : "var(--muted)",
              }}
            >
              {m === "share" ? "Coverage %" : "Count"}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full" onMouseLeave={() => setTip(null)}>
          {/* y gridlines + labels */}
          {ticks.map((tk) => (
            <g key={tk}>
              <line x1={M.left} y1={yOf(tk)} x2={VB_W - M.right} y2={yOf(tk)} stroke="var(--hairline)" />
              <text x={M.left - 8} y={yOf(tk) + 4} textAnchor="end" fontSize="11" fill="var(--faint)">
                {mode === "share" ? `${tk}%` : tk}
              </text>
            </g>
          ))}

          {data.map((d, gi) => {
            const gx = M.left + gi * groupW + (groupW - clusterW) / 2;
            const s = siteById(d.site);
            return (
              <g key={d.site}>
                {TYPES.map((t, bi) => {
                  const v = val(d.counts[t.id], d.total);
                  const x = gx + bi * (barW + gap);
                  const h = (v / yMax) * PLOT_H;
                  const dim = hiType && hiType !== t.id;
                  return (
                    <rect
                      key={t.id}
                      x={x}
                      y={M.top + PLOT_H - h}
                      width={barW}
                      height={Math.max(h, 0.5)}
                      rx={2}
                      fill={t.color}
                      fillOpacity={dim ? 0.2 : 0.9}
                      style={{ transition: "fill-opacity 0.2s, height 0.4s, y 0.4s", cursor: "pointer" }}
                      onMouseEnter={() =>
                        setTip({ x: x + barW / 2, y: M.top + PLOT_H - h, site: d.site, type: t.id, count: d.counts[t.id], total: d.total })
                      }
                    />
                  );
                })}
                {/* site label */}
                <text x={gx + clusterW / 2} y={VB_H - M.bottom + 22} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--fg)">
                  {s.short}
                </text>
                <text x={gx + clusterW / 2} y={VB_H - M.bottom + 38} textAnchor="middle" fontSize="10.5" fill="var(--faint)">
                  {d.total} system{d.total === 1 ? "" : "s"}
                </text>
              </g>
            );
          })}
          {/* axis line */}
          <line x1={M.left} y1={M.top + PLOT_H} x2={VB_W - M.right} y2={M.top + PLOT_H} stroke="var(--border-strong)" />
        </svg>

        {tip && (
          <div
            className="pointer-events-none absolute z-10 w-44 -translate-x-1/2 -translate-y-[112%] rounded-lg border border-[var(--border)] bg-[var(--panel)] p-2.5 shadow-[var(--card-shadow)]"
            style={{ left: `${(tip.x / VB_W) * 100}%`, top: `${(tip.y / VB_H) * 100}%` }}
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-sm" style={{ background: TYPES.find((t) => t.id === tip.type)!.color }} />
              <span className="text-xs font-semibold">{tip.type}</span>
            </div>
            <p className="mt-1 text-[0.7rem] text-[var(--muted)]">
              {siteById(tip.site).short}: {tip.count} of {tip.total} systems (
              {Math.round((tip.count / tip.total) * 100)}%)
            </p>
          </div>
        )}
      </div>

      <figcaption className="mt-3 text-xs leading-relaxed text-[var(--faint)]">
        Labor-type coverage across the four labor sites. Execution is always in
        scope; structural and meaning-making support are broader in ATL sites;
        relational labor appears only at group sites. Hover a bar for detail;
        toggle between within-site coverage and raw counts.
      </figcaption>
    </figure>
  );
}
