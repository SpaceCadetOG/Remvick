"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Home,
  LogOut,
  ShieldCheck,
  UserRound,
  WalletCards,
} from "lucide-react";
import { DEMO_SESSION_KEY, type DemoSession } from "@/data/demo-auth";
import { publicProperties } from "@/data/properties";

type ApplicationStep = 1 | 2 | 3 | 4;

const steps = [
  { number: 1 as const, label: "Basics", icon: Home },
  { number: 2 as const, label: "Screening", icon: UserRound },
  { number: 3 as const, label: "Offline income", icon: WalletCards },
  { number: 4 as const, label: "Review", icon: ShieldCheck },
];

export function ApplicantPortal({ session }: { session: DemoSession }) {
  const router = useRouter();
  const [step, setStep] = useState<ApplicationStep>(1);
  const [selectedProperty, setSelectedProperty] = useState(publicProperties[0].id);
  const [screeningPass, setScreeningPass] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const property = publicProperties.find((item) => item.id === selectedProperty) ?? publicProperties[0];

  function signOut() {
    window.sessionStorage.removeItem(DEMO_SESSION_KEY);
    router.push("/portal");
  }

  function nextStep() {
    setStep((current) => Math.min(4, current + 1) as ApplicationStep);
  }

  function previousStep() {
    setStep((current) => Math.max(1, current - 1) as ApplicationStep);
  }

  function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-mist">
        <header className="bg-forest text-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-6 sm:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Applicant portal demo</p>
              <h1 className="mt-1 font-serif text-3xl font-semibold">Application status</h1>
            </div>
            <button onClick={signOut} title="Sign out" className="grid h-10 w-10 place-items-center rounded border border-white/20">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </header>
        <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
          <section className="border border-ink/10 bg-white p-8 text-center shadow-soft sm:p-12">
            <CheckCircle2 className="mx-auto h-14 w-14 text-forest" />
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-clay">Demo submitted</p>
            <h2 className="mt-2 font-serif text-4xl font-semibold">Application received</h2>
            <p className="mx-auto mt-4 max-w-xl leading-7 text-ink/60">
              Your placeholder application for {property.title} in {property.city}, {property.state}
              has been added to this browser session. No personal information was transmitted.
            </p>
            <div className="mx-auto mt-8 grid max-w-lg gap-4 bg-mist p-5 text-left sm:grid-cols-2">
              <div><p className="text-sm text-ink/50">Application ID</p><p className="mt-1 font-bold">APP-DEMO-1001</p></div>
              <div><p className="text-sm text-ink/50">Status</p><p className="mt-1 font-bold text-clay">{screeningPass ? "Eligible to schedule showing" : "Needs admin review"}</p></div>
              <div><p className="text-sm text-ink/50">Rental</p><p className="mt-1 font-bold">{property.title}</p></div>
              <div><p className="text-sm text-ink/50">Next step</p><p className="mt-1 font-bold">{screeningPass ? "Showing scheduling" : "Manual follow-up"}</p></div>
            </div>
            <div className="mx-auto mt-5 max-w-lg rounded border border-ink/10 bg-white p-5 text-left">
              <p className="font-bold">Workflow placeholder</p>
              <p className="mt-2 text-sm leading-6 text-ink/60">
                Applicants who pass basic criteria can schedule a property showing. The secure
                background-check link is sent only after the showing or manual approval step.
              </p>
            </div>
            <button onClick={() => setSubmitted(false)} className="mt-8 rounded bg-forest px-5 py-3 font-bold text-white">
              Review demo application
            </button>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6f3]">
      <header className="bg-ink text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">New applicant demo</p>
            <h1 className="mt-1 font-serif text-3xl font-semibold">Rental Application</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-bold">{session.displayName}</p>
              <p className="text-xs text-white/60">Application not yet submitted</p>
            </div>
            <button onClick={signOut} title="Sign out" className="grid h-10 w-10 place-items-center rounded border border-white/20">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <aside className="h-fit border border-ink/10 bg-white p-4 shadow-sm">
            <p className="px-2 pb-4 text-xs font-bold uppercase tracking-[0.15em] text-ink/45">Application steps</p>
            <div className="grid gap-2">
              {steps.map(({ number, label, icon: Icon }) => (
                <button
                  key={number}
                  onClick={() => setStep(number)}
                  className={`flex min-h-12 items-center gap-3 rounded px-3 text-left text-sm font-bold ${
                    step === number ? "bg-forest text-white" : number < step ? "bg-forest/10 text-forest" : "text-ink/55"
                  }`}
                >
                  <span className="grid h-7 w-7 place-items-center rounded border border-current text-xs">{number}</span>
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>
            <p className="mt-5 border-t border-ink/10 px-2 pt-4 text-xs leading-5 text-ink/45">
              Demo only. Do not enter real Social Security numbers, bank details, or identity documents.
            </p>
          </aside>

          <form onSubmit={submitApplication} className="min-w-0 border border-ink/10 bg-white p-6 shadow-sm sm:p-8">
            {step === 1 ? (
              <section>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-clay">Step 1</p>
                <h2 className="mt-2 font-serif text-3xl font-semibold">Applicant basics and rental interest</h2>
                <p className="mt-3 text-ink/55">Select the public rental you are interested in and provide basic contact details.</p>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {publicProperties.map((item) => (
                    <label
                      key={item.id}
                      className={`cursor-pointer border p-5 transition ${
                        selectedProperty === item.id ? "border-forest bg-mist" : "border-ink/10 hover:border-clay"
                      }`}
                    >
                      <input
                        type="radio"
                        name="property"
                        value={item.id}
                        checked={selectedProperty === item.id}
                        onChange={() => setSelectedProperty(item.id)}
                        className="sr-only"
                      />
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-lg font-bold">{item.title}</p>
                          <p className="mt-1 text-sm text-ink/55">{item.city}, {item.state}</p>
                        </div>
                        <Building2 className="h-5 w-5 text-clay" />
                      </div>
                      <p className="mt-5 text-2xl font-bold text-forest">${item.rentAmount.toLocaleString()}<span className="text-sm text-ink/45"> / mo</span></p>
                      <p className="mt-2 text-sm text-ink/55">{item.bedrooms} bed / {item.bathrooms} bath / {item.squareFeet} sq ft</p>
                    </label>
                  ))}
                </div>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2"><span className="label">First name</span><input className="field" required placeholder="Applicant" /></label>
                  <label className="grid gap-2"><span className="label">Last name</span><input className="field" required placeholder="Placeholder" /></label>
                  <label className="grid gap-2"><span className="label">Email</span><input className="field" type="email" required placeholder="applicant@example.com" /></label>
                  <label className="grid gap-2"><span className="label">Phone</span><input className="field" required placeholder="(000) 000-0000" /></label>
                  <label className="grid gap-2"><span className="label">Desired move-in date</span><input className="field" type="date" required /></label>
                  <label className="grid gap-2"><span className="label">Household size</span><input className="field" type="number" min="1" defaultValue="1" required /></label>
                </div>
              </section>
            ) : null}

            {step === 2 ? (
              <section>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-clay">Step 2</p>
                <h2 className="mt-2 font-serif text-3xl font-semibold">Basic screening questions</h2>
                <p className="mt-3 text-ink/55">
                  These demo answers determine whether the applicant can schedule a showing. Final
                  criteria, notices, and compliance language must be reviewed before production.
                </p>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2"><span className="label">Can you provide photo ID before lease signing?</span><select className="field" required><option>Yes</option><option>No</option></select></label>
                  <label className="grid gap-2"><span className="label">Have you had an eviction in the last 3 years?</span><select className="field" required onChange={(event) => setScreeningPass(event.currentTarget.value === "No")}><option>No</option><option>Yes</option></select></label>
                  <label className="grid gap-2"><span className="label">Can you attend a property showing?</span><select className="field" required><option>Yes</option><option>No</option></select></label>
                  <label className="grid gap-2"><span className="label">Desired lease length</span><select className="field" required><option>12 months</option><option>Month-to-month placeholder</option><option>Other</option></select></label>
                </div>
                <label className="mt-5 grid gap-2"><span className="label">Current address</span><input className="field" required placeholder="Address placeholder" /></label>
                <label className="mt-5 grid gap-2"><span className="label">Additional occupants or notes</span><textarea className="field min-h-24" placeholder="Names, relationships, pets, or scheduling notes" /></label>
                <div className={`mt-5 rounded p-4 text-sm font-semibold ${screeningPass ? "bg-forest/10 text-forest" : "bg-clay/10 text-clay"}`}>
                  {screeningPass
                    ? "Demo result: applicant may schedule a showing after admin review."
                    : "Demo result: application should pause for manual admin review."}
                </div>
              </section>
            ) : null}

            {step === 3 ? (
              <section>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-clay">Step 3</p>
                <h2 className="mt-2 font-serif text-3xl font-semibold">Income verification disabled</h2>
                <div className="mt-6 border border-dashed border-ink/20 bg-mist p-6">
                  <p className="font-bold">Handled offline for now</p>
                  <p className="mt-2 leading-7 text-ink/60">
                    Income verification is intentionally disabled in the online demo. In production,
                    this step can collect documents or connect to a screening partner after Remvick
                    confirms the workflow and required disclosures.
                  </p>
                  <fieldset disabled className="mt-6 grid gap-5 opacity-50 sm:grid-cols-2">
                    <label className="grid gap-2"><span className="label">Employer</span><input className="field" placeholder="Disabled placeholder" /></label>
                    <label className="grid gap-2"><span className="label">Monthly gross income</span><input className="field" placeholder="Disabled placeholder" /></label>
                  </fieldset>
                </div>
              </section>
            ) : null}

            {step === 4 ? (
              <section>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-clay">Step 4</p>
                <h2 className="mt-2 font-serif text-3xl font-semibold">Final review and submission</h2>
                <div className="mt-6 grid gap-4 bg-mist p-5 sm:grid-cols-2">
                  <div><p className="text-sm text-ink/50">Rental</p><p className="mt-1 font-bold">{property.title}</p></div>
                  <div><p className="text-sm text-ink/50">Location</p><p className="mt-1 font-bold">{property.city}, {property.state}</p></div>
                  <div><p className="text-sm text-ink/50">Monthly rent</p><p className="mt-1 font-bold">${property.rentAmount.toLocaleString()}</p></div>
                  <div><p className="text-sm text-ink/50">Basic criteria</p><p className="mt-1 font-bold">{screeningPass ? "Pass placeholder" : "Manual review"}</p></div>
                </div>
                <div className="mt-5 rounded border border-ink/10 p-5">
                  <p className="font-bold">Next workflow after submission</p>
                  <ol className="mt-3 grid gap-2 text-sm leading-6 text-ink/65">
                    <li>1. Admin reviews the basic application.</li>
                    <li>2. Qualified applicants schedule a property showing.</li>
                    <li>3. Background-check link is sent only after showing or manual approval.</li>
                  </ol>
                </div>
                <div className="mt-6 grid gap-4">
                  <label className="flex items-start gap-3"><input type="checkbox" required className="mt-1" /><span className="text-sm leading-6 text-ink/65">I certify that this demo application information is complete and understand no real screening occurs.</span></label>
                  <label className="flex items-start gap-3"><input type="checkbox" required className="mt-1" /><span className="text-sm leading-6 text-ink/65">I acknowledge that production screening, disclosures, fees, privacy terms, and fair-housing language must be added later.</span></label>
                </div>
              </section>
            ) : null}

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-ink/10 pt-6 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={previousStep}
                disabled={step === 1}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded border border-ink/15 px-4 font-bold disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>
              {step < 4 ? (
                <button type="button" onClick={nextStep} className="inline-flex min-h-11 items-center justify-center gap-2 rounded bg-clay px-5 font-bold text-white">
                  Continue
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button type="submit" className="inline-flex min-h-11 items-center justify-center gap-2 rounded bg-forest px-5 font-bold text-white">
                  <ClipboardList className="h-4 w-4" />
                  Submit demo application
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
