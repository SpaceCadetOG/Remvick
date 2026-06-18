"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminPortal } from "@/components/AdminPortal";
import { ContractorPortal } from "@/components/ContractorPortal";
import { TenantPortal } from "@/components/TenantPortal";
import { DEMO_SESSION_KEY, type DemoRole, type DemoSession } from "@/data/demo-auth";

type RoleGateProps = {
  role: DemoRole;
};

export function RoleGate({ role }: RoleGateProps) {
  const router = useRouter();
  const [session, setSession] = useState<DemoSession | null>(null);

  useEffect(() => {
    const rawSession = window.sessionStorage.getItem(DEMO_SESSION_KEY);
    if (!rawSession) {
      router.replace(`/portal?next=${role}`);
      return;
    }

    try {
      const parsedSession = JSON.parse(rawSession) as DemoSession;
      if (parsedSession.role !== role) {
        router.replace(
          parsedSession.role === "admin"
            ? "/admin"
            : parsedSession.role === "contractor"
              ? "/contractor"
              : "/tenant",
        );
        return;
      }
      setSession(parsedSession);
    } catch {
      window.sessionStorage.removeItem(DEMO_SESSION_KEY);
      router.replace(`/portal?next=${role}`);
    }
  }, [role, router]);

  if (!session) {
    return (
      <div className="grid min-h-[60vh] place-items-center bg-mist px-5">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-forest">Checking demo session...</p>
      </div>
    );
  }

  if (role === "admin") return <AdminPortal session={session} />;
  if (role === "contractor") return <ContractorPortal session={session} />;
  return <TenantPortal session={session} />;
}
