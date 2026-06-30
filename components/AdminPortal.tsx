"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  Building2,
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageSquareText,
  Plus,
  Search,
  Settings,
  Users,
  Wrench,
} from "lucide-react";
import { DEMO_SESSION_KEY, type DemoSession } from "@/data/demo-auth";
import {
  maintenanceRecords,
  paymentRecords,
  tenantRecords,
  type MaintenancePriority,
  type PaymentStatus,
  type TenantStatus,
} from "@/data/tenant-admin";

type View =
  | "Overview"
  | "Properties"
  | "House Search"
  | "Listings"
  | "Tenants"
  | "Applications"
  | "Showings"
  | "Background Links"
  | "Leases"
  | "Payments"
  | "Maintenance"
  | "Contractors"
  | "Records"
  | "Documents"
  | "Notices";

const views: { name: View; icon: typeof LayoutDashboard }[] = [
  { name: "Overview", icon: LayoutDashboard },
  { name: "Properties", icon: Building2 },
  { name: "House Search", icon: Search },
  { name: "Listings", icon: ClipboardList },
  { name: "Tenants", icon: Users },
  { name: "Applications", icon: ClipboardList },
  { name: "Showings", icon: CalendarDays },
  { name: "Background Links", icon: FileText },
  { name: "Leases", icon: FileText },
  { name: "Payments", icon: CircleDollarSign },
  { name: "Maintenance", icon: Wrench },
  { name: "Contractors", icon: Settings },
  { name: "Records", icon: FileText },
  { name: "Documents", icon: FileText },
  { name: "Notices", icon: MessageSquareText },
];

const tenantStyles: Record<TenantStatus, string> = {
  CURRENT: "bg-forest/10 text-forest",
  PENDING: "bg-gold/25 text-ink",
  NOTICE: "bg-clay/15 text-clay",
};

const paymentStyles: Record<PaymentStatus, string> = {
  PAID: "bg-forest/10 text-forest",
  DUE: "bg-gold/25 text-ink",
  LATE: "bg-clay/15 text-clay",
};

const priorityStyles: Record<MaintenancePriority, string> = {
  LOW: "bg-mist text-forest",
  MEDIUM: "bg-gold/25 text-ink",
  HIGH: "bg-clay/15 text-clay",
};

function Badge({ text, className }: { text: string; className: string }) {
  return <span className={`rounded px-2 py-1 text-xs font-bold uppercase ${className}`}>{text}</span>;
}

function PlaceholderPanel({ view }: { view: View }) {
  return (
    <section className="border border-ink/10 bg-white p-6 shadow-sm">
      <p className="text-sm font-bold uppercase text-clay">Placeholder module</p>
      <h2 className="mt-2 font-serif text-3xl font-semibold">{view}</h2>
      <p className="mt-3 max-w-2xl text-ink/65">
        This area is prepared for the future {view.toLowerCase()} workflow. Authentication,
        role permissions, database records, uploads, scheduling, background-check links, messaging,
        and notifications will be connected later.
      </p>
      <button className="mt-6 inline-flex items-center gap-2 rounded bg-ink px-4 py-3 text-sm font-bold text-white opacity-60" disabled>
        <Plus className="h-4 w-4" />
        Add {view === "Applications" ? "Application" : view}
      </button>
    </section>
  );
}

