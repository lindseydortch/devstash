import { Pin, Star } from "lucide-react";

import { TypeIcon } from "@/components/items/TypeIcon";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatShortDate } from "@/lib/format";
import {
  getTypeAccentClass,
  getTypeBorderClass,
  getTypeById,
} from "@/lib/item-types";
import type { Item } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

/**
 * Item card for the pinned and recent lists.
 *
 * Not a link yet — items are meant to open in a drawer, which is a later
 * feature, so the card stays display only for now.
 */
export function ItemCard({ item }: { item: Item }) {
  const type = getTypeById(item.typeId);

  return (
    <Card
      className={cn(
        "h-full border-l-4 transition-colors hover:ring-foreground/25",
        getTypeBorderClass(type.slug),
      )}
    >
      <CardContent className="flex gap-4">
        <div
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-lg",
            getTypeAccentClass(type.slug),
          )}
        >
          <TypeIcon type={type} className="size-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-medium">{item.title}</h3>
            {item.isPinned ? (
              <Pin className="text-muted-foreground size-3.5 shrink-0" />
            ) : null}
            {item.isFavorite ? (
              <Star className="size-3.5 shrink-0 fill-yellow-400 text-yellow-400" />
            ) : null}
            <time
              dateTime={item.updatedAt}
              className="text-muted-foreground ml-auto shrink-0 text-xs"
            >
              {formatShortDate(item.updatedAt)}
            </time>
          </div>

          <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
            {item.description}
          </p>

          {item.tags.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="font-normal">
                  {tag}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
