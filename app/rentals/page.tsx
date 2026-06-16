import { Filter } from "lucide-react";
import { PropertyCard } from "@/components/PropertyCard";
import { SectionHeading } from "@/components/SectionHeading";
import { properties } from "@/data/properties";

export default function RentalsPage() {
  return (
    <>
      <section className="bg-linen py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Rentals"
            title="Available and upcoming homes."
            text="These are placeholder listings for MVP review. Real availability, photos, rent amounts, addresses, application criteria, and showing instructions will be added later."
          />
        </div>
      </section>
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-8 rounded border border-ink/10 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-2 font-bold">
                <Filter className="h-5 w-5 text-clay" />
                Filter rentals
              </div>
              <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[680px]">
                <select className="field" defaultValue="All statuses" aria-label="Status filter placeholder">
                  <option>All statuses</option>
                  <option>Available</option>
                  <option>Upcoming</option>
                  <option>Occupied</option>
                </select>
                <select className="field" defaultValue="Any bedrooms" aria-label="Bedroom filter placeholder">
                  <option>Any bedrooms</option>
                  <option>1+ bedrooms</option>
                  <option>2+ bedrooms</option>
                  <option>3+ bedrooms</option>
                </select>
                <select className="field" defaultValue="Any rent" aria-label="Rent filter placeholder">
                  <option>Any rent</option>
                  <option>Under $1,500</option>
                  <option>$1,500 - $2,500</option>
                  <option>$2,500+</option>
                </select>
              </div>
            </div>
            <p className="mt-3 text-sm text-ink/55">Filter UI is visual only for this MVP.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
