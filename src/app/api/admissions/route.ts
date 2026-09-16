import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  ok,
  fail,
  parsePagination,
  buildMeta,
  generateApplicationNumber,
} from "@/lib/api-utils";
import { requireRole } from "@/lib/guards";
import {
  createAdmissionSchema,
  admissionStatusEnum,
} from "@/lib/validations/admission";

export const dynamic = "force-dynamic";

// GET /api/admissions â†’ list applications (ADMIN only), paginated + status filter
export async function GET(req: Request) {
  const { error } = await requireRole(["ADMIN"]);
  if (error) return error;

  try {
    const { searchParams } = new URL(req.url);
    const { page, limit, skip } = parsePagination(searchParams);

    const where: Prisma.AdmissionWhereInput = {};
    const statusParam = searchParams.get("status");
    if (statusParam) {
      const status = admissionStatusEnum.safeParse(statusParam);
      if (!status.success) return fail("Invalid status filter", 400);
      where.status = status.data;
    }
    const q = searchParams.get("q");
    if (q) {
      where.OR = [
        { applicantName: { contains: q, mode: "insensitive" } },
        { email: { contains: q, mode: "insensitive" } },
        { applicationNumber: { contains: q, mode: "insensitive" } },
      ];
    }

    const [admissions, total] = await Promise.all([
      prisma.admission.findMany({
        where,
        skip,
        take: limit,
        orderBy: { appliedAt: "desc" },
        include: {
          programme: {
            select: { name: true, degree: true, department: { select: { name: true } } },
          },
        },
      }),
      prisma.admission.count({ where }),
    ]);

    return ok(admissions, "Applications fetched", buildMeta(total, page, limit));
  } catch (err) {
    console.error("GET /api/admissions", err);
    return fail("Failed to fetch applications", 500);
  }
}

// POST /api/admissions â†’ submit application (public)
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) return fail("Invalid JSON body", 400);

    const parsed = createAdmissionSchema.safeParse(body);
    if (!parsed.success) {
      return fail("Validation failed", 422, parsed.error.flatten());
    }
    const data = parsed.data;

    // Ensure the programme exists and is open.
    const programme = await prisma.programme.findFirst({
      where: { id: data.programmeId, isActive: true },
    });
    if (!programme) {
      return fail("Selected programme is not available", 404);
    }

    // Create with a unique application number, retrying on the rare collision.
    let created = null;
    for (let attempt = 0; attempt < 5 && !created; attempt++) {
      try {
        created = await prisma.admission.create({
          data: {
            applicationNumber: generateApplicationNumber(),
            applicantName: data.applicantName,
            email: data.email,
            phone: data.phone,
            dob: data.dob,
            address: data.address,
            programmeId: data.programmeId,
            keamRank: data.keamRank ?? null,
            plusTwoPercent: data.plusTwoPercent ?? null,
            category: data.category,
            documents: data.documents ?? Prisma.JsonNull,
          },
          select: {
            id: true,
            applicationNumber: true,
            applicantName: true,
            status: true,
            appliedAt: true,
          },
        });
      } catch (e) {
        if (
          e instanceof Prisma.PrismaClientKnownRequestError &&
          e.code === "P2002"
        ) {
          continue; // duplicate application number â€” retry
        }
        throw e;
      }
    }

    if (!created) return fail("Could not generate application. Try again.", 500);

    return ok(
      created,
      `Application submitted successfully. Your application number is ${created.applicationNumber}.`,
      undefined,
      201
    );
  } catch (err) {
    console.error("POST /api/admissions", err);
    return fail("Failed to submit application", 500);
  }
}
