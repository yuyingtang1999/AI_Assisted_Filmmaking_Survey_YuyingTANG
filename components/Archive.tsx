"use client";

import { useMemo, useState } from "react";
import {
  PAPERS,
  SITES,
  TYPES,
  siteById,
  typeById,
  type Paper,
  type SiteId,
  type LaborType,
} from "@/lib/data";
import Reveal from "./Reveal";
import PaperDrawer from "./PaperDrawer";

type GroupMode = "site" | "year" | "none";

function toggle<T>(set: Set<T>, v: T): Set<T> {
  const n = new Set(set);
  if (n.has(v)) n.delete(v);
  else n.add(v);
  return n;
}

export default function Archive() {
  const [sites, setSites] = useState<Set<SiteId>>(new Set());
  const [types, setTypes] = useState<Set<LaborType>>(new Set());
  const [venues, setVenues] = useState<Set<string>>(new Set());
  const [group, setGroup] = useState<GroupMode>("site");
  const [selected, setSelected] = useState<Paper | null>(null);

  const allVenues = useMemo(
    () => Array.from(new Set(PAPERS.map((p) => p.venue))).sort(),
    []
  );

  const filtered = useMemo(
    () =>
      PAPERS.filter(
        (p) =>
          (sites.size === 0 || sites.has(p.site)) &&
          (venues.size === 0 || venues.has(p.venue)) &&
          (types.size === 0 || p.laborTypes.some((t) => types.has(t)))
      ),
    [sites, types, venues]
  );

  const groups = useMemo(() => {
    if (group === "none") return [{ key: "all", label: "All systems", items: filtered }];
    if (group === "year") {
      const years = Array.from(new Set(filtered.map((p) => p.year))).sort();
      return years.map((y) => ({
        key: String(y),
        label: String(y),
        items: filtered.filter((p) => p.year === y),
      }));
    }
    return [...SITES]
      .map((s) => ({
        key: s.id,
        label: s.label,
        items: filtered.filter((p) => p.site === s.id),
      }))
      .filter((g) => g.items.length > 0);
  }, [filtered, group]);

  const anyFilter = sites.size || types.size || venues.size;

  return (
    <section id="archive" className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="chip">The Archive</span>
          <span className="h-px flex-1 bg-[var(--border)]" />
        </div>
        <h2 className="section-title mt-4">Explore All 31 Systems</h2>
        <p className="lede mt-5">
          The full corpus, playable. Filter by site, labor type, or venue;
          re-group the field; and click any system to open its paper. Colours
          encode the labor site.
        </p>
      </Reveal>

      {/* controls */}
      <Reveal delay={70}>
        <div className="card mt-10 p-5">
          <FilterRow label="Labor Site">
            {SITES.map((s) => (
              <Toggle
                key={s.id}
                on={sites.has(s.id)}
                color={s.accent}
                onClick={() => setSites(toggle(sites, s.id))}
              >
                {s.short}
              </Toggle>
            ))}
          </FilterRow>
          <FilterRow label="Labor Type">
            {TYPES.map((t) => (
              <Toggle
                key={t.id}
                on={types.has(t.id)}
                color={t.color}
                onClick={() => setTypes(toggle(types, t.id))}
              >
                {t.id}
              </Toggle>
            ))}
          </FilterRow>
          <FilterRow label="Venue">
            {allVenues.map((v) => (
              <Toggle
                key={v}
                on={venues.has(v)}
                color="#8a93a6"
                onClick={() => setVenues(toggle(venues, v))}
              >
                {v}
              </Toggle>
            ))}
          </FilterRow>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] pt-4">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-[var(--faint)]">
                Group by
              </span>
              {(["site", "year", "none"] as GroupMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setGroup(m)}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors"
                  style={{
                    background:
                      group === m ? "rgba(255,255,255,0.08)" : "transparent",
                    color: group === m ? "var(--fg)" : "var(--faint)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {m === "none" ? "Flat" : m}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[var(--muted)]">
                {filtered.length} / {PAPERS.length} shown
              </span>
              {anyFilter ? (
                <button
                  onClick={() => {
                    setSites(new Set());
                    setTypes(new Set());
                    setVenues(new Set());
                  }}
                  className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
                >
                  Clear filters
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </Reveal>

      {/* grid */}
      <div className="mt-10 space-y-10">
        {groups.map((g) => (
          <div key={g.key}>
            {group !== "none" && (
              <div className="mb-4 flex items-center gap-3">
                {group === "site" && (
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: siteById(g.key as SiteId).accent }}
                  />
                )}
                <h3 className="text-sm font-semibold tracking-tight">
                  {g.label}
                </h3>
                <span className="text-xs text-[var(--faint)]">
                  {g.items.length}
                </span>
                <span className="h-px flex-1 bg-[var(--border)]" />
              </div>
            )}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((p) => (
                <PaperCard key={p.id} p={p} onDetails={() => setSelected(p)} />
              ))}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="py-16 text-center text-sm text-[var(--faint)]">
            No systems match these filters.
          </p>
        )}
      </div>

      <PaperDrawer paper={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

/* ---------- pieces ---------- */

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 py-1.5 sm:flex-row sm:items-center">
      <span className="w-24 shrink-0 text-xs uppercase tracking-widest text-[var(--faint)]">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Toggle({
  on,
  color,
  onClick,
  children,
}: {
  on: boolean;
  color: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-full px-3 py-1 text-xs font-medium transition-all"
      style={{
        background: on ? `${color}26` : "rgba(255,255,255,0.03)",
        border: `1px solid ${on ? color : "var(--border)"}`,
        color: on ? "var(--fg)" : "var(--muted)",
      }}
    >
      {children}
    </button>
  );
}

function PaperCard({ p, onDetails }: { p: Paper; onDetails: () => void }) {
  const site = siteById(p.site);
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card group relative flex flex-col overflow-hidden p-4 transition-all duration-300 hover:-translate-y-1"
      style={{ borderColor: "var(--border)" }}
      title={`Open ${p.name} — opens the paper (DOI) in a new tab`}
    >
      <span
        className="absolute inset-y-0 left-0 w-1 transition-all group-hover:w-1.5"
        style={{ background: site.accent }}
      />
      <div className="flex items-start justify-between gap-2 pl-1">
        <h4 className="text-sm font-semibold leading-tight">{p.name}</h4>
        <svg
          className="mt-0.5 shrink-0 text-[var(--faint)] transition-colors group-hover:text-[var(--fg)]"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M5 3h6v6M11 3L4 10"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2 pl-1 text-[0.7rem] text-[var(--muted)]">
        <span
          className="rounded px-1.5 py-0.5"
          style={{ background: `${site.accent}22`, color: site.accent }}
        >
          {site.short}
        </span>
        <span>{p.venue}</span>
        <span className="text-[var(--faint)]">·</span>
        <span>{p.year}</span>
      </div>

      {p.tag && (
        <p className="mt-2 pl-1 text-[0.7rem] italic text-[var(--faint)]">
          {p.tag}
        </p>
      )}

      <div className="mt-3 flex items-center justify-between pl-1">
        <div className="flex gap-1">
          {p.laborTypes.map((t) => (
            <span
              key={t}
              className="h-2 w-2 rounded-full"
              style={{ background: typeById(t).color }}
              title={t}
            />
          ))}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDetails();
          }}
          className="rounded-md border border-[var(--border)] px-2 py-1 text-[0.68rem] text-[var(--muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--fg)]"
        >
          Details
        </button>
      </div>
    </a>
  );
}
