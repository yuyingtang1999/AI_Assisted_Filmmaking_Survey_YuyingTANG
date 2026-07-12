import Reveal from "./Reveal";

const TAKEAWAYS = [
  {
    n: "01",
    title: "AI is an accelerator, not an absolute creator.",
    body: "Across the corpus, meaning-making stays human-led. Generative models widen the space of options and speed execution, but the final creative judgment remains a human act.",
    color: "var(--exec)",
  },
  {
    n: "02",
    title: "The missing piece: relational labor.",
    body: "Coordination, hand-off, and trust between roles are barely supported. Relational labor appears only at group sites and almost never leaves human hands — a wide-open design frontier.",
    color: "var(--relational)",
  },
  {
    n: "03",
    title: "Job displacement & ethics remain unresolved.",
    body: "Copyright, transparency, and creative-labor markets surface repeatedly as challenges. As AI reaches from execution toward authorship, these questions grow more urgent.",
    color: "var(--meaning)",
  },
];

export default function Conclusion() {
  return (
    <section id="conclusion" className="relative overflow-hidden px-5 py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 45% at 50% 0%, rgba(95,130,216,0.14), transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="eyebrow text-center">Future Directions</p>
          <h2 className="section-title mt-3 text-center">Where This Points</h2>
        </Reveal>

        <div className="mt-14 space-y-4">
          {TAKEAWAYS.map((t, i) => (
            <Reveal key={t.n} delay={i * 120}>
              <div className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
                <span
                  className="font-mono text-4xl font-semibold tabular-nums sm:text-5xl"
                  style={{ color: t.color }}
                >
                  {t.n}
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                    {t.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    {t.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <a
              href="/ai-filmmaking-corpus.csv"
              download
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] px-5 py-3 text-sm font-medium transition-colors hover:bg-white/5"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 2v8m0 0L5 7m3 3l3-3M3 13h10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Download the corpus (CSV)
            </a>
            <p className="max-w-md text-xs text-[var(--faint)]">
              31 AI-assisted filmmaking systems, coded by labor site, labor type,
              and human–AI allocation, with source links.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
