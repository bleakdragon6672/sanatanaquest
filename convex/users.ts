import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

export const viewer = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    const user = await ctx.db.get(userId);
    if (!user) {
      return null;
    }
    return {
      _id: user._id,
      id: user._id,
      email: user.email,
      name: user.name || (user.email ? user.email.split("@")[0] : "Seeker"),
      isAnonymous: user.isAnonymous ?? false,
    };
  },
});

export const updateName = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthenticated");
    }
    const trimmed = args.name.trim();
    if (!trimmed) {
      throw new Error("Name cannot be empty");
    }
    await ctx.db.patch(userId, { name: trimmed });
    return { success: true };
  },
});
