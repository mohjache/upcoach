"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import type { UserReview } from "../page";
import { ReviewCard } from "./ReviewCard";

const CoachAdminListView = () => {
  const reviews = useQuery(api.userReview.listUserReviewsForCoach, {});
  return (
    <>
      {reviews?.length === 0 ? (
        <h1 className="text-foreground p-8 text-4xl font-bold">
          No reviews found from your students
        </h1>
      ) : (
        <>
          <div className="flex flex-col gap-4 px-8 md:flex-row">
            {reviews?.map((review) => (
              <ReviewCard review={review as UserReview} key={review._id} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default CoachAdminListView;
