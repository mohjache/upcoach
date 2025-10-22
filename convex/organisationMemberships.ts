import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const handleMembershipCreated = mutation({
  args: {
    membership: v.object({
      id: v.string(),
      user_id: v.string(),
      organisation_id: v.string(),
      role: v.string(),
      created_at: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const { membership } = args;

    // Find the organisation
    const organisation = await ctx.db
      .query("organisations")
      .withIndex("by_workos_id", (q) =>
        q.eq("workosId", membership.organisation_id),
      )
      .first();

    // Find the user (try WorkOS user first, then auth user)
    const workosUser = await ctx.db
      .query("users")
      .withIndex("by_workos_id", (q) => q.eq("workosId", membership.user_id))
      .first();

    if (organisation && workosUser) {
      // Find the corresponding auth user
      const authUser = await ctx.db
        .query("users")
        .withIndex("by_email", (q) => q.eq("email", workosUser.email))
        .first();

      if (authUser) {
        // Check if membership already exists
        const existingMembership = await ctx.db
          .query("organisationMembers")
          .withIndex("by_org_and_user", (q) =>
            q.eq("organisationId", organisation._id).eq("userId", authUser._id),
          )
          .first();

        if (!existingMembership) {
          await ctx.db.insert("organisationMembers", {
            organisationId: organisation._id,
            userId: authUser._id,
            role: membership.role,
            joinedAt: membership.created_at,
          });
        }
      }
    }
  },
});

export const handleMembershipUpdated = mutation({
  args: {
    membership: v.object({
      id: v.string(),
      user_id: v.string(),
      organisation_id: v.string(),
      role: v.string(),
      created_at: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const { membership } = args;

    const organisation = await ctx.db
      .query("organisations")
      .withIndex("by_workos_id", (q) =>
        q.eq("workosId", membership.organisation_id),
      )
      .first();

    const workosUser = await ctx.db
      .query("users")
      .withIndex("by_workos_id", (q) => q.eq("workosId", membership.user_id))
      .first();

    if (organisation && workosUser) {
      const authUser = await ctx.db
        .query("users")
        .withIndex("by_email", (q) => q.eq("email", workosUser.email))
        .first();

      if (authUser) {
        const existingMembership = await ctx.db
          .query("organisationMembers")
          .withIndex("by_org_and_user", (q) =>
            q.eq("organisationId", organisation._id).eq("userId", authUser._id),
          )
          .first();

        if (existingMembership) {
          await ctx.db.patch(existingMembership._id, {
            role: membership.role,
          });
        }
      }
    }
  },
});

export const handleMembershipDeleted = mutation({
  args: {
    membershipId: v.string(),
  },
  handler: async (ctx, args) => {
    // Note: We don't have direct access to membership details in delete events
    // You might need to store WorkOS membership IDs in your schema if you need this
    console.log("Membership deleted:", args.membershipId);
  },
});
