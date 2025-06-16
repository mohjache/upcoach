import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
      afterSignOutUrl={process.env.NEXT_PUBLIC_REDIRECT_AFTER_SIGNOUT_URL}
    >
      {children}
    </ClerkProvider>
  );
}
