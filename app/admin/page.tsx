import type { Metadata } from "next";
import { RoleGate } from "@/components/RoleGate";

export const metadata: Metadata = {
  title: "Tenant Administration Preview | Remvick Group",
  description: "Placeholder tenant administration portal for Remvick Group owner review.",
};

export default function AdminPage() {
  return <RoleGate role="admin" />;
}
