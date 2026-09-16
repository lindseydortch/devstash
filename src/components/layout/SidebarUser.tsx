import { Settings } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { currentUser } from "@/lib/mock-data";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * User area pinned to the bottom of the sidebar, linking to settings.
 *
 * Reads the mock user until auth is wired up.
 */
export function SidebarUser() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild size="lg" tooltip={currentUser.name}>
          <Link href="/settings">
            <Avatar className="size-8">
              {currentUser.image ? (
                <AvatarImage src={currentUser.image} alt="" />
              ) : null}
              <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 leading-tight">
              <span className="truncate text-sm font-medium">
                {currentUser.name}
              </span>
              <span className="text-muted-foreground truncate text-xs">
                {currentUser.email}
              </span>
            </div>
            <Settings className="text-muted-foreground" />
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
