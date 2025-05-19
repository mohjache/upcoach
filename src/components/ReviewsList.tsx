"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import Image from "next/image";
import { cn } from "~/lib/utils";
import { useQuery } from "convex/react";
import { api } from "~/../convex/_generated/api";
import { FallbackComponent } from "./Fallback";

const statusColors = {
  uploaded: "bg-blue-100 text-blue-800",
  assigned: "bg-yellow-100 text-yellow-800",
  reviewed: "bg-purple-100 text-purple-800",
};

export function ReviewsList() {
  const reviews = useQuery(api.userReview.getUserReviews);
  return (
    <div className="space-y-4">
      {reviews === undefined ? (
        <FallbackComponent></FallbackComponent>
      ) : (
        reviews.map((review) => (
          <Card key={review._id}>
            <div className="relative flex">
              <div className="absolute top-2 right-2">
                <span
                  className={cn(
                    "rounded-full px-2 py-1 text-xs font-medium",
                    statusColors[review.status],
                  )}
                >
                  {review.status.charAt(0).toUpperCase() +
                    review.status.slice(1)}
                </span>
              </div>
              <div className="relative ml-2 h-24 w-24">
                {review.previewImage && (
                  <Image
                    blurDataURL="placeholder_image.svg"
                    placeholder="blur"
                    src={review.previewImage}
                    alt={`Preview image for review}`}
                    fill
                    className="rounded-lg object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <CardHeader>
                  {review.reviewedBy ? (
                    <CardTitle>Reviewed by {review.reviewedBy}</CardTitle>
                  ) : (
                    <CardTitle>Notes</CardTitle>
                  )}
                </CardHeader>
                <CardContent>
                  {review.reviewDate && (
                    <p className="text-muted-foreground text-sm">
                      Review Date:{" "}
                      {new Date(review.reviewDate).toLocaleDateString()}
                    </p>
                  )}

                  <p className="text-d">{review.notes}</p>
                </CardContent>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
