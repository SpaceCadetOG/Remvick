export type BusinessLine = {
  name: string;
  description: string;
  href?: string;
  status?: "Live" | "Under construction";
};

export const businessLines: BusinessLine[] = [
  {
    name: "Remvick Group",
    description: "Main public site for the family real estate business.",
    href: "https://remvick-web-zihnjtarma-uc.a.run.app",
    status: "Live",
  },
  {
    name: "High Eye Solutions",
    description: "Property marketing, listing presentation, rental descriptions, and photo-ready positioning.",
    href: "https://high-eye-solutions-100156978383.us-central1.run.app",
    status: "Live",
  },
  {
    name: "Remvick Consulting",
    description: "Brokerage and consulting site planned.",
    status: "Under construction",
  },
  {
    name: "Rentals & Tenants",
    description: "Future rental and tenant experience.",
    href: "/rentals",
    status: "Live",
  },
  {
    name: "Drone Services",
    description: "Future aerial property media site.",
    status: "Under construction",
  },
  {
    name: "Residential Home Inspections",
    description: "Future residential inspection services site.",
    status: "Under construction",
  },
];
