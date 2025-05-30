import { v } from "convex/values";
import { internal } from "./_generated/api";
import { internalAction, mutation, query } from "./_generated/server";
import { UpcoachUserIdentity } from "./userReview";

export const getShareRequestByEmail = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const email = identity.email;
    if (!email) {
      throw new Error("No email found for authenticated user");
    }

    const shareRequest = await ctx.db
      .query("shareRequests")
      .withIndex("by_email", (q) => q.eq("email", email))
      .filter((q) => q.eq(q.field("status"), "pending"))
      .take(5);

    return shareRequest;
  },
});

export const createRequest = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = (await ctx.auth.getUserIdentity()) as UpcoachUserIdentity;
    if (identity === null) {
      throw new Error("Not authenticated");
    }

    if (!args.email) {
      throw new Error("Email is required");
    }
    const userId = identity.tokenIdentifier;

    const shareRequest = await ctx.db
      .query("shareRequests")
      .withIndex("by_sharedBy", (q) => q.eq("sharedBy", userId))
      .filter((q) =>
        q.and(
          q.eq(q.field("status"), "pending"),
          q.eq(q.field("email"), args.email),
          q.gt(Date.now(), q.field("expiresAt")),
        ),
      )
      .take(1);

    if (shareRequest.length > 0) {
      throw new Error(
        "Pending share request already exists for this email for user",
      );
    }

    console.log("Creating share request");

    // await ctx.db.insert("shareRequests", {
    //   sharedBy: userId,
    //   email: args.email,
    //   status: "pending",
    //   lastSent: Date.now(),
    //   expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
    // });
  },
});

export const updateShareRequest = mutation({
  args: {
    id: v.id("shareRequests"),
    status: v.union(v.literal("accepted"), v.literal("declined")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const email = identity.email;
    if (!email) {
      throw new Error("No email found for authenticated user");
    }

    const shareRequest = await ctx.db.get(args.id);
    if (!shareRequest) {
      throw new Error("Share request not found");
    }

    if (shareRequest.email !== email) {
      throw new Error("Not authorized to update this share request");
    }

    if (shareRequest.status !== "pending") {
      throw new Error("Can only update pending share requests");
    }

    await ctx.db.patch(args.id, {
      status: args.status,
    });

    if (args.status === "accepted") {
      await ctx.scheduler.runAfter(
        0,
        internal.shareRequest.acceptShareRequest,
        {
          requesterId: identity.tokenIdentifier,
          requesteeId: shareRequest.sharedBy,
        },
      );
    }
  },
});

export const acceptShareRequest = internalAction({
  args: {
    requesterId: v.string(),
    requesteeId: v.string(),
  },
  handler: async (ctx, args) => {
    // TODO: Implement share request acceptance logic
    console.log("Accepting share request", {
      requesterId: args.requesterId,
      requesteeId: args.requesteeId,
    });
  },
});
