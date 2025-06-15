/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { internalMutation } from "./_generated/server";
import { v } from "convex/values";
import type { ClerkWebhookOrganizationMembershipEvent } from "./http";
export const handleMembershipCreated = internalMutation({
  args: {
    membership: v.object({
      id: v.string(),
      public_user_data: v.object({
        user_id: v.id("clerkUsers"),
      }),
      organization: v.object({
        id: v.id("organizations"),
      }),
      role: v.string(),
      public_metadata: v.object({}),
      private_metadata: v.object({}),
      created_at: v.number(),
      updated_at: v.number(),
    }),
  },
  handler: async (ctx, args) => {
    const membership = args.membership;

    await ctx.db.insert("organizationMemberships", {
      clerkUserId: membership.public_user_data.user_id,
      organizationId: membership.organization.id,
      role: membership.role,
      publicMetadata: membership.public_metadata,
      privateMetadata: membership.private_metadata,
      createdAt: membership.created_at,
      updatedAt: membership.updated_at,
    });
  },
});

export const handleMembershipUpdated = internalMutation({
  args: {
    membership: v.object({
      id: v.string(),
      public_user_data: v.object({
        user_id: v.id("clerkUsers"),
      }),
      organization: v.object({
        id: v.id("organizations"),
      }),
      role: v.string(),
      public_metadata: v.object({}),
      private_metadata: v.object({}),
      created_at: v.number(),
      updated_at: v.number(),
    }),
  },
  handler: async (ctx, args) => {
    const membership = args.membership;

    const existingMembership = await ctx.db
      .query("organizationMemberships")
      .withIndex("by_user_and_org", (q) =>
        q
          .eq("clerkUserId", membership.public_user_data.user_id)
          .eq("organizationId", membership.organization.id),
      )
      .unique();

    if (existingMembership) {
      await ctx.db.patch(existingMembership._id, {
        role: membership.role,
        publicMetadata: membership.public_metadata,
        privateMetadata: membership.private_metadata,
        updatedAt: membership.updated_at,
      });
    }
  },
});

export const handleMembershipDeleted = internalMutation({
  args: {
    membership: v.object({
      id: v.string(),
      public_user_data: v.object({
        user_id: v.id("clerkUsers"),
      }),
      organization: v.object({
        id: v.id("organizations"),
      }),
      role: v.string(),
      public_metadata: v.object({}),
      private_metadata: v.object({}),
      created_at: v.number(),
      updated_at: v.number(),
    }),
  },
  handler: async (ctx, args) => {
    const membership = args.membership;

    const existingMembership = await ctx.db
      .query("organizationMemberships")
      .withIndex("by_user_and_org", (q) =>
        q
          .eq("clerkUserId", membership.public_user_data.user_id)
          .eq("organizationId", membership.organization.id),
      )
      .unique();

    if (existingMembership) {
      await ctx.db.delete(existingMembership._id);
    }
  },
});
