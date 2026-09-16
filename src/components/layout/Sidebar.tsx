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

/**
 * Left sidebar for the authenticated app shell.
 *
 * Collapses to icons on desktop and becomes a drawer on mobile; both are driven
 * by the SidebarProvider in the (app) layout.
 */
export function Sidebar() {
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
        <SidebarTypes />
        <SidebarSeparator />
        <SidebarCollections />
      </SidebarContent>

      <SidebarFooter>
        <SidebarUser />
      </SidebarFooter>

      <SidebarRail />
    </SidebarRoot>
  );
}
