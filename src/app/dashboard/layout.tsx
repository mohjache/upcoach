import { ClerkProvider } from "@clerk/nextjs";
import AuthenticatedNavBar from "~/components/navigation/AuthenticatedNavbar";
import ConvexClientProvider from "~/Providers/ConvexProvider";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
      appearance={{
        cssLayerName: "clerk",
      }}
    >
      <ConvexClientProvider>
        <AuthenticatedNavBar />
        {children}
      </ConvexClientProvider>
    </ClerkProvider>
  );
}
