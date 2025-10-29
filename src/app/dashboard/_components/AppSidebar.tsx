"use client";
import { OrganizationSwitcher, UserButton, useSession } from "@clerk/nextjs";
import { Authenticated, AuthLoading } from "convex/react";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  Sidebar,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenu,
  useSidebar,
} from "~/components/ui/sidebar";
import { Skeleton } from "~/components/ui/skeleton";

const AppSidebar = () => {
  const { session } = useSession();
  const { open } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <div className="p-2">
          <AuthLoading>
            <Skeleton className="h-8 w-full rounded-full" />
          </AuthLoading>
          <Authenticated>
            <OrganizationSwitcher
              hidePersonal={true}
              appearance={{
                elements: {
                  organizationSwitcherTrigger__organization: `${open ? " w-full" : "w-6 h-6  "}  overflow-hidden`,
                  organizationPreviewTextContainer: "text-foreground",
                },
              }}
            />
          </Authenticated>
        </div>
      </SidebarHeader>
      <SidebarContent className={open ? "px-2" : "px-0"}>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                  <Link href={"/dashboard"}>
                    <HomeIcon></HomeIcon>
                    <span>{"Dashboard"}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-row gap-2 p-2">
          <AuthLoading>
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex w-full flex-col">
              <Skeleton className="h-4 w-full rounded-full" />
              <Skeleton className="h-4 w-full rounded-full" />
            </div>
          </AuthLoading>
          <Authenticated>
            <UserButton />
            {open && (
              <div className="flex w-full flex-col">
                <span className="text-foreground text-sm font-bold">
                  {session?.user.fullName}
                </span>
                <span className="text-muted-foreground text-xs">
                  {session?.user.primaryEmailAddress?.emailAddress}
                </span>
              </div>
            )}
          </Authenticated>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
