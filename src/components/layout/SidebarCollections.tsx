"use client";

import { ChevronDown, Folder, LayoutGrid, Star } from "lucide-react";
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
import { getTypeDotClass } from "@/lib/item-types";
import { cn } from "@/lib/utils";
import type { SidebarCollection } from "@/types/collections";

/** Circle tinted by the type a collection holds most. */
function TypeDot({ collection }: { collection: SidebarCollection }) {
  return (
    <span className="flex size-4 shrink-0 items-center justify-center">
      <span
        className={cn(
          "size-2.5 rounded-full",
          getTypeDotClass(collection.accentType?.slug ?? ""),
        )}
      />
    </span>
  );
}

function CollectionMenuItem({
  collection,
  isActive,
}: {
  collection: SidebarCollection;
  isActive: boolean;
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive} tooltip={collection.name}>
        <Link href={`/collections/${collection.id}`}>
          {collection.isFavorite ? (
            <Folder className="text-muted-foreground" />
          ) : (
            <TypeDot collection={collection} />
          )}
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

interface SidebarCollectionsProps {
  favorites: SidebarCollection[];
  recent: SidebarCollection[];
}

/** Collections in the sidebar: favorites first, then the most recent ones. */
export function SidebarCollections({ favorites, recent }: SidebarCollectionsProps) {
  const pathname = usePathname();

  const isActive = (collection: SidebarCollection) =>
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

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/collections"}
                  tooltip="View all collections"
                  className="text-muted-foreground"
                >
                  <Link href="/collections">
                    <LayoutGrid />
                    <span>View all collections</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}
