/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api, internal } from "./_generated/api";
import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const handleOrganizationCreated = internalMutation({
  args: { organization: v.any() },
  handler: async (ctx, args) => {
    const org = args.organization;
    console.log("handleOrganizationCreated", org);

    await ctx.db.insert("organizations", {
      clerkId: org.id,
      name: org.name,
      slug: org.slug,
      imageUrl: org.image_url,
      createdBy: org.created_by,
      publicMetadata: org.public_metadata,
      privateMetadata: org.private_metadata,
      maxAllowedMemberships: org.max_allowed_memberships,
      adminDeleteEnabled: org.admin_delete_enabled,
      membersCount: org.members_count,
      pendingInvitationsCount: org.pending_invitations_count,
    });
  },
});

export const handleOrganizationUpdated = internalMutation({
  args: {
    organization: v.object({
      id: v.string(),
      name: v.optional(v.string()),
      slug: v.optional(v.string()),
      image_url: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    console.log("handleOrganizationUpdated", args);
    const org = args.organization;

    const existingOrg = await ctx.db
      .query("organizations")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", org.id))
      .unique();

    if (!existingOrg) {
      console.log(
        `organisation with Clerk ID ${args.organization.id} not found, creating new user`,
      );

      await ctx.runMutation(
        internal.organizations.handleOrganizationCreated,
        args,
      );

      return;
    }

    if (existingOrg) {
      await ctx.db.patch(existingOrg._id, {
        name: org.name,
        slug: org.slug,
        imageUrl: org.image_url,
      });
    }
  },
});

export const handleOrganizationDeleted = internalMutation({
  args: { organizationId: v.id("organizations") },
  handler: async (ctx, args) => {
    console.log("handleOrganizationDeleted", args);
    const existingOrg = await ctx.db
      .query("organizations")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.organizationId))
      .unique();

    if (existingOrg) {
      await ctx.db.delete(existingOrg._id);

      // Also delete any organization memberships
      const memberships = await ctx.db
        .query("organizationMemberships")
        .withIndex("by_organization", (q) =>
          q.eq("organizationId", args.organizationId),
        )
        .collect();

      for (const membership of memberships) {
        await ctx.db.delete(membership._id);
      }
    }
  },
});
