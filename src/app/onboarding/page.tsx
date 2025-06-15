import { CreateOrganization } from "@clerk/nextjs";
import { Suspense } from "react";
import { FallbackComponent } from "~/components/Fallback";

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-center overflow-hidden">
      <Suspense fallback={<FallbackComponent />}>
        <CreateOrganization afterCreateOrganizationUrl="/dashboard" />
      </Suspense>
    </div>
  );
}
