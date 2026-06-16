import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function ButtonLink({ href, children, variant = "primary" }: ButtonLinkProps) {
  const styles =
    variant === "primary"
      ? "bg-clay text-white hover:bg-forest"
      : "bg-white/12 text-white ring-1 ring-white/45 hover:bg-white hover:text-ink";

  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded px-6 py-3 text-sm font-bold transition ${styles}`}
    >
      {children}
    </Link>
  );
}
