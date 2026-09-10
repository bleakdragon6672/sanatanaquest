import { query } from "./_generated/server";

export const getLeaderboard = query({
  args: {},
  handler: async (ctx: any) => {
    const users = await ctx.db
      .query("userProgress")
      .withIndex("by_totalXp")
      .order("desc")
      .take(100);

    return users.map((u: any, i: number) => {
      const readVerses = u.readVerses as Record<string, unknown> | null;
      const versesRead = readVerses ? Object.keys(readVerses).length : 0;

      return {
        rank: i + 1,
        userId: u.userId,
        userName: u.userName || "Seeker",
        totalXp: u.totalXp ?? 0,
        currentStreak: u.currentStreak ?? 0,
        longestStreak: u.longestStreak ?? 0,
        versesRead,
        joinedAt: u.joinedAt ?? null,
      };
    });
  },
});
