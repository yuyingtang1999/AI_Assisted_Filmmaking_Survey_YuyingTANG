export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-5 py-10">
      <div className="mx-auto flex max-w-[var(--maxw)] flex-col items-start justify-between gap-4 text-sm sm:flex-row sm:items-center">
        <div>
          <p className="font-semibold">Algorithm behind the Lens</p>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Mapping the Labor Landscape of AI-Assisted Filmmaking · Yuying Tang
          </p>
        </div>
        <p className="text-xs text-[var(--faint)]">
          Survey corpus: 31 systems, 2021–2025 · Built with Next.js
        </p>
      </div>
    </footer>
  );
}
