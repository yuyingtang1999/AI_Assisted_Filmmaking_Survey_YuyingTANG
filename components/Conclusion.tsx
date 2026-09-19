import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import DownloadCorpus from "./DownloadCorpus";

const TAKEAWAYS = [
  {
    n: "01",
    label: "On labor sites",
    title: "Assistance stays concentrated in below-the-line (BTL) individual.",
    body: "58.1% of systems target BTL individual-level work; ATL, group-level, and cross-site assistance remain comparatively rare, with only two systems spanning multiple labor sites.",
    color: "var(--atl-ind)",
  },
  {
    n: "02",
    label: "On labor types",
    title: "Support broadened from a stable executional core toward structure and meaning.",
    body: "Execution is always in scope; structural and meaning-making support grew over time, while relational labor remained limited and appears only at group sites.",
    color: "var(--struct)",
  },
  {
    n: "03",
    label: "On labor allocation",
    title: "Collaboration concentrates in execution; meaning and relations stay human-only.",
    body: "Human–AI collaboration clusters in executional and structural work; for meaning-making the human-only share is largest and relational labor is entirely human-only, while AI-only delegation concentrates in BTL execution.",
    color: "var(--meaning)",
  },
];

export default function Conclusion() {
  return (
    <section id="conclusion" className="relative mx-auto max-w-[var(--maxw)] px-6 py-28 sm:py-36">
      <SectionHeader
        eyebrow="Conclusion"
        num="06"
        accent="var(--exec)"
        title={
          <>
            What the survey <em>finds</em>
          </>
        }
      >
        <p className="lede">
          Three findings, one per layer of the taxonomy — on where assistance
          sits, what labor it performs, and how that labor is allocated.
        </p>
      </SectionHeader>

      <div className="mt-16">
        {TAKEAWAYS.map((t, i) => (
          <Reveal key={t.n} delay={i * 90}>
            <div className="grid grid-cols-1 gap-4 border-t border-[var(--hairline)] py-8 sm:grid-cols-12 sm:gap-8">
              <div className="sm:col-span-3">
                <span
                  className="font-display text-5xl font-semibold tabular-nums sm:text-6xl"
                  style={{ color: t.color }}
                >
                  {t.n}
                </span>
                <p className="label mt-2">{t.label}</p>
              </div>
              <h3 className="font-display text-xl font-semibold leading-snug tracking-tight sm:col-span-5 sm:text-[1.5rem]">
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

      <Reveal delay={60}>
        <p className="mx-auto mt-10 max-w-4xl text-center text-sm leading-relaxed text-[var(--faint)]">
          Across these shifts, generative AI is best understood as an{" "}
          <em className="font-display italic">accelerator</em> — extending AI
          support from narrow execution toward ideation and higher-level creative
          work, and making ATL-facing, group-level, and cross-site systems more
          feasible.
        </p>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-12 flex flex-col items-start gap-5 rounded-xl border border-[var(--border)] bg-[var(--panel)] p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-xl font-medium">Take the data with you</p>
            <p className="mt-1 max-w-md text-sm text-[var(--muted)]">
              All 31 systems, coded by labor site, labor type, and human–AI
              allocation, with source links.
            </p>
          </div>
          <DownloadCorpus />
        </div>
      </Reveal>
    </section>
  );
}
