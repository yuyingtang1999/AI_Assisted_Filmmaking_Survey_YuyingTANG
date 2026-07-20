"use client";

import { useMemo, useState } from "react";
import { PAPERS, SITES, siteById, type Paper, type SiteId } from "@/lib/data";

const VB_W = 920;
const VB_H = 460;
const M = { top: 28, right: 26, bottom: 46, left: 132 };
const YEARS = [2021, 2022, 2023, 2024, 2025];

// deterministic pseudo-random in [0,1) from an integer seed
function rand(seed: number) {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

type Node = { p: Paper; x: number; y: number; r: number; color: string };

export default function ResearchLandscape() {
  const [hover, setHover] = useState<string | null>(null);
  const [laneHi, setLaneHi] = useState<string | null>(null);

  const { nodes, lanes, xForYear } = useMemo(() => {
    const lanesArr = SITES.map((s) => s.id);
    const laneH = (VB_H - M.top - M.bottom) / lanesArr.length;
    const laneCenter = (id: SiteId) =>
      M.top + (lanesArr.indexOf(id) + 0.5) * laneH;
    const plotW = VB_W - M.left - M.right;
    const xForYear = (yr: number) =>
      M.left + 46 + ((yr - 2021) / 4) * (plotW - 92);

    const nodes: Node[] = PAPERS.map((p) => {
      const r1 = rand(p.id);
      const r2 = rand(p.id * 7 + 3);
      return {
        p,
        x: xForYear(p.year) + (r2 - 0.5) * 40,
        y: laneCenter(p.site) + (r1 - 0.5) * laneH * 0.62,
        r: 5 + p.laborTypes.length * 1.7,
        color: siteById(p.site).accent,
      };
    });
    return { nodes, lanes: { arr: lanesArr, h: laneH, center: laneCenter }, xForYear };
  }, []);

  const hoverNode = nodes.find((n) => n.p.id.toString() === hover) || null;

  return (
    <figure>
      <div className="relative">
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full select-none">
          {/* year gridlines + labels */}
          {YEARS.map((yr) => (
            <g key={yr}>
              <line
                x1={xForYear(yr)}
                y1={M.top - 6}
                x2={xForYear(yr)}
                y2={VB_H - M.bottom + 6}
                stroke="var(--hairline)"
                strokeDasharray="2 5"
              />
              <text
                x={xForYear(yr)}
                y={VB_H - M.bottom + 26}
                textAnchor="middle"
                className="font-mono"
                fontSize="12"
                fill="var(--faint)"
              >
                {yr}
              </text>
            </g>
          ))}

          {/* lane labels */}
          {lanes.arr.map((id) => {
            const s = siteById(id);
            const cy = lanes.center(id);
            const on = laneHi === id;
            return (
              <g
                key={id}
                onMouseEnter={() => setLaneHi(id)}
                onMouseLeave={() => setLaneHi(null)}
                style={{ cursor: "default" }}
              >
                <line
                  x1={M.left}
                  y1={cy}
                  x2={VB_W - M.right}
                  y2={cy}
                  stroke={on ? s.accent : "var(--hairline)"}
                  strokeOpacity={on ? 0.4 : 1}
                />
                <circle cx={M.left - 118 + 4} cy={cy} r="4" fill={s.accent} />
                <text
                  x={M.left - 104}
                  y={cy - 3}
                  fontSize="12"
                  fontWeight="600"
                  fill="var(--fg)"
                >
                  {s.short}
                </text>
                <text
                  x={M.left - 104}
                  y={cy + 12}
                  fontSize="10.5"
                  fill="var(--faint)"
                >
                  {s.count} system{s.count === 1 ? "" : "s"}
                </text>
              </g>
            );
          })}

          {/* nodes */}
          {nodes.map((n) => {
            const isHi = hover === n.p.id.toString();
            const dim =
              (hover && !isHi) || (laneHi && n.p.site !== laneHi);
            const influential = n.p.id === 1; // Dramatron — most cited
            return (
              <a
                key={n.p.id}
                href={n.p.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHover(n.p.id.toString())}
                onMouseLeave={() => setHover(null)}
                style={{ cursor: "pointer" }}
              >
                {influential && (
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={n.r + 5}
                    fill="none"
                    stroke={n.color}
                    strokeOpacity="0.5"
                    strokeDasharray="2 3"
                  />
                )}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={isHi ? n.r * 1.32 : n.r}
                  fill={n.color}
                  fillOpacity={dim ? 0.18 : isHi ? 0.95 : 0.72}
                  stroke={isHi ? "var(--ink)" : n.color}
                  strokeWidth={isHi ? 1.4 : 1}
                  style={{ transition: "r 0.15s, fill-opacity 0.2s" }}
                />
              </a>
            );
          })}
        </svg>

        {/* tooltip */}
        {hoverNode && (
          <div
            className="pointer-events-none absolute z-10 w-56 -translate-x-1/2 -translate-y-[115%] rounded-lg border border-[var(--border)] bg-[var(--panel)] p-3 shadow-[var(--card-shadow)]"
            style={{
              left: `${(hoverNode.x / VB_W) * 100}%`,
              top: `${(hoverNode.y / VB_H) * 100}%`,
            }}
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: hoverNode.color }} />
              <span className="text-sm font-semibold leading-tight">{hoverNode.p.name}</span>
            </div>
            <p className="mt-1 text-[0.7rem] text-[var(--muted)]">
              {siteById(hoverNode.p.site).short} · {hoverNode.p.venue} {hoverNode.p.year}
            </p>
            <p className="mt-1 text-[0.7rem] text-[var(--faint)]">
              {hoverNode.p.laborTypes.length} labor type
              {hoverNode.p.laborTypes.length === 1 ? "" : "s"} · click to open paper
            </p>
          </div>
        )}
      </div>

      {/* axis caption + legend */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <figcaption className="text-xs leading-relaxed text-[var(--faint)]">
          The corpus mapped by labor site and year — node size reflects labor
          scope. Hover for details; click any node to open its paper. The ringed
          node marks the most-cited system, Dramatron.
        </figcaption>
        <span className="label whitespace-nowrap">More recent →</span>
      </div>
    </figure>
  );
}
