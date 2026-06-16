import type { PropertyStatus } from "@/data/properties";

const statusStyles: Record<PropertyStatus, string> = {
  AVAILABLE: "bg-forest text-white",
  UPCOMING: "bg-gold text-ink",
  OCCUPIED: "bg-ink/12 text-ink",
};

export function StatusBadge({ status }: { status: PropertyStatus }) {
  return (
    <span className={`rounded px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${statusStyles[status]}`}>
      {status.toLowerCase()}
    </span>
  );
}
