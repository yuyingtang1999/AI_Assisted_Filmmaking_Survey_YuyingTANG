import { siteById, typeById, type Paper } from "@/lib/data";

/** deterministic pseudo-random from a seed */
function rand(n: number) {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Neutral, on-theme placeholders for papers without a screenshot.
 * Paper tone + a faint site-color wash, with one of six film/AI motifs chosen
 * deterministically per paper so no two look alike. Type-colored accents map to
 * the paper's actual labor types.
 */
export default function PaperPlaceholder({
  paper,
  className = "",
}: {
  paper: Paper;
  className?: string;
}) {
  const s = siteById(paper.site);
  const seed = paper.id;
  const accent = s.accent;
  const typeColors = paper.laborTypes.map((t) => typeById(t).color);
  const variant = paper.id % 6;

  return (
    <svg
      viewBox="0 0 320 180"
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {/* paper base + faint site wash */}
      <rect width="320" height="180" fill="var(--figure-bg)" />
      <rect width="320" height="180" fill={accent} opacity="0.055" />
      <circle cx="256" cy="30" r="130" fill={accent} opacity="0.045" />

      {variant === 0 && <Filmstrip accent={accent} colors={typeColors} seed={seed} />}
      {variant === 1 && <Aperture accent={accent} colors={typeColors} seed={seed} />}
      {variant === 2 && <Waveform accent={accent} colors={typeColors} seed={seed} />}
      {variant === 3 && <Storyboard accent={accent} colors={typeColors} seed={seed} />}
      {variant === 4 && <Constellation accent={accent} colors={typeColors} seed={seed} />}
      {variant === 5 && <Timeline accent={accent} colors={typeColors} seed={seed} />}

      {/* metadata */}
      <text x="20" y="28" fontFamily="var(--font-mono-stack)" fontSize="9" letterSpacing="1.6" fill="var(--faint)">
        {s.short.toUpperCase()}
      </text>
      <text x="306" y="168" textAnchor="end" fontFamily="var(--font-mono-stack)" fontSize="10" fill="var(--faint)">
        {paper.venue} · {paper.year}
      </text>
    </svg>
  );
}

type V = { accent: string; colors: string[]; seed: number };
const dot = (x: number, y: number, c: string, r = 4.5) => (
  <g>
    <circle cx={x} cy={y} r={r * 2} fill={c} opacity="0.16" />
    <circle cx={x} cy={y} r={r} fill={c} />
  </g>
);

/* 0 — film strip with frames */
function Filmstrip({ accent, colors }: V) {
  return (
    <g>
      <rect x="150" y="46" width="150" height="94" rx="4" fill="none" stroke="var(--border-strong)" strokeOpacity="0.4" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={158 + i * 46} y="54" width="38" height="78" rx="2" fill={colors[i] ?? accent} opacity={colors[i] ? 0.14 : 0.06} />
      ))}
      <g fill="var(--border-strong)" fillOpacity="0.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={`t${i}`} x={156 + i * 34} y="40" width="14" height="7" rx="1.5" />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={`b${i}`} x={156 + i * 34} y="139" width="14" height="7" rx="1.5" />
        ))}
      </g>
      {colors[0] && dot(196, 150, colors[0], 4)}
    </g>
  );
}

/* 1 — lens aperture */
function Aperture({ accent, colors }: V) {
  const cx = 200, cy = 92;
  return (
    <g>
      {[46, 34, 22].map((r, i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke="var(--border-strong)" strokeOpacity={0.35 + i * 0.08} />
      ))}
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <line key={i} x1={cx + Math.cos(a) * 22} y1={cy + Math.sin(a) * 22} x2={cx + Math.cos(a + 0.9) * 46} y2={cy + Math.sin(a + 0.9) * 46} stroke="var(--border-strong)" strokeOpacity="0.3" />
        );
      })}
      <circle cx={cx} cy={cy} r="7" fill={accent} opacity="0.75" />
      {colors.map((c, i) => {
        const a = (i / Math.max(colors.length, 1)) * Math.PI * 2 - 0.6;
        return <g key={i}>{dot(cx + Math.cos(a) * 58, cy + Math.sin(a) * 40, c, 4)}</g>;
      })}
    </g>
  );
}

/* 2 — waveform */
function Waveform({ accent, colors, seed }: V) {
  const bars = 26;
  const base = 92;
  return (
    <g>
      <line x1="52" y1={base} x2="300" y2={base} stroke="var(--border)" />
      {Array.from({ length: bars }).map((_, i) => {
        const h = 8 + rand(seed + i * 3) * 52;
        const x = 56 + i * 9.4;
        const colored = i % 7 === 3 && colors.length > 0;
        const c = colored ? colors[i % colors.length] : "var(--border-strong)";
        return (
          <line key={i} x1={x} y1={base - h} x2={x} y2={base + h} stroke={c} strokeOpacity={colored ? 0.9 : 0.4} strokeWidth={colored ? 2.4 : 1.6} strokeLinecap="round" />
        );
      })}
    </g>
  );
}

/* 3 — storyboard grid */
function Storyboard({ accent, colors, seed }: V) {
  const cells = [0, 1, 2, 3, 4, 5];
  return (
    <g>
      {cells.map((i) => {
        const col = i % 3, row = Math.floor(i / 3);
        const x = 128 + col * 62, y = 44 + row * 52;
        const fillC = colors[i % colors.length];
        const on = rand(seed + i) > 0.5 && fillC;
        return (
          <g key={i}>
            <rect x={x} y={y} width="54" height="44" rx="3" fill={on ? fillC : "transparent"} fillOpacity={on ? 0.14 : 0} stroke="var(--border-strong)" strokeOpacity="0.4" />
            {on && dot(x + 27, y + 22, fillC, 3.5)}
          </g>
        );
      })}
    </g>
  );
}

/* 4 — labor-signature constellation */
function Constellation({ accent, colors, seed }: V) {
  const cx = 200, cy = 90;
  const nodes = colors.map((c, i) => {
    const a = (i / Math.max(colors.length, 1)) * Math.PI * 2 + rand(seed + i) * 1.4;
    const rad = 26 + rand(seed * 3 + i) * 18;
    return { x: cx + Math.cos(a) * rad, y: cy + Math.sin(a) * rad * 0.82, c };
  });
  const pts = nodes.length ? nodes : [{ x: cx, y: cy, c: accent }];
  return (
    <g>
      {pts.map((n, i) => {
        const nx = pts[(i + 1) % pts.length];
        return <line key={i} x1={n.x} y1={n.y} x2={nx.x} y2={nx.y} stroke="var(--ink)" strokeOpacity="0.16" />;
      })}
      {pts.map((n, i) => (
        <g key={`n${i}`}>{dot(n.x, n.y, n.c)}</g>
      ))}
    </g>
  );
}

/* 5 — timeline curve */
function Timeline({ accent, colors, seed }: V) {
  const xs = [70, 128, 186, 244, 292];
  const ys = xs.map((_, i) => 132 - i * 12 - rand(seed + i) * 26);
  const d = xs.map((x, i) => `${i ? "L" : "M"}${x},${ys[i]}`).join(" ");
  return (
    <g>
      <path d={d} fill="none" stroke="var(--border-strong)" strokeOpacity="0.45" strokeWidth="1.6" />
      {xs.map((x, i) => {
        const c = colors[i % Math.max(colors.length, 1)] ?? accent;
        const show = i < Math.max(colors.length, 2);
        return show ? <g key={i}>{dot(x, ys[i], c, 4)}</g> : null;
      })}
    </g>
  );
}
