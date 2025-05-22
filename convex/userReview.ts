import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getUserReviews = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }

    console.log("Getting first 5 reviews");
    const reviews = await ctx.db
      .query("userReviews")
      .withIndex("by_createdUser", (q) =>
        q.eq("userId", identity.tokenIdentifier),
      )
      .order("desc")
      .take(5);

    return reviews;
  },
});

export const getUserReviewById = query({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }

    console.log("Getting review by id ", args.id);
    const reviews = await ctx.db
      .query("userReviews")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), identity.tokenIdentifier),
          q.eq(q.field("_id"), args.id),
        ),
      )
      .order("desc")
      .first();

    return reviews;
  },
});

export const createUserReview = mutation({
  args: {
    dto: v.object({
      notes: v.string(),
      youtubeLink: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }

    const userId = identity.tokenIdentifier;
    console.log("adding new review");

    const reviewId = await ctx.db.insert("userReviews", {
      userId: userId,
      status: "uploaded",
      notes: args.dto.notes,
      hasSynced: false,
      youtubeLink: args.dto.youtubeLink,
    });
  },
});

export const updateUserReview = mutation({
  args: {
    dto: v.object({
      id: v.id("userReviews"),
      notes: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }

    const review = await ctx.db.get(args.dto.id);

    if (review === null) {
      throw new Error("Review not found");
    }

    if (review.userId !== identity.tokenIdentifier) {
      throw new Error("Not authorized");
    }

    console.log("update review", args.dto.id);

    const reviewId = await ctx.db.patch(args.dto.id, {
      notes: args.dto.notes,
    });
  },
});

export type CreateUserReviewDto = {
  userId: string;
  status: string;
};
