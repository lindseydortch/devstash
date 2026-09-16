import { Clock, Pin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CollectionCard } from "@/components/collections/CollectionCard";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { ItemCard } from "@/components/items/ItemCard";
import { collections, items } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Dashboard | DevStash",
};

/** Collections shown on the dashboard before "View all". */
const MAX_COLLECTIONS = 6;
/** Recent items shown under the pinned ones. */
const MAX_RECENT_ITEMS = 10;

export default function DashboardPage() {
  // Mock collections have no timestamps, so "recent" is the source order —
  // same fallback the sidebar uses.
  const recentCollections = collections.slice(0, MAX_COLLECTIONS);
  const pinnedItems = items.filter((item) => item.isPinned);
  const recentItems = [...items]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, MAX_RECENT_ITEMS);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Your developer knowledge hub</p>
      </div>

      <StatsCards />

      <section>
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight">Collections</h2>
          <Link
            href="/collections"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            View all
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {recentCollections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </section>

      {pinnedItems.length > 0 ? (
        <section>
          <h2 className="text-muted-foreground mb-4 flex items-center gap-2 text-sm font-medium">
            <Pin className="size-4" />
            Pinned
          </h2>

          <div className="grid gap-4">
            {pinnedItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      ) : null}

      <section>
        <h2 className="text-muted-foreground mb-4 flex items-center gap-2 text-sm font-medium">
          <Clock className="size-4" />
          Recent
        </h2>

        <div className="grid gap-4 xl:grid-cols-2">
          {recentItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
