import { Layers } from "lucide-react";
import Link from "next/link";

import { SidebarCollections } from "@/components/layout/SidebarCollections";
import { SidebarTypes } from "@/components/layout/SidebarTypes";
import { SidebarUser } from "@/components/layout/SidebarUser";
import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { getSidebarCollections } from "@/lib/db/collections";
import { getSidebarItemTypes } from "@/lib/db/items";
import { getCurrentUserId } from "@/lib/db/users";

const EMPTY_COLLECTIONS = { favorites: [], recent: [] };

/**
 * Left sidebar for the authenticated app shell.
 *
 * Collapses to icons on desktop and becomes a drawer on mobile; both are driven
 * by the SidebarProvider in the (app) layout.
 */
export async function Sidebar() {
  const userId = await getCurrentUserId();
  const [itemTypes, collections] = userId
    ? await Promise.all([getSidebarItemTypes(userId), getSidebarCollections(userId)])
    : [[], EMPTY_COLLECTIONS];

  return (
    <SidebarRoot collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" tooltip="DevStash">
              <Link href="/dashboard">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-600 text-white">
                  <Layers />
                </span>
                <span className="text-base font-semibold">DevStash</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarTypes itemTypes={itemTypes} />
        <SidebarSeparator />
        <SidebarCollections
          favorites={collections.favorites}
          recent={collections.recent}
        />
      </SidebarContent>

      <SidebarFooter>
        <SidebarUser />
      </SidebarFooter>

      <SidebarRail />
    </SidebarRoot>
  );
}
