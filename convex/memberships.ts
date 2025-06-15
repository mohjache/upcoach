/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { internalMutation } from "./_generated/server";
import { v } from "convex/values";
import type { ClerkWebhookOrganizationMembershipEvent } from "./http";
import { internal } from "./_generated/api";
export const handleMembershipCreated = internalMutation({
  args: {
    membership: v.object({
      id: v.string(),
      public_user_data: v.object({
        user_id: v.string(),
      }),
      organization: v.object({
        id: v.string(),
      }),
      role: v.string(),

      created_at: v.number(),
      updated_at: v.number(),
    }),
  },
  handler: async (ctx, args) => {
    const membership = args.membership;
    const existingOrg = await ctx.db
      .query("organizations")
      .withIndex("by_clerk_id", (q) =>
        q.eq("clerkId", membership.organization.id),
      )
      .unique();
    const existingUser = await ctx.db
      .query("clerkUsers")
      .withIndex("by_clerk_id", (q) =>
        q.eq("clerkId", membership.public_user_data.user_id),
      )
      .unique();
    if (!existingOrg || !existingUser) {
      console.log(
        `organization with Clerk ID ${membership.organization.id} or user with Clerk ID ${membership.public_user_data.user_id} not found, creating new organization and user`,
      );
      return;
    }

    await ctx.db.insert("organizationMemberships", {
      clerkUserId: existingUser._id,
      organizationId: existingOrg._id,
      role: membership.role,

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
        user_id: v.string(),
      }),
      organization: v.object({
        id: v.string(),
      }),
      role: v.string(),

      created_at: v.number(),
      updated_at: v.number(),
    }),
  },
  handler: async (ctx, args) => {
    console.log("handleMembershipUpdated", args);
    const membership = args.membership;
    const existingOrg = await ctx.db
      .query("organizations")
      .withIndex("by_clerk_id", (q) =>
        q.eq("clerkId", membership.organization.id),
      )
      .unique();
    const existingUser = await ctx.db
      .query("clerkUsers")
      .withIndex("by_clerk_id", (q) =>
        q.eq("clerkId", membership.public_user_data.user_id),
      )
      .unique();
    if (!existingOrg || !existingUser) {
      console.log(
        `organization with Clerk ID ${membership.organization.id} or user with Clerk ID ${membership.public_user_data.user_id} not found, creating new organization and user`,
      );
      return;
    }

    const existingMembership = await ctx.db
      .query("organizationMemberships")
      .withIndex("by_user_and_org", (q) =>
        q
          .eq("clerkUserId", existingUser._id)
          .eq("organizationId", existingOrg._id),
      )
      .unique();

    if (!existingMembership) {
      console.log(
        `membership with Clerk ID ${args.membership.public_user_data.user_id} and organization ID ${args.membership.organization.id} not found, creating new membership`,
      );
      await ctx.runMutation(internal.memberships.handleMembershipCreated, args);
      return;
    }

    if (existingMembership) {
      await ctx.db.patch(existingMembership._id, {
        role: membership.role,
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
        user_id: v.string(),
      }),
      organization: v.object({
        id: v.string(),
      }),
      role: v.string(),

      created_at: v.number(),
      updated_at: v.number(),
    }),
  },
  handler: async (ctx, args) => {
    const membership = args.membership;
    const existingOrg = await ctx.db
      .query("organizations")
      .withIndex("by_clerk_id", (q) =>
        q.eq("clerkId", membership.organization.id),
      )
      .unique();
    const existingUser = await ctx.db
      .query("clerkUsers")
      .withIndex("by_clerk_id", (q) =>
        q.eq("clerkId", membership.public_user_data.user_id),
      )
      .unique();
    if (!existingOrg || !existingUser) {
      console.log(
        `organization with Clerk ID ${membership.organization.id} or user with Clerk ID ${membership.public_user_data.user_id} not found, creating new organization and user`,
      );
      return;
    }

    const existingMembership = await ctx.db
      .query("organizationMemberships")
      .withIndex("by_user_and_org", (q) =>
        q
          .eq("clerkUserId", existingUser._id)
          .eq("organizationId", existingOrg._id),
      )
      .unique();

    if (existingMembership) {
      await ctx.db.delete(existingMembership._id);
    }
  },
});
