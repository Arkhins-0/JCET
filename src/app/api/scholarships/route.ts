import { prisma } from "@/lib/prisma";
import { ok, fail, toNumber } from "@/lib/api-utils";

export const dynamic = "force-dynamic";

// GET /api/scholarships â†’ list active scholarships
export async function GET() {
  try {
    const scholarships = await prisma.scholarship.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });

    const serialized = scholarships.map((s) => ({
      ...s,
      amount: s.amount != null ? toNumber(s.amount) : null,
    }));

    return ok(serialized, "Scholarships fetched successfully");
  } catch (err) {
    console.error("GET /api/scholarships", err);
    return fail("Failed to fetch scholarships", 500);
  }
}
