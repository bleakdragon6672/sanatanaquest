import { Password } from "@convex-dev/auth/providers/Password";
import { Anonymous } from "@convex-dev/auth/providers/Anonymous";
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      profile(params) {
        const email = ((params.email as string) || "").trim().toLowerCase();
        const rawName = (params.name as string)?.trim();
        const fallbackName = email ? email.split("@")[0] : "Seeker";
        return {
          email,
          name: rawName || fallbackName,
        };
      },
      validatePasswordRequirements: (password: string) => {
        if (!password || password.length < 6) {
          throw new Error("Password must be at least 6 characters.");
        }
      },
    }),
    Anonymous,
  ],
});
