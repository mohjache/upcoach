import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";
import { type UpcoachUserIdentity } from "./userReview";
import { type Id } from "./_generated/dataModel";

export const createVideo = internalMutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    muxAssetId: v.string(),
    muxPlaybackId: v.string(),
    uploaderId: v.id("clerkUsers"),
    status: v.union(
      v.literal("uploading"),
      v.literal("processing"),
      v.literal("ready"),
      v.literal("error"),
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("videos", {
      title: args.title,
      description: args.description,
      muxAssetId: args.muxAssetId,
      muxPlaybackId: args.muxPlaybackId,
      uploaderId: args.uploaderId,
      status: args.status,
    });
  },
});

export const updateVideoStatus = mutation({
  args: {
    muxAssetId: v.string(),
    status: v.union(
      v.literal("uploading"),
      v.literal("processing"),
      v.literal("ready"),
      v.literal("error"),
    ),
    muxPlaybackId: v.optional(v.string()),
    duration: v.optional(v.number()),
    aspectRatio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const video = await ctx.db
      .query("videos")
      .filter((q) => q.eq(q.field("muxAssetId"), args.muxAssetId))
      .unique();

    if (!video) {
      throw new Error("Video not found");
    }

    await ctx.db.patch(video._id, {
      status: args.status,
      muxPlaybackId: args.muxPlaybackId,
      duration: args.duration,
      aspectRatio: args.aspectRatio,
    });
  },
});

export const listVideos = query({
  args: {},
  handler: async (ctx) => {
    const identity = (await ctx.auth.getUserIdentity()) as UpcoachUserIdentity;
    if (identity === null) {
      throw new Error("Not authenticated");
    }

    const videos = await ctx.db
      .query("videos")
      .withIndex("by_uploader", (q) =>
        q.eq("uploaderId", identity.tokenIdentifier as Id<"clerkUsers">),
      )
      .order("desc")
      .collect();

    return videos;
  },
});

export const getVideo = query({
  args: { videoId: v.id("videos") },
  handler: async (ctx, args) => {
    const identity = (await ctx.auth.getUserIdentity()) as UpcoachUserIdentity;
    if (identity === null) {
      throw new Error("Not authenticated");
    }

    const video = await ctx.db.get(args.videoId);
    if (!video) {
      throw new Error("Video not found");
    }

    // Only allow access to own videos for now
    if (video.uploaderId !== (identity.tokenIdentifier as Id<"clerkUsers">)) {
      throw new Error("Not authorized");
    }

    return video;
  },
});

export const deleteVideo = mutation({
  args: { videoId: v.id("videos") },
  handler: async (ctx, args) => {
    const identity = (await ctx.auth.getUserIdentity()) as UpcoachUserIdentity;
    if (identity === null) {
      throw new Error("Not authenticated");
    }

    const video = await ctx.db.get(args.videoId);
    if (!video) {
      throw new Error("Video not found");
    }

    if (video.uploaderId !== (identity.tokenIdentifier as Id<"clerkUsers">)) {
      throw new Error("Not authorized");
    }

    await ctx.db.delete(args.videoId);
  },
});
