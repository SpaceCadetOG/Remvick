import { Building2, ClipboardList, FileText, Hammer, Home, KeyRound, Megaphone, UsersRound } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";

const services = [
  [Home, "Residential rentals", "Marketing and communication support for residential rental homes."],
  [Building2, "Real estate brokerage", "Brokerage services placeholder pending final details and disclosures."],
  [KeyRound, "Property management", "Owner-focused operations for residential rental properties."],
  [UsersRound, "Tenant placement", "Inquiry handling, showing coordination, and applicant handoff support."],
  [FileText, "Leasing support", "Lease coordination, move-in communication, and record organization."],
  [Megaphone, "Property marketing", "Listing presentation, rental descriptions, and photo-ready positioning."],
  [Hammer, "Remodeling coordination", "Vendor and project coordination support for rental readiness."],
  [ClipboardList, "Administrative support", "Real estate paperwork, scheduling, and operational follow-through."],
] as const;

export default function ServicesPage() {
  return (
    <>
      <section className="bg-linen py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Services"
            title="Real estate operations support from listing to lease."
            text="This page describes the intended service offering for owner review. Final service-area boundaries, license language, brokerage affiliations, and any required disclosures should be added before launch."
          />
        </div>
      </section>
      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map(([icon, title, text]) => (
            <ServiceCard key={title} icon={icon} title={title} text={text} />
          ))}
        </div>
      </section>
      <section className="bg-forest py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">Future workflows</p>
          <h2 className="mt-3 max-w-3xl font-serif text-4xl font-semibold sm:text-5xl">
            The public site can grow into a full operating platform.
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">
            TODO: Add backend APIs for property inventory, online applications, Stripe rent
            payments, maintenance requests, owner/admin tools, documents, messaging, and
            notification workflows when the business is ready.
          </p>
        </div>
      </section>
    </>
  );
}
