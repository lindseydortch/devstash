import { Boxes, FolderHeart, FolderOpen, Star, type LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { collections, items } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface Stat {
  label: string;
  value: number;
  icon: LucideIcon;
  /** Type color token, so the four cards read as a set without being loud. */
  iconClassName: string;
}

/**
 * Totals across the stash. Counts come from the mock arrays, so they will line
 * up with the cards below until the database replaces them.
 */
export function StatsCards() {
  const stats: Stat[] = [
    {
      label: "Items",
      value: items.length,
      icon: Boxes,
      iconClassName: "text-type-snippet",
    },
    {
      label: "Collections",
      value: collections.length,
      icon: FolderOpen,
      iconClassName: "text-type-link",
    },
    {
      label: "Favorite Items",
      value: items.filter((item) => item.isFavorite).length,
      icon: Star,
      iconClassName: "text-type-note",
    },
    {
      label: "Favorite Collections",
      value: collections.filter((collection) => collection.isFavorite).length,
      icon: FolderHeart,
      iconClassName: "text-type-prompt",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map(({ label, value, icon: Icon, iconClassName }) => (
        <Card key={label}>
          <CardContent className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-muted-foreground truncate text-sm">{label}</p>
              <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
            </div>
            <Icon className={cn("size-5 shrink-0", iconClassName)} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
