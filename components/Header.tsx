import Link from "next/link";

const navItems = [
  ["About", "/about"],
  ["Services", "/services"],
  ["Rentals", "/rentals"],
  ["Admin Preview", "/admin"],
  ["Contact", "/contact"],
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-white/94 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link href="/" className="min-w-0">
          <span className="block font-serif text-2xl font-semibold leading-none text-ink">Remvick Group</span>
          <span className="mt-1 block text-xs font-bold uppercase tracking-[0.18em] text-clay">
            Investment Corporation
          </span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} className="text-sm font-bold text-ink/75 transition hover:text-clay">
              {label}
            </Link>
          ))}
        </nav>
        <Link
          href="/admin"
          className="hidden rounded bg-forest px-4 py-2.5 text-sm font-bold text-white transition hover:bg-clay sm:inline-flex"
        >
          Admin Preview
        </Link>
      </div>
      <nav className="flex gap-6 overflow-x-auto border-t border-ink/10 px-5 py-3 md:hidden">
        {navItems.map(([label, href]) => (
          <Link key={href} href={href} className="shrink-0 text-sm font-bold text-ink/70">
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
