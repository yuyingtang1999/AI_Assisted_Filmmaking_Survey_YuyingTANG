"use client";

import { PAPERS, siteById } from "@/lib/data";

/** Builds the corpus CSV in the browser and downloads it — no hosted file,
 *  so it works on any host or base path. */
function buildCsv(): string {
  const headers = [
    "ID", "System", "Venue", "Year", "Labor Site",
    "Labor Types", "Human Labor", "AI Labor", "Allocation", "URL",
  ];
  const esc = (v: string) =>
    /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;

  const rows = PAPERS.map((p) => {
    const allocation = p.laborTypes
      .filter((t) => p.allocation[t])
      .map((t) => `${t}=${p.allocation[t]}`)
      .join("; ");
    // Cross-site papers list the specific labor sites they cover.
    const laborSite =
      p.site === "cross" && p.sites
        ? `Cross-Site (${p.sites.map((s) => siteById(s).short).join(", ")})`
        : siteById(p.site).short;
    return [
      String(p.id),
      p.name,
      p.venue,
      String(p.year),
      laborSite,
      p.laborTypes.join("; "),
      p.human.join("; "),
      p.ai.join("; "),
      allocation,
      p.url,
    ].map(esc).join(",");
  });

  return [headers.join(","), ...rows].join("\n");
}

export default function DownloadCorpus() {
  const onClick = () => {
    const blob = new Blob([buildCsv()], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ai-filmmaking-corpus.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={onClick}
      className="inline-flex shrink-0 items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-[var(--on-accent)] transition-transform hover:scale-[1.02]"
      style={{ background: "var(--ink)" }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 2v8m0 0L5 7m3 3l3-3M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Download the corpus (CSV)
    </button>
  );
}
