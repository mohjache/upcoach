"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { userReviews } from "~/server/db/schema";
import type { DrizzleComment } from "~/server/db/schema";

export async function creatUserReviewForVideoId(videoId: number) {
  const { userId, orgId } = await auth();

  if (!userId) {
    throw new Error("Not authenticated");
  }

  const [userReview] = await db
    .insert(userReviews)
    .values({
      userId: userId as string,
      videoId: videoId,
      organisationId: orgId as string,
    })
    .returning();

  return userReview;
}

export async function addCommentToUserReview(
  userReviewId: number,
  comment: string,
  startTime: number | undefined,
) {
  const { userId, orgId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Not authenticated");
  }

  const review = await db.query.userReviews.findFirst({
    where: eq(userReviews.id, userReviewId),
  });

  if (!review) {
    throw new Error("Review not found");
  }

  if (review.userId !== userId && review.organisationId !== orgId) {
    throw new Error("Not authorized");
  }

  const newComment: DrizzleComment = {
    userId: userId as string,
    userProfilePictureUrl: user.imageUrl,
    userFullName: user.fullName ?? undefined,
    comment: comment,
    createdAt: new Date().toISOString(),
    startTime: startTime,
  };

  await db
    .update(userReviews)
    .set({
      comments: [newComment, ...(review.comments ?? [])],
    })
    .where(eq(userReviews.id, userReviewId));
}

//   const identity = (await ctx.auth.getUserIdentity()) as ClerkIdentity;
//     if (identity === null) {
//       throw new Error("Not authenticated");
//     }

//     const review = await ctx.db.get(args.reviewId);
//     if (
//       !review ||
//       (review.userId !== identity.subject &&
//         review.organisationId !== identity.organisation_id)
//     ) {
//       throw new Error("Not authorized");
//     }

//     const newComment = {
//       userId: identity.subject,
//       userProfilePictureUrl: identity.pictureUrl as string | undefined,
//       userFullName: identity.name ?? (undefined as string | undefined),
//       comment: args.comment,
//       createdAt: new Date().toISOString(),
//       startTime: args.startTime,
//     };

//     await ctx.db.patch(args.reviewId, {
//       comments: [newComment, ...(review.comments ?? [])],
//     });
//   },
