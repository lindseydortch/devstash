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
import {
  getTypeBorderClass,
  getTypeById,
  getTypeSurfaceClass,
} from "@/lib/item-types";
import type { Collection } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

/**
 * Collection card for the dashboard grid.
 *
 * The accent border and card wash come from the collection's default type —
 * the type it holds most — and the footer lists the types inside it.
 */
export function CollectionCard({ collection }: { collection: Collection }) {
  const defaultType = getTypeById(collection.defaultTypeId);

  return (
    <Link
      href={`/collections/${collection.id}`}
      className="focus-visible:ring-ring rounded-xl focus-visible:ring-2 focus-visible:outline-none"
    >
      <Card
        className={cn(
          "h-full border-l-4 transition-colors hover:ring-foreground/25",
          getTypeBorderClass(defaultType.slug),
          getTypeSurfaceClass(defaultType.slug),
        )}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="truncate">{collection.name}</span>
            {collection.isFavorite ? (
              <Star className="size-3.5 shrink-0 fill-yellow-400 text-yellow-400" />
            ) : null}
          </CardTitle>
          <CardDescription>{collection.itemCount} items</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {collection.description}
          </p>

          <div className="flex items-center gap-2.5">
            {collection.itemTypeIds.map((typeId) => (
              <TypeIcon
                key={typeId}
                type={getTypeById(typeId)}
                className="size-4"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
