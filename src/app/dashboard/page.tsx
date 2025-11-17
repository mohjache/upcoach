import { db } from "~/server/db";

import { auth } from "@clerk/nextjs/server";
import { posts } from "~/server/db/schema";
import { Suspense } from "react";
import { SamplePosts } from "./_components/SamplePosts";

// export type UserReview = {
//   video:
//     | {
//         _id: string;
//         _creationTime: number;
//         description?: string | undefined;
//         muxAssetId?: string | undefined;
//         muxPlaybackId?: string | undefined;
//         duration?: number | undefined;
//         aspectRatio?: string | undefined;
//         title: string;
//         muxUploadId: string;
//         uploaderId: string;
//         status: "uploading" | "processing" | "ready" | "error";
//       }
//     | null
//     | undefined;
//   _id: string;
//   _creationTime: number;
//   comments?:
//     | {
//         userProfilePictureUrl?: string | undefined;
//         userFullName?: string | undefined;
//         startTime?: number | undefined;
//         userId: string;
//         comment: string;
//         createdAt: string;
//       }[]
//     | undefined;
//   userId: string;
//   videoId: string;
//   organisationId: string;
// };

export default async function Page() {
  const { isAuthenticated, redirectToSignIn } = await auth();
  if (!isAuthenticated) {
    redirectToSignIn();
  }

  const fetchedPosts = await db.select().from(posts);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SamplePosts data={fetchedPosts} />
    </Suspense>
  );
}
