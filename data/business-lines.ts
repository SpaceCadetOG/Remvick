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
    name: "Remvick Consulting",
    description: "Brokerage, property management, leasing, remodeling, and real estate operations support.",
    href: "/consulting",
    status: "Live",
  },
  {
    name: "Rental Listings",
    description: "Browse available, upcoming, and occupied rental properties.",
    href: "/rentals",
    status: "Live",
  },
  {
    name: "Tenant Portal",
    description: "Login for tenants, contractors, administrators, and new rental applicants.",
    href: "/portal",
    status: "Live",
  },
];
