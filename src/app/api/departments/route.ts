import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/api-utils";

export const dynamic = "force-dynamic";

// GET /api/departments â†’ list all active departments
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const includeInactive = searchParams.get("all") === "true";

    const departments = await prisma.department.findMany({
      where: includeInactive ? {} : { isActive: true },
      orderBy: { name: "asc" },
      include: {
        hod: {
          select: {
            id: true,
            designation: true,
            user: { select: { name: true } },
          },
        },
        _count: { select: { programmes: true, faculty: true, students: true } },
      },
    });

    return ok(departments, "Departments fetched successfully");
  } catch (err) {
    console.error("GET /api/departments", err);
    return fail("Failed to fetch departments", 500);
  }
}
