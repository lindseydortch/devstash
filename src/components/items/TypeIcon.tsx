import { createElement } from "react";

import { getTypeIcon, getTypeTextClass } from "@/lib/item-types";
import type { ItemType } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

/**
 * Lucide icon for an item type, tinted with that type's color.
 *
 * The icon is built with createElement rather than assigned to a capitalized
 * variable, which this project's React Compiler lint rules reject inside a
 * component body.
 */
export function TypeIcon({
  type,
  className,
}: {
  type: ItemType;
  className?: string;
}) {
  return createElement(getTypeIcon(type.icon), {
    "aria-label": type.name,
    className: cn(getTypeTextClass(type.slug), className),
  });
}
