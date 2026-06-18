import type { Metadata } from "next";
import { RoleGate } from "@/components/RoleGate";

export const metadata: Metadata = {
  title: "Tenant Portal Demo | Remvick Group",
  description: "Demo tenant portal for payments, maintenance, lease information, documents, and notices.",
};

export default function TenantPage() {
  return <RoleGate role="tenant" />;
}
