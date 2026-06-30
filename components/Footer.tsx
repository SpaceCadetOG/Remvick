import Link from "next/link";
import { BusinessLines } from "@/components/BusinessLines";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-serif text-3xl font-semibold">Remvick Group</p>
          <p className="mt-3 max-w-lg text-white/68">
            Public website MVP for Remvick Investment Corporation. Contact information,
            service areas, license details if applicable, and company disclosures are placeholders.
          </p>
          <div className="mt-5">
            <BusinessLines compact />
          </div>
        </div>
        <div>
          <p className="font-bold text-gold">Explore</p>
          <div className="mt-4 grid gap-2 text-white/72">
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/rentals">Rentals</Link>
            <Link href="/portal">Login</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <p className="font-bold text-gold">Placeholders</p>
          <div className="mt-4 grid gap-2 text-white/72">
            <span>Phone: TODO</span>
            <span>Email: TODO</span>
            <span>Office location: TODO</span>
            <span>License info: TODO</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-sm text-white/55">
        Copyright {new Date().getFullYear()} Remvick Investment Corporation. All rights reserved.
      </div>
    </footer>
  );
}
