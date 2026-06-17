import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { businessLines } from "@/data/business-lines";

type BusinessLinesProps = {
  compact?: boolean;
};

export function BusinessLines({ compact = false }: BusinessLinesProps) {
  return (
    <div className={compact ? "grid gap-3" : "grid gap-4 md:grid-cols-2 lg:grid-cols-3"}>
      {businessLines.map((line) => {
        const content = (
          <>
            <span className="flex items-center gap-2 font-bold">
              {line.name}
              {line.href ? <ArrowUpRight className="h-4 w-4" /> : null}
            </span>
            {!compact ? <span className="mt-2 block text-sm leading-6 text-ink/65">{line.description}</span> : null}
            {line.status && !compact ? (
              <span className={`mt-3 inline-flex rounded px-2 py-1 text-xs font-bold uppercase tracking-[0.12em] ${line.status === "Live" ? "bg-forest text-white" : "bg-ink/10 text-ink/70"}`}>
                {line.status}
              </span>
            ) : null}
          </>
        );

        const className = compact
          ? "block text-white/76 transition hover:text-gold"
          : "block rounded border border-ink/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft";

        if (!line.href) {
          return (
            <div key={line.name} className={className}>
              {content}
            </div>
          );
        }

        if (line.href.startsWith("http")) {
          return (
            <a key={line.name} href={line.href} className={className}>
              {content}
            </a>
          );
        }

        return (
          <Link key={line.name} href={line.href} className={className}>
            {content}
          </Link>
        );
      })}
    </div>
  );
}
