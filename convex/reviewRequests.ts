import { type UserIdentity } from "convex/server";
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getPendingRequests = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = (await ctx.auth.getUserIdentity()) as UpcoachUserIdentity;
    if (identity === null) {
      throw new Error("Not authenticated");
    }

    const reviews = await ctx.db
      .query("reviewRequests")
      .withIndex("by_fulfilled_createdUser", (q) =>
        q.eq("fulfilled", false).eq("userId", identity.tokenIdentifier),
      )
      .order("desc")
      .take(1);

    return reviews;
  },
});

export const createUserReview = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = (await ctx.auth.getUserIdentity()) as UpcoachUserIdentity;
    if (identity === null) {
      throw new Error("Not authenticated");
    }

    const userId = identity.tokenIdentifier;
    console.log("adding new review request from", userId);

    const reviewId = await ctx.db.insert("reviewRequests", {
      userId: userId,
      email: args.email,
      fulfilled: false,
    });
  },
});
export type Roles = "admin" | "coach";

export interface UpcoachUserIdentity extends UserIdentity {
  metadata: {
    role?: Roles;
  };
}
