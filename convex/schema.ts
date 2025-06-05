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
        srcUrl: v.string(),
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
  shareRequests: defineTable({
    sharedBy: v.string(), // userId of the person sharing
    email: v.string(), // email of the person to share with
    status: v.union(
      v.literal("pending"), // invitation sent but not accepted
      v.literal("accepted"), // invitation accepted
      v.literal("declined"), // invitation declined
    ),
    lastSent: v.optional(v.number()), // timestamp when the share invitation was last sent
    expiresAt: v.number(), // timestamp when the share invitation expires
  })
    .index("by_sharedBy", ["sharedBy"])
    .index("by_email", ["email"])
    .index("by_status", ["status"]),
  clerkUsers: defineTable({
    clerkId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    username: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),
});

// Add a new table for sharing reviews with non-registered users
