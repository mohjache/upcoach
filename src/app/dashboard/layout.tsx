import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import AppSidebar from "./_components/AppSidebar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense fallback={<></>}>
      <ClerkProvider
        appearance={{
          cssLayerName: "clerk",
        }}
      >
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          <AppSidebar />
          <SidebarInset>
            <SidebarTrigger />
            {children}
          </SidebarInset>
        </SidebarProvider>
      </ClerkProvider>
    </Suspense>
  );
}
