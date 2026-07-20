import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const TAKEAWAYS = [
  {
    n: "01",
    title: "AI is an accelerator, not an absolute creator.",
    body: "Across the corpus, meaning-making stays human-led. Generative models widen the space of options and speed execution, but the final creative judgment remains a human act.",
    color: "var(--exec)",
  },
  {
    n: "02",
    title: "The missing piece is relational labor.",
    body: "Coordination, hand-off, and trust between roles are barely supported. Relational labor appears only at group sites and almost never leaves human hands — a wide-open design frontier.",
    color: "var(--relational)",
  },
  {
    n: "03",
    title: "Job displacement and ethics remain unresolved.",
    body: "Copyright, transparency, and creative-labor markets surface repeatedly as challenges. As AI reaches from execution toward authorship, these questions grow more urgent.",
    color: "var(--meaning)",
  },
];

export default function Conclusion() {
  return (
    <section id="conclusion" className="relative mx-auto max-w-[var(--maxw)] px-6 py-28 sm:py-36">
      <SectionHeader
        eyebrow="Future Directions"
        num="06"
        accent="var(--exec)"
        title={
          <>
            Where this <em>points</em>
          </>
        }
      >
        <p className="lede">
          Three through-lines emerge from the survey — one about AI&apos;s role,
          one about what is still missing, and one about what remains at stake.
        </p>
      </SectionHeader>

      <div className="mt-16">
        {TAKEAWAYS.map((t, i) => (
          <Reveal key={t.n} delay={i * 90}>
            <div className="grid grid-cols-1 gap-4 border-t border-[var(--hairline)] py-8 sm:grid-cols-12 sm:gap-8">
              <div className="sm:col-span-3">
                <span
                  className="font-display text-5xl font-normal italic tabular-nums sm:text-6xl"
                  style={{ color: t.color }}
                >
                  {t.n}
                </span>
              </div>
              <h3 className="font-display text-2xl font-normal leading-snug tracking-tight sm:col-span-5 sm:text-[1.7rem]">
                {t.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--muted)] sm:col-span-4 sm:pt-2">
                {t.body}
              </p>
            </div>
          </Reveal>
        ))}
        <div className="border-t border-[var(--hairline)]" />
      </div>

      <Reveal delay={80}>
        <div className="mt-14 flex flex-col items-start gap-5 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-xl font-medium">Take the data with you</p>
            <p className="mt-1 max-w-md text-sm text-[var(--muted)]">
              All 31 systems, coded by labor site, labor type, and human–AI
              allocation, with source links.
            </p>
          </div>
          <a
            href="/ai-filmmaking-corpus.csv"
            download
            className="inline-flex shrink-0 items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-[var(--on-accent)] transition-transform hover:scale-[1.02]"
            style={{ background: "var(--ink)" }}
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
        </div>
      </Reveal>
    </section>
  );
}
