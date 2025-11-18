"use client";

import { Button } from "~/components/ui/button";
import CreateReviewHero from "../../../components/placeholders/EmptyCreateReview";
import { ReviewCard } from "./ReviewCard";
import type { DrizzleUserReviewWithVideoSelect } from "~/server/db/types";
import Link from "next/link";

export const StudentListView = ({
  reviews,
}: {
  reviews: DrizzleUserReviewWithVideoSelect[];
}) => {
  return (
    <>
      {reviews?.length === 0 ? (
        <CreateReviewHero />
      ) : (
        <div className="pt-8">
          <div className="w-full px-8 pb-2 md:w-128">
            <Button asChild>
              <Link href="/dashboard/review/create" className="text-primary">
                Create Review
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 px-8 pb-32 lg:grid-cols-3">
            {reviews?.map((review) => (
              <ReviewCard review={review} key={review.id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
