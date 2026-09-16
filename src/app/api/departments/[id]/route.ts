import { prisma } from "@/lib/prisma";
import { ok, fail, toNumber } from "@/lib/api-utils";

export const dynamic = "force-dynamic";

// GET /api/departments/[id] → single department with faculty + programmes.
// `id` may be a cuid or a slug.
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const department = await prisma.department.findFirst({
      where: { OR: [{ id }, { slug: id }, { shortCode: id.toUpperCase() }] },
      include: {
        hod: {
          select: {
            id: true,
            designation: true,
            qualification: true,
            profileImage: true,
            bio: true,
            user: { select: { name: true, email: true } },
          },
        },
        faculty: {
          orderBy: [{ isHOD: "desc" }, { experience: "desc" }],
          select: {
            id: true,
            designation: true,
            qualification: true,
            experience: true,
            profileImage: true,
            isHOD: true,
            user: { select: { name: true } },
          },
        },
        programmes: {
          where: { isActive: true },
          orderBy: { degree: "asc" },
        },
        sections: {
          orderBy: { order: "asc" },
          select: {
            id: true,
            key: true,
            label: true,
            order: true,
            html: true,
            images: true,
          },
        },
      },
    });

    if (!department) {
      return fail("Department not found", 404);
    }

    // Serialize Decimal fees to numbers.
    const serialized = {
      ...department,
      programmes: department.programmes.map((p) => ({
        ...p,
        fees: p.fees != null ? toNumber(p.fees) : null,
      })),
    };

    return ok(serialized, "Department fetched successfully");
  } catch (err) {
    console.error("GET /api/departments/[id]", err);
    return fail("Failed to fetch department", 500);
  }
}
