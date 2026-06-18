import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Bath, BedDouble, CalendarDays, MapPin, Ruler } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { StatusBadge } from "@/components/StatusBadge";
import { getPropertyById, properties } from "@/data/properties";

export function generateStaticParams() {
  return properties.map((property) => ({ id: property.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const property = getPropertyById(params.id);
  return {
    title: property ? `${property.title} | Remvick Rentals` : "Rental | Remvick Group",
  };
}

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function RentalDetailPage({ params }: { params: { id: string } }) {
  const property = getPropertyById(params.id);

  if (!property) {
    notFound();
  }

  return (
    <>
      <section className="bg-linen py-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Link href="/rentals" className="text-sm font-bold text-forest">
            Back to rentals
          </Link>
          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <StatusBadge status={property.status} />
              <h1 className="mt-4 font-serif text-5xl font-semibold">{property.title}</h1>
              <p className="mt-3 flex items-center gap-2 text-ink/65">
                <MapPin className="h-4 w-4" />
                {property.address}, {property.city}, {property.state} {property.zip}
              </p>
            </div>
            <p className="text-4xl font-bold text-forest">
              {formatter.format(property.rentAmount)}
              <span className="text-base text-ink/55"> / mo</span>
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="relative min-h-[360px] overflow-hidden rounded bg-mist">
              <Image
                src={property.images[0]}
                alt={`${property.title} gallery placeholder`}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 70vw, 100vw"
                priority
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {[1, 2].map((item) => (
                <div key={item} className="grid min-h-44 place-items-center rounded border border-dashed border-ink/20 bg-mist text-sm font-bold text-ink/45">
                  Gallery placeholder
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
            <article>
              <div className="grid gap-4 rounded border border-ink/10 bg-white p-5 shadow-sm sm:grid-cols-4">
                <span className="flex items-center gap-2"><BedDouble className="h-5 w-5 text-clay" />{property.bedrooms} beds</span>
                <span className="flex items-center gap-2"><Bath className="h-5 w-5 text-clay" />{property.bathrooms} baths</span>
                <span className="flex items-center gap-2"><Ruler className="h-5 w-5 text-clay" />{property.squareFeet} sq ft</span>
                <span className="flex items-center gap-2"><CalendarDays className="h-5 w-5 text-clay" />{property.availableDate}</span>
              </div>
              <h2 className="mt-10 font-serif text-4xl font-semibold">Description</h2>
              <p className="mt-4 text-lg leading-8 text-ink/72">{property.description}</p>
              <h2 className="mt-10 font-serif text-4xl font-semibold">Amenities</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {property.amenities.map((amenity) => (
                  <li key={amenity} className="rounded bg-mist px-4 py-3 font-semibold text-ink/75">
                    {amenity}
                  </li>
                ))}
              </ul>
            </article>

            <aside className="h-fit rounded border border-ink/10 bg-white p-6 shadow-soft">
              <h2 className="font-serif text-3xl font-semibold">Interested in this rental?</h2>
              <p className="mt-3 leading-7 text-ink/68">
                Contact Remvick Group for showing details, availability confirmation, application
                instructions, and rental criteria placeholders.
              </p>
              <div className="mt-6 grid gap-3">
                <ButtonLink href="/portal">Apply / Login</ButtonLink>
                <p className="text-sm text-ink/55">
                  TODO: Add online applications, screening workflow, payments, tenant portal, and
                  document upload features in a later release.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
