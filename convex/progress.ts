import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getProgress = query({
  args: { userId: v.string() },
  handler: async (ctx: any, args: { userId: string }) => {
    if (!args.userId) return null;
    return await ctx.db
      .query("userProgress")
      .withIndex("by_userId", (q: any) => q.eq("userId", args.userId))
      .first();
  },
});

export const saveProgress = mutation({
  args: {
    userId: v.string(),
    userName: v.string(),
    totalXp: v.number(),
    readingTimeSec: v.number(),
    currentStreak: v.number(),
    longestStreak: v.number(),
    lastActiveDate: v.optional(v.string()),
    readVerses: v.any(),
    bookmarks: v.any(),
    highlights: v.any(),
    notes: v.any(),
    dailyActivity: v.any(),
    activities: v.any(),
    journal: v.any(),
    challengeProgress: v.any(),
    unlockedSkills: v.any(),
    readingMode: v.string(),
    fontScale: v.number(),
    lineSpacing: v.number(),
    readingWidth: v.string(),
    readingViewMode: v.string(),
    animationsEnabled: v.boolean(),
    accentColor: v.string(),
    joinedAt: v.number(),
  },
  handler: async (ctx: any, args: any) => {
    if (!args.userId) return { success: false, error: "Missing userId" };

    const existing = await ctx.db
      .query("userProgress")
      .withIndex("by_userId", (q: any) => q.eq("userId", args.userId))
      .first();

    const now = Date.now();

    if (existing) {
      await ctx.db.patch(existing._id, {
        userName: args.userName,
        totalXp: args.totalXp,
        readingTimeSec: args.readingTimeSec,
        currentStreak: args.currentStreak,
        longestStreak: args.longestStreak,
        lastActiveDate: args.lastActiveDate,
        readVerses: args.readVerses,
        bookmarks: args.bookmarks,
        highlights: args.highlights,
        notes: args.notes,
        dailyActivity: args.dailyActivity,
        activities: args.activities,
        journal: args.journal,
        challengeProgress: args.challengeProgress,
        unlockedSkills: args.unlockedSkills,
        readingMode: args.readingMode,
        fontScale: args.fontScale,
        lineSpacing: args.lineSpacing,
        readingWidth: args.readingWidth,
        readingViewMode: args.readingViewMode,
        animationsEnabled: args.animationsEnabled,
        accentColor: args.accentColor,
        joinedAt: args.joinedAt || existing.joinedAt,
        updatedAt: now,
      });
      return { success: true, id: existing._id };
    }

    const id = await ctx.db.insert("userProgress", {
      ...args,
      updatedAt: now,
    });
    return { success: true, id };
  },
});

export const updateUserName = mutation({
  args: {
    userId: v.string(),
    newName: v.string(),
  },
  handler: async (ctx: any, args: { userId: string; newName: string }) => {
    if (!args.userId) return { success: false, error: "Missing userId" };
    const trimmed = args.newName.trim();
    if (!trimmed) return { success: false, error: "Name cannot be empty" };

    const existing = await ctx.db
      .query("userProgress")
      .withIndex("by_userId", (q: any) => q.eq("userId", args.userId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        userName: trimmed,
        updatedAt: Date.now(),
      });
      return { success: true };
    }

    return { success: false, error: "User progress record not found" };
  },
});

export const deleteUserProgress = mutation({
  args: { userId: v.string() },
  handler: async (ctx: any, args: { userId: string }) => {
    const existing = await ctx.db
      .query("userProgress")
      .withIndex("by_userId", (q: any) => q.eq("userId", args.userId))
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
      return { success: true };
    }

    return { success: false };
  },
});
