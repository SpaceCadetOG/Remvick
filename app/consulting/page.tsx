import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  ClipboardCheck,
  FileText,
  Hammer,
  KeyRound,
  LineChart,
  Megaphone,
  UsersRound,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";

export const metadata: Metadata = {
  title: "Remvick Consulting | Brokerage & Real Estate Operations",
  description:
    "Brokerage, property management, leasing, remodeling coordination, and administrative real estate support from Remvick Consulting.",
};

const consultingServices = [
  {
    icon: Building2,
    title: "Real estate brokerage",
    text: "Buyer, seller, investor, and transaction coordination support. Final brokerage affiliation and license disclosures are pending.",
  },
  {
    icon: KeyRound,
    title: "Property management",
    text: "Residential rental oversight, tenant communication, vendor coordination, and organized owner reporting.",
  },
  {
    icon: UsersRound,
    title: "Tenant placement",
    text: "Rental inquiry handling, showing coordination, applicant workflow support, and move-in preparation.",
  },
  {
    icon: FileText,
    title: "Leasing support",
    text: "Lease preparation coordination, renewal tracking, notices, records, and resident communication support.",
  },
  {
    icon: Megaphone,
    title: "Property marketing",
    text: "Listing presentation, rental descriptions, market positioning, showing readiness, and lead follow-up.",
  },
  {
    icon: Hammer,
    title: "Remodeling coordination",
    text: "Rental-turn planning, vendor scheduling, scope tracking, and property readiness coordination.",
  },
  {
    icon: ClipboardCheck,
    title: "Administrative operations",
    text: "Scheduling, document organization, compliance reminders, vendor records, and transaction follow-through.",
  },
  {
    icon: LineChart,
    title: "Owner consulting",
    text: "Practical support for rental operations, property positioning, workflow planning, and portfolio organization.",
  },
];

export default function ConsultingPage() {
  return (
    <>
      <section className="bg-forest py-16 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">Remvick Group</p>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold leading-tight sm:text-6xl">
            Remvick Consulting
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-white/78">
            Brokerage, property management, leasing, remodeling coordination, and administrative
            support for owners, investors, residents, and real estate operations.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-clay px-6 py-3 font-bold text-white transition hover:bg-white hover:text-ink"
            >
              Discuss Your Needs
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/rentals"
              className="inline-flex min-h-12 items-center justify-center rounded border border-white/35 px-6 py-3 font-bold transition hover:bg-white hover:text-ink"
            >
              View Rental Listings
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-linen py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_0.75fr] lg:items-center">
          <SectionHeading
            eyebrow="Practical real estate support"
            title="Professional coordination with an owner-led, personal approach."
            text="Remvick Consulting is designed to help organize the work around real estate: transactions, rental operations, tenant communication, property readiness, vendor coordination, and administrative follow-through."
          />
          <div className="border-l-4 border-clay bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-clay">Disclosure placeholder</p>
            <p className="mt-3 leading-7 text-ink/65">
              TODO: Insert final brokerage entity, managing broker relationship, Illinois license
              information, service areas, required disclosures, and scope limitations before
              promoting regulated brokerage services.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Consulting services"
            title="Support across the real estate lifecycle."
            text="Services can be refined as the business confirms final brokerage, management, and consulting scope."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {consultingServices.map((service) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                text={service.text}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="How engagement works"
            title="Start with the property, objective, and current challenge."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ["01", "Initial conversation", "Clarify the property, service need, timing, and desired outcome."],
              ["02", "Scope and coordination", "Confirm responsibilities, required records, vendors, and next actions."],
              ["03", "Execution and follow-through", "Track activity, communicate updates, and organize the operational details."],
            ].map(([number, title, text]) => (
              <article key={number} className="border-t-4 border-gold bg-white p-6 shadow-sm">
                <p className="text-sm font-bold text-clay">{number}</p>
                <h2 className="mt-3 text-xl font-bold">{title}</h2>
                <p className="mt-3 leading-7 text-ink/65">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">Remvick Consulting</p>
            <h2 className="mt-3 max-w-3xl font-serif text-4xl font-semibold">
              Let&apos;s organize the next step for your property or transaction.
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded bg-clay px-6 py-3 font-bold text-white transition hover:bg-white hover:text-ink"
          >
            Contact Remvick
          </Link>
        </div>
      </section>
    </>
  );
}
