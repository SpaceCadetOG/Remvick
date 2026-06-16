import { Mail, MapPin, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";

type ContactItem = [LucideIcon, string, string];

const contactItems: ContactItem[] = [
  [Phone, "Phone", "TODO phone placeholder"],
  [Mail, "Email", "TODO email placeholder"],
  [MapPin, "Office location", "TODO office location and service areas"],
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-linen py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Contact"
            title="Send a rental, management, brokerage, or general question."
            text="Messages can be used for rental inquiries, property management conversations, brokerage questions, leasing support, and general real estate operations requests."
          />
        </div>
      </section>
      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.22fr]">
          <aside className="space-y-5">
            {contactItems.map(([Icon, title, text]) => (
              <div key={title} className="rounded border border-ink/10 bg-white p-6 shadow-sm">
                <Icon className="h-7 w-7 text-clay" />
                <p className="mt-4 font-bold">{title}</p>
                <p className="mt-1 text-ink/65">{text}</p>
              </div>
            ))}
            <div className="rounded bg-forest p-6 text-white">
              <p className="font-bold text-gold">Placeholder disclosures</p>
              <p className="mt-3 leading-7 text-white/75">
                TODO: Add final brokerage details, license information, fair housing language,
                privacy policy, and terms before public launch.
              </p>
            </div>
          </aside>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
