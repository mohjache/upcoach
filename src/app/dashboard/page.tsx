"use client";

import { Authenticated, AuthLoading, useQuery } from "convex/react";
import { Car, CloudUploadIcon, MessageCircleIcon } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/../convex/_generated/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { useSession, useUser } from "@clerk/nextjs";
import { permission } from "process";
import { use, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import type { Id } from "@/convex/_generated/dataModel";

export type UserReview = {
  video:
    | {
        _id: Id<"videos">;
        _creationTime: number;
        description?: string | undefined;
        muxAssetId?: string | undefined;
        muxPlaybackId?: string | undefined;
        duration?: number | undefined;
        aspectRatio?: string | undefined;
        title: string;
        muxUploadId: string;
        uploaderId: string;
        status: "uploading" | "processing" | "ready" | "error";
      }
    | null
    | undefined;
  _id: Id<"userReviews">;
  _creationTime: number;
  comments?:
    | {
        userProfilePictureUrl?: string | undefined;
        userFullName?: string | undefined;
        startTime?: number | undefined;
        userId: string;
        comment: string;
        createdAt: string;
      }[]
    | undefined;
  userId: string;
  videoId: Id<"videos">;
  organisationId: string;
};

const Page = () => {
  return (
    <>
      <AuthLoading>
        <div className="grid grid-cols-1 gap-4 px-8 pb-32 lg:grid-cols-2 xl:grid-cols-3">
          <Skeleton className="h-96 w-full flex-none" />
          <Skeleton className="h-96 w-full flex-none" />
          <Skeleton className="h-96 w-full flex-none" />
          <Skeleton className="h-96 w-full flex-none" />
          <Skeleton className="h-96 w-full flex-none" />
          <Skeleton className="h-96 w-full flex-none" />
        </div>
      </AuthLoading>
      <Authenticated>
        <div className="pt-8">
          <UserListView />
        </div>
      </Authenticated>
    </>
  );
};

export default Page;

const UserListView = () => {
  const { session } = useSession();

  if (!session) {
    return (
      <>
        <div className="grid grid-cols-1 gap-4 px-8 pb-32 md:grid-cols-2 xl:grid-cols-3">
          <Skeleton className="h-96 w-full flex-none" />
          <Skeleton className="h-96 w-full flex-none" />
          <Skeleton className="h-96 w-full flex-none" />
          <Skeleton className="h-96 w-full flex-none" />
          <Skeleton className="h-96 w-full flex-none" />
          <Skeleton className="h-96 w-full flex-none" />
        </div>
      </>
    );
  } else if (
    session.checkAuthorization({ role: "org:admin" }) ||
    session.checkAuthorization({ role: "org:coach" })
  ) {
    return <CoachAdminListView />;
  } else {
    return <StudentListView />;
  }
};

const StudentListView = () => {
  const reviews = useQuery(api.userReview.listUserReviewsByUserId, {});
  return (
    <>
      {reviews?.length === 0 ? (
        <CreateReviewHero />
      ) : (
        <>
          <div className="w-full px-8 pb-2 md:w-128">
            <Button asChild>
              <Link href="/dashboard/review/create" className="text-primary">
                Create Review
              </Link>
            </Button>
          </div>

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

const ReviewCard = ({ review }: { review: UserReview }) => {
  return (
    <Card key={review._id}>
      <CardContent>
        {review.video?.muxPlaybackId && (
          <div className="flex justify-center">
            <Image
              blurDataURL="placeholder_image.svg"
              placeholder="blur"
              src={`https://image.mux.com/${review.video.muxPlaybackId}/thumbnail.webp`}
              alt={`Thumbnail for review`}
              width={512}
              height={288}
              className="rounded-lg"
            />
          </div>
        )}
        {/* Comments Section */}
        {review.comments && review.comments.length > 0 && (
          <div className="flex flex-row items-center justify-between pt-4">
            <>
              {(() => {
                const lastComment = review.comments[0];
                return (
                  lastComment && (
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage
                          className="h-4 w-4 rounded-full"
                          src={lastComment.userProfilePictureUrl}
                        />
                        <AvatarFallback className="h-4 w-4 rounded-full">
                          {lastComment.userFullName?.charAt(0) ?? "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm leading-tight font-semibold">
                          {lastComment.userFullName ?? "Anonymous"}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {lastComment.comment}
                        </span>
                      </div>
                    </div>
                  )
                );
              })()}
            </>
            <div className="flex flex-row items-center">
              <MessageCircleIcon className="h-4 w-4" />
              <span className="text-primary">{review.comments.length}</span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/dashboard/review/${review._id}`}>{"Edit Review"}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const CreateReviewHero = () => {
  return (
    <div className="flex h-[calc(100vh-10rem)] w-full flex-col items-center justify-center px-8">
      <div className="pb-2">
        <CloudUploadIcon className="text-foreground h-24 w-24" />
      </div>
      <h2 className="text-foreground pb-4 text-3xl font-bold">
        Upload a video of your gameplay to be reviewed by your coach.
      </h2>
      <Button size="lg" asChild>
        <Link href="/dashboard/review/create">Create Review</Link>
      </Button>
    </div>
  );
};

export const ReviewPreviewImage = ({
  playbackId,
}: {
  playbackId: string | undefined;
}) => {
  return (
    <>
      {playbackId ? (
        <div className="flex h-18 w-32">
          <Image
            blurDataURL="placeholder_image.svg"
            placeholder="blur"
            src={`https://image.mux.com/${playbackId}/thumbnail.webp`}
            alt={`Thumbnail for review`}
            width={128}
            height={72}
            className="rounded-lg object-cover"
          />
        </div>
      ) : (
        <div className="flex h-18 w-32 items-center justify-center rounded-lg bg-gray-200 text-center text-sm text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-8 w-8"
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
    </>
  );
};
