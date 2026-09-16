import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | DevStash",
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Your developer knowledge hub</p>
      </div>

      {/* Placeholder for phase 1 — collections, pinned and recent items land in phase 3. */}
      <h2 className="text-lg font-semibold">Main</h2>
    </div>
  );
}