export function AdminPortal({ session }: { session: DemoSession }) {
  const router = useRouter();
  const [activeView, setActiveView] = useState<View>("Overview");
  const [query, setQuery] = useState("");

  const filteredTenants = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return tenantRecords;
    return tenantRecords.filter((tenant) =>
      [tenant.name, tenant.email, tenant.property, tenant.unit].some((value) =>
        value.toLowerCase().includes(normalized),
      ),
    );
  }, [query]);

  const totalBalance = tenantRecords.reduce((sum, tenant) => sum + tenant.balance, 0);

  function signOut() {
    window.sessionStorage.removeItem(DEMO_SESSION_KEY);
    router.push("/portal");
  }

  return (
    <div className="min-h-screen bg-[#f4f6f3]">
      <div className="border-b border-ink/10 bg-ink text-white">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-4 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Staff preview</p>
            <h1 className="mt-1 font-serif text-3xl font-semibold">Tenant Administration</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold">{session.displayName}</p>
              <p className="text-xs text-white/60">Owner / Property Manager</p>
            </div>
            <button title="Notifications" className="grid h-10 w-10 place-items-center rounded border border-white/20 bg-white/5">
              <Bell className="h-5 w-5" />
            </button>
            <button title="Settings" className="grid h-10 w-10 place-items-center rounded border border-white/20 bg-white/5">
              <Settings className="h-5 w-5" />
            </button>
            <button onClick={signOut} title="Sign out" className="grid h-10 w-10 place-items-center rounded border border-white/20 bg-white/5">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1500px] lg:grid-cols-[240px_1fr]">
        <aside className="border-b border-ink/10 bg-white p-4 lg:min-h-[calc(100vh-89px)] lg:border-b-0 lg:border-r">
          <nav className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1">
            {views.map(({ name, icon: Icon }) => (
              <button
                key={name}
                onClick={() => setActiveView(name)}
                className={`flex min-h-11 items-center gap-3 rounded px-3 py-2 text-left text-sm font-bold transition ${
                  activeView === name ? "bg-forest text-white" : "text-ink/65 hover:bg-mist hover:text-ink"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {name}
              </button>
            ))}
          </nav>
          <div className="mt-6 hidden border-t border-ink/10 pt-5 lg:block">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-ink/45">System status</p>
            <p className="mt-3 text-sm font-semibold text-clay">Preview data only</p>
            <p className="mt-1 text-xs leading-5 text-ink/50">No live tenant data, payments, messages, or documents.</p>
          </div>
        </aside>

        <div className="min-w-0 p-5 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-clay">{activeView}</p>
              <h2 className="mt-1 font-serif text-4xl font-semibold">
                {activeView === "Overview" ? "Property operations at a glance" : activeView}
              </h2>
            </div>
            <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded bg-clay px-4 py-3 text-sm font-bold text-white">
              <Plus className="h-4 w-4" />
              New tenant
            </button>
          </div>

          {activeView === "Overview" ? (
            <>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  [Users, "Active tenants", "4", "Across four placeholder homes"],
                  [Building2, "Managed properties", "4", "Occupied homes stay private publicly"],
                  [CircleDollarSign, "Open balance", `$${totalBalance.toLocaleString()}`, "Placeholder ledger"],
                  [Wrench, "Open requests", "3", "One high priority"],
                ].map(([Icon, label, value, note]) => (
                  <article key={label as string} className="border border-ink/10 bg-white p-5 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-bold text-ink/55">{label as string}</p>
                        <p className="mt-2 text-3xl font-bold">{value as string}</p>
                      </div>
                      <Icon className="h-6 w-6 text-clay" />
                    </div>
                    <p className="mt-4 text-sm text-ink/50">{note as string}</p>
                  </article>
                ))}
              </div>

              <div className="mt-6 grid gap-6 xl:grid-cols-[1.45fr_0.8fr]">
                <section className="border border-ink/10 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
                    <div>
                      <h3 className="text-lg font-bold">Tenant roster</h3>
                      <p className="text-sm text-ink/50">Current placeholder records</p>
                    </div>
                    <button onClick={() => setActiveView("Tenants")} className="text-sm font-bold text-forest">
                      View all
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[680px] text-left text-sm">
                      <thead className="bg-mist text-xs uppercase text-ink/55">
                        <tr>
                          <th className="px-5 py-3">Tenant</th>
                          <th className="px-5 py-3">Property</th>
                          <th className="px-5 py-3">Lease ends</th>
                          <th className="px-5 py-3">Balance</th>
                          <th className="px-5 py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tenantRecords.map((tenant) => (
                          <tr key={tenant.id} className="border-t border-ink/8">
                            <td className="px-5 py-4 font-bold">{tenant.name}</td>
                            <td className="px-5 py-4">{tenant.property}</td>
                            <td className="px-5 py-4">{tenant.leaseEnd}</td>
                            <td className="px-5 py-4">${tenant.balance.toLocaleString()}</td>
                            <td className="px-5 py-4"><Badge text={tenant.status} className={tenantStyles[tenant.status]} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="border border-ink/10 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">Upcoming</h3>
                    <CalendarDays className="h-5 w-5 text-clay" />
                  </div>
                  <div className="mt-5 grid gap-4">
                    {[
                      ["Jun 20", "Lease renewal review", "Home 3"],
                      ["Jun 24", "Property inspection", "Home 1"],
                      ["Jul 1", "Monthly rent due", "All properties"],
                      ["Jul 5", "Application follow-up", "Home 2"],
                    ].map(([date, title, detail]) => (
                      <div key={`${date}-${title}`} className="flex gap-4 border-l-2 border-gold pl-4">
                        <span className="w-14 shrink-0 text-sm font-bold text-clay">{date}</span>
                        <div>
                          <p className="font-bold">{title}</p>
                          <p className="text-sm text-ink/50">{detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </>
          ) : null}

          {activeView === "Tenants" ? (
            <section className="mt-8 border border-ink/10 bg-white shadow-sm">
              <div className="flex flex-col gap-4 border-b border-ink/10 p-5 sm:flex-row sm:items-center sm:justify-between">
                <label className="relative block max-w-md flex-1">
                  <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-ink/40" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    className="field pl-10"
                    placeholder="Search tenants, homes, or cities"
                  />
                </label>
                <span className="text-sm font-semibold text-ink/50">{filteredTenants.length} records</span>
              </div>
              <div className="divide-y divide-ink/10">
                {filteredTenants.map((tenant) => (
                  <article key={tenant.id} className="grid gap-4 p-5 md:grid-cols-[1fr_1fr_auto] md:items-center">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded bg-mist font-bold text-forest">
                          {tenant.name.split(" ").map((part) => part[0]).join("")}
                        </span>
                        <div>
                          <p className="font-bold">{tenant.name}</p>
                          <p className="text-sm text-ink/50">{tenant.email}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold">{tenant.property}</p>
                      <p className="text-sm text-ink/50">{tenant.unit} · Lease ends {tenant.leaseEnd}</p>
                    </div>
                    <div className="flex items-center justify-between gap-4 md:justify-end">
                      <Badge text={tenant.status} className={tenantStyles[tenant.status]} />
                      <button title={`Open ${tenant.name}`} className="grid h-9 w-9 place-items-center rounded border border-ink/10">
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {activeView === "Payments" ? (
            <section className="mt-8 border border-ink/10 bg-white shadow-sm">
              <div className="border-b border-ink/10 p-5">
                <h3 className="text-lg font-bold">Rent ledger</h3>
                <p className="text-sm text-ink/50">Stripe/payment processing is not connected.</p>
              </div>
              <div className="divide-y divide-ink/10">
                {paymentRecords.map((payment) => (
                  <div key={payment.id} className="grid gap-3 p-5 sm:grid-cols-[1fr_1fr_auto_auto] sm:items-center">
                    <div><p className="font-bold">{payment.tenant}</p><p className="text-sm text-ink/50">{payment.property}</p></div>
                    <p className="text-sm text-ink/60">Due {payment.due}</p>
                    <p className="font-bold">${payment.amount.toLocaleString()}</p>
                    <Badge text={payment.status} className={paymentStyles[payment.status]} />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {activeView === "Maintenance" ? (
            <section className="mt-8 border border-ink/10 bg-white shadow-sm">
              <div className="border-b border-ink/10 p-5">
                <h3 className="text-lg font-bold">Maintenance queue</h3>
                <p className="text-sm text-ink/50">Vendor assignments and tenant notifications are placeholders.</p>
              </div>
              <div className="divide-y divide-ink/10">
                {maintenanceRecords.map((request) => (
                  <div key={request.id} className="grid gap-3 p-5 sm:grid-cols-[1.4fr_1fr_auto_auto] sm:items-center">
                    <div><p className="font-bold">{request.title}</p><p className="text-sm text-ink/50">{request.tenant}</p></div>
                    <p className="text-sm text-ink/60">{request.property}</p>
                    <p className="text-sm text-ink/50">Opened {request.opened}</p>
                    <Badge text={request.priority} className={priorityStyles[request.priority]} />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {!["Overview", "Tenants", "Payments", "Maintenance"].includes(activeView) ? (
            <div className="mt-8">
              <PlaceholderPanel view={activeView} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
