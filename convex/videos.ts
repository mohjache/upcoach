"use node";
import { v } from "convex/values";
import { action, internalMutation, mutation, query } from "./_generated/server";

import { api, internal } from "./_generated/api";

import Mux from "@mux/mux-node";
import { Id } from "./_generated/dataModel";

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export const createUploadUrl = action({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (
    ctx,
    args,
  ): Promise<{ uploadUrl: string; videoId: string }> => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity == undefined || identity == null) {
      throw new Error("Not authenticated");
    }

    // Create a direct upload in Mux
    const upload = await mux.video.uploads.create({
      new_asset_settings: {
        playback_policy: ["public"],
        encoding_tier: "baseline",
      },
      cors_origin: "*",
    });

    const uploadMetadata = await mux.video.uploads.retrieve(upload.id);

    if (!uploadMetadata) {
      throw new Error("Failed to create upload");
    }

    // // Store video record in database
    const videoId = (await ctx.runMutation(
      internal.videomutations.createVideo,
      {
        title: args.title,
        description: args.description,
        muxUploadId: uploadMetadata.id,
        uploaderId: identity.subject,
        status: "uploading" as const,
      },
    )) as Id<"videos">;

    return {
      uploadUrl: upload.url,
      videoId,
    };
  },
});
