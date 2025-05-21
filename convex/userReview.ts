import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getUserReviews = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }

    console.log("Getting first 10 reviews");
    const reviews = await ctx.db
      .query("userReviews")
      .filter((q) => q.eq(q.field("userId"), identity.tokenIdentifier))
      .order("desc")
      .take(3);

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

export type CreateUserReviewDto = {
  userId: string;
  status: string;
};
