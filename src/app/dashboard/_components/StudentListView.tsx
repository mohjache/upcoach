"use client";
import { api } from "@/convex/_generated/api";
import { usePreloadedQuery, useQuery, type Preloaded } from "convex/react";
import { Link } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { UserReview } from "../page";
import CreateReviewHero from "./EmptyCreateReview";
import { ReviewCard } from "./ReviewCard";

export const StudentListView = (props: {
  preloaded: Preloaded<typeof api.userReview.listUserReviewsByUserId>;
}) => {
  const reviews = usePreloadedQuery(props.preloaded);
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
              <ReviewCard review={review as UserReview} key={review._id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
