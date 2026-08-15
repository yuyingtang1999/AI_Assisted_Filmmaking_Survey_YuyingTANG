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
              <em className="font-display italic text-[var(--ink)]">Where</em> is
              AI assistance positioned, and whose labor does it assist?{" "}
              <em className="font-display italic text-[var(--ink)]">What</em>{" "}
              kinds of filmmaking labor are involved during system use?{" "}
              <em className="font-display italic text-[var(--ink)]">How</em> are
              these labor types allocated between human creators and AI systems?
            </p>

            {/* authors + corpus */}
            <div className="mt-8">
              <p className="label text-[0.6rem]">Authors</p>
              <p className="mt-1 max-w-xl text-sm font-medium leading-relaxed text-[var(--fg)]">
                Yuying Tang, Lin Gao, Haotian Li, Baiqiao Zhang, Rebecca
                Fiebrink, Sebastian Deterding, Xiaojuan Ma, and Huamin Qu
              </p>
              <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--faint)]">
                {CORPUS.total} systems · through 2025
              </p>
            </div>
          </div>

          {/* right: bespoke line-art motif (enlarged) */}
          <div className="lg:col-span-6">
            <div className="mx-auto w-full max-w-[430px]">
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

/** Logo mark: the three-layer taxonomy as light running through a film cell.
 *  Narrow, tall film frame; one unified color per step; a warm light travels. */
function LensMotif() {
  const STEPS = [
    { x: 116, color: "#df8a41", label: "Where", sub: "Sites", ys: [70, 122, 174, 226, 278] },
    { x: 200, color: "#5a9e64", label: "What", sub: "Types", ys: [96, 148, 200, 252] },
    { x: 284, color: "#4d6cbb", label: "How", sub: "Allocation", ys: [122, 174, 226] },
  ];

  // connectors: every node linked to every node in the next step
  const links: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let ci = 0; ci < STEPS.length - 1; ci++) {
    const a = STEPS[ci], b = STEPS[ci + 1];
    a.ys.forEach((ay) => {
      b.ys.forEach((by) => links.push({ x1: a.x, y1: ay, x2: b.x, y2: by }));
    });
  }
  const curve = (l: { x1: number; y1: number; x2: number; y2: number }) => {
    const mx = (l.x1 + l.x2) / 2;
    return `M${l.x1},${l.y1} C${mx},${l.y1} ${mx},${l.y2} ${l.x2},${l.y2}`;
  };

  // full-chain paths for the travelling light (Where → What → How)
  const chain = (si: number, ti: number, ai: number) => {
    const s = STEPS[0], t = STEPS[1], h = STEPS[2];
    const m1 = (s.x + t.x) / 2, m2 = (t.x + h.x) / 2;
    return `M${s.x},${s.ys[si]} C${m1},${s.ys[si]} ${m1},${t.ys[ti]} ${t.x},${t.ys[ti]} C${m2},${t.ys[ti]} ${m2},${h.ys[ai]} ${h.x},${h.ys[ai]}`;
  };
  const chains = [
    { d: chain(2, 1, 1), begin: "0s" },
    { d: chain(0, 0, 0), begin: "2.4s" },
    { d: chain(4, 3, 2), begin: "4.8s" },
  ];

  const perfXs: number[] = [];
  for (let x = 48; x <= 350; x += 24) perfXs.push(x);

  return (
    <div className="relative mx-auto" style={{ animation: "floatY 7s ease-in-out infinite" }}>
      <svg viewBox="0 0 400 396" className="w-full" fill="none">
        {/* film cell + sprocket perforations (narrow & tall) */}
        <rect x="34" y="14" width="332" height="320" rx="16" stroke="var(--border-strong)" strokeWidth="1.5" />
        <g fill="var(--border-strong)" opacity="0.4">
          {perfXs.map((x, i) => (
            <g key={i}>
              <rect x={x} y={22} width="6" height="9" rx="2" />
              <rect x={x} y={317} width="6" height="9" rx="2" />
            </g>
          ))}
        </g>

        {/* connectors — every node to every node in the next step */}
        <g stroke="var(--ink)" strokeOpacity="0.09" strokeWidth="1">
          {links.map((l, i) => (
            <path key={i} d={curve(l)} strokeDasharray="300" strokeDashoffset="300"
              style={{ animation: `dash 1.5s ease-out ${0.25 + i * 0.02}s forwards` }} />
          ))}
        </g>

        {/* travelling light — subtle warm pulse running the chain */}
        {chains.map((c, i) => (
          <circle key={i} r="3.4" fill="#caa24a" opacity="0">
            <animateMotion dur="7.2s" begin={c.begin} repeatCount="indefinite" path={c.d} />
            <animate attributeName="opacity" dur="7.2s" begin={c.begin} repeatCount="indefinite"
              values="0;0.85;0.85;0" keyTimes="0;0.12;0.88;1" />
            <animate attributeName="r" dur="7.2s" begin={c.begin} repeatCount="indefinite"
              values="2.6;3.8;2.6" keyTimes="0;0.5;1" />
          </circle>
        ))}

        {/* nodes (ring + dot), one color per step — enlarged */}
        {STEPS.map((step) => (
          <g key={step.label}>
            {step.ys.map((y, i) => (
              <g key={i}>
                <circle cx={step.x} cy={y} r="11" fill="none" stroke={step.color} strokeOpacity="0.32" strokeWidth="1.5" />
                <circle cx={step.x} cy={y} r="6" fill={step.color} />
              </g>
            ))}
            <text x={step.x} y={362} textAnchor="middle" fontFamily="var(--font-display-stack)" fontStyle="italic" fontSize="18" fill="var(--ink)">
              {step.label}
            </text>
            <text x={step.x} y={381} textAnchor="middle" fontFamily="var(--font-sans-stack)" fontSize="9.5" fontWeight="600" letterSpacing="1.5" fill="var(--faint)">
              {step.sub.toUpperCase()}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
