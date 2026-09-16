import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/api-utils";
import { requireRole } from "@/lib/guards";
import { updateAdmissionSchema } from "@/lib/validations/admission";

export const dynamic = "force-dynamic";

// PATCH /api/admissions/[id] → update status (ADMIN only)
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { error } = await requireRole(["ADMIN"]);
  if (error) return error;

  try {
    const body = await req.json().catch(() => null);
    if (!body) return fail("Invalid JSON body", 400);

    const parsed = updateAdmissionSchema.safeParse(body);
    if (!parsed.success) {
      return fail("Validation failed", 422, parsed.error.flatten());
    }

    const updated = await prisma.admission.update({
      where: { id: params.id },
      data: { status: parsed.data.status },
      select: { id: true, applicationNumber: true, status: true, updatedAt: true },
    });

    return ok(updated, "Application status updated");
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return fail("Application not found", 404);
    }
    console.error("PATCH /api/admissions/[id]", err);
    return fail("Failed to update application", 500);
  }
}

// GET /api/admissions/[id] → single application (ADMIN only)
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { error } = await requireRole(["ADMIN"]);
  if (error) return error;

  try {
    const admission = await prisma.admission.findUnique({
      where: { id: params.id },
      include: {
        programme: {
          select: { name: true, degree: true, department: { select: { name: true } } },
        },
      },
    });
    if (!admission) return fail("Application not found", 404);
    return ok(admission, "Application fetched");
  } catch (err) {
    console.error("GET /api/admissions/[id]", err);
    return fail("Failed to fetch application", 500);
  }
}
