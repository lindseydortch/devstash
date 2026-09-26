import { Star } from "lucide-react";
import Link from "next/link";

import { TypeIcon } from "@/components/items/TypeIcon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTypeBorderClass, getTypeSurfaceClass } from "@/lib/item-types";
import { cn } from "@/lib/utils";
import type { DashboardCollection } from "@/types/collections";

/**
 * Collection card for the dashboard grid.
 *
 * The accent border and card wash come from the type the collection holds
 * most, and the footer lists every type inside it. An empty collection with no
 * default type gets the neutral border.
 */
export function CollectionCard({ collection }: { collection: DashboardCollection }) {
  const accentSlug = collection.accentType?.slug ?? "";

  return (
    <Link
      href={`/collections/${collection.id}`}
      className="focus-visible:ring-ring rounded-xl focus-visible:ring-2 focus-visible:outline-none"
    >
      <Card
        className={cn(
          "h-full border-l-4 transition-colors hover:ring-foreground/25",
          getTypeBorderClass(accentSlug),
          getTypeSurfaceClass(accentSlug),
        )}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="truncate">{collection.name}</span>
            {collection.isFavorite ? (
              <Star className="size-3.5 shrink-0 fill-yellow-400 text-yellow-400" />
            ) : null}
          </CardTitle>
          <CardDescription>
            {collection.itemCount} {collection.itemCount === 1 ? "item" : "items"}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {collection.description ? (
            <p className="text-muted-foreground line-clamp-2 text-sm">
              {collection.description}
            </p>
          ) : null}

          <div className="flex items-center gap-2.5">
            {collection.itemTypes.map((type) => (
              <TypeIcon key={type.id} type={type} className="size-4" />
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
