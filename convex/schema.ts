import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  userReviews: defineTable({
    previewImage: v.optional(v.string()),
    reviewedBy: v.optional(v.string()),
    userId: v.string(),
    videoId: v.id("videos"),
  })
    .index("by_createdUser", ["userId"])
    .index("by_reviewer", ["reviewedBy"]),
  videos: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    muxAssetId: v.optional(v.string()),
    muxPlaybackId: v.optional(v.string()),
    muxUploadId: v.string(),
    uploaderId: v.string(),
    status: v.union(
      v.literal("uploading"),
      v.literal("processing"),
      v.literal("ready"),
      v.literal("error"),
    ),
    duration: v.optional(v.number()),
    aspectRatio: v.optional(v.string()),
  })
    .index("by_uploader", ["uploaderId"])
    .index("by_mux_upload_id", ["muxUploadId"])
    .index("by_status", ["status"]),

  // organisations: defineTable({
  //   workosId: v.string(),
  //   name: v.string(),
  //   slug: v.optional(v.string()),
  //   domains: v.optional(v.array(v.string())),
  //   metadata: v.optional(v.object({})),
  //   createdAt: v.string(),
  //   updatedAt: v.string(),
  // }).index("by_workos_id", ["workosId"]),

  // organisationMembers: defineTable({
  //   organisationId: v.id("organisations"),
  //   userId: v.id("users"),
  //   role: v.string(), // "admin", "member", etc.
  //   joinedAt: v.string(),
  // })
  //   .index("by_organisation", ["organisationId"])
  //   .index("by_user", ["userId"])
  //   .index("by_org_and_user", ["organisationId", "userId"]),

  // // Extended user table to work with WorkOS
  // users: defineTable({
  //   email: v.string(),
  //   firstName: v.optional(v.string()),
  //   lastName: v.optional(v.string()),
  //   workosId: v.string(),
  //   organisationId: v.optional(v.string()), // WorkOS organization ID
  //   profilePictureUrl: v.optional(v.string()),
  //   createdAt: v.string(),
  //   updatedAt: v.string(),
  //   email_verified: v.optional(v.boolean()),
  //   external_id: v.union(v.string(), v.null()),
  //   last_sign_in_at: v.optional(v.string()),
  //   locale: v.optional(v.string()),
  //   metadata: v.optional(v.object({})),
  // })
  //   .index("by_workos_id", ["workosId"])
  //   .index("by_email", ["email"]),
});
