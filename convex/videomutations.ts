import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";
import { type Id } from "./_generated/dataModel";

export const createVideo = internalMutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    muxUploadId: v.string(),
    uploaderId: v.string(),
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
      muxUploadId: args.muxUploadId,
      uploaderId: args.uploaderId,
      status: args.status,
    });
  },
});

export const updateVideoStatus = mutation({
  args: {
    muxUploadId: v.string(),
    status: v.union(
      v.literal("uploading"),
      v.literal("processing"),
      v.literal("ready"),
      v.literal("error"),
    ),
    muxAssetId: v.optional(v.string()),
    muxPlaybackId: v.optional(v.string()),
    duration: v.optional(v.number()),
    aspectRatio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const video = await ctx.db
      .query("videos")
      .withIndex("by_mux_upload_id", (q) =>
        q.eq("muxUploadId", args.muxUploadId),
      )
      .unique();

    if (!video) {
      throw new Error("Video not found");
    }

    await ctx.db.patch(video._id, {
      status: args.status,
      muxAssetId: args.muxAssetId,
      muxUploadId: args.muxUploadId,
      muxPlaybackId: args.muxPlaybackId,
      duration: args.duration,
      aspectRatio: args.aspectRatio,
    });
  },
});

export const listVideos = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }

    const videos = await ctx.db
      .query("videos")
      .withIndex("by_uploader", (q) =>
        q.eq("uploaderId", identity.tokenIdentifier),
      )
      .order("desc")
      .collect();

    return videos;
  },
});

export const getVideo = query({
  args: { videoId: v.id("videos") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }

    const video = await ctx.db.get(args.videoId);
    if (!video) {
      throw new Error("Video not found");
    }

    // Only allow access to own videos for now
    if (video.uploaderId !== identity.tokenIdentifier) {
      throw new Error("Not authorized");
    }

    return video;
  },
});

export const deleteVideo = mutation({
  args: { videoId: v.id("videos") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }

    const video = await ctx.db.get(args.videoId);
    if (!video) {
      throw new Error("Video not found");
    }

    if (video.uploaderId !== identity.tokenIdentifier) {
      throw new Error("Not authorized");
    }

    await ctx.db.delete(args.videoId);
  },
});
