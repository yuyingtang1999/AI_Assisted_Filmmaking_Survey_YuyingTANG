export default function Footer() {
  return (
    <footer className="mt-8 border-t border-[var(--border)]">
      <div className="mx-auto flex max-w-[var(--maxw)] flex-col items-start justify-between gap-5 px-6 py-12 sm:flex-row sm:items-end">
        <div>
          <p className="font-display text-lg font-normal">
            AI-Assisted Filmmaking from a Labor-Centered Perspective: A Survey of Systems in HCI Research
          </p>
          <p className="mt-1.5 text-sm text-[var(--muted)]">
            Yuying Tang · Supervised by Prof. Huamin Qu &amp; Prof. Xiaojuan Ma
          </p>
        </div>
        <p className="label">Survey corpus · 31 systems · through 2025</p>
      </div>
    </footer>
  );
}
