"use client";

import { useMemo, useState } from "react";
import {
  PAPERS,
  SITES,
  TYPES,
  ALLOCATIONS,
  type SiteId,
  type LaborType,
  type Allocation,
} from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

/* ---- geometry ---- */
const W = 920;
const H = 470;
const NODE_W = 14;
const COL_X = { site: 30, type: W / 2 - NODE_W / 2, alloc: W - 30 - NODE_W };
const PAD_TOP = 12;
const GAP = 12;

type NodeBox = {
  key: string;
  label: string;
  color: string;
  value: number;
  x: number;
  y: number;
  h: number;
};

function layoutColumn(
  items: { key: string; label: string; color: string; value: number }[],
  x: number
): NodeBox[] {
  const totalVal = items.reduce((s, i) => s + i.value, 0);
  const avail = H - PAD_TOP * 2 - GAP * (items.length - 1);
  const scale = avail / (totalVal || 1);
  let y = PAD_TOP;
  return items.map((i) => {
    const h = Math.max(i.value * scale, 3);
    const box = { ...i, x, y, h };
    y += h + GAP;
    return box;
  });
}

export default function FlowDiagram() {
  const [hover, setHover] = useState<string | null>(null);

  const { siteNodes, typeNodes, allocNodes, ribbons } = useMemo(() => {
    // values
    const sVals = SITES.map((s) => ({
      key: `s:${s.id}`,
      label: s.short,
      color: s.accent,
      value: PAPERS.filter((p) => p.site === s.id).reduce(
        (n, p) => n + p.laborTypes.length,
        0
      ),
    }));
    const tVals = TYPES.map((t) => ({
      key: `t:${t.id}`,
      label: t.id,
      color: t.color,
      value: PAPERS.filter((p) => p.laborTypes.includes(t.id)).length,
    }));
    const aVals = ALLOCATIONS.map((a) => ({
      key: `a:${a.id}`,
      label: a.label,
      color: a.color,
      value: PAPERS.filter((p) =>
        Object.values(p.allocation).includes(a.id)
      ).reduce(
        (n, p) => n + Object.values(p.allocation).filter((x) => x === a.id).length,
        0
      ),
    }));

    const siteNodes = layoutColumn(sVals, COL_X.site);
    const typeNodes = layoutColumn(tVals, COL_X.type);
    const allocNodes = layoutColumn(aVals, COL_X.alloc);

    const byKey = (arr: NodeBox[], k: string) => arr.find((n) => n.key === k)!;

    // flows
    const siteType: { s: SiteId; t: LaborType; v: number }[] = [];
    SITES.forEach((s) =>
      TYPES.forEach((t) => {
        const v = PAPERS.filter(
          (p) => p.site === s.id && p.laborTypes.includes(t.id)
        ).length;
        if (v) siteType.push({ s: s.id, t: t.id, v });
      })
    );
    const typeAlloc: { t: LaborType; a: Allocation; v: number }[] = [];
    TYPES.forEach((t) =>
      ALLOCATIONS.forEach((a) => {
        const v = PAPERS.filter((p) => p.allocation[t.id] === a.id).length;
        if (v) typeAlloc.push({ t: t.id, a: a.id, v });
      })
    );

    // running offsets
    const outOff: Record<string, number> = {};
    const inOff: Record<string, number> = {};
    const scaleOf = (nodes: NodeBox[]) => {
      const tv = nodes.reduce((s, n) => s + n.value, 0);
      const avail = H - PAD_TOP * 2 - GAP * (nodes.length - 1);
      return avail / (tv || 1);
    };
    const sScale = scaleOf(siteNodes);
    const tScale = scaleOf(typeNodes);
    const aScale = scaleOf(allocNodes);

    const ribbons: {
      id: string;
      d: string;
      color: string;
      w: number;
      from: string;
      to: string;
    }[] = [];

    siteType.forEach(({ s, t, v }) => {
      const sn = byKey(siteNodes, `s:${s}`);
      const tn = byKey(typeNodes, `t:${t}`);
      const w = v * Math.min(sScale, tScale);
      const y1 = sn.y + (outOff[sn.key] ?? 0) + w / 2;
      const y2 = tn.y + (inOff[tn.key] ?? 0) + w / 2;
      outOff[sn.key] = (outOff[sn.key] ?? 0) + w;
      inOff[tn.key] = (inOff[tn.key] ?? 0) + w;
      const x1 = sn.x + NODE_W;
      const x2 = tn.x;
      const mx = (x1 + x2) / 2;
      ribbons.push({
        id: `s:${s}|t:${t}`,
        d: `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`,
        color: sn.color,
        w: Math.max(w, 1),
        from: sn.key,
        to: tn.key,
      });
    });

    const outOff2: Record<string, number> = {};
    typeAlloc.forEach(({ t, a, v }) => {
      const tn = byKey(typeNodes, `t:${t}`);
      const an = byKey(allocNodes, `a:${a}`);
      const w = v * Math.min(tScale, aScale);
      // continue stacking type node on its right (out) side
      const y1 = tn.y + (outOff2[tn.key] ?? 0) + w / 2;
      const y2 = an.y + (inOff[an.key] ?? 0) + w / 2;
      outOff2[tn.key] = (outOff2[tn.key] ?? 0) + w;
      inOff[an.key] = (inOff[an.key] ?? 0) + w;
      const x1 = tn.x + NODE_W;
      const x2 = an.x;
      const mx = (x1 + x2) / 2;
      ribbons.push({
        id: `t:${t}|a:${a}`,
        d: `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`,
        color: tn.color,
        w: Math.max(w, 1),
        from: tn.key,
        to: an.key,
      });
    });

    return { siteNodes, typeNodes, allocNodes, ribbons };
  }, []);

  const allNodes = [...siteNodes, ...typeNodes, ...allocNodes];
  const isRibbonLit = (r: { from: string; to: string }) =>
    !hover || r.from === hover || r.to === hover;

  return (
    <section id="synthesis" className="relative mx-auto max-w-[var(--maxw)] px-6 py-28 sm:py-36">
      <SectionHeader
        eyebrow="Synthesis"
        num="04"
        accent="var(--btl-grp)"
        title={
          <>
            The full <em>flow</em>
          </>
        }
      >
        <p className="lede">
          One picture of the whole corpus:{" "}
          <span style={{ color: "var(--atl-ind)" }}>where</span> assistance sits
          flows into <span style={{ color: "var(--struct)" }}>what</span> labor
          it performs, and onward to{" "}
          <span style={{ color: "var(--btl-grp)" }}>who</span> leads it. Hover any
          node to isolate its paths.
        </p>
      </SectionHeader>

      <Reveal delay={80}>
        <div className="card mt-12 overflow-x-auto p-4 sm:p-6">
          <div className="label mb-3 flex justify-between px-1">
            <span>Labor Sites</span>
            <span>Labor Types</span>
            <span>Allocation</span>
          </div>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full min-w-[680px]"
            onMouseLeave={() => setHover(null)}
          >
            {/* ribbons */}
            <g>
              {ribbons.map((r) => (
                <path
                  key={r.id}
                  d={r.d}
                  fill="none"
                  stroke={r.color}
                  strokeWidth={r.w}
                  strokeOpacity={isRibbonLit(r) ? 0.42 : 0.06}
                  style={{ transition: "stroke-opacity 0.25s" }}
                />
              ))}
            </g>
            {/* nodes */}
            <g>
              {allNodes.map((n) => {
                const lit = !hover || hover === n.key;
                const leftCol = n.x < W / 3;
                const rightCol = n.x > (2 * W) / 3;
                return (
                  <g
                    key={n.key}
                    onMouseEnter={() => setHover(n.key)}
                    style={{ cursor: "pointer" }}
                  >
                    <rect
                      x={n.x}
                      y={n.y}
                      width={NODE_W}
                      height={n.h}
                      rx={3}
                      fill={n.color}
                      opacity={lit ? 1 : 0.3}
                      style={{ transition: "opacity 0.25s" }}
                    />
                    <text
                      x={leftCol ? n.x + NODE_W + 8 : rightCol ? n.x - 8 : n.x + NODE_W / 2}
                      y={n.y + n.h / 2}
                      dominantBaseline="middle"
                      textAnchor={leftCol ? "start" : rightCol ? "end" : "middle"}
                      fontSize={12}
                      fontWeight={600}
                      fill="var(--fg)"
                      opacity={lit ? 0.92 : 0.35}
                      style={{ transition: "opacity 0.25s" }}
                    >
                      {!leftCol && !rightCol ? (
                        <tspan x={n.x + NODE_W / 2} dy={n.h < 26 ? -10 : 0}>
                          {n.label}
                        </tspan>
                      ) : (
                        n.label
                      )}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-[var(--faint)]">
          The dominant channel runs{" "}
          <strong className="text-[var(--btl-ind)]">BTL Individual</strong> →{" "}
          <strong className="text-[var(--exec)]">Executional</strong> →{" "}
          <strong className="text-[#2f8f7f]">Human–AI Collaboration</strong>.
          Relational threads appear only from group sites and remain entirely
          human-only.
        </p>
      </Reveal>
    </section>
  );
}
