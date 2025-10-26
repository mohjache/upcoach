import { type UserIdentity } from "convex/server";
import { query, mutation } from "./_generated/server";
// Import the api reference
import { v } from "convex/values";
import { getAll } from "convex-helpers/server/relationships";

export type ClerkIdentity = UserIdentity & {
  organisation_id: string;
  organisation_role: string;
  pictureUrl: string;
  name: string;
};

export const createUserReview = mutation({
  args: {
    dto: v.object({
      videoId: v.id("videos"),
    }),
  },
  handler: async (ctx, args) => {
    const identity = (await ctx.auth.getUserIdentity()) as ClerkIdentity;
    if (identity === null) {
      throw new Error("Not authenticated");
    }

    const reviewId = await ctx.db.insert("userReviews", {
      userId: identity.subject,
      videoId: args.dto.videoId,
      organisationId: identity.organisation_id,
    });

    return reviewId;
  },
});

export const getUserReviewDetails = query({
  args: {
    reviewId: v.id("userReviews"),
  },
  handler: async (ctx, args) => {
    const identity = (await ctx.auth.getUserIdentity()) as ClerkIdentity;
    if (identity === null) {
      throw new Error("Not authenticated");
    }

    const review = await ctx.db.get(args.reviewId);
    if (
      !review ||
      (review.userId !== identity.subject &&
        review.organisationId !== identity.organisation_id)
    ) {
      throw new Error("Not authorized");
    }

    const video = await ctx.db.get(review.videoId);
    if (!video) {
      throw new Error("Video not found");
    }

    return {
      review,
      video,
    };
  },
});

export const addCommentToUserReview = mutation({
  args: {
    reviewId: v.id("userReviews"),
    comment: v.string(),
    startTime: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = (await ctx.auth.getUserIdentity()) as ClerkIdentity;
    if (identity === null) {
      throw new Error("Not authenticated");
    }

    const review = await ctx.db.get(args.reviewId);
    if (
      !review ||
      (review.userId !== identity.subject &&
        review.organisationId !== identity.organisation_id)
    ) {
      throw new Error("Not authorized");
    }

    const newComment = {
      userId: identity.subject,
      userProfilePictureUrl: identity.pictureUrl as string | undefined,
      userFullName: identity.name ?? (undefined as string | undefined),
      comment: args.comment,
      createdAt: new Date().toISOString(),
      startTime: args.startTime,
    };

    await ctx.db.patch(args.reviewId, {
      comments: [newComment, ...(review.comments ?? [])],
    });
  },
});

export const listUserReviewsByUserId = query({
  handler: async (ctx, args) => {
    const identity = (await ctx.auth.getUserIdentity()) as ClerkIdentity;
    if (identity === null) {
      throw new Error("Not authenticated");
    }

    const reviews = await ctx.db
      .query("userReviews")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .take(5);

    const videos = await ctx.db
      .query("videos")
      .withIndex("by_uploader", (q) => q.eq("uploaderId", identity.subject))
      .collect();

    const reviewsWithVideos = reviews.map((review) => {
      const video = videos.find((video) => video._id === review.videoId);
      return {
        ...review,
        video,
      };
    });

    return reviewsWithVideos;
  },
});

export const listUserReviewsForCoach = query({
  handler: async (ctx, args) => {
    const identity = (await ctx.auth.getUserIdentity()) as ClerkIdentity;
    if (identity === null) {
      throw new Error("Not authenticated");
    }

    if (
      identity.organisation_role !== "org:admin" &&
      identity.organisation_role !== "org:coach"
    ) {
      throw new Error("Not authorized");
    }

    const reviews = await ctx.db
      .query("userReviews")

      .withIndex("by_organisation", (q) =>
        q.eq("organisationId", identity.organisation_id),
      )
      .take(5);

    const videos = await getAll(
      ctx.db,
      reviews.map((review) => review.videoId),
    );

    if (videos === undefined || videos.length === 0) {
      throw new Error("No videos found");
    }

    const reviewsWithVideos = reviews.map((review) => {
      const video = videos.find((video) => video?._id === review.videoId);
      return {
        ...review,
        video,
      };
    });

    return reviewsWithVideos;
  },
});
