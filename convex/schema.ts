import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    givenName: v.string(),
    familtyName: v.string(),
    email: v.string(),
    phoneNumber: v.string(),
  }),
  userReviews: defineTable({
    previewImage: v.optional(v.string()),
    reviewedBy: v.optional(v.string()),
    userId: v.string(),
    status: v.union(
      v.literal("uploaded"),
      v.literal("assigned"),
      v.literal("reviewed"),
    ),
    rawVideoMetadata: v.optional(
      v.object({
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
      }),
    ),
    notes: v.string(),
    reviewerNotes: v.optional(v.string()),
    reviewDate: v.optional(v.string()),
    hasSynced: v.boolean(),
    youtubeLink: v.string(),
  })
    .index("by_status", ["status"])
    .index("by_createdUser", ["userId"])
    .index("by_reviewer", ["reviewedBy"]),
  reviewRequests: defineTable({
    userId: v.string(),
    userReviews: v.optional(v.array(v.id("userReviews"))),
    email: v.optional(v.string()),
    fulfilled: v.boolean(),
    dateFulfilled: v.optional(v.string()),
  })
    .index("by_fulfilled", ["fulfilled"])
    .index("by_fulfilled_createdUser", ["fulfilled", "userId"])
    .index("by_createdUser", ["userId"])
    .index("by_reviewer", ["email"]),
});
