"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Image from "next/image";
import { cn } from "~/lib/utils";
import { useQuery } from "convex/react";
import { api } from "~/../convex/_generated/api";
import { FallbackComponent } from "./Fallback";
import { Button } from "./ui/button";
import Link from "next/link";
import { Badge } from "./ui/badge";

const statusColors = {
  uploaded: "bg-blue-100 text-blue-800",
  assigned: "bg-yellow-100 text-yellow-800",
  reviewed: "bg-purple-100 text-purple-800",
};

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
                          className={cn(
                            "rounded-full px-2 py-1 text-xs font-medium",
                            statusColors[review.status],
                          )}
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
                        {review.previewImage ? (
                          <Image
                            blurDataURL="placeholder_image.svg"
                            placeholder="blur"
                            src={review.previewImage}
                            alt={`Preview image for review}`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="rounded-lg object-cover"
                          />
                        ) : (
                          <div className="flex h-18 w-18 items-center justify-center rounded-lg bg-gray-200 text-center text-sm text-gray-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="h-6 w-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          </div>
                        )}
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
                    <Button size="sm" className="cursor-pointer">
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
