"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Send } from "lucide-react";

const interests = [
  "Rental inquiry",
  "Property management",
  "Leasing support",
  "Rental search support",
  "Government contracting",
  "Drone services",
  "Home inspections",
  "Remodeling coordination",
  "General question",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log("Remvick contact form submission", Object.fromEntries(formData));
    // TODO: Send this payload to a backend API, CRM, or notification queue.
    // TODO: Add spam protection, email notifications, and stored inquiry records.
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="rounded border border-ink/10 bg-white p-6 shadow-soft sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="label">Name</span>
          <input className="field" name="name" required placeholder="Your name" />
        </label>
        <label className="grid gap-2">
          <span className="label">Email</span>
          <input className="field" name="email" type="email" required placeholder="you@example.com" />
        </label>
        <label className="grid gap-2">
          <span className="label">Phone</span>
          <input className="field" name="phone" type="tel" placeholder="Phone placeholder" />
        </label>
        <label className="grid gap-2">
          <span className="label">Service Interest</span>
          <select className="field" name="interest" defaultValue="Rental inquiry">
            {interests.map((interest) => (
              <option key={interest}>{interest}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="mt-5 grid gap-2">
        <span className="label">Subject</span>
        <input className="field" name="subject" required placeholder="How can Remvick help?" />
      </label>
      <label className="mt-5 grid gap-2">
        <span className="label">Message</span>
        <textarea className="field min-h-36 resize-y" name="message" required placeholder="Share a few details..." />
      </label>
      <button
        type="submit"
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded bg-clay px-6 py-3 text-sm font-bold text-white transition hover:bg-forest sm:w-auto"
      >
        <Send className="h-4 w-4" />
        Send Message
      </button>
      {submitted ? (
        <p className="mt-4 rounded bg-mist px-4 py-3 text-sm font-semibold text-forest">
          Thank you. This MVP shows a success state; no backend message was sent yet.
        </p>
      ) : null}
    </form>
  );
}
