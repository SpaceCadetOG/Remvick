export type TenantStatus = "CURRENT" | "PENDING" | "NOTICE";
export type PaymentStatus = "PAID" | "DUE" | "LATE";
export type MaintenancePriority = "LOW" | "MEDIUM" | "HIGH";

export type TenantRecord = {
  id: string;
  name: string;
  email: string;
  phone: string;
  property: string;
  unit: string;
  leaseEnd: string;
  balance: number;
  status: TenantStatus;
};

export const tenantRecords: TenantRecord[] = [
  {
    id: "tenant-001",
    name: "Tenant One",
    email: "tenant.one@example.com",
    phone: "(000) 000-0001",
    property: "Home 1",
    unit: "Chicago, IL",
    leaseEnd: "Dec 31, 2026",
    balance: 0,
    status: "CURRENT",
  },
  {
    id: "tenant-002",
    name: "Tenant Two",
    email: "tenant.two@example.com",
    phone: "(000) 000-0002",
    property: "Home 2",
    unit: "Dolton, IL",
    leaseEnd: "Mar 31, 2027",
    balance: 1650,
    status: "PENDING",
  },
  {
    id: "tenant-003",
    name: "Tenant Three",
    email: "tenant.three@example.com",
    phone: "(000) 000-0003",
    property: "Home 3",
    unit: "Calumet City, IL",
    leaseEnd: "Sep 30, 2026",
    balance: 250,
    status: "NOTICE",
  },
  {
    id: "tenant-004",
    name: "Tenant Four",
    email: "tenant.four@example.com",
    phone: "(000) 000-0004",
    property: "Home 4",
    unit: "Markham, IL",
    leaseEnd: "Jun 30, 2027",
    balance: 0,
    status: "CURRENT",
  },
];

export const paymentRecords = [
  { id: "payment-001", tenant: "Tenant One", property: "Home 1", amount: 2250, due: "Jun 1, 2026", status: "PAID" as PaymentStatus },
  { id: "payment-002", tenant: "Tenant Two", property: "Home 2", amount: 1650, due: "Jun 1, 2026", status: "DUE" as PaymentStatus },
  { id: "payment-003", tenant: "Tenant Three", property: "Home 3", amount: 2850, due: "Jun 1, 2026", status: "LATE" as PaymentStatus },
  { id: "payment-004", tenant: "Tenant Four", property: "Home 4", amount: 1350, due: "Jun 1, 2026", status: "PAID" as PaymentStatus },
];

export const maintenanceRecords = [
  { id: "request-001", title: "Kitchen sink leak", tenant: "Tenant Two", property: "Home 2", opened: "Jun 16", priority: "HIGH" as MaintenancePriority },
  { id: "request-002", title: "Hallway light replacement", tenant: "Tenant Four", property: "Home 4", opened: "Jun 15", priority: "LOW" as MaintenancePriority },
  { id: "request-003", title: "Air conditioning inspection", tenant: "Tenant One", property: "Home 1", opened: "Jun 13", priority: "MEDIUM" as MaintenancePriority },
];

// TODO: Replace all records with authenticated API/database queries.
// TODO: Add audit logs, roles, application screening, Stripe payments, files, notices, and notifications.
