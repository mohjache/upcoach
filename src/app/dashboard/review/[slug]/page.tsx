"use client";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";

import { api } from "~/../convex/_generated/api";
import { FallbackComponent } from "~/components/Fallback";
import { UpdateReviewForm } from "~/components/Forms/updateReviewForm";

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
      {review ? <UpdateReviewForm review={review} /> : <FallbackComponent />}
    </main>
  );
}
