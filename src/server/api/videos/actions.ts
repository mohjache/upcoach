"use server";

import { auth } from "@clerk/nextjs/server";
import Mux from "@mux/mux-node";
import { eq } from "drizzle-orm";
import { env } from "~/env";
import { db } from "~/server/db";
import { videos } from "~/server/db/schema";

import { createBlurUp } from "@mux/blurup";

export type CreateVideoDto = {
  title: string;
  description?: string;
  muxUploadId: string;
  uploaderId: string;
  status: "uploading" | "ready" | "error";
};

export type CreateUploadUrlDto = {
  title: string;
  description?: string;
};

export async function createVideoAction(data: CreateVideoDto) {
  const [video] = await db
    .insert(videos)
    .values({
      title: data.title,
      description: data.description,
      muxUploadId: data.muxUploadId,
      uploaderId: data.uploaderId,
      status: data.status,
    })
    .returning();

  return video;
}

export async function finalizeVideo(videoId: number) {
  const { userId, orgId } = await auth();

  if (!userId) {
    throw new Error("Not authenticated");
  }

  const video = await db.query.videos.findFirst({
    where: eq(videos.id, videoId),
  });

  if (!video) {
    throw new Error("Video not found");
  }

  const mux = new Mux({
    tokenId: env.MUX_TOKEN_ID,
    tokenSecret: env.MUX_TOKEN_SECRET,
  });

  const uploadMetadata = await mux.video.uploads.retrieve(video.muxUploadId);

  if (!uploadMetadata?.asset_id) {
    throw new Error("Failed to retrieve upload metadata");
  }

  const assetMetadata = await mux.video.assets.retrieve(
    uploadMetadata.asset_id,
  );

  if (!assetMetadata) {
    throw new Error("Failed to retrieve asset metadata");
  }

  const { blurDataURL, aspectRatio } = await createBlurUp(
    assetMetadata.playback_ids?.[0]?.id as string,
    {},
  );

  await db
    .update(videos)
    .set({
      status: "ready",
      muxAssetId: assetMetadata.id,
      muxPlaybackId: assetMetadata.playback_ids?.[0]?.id,
      aspectRatio: assetMetadata.aspect_ratio,
      blurDataUrl: blurDataURL,
    })
    .where(eq(videos.id, videoId));

  return video;
}

export async function createUploadUrl(
  args: CreateUploadUrlDto,
): Promise<{ uploadUrl: string; videoId: number }> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Not authenticated");
  }

  // Initialize Mux client
  const mux = new Mux({
    tokenId: env.MUX_TOKEN_ID,
    tokenSecret: env.MUX_TOKEN_SECRET,
  });

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

  // Store video record in database
  const video = await createVideoAction({
    title: args.title,
    description: args.description,
    muxUploadId: uploadMetadata.id,
    uploaderId: userId,
    status: "uploading",
  });

  if (!video) {
    throw new Error("Failed to create video record");
  }

  return {
    uploadUrl: upload.url,
    videoId: video.id,
  };
}
