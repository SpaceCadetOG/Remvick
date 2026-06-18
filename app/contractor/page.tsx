import type { Metadata } from "next";
import { RoleGate } from "@/components/RoleGate";

export const metadata: Metadata = {
  title: "Contractor Service Portal Demo | Remvick Group",
  description: "Demo contractor portal for assignments, scheduling, and service updates.",
};

export default function ContractorPage() {
  return <RoleGate role="contractor" />;
}
