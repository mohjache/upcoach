import { OrganizationProfile } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-center overflow-hidden">
      <OrganizationProfile />
    </div>
  );
}
