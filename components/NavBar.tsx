"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { id: "framework", label: "Framework" },
  { id: "sites", label: "Labor Sites" },
  { id: "types", label: "Labor Types" },
  { id: "allocation", label: "Allocation" },
  { id: "synthesis", label: "Synthesis" },
  { id: "archive", label: "Archive" },
  { id: "conclusion", label: "Conclusion" },
];

export default function NavBar() {
  const [active, setActive] = useState<string>("hero");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ids = ["hero", ...LINKS.map((l) => l.id)];
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all"
      style={{
        background: scrolled ? "rgba(7,9,15,0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--border)"
          : "1px solid transparent",
      }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <button
          onClick={() => go("hero")}
          className="group flex items-center gap-2.5 text-left"
        >
          <span className="relative flex h-6 w-6 items-center justify-center">
            <span
              className="absolute inset-0 rounded-md"
              style={{
                background:
                  "conic-gradient(from 210deg, var(--atl-ind), var(--btl-ind), var(--struct), var(--meaning), var(--relational), var(--atl-ind))",
                opacity: 0.9,
              }}
            />
            <span className="relative h-2 w-2 rounded-full bg-[var(--bg)]" />
          </span>
          <span className="text-sm font-semibold tracking-tight">
            Algorithm <span className="text-[var(--muted)]">behind the Lens</span>
          </span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="relative rounded-md px-3 py-1.5 text-[0.82rem] font-medium transition-colors"
              style={{ color: active === l.id ? "var(--fg)" : "var(--faint)" }}
            >
              {l.label}
              {active === l.id && (
                <span
                  className="absolute inset-x-2 -bottom-0.5 h-[2px] rounded-full"
                  style={{ background: "var(--atl-ind)" }}
                />
              )}
            </button>
          ))}
        </div>

        <button
          className="rounded-md border border-[var(--border-strong)] p-2 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation"
        >
          <div className="space-y-1">
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </div>
        </button>
      </nav>

      {open && (
        <div className="border-t border-[var(--border)] bg-[var(--bg-2)] px-5 py-3 md:hidden">
          <div className="grid grid-cols-2 gap-1">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="rounded-md px-3 py-2 text-left text-sm"
                style={{
                  color: active === l.id ? "var(--fg)" : "var(--muted)",
                  background:
                    active === l.id ? "rgba(255,255,255,0.05)" : "transparent",
                }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
