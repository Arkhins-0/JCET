import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ok, fail, parsePagination, buildMeta } from "@/lib/api-utils";
import { requireAuth } from "@/lib/guards";

export const dynamic = "force-dynamic";

// GET /api/notifications â†’ notifications for the logged-in user (by role), unexpired
export async function GET(req: Request) {
  const { session, error } = await requireAuth();
  if (error) return error;

  try {
    const { searchParams } = new URL(req.url);
    const { page, limit, skip } = parsePagination(searchParams);
    const role = session.user.role as "STUDENT" | "FACULTY" | "STAFF" | "ADMIN";

    // Map user role to the targetRole values that should reach them.
    const targets: Prisma.NotificationWhereInput["targetRole"] =
      role === "ADMIN"
        ? undefined // admins see everything
        : { in: ["ALL", role === "STUDENT" ? "STUDENT" : role === "FACULTY" ? "FACULTY" : "STAFF"] };

    const where: Prisma.NotificationWhereInput = {
      AND: [
        targets ? { targetRole: targets } : {},
        { OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }] },
      ],
    };

    const [items, total] = await Promise.all([
      prisma.notification.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.notification.count({ where }),
    ]);

    return ok(items, "Notifications fetched", buildMeta(total, page, limit));
  } catch (err) {
    console.error("GET /api/notifications", err);
    return fail("Failed to fetch notifications", 500);
  }
}
