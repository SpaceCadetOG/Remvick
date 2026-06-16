import type { LucideIcon } from "lucide-react";

type ServiceCardProps = {
  icon: LucideIcon;
  title: string;
  text: string;
};

export function ServiceCard({ icon: Icon, title, text }: ServiceCardProps) {
  return (
    <article className="rounded border border-ink/10 bg-white p-6 shadow-sm">
      <Icon className="h-8 w-8 text-clay" />
      <h3 className="mt-5 text-xl font-bold">{title}</h3>
      <p className="mt-3 leading-7 text-ink/68">{text}</p>
    </article>
  );
}
