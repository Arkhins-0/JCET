import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/api-utils";
import { requireRole } from "@/lib/guards";
import { createCertificateSchema } from "@/lib/validations/certificate";

export const dynamic = "force-dynamic";

// POST /api/certificates â†’ request certificate (STUDENT only)
export async function POST(req: Request) {
  const { session, error } = await requireRole(["STUDENT"]);
  if (error) return error;

  try {
    const student = await prisma.student.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });
    if (!student) {
      return fail("No student profile linked to this account", 404);
    }

    const body = await req.json().catch(() => null);
    if (!body) return fail("Invalid JSON body", 400);

    const parsed = createCertificateSchema.safeParse(body);
    if (!parsed.success) {
      return fail("Validation failed", 422, parsed.error.flatten());
    }

    const created = await prisma.certificateRequest.create({
      data: {
        studentId: student.id,
        type: parsed.data.type,
        reason: parsed.data.reason ?? null,
      },
    });

    return ok(created, "Certificate request submitted", undefined, 201);
  } catch (err) {
    console.error("POST /api/certificates", err);
    return fail("Failed to submit certificate request", 500);
  }
}

// GET /api/certificates â†’ the logged-in student's own requests
export async function GET() {
  const { session, error } = await requireRole(["STUDENT"]);
  if (error) return error;

  try {
    const student = await prisma.student.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });
    if (!student) return fail("No student profile linked to this account", 404);

    const requests = await prisma.certificateRequest.findMany({
      where: { studentId: student.id },
      orderBy: { requestedAt: "desc" },
    });

    return ok(requests, "Certificate requests fetched");
  } catch (err) {
    console.error("GET /api/certificates", err);
    return fail("Failed to fetch certificate requests", 500);
  }
}
