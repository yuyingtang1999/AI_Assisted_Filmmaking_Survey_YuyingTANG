"use client";

import { useState } from "react";
import { ALLOCATIONS, type Allocation } from "@/lib/data";

const DEFS: Record<Allocation, string> = {
  "Human Only": "Explicit evidence of human labor only.",
  "AI Only": "Explicit evidence of AI labor only.",
  HA: "Evidence of both human and AI labor present.",
};
const colorOf = (id: Allocation) => ALLOCATIONS.find((a) => a.id === id)!.color;
const labelOf = (id: Allocation) => ALLOCATIONS.find((a) => a.id === id)!.label;

export default function AllocationMethod() {
  const [human, setHuman] = useState(true);
  const [ai, setAi] = useState(true);

  const derived: Allocation | null =
    human && ai ? "HA" : human ? "Human Only" : ai ? "AI Only" : null;

  return (
    <div className="card p-5 sm:p-7">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8">
        {/* Step 1 — evidence toggles */}
        <div className="lg:w-[280px] lg:shrink-0">
          <p className="label">Step 1 — Identify evidence</p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            For a given labor type, mark which kinds of labor a system shows.
          </p>
          <div className="mt-4 space-y-2.5">
            <EvidenceToggle label="Human labor" on={human} onClick={() => setHuman((v) => !v)} />
            <EvidenceToggle label="AI labor" on={ai} onClick={() => setAi((v) => !v)} />
          </div>
        </div>

        {/* arrow */}
        <div className="hidden items-center justify-center lg:flex">
          <svg width="34" height="20" viewBox="0 0 34 20" fill="none">
            <path d="M2 10h28M24 4l7 6-7 6" stroke="var(--border-strong)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Step 2 — derived label */}
        <div className="flex-1">
          <p className="label">Step 2 — Derive the allocation label</p>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
            {(["Human Only", "HA", "AI Only"] as Allocation[]).map((id) => {
              const active = derived === id;
              const c = colorOf(id);
              return (
                <div
                  key={id}
                  className="rounded-xl border p-3.5 transition-all"
                  style={{
                    borderColor: active ? c : "var(--border)",
                    background: active ? `${c}14` : "transparent",
                    opacity: derived && !active ? 0.5 : 1,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ background: c }} />
                    <span className="text-sm font-semibold" style={{ color: active ? c : "var(--fg)" }}>
                      {labelOf(id)}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[0.76rem] leading-snug text-[var(--muted)]">
                    {DEFS[id]}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-[var(--faint)]">
            {derived
              ? `Result: this labor type is coded ${labelOf(derived)}.`
              : "With no human or AI evidence, the labor type is out of scope."}
          </p>
        </div>
      </div>
    </div>
  );
}

function EvidenceToggle({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-xl border p-3 text-left transition-colors"
      style={{
        borderColor: on ? "var(--border-strong)" : "var(--border)",
        background: on ? "var(--fill-1)" : "transparent",
      }}
    >
      <span className="text-sm font-medium">{label}</span>
      <span
        className="flex h-5 w-5 items-center justify-center rounded-md border"
        style={{
          borderColor: on ? "var(--ink)" : "var(--border-strong)",
          background: on ? "var(--ink)" : "transparent",
        }}
      >
        {on && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6.5l2.5 2.5 4.5-5" stroke="var(--on-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
    </button>
  );
}
