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
    notes: v.string(),
    reviewDate: v.optional(v.string()),
    hasSynced: v.boolean(),
    youtubeLink: v.string(),
  })
    .index("by_status", ["status"])
    .index("by_createdUser", ["userId"]),
});
