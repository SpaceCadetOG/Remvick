import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, MapPin, Ruler } from "lucide-react";
import type { Property } from "@/data/properties";
import { StatusBadge } from "@/components/StatusBadge";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function PropertyCard({ property }: { property: Property }) {
  return (
    <article className="overflow-hidden rounded border border-ink/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[4/3] bg-mist">
        <Image
          src={property.images[0]}
          alt={`${property.title} placeholder image`}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
        <div className="absolute left-4 top-4">
          <StatusBadge status={property.status} />
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold">{property.title}</h3>
        <p className="mt-2 flex items-center gap-2 text-sm text-ink/65">
          <MapPin className="h-4 w-4" />
          {property.city}, {property.state}
        </p>
        <p className="mt-4 text-2xl font-bold text-forest">{formatter.format(property.rentAmount)}<span className="text-sm font-semibold text-ink/55"> / mo</span></p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-sm text-ink/70">
          <span className="flex items-center gap-1"><BedDouble className="h-4 w-4" />{property.bedrooms} bd</span>
          <span className="flex items-center gap-1"><Bath className="h-4 w-4" />{property.bathrooms} ba</span>
          <span className="flex items-center gap-1"><Ruler className="h-4 w-4" />{property.squareFeet}</span>
        </div>
        <Link
          href={`/rentals/${property.id}`}
          className="mt-5 inline-flex w-full items-center justify-center rounded bg-ink px-4 py-3 text-sm font-bold text-white transition hover:bg-clay"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
