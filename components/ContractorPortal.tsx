"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  HardHat,
  LogOut,
  MapPin,
  MessageSquareText,
  Phone,
  Wrench,
} from "lucide-react";
import { DEMO_SESSION_KEY, type DemoSession } from "@/data/demo-auth";

type JobStatus = "Assigned" | "Scheduled" | "In progress" | "Completed";

type ServiceJob = {
  id: string;
  title: string;
  property: string;
  city: string;
  tenant: string;
  priority: "Routine" | "Urgent";
  scheduled: string;
  status: JobStatus;
};

const initialJobs: ServiceJob[] = [
  {
    id: "job-001",
    title: "Kitchen sink leak",
    property: "Home 2",
    city: "Dolton, IL",
    tenant: "Tenant Two",
    priority: "Urgent",
    scheduled: "Jun 19, 9:00 AM",
    status: "Scheduled",
  },
  {
    id: "job-002",
    title: "Air conditioning inspection",
    property: "Home 1",
    city: "Chicago, IL",
    tenant: "Tenant One",
    priority: "Routine",
    scheduled: "Jun 20, 1:30 PM",
    status: "Assigned",
  },
  {
    id: "job-003",
    title: "Hallway light replacement",
    property: "Home 4",
    city: "Markham, IL",
    tenant: "Tenant Four",
    priority: "Routine",
    scheduled: "Jun 21, 10:00 AM",
    status: "In progress",
  },
];

const statusOrder: JobStatus[] = ["Assigned", "Scheduled", "In progress", "Completed"];

