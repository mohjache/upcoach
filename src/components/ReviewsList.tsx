"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { AuthLoading, useQuery } from "convex/react";
import { api } from "~/../convex/_generated/api";
import { FallbackComponent } from "./Fallback";
import { Button } from "./ui/button";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { ReviewPreviewImage } from "./ReviewPreviewImage";

export function ReviewsList() {
  const reviews = useQuery(api.userReview.getUserReviews);

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Button
          className="text-primary/80 cursor-pointer rounded-lg bg-green-300 px-6 py-3 font-semibold transition-colors hover:bg-green-300/70"
          asChild
        >
          <Link href="/dashboard/review/create">Create Review</Link>
        </Button>
      </div>
      <div className="space-y-4">
        {reviews === undefined ? (
          <FallbackComponent></FallbackComponent>
        ) : (
          reviews.map((review) => (
            <Card key={review._id}>
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
                      <div className="h-18 w-18">
                        <ReviewPreviewImage
                          previewImage={review.previewImage}
                        />
                      </div>
                      <p>{review.notes}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="mt-2 flex justify-between">
                    <Button variant="outline" size="sm" asChild>
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
                    <Button size="sm" className="cursor-pointer" asChild>
                      <Link href={"/dashboard/review/" + review._id}>Edit</Link>
                    </Button>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </>
  );
}
