"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  Building2,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  MessageSquareText,
  Plus,
  ReceiptText,
  Send,
  Wrench,
} from "lucide-react";
import { DEMO_SESSION_KEY, type DemoSession } from "@/data/demo-auth";
import { tenantRecords } from "@/data/tenant-admin";

type TenantView = "Home" | "Payments" | "Maintenance" | "Lease" | "Documents" | "Notices";

const tenantViews: { name: TenantView; icon: typeof Home }[] = [
  { name: "Home", icon: LayoutDashboard },
  { name: "Payments", icon: CircleDollarSign },
  { name: "Maintenance", icon: Wrench },
  { name: "Lease", icon: FileText },
  { name: "Documents", icon: ReceiptText },
  { name: "Notices", icon: MessageSquareText },
];

export function TenantPortal({ session }: { session: DemoSession }) {
  const router = useRouter();
  const [activeView, setActiveView] = useState<TenantView>("Home");
  const [balance, setBalance] = useState(() => {
    const tenant = tenantRecords.find((record) => record.id === session.tenantId);
    return tenant?.balance ?? 0;
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [maintenanceSuccess, setMaintenanceSuccess] = useState(false);
  const [requests, setRequests] = useState([
    { title: "Example completed request", detail: "Bathroom fixture inspection", status: "Completed" },
  ]);

  const tenant = useMemo(
    () => tenantRecords.find((record) => record.id === session.tenantId) ?? tenantRecords[0],
    [session.tenantId],
  );

  function signOut() {
    window.sessionStorage.removeItem(DEMO_SESSION_KEY);
    router.push("/portal");
  }

  function submitPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBalance(0);
    setPaymentSuccess(true);
  }

  function submitMaintenance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const title = String(data.get("issue") || "Maintenance request");
    const category = String(data.get("category") || "General");
    setRequests((current) => [{ title, detail: `${category} / photos attached / submitted just now`, status: "Open" }, ...current]);
    setMaintenanceSuccess(true);
    form.reset();
  }

  const rentAmount = tenant.property === "Home 1" ? 2250 : tenant.property === "Home 2" ? 1650 : tenant.property === "Home 3" ? 2850 : 1350;

  return (
    <div className="min-h-screen bg-[#f4f6f3]">
      <div className="bg-forest text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Tenant portal demo</p>
            <h1 className="mt-1 font-serif text-3xl font-semibold">Welcome, {tenant.name}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold">{tenant.property}</p>
              <p className="text-xs text-white/65">{tenant.unit}</p>
            </div>
            <button title="Notifications" className="grid h-10 w-10 place-items-center rounded border border-white/20">
              <Bell className="h-5 w-5" />
            </button>
            <button onClick={signOut} title="Sign out" className="grid h-10 w-10 place-items-center rounded border border-white/20">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl md:grid-cols-[210px_1fr]">
        <aside className="border-b border-ink/10 bg-white p-4 md:min-h-[calc(100vh-105px)] md:border-b-0 md:border-r">
          <nav className="flex gap-2 overflow-x-auto md:grid">
            {tenantViews.map(({ name, icon: Icon }) => (
              <button
                key={name}
                onClick={() => setActiveView(name)}
                className={`flex min-h-11 shrink-0 items-center gap-3 rounded px-3 py-2 text-sm font-bold ${
                  activeView === name ? "bg-forest text-white" : "text-ink/60 hover:bg-mist"
                }`}
              >
                <Icon className="h-4 w-4" />
                {name}
              </button>
            ))}
          </nav>
          <div className="mt-6 hidden border-t border-ink/10 pt-5 text-xs leading-5 text-ink/45 md:block">
            Demo only. No real payment, message, document, or maintenance data is transmitted.
          </div>
        </aside>

        <main className="min-w-0 p-5 sm:p-8">
          {activeView === "Home" ? (
            <>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-clay">My home</p>
                <h2 className="mt-1 font-serif text-4xl font-semibold">{tenant.property}</h2>
                <p className="mt-2 text-ink/55">{tenant.unit}</p>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <article className="border border-ink/10 bg-white p-5 shadow-sm">
                  <CircleDollarSign className="h-6 w-6 text-clay" />
                  <p className="mt-4 text-sm font-bold text-ink/55">Current balance</p>
                  <p className="mt-2 text-3xl font-bold">${balance.toLocaleString()}</p>
                  <button onClick={() => setActiveView("Payments")} className="mt-5 text-sm font-bold text-forest">View payments</button>
                </article>
                <article className="border border-ink/10 bg-white p-5 shadow-sm">
                  <CalendarDays className="h-6 w-6 text-clay" />
                  <p className="mt-4 text-sm font-bold text-ink/55">Lease ends</p>
                  <p className="mt-2 text-xl font-bold">{tenant.leaseEnd}</p>
                  <button onClick={() => setActiveView("Lease")} className="mt-5 text-sm font-bold text-forest">View lease</button>
                </article>
                <article className="border border-ink/10 bg-white p-5 shadow-sm">
                  <Wrench className="h-6 w-6 text-clay" />
                  <p className="mt-4 text-sm font-bold text-ink/55">Maintenance</p>
                  <p className="mt-2 text-xl font-bold">{requests.filter((request) => request.status === "Open").length} open requests</p>
                  <button onClick={() => setActiveView("Maintenance")} className="mt-5 text-sm font-bold text-forest">Request service</button>
                </article>
              </div>
              <section className="mt-6 border border-ink/10 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <Home className="h-6 w-6 text-clay" />
                  <h3 className="text-lg font-bold">Property summary</h3>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <div><p className="text-sm text-ink/50">Monthly rent</p><p className="mt-1 font-bold">${rentAmount.toLocaleString()}</p></div>
                  <div><p className="text-sm text-ink/50">Lease status</p><p className="mt-1 font-bold">{tenant.status}</p></div>
                  <div><p className="text-sm text-ink/50">Contact</p><p className="mt-1 font-bold">{tenant.email}</p></div>
                </div>
              </section>
            </>
          ) : null}

          {activeView === "Payments" ? (
            <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
              <section className="border border-ink/10 bg-white p-6 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-clay">Payment center</p>
                <h2 className="mt-2 font-serif text-3xl font-semibold">Pay rent</h2>
                <div className="mt-6 bg-mist p-5">
                  <p className="text-sm text-ink/55">Amount due</p>
                  <p className="mt-1 text-4xl font-bold">${balance.toLocaleString()}</p>
                </div>
                {balance > 0 ? (
                  <form onSubmit={submitPayment} className="mt-6 grid gap-5">
                    <label className="grid gap-2"><span className="label">Payment method</span><select className="field"><option>Demo bank account ending 0000</option><option>Demo card ending 1111</option></select></label>
                    <label className="grid gap-2"><span className="label">Amount</span><input className="field" value={balance} readOnly /></label>
                    <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-clay px-5 font-bold text-white">
                      <CircleDollarSign className="h-4 w-4" />
                      Simulate payment
                    </button>
                  </form>
                ) : (
                  <div className="mt-6 flex items-center gap-3 bg-forest/10 p-4 font-semibold text-forest">
                    <CheckCircle2 className="h-5 w-5" />
                    Balance paid in this demo session.
                  </div>
                )}
                {paymentSuccess ? <p className="mt-4 text-sm text-ink/55">No money moved. This confirmation is browser-only.</p> : null}
              </section>
              <section className="border border-ink/10 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold">Payment history</h3>
                <div className="mt-5 grid gap-4">
                  <div className="flex items-center justify-between border-b border-ink/10 pb-4"><div><p className="font-bold">June rent</p><p className="text-sm text-ink/50">Demo record</p></div><span className="font-bold">${rentAmount.toLocaleString()}</span></div>
                  <div className="flex items-center justify-between border-b border-ink/10 pb-4"><div><p className="font-bold">May rent</p><p className="text-sm text-ink/50">Paid May 1</p></div><span className="font-bold">${rentAmount.toLocaleString()}</span></div>
                </div>
              </section>
            </div>
          ) : null}

          {activeView === "Maintenance" ? (
            <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
              <section className="border border-ink/10 bg-white p-6 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-clay">Maintenance</p>
                <h2 className="mt-2 font-serif text-3xl font-semibold">Request service</h2>
                <form onSubmit={submitMaintenance} className="mt-6 grid gap-5">
                  <label className="grid gap-2"><span className="label">Issue</span><input className="field" name="issue" required placeholder="Describe the problem briefly" /></label>
                  <label className="grid gap-2"><span className="label">Maintenance category</span><select className="field" name="category" required><option>Plumbing</option><option>Electrical</option><option>Heating / cooling</option><option>Appliance</option><option>Exterior</option><option>Other</option></select></label>
                  <label className="grid gap-2"><span className="label">Nature of problem</span><select className="field" name="nature" required><option>Repair needed</option><option>Leak or water concern</option><option>Safety concern</option><option>Inspection requested</option><option>Follow-up needed</option></select></label>
                  <label className="grid gap-2"><span className="label">Priority</span><select className="field" name="priority"><option>Routine</option><option>Urgent</option><option>Emergency placeholder</option></select></label>
                  <label className="grid gap-2"><span className="label">Details</span><textarea className="field min-h-28" name="details" required placeholder="Where is the issue and when did it begin?" /></label>
                  <label className="grid gap-2"><span className="label">Required photos</span><input className="field" name="photos" type="file" accept="image/*" multiple required /></label>
                  <label className="grid gap-2"><span className="label">Notes or updates</span><textarea className="field min-h-24" name="notes" placeholder="Add access notes, preferred times, or other updates." /></label>
                  <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-clay px-5 font-bold text-white"><Send className="h-4 w-4" />Submit demo request</button>
                </form>
                {maintenanceSuccess ? <p className="mt-4 bg-forest/10 p-4 text-sm font-semibold text-forest">Request added to this browser session.</p> : null}
              </section>
              <section className="border border-ink/10 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold">My requests</h3>
                <div className="mt-5 grid gap-4">
                  {requests.map((request, index) => (
                    <div key={`${request.title}-${index}`} className="border-l-4 border-gold bg-mist p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div><p className="font-bold">{request.title}</p><p className="mt-1 text-sm text-ink/50">{request.detail}</p></div>
                        <span className="text-xs font-bold uppercase text-forest">{request.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          ) : null}

          {activeView === "Lease" ? (
            <section className="border border-ink/10 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-clay">Lease summary</p>
              <h2 className="mt-2 font-serif text-3xl font-semibold">{tenant.property}</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div><p className="text-sm text-ink/50">Tenant</p><p className="mt-1 font-bold">{tenant.name}</p></div>
                <div><p className="text-sm text-ink/50">Monthly rent</p><p className="mt-1 font-bold">${rentAmount.toLocaleString()}</p></div>
                <div><p className="text-sm text-ink/50">Lease end</p><p className="mt-1 font-bold">{tenant.leaseEnd}</p></div>
                <div><p className="text-sm text-ink/50">Status</p><p className="mt-1 font-bold">{tenant.status}</p></div>
              </div>
              <button disabled className="mt-7 inline-flex items-center gap-2 rounded bg-ink px-4 py-3 text-sm font-bold text-white opacity-60"><FileText className="h-4 w-4" />Download lease placeholder</button>
            </section>
          ) : null}

          {activeView === "Documents" ? (
            <section className="border border-ink/10 bg-white shadow-sm">
              <div className="border-b border-ink/10 p-6"><h2 className="font-serif text-3xl font-semibold">Documents</h2><p className="mt-2 text-ink/55">Demo file list. Downloads are not connected.</p></div>
              {["Lease agreement.pdf", "Move-in checklist.pdf", "Resident handbook.pdf"].map((document) => (
                <div key={document} className="flex items-center justify-between border-b border-ink/10 p-5"><div className="flex items-center gap-3"><FileText className="h-5 w-5 text-clay" /><span className="font-bold">{document}</span></div><button disabled className="text-sm font-bold text-ink/35">Download</button></div>
              ))}
            </section>
          ) : null}

          {activeView === "Notices" ? (
            <section className="border border-ink/10 bg-white p-6 shadow-sm">
              <h2 className="font-serif text-3xl font-semibold">Notices</h2>
              <div className="mt-6 grid gap-4">
                <article className="border-l-4 border-gold bg-mist p-5"><p className="font-bold">Portal demo is now available</p><p className="mt-2 text-sm leading-6 text-ink/60">This notice demonstrates future property announcements and direct tenant communications.</p></article>
                <article className="border-l-4 border-forest bg-mist p-5"><p className="font-bold">Seasonal property reminder</p><p className="mt-2 text-sm leading-6 text-ink/60">Placeholder content for inspections, maintenance scheduling, and community information.</p></article>
              </div>
            </section>
          ) : null}
        </main>
      </div>
    </div>
  );
}
