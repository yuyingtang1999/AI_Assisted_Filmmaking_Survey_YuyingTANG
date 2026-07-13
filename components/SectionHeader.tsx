import Reveal from "./Reveal";
import type { ReactNode } from "react";

/** Editorial section header: eyebrow chip, big serif title, lede, ghost numeral. */
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
    <div className="relative">
      {num && (
        <span className="ghost-num absolute -top-10 right-0 select-none text-[7rem] sm:text-[10rem]">
          {num}
        </span>
      )}
      <Reveal>
        <div className="flex items-center gap-3">
          <span
            className="chip"
            style={{ borderColor: `${accent}66`, color: "var(--fg)" }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: accent }}
            />
            {eyebrow}
          </span>
          <span className="h-px flex-1 bg-[var(--border)]" />
        </div>
      </Reveal>
      <Reveal delay={60}>
        <h2 className="section-title mt-6 max-w-4xl">{title}</h2>
      </Reveal>
      {children && (
        <Reveal delay={120}>
          <div className="mt-6">{children}</div>
        </Reveal>
      )}
    </div>
  );
}
