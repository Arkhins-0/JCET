import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/lib/auth.config";

// Edge-safe NextAuth instance (no Prisma/bcrypt) used only to read the session.
const { auth } = NextAuth(authConfig);

// The API and the site are now served from the same origin (this app), so no
// CORS layer is needed. This middleware only gates the protected API routes.

// Path prefixes that require any authenticated session.
const AUTH_REQUIRED_PREFIXES = ["/api/notifications", "/api/certificates"];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth?.user;

  // Admissions: POST is public (applicants); GET/PATCH require a session
  // (role is then enforced as ADMIN inside the route handler).
  const isAdmissionsProtected =
    pathname.startsWith("/api/admissions") && req.method !== "POST";

  const needsAuth =
    AUTH_REQUIRED_PREFIXES.some((p) => pathname.startsWith(p)) ||
    isAdmissionsProtected;

  if (needsAuth && !isLoggedIn) {
    return NextResponse.json(
      { success: false, data: null, message: "Authentication required" },
      { status: 401 }
    );
  }

  return NextResponse.next();
});

export const config = {
  // Only run on API routes; page auth (the /portal area) is handled in-app.
  matcher: ["/api/:path*"],
};
