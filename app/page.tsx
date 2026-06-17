import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, HeartHandshake, Home, KeyRound, ShieldCheck } from "lucide-react";
import { BusinessLines } from "@/components/BusinessLines";
import { ButtonLink } from "@/components/ButtonLink";
import { PropertyCard } from "@/components/PropertyCard";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { properties } from "@/data/properties";

const featured = properties.slice(0, 3);

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[88vh] overflow-hidden bg-ink text-white">
        <Image
          src="/images/remvick-hero.png"
          alt="Warm residential property exterior"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/78 to-ink/18" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl items-center px-5 py-24 sm:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-gold">
              Remvick Group
            </p>
            <h1 className="font-serif text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
              Real Estate, Rentals, and Property Management With a Personal Touch
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/86">
              Remvick Group helps families, tenants, and property owners navigate rentals,
              leasing, brokerage, and property management with professionalism, care, and
              local experience.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/rentals">View Rentals</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Contact Remvick
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-linen py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Family-owned. Locally focused."
              title="A real estate partner built around care, clarity, and follow-through."
              text="Remvick Group is the public brand of Remvick Investment Corporation, supporting rental housing, brokerage coordination, residential property management, leasing, remodeling support, and the administrative work that keeps real estate moving."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Minority-owned",
              "Woman-owned",
              "Small Business",
              "Owner-led service",
            ].map((item) => (
              <div key={item} className="rounded border border-ink/10 bg-white p-5 shadow-sm">
                <CheckCircle2 className="mb-4 h-6 w-6 text-clay" />
                <p className="font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Business lines"
            title="One family platform for current and future services."
            text="Remvick Group will become the central site that points visitors to each business line as those sites are built."
          />
          <div className="mt-10">
            <BusinessLines />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Featured rentals"
              title="Homes prepared for real life."
              text="Placeholder listings are included for layout review. Real property photos, availability, pricing, and application links can be added later."
            />
            <Link href="/rentals" className="inline-flex items-center gap-2 font-bold text-forest">
              See all rentals <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featured.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Services"
            title="Practical support for owners, tenants, and families."
            text="From leasing conversations to property marketing and administrative coordination, Remvick Group is structured to support the full rental lifecycle."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <ServiceCard icon={Home} title="Residential Rentals" text="Listing, showing, and tenant communication support for residential homes." />
            <ServiceCard icon={Building2} title="Brokerage" text="Placeholder brokerage details and license information will be inserted after owner review." />
            <ServiceCard icon={KeyRound} title="Leasing Support" text="Tenant placement, lease coordination, and move-in readiness support." />
            <ServiceCard icon={ShieldCheck} title="Property Management" text="Owner-minded management operations for residential rental properties." />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-3">
          <SectionHeading
            eyebrow="Why work with us"
            title="Reliable real estate help without losing the personal relationship."
          />
          <div className="grid gap-5 lg:col-span-2 sm:grid-cols-3">
            {[
              ["Responsive", "Clear communication for rental inquiries, owners, and vendor coordination."],
              ["Organized", "Administrative workflows designed to support clean records and smoother operations."],
              ["Grounded", "Family-owned values with a professional standard for every interaction."],
            ].map(([title, text]) => (
              <div key={title} className="border-l-4 border-clay bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-3 text-ink/70">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.75fr_1fr] lg:items-center">
          <div className="rounded bg-white/10 p-8 ring-1 ring-white/15">
            <HeartHandshake className="h-10 w-10 text-gold" />
            <h2 className="mt-5 font-serif text-4xl font-semibold">Remy F. Balogun</h2>
            <p className="mt-2 font-bold text-gold">Owner / Broker</p>
            <p className="mt-5 text-white/78">
              TODO: Insert final owner bio, professional headshot, brokerage details, license
              information, and service-area language after review.
            </p>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">Owner-led</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
              A steady point of contact for the details that matter.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/78">
              Remvick Group is being shaped as a dependable local real estate presence:
              approachable for tenants, useful for owners, and ready to grow into digital
              applications, payments, maintenance, documents, and notifications later.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-linen py-16 sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-clay">Start a conversation</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold">Have a rental, brokerage, or management question?</h2>
          </div>
          <ButtonLink href="/contact">Send a Message</ButtonLink>
        </div>
      </section>
    </>
  );
}
