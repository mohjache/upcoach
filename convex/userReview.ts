import { paginationOptsValidator, type UserIdentity } from "convex/server";
import {
  query,
  mutation,
  action,
  internalAction,
  internalMutation,
} from "./_generated/server";
// Import the api reference
import { api, internal } from "./_generated/api";
import { v } from "convex/values";

export type ClerkIdentity = UserIdentity & {
  organisation_id: string;
  organisation_role: "org:coach" | "org:student" | "org:admin";
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

    console.log(identity);

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
      review.userId !== identity.subject ||
      review.organisationId !== identity.organisation_id
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
  },
  handler: async (ctx, args) => {
    const identity = (await ctx.auth.getUserIdentity()) as ClerkIdentity;
    if (identity === null) {
      throw new Error("Not authenticated");
    }

    console.log(identity);
    const review = await ctx.db.get(args.reviewId);
    if (
      !review ||
      review.userId !== identity.subject ||
      review.organisationId !== identity.organisation_id
    ) {
      throw new Error("Not authorized");
    }

    const newComment = {
      userId: identity.subject,
      userRole: identity.organisation_role,
      comment: args.comment,
      createdAt: new Date().toISOString(),
    };

    await ctx.db.patch(args.reviewId, {
      comments: [newComment, ...(review.comments ?? [])],
    });
  },
});
