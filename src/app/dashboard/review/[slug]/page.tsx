"use client";
import { Authenticated, AuthLoading, useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { Suspense, useEffect } from "react";

import { api } from "~/../convex/_generated/api";
import { FallbackComponent } from "~/components/Fallback";
import { UpdateReviewForm } from "~/components/Forms/updateReviewForm";

export const dynamic = "force-dynamic";

export default function Page() {
  const params = useParams();

  const { slug } = params;

  const review = useQuery(api.userReview.getUserReviewById, {
    id: slug as string,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="container mx-auto pt-24 pb-8">
      <h1 className="text-primary-foreground mb-8 text-center text-3xl font-bold">
        Update Review
      </h1>
      <AuthLoading>
        <FallbackComponent></FallbackComponent>
      </AuthLoading>
      <Authenticated>
        <Suspense fallback={<FallbackComponent></FallbackComponent>}>
          {review && <UpdateReviewForm review={review} />}
        </Suspense>
      </Authenticated>
    </main>
  );
}
