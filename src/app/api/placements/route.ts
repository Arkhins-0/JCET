import { prisma } from "@/lib/prisma";
import { ok, fail, toNumber } from "@/lib/api-utils";

export const dynamic = "force-dynamic";

// GET /api/placements â†’ placement stats + records
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const batch = searchParams.get("batch") ?? undefined;

    const where = batch ? { batch } : {};

    const placements = await prisma.placement.findMany({
      where,
      orderBy: { package: "desc" },
    });

    const aggregate = await prisma.placement.aggregate({
      where,
      _max: { package: true },
      _avg: { package: true },
      _sum: { studentsHired: true },
      _count: { _all: true },
    });

    // Distinct recruiter logos for the marquee.
    const recruiters = Array.from(
      new Map(
        placements
          .filter((p) => p.companyLogo)
          .map((p) => [p.companyName, { name: p.companyName, logo: p.companyLogo }])
      ).values()
    );

    const stats = {
      highestPackage: toNumber(aggregate._max.package),
      averagePackage: Number(toNumber(aggregate._avg.package).toFixed(2)),
      totalHired: aggregate._sum.studentsHired ?? 0,
      totalCompanies: aggregate._count._all,
    };

    const serialized = placements.map((p) => ({
      ...p,
      package: toNumber(p.package),
    }));

    return ok(
      { stats, placements: serialized, recruiters },
      "Placements fetched successfully"
    );
  } catch (err) {
    console.error("GET /api/placements", err);
    return fail("Failed to fetch placements", 500);
  }
}
