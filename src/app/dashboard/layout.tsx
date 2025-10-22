import NavBar from "~/components/Public/Navbar";
import { ConvexClientProvider } from "~/Providers/ConvexProvider";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ConvexClientProvider>
      <NavBar />
      {children}
    </ConvexClientProvider>
  );
}
