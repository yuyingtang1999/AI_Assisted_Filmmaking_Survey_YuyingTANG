import { LAYERS, CORPUS } from "@/lib/data";
import Reveal from "./Reveal";

const LAYER_ACCENT = ["var(--atl-ind)", "var(--struct)", "var(--meaning)"];

export default function Framework() {
  return (
    <section id="framework" className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <Reveal>
        <p className="eyebrow">The Framework</p>
        <h2 className="section-title mt-3">A Three-Layer Taxonomy</h2>
        <p className="lede mt-5">
          Yuying&apos;s survey reads {CORPUS.total} AI-assisted filmmaking
          systems ({CORPUS.span}, concentrated in {CORPUS.venues}) through three
          stacked questions. Each layer sharpens the last: from{" "}
          <em>where</em> assistance lives, to <em>what</em> labor it performs, to{" "}
          <em>who</em> is in control.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {LAYERS.map((l, i) => (
          <Reveal key={l.id} delay={i * 110}>
            <a
              href={`#${l.id}`}
              className="card group relative block h-full overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <span
                className="absolute inset-x-0 top-0 h-1"
                style={{ background: LAYER_ACCENT[i] }}
              />
              <div className="flex items-center justify-between">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-lg font-semibold"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--border)",
                    color: LAYER_ACCENT[i],
                  }}
                >
                  {l.n}
                </span>
                <span className="chip">{l.rq}</span>
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">
                {l.title}
              </h3>
              <p
                className="mt-1 text-sm font-medium"
                style={{ color: LAYER_ACCENT[i] }}
              >
                {l.question}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                {l.def}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-[var(--faint)] transition-colors group-hover:text-[var(--fg)]">
                Explore layer
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
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

      {/* connective visual metaphor: film sprockets bridging to layers */}
      <Reveal delay={120}>
        <div className="mt-12 flex items-center justify-center gap-3 text-[var(--faint)]">
          <span className="h-px w-16 bg-[var(--border-strong)]" />
          <span className="font-mono text-xs tracking-widest">
            SITES → TYPES → ALLOCATION
          </span>
          <span className="h-px w-16 bg-[var(--border-strong)]" />
        </div>
      </Reveal>
    </section>
  );
}
