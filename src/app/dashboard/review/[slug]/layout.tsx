"use client";

import { Authenticated } from "convex/react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <Authenticated>{children}</Authenticated>;
}
