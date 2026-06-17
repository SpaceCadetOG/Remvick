import type { LucideIcon } from "lucide-react";
import Link from "next/link";

type ServiceCardProps = {
  icon: LucideIcon;
  title: string;
  text: string;
  href?: string;
  label?: string;
};

export function ServiceCard({ icon: Icon, title, text, href, label }: ServiceCardProps) {
  const titleContent = (
    <>
      {title}
      {label ? <span className="mt-1 block text-sm font-bold text-clay">{label}</span> : null}
    </>
  );

  return (
    <article className="rounded border border-ink/10 bg-white p-6 shadow-sm">
      <Icon className="h-8 w-8 text-clay" />
      <h3 className="mt-5 text-xl font-bold">
        {href ? (
          href.startsWith("http") ? (
            <a href={href} className="transition hover:text-clay">
              {titleContent}
            </a>
          ) : (
            <Link href={href} className="transition hover:text-clay">
              {titleContent}
            </Link>
          )
        ) : (
          titleContent
        )}
      </h3>
      <p className="mt-3 leading-7 text-ink/68">{text}</p>
    </article>
  );
}
