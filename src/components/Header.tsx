import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 w-full py-6 px-8 border-b border-[var(--ash)] bg-[var(--background)] z-50">
      <nav className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-black tracking-tight text-[var(--bone)] hover:text-[var(--crimson)] transition-colors"
          >
            DEATH<span className="text-[var(--crimson)]">.</span>NEWS
          </Link>
          <div className="flex gap-5 text-sm">
            <Link href="/" className="text-[var(--text-light)] hover:text-[var(--bone)] transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-[var(--text-light)] hover:text-[var(--bone)] transition-colors">
              About
            </Link>
            <Link href="/" className="text-[var(--text-light)] hover:text-[var(--bone)] transition-colors">
              RSS
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
