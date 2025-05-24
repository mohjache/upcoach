import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "~/Providers/ConvexProvider";

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
        <ClerkProvider
          afterSignOutUrl={process.env.NEXT_PUBLIC_REDIRECT_AFTER_SIGNOUT_URL}
        >
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
