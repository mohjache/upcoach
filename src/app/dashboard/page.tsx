"use client";

import { Authenticated, AuthLoading, useQuery } from "convex/react";
import { MessageCircleIcon } from "lucide-react";
import Link from "next/link";
import { api } from "~/../convex/_generated/api";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { useSession } from "@clerk/nextjs";

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import type { Id } from "@/convex/_generated/dataModel";
import CreateReviewHero from "./_components/EmptyCreateReview";
import LoadingReviewList from "./_components/LoadingReviewList";
import { ReviewCard } from "./_components/ReviewCard";

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
        <LoadingReviewList />
      </AuthLoading>
      <Authenticated>
        <UserListView />
      </Authenticated>
    </>
  );
};

export default Page;

const UserListView = () => {
  const { session } = useSession();

  if (!session) {
    return <LoadingReviewList />;
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
      {!reviews ? (
        <LoadingReviewList />
      ) : reviews?.length === 0 ? (
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
