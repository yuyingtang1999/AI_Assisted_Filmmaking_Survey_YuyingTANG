"use client";

import { useMemo, useState } from "react";
import { PAPERS, siteById, type LaborType, type Allocation } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

/* ---- geometry ---- */
const W = 1020;
const H = 486;
const NODE_W = 14;
const ML = 150; // left margin for site labels
const MR = 178; // right margin for allocation labels
const TOP = 30; // room for column headers
const BOTTOM_CROSS = 74; // room for the separate cross-site band
const GAP = 9;
const FLOW_H = H - TOP - BOTTOM_CROSS - 8;
const COL = { site: ML, type: W / 2 - NODE_W / 2, alloc: W - MR - NODE_W };

/* ---- slide-matched palette ---- */
const SITE_C: Record<string, string> = {
  "atl-ind": "#df8a41",
  "btl-ind": "#5a9e64",
  "atl-grp": "#8c66ac",
  "btl-grp": "#5f8cbe",
};
const CROSS_C = "#8f8f8f";
const TYPE_C = "#b3b3b3";
const ALLOC_C: Record<Allocation, string> = {
  "Human Only": "#8c7346",
  "AI Only": "#9a9a9a",
  HA: "#7c6199",
};
const ALLOC_LABEL: Record<Allocation, string> = {
  "Human Only": "Human only",
  "AI Only": "AI only",
  HA: "Human-AI Collaboration",
};

const SITE_ORDER = ["atl-ind", "btl-ind", "atl-grp", "btl-grp"] as const;
const TYPE_ORDER: LaborType[] = ["Executional", "Structural", "Meaning-Making", "Relational"];
const ALLOC_ORDER: Allocation[] = ["Human Only", "AI Only", "HA"];

type Node = { key: string; label: string; sub: string; color: string; x: number; y: number; h: number };
type Ribbon = { id: string; d: string; color: string; w: number; from: string; to: string; mx: number; my: number; label: string; value: number };

