import type { Metadata } from "next";
import { RoleGate } from "@/components/RoleGate";

export const metadata: Metadata = {
  title: "Rental Application Demo | Remvick Group",
  description: "Demo rental application experience for new Remvick applicants.",
};

export default function ApplicantPage() {
  return <RoleGate role="applicant" />;
}
