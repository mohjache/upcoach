import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getUserReviews = query({
  args: {},
  handler: async (ctx, args) => {
    console.log("Getting first 10 reviews");
    const reviews = await ctx.db.query("userReviews").take(10);

    return reviews;
  },
});

export const createUserReview = mutation({
  args: {
    dto: v.object({
      userid: v.string(),
      notes: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    console.log("adding new review");
    const reviewId = await ctx.db.insert("userReviews", {
      userId: args.dto.userid,
      status: "uploaded",
      notes: args.dto.notes,
    });
  },
});

export type CreateUserReviewDto = {
  userId: string;
  status: string;
};
