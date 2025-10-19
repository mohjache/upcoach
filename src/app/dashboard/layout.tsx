import { ClerkProvider } from "@clerk/nextjs";
import { TopNav } from "~/components/Navigation/TopNav";
import { ConvexClientProvider } from "~/Providers/ConvexProvider";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
      afterSignOutUrl={process.env.NEXT_PUBLIC_REDIRECT_AFTER_SIGNOUT_URL}
    >
      <ConvexClientProvider>{children}</ConvexClientProvider>
    </ClerkProvider>
  );
}
