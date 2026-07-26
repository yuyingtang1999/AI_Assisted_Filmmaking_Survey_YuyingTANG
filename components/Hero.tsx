"use client";

import { CORPUS } from "@/lib/data";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col overflow-hidden px-6 pt-24 pb-8"
    >
      <div className="mx-auto flex w-full max-w-[var(--maxw)] flex-1 items-center">
        <div className="grid w-full items-center gap-10 lg:grid-cols-12 lg:gap-10">
          {/* left: editorial copy */}
          <div className="lg:col-span-6">
            <span className="label flex items-center gap-2.5">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: "var(--btl-grp)", animation: "pulseGlow 2.2s ease-in-out infinite" }}
              />
              A Research Survey
            </span>

            <h1 className="font-display mt-7 text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.01em] text-[var(--ink)] sm:text-[3.1rem]">
              Mapping the Labor Landscape of AI-Assisted Filmmaking
            </h1>

            <p className="font-display mt-4 text-xl text-[var(--muted)] sm:text-[1.4rem]">
              A survey of labor sites, labor types, and human–AI labor allocation.
            </p>

            <p className="mt-7 max-w-xl text-pretty text-[1.06rem] leading-relaxed text-[var(--muted)]">
              The survey reads {CORPUS.total} AI-assisted filmmaking systems
              through three questions:{" "}
              <em className="font-display italic text-[var(--ink)]">where</em> AI
              assistance is positioned in the film-production hierarchy and whose
              work it assists;{" "}
              <em className="font-display italic text-[var(--ink)]">what</em>{" "}
              forms of labor it brings into scope; and{" "}
              <em className="font-display italic text-[var(--ink)]">how</em> each
              labor type is allocated between the user and the system.
            </p>

            {/* metadata row */}
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
              <Meta k="Presenter" v="Yuying Tang" />
              <Dot />
              <Meta k="Supervisors" v="Prof. Huamin Qu · Prof. Xiaojuan Ma" />
              <Dot />
              <Meta k="Corpus" v={`${CORPUS.total} systems · through 2025`} />
            </div>
          </div>

          {/* right: bespoke line-art motif (enlarged) */}
          <div className="lg:col-span-6">
            <div className="mx-auto w-full max-w-md lg:max-w-none">
              <LensMotif />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() =>
          document.getElementById("framework")?.scrollIntoView({ behavior: "smooth" })
        }
        className="mx-auto mt-6 flex w-max shrink-0 flex-col items-center gap-2 text-[var(--faint)] transition-colors hover:text-[var(--ink)]"
        style={{ animation: "floatY 2.6s ease-in-out infinite" }}
        aria-label="Scroll to begin"
      >
        <span className="label">Begin the survey</span>
        <svg width="16" height="24" viewBox="0 0 18 26" fill="none">
          <rect x="1" y="1" width="16" height="24" rx="8" stroke="currentColor" strokeOpacity="0.45" />
          <circle cx="9" cy="8" r="2.5" fill="currentColor" />
        </svg>
      </button>
    </section>
  );
}

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <span className="flex flex-col">
      <span className="label text-[0.6rem]">{k}</span>
      <span className="mt-0.5 text-sm font-medium text-[var(--fg)]">{v}</span>
    </span>
  );
}
function Dot() {
  return <span className="hidden h-8 w-px bg-[var(--hairline)] sm:block" />;
}

/** The three-layer taxonomy as an abstract flow: Sites → Types → Allocation. */
function LensMotif() {
  const cols = [
    {
      x: 46,
      label: "Where",
      sub: "Sites",
      nodes: [
        { y: 34, c: "var(--atl-ind)" },
        { y: 74, c: "var(--atl-grp)" },
        { y: 114, c: "var(--btl-ind)" },
        { y: 154, c: "var(--btl-grp)" },
        { y: 194, c: "var(--cross)" },
      ],
    },
    {
      x: 225,
      label: "What",
      sub: "Types",
      nodes: [
        { y: 54, c: "var(--exec)" },
        { y: 94, c: "var(--struct)" },
        { y: 134, c: "var(--meaning)" },
        { y: 174, c: "var(--relational)" },
      ],
    },
    {
      x: 404,
      label: "How",
      sub: "Allocation",
      nodes: [
        { y: 74, c: "#8c7346" },
        { y: 114, c: "#7c6199" },
        { y: 154, c: "#9a9a9a" },
      ],
    },
  ];

  const links: [number, number, number, number][] = [];
  // connect each node in a column to two nearest nodes in the next column
  for (let ci = 0; ci < cols.length - 1; ci++) {
    const a = cols[ci];
    const b = cols[ci + 1];
    a.nodes.forEach((na) => {
      const nearest = [...b.nodes]
        .sort((p, q) => Math.abs(p.y - na.y) - Math.abs(q.y - na.y))
        .slice(0, 2);
      nearest.forEach((nb) => links.push([a.x, na.y, b.x, nb.y]));
    });
  }

  return (
    <div className="relative" style={{ animation: "floatY 7s ease-in-out infinite" }}>
      <svg viewBox="0 0 450 240" className="w-full" fill="none">
        {/* connectors */}
        <g stroke="var(--ink)" strokeOpacity="0.16" strokeWidth="1">
          {links.map(([x1, y1, x2, y2], i) => {
            const mx = (x1 + x2) / 2;
            return (
              <path
                key={i}
                d={`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`}
                strokeDasharray="260"
                strokeDashoffset="260"
                style={{ animation: `dash 1.6s ease-out ${0.2 + i * 0.03}s forwards` }}
              />
            );
          })}
        </g>
        {/* nodes + column labels */}
        {cols.map((col) => (
          <g key={col.label}>
            {col.nodes.map((n, i) => (
              <g key={i}>
                <circle cx={col.x} cy={n.y} r="9" fill={n.c} fillOpacity="0.16" />
                <circle cx={col.x} cy={n.y} r="4.5" fill={n.c} />
              </g>
            ))}
            <text x={col.x} y={222} textAnchor="middle" fontFamily="var(--font-display-stack)" fontStyle="italic" fontSize="15" fill="var(--ink)">
              {col.label}
            </text>
            <text x={col.x} y={236} textAnchor="middle" fontFamily="var(--font-sans-stack)" fontSize="9" letterSpacing="1.4" fill="var(--faint)">
              {col.sub.toUpperCase()}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
