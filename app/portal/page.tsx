import type { Metadata } from "next";
import { Suspense } from "react";
import { PortalLogin } from "@/components/PortalLogin";

export const metadata: Metadata = {
  title: "Portal Sign In | Remvick Group",
  description: "Demo administrator and tenant sign-in for the Remvick portal.",
};

export default function PortalPage() {
  return (
    <Suspense>
      <PortalLogin />
    </Suspense>
  );
}
