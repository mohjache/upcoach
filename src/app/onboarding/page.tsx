"use client";
import { CreateOrganization } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-center overflow-hidden">
      <CreateOrganization afterCreateOrganizationUrl="/dashboard" />
    </div>
  );
}
