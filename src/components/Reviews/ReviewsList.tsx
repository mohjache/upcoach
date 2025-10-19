/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { useQuery } from "convex/react";
import { api } from "~/../convex/_generated/api";

import { Button } from "../ui/button";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { ReviewPreviewImage } from "./ReviewPreviewImage";
import CreateReviewButton from "../Buttons/CreateReviewButton";
import EditReviewButton from "../Buttons/EditReviewButton";
import InviteReviewerButton from "../Buttons/InviteReviewerButton";

export function ReviewsList() {
  //const reviews = useQuery(api.userReview.getUserReviews);

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold">Welcome to UpCoach</h1>
      </div>

      {/* <div className="space-y-4">
        {reviews?.length === 0 ? (
          <>
            <div className="flex justify-end">
              <CreateReviewButton></CreateReviewButton>
            </div>
            <Card>
              <div className="relative flex">
                <div className="flex-1">
                  <CardHeader>
                    <CardTitle>Welcome to UpCoach</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Create your first review to get started</p>
                  </CardContent>
                  <CardFooter></CardFooter>
                </div>
              </div>
            </Card>
          </>
        ) : (
          <>
            <div className="flex justify-between">
              <InviteReviewerButton></InviteReviewerButton>
              <CreateReviewButton></CreateReviewButton>
            </div>
            {reviews?.map((review) => (
              <Card key={review._id} className="mb-4">
                <div className="relative flex">
                  <div className="flex-1">
                    <CardHeader>
                      <CardTitle>
                        <div className="flex flex-row items-center gap-2">
                          <Badge
                            variant="secondary"
                            className={
                              "rounded-full px-2 py-1 text-xs font-medium"
                            }
                          >
                            {review.status.charAt(0).toUpperCase() +
                              review.status.slice(1)}
                          </Badge>
                          <span className="text-sm">
                            {new Date(review._creationTime)
                              .toISOString()
                              .slice(0, 10)}
                          </span>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mt-2 flex flex-row gap-2">
                        <div className="h-18 w-32">
                          <ReviewPreviewImage
                            previewImage={review.previewImage}
                          />
                        </div>
                        <p>{review.notes}</p>
                      </div>
                    </CardContent>
                    <CardFooter className="mt-2 mb-4 flex justify-between">
                      <Button variant={"outline"} size="sm" asChild>
                        <Link
                          href={review.youtubeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-4 w-4"
                          >
                            <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                            <path d="m10 15 5-3-5-3z" />
                          </svg>
                          View
                        </Link>
                      </Button>
                      <EditReviewButton id={review._id}></EditReviewButton>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))}
          </>
        )}
      </div> */}
    </>
  );
}
// const ReviewsSummary = ({
//   reviews,
//   reviewRequests,
// }: {
//   reviews: Doc<"userReviews">[] | undefined;
//   reviewRequests: Doc<"reviewRequests">[] | undefined;
// }): JSX.Element => {
//   function getReviewsSummary(): JSX.Element {
//     if (!reviews) {
//       return <Skeleton className="h-8 w-full" />;
//     }

//     if (reviews.length === 0) {
//       return <p>Get start by creating your first review</p>;
//     }

//     if (reviews.length < 3) {
//       return (
//         <>
//           <p>You have done {reviews.length}/3 reviews so far</p>
//           <p>
//             We recommend you create at least 3 reviews before asking a coach for
//             feedback
//           </p>
//         </>
//       );
//     }

//     if (reviewRequests === undefined || reviewRequests?.length === 0) {
//       return (
//         <p>Congratulations you can request a coach to review your games.</p>
//       );
//     }
//     return (
//       <p>
//         You have a pending request to reivew your recent games we will find the
//         appropriate coach to review your games
//       </p>
//     );
//   }
//   return getReviewsSummary();
// };
