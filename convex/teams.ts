import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTeam = query({
    args: {
        email: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.query('teams')
            .filter(q => q.eq(q.field('createdBy'), args.email))
            .collect();

        return result;
    }
})

export const createTeam = mutation({
    args: {
        teamName: v.string(),
        createdBy: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.insert("teams", args);
        return result;
    },
});

export const updateTeamName = mutation({
    args: {
        teamId: v.id("teams"),
        newName: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.teamId, { teamName: args.newName });
    },
});

export const deleteTeam = mutation({
    args: { teamId: v.id("teams") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.teamId);

        const files = await ctx.db.query('files')
            .filter(q => q.eq(q.field('teamId'), args.teamId))
            .collect();

        for (const file of files) {
            await ctx.db.delete(file._id);
        }
    },
});