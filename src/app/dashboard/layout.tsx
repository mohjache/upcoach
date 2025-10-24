import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "~/components/Public/Navbar";
import ConvexClientProvider from "~/Providers/ConvexProvider";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <ConvexClientProvider>
        <NavBar />
        {children}
      </ConvexClientProvider>
    </ClerkProvider>
  );
}
