import type { Id } from "@/convex/_generated/dataModel";

import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { StudentListView } from "./_components/StudentListView";
import { auth } from "@clerk/nextjs/server";

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

export default async function Page() {
  const { isAuthenticated, redirectToSignIn, getToken } = await auth();
  if (!isAuthenticated) {
    redirectToSignIn();
  }

  const token = await getToken({ template: "convex" });
  if (!token) {
    redirectToSignIn();
  }

  const preloaded = await preloadQuery(
    api.userReview.listUserReviewsByUserId,
    { list: "default" },
    {
      token: token ?? undefined,
    },
  );
  return (
    <>
      <StudentListView preloaded={preloaded} />
    </>
  );
}
