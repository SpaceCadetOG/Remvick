"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Building2, Eye, EyeOff, HardHat, KeyRound, LogIn, ShieldCheck, Users } from "lucide-react";
import { authenticateDemoUser, DEMO_SESSION_KEY } from "@/data/demo-auth";

export function PortalLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const session = authenticateDemoUser(username, password);

    if (!session) {
      setError("Demo username or password was not recognized.");
      return;
    }

    window.sessionStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(session));
    const roleDestination =
      session.role === "admin"
        ? "/admin"
        : session.role === "contractor"
          ? "/contractor"
          : "/tenant";
    router.push(roleDestination);
  }

  function useCredential(nextUsername: string, nextPassword: string) {
    setUsername(nextUsername);
    setPassword(nextPassword);
    setError("");
  }

  return (
    <section className="bg-mist px-5 py-12 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-6xl overflow-hidden border border-ink/10 bg-white shadow-soft lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-forest p-8 text-white sm:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">Remvick Portal</p>
          <h1 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">Choose the right workspace.</h1>
          <p className="mt-5 max-w-md leading-7 text-white/75">
            This demo separates owner and property-management operations from each tenant&apos;s
            personal rental experience.
          </p>
          <div className="mt-10 grid gap-4">
            <div className="border border-white/15 bg-white/5 p-5">
              <ShieldCheck className="h-7 w-7 text-gold" />
              <p className="mt-3 font-bold">Administrator</p>
              <p className="mt-1 text-sm text-white/65">Tenants, leases, payments, maintenance, documents, and notices.</p>
            </div>
            <div className="border border-white/15 bg-white/5 p-5">
              <Users className="h-7 w-7 text-gold" />
              <p className="mt-3 font-bold">Tenant</p>
              <p className="mt-1 text-sm text-white/65">Balance, payment simulation, lease information, requests, and files.</p>
            </div>
            <div className="border border-white/15 bg-white/5 p-5">
              <HardHat className="h-7 w-7 text-gold" />
              <p className="mt-3 font-bold">Contractor / Service</p>
              <p className="mt-1 text-sm text-white/65">Assigned work orders, scheduling, notes, and completion updates.</p>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-12">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded bg-linen text-clay">
              <Building2 className="h-6 w-6" />
            </span>
            <div>
              <p className="font-serif text-2xl font-semibold">Sign in</p>
              <p className="text-sm text-ink/55">Demo credentials only</p>
            </div>
          </div>

          <form onSubmit={signIn} className="mt-8">
            <label className="grid gap-2">
              <span className="label">Username</span>
              <input
                className="field"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
                required
                placeholder="admin or tenant1"
              />
            </label>
            <label className="mt-5 grid gap-2">
              <span className="label">Password</span>
              <span className="relative">
                <input
                  className="field pr-12"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="Enter demo password"
                />
                <button
                  type="button"
                  title={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-2 top-2 grid h-9 w-9 place-items-center text-ink/45"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </span>
            </label>
            {error ? <p className="mt-4 bg-clay/10 px-4 py-3 text-sm font-semibold text-clay">{error}</p> : null}
            <button className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded bg-clay px-5 py-3 font-bold text-white transition hover:bg-forest">
              <LogIn className="h-4 w-4" />
              Sign in to demo
            </button>
          </form>

          <div className="mt-8 border-t border-ink/10 pt-6">
            <p className="flex items-center gap-2 text-sm font-bold">
              <KeyRound className="h-4 w-4 text-clay" />
              Quick demo accounts
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button onClick={() => useCredential("admin", "admin")} className="border border-ink/10 p-4 text-left transition hover:border-clay">
                <span className="block font-bold">Administrator</span>
                <span className="mt-1 block text-sm text-ink/55">admin / admin</span>
              </button>
              <button onClick={() => useCredential("contractor", "service")} className="border border-ink/10 p-4 text-left transition hover:border-clay">
                <span className="block font-bold">Contractor / Service</span>
                <span className="mt-1 block text-sm text-ink/55">contractor / service</span>
              </button>
              {[1, 2, 3, 4].map((number) => (
                <button
                  key={number}
                  onClick={() => useCredential(`tenant${number}`, `ten${number}`)}
                  className="border border-ink/10 p-4 text-left transition hover:border-clay"
                >
                  <span className="block font-bold">Tenant {number}</span>
                  <span className="mt-1 block text-sm text-ink/55">tenant{number} / ten{number}</span>
                </button>
              ))}
            </div>
            <p className="mt-5 text-xs leading-5 text-ink/45">
              This is simulated authentication. Credentials and sessions are not secure and must
              be replaced with a real identity provider before using real tenant information.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
