"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  SITES,
  PAPERS,
  siteById,
  paperImage,
  type SiteId,
} from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const CELL_ORDER: SiteId[] = ["atl-ind", "atl-grp", "btl-ind", "btl-grp"];

/* compact line-icons per quadrant (ink glyphs) */
function RoleIcons({ id }: { id: SiteId }) {
  const s = { stroke: "currentColor", strokeWidth: 1.5, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const wrap = (children: React.ReactNode) => (
    <svg width="22" height="22" viewBox="0 0 24 24" {...s}>{children}</svg>
  );
  if (id === "atl-ind")
    return wrap(<><circle cx="8" cy="7" r="2.4" /><path d="M4 19c0-2.5 1.8-4.2 4-4.2" /><path d="M15 5l4 1.5-1.4 3.8" /><path d="M14 20l3-9" /></>);
  if (id === "atl-grp")
    return wrap(<><circle cx="12" cy="6" r="2" /><circle cx="6" cy="15" r="2" /><circle cx="18" cy="15" r="2" /><path d="M12 8v3M10.5 13l-3 1M13.5 13l3 1" /></>);
  if (id === "btl-ind")
    return wrap(<><rect x="3" y="5" width="12" height="9" rx="1.5" /><path d="M6 18h6M9 14v4" /><path d="M18 9v6M21 11v2" /></>);
  return wrap(<><circle cx="8" cy="8" r="2.6" /><path d="M8 5.4V4M8 12.6V14M11 8h1.4M4 8H2.6M10 6l1-1M5 11l-1 1M10 10l1 1M5 5 4 4" /><rect x="14" y="12" width="7" height="7" rx="1" /></>);
}

export default function LaborSites() {
  const [active, setActive] = useState<SiteId>("btl-ind");
  const site = siteById(active);

  const papers = useMemo(() => PAPERS.filter((p) => p.site === active), [active]);
  const cross = useMemo(() => PAPERS.filter((p) => p.site === "cross"), []);
  const shown = active === "cross" ? cross : papers;

  const exemplar = useMemo(() => {
    const withImg = shown.find((p) => paperImage(p.id));
    return withImg ? { name: withImg.name, src: paperImage(withImg.id)! } : null;
  }, [shown]);

  return (
    <section id="sites" className="relative mx-auto max-w-[var(--maxw)] px-6 py-28 sm:py-36">
      <SectionHeader
        eyebrow="Layer 1 · RQ1"
        num="01"
        accent="var(--atl-ind)"
        title={
          <>
            Labor Sites — <em>where</em>, and whose?
          </>
        }
      >
        <p className="lede">
          Every system sits somewhere in the production hierarchy. Two axes
          define the site: <strong className="font-semibold text-[var(--fg)]">ATL vs. BTL</strong>{" "}
          (above- vs. below-the-line creative position) and{" "}
          <strong className="font-semibold text-[var(--fg)]">Individual vs. Group</strong>{" "}
          (who is being assisted). Hover a quadrant to inspect it.
        </p>
      </SectionHeader>

      <div className="mt-16 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        {/* ---- native 2x2 diagram ---- */}
        <Reveal>
          <div className="flex gap-4">
            {/* vertical axis */}
            <div className="flex flex-col items-center">
              <span className="label mb-3 whitespace-nowrap [writing-mode:vertical-rl] [transform:rotate(180deg)]">
                Production Position
              </span>
              <div className="flex flex-1 flex-col justify-around">
                <AxisTick top>ATL</AxisTick>
                <AxisTick>BTL</AxisTick>
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-2 grid grid-cols-2">
                {["Individual", "Group"].map((t) => (
                  <span key={t} className="label text-center">{t}</span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {CELL_ORDER.map((id) => {
                  const s = siteById(id);
                  const on = active === id;
                  return (
                    <button
                      key={id}
                      onMouseEnter={() => setActive(id)}
                      onFocus={() => setActive(id)}
                      onClick={() => setActive(id)}
                      className="group relative flex min-h-[180px] flex-col justify-between overflow-hidden rounded-xl p-4 text-left transition-all duration-300"
                      style={{
                        background: s.soft,
                        outline: on ? `2px solid ${s.accent}` : "1px solid var(--border)",
                        outlineOffset: on ? "-1px" : "0",
                        boxShadow: on ? "var(--card-shadow)" : "none",
                        transform: on ? "translateY(-3px)" : "none",
                        color: "#20242c",
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <span style={{ color: s.accent }}>
                          <RoleIcons id={id} />
                        </span>
                        <span
                          className="font-display text-3xl font-light tabular-nums"
                          style={{ color: s.accent }}
                        >
                          {s.pct}
                        </span>
                      </div>
                      <div>
                        <p className="text-[0.82rem] font-semibold" style={{ color: s.accent }}>
                          {s.short}
                        </p>
                        <p className="mt-1 text-[0.72rem] font-medium leading-snug text-[#3a4048]">
                          {s.focus}
                        </p>
                        <p className="mt-1.5 text-[0.68rem] text-[#5c636d]">
                          {s.roles} · {s.count}/{PAPERS.length}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* cross-site */}
              <button
                onMouseEnter={() => setActive("cross")}
                onClick={() => setActive("cross")}
                className="mt-3 flex w-full items-center justify-between rounded-xl p-4 text-left transition-all"
                style={{
                  background: siteById("cross").soft,
                  outline: active === "cross" ? "2px solid var(--cross)" : "1px solid var(--border)",
                  outlineOffset: active === "cross" ? "-1px" : "0",
                  color: "#20242c",
                }}
              >
                <div>
                  <p className="text-[0.82rem] font-semibold">Cross-Site Assistance</p>
                  <p className="text-[0.72rem] text-[#5c636d]">
                    Systems spanning ATL &amp; BTL roles at once
                  </p>
                </div>
                <span className="font-display text-xl font-light">2 / 31</span>
              </button>

              <p className="label mt-3 text-center">Assistance Context →</p>
            </div>
          </div>
        </Reveal>

        {/* ---- detail panel ---- */}
        <Reveal delay={90}>
          <div
            className="card h-full overflow-hidden"
            style={{ borderColor: `${site.accent}44` }}
          >
            {exemplar && (
              <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-[var(--border)]">
                <Image
                  key={exemplar.src}
                  src={exemplar.src}
                  alt={`${exemplar.name} — representative system`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  style={{ objectFit: "cover" }}
                />
                <span className="absolute bottom-2 left-3 rounded bg-black/60 px-2 py-1 text-[0.68rem] font-medium text-white backdrop-blur">
                  e.g. {exemplar.name}
                </span>
              </div>
            )}
            <div className="p-6">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: `${site.accent}18`, color: site.accent }}
              >
                {site.label}
              </span>
              <div className="mt-4 flex items-baseline gap-3">
                <span
                  className="font-display text-5xl font-light tabular-nums"
                  style={{ color: site.accent }}
                >
                  {site.pct}
                </span>
                <span className="text-sm text-[var(--muted)]">
                  {site.count} of {PAPERS.length} systems
                </span>
              </div>

              <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="label">Roles assisted</dt>
                  <dd className="mt-1 font-medium">{site.roles}</dd>
                </div>
                <div>
                  <dt className="label">Core focus</dt>
                  <dd className="mt-1 font-medium">{site.focus}</dd>
                </div>
              </dl>

              <div className="mt-6">
                <p className="label">
                  {active === "cross" ? "Cross-site systems" : "Systems here"}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {shown.map((p) => (
                    <a
                      key={p.id}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-[var(--border)] px-2.5 py-1.5 text-xs transition-colors hover:border-[var(--border-strong)]"
                      title={`Open ${p.name} (DOI)`}
                    >
                      {p.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {[
          { k: "58.1%", v: "The corpus stays concentrated in BTL individual-level support — bounded, execution-oriented tasks that are easy to isolate and evaluate.", c: "var(--btl-ind)" },
          { k: "BTL › ATL", v: "BTL assistance is far more common than ATL. Creative direction resists formalization; operational craft does not.", c: "var(--atl-ind)" },
          { k: "2 / 31", v: "Cross-site positioning is still rare. Only two systems span multiple labor sites — an emerging, post-GenAI frontier.", c: "var(--cross)" },
        ].map((f, i) => (
          <Reveal key={i} delay={i * 90}>
            <div className="border-t border-[var(--hairline)] pt-4">
              <p className="font-display text-3xl font-light tabular-nums" style={{ color: f.c }}>
                {f.k}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{f.v}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={80}>
        <p className="mt-12 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
          <strong className="font-semibold text-[var(--fg)]">Why this distribution?</strong>{" "}
          Early work concentrated in BTL individual-level assistance because it
          targeted bounded, execution-oriented tasks — camera control, editing,
          animation, and asset manipulation — that are easy to isolate, build,
          and evaluate in single-user settings. ATL, group-level, and cross-site
          assistance emerged later because they involve harder-to-formalize
          labor: creative direction, coordination, and intent alignment across
          roles. This post-2022 diversification tracks the rise of generative
          AI, which should be seen as an <em className="font-display italic">accelerator</em>.
        </p>
      </Reveal>
    </section>
  );
}

function AxisTick({ children, top }: { children: React.ReactNode; top?: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${top ? "" : ""}`}>
      <span className="font-mono text-xs font-medium tracking-wide text-[var(--muted)]">
        {children}
      </span>
    </div>
  );
}
