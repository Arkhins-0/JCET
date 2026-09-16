import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/api-utils";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return ok({ status: "healthy", db: "connected" }, "Service healthy");
  } catch {
    return fail("Database connection failed", 503);
  }
}
