/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import { type Id } from "./_generated/dataModel";
import { type UpcoachUserIdentity } from "./userReview";

export const createUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    username: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<Id<"clerkUsers"> | undefined> => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("clerkUsers")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (existingUser) {
      console.log(`User with Clerk ID ${args.clerkId} already exists`);
      return existingUser._id;
    }

    const now = Date.now();
    const userId = await ctx.db.insert("clerkUsers", {
      clerkId: args.clerkId,
      email: args.email,
      firstName: args.firstName,
      lastName: args.lastName,
      imageUrl: args.imageUrl,
      username: args.username,
      searchIndex:
        `${args?.firstName} ${args?.lastName} ${args?.email}`.toLowerCase(),
      createdAt: now,
      updatedAt: now,
    });

    console.log(`Created user with Clerk ID ${args.clerkId}`);
    return userId;
  },
});

export const updateUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    username: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<Id<"clerkUsers"> | undefined> => {
    const user = await ctx.db
      .query("clerkUsers")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) {
      console.log(
        `User with Clerk ID ${args.clerkId} not found, creating new user`,
      );

      const userId = await ctx.runMutation(api.users.createUser, args);

      if (!userId) {
        return undefined;
      }

      return userId;
    }

    await ctx.db.patch(user._id, {
      email: args.email,
      firstName: args.firstName,
      lastName: args.lastName,
      imageUrl: args.imageUrl,
      username: args.username,
      searchIndex:
        `${args?.firstName} ${args?.lastName} ${args?.email}`.toLowerCase(),
      updatedAt: Date.now(),
    });

    console.log(`Updated user with Clerk ID ${args.clerkId}`);
    return user._id;
  },
});

export const deleteUser = mutation({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("clerkUsers")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) {
      console.log(`User with Clerk ID ${args.clerkId} not found`);
      return;
    }

    await ctx.db.delete(user._id);
    console.log(`Deleted user with Clerk ID ${args.clerkId}`);
  },
});

export const getUserByClerkId = query({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("clerkUsers")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();
  },
});

export const searchUsers = query({
  args: {
    query: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = (await ctx.auth.getUserIdentity()) as UpcoachUserIdentity;
    if (identity === null) {
      throw new Error("Not authenticated");
    }

    if (!args.query) {
      return [];
    }

    console.log("identity.userId", identity.subject);

    const result = await ctx.db
      .query("clerkUsers")
      .withSearchIndex("by_search_index", (q) =>
        q.search("searchIndex", args.query),
      )
      .filter((q) => q.neq(q.field("clerkId"), identity.subject))
      .take(5);

    console.log("found users", result);
    return result;
  },
});

export const getUserOrganizations = query({
  args: { userId: v.id("clerkUsers") },
  handler: async (ctx, args) => {
    const memberships = await ctx.db
      .query("organizationMemberships")
      .withIndex("by_user", (q) => q.eq("clerkUserId", args.userId))
      .collect();

    const organizations = [];
    for (const membership of memberships) {
      const org = await ctx.db.get(membership.organizationId);
      if (org) {
        organizations.push({
          ...org,
          role: membership.role,
        });
      }
    }

    return organizations;
  },
});
