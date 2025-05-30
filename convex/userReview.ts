import { paginationOptsValidator, UserIdentity } from "convex/server";
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

export type Roles = "admin" | "coach";

export interface UpcoachUserIdentity extends UserIdentity {
  metadata: {
    role?: Roles;
  };
}

export const getUserReviews = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = (await ctx.auth.getUserIdentity()) as UpcoachUserIdentity;
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
    const identity = (await ctx.auth.getUserIdentity()) as UpcoachUserIdentity;
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
    const identity = (await ctx.auth.getUserIdentity()) as UpcoachUserIdentity;
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

    if (args.dto.youtubeLink !== null) {
      await ctx.scheduler.runAfter(
        0,
        internal.userReview.pulldownYoutubeMetadata,
        {
          reviewId: reviewId,
          youtubeLink: args.dto.youtubeLink,
        },
      );
    }
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
    const identity = (await ctx.auth.getUserIdentity()) as UpcoachUserIdentity;
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

    if (!review.rawVideoMetadata) {
      console.log(
        "pulling down youtube metadata calling internal function",
        review.youtubeLink,
      );
      await ctx.scheduler.runAfter(
        0,
        internal.userReview.pulldownYoutubeMetadata,
        {
          youtubeLink: review.youtubeLink,
          reviewId: review._id,
        },
      );
    }

    const reviewId = await ctx.db.patch(args.dto.id, {
      notes: args.dto.notes,
    });
  },
});

export const getUserReviewByReviewerId = query({
  args: {
    paginationOpts: paginationOptsValidator,
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = (await ctx.auth.getUserIdentity()) as UpcoachUserIdentity;
    if (identity === null) {
      throw new Error("Not authenticated");
    }

    console.log("Getting review by reviewer id ", args.id);
    const reviews = await ctx.db
      .query("userReviews")
      .withIndex("by_reviewer", (q) =>
        q.eq("reviewedBy", identity.tokenIdentifier),
      )
      .order("desc")
      .paginate(args.paginationOpts);

    return reviews;
  },
});

export const pulldownYoutubeMetadata = internalAction({
  args: { youtubeLink: v.string(), reviewId: v.id("userReviews") },
  handler: async (ctx, args) => {
    console.log("pulling down youtube metadata", args.youtubeLink);
    const urlEncodedString = encodeURIComponent(args.youtubeLink);

    const response = await fetch(
      `https://youtube.com/oembed?url=${urlEncodedString}&format=json`,
    );
    if (!response.ok) {
      return "error";
    }

    //    And can also be used here ↴
    const result = (await response.json()) as YoutubeMetadata;

    console.log("pulling down youtube metadata", result);

    const srcUrl = /src="([^"]+)"/.exec(result.html)?.[1] ?? "";

    // Schedule metadata update to run immediately
    await ctx.scheduler.runAfter(
      0,
      internal.userReview.internalUpdateUserReviewMetadata,
      {
        dto: {
          id: args.reviewId,
          rawVideoMetadata: {
            ...result,
            srcUrl: srcUrl,
          },
        },
      },
    );
    return "success";
  },
});

export const internalUpdateUserReviewMetadata = internalMutation({
  args: {
    dto: v.object({
      id: v.id("userReviews"),
      rawVideoMetadata: v.object({
        title: v.string(),
        author_name: v.string(),
        author_url: v.string(),
        type: v.string(),
        height: v.number(),
        thumbnail_url: v.string(),
        html: v.string(),
        provider_name: v.string(),
        provider_url: v.string(),
        width: v.number(),
        version: v.string(),
        thumbnail_height: v.number(),
        thumbnail_width: v.number(),
        srcUrl: v.string(),
      }),
    }),
  },
  handler: async (ctx, args) => {
    const review = await ctx.db.get(args.dto.id);

    if (review === null) {
      throw new Error("Review not found");
    }

    console.log("update metadata for review", args.dto.id);

    const reviewId = await ctx.db.patch(args.dto.id, {
      previewImage: args.dto.rawVideoMetadata.thumbnail_url,
      rawVideoMetadata: args.dto.rawVideoMetadata,
    });
  },
});

export type CreateUserReviewDto = {
  userId: string;
  status: string;
};

export type YoutubeMetadata = {
  title: string;
  author_name: string;
  author_url: string;
  type: string;
  height: number;
  width: number;
  version: string;
  provider_name: string;
  provider_url: string;
  thumbnail_url: string;
  thumbnail_height: number;
  thumbnail_width: number;
  html: string;
  srcUrl: string;
};
