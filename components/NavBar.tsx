"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { id: "taxonomy", label: "Taxonomy" },
  { id: "sites", label: "Labor Sites" },
  { id: "types", label: "Labor Types" },
  { id: "allocation", label: "Labor Allocation" },
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
        background: scrolled ? "rgba(246,245,241,0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--border)"
          : "1px solid transparent",
      }}
    >
      <nav className="mx-auto flex max-w-[var(--maxw)] items-center justify-between px-6 py-3.5">
        <button
          onClick={() => go("hero")}
          className="group flex items-center gap-2.5 text-left"
        >
          <span className="relative flex h-5 w-5 items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8.2" stroke="var(--ink)" strokeWidth="1.4" />
              <circle cx="10" cy="10" r="2.6" fill="var(--ink)" />
            </svg>
          </span>
          <span className="font-display text-[0.95rem] font-medium tracking-tight">
            A Survey of{" "}
            <span className="italic text-[var(--muted)]">AI-Assisted Filmmaking</span>
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
                  className="absolute inset-x-3 -bottom-0.5 h-[1.5px]"
                  style={{ background: "var(--ink)" }}
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
                    active === l.id ? "var(--fill-1)" : "transparent",
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
