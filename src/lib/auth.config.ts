import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe auth config (no Prisma / bcrypt imports).
 * Consumed by both `middleware.ts` (edge runtime) and the full Node config in
 * `auth.ts`. The Credentials provider with DB access is added only in `auth.ts`.
 *
 * The site and its API live on the same origin, so the default first-party
 * (SameSite=Lax) session cookies work everywhere — no cross-site cookie config.
 */
export const authConfig = {
  // Trust the deployment host (required for Auth.js v5 behind Vercel proxies).
  trustHost: true,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [], // populated in auth.ts (Credentials provider needs Node runtime)
  callbacks: {
    // Persist role + id onto the JWT.
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    // Expose role + id on the session object.
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
