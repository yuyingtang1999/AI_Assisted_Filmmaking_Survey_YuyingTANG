"use client";

import { useEffect } from "react";
import {
  TYPES,
  siteById,
  typeById,
  ALLOCATIONS,
  type Paper,
} from "@/lib/data";

export default function PaperDrawer({
  paper,
  onClose,
}: {
  paper: Paper | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (paper) {
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [paper, onClose]);

  const site = paper ? siteById(paper.site) : null;

  return (
    <div
      className="fixed inset-0 z-[60] transition-opacity duration-300"
      style={{
        pointerEvents: paper ? "auto" : "none",
        opacity: paper ? 1 : 0,
      }}
      aria-hidden={!paper}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <aside
        className="thin-scroll absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto border-l border-[var(--border)] bg-[var(--bg-2)] p-6 shadow-2xl transition-transform duration-300 sm:p-7"
        style={{ transform: paper ? "translateX(0)" : "translateX(100%)" }}
        role="dialog"
        aria-modal="true"
      >
        {paper && site && (
          <>
            <div className="flex items-start justify-between gap-4">
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: `${site.accent}22`, color: site.accent }}
              >
                {site.label}
              </span>
              <button
                onClick={onClose}
                className="rounded-lg border border-[var(--border)] p-1.5 text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4 4l8 8M12 4l-8 8"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <h3 className="mt-4 text-2xl font-semibold tracking-tight">
              {paper.name}
            </h3>
            <p className="mt-1 text-sm text-[var(--muted)]">
              {paper.venue} · {paper.year}
              {paper.tag ? (
                <span className="text-[var(--faint)]"> — {paper.tag}</span>
              ) : null}
            </p>

            {paper.desc && (
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                {paper.desc}
              </p>
            )}

            {/* labor types */}
            <div className="mt-6">
              <p className="text-xs uppercase tracking-widest text-[var(--faint)]">
                Labor types in scope
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {paper.laborTypes.map((t) => (
                  <span
                    key={t}
                    className="rounded-full px-2.5 py-1 text-xs font-medium"
                    style={{
                      background: typeById(t).soft,
                      color: typeById(t).color,
                      border: `1px solid ${typeById(t).color}44`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* allocation table */}
            <div className="mt-6">
              <p className="text-xs uppercase tracking-widest text-[var(--faint)]">
                Human–AI allocation
              </p>
              <div className="mt-2 overflow-hidden rounded-xl border border-[var(--border)]">
                {TYPES.filter((t) => paper.allocation[t.id]).map((t, i) => {
                  const a = paper.allocation[t.id]!;
                  const meta = ALLOCATIONS.find((x) => x.id === a)!;
                  return (
                    <div
                      key={t.id}
                      className="flex items-center justify-between px-3 py-2 text-sm"
                      style={{
                        borderTop: i ? "1px solid var(--border)" : "none",
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ background: t.color }}
                        />
                        {t.id}
                      </span>
                      <span
                        className="rounded px-2 py-0.5 text-xs font-medium"
                        style={{ background: `${meta.color}26`, color: meta.color }}
                      >
                        {meta.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {paper.benefit && (
              <Detail label="Benefits" body={paper.benefit} accent="#2f8f7f" />
            )}
            {paper.challenge && (
              <Detail label="Challenges" body={paper.challenge} accent="#b8543a" />
            )}

            <a
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              style={{ background: site.accent }}
            >
              Open paper (DOI)
              <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
                <path
                  d="M5 3h6v6M11 3L4 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <p className="mt-2 break-all text-center text-[0.68rem] text-[var(--faint)]">
              {paper.url}
            </p>
          </>
        )}
      </aside>
    </div>
  );
}

function Detail({
  label,
  body,
  accent,
}: {
  label: string;
  body: string;
  accent: string;
}) {
  return (
    <div className="mt-5">
      <p
        className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: accent }}
      >
        {label}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">{body}</p>
    </div>
  );
}
