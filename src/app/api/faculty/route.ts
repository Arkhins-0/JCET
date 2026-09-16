import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ok, fail, parsePagination, buildMeta } from "@/lib/api-utils";
import { facultyQuerySchema } from "@/lib/validations/faculty";

export const dynamic = "force-dynamic";

// GET /api/faculty â†’ list faculty (filter by department), paginated
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const { page, limit, skip } = parsePagination(searchParams);

    const parsed = facultyQuerySchema.safeParse({
      department: searchParams.get("department") ?? undefined,
      isHOD: searchParams.get("isHOD") ?? undefined,
    });
    if (!parsed.success) {
      return fail("Invalid query parameters", 400, parsed.error.flatten());
    }
    const { department, isHOD } = parsed.data;

    const where: Prisma.FacultyWhereInput = {};
    if (typeof isHOD === "boolean") where.isHOD = isHOD;
    if (department) {
      where.department = {
        OR: [{ id: department }, { slug: department }, { shortCode: department.toUpperCase() }],
      };
    }

    const [faculty, total] = await Promise.all([
      prisma.faculty.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ isHOD: "desc" }, { experience: "desc" }],
        select: {
          id: true,
          employeeId: true,
          designation: true,
          qualification: true,
          experience: true,
          profileImage: true,
          bio: true,
          isHOD: true,
          user: { select: { name: true, email: true } },
          department: { select: { id: true, name: true, slug: true, shortCode: true } },
        },
      }),
      prisma.faculty.count({ where }),
    ]);

    return ok(faculty, "Faculty fetched successfully", buildMeta(total, page, limit));
  } catch (err) {
    console.error("GET /api/faculty", err);
    return fail("Failed to fetch faculty", 500);
  }
}
