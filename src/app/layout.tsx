import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { ConvexClientProvider } from "./Providers/ConvexProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { TopNav } from "~/components/TopNav";

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
          <ConvexClientProvider>
            <TopNav />
            {children}
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
