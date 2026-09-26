"use client";

import { ChevronDown } from "lucide-react";
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
import { getTypeIcon, getTypeTextClass } from "@/lib/item-types";
import type { SidebarItemType } from "@/types/items";

/** Item types in the sidebar, each linking to /items/[slug]. */
export function SidebarTypes({ itemTypes }: { itemTypes: SidebarItemType[] }) {
  const pathname = usePathname();

  return (
    <Collapsible defaultOpen>
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger className="group/trigger w-full">
            Types
            <ChevronDown className="ml-1 transition-transform group-data-[state=closed]/trigger:-rotate-90" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>

        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {itemTypes.map((type) => {
                const Icon = getTypeIcon(type.icon);
                const href = `/items/${type.slug}`;
                const label = type.slug.charAt(0).toUpperCase() + type.slug.slice(1);

                return (
                  <SidebarMenuItem key={type.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === href}
                      tooltip={label}
                    >
                      <Link href={href}>
                        <Icon className={getTypeTextClass(type.slug)} />
                        <span>{label}</span>
                      </Link>
                    </SidebarMenuButton>
                    <SidebarMenuBadge>{type.itemCount}</SidebarMenuBadge>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}
