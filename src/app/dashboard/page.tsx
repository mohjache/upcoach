"use client";

import { Authenticated, AuthLoading } from "convex/react";
import { FallbackComponent } from "~/components/Fallback";
import { ReviewsList } from "~/components/ReviewsList";

const Page = () => {
  return (
    <main className="container mx-auto pt-24 pb-8">
      <div className="mx-auto max-w-2xl">
        <AuthLoading>
          <FallbackComponent></FallbackComponent>
        </AuthLoading>
        <Authenticated>
          <ReviewsList />
        </Authenticated>
      </div>
    </main>
  );
};

export default Page;