export default function FlowDiagram() {
  const [hover, setHover] = useState<{ kind: "node" | "ribbon" | "cross"; id: string } | null>(null);
  const [tip, setTip] = useState<{ x: number; y: number; title: string; sub: string } | null>(null);
  const crossPapers = useMemo(() => PAPERS.filter((p) => p.site === "cross"), []);

  const model = useMemo(() => {
    const main = PAPERS.filter((p) => p.site !== "cross");
    const siteVal = (s: string) => PAPERS.filter((p) => p.site === s).reduce((n, p) => n + p.laborTypes.length, 0);
    const sitePapers = (s: string) => PAPERS.filter((p) => p.site === s).length;
    const typeVal = (t: LaborType) => main.filter((p) => p.laborTypes.includes(t)).length;
    const allocVal = (a: Allocation) =>
      main.reduce((n, p) => n + TYPE_ORDER.filter((t) => p.laborTypes.includes(t) && p.allocation[t] === a).length, 0);

    const total = TYPE_ORDER.reduce((n, t) => n + typeVal(t), 0);
    const SCALE = (FLOW_H - GAP * 3) / total;

    const layout = (items: { key: string; value: number; label: string; sub: string; color: string }[], x: number): Node[] => {
      let y = TOP;
      return items.map((it) => {
        const h = it.value * SCALE;
        const node = { ...it, x, y, h };
        y += h + GAP;
        return node;
      });
    };

    const siteNodes = layout(SITE_ORDER.map((s) => ({ key: `s:${s}`, value: siteVal(s), label: siteById(s).short, sub: `n=${sitePapers(s)}`, color: SITE_C[s] })), COL.site);
    const typeNodes = layout(TYPE_ORDER.map((t) => ({ key: `t:${t}`, value: typeVal(t), label: t, sub: `n=${typeVal(t)}`, color: TYPE_C })), COL.type);
    const allocNodes = layout(ALLOC_ORDER.map((a) => ({ key: `a:${a}`, value: allocVal(a), label: ALLOC_LABEL[a], sub: `n=${allocVal(a)}`, color: ALLOC_C[a] })), COL.alloc);
    const byKey = (arr: Node[], k: string) => arr.find((n) => n.key === k)!;

    const outOff: Record<string, number> = {};
    const inOff: Record<string, number> = {};
    const ribbons: Ribbon[] = [];

    SITE_ORDER.forEach((s) => {
      TYPE_ORDER.forEach((t) => {
        const v = PAPERS.filter((p) => p.site === s && p.laborTypes.includes(t)).length;
        if (!v) return;
        const sn = byKey(siteNodes, `s:${s}`), tn = byKey(typeNodes, `t:${t}`), w = v * SCALE;
        const y1 = sn.y + (outOff[sn.key] ?? 0) + w / 2, y2 = tn.y + (inOff[tn.key] ?? 0) + w / 2;
        outOff[sn.key] = (outOff[sn.key] ?? 0) + w; inOff[tn.key] = (inOff[tn.key] ?? 0) + w;
        const x1 = sn.x + NODE_W, x2 = tn.x, mx = (x1 + x2) / 2;
        ribbons.push({ id: `${s}>${t}`, d: `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`, color: SITE_C[s], w, from: sn.key, to: tn.key, mx, my: (y1 + y2) / 2, label: `${siteById(s).short} → ${t}`, value: v });
      });
    });

    const outOff2: Record<string, number> = {};
    TYPE_ORDER.forEach((t) => {
      ALLOC_ORDER.forEach((a) => {
        const v = main.filter((p) => p.laborTypes.includes(t) && p.allocation[t] === a).length;
        if (!v) return;
        const tn = byKey(typeNodes, `t:${t}`), an = byKey(allocNodes, `a:${a}`), w = v * SCALE;
        const y1 = tn.y + (outOff2[tn.key] ?? 0) + w / 2, y2 = an.y + (inOff[an.key] ?? 0) + w / 2;
        outOff2[tn.key] = (outOff2[tn.key] ?? 0) + w; inOff[an.key] = (inOff[an.key] ?? 0) + w;
        const x1 = tn.x + NODE_W, x2 = an.x, mx = (x1 + x2) / 2;
        ribbons.push({ id: `${t}>${a}`, d: `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`, color: ALLOC_C[a], w, from: tn.key, to: an.key, mx, my: (y1 + y2) / 2, label: `${t} → ${ALLOC_LABEL[a]}`, value: v });
      });
    });

    return { siteNodes, typeNodes, allocNodes, ribbons };
  }, []);

  const nodes = [...model.siteNodes, ...model.typeNodes, ...model.allocNodes];

  // full-path highlight: hovering a node lights every ribbon on a path through it
  const { litRibbons, litNodes } = useMemo(() => {
    if (!hover) return { litRibbons: null as Set<string> | null, litNodes: null as Set<string> | null };
    const R = model.ribbons;
    const set = new Set<string>();
    if (hover.kind === "cross") {
      return { litRibbons: set, litNodes: new Set<string>() }; // dim the whole main flow
    }
    if (hover.kind === "ribbon") {
      set.add(hover.id);
    } else {
      const key = hover.id;
      if (key.startsWith("s:")) {
        R.filter((r) => r.from === key).forEach((r) => { set.add(r.id); R.filter((r2) => r2.from === r.to).forEach((r2) => set.add(r2.id)); });
      } else if (key.startsWith("t:")) {
        R.filter((r) => r.from === key || r.to === key).forEach((r) => set.add(r.id));
      } else {
        R.filter((r) => r.to === key).forEach((r) => { set.add(r.id); R.filter((r2) => r2.to === r.from).forEach((r2) => set.add(r2.id)); });
      }
    }
    const litN = new Set<string>();
    R.forEach((r) => { if (set.has(r.id)) { litN.add(r.from); litN.add(r.to); } });
    if (hover.kind === "node") litN.add(hover.id);
    return { litRibbons: set, litNodes: litN };
  }, [hover, model.ribbons]);

  const crossY = TOP + FLOW_H + 26;
  const segH = 13;

  return (
    <section id="synthesis" className="relative mx-auto max-w-[var(--maxw)] px-6 py-28 sm:py-36">
      <SectionHeader eyebrow="Synthesis" num="04" accent="var(--btl-grp)" title={<>The full <em>flow</em></>}>
        <p className="lede">
          The whole corpus in one view: labor sites flow into the labor types
          they bring into scope, and onward to how each is allocated between
          human and AI. Hover any node to trace its full path, or a band for its
          count.
        </p>
      </SectionHeader>

      <Reveal delay={80}>
        <div className="card mt-12 overflow-x-auto p-4 sm:p-6">
          <div className="relative">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[760px]" onMouseLeave={() => { setHover(null); setTip(null); }}>
              {/* column headers */}
              {[["Labor Sites", COL.site], ["Labor Types", COL.type], ["Allocation", COL.alloc]].map(([t, x]) => (
                <text key={t as string} x={(x as number) + NODE_W / 2} y={14} textAnchor="middle" fontFamily="var(--font-sans-stack)" fontSize="11" fontWeight="600" letterSpacing="1.2" fill="var(--faint)">
                  {(t as string).toUpperCase()}
                </text>
              ))}

              {/* ribbons (visible + wide invisible hit path) */}
              {model.ribbons.map((r) => {
                const on = !litRibbons || litRibbons.has(r.id);
                return (
                  <g key={r.id}>
                    <path d={r.d} fill="none" stroke={r.color} strokeWidth={r.w} strokeOpacity={on ? 0.5 : 0.07} style={{ transition: "stroke-opacity 0.2s" }} />
                    <path
                      d={r.d} fill="none" stroke="transparent" strokeWidth={Math.max(r.w, 14)}
                      style={{ cursor: "pointer" }}
                      onMouseEnter={() => { setHover({ kind: "ribbon", id: r.id }); setTip({ x: r.mx, y: r.my, title: r.label, sub: `${r.value} system${r.value === 1 ? "" : "s"}` }); }}
                      onMouseLeave={() => setTip(null)}
                    />
                  </g>
                );
              })}

              {/* nodes */}
              {nodes.map((n) => {
                const on = !litNodes || litNodes.has(n.key);
                const left = n.x < W / 3;
                const anchorX = left ? n.x - 10 : n.x + NODE_W + 10;
                return (
                  <g key={n.key} onMouseEnter={() => setHover({ kind: "node", id: n.key })} style={{ cursor: "pointer" }}>
                    {/* wide hit area */}
                    <rect x={n.x - 6} y={n.y - 3} width={NODE_W + 12} height={n.h + 6} fill="transparent" />
                    <rect x={n.x} y={n.y} width={NODE_W} height={Math.max(n.h, 1)} rx={2} fill={n.color} opacity={on ? 1 : 0.25} style={{ transition: "opacity 0.2s" }} />
                    <text x={anchorX} y={n.y + n.h / 2 - 1} textAnchor={left ? "end" : "start"} dominantBaseline="middle" fontSize="12.5" fontWeight="600" fill="var(--fg)" opacity={on ? 0.95 : 0.35} style={{ transition: "opacity 0.2s", paintOrder: "stroke", stroke: "var(--panel)", strokeWidth: 3 } as React.CSSProperties}>
                      <tspan>{n.label}</tspan>
                      <tspan x={anchorX} dy="14" fontSize="11" fontWeight="400" fill="var(--faint)">({n.sub})</tspan>
                    </text>
                  </g>
                );
              })}

              {/* cross-site — separate, two sources, each a clickable system */}
              <g opacity={hover && hover.kind !== "cross" ? 0.4 : 1} style={{ transition: "opacity 0.2s" }}>
                <rect x={COL.site + NODE_W} y={crossY} width={COL.type - (COL.site + NODE_W)} height={segH * 2 + 4} fill={CROSS_C} opacity={0.26} />
                {crossPapers.map((p, i) => {
                  const y = crossY + i * (segH + 4);
                  const on = !hover || (hover.kind === "cross" && hover.id === `c:${i}`);
                  return (
                    <a
                      key={p.id}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => { setHover({ kind: "cross", id: `c:${i}` }); setTip({ x: COL.site + NODE_W + 24, y: y + segH / 2, title: p.name, sub: `Cross-site · ${p.venue} ${p.year} · click to open` }); }}
                      onMouseLeave={() => setTip(null)}
                      style={{ cursor: "pointer" }}
                    >
                      <rect x={COL.site - 6} y={y - 2} width={COL.type - COL.site + 6} height={segH + 4} fill="transparent" />
                      <rect x={COL.site} y={y} width={NODE_W} height={segH} rx={2} fill={CROSS_C} opacity={on ? 1 : 0.5} style={{ transition: "opacity 0.2s" }} />
                    </a>
                  );
                })}
                <text x={COL.site - 10} y={crossY + segH} textAnchor="end" dominantBaseline="middle" fontSize="12.5" fontWeight="600" fill="var(--fg)">
                  <tspan>Cross Site</tspan>
                  <tspan x={COL.site - 10} dy="14" fontSize="11" fontWeight="400" fill="var(--faint)">(n=2)</tspan>
                </text>
                <text x={COL.type + 10} y={crossY + segH + 2} dominantBaseline="middle" fontSize="11" fill="var(--faint)">
                  2 systems, shown separately — hover or click each
                </text>
              </g>
            </svg>

            {tip && (
              <div
                className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[125%] whitespace-nowrap rounded-lg border border-[var(--border)] bg-[var(--panel)] px-3 py-2 shadow-[var(--card-shadow)]"
                style={{ left: `${(tip.x / W) * 100}%`, top: `${(tip.y / H) * 100}%` }}
              >
                <p className="text-xs font-semibold">{tip.title}</p>
                <p className="mt-0.5 text-[0.7rem] text-[var(--muted)]">{tip.sub}</p>
              </div>
            )}
          </div>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--panel)] p-6">
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            <strong className="text-[var(--fg)]">The dominant channel.</strong>{" "}
            Flow runs{" "}
            <strong style={{ color: SITE_C["btl-ind"] }}>BTL Individual</strong> →{" "}
            <strong className="text-[var(--fg)]">Executional</strong> →{" "}
            <strong style={{ color: ALLOC_C.HA }}>Human-AI Collaboration</strong>.
            Relational labor appears only from group sites and remains entirely
            human-only. The two cross-site systems are set aside from the
            decomposition.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
