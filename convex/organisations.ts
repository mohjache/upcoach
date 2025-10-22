// import { mutation } from "./_generated/server";
// import { v } from "convex/values";

// export const handleorganisationCreated = mutation({
//   args: {
//     organisation: v.object({
//       id: v.string(),
//       name: v.string(),
//       slug: v.optional(v.string()),
//       domains: v.optional(v.array(v.string())),
//       metadata: v.optional(v.object({})),
//       created_at: v.string(),
//       updated_at: v.string(),
//     }),
//   },
//   handler: async (ctx, args) => {
//     const { organisation } = args;

//     const existingOrg = await ctx.db
//       .query("organisations")
//       .withIndex("by_workos_id", (q) => q.eq("workosId", organisation.id))
//       .first();

//     if (!existingOrg) {
//       await ctx.db.insert("organisations", {
//         workosId: organisation.id,
//         name: organisation.name,
//         slug: organisation.slug,
//         domains: organisation.domains,
//         metadata: organisation.metadata,
//         createdAt: organisation.created_at,
//         updatedAt: organisation.updated_at,
//       });
//     }
//   },
// });

// export const handleorganisationUpdated = mutation({
//   args: {
//     organisation: v.object({
//       id: v.string(),
//       name: v.string(),
//       slug: v.optional(v.string()),
//       domains: v.optional(v.array(v.string())),
//       metadata: v.optional(v.object({})),
//       created_at: v.string(),
//       updated_at: v.string(),
//     }),
//   },
//   handler: async (ctx, args) => {
//     const { organisation } = args;

//     const existingOrg = await ctx.db
//       .query("organisations")
//       .withIndex("by_workos_id", (q) => q.eq("workosId", organisation.id))
//       .first();

//     if (existingOrg) {
//       await ctx.db.patch(existingOrg._id, {
//         name: organisation.name,
//         slug: organisation.slug,
//         domains: organisation.domains,
//         metadata: organisation.metadata,
//         updatedAt: organisation.updated_at,
//       });
//     }
//   },
// });

// export const handleorganisationDeleted = mutation({
//   args: {
//     organisationId: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const existingOrg = await ctx.db
//       .query("organisations")
//       .withIndex("by_workos_id", (q) => q.eq("workosId", args.organisationId))
//       .first();

//     if (existingOrg) {
//       // Delete organisation memberships first
//       const memberships = await ctx.db
//         .query("organisationMembers")
//         .withIndex("by_organisation", (q) =>
//           q.eq("organisationId", existingOrg._id),
//         )
//         .collect();

//       for (const membership of memberships) {
//         await ctx.db.delete(membership._id);
//       }

//       // Delete the organisation
//       await ctx.db.delete(existingOrg._id);
//     }
//   },
// });
