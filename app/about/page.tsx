import { Award, BriefcaseBusiness, HeartHandshake, MapPinned } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

type AboutItem = [LucideIcon, string, string];

const aboutItems: AboutItem[] = [
  [Award, "Minority-owned", "Business certification details placeholder."],
  [Award, "Woman-owned", "Ownership language placeholder for review."],
  [BriefcaseBusiness, "Small Business", "Government and vendor profile copy placeholder."],
  [MapPinned, "Local service areas", "Office location and service-area list placeholder."],
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-linen py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="About Remvick"
            title="A family-owned real estate business with room to grow carefully."
            text="Remvick Group is the public-facing brand for Remvick Investment Corporation, led by Owner/Broker Remy F. Balogun. This MVP presents the business clearly while leaving space for final service areas, brokerage details, license information, and owner biography."
          />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.8fr_1fr]">
          <div className="rounded bg-forest p-8 text-white">
            <HeartHandshake className="h-10 w-10 text-gold" />
            <h2 className="mt-5 font-serif text-4xl font-semibold">Remy F. Balogun</h2>
            <p className="mt-2 font-bold text-gold">Owner / Broker</p>
            <p className="mt-5 leading-8 text-white/76">
              TODO: Insert final owner bio, professional credentials, headshot, brokerage
              affiliation language, and license disclosures after owner review.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {aboutItems.map(([Icon, title, text]) => (
              <article key={title} className="rounded border border-ink/10 bg-white p-6 shadow-sm">
                <Icon className="h-8 w-8 text-clay" />
                <h3 className="mt-4 text-xl font-bold">{title}</h3>
                <p className="mt-3 text-ink/68">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-clay">MVP note</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold">Built for review first, expansion second.</h2>
            <p className="mt-5 text-lg leading-8 text-ink/70">
              The site intentionally avoids tenant portal, admin portal, payments, applications,
              maintenance tickets, document storage, and notification features in this first
              release. The code structure leaves those workflows ready for future backend routes,
              APIs, and database tables.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
