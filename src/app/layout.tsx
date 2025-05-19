import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { ConvexClientProvider } from "./Providers/ConvexProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";
import { Skeleton } from "~/components/ui/skeleton";
import { FallbackComponent } from "~/components/Fallback";

export const metadata: Metadata = {
  title: "UpCoach",
  description: "Badminton Coaching and Progression Tracker",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <ClerkProvider>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
