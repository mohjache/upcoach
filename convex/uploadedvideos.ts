"use node";
import { v } from "convex/values";
import { action } from "./_generated/server";

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

    return {
      uploadUrl: upload.url ?? "",
      videoId: uploadMetadata.id ?? "",
    };

    // const uploadedUser = await ctx.runMutation(
    //   internal.users.getUserByClerkIdInternal,
    //   {
    //     clerkId: identity.userId,
    //   },
    // );

    // if (uploadedUser == undefined || uploadedUser == null) {
    //   throw new Error("User not found");
    // }

    // // Store video record in database
    // const videoId = (await ctx.runMutation(
    //   internal.uploadedvideomutations.createVideo,
    //   {
    //     title: args.title,
    //     description: args.description,
    //     muxUploadId: uploadMetadata.id,
    //     uploaderId: uploadedUser._id,
    //     status: "uploading" as const,
    //   },
    // )) as Id<"videos">;

    // return {
    //   uploadUrl: upload.url,
    //   videoId,
    // };
  },
});
