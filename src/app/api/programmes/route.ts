import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ok, fail, toNumber } from "@/lib/api-utils";
import { programmeQuerySchema } from "@/lib/validations/programme";

export const dynamic = "force-dynamic";

// GET /api/programmes â†’ list programmes (filter by degree, department)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = programmeQuerySchema.safeParse({
      degree: searchParams.get("degree") ?? undefined,
      department: searchParams.get("department") ?? undefined,
    });

    if (!parsed.success) {
      return fail("Invalid query parameters", 400, parsed.error.flatten());
    }

    const { degree, department } = parsed.data;

    const where: Prisma.ProgrammeWhereInput = { isActive: true };
    if (degree) where.degree = degree;
    if (department) {
      where.department = {
        OR: [{ id: department }, { slug: department }, { shortCode: department.toUpperCase() }],
      };
    }

    const programmes = await prisma.programme.findMany({
      where,
      orderBy: [{ degree: "asc" }, { name: "asc" }],
      include: {
        department: { select: { id: true, name: true, slug: true, shortCode: true } },
      },
    });

    const serialized = programmes.map((p) => ({
      ...p,
      fees: p.fees != null ? toNumber(p.fees) : null,
    }));

    return ok(serialized, "Programmes fetched successfully");
  } catch (err) {
    console.error("GET /api/programmes", err);
    return fail("Failed to fetch programmes", 500);
  }
}
