import type { Metadata } from "next";
import { PortalLogin } from "@/components/PortalLogin";

export const metadata: Metadata = {
  title: "Login | Remvick Group",
  description: "Demo administrator, contractor, and tenant login for the Remvick portal.",
};

export default function PortalPage() {
  return <PortalLogin />;
}
