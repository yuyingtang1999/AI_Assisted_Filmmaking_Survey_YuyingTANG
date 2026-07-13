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
import Figure from "./Figure";

const CELL_ORDER: SiteId[] = ["atl-ind", "atl-grp", "btl-ind", "btl-grp"];

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
    <section id="sites" className="relative mx-auto max-w-6xl px-5 py-28 sm:py-36">
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
          define the site: <strong>ATL vs. BTL</strong> (above- vs.
          below-the-line creative position) and{" "}
          <strong>Individual vs. Group</strong> (who is being assisted). Hover a
          quadrant to inspect it.
        </p>
      </SectionHeader>

      {/* official four-sites diagram from the deck */}
      <Reveal className="mt-12">
        <Figure
          src="/figures/sites-diagram.jpg"
          alt="The four labor sites arranged as an ATL/BTL by Individual/Group matrix, with role icons."
          caption="The four labor sites, as framed in the survey: ATL/BTL × Individual/Group, each assisting distinct production roles."
          ratio={2049 / 1029}
        />
      </Reveal>

      <div className="mt-14 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        {/* ---- 2x2 matrix ---- */}
        <Reveal>
          <div className="flex gap-3">
            <div className="flex flex-col items-center justify-around py-8">
              {["ATL", "BTL"].map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs tracking-widest text-[var(--faint)]"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex-1">
              <div className="mb-2 grid grid-cols-2 text-center">
                {["Individual", "Group"].map((t) => (
                  <span key={t} className="font-mono text-xs tracking-widest text-[var(--faint)]">
                    {t}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {CELL_ORDER.map((id) => {
                  const s = siteById(id);
                  const on = active === id;
                  return (
                    <button
                      key={id}
                      onMouseEnter={() => setActive(id)}
                      onFocus={() => setActive(id)}
                      onClick={() => setActive(id)}
                      className="group relative aspect-[4/3] overflow-hidden rounded-2xl p-4 text-left transition-all duration-300"
                      style={{
                        background: on
                          ? `linear-gradient(150deg, ${s.accent}30, ${s.accent}10)`
                          : "rgba(255,255,255,0.02)",
                        border: `1px solid ${on ? s.accent : "var(--border)"}`,
                        boxShadow: on ? `0 16px 44px -20px ${s.accent}` : "none",
                        transform: on ? "translateY(-2px)" : "none",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className="h-2.5 w-2.5 rounded-full transition-transform group-hover:scale-125"
                          style={{ background: s.accent }}
                        />
                        <span
                          className="font-display text-3xl font-medium tabular-nums"
                          style={{ color: on ? s.accent : "var(--faint)" }}
                        >
                          {s.pct}
                        </span>
                      </div>
                      <div className="absolute inset-x-4 bottom-4">
                        <p className="text-sm font-semibold">{s.short}</p>
                        <p className="mt-0.5 text-[0.72rem] leading-snug text-[var(--muted)]">
                          {s.roles}
                        </p>
                        <p className="mt-1 text-[0.7rem] text-[var(--faint)]">
                          {s.count} / {PAPERS.length} systems
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                onMouseEnter={() => setActive("cross")}
                onClick={() => setActive("cross")}
                className="mt-2.5 flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all"
                style={{
                  background:
                    active === "cross"
                      ? "linear-gradient(150deg, rgba(154,161,171,0.22), rgba(154,161,171,0.06))"
                      : "rgba(255,255,255,0.02)",
                  borderColor: active === "cross" ? "var(--cross)" : "var(--border)",
                }}
              >
                <div>
                  <p className="text-sm font-semibold">Cross-Site Assistance</p>
                  <p className="text-[0.72rem] text-[var(--muted)]">
                    Systems spanning ATL &amp; BTL roles at once
                  </p>
                </div>
                <span className="font-display text-xl font-medium text-[var(--faint)]">
                  2 / 31
                </span>
              </button>
            </div>
          </div>
        </Reveal>

        {/* ---- detail panel ---- */}
        <Reveal delay={90}>
          <div
            className="card h-full overflow-hidden transition-colors"
            style={{ borderColor: `${site.accent}55` }}
          >
            {exemplar && (
              <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-[var(--border)]">
                <Image
                  key={exemplar.src}
                  src={exemplar.src}
                  alt={`${exemplar.name} — representative system`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 460px"
                  style={{ objectFit: "cover" }}
                />
                <span className="absolute bottom-2 left-3 rounded-md bg-black/60 px-2 py-1 text-[0.68rem] font-medium backdrop-blur">
                  e.g. {exemplar.name}
                </span>
              </div>
            )}
            <div className="p-6">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: `${site.accent}22`, color: site.accent }}
              >
                {site.label}
              </span>
              <div className="mt-4 flex items-baseline gap-3">
                <span
                  className="font-display text-5xl font-medium tabular-nums"
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
                  <dt className="text-[var(--faint)]">Roles assisted</dt>
                  <dd className="mt-1 font-medium">{site.roles}</dd>
                </div>
                <div>
                  <dt className="text-[var(--faint)]">Core focus</dt>
                  <dd className="mt-1 font-medium">{site.focus}</dd>
                </div>
              </dl>

              <div className="mt-6">
                <p className="text-xs uppercase tracking-widest text-[var(--faint)]">
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
                      style={{ background: "rgba(255,255,255,0.02)" }}
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

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          { k: "58.1%", v: "The corpus stays concentrated in BTL individual-level support — bounded, execution-oriented tasks that are easy to isolate and evaluate.", c: "var(--btl-ind)" },
          { k: "BTL › ATL", v: "BTL assistance is far more common than ATL. Creative direction resists formalization; operational craft does not.", c: "var(--atl-ind)" },
          { k: "2 / 31", v: "Cross-site positioning is still rare. Only two systems span multiple labor sites — an emerging, post-GenAI frontier.", c: "var(--cross)" },
        ].map((f, i) => (
          <Reveal key={i} delay={i * 90}>
            <div className="card card-hover h-full p-5">
              <p className="font-display text-3xl font-medium tabular-nums" style={{ color: f.c }}>
                {f.k}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{f.v}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
