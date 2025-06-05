/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import { type Id } from "./_generated/dataModel";

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

export const getUserByEmail = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("clerkUsers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
  },
});

export const listUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("clerkUsers").collect();
  },
});

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    return await ctx.db
      .query("clerkUsers")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
  },
});
