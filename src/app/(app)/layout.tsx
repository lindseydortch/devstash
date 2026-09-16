import { cookies } from "next/headers";

import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

/**
 * Shell for the authenticated app: collapsible sidebar on the left, top bar and
 * scrolling main area on the right.
 */
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The sidebar writes its open state to a cookie; read it so the server renders
  // the same state the user left it in.
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false";

  return (
    <TooltipProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <Sidebar />
        <SidebarInset>
          <Topbar />
          <div className="flex-1 px-6 py-8">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
