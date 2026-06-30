export type BusinessLine = {
  name: string;
  description: string;
  href?: string;
  status?: "Live" | "Under construction";
};

export const businessLines: BusinessLine[] = [
  {
    name: "Rentals",
    description: "Rental housing information, tenant resources, and future resident workflows.",
    href: "/portal",
    status: "Live",
  },
  {
    name: "Listings",
    description: "Public rental listings for available and upcoming homes. Occupied homes stay private.",
    href: "/rentals",
    status: "Live",
  },
  {
    name: "Sales",
    description: "Future sales-related support and owner-approved property opportunities.",
    href: "/contact",
    status: "Under construction",
  },
  {
    name: "Property Management for Others",
    description: "Consulting and management support for people outside Remvick-owned properties.",
    href: "/consulting",
    status: "Live",
  },
];
