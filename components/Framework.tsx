"use client";

import { LAYERS, CORPUS } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import ResearchLandscape from "./ResearchLandscape";
import { useInView, useCountUp } from "./hooks";

const LAYER_ACCENT = ["var(--atl-ind)", "var(--struct)", "var(--meaning)"];

export default function Framework() {
  return (
    <section id="framework" className="relative mx-auto max-w-[var(--maxw)] px-6 py-28 sm:py-36">
      <SectionHeader
        eyebrow="The Framework"
        num="00"
        accent="var(--meaning)"
        title={
          <>
            A three-layer <em>taxonomy</em> for reading AI in film
          </>
        }
      >
        <p className="lede">
          Yuying&apos;s survey reads {CORPUS.total} AI-assisted filmmaking
          systems through three stacked questions. Each layer sharpens the last:
          from <em className="font-display italic text-[var(--fg)]">where</em>{" "}
          assistance lives, to{" "}
          <em className="font-display italic text-[var(--fg)]">what</em> labor it
          performs, to{" "}
          <em className="font-display italic text-[var(--fg)]">who</em> is in
          control.
        </p>
      </SectionHeader>

      {/* corpus stats + interactive research landscape */}
      <div className="mt-14 grid items-start gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
          <Stat value={CORPUS.total} label="systems surveyed" />
          <Stat value={3} label="analytical layers" />
          <Stat value={9} label="publication venues" />
        </div>
        <Reveal>
          <div className="card p-5 sm:p-6">
            <ResearchLandscape />
          </div>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-5 md:grid-cols-3">
        {LAYERS.map((l, i) => (
          <Reveal key={l.id} delay={i * 110}>
            <a
              href={`#${l.id}`}
              className="card card-hover group relative block h-full overflow-hidden p-6"
            >
              <span
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{ background: LAYER_ACCENT[i] }}
              />
              <div className="flex items-center justify-between">
                <span
                  className="font-display flex h-12 w-12 items-center justify-center rounded-xl text-xl font-medium italic"
                  style={{
                    background: "var(--fill-1)",
                    border: "1px solid var(--border)",
                    color: LAYER_ACCENT[i],
                  }}
                >
                  {l.n}
                </span>
                <span className="chip">{l.rq}</span>
              </div>
              <h3 className="font-display mt-5 text-2xl font-medium tracking-tight">
                {l.title}
              </h3>
              <p className="mt-1 text-sm font-medium" style={{ color: LAYER_ACCENT[i] }}>
                {l.question}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                {l.def}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-[var(--faint)] transition-colors group-hover:text-[var(--fg)]">
                Explore layer
                <svg
                  className="transition-transform group-hover:translate-x-1"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M3 7h8M7 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="mt-12 flex items-center justify-center gap-3 text-[var(--faint)]">
          <span className="h-px w-16 bg-[var(--border-strong)]" />
          <span className="font-mono text-xs tracking-[0.3em]">
            SITES → TYPES → ALLOCATION
          </span>
          <span className="h-px w-16 bg-[var(--border-strong)]" />
        </div>
      </Reveal>
    </section>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.4);
  const v = useCountUp(value, inView);
  return (
    <div ref={ref} className="card flex items-baseline gap-3 p-4 lg:flex-col lg:items-start lg:gap-1 lg:p-5">
      <p className="font-display text-4xl font-light tabular-nums sm:text-5xl">
        {Math.round(v)}
      </p>
      <p className="text-[0.72rem] leading-tight text-[var(--muted)]">
        {label}
      </p>
    </div>
  );
}
