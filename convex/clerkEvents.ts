/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { internalAction, internalMutation, query } from "./_generated/server";
import { v } from "convex/values";

export const handleMembershipCreated = internalMutation({
  args: {
    clerkEvent: v.object({
      id: v.string(),
      eventType: v.string(),
      eventData: v.any(),
      createdAt: v.optional(v.number()),

      updatedAt: v.optional(v.number()),
    }),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("clerkEvents")
      .withIndex("by_clerk_event_id", (q) =>
        q.eq("clerkEventId", args.clerkEvent.id),
      )
      .unique();

    if (existing) {
      console.log(`clerk event with id ${args.clerkEvent.id} already exists`);
      return;
    }

    await ctx.db.insert("clerkEvents", {
      clerkEventId: args.clerkEvent.id,
      eventType: args.clerkEvent.eventType,
      eventData: args.clerkEvent.eventData,
      createdAt: args.clerkEvent.createdAt,
      status: "pending",
    });
  },
});

export const handleMembershipUpdated = internalMutation({
  args: {
    clerkEvent: v.object({
      id: v.string(),
      status: v.union(v.literal("processed"), v.literal("failed")),
      updatedAt: v.optional(v.number()),
    }),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("clerkEvents")
      .withIndex("by_clerk_event_id", (q) =>
        q.eq("clerkEventId", args.clerkEvent.id),
      )
      .unique();

    if (!existing) {
      console.log(`clerk event with id ${args.clerkEvent.id} does not exist`);
      return;
    }

    await ctx.db.patch(existing._id, {
      status: args.clerkEvent.status,
      updatedAt: args.clerkEvent.updatedAt,
    });
  },
});

export const queryEvent = query({
  args: {
    clerkEventId: v.string(),
  },
  handler: async (ctx, args) => {
    const events = await ctx.db
      .query("clerkEvents")
      .withIndex("by_clerk_event_id", (q) =>
        q.eq("clerkEventId", args.clerkEventId),
      )
      .unique();

    return events;
  },
});
