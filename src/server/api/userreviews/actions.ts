"use server";

import { auth } from "@clerk/nextjs/server";
import Mux from "@mux/mux-node";
import { eq } from "drizzle-orm";
import { env } from "~/env";
import { db } from "~/server/db";
import { userReviews, videos } from "~/server/db/schema";

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
