import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  userProgress: defineTable({
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
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_totalXp", ["totalXp"]),
});
