import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    user: defineTable({
        name: v.string(),
        email: v.string(),
        image: v.string(),
    }),
    teams: defineTable({
        teamName: v.string(),
        createdBy: v.string(),
    }),
    files: defineTable({
        fileName: v.string(),
        teamId: v.string(),
        createdBy: v.string(),
        document: v.string(),
        whiteboard: v.string(),
        archived: v.boolean(),
    }),
});