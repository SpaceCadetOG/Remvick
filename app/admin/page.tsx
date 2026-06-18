import type { Metadata } from "next";
import { AdminPortal } from "@/components/AdminPortal";

export const metadata: Metadata = {
  title: "Tenant Administration Preview | Remvick Group",
  description: "Placeholder tenant administration portal for Remvick Group owner review.",
};

export default function AdminPage() {
  return <AdminPortal />;
}
