import { ClerkProvider } from "@clerk/nextjs";
import AuthenticatedNavBar from "~/components/Public/AuthenticatedNavbar";
import NavBar from "~/components/Public/Navbar";
import ConvexClientProvider from "~/Providers/ConvexProvider";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <ConvexClientProvider>
        <AuthenticatedNavBar />
        {children}
      </ConvexClientProvider>
    </ClerkProvider>
  );
}
