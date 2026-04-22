import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createFile = mutation({
    args: {
        fileName: v.string(),
        teamId: v.string(),
        createdBy: v.string(),
        document: v.string(),
        whiteboard: v.string(),
        archived: v.boolean(),
    },
    handler: async (ctx, args) => {
        const result = ctx.db.insert('files', args);
        return result;
    },
});

export const getFiles = query({
    args: {
        teamId: v.string(),
    },
    handler: async (ctx, args) => {
        const result = ctx.db.query('files')
            .filter((q) => q.eq(q.field('teamId'), args.teamId))
            .order('desc')
            .collect();
        return result;
    },
});

export const updateDocument = mutation({
    args: {
        _id: v.id('files'),
        document: v.string(),
    },
    handler: async (ctx, args) => {
        const result = ctx.db.patch(args._id, { document: args.document });
        return result;
    },
});

export const updateWhiteboard = mutation({
    args: {
        _id: v.id('files'),
        whiteboard: v.string(),
    },
    handler: async (ctx, args) => {
        const result = ctx.db.patch(args._id, { whiteboard: args.whiteboard });
        return result;
    },
});

export const getFileById = query({
    args: {
        fileId: v.id('files')
    },
    handler: async (ctx, args) => {
        const item = await ctx.db.get(args.fileId);
        return item;
    },
});


export const deleteFile = mutation({
    args: { _id: v.id('files') },
    handler: async (ctx, args) => {
        return await ctx.db.delete(args._id);
    },
});

export const renameFile = mutation({
    args: {
        _id: v.id('files'),
        newName: v.string()
    },
    handler: async (ctx, args) => {
        return await ctx.db.patch(args._id, { fileName: args.newName });
    },
});