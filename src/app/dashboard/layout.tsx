import { TopNav } from "~/components/TopNav";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <TopNav></TopNav>
      {children}
    </>
  );
}