export function ContractorPortal({ session }: { session: DemoSession }) {
  const router = useRouter();
  const [jobs, setJobs] = useState(initialJobs);
  const [selectedJobId, setSelectedJobId] = useState(initialJobs[0].id);
  const [noteSaved, setNoteSaved] = useState(false);
  const [completionPhotos, setCompletionPhotos] = useState<Record<string, boolean>>({});
  const [photoWarning, setPhotoWarning] = useState(false);

  const selectedJob = jobs.find((job) => job.id === selectedJobId) ?? jobs[0];
  const openJobs = jobs.filter((job) => job.status !== "Completed").length;

  function signOut() {
    window.sessionStorage.removeItem(DEMO_SESSION_KEY);
    router.push("/portal");
  }

  function advanceStatus() {
    const nextStatus = statusOrder[Math.min(statusOrder.indexOf(selectedJob.status) + 1, statusOrder.length - 1)];
    if (nextStatus === "Completed" && !completionPhotos[selectedJob.id]) {
      setPhotoWarning(true);
      return;
    }

    setJobs((current) =>
      current.map((job) => {
        if (job.id !== selectedJob.id) return job;
        return { ...job, status: nextStatus };
      }),
    );
    setPhotoWarning(false);
  }

  return (
    <div className="min-h-screen bg-[#f4f6f3]">
      <header className="bg-ink text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Contractor service demo</p>
            <h1 className="mt-1 font-serif text-3xl font-semibold">Service Workbench</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-bold">{session.displayName}</p>
              <p className="text-xs text-white/60">Approved vendor placeholder</p>
            </div>
            <button onClick={signOut} title="Sign out" className="grid h-10 w-10 place-items-center rounded border border-white/20">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <article className="border border-ink/10 bg-white p-5 shadow-sm">
            <Wrench className="h-6 w-6 text-clay" />
            <p className="mt-4 text-sm font-bold text-ink/55">Open assignments</p>
            <p className="mt-1 text-3xl font-bold">{openJobs}</p>
          </article>
          <article className="border border-ink/10 bg-white p-5 shadow-sm">
            <CalendarDays className="h-6 w-6 text-clay" />
            <p className="mt-4 text-sm font-bold text-ink/55">Scheduled today</p>
            <p className="mt-1 text-3xl font-bold">1</p>
          </article>
          <article className="border border-ink/10 bg-white p-5 shadow-sm">
            <CheckCircle2 className="h-6 w-6 text-clay" />
            <p className="mt-4 text-sm font-bold text-ink/55">Completed this month</p>
            <p className="mt-1 text-3xl font-bold">7</p>
          </article>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <section className="border border-ink/10 bg-white shadow-sm">
            <div className="border-b border-ink/10 p-5">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-clay">Assignments</p>
              <h2 className="mt-1 font-serif text-3xl font-semibold">Service queue</h2>
            </div>
            <div className="divide-y divide-ink/10">
              {jobs.map((job) => (
                <button
                  key={job.id}
                  onClick={() => {
                    setSelectedJobId(job.id);
                    setNoteSaved(false);
                    setPhotoWarning(false);
                  }}
                  className={`block w-full p-5 text-left transition ${
                    selectedJob.id === job.id ? "bg-mist" : "hover:bg-[#fafbf9]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold">{job.title}</p>
                      <p className="mt-1 text-sm text-ink/50">{job.property} · {job.city}</p>
                    </div>
                    <span className={`rounded px-2 py-1 text-xs font-bold uppercase ${
                      job.priority === "Urgent" ? "bg-clay/15 text-clay" : "bg-forest/10 text-forest"
                    }`}>
                      {job.priority}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-ink/55"><Clock3 className="h-4 w-4" />{job.scheduled}</span>
                    <span className="font-bold text-forest">{job.status}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="border border-ink/10 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-clay">Work order</p>
                <h2 className="mt-2 font-serif text-3xl font-semibold">{selectedJob.title}</h2>
                <p className="mt-2 flex items-center gap-2 text-ink/55">
                  <MapPin className="h-4 w-4" />
                  {selectedJob.property}, {selectedJob.city}
                </p>
              </div>
              <span className="rounded bg-gold/25 px-3 py-2 text-sm font-bold">{selectedJob.status}</span>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="bg-mist p-4">
                <p className="text-sm text-ink/50">Resident</p>
                <p className="mt-1 font-bold">{selectedJob.tenant}</p>
              </div>
              <div className="bg-mist p-4">
                <p className="text-sm text-ink/50">Appointment</p>
                <p className="mt-1 font-bold">{selectedJob.scheduled}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button disabled className="inline-flex items-center gap-2 rounded border border-ink/15 px-4 py-3 text-sm font-bold opacity-60">
                <Phone className="h-4 w-4" />
                Call resident
              </button>
              <button disabled className="inline-flex items-center gap-2 rounded border border-ink/15 px-4 py-3 text-sm font-bold opacity-60">
                <MessageSquareText className="h-4 w-4" />
                Message
              </button>
            </div>

            <label className="mt-7 grid gap-2">
              <span className="label">Service notes</span>
              <textarea className="field min-h-32" placeholder="Describe work performed, materials, and follow-up needs." />
            </label>
            <label className="mt-5 grid gap-2">
              <span className="label">Required completion photos</span>
              <input
                className="field"
                type="file"
                accept="image/*"
                multiple
                onChange={(event) => {
                  setCompletionPhotos((current) => ({ ...current, [selectedJob.id]: Boolean(event.currentTarget.files?.length) }));
                  setPhotoWarning(false);
                }}
              />
            </label>
            <label className="mt-5 grid gap-2">
              <span className="label">Completion update</span>
              <textarea className="field min-h-24" placeholder="Document resolution, remaining issues, and tenant/vendor follow-up." />
            </label>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => setNoteSaved(true)}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded border border-forest px-4 font-bold text-forest"
              >
                <ClipboardCheck className="h-4 w-4" />
                Save demo note
              </button>
              <button
                onClick={advanceStatus}
                disabled={selectedJob.status === "Completed"}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded bg-clay px-4 font-bold text-white disabled:opacity-50"
              >
                <HardHat className="h-4 w-4" />
                {selectedJob.status === "Completed" ? "Job completed" : "Advance job status"}
              </button>
            </div>
            {noteSaved ? <p className="mt-4 bg-forest/10 p-4 text-sm font-semibold text-forest">Service note saved in this browser session.</p> : null}
            {photoWarning ? <p className="mt-4 bg-clay/10 p-4 text-sm font-semibold text-clay">Attach at least one completion photo before marking this job complete.</p> : null}
          </section>
        </div>

        <p className="mt-6 text-xs leading-5 text-ink/45">
          Contractor access is simulated. Future production access will require vendor accounts,
          assignment permissions, audit logs, secure messaging, and controlled tenant contact details.
        </p>
      </main>
    </div>
  );
}
