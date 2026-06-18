export type DemoRole = "admin" | "contractor" | "tenant";

export type DemoSession = {
  username: string;
  role: DemoRole;
  tenantId?: string;
  displayName: string;
};

type DemoUser = DemoSession & {
  password: string;
};

export const DEMO_SESSION_KEY = "remvick-demo-session";

export const demoUsers: DemoUser[] = [
  {
    username: "admin",
    password: "admin",
    role: "admin",
    displayName: "Administrator",
  },
  {
    username: "contractor",
    password: "service",
    role: "contractor",
    displayName: "Service Contractor",
  },
  ...[1, 2, 3, 4].map((number) => ({
    username: `tenant${number}`,
    password: `ten${number}`,
    role: "tenant" as const,
    tenantId: `tenant-00${number}`,
    displayName: `Tenant ${["One", "Two", "Three", "Four"][number - 1]}`,
  })),
];

export function authenticateDemoUser(username: string, password: string): DemoSession | null {
  const normalizedUsername = username.trim().toLowerCase().replace(/^tenent/, "tenant");
  const user = demoUsers.find(
    (candidate) => candidate.username === normalizedUsername && candidate.password === password,
  );

  if (!user) return null;

  const { password: _password, ...session } = user;
  return session;
}
