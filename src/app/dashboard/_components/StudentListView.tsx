"use client";

import type { UserReview } from "../page";
import CreateReviewHero from "./EmptyCreateReview";
import { ReviewCard } from "./ReviewCard";

export const StudentListView = () => {
  return (
    <>
      {/* {reviews?.length === 0 ? (
        <CreateReviewHero />
      ) : (
        <div className="pt-8">
          <div className="grid grid-cols-1 gap-4 px-8 pb-32 lg:grid-cols-3">
            {reviews?.map((review) => (
              <ReviewCard review={review as UserReview} key={review._id} />
            ))}
          </div>
        </div>
      )} */}
    </>
  );
};
