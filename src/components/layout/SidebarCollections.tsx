"use client";

import { ChevronDown, Folder, Star } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { collections, type Collection } from "@/lib/mock-data";

/** How many recent collections to list under the favorites. */
const MAX_RECENT = 5;

function CollectionMenuItem({
  collection,
  isActive,
}: {
  collection: Collection;
  isActive: boolean;
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive} tooltip={collection.name}>
        <Link href={`/collections/${collection.id}`}>
          <Folder className="text-muted-foreground" />
          <span>{collection.name}</span>
          {collection.isFavorite ? (
            <Star className="ml-auto size-3.5 fill-yellow-400 text-yellow-400" />
          ) : null}
        </Link>
      </SidebarMenuButton>
      {collection.isFavorite ? null : (
        <SidebarMenuBadge>{collection.itemCount}</SidebarMenuBadge>
      )}
    </SidebarMenuItem>
  );
}

/**
 * Collections in the sidebar: favorites first, then the most recent ones.
 *
 * Mock collections have no timestamps yet, so "recent" is the source order.
 */
export function SidebarCollections() {
  const pathname = usePathname();
  const favorites = collections.filter((collection) => collection.isFavorite);
  const recent = collections
    .filter((collection) => !collection.isFavorite)
    .slice(0, MAX_RECENT);

  const isActive = (collection: Collection) =>
    pathname === `/collections/${collection.id}`;

  return (
    <Collapsible defaultOpen>
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger className="group/trigger w-full">
            Collections
            <ChevronDown className="ml-1 transition-transform group-data-[state=closed]/trigger:-rotate-90" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>

        <CollapsibleContent className="space-y-2">
          {favorites.length > 0 ? (
            <SidebarGroupContent>
              <SidebarGroupLabel className="text-[0.65rem] tracking-wider uppercase">
                Favorites
              </SidebarGroupLabel>
              <SidebarMenu>
                {favorites.map((collection) => (
                  <CollectionMenuItem
                    key={collection.id}
                    collection={collection}
                    isActive={isActive(collection)}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          ) : null}

          {recent.length > 0 ? (
            <SidebarGroupContent>
              <SidebarGroupLabel className="text-[0.65rem] tracking-wider uppercase">
                Recent
              </SidebarGroupLabel>
              <SidebarMenu>
                {recent.map((collection) => (
                  <CollectionMenuItem
                    key={collection.id}
                    collection={collection}
                    isActive={isActive(collection)}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          ) : null}
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}
