"use client";

import { ConvexClientProvider } from "~/Providers/ConvexProvider";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <ConvexClientProvider>{children}</ConvexClientProvider>;
}
