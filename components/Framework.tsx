"use client";

import { LAYERS, CORPUS } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import ResearchLandscape from "./ResearchLandscape";
import { useInView, useCountUp } from "./hooks";

const LAYER_ACCENT = ["var(--atl-ind)", "var(--struct)", "var(--meaning)"];

export default function Taxonomy() {
  return (
    <section id="taxonomy" className="relative mx-auto max-w-[var(--maxw)] px-6 py-28 sm:py-36">
      <SectionHeader
        eyebrow="The Taxonomy"
        num="00"
        accent="var(--meaning)"
        title={
          <>
            A three-layer <em>taxonomy</em> for reading AI in film
          </>
        }
      >
        <p className="lede">
          The survey reads {CORPUS.total} AI-assisted filmmaking systems —
          concentrated in {CORPUS.venues}, rising to a peak in {CORPUS.peak} —
          through three stacked questions. Each layer sharpens the last: from{" "}
          <em className="font-display italic text-[var(--fg)]">where</em>{" "}
          assistance lives, to{" "}
          <em className="font-display italic text-[var(--fg)]">what</em> labor it
          performs, to{" "}
          <em className="font-display italic text-[var(--fg)]">how</em> it is
          allocated between human and AI.
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

      <div className="mt-20 grid gap-0 md:grid-cols-3">
        {LAYERS.map((l, i) => (
          <Reveal key={l.id} delay={i * 110}>
            <a
              href={`#${l.id}`}
              className="group flex h-full flex-col border-t border-[var(--hairline)] pt-6 md:pr-8"
            >
              <div className="flex items-baseline justify-between">
                <span
                  className="font-display text-5xl font-semibold tabular-nums"
                  style={{ color: LAYER_ACCENT[i] }}
                >
                  {l.n}
                </span>
                <span className="label">{l.rq}</span>
              </div>
              <h3 className="t-h3 mt-6">{l.title}</h3>
              <p className="mt-1.5 text-[0.86rem] italic text-[var(--muted)]">
                {l.question}
              </p>
              <p className="mt-4 text-[0.92rem] leading-relaxed text-[var(--muted)]">
                {l.def}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[0.8rem] font-medium text-[var(--fg)]">
                <span className="border-b border-[var(--ink)] pb-0.5">Explore layer</span>
                <svg
                  className="transition-transform group-hover:translate-x-1"
                  width="13" height="13" viewBox="0 0 14 14" fill="none"
                >
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.4);
  const v = useCountUp(value, inView);
  return (
    <div ref={ref} className="card flex items-baseline gap-3 p-4 lg:flex-col lg:items-start lg:gap-1 lg:p-5">
      <p className="font-display text-4xl font-semibold tabular-nums sm:text-5xl">
        {Math.round(v)}
      </p>
      <p className="text-[0.72rem] leading-tight text-[var(--muted)]">
        {label}
      </p>
    </div>
  );
}
