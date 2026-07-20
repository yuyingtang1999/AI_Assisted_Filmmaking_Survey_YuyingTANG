import Reveal from "./Reveal";
import type { ReactNode } from "react";

/** Editorial masthead: eyebrow + index rule, oversized serif title left, lede right. */
export default function SectionHeader({
  eyebrow,
  num,
  title,
  children,
  accent = "var(--atl-ind)",
}: {
  eyebrow: string;
  num?: string;
  title: ReactNode;
  children?: ReactNode;
  accent?: string;
}) {
  return (
    <div>
      <Reveal>
        <div className="flex items-end justify-between gap-4">
          <span className="label flex items-center gap-2.5">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: accent }}
            />
            {eyebrow}
          </span>
          {num && (
            <span className="ghost-num text-5xl sm:text-6xl">{num}</span>
          )}
        </div>
        <div className="rule mt-4" />
      </Reveal>

      <div className="mt-9 grid gap-6 lg:grid-cols-12 lg:gap-10">
        <Reveal delay={60} className="lg:col-span-7">
          <h2 className="section-title">{title}</h2>
        </Reveal>
        {children && (
          <Reveal delay={120} className="lg:col-span-5 lg:pt-3">
            <div>{children}</div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
