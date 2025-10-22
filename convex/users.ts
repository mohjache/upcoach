/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { v } from "convex/values";
import {
  internalMutation,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";
import { api } from "./_generated/api";
import { type Id } from "./_generated/dataModel";

// User webhook handlers
export const handleUserCreated = mutation({
  args: {
    user: v.object({
      id: v.string(),
      email: v.string(),
      first_name: v.optional(v.string()),
      last_name: v.optional(v.string()),
      profile_picture_url: v.optional(v.string()),
      organisation_id: v.optional(v.string()),
      created_at: v.string(),
      updated_at: v.string(),
      email_verified: v.optional(v.boolean()),
      external_id: v.union(v.string(), v.null()),
      last_sign_in_at: v.optional(v.string()),
      locale: v.optional(v.string()),
      metadata: v.optional(v.object({})),
    }),
  },
  handler: async (ctx, args) => {
    const { user } = args;

    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_workos_id", (q) => q.eq("workosId", user.id))
      .first();

    if (!existingUser) {
      await ctx.db.insert("users", {
        workosId: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        profilePictureUrl: user.profile_picture_url,
        organisationId: user.organisation_id,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
        email_verified: user.email_verified,
        external_id: user.external_id,
      });
    }
  },
});

export const handleUserUpdated = mutation({
  args: {
    user: v.object({
      id: v.string(),
      email: v.string(),
      first_name: v.optional(v.string()),
      last_name: v.optional(v.string()),
      profile_picture_url: v.optional(v.string()),
      organisation_id: v.optional(v.string()),
      created_at: v.string(),
      updated_at: v.string(),
      email_verified: v.optional(v.boolean()),
      external_id: v.union(v.string(), v.null()),
      last_sign_in_at: v.optional(v.string()),
      locale: v.optional(v.string()),
      metadata: v.optional(v.object({})),
    }),
  },
  handler: async (ctx, args) => {
    const { user } = args;

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_workos_id", (q) => q.eq("workosId", user.id))
      .first();

    if (existingUser) {
      await ctx.db.patch(existingUser._id, {
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        profilePictureUrl: user.profile_picture_url,
        organisationId: user.organisation_id,
        updatedAt: user.updated_at,
        email_verified: user.email_verified,
        external_id: user.external_id,
      });
    } else {
      await ctx.db.insert("users", {
        workosId: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        profilePictureUrl: user.profile_picture_url,
        organisationId: user.organisation_id,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
        email_verified: user.email_verified,
        external_id: user.external_id,
      });
    }
  },
});

export const handleUserDeleted = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_workos_id", (q) => q.eq("workosId", args.userId))
      .first();

    if (existingUser) {
      await ctx.db.delete(existingUser._id);
    }
  },
});
