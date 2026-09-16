import { auth } from "@/lib/auth";
import { fail } from "@/lib/api-utils";
import type { Session } from "next-auth";

type Role = "ADMIN" | "STAFF" | "FACULTY" | "STUDENT";

type GuardResult =
  | { session: Session; error: null }
  | { session: null; error: ReturnType<typeof fail> };

/** Require an authenticated session. */
export async function requireAuth(): Promise<GuardResult> {
  const session = await auth();
  if (!session?.user) {
    return { session: null, error: fail("Authentication required", 401) };
  }
  return { session, error: null };
}

/**
 * Require an authenticated session whose role is in `allowed`.
 * Returns `{ session }` on success, or `{ error }` (401/403) to return directly.
 */
export async function requireRole(allowed: Role[]): Promise<GuardResult> {
  const session = await auth();
  if (!session?.user) {
    return { session: null, error: fail("Authentication required", 401) };
  }
  const role = session.user.role as Role | undefined;
  if (!role || !allowed.includes(role)) {
    return {
      session: null,
      error: fail("You do not have permission to perform this action", 403),
    };
  }
  return { session, error: null };
}
