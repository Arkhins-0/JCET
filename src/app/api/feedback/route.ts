import { prisma } from "@/lib/prisma";
import { ok, fail, parsePagination, buildMeta } from "@/lib/api-utils";
import { requireRole } from "@/lib/guards";
import { createFeedbackSchema } from "@/lib/validations/feedback";

export const dynamic = "force-dynamic";

// POST /api/feedback â†’ submit feedback / contact message (public)
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) return fail("Invalid JSON body", 400);

    const parsed = createFeedbackSchema.safeParse(body);
    if (!parsed.success) {
      return fail("Validation failed", 422, parsed.error.flatten());
    }
    const data = parsed.data;

    const created = await prisma.feedback.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone ?? null,
        subject: data.subject ?? null,
        message: data.message,
        type: data.type,
      },
      select: { id: true, name: true, submittedAt: true },
    });

    return ok(
      created,
      "Thank you! Your message has been received.",
      undefined,
      201
    );
  } catch (err) {
    console.error("POST /api/feedback", err);
    return fail("Failed to submit feedback", 500);
  }
}

// GET /api/feedback â†’ list messages (ADMIN / STAFF)
export async function GET(req: Request) {
  const { error } = await requireRole(["ADMIN", "STAFF"]);
  if (error) return error;

  try {
    const { searchParams } = new URL(req.url);
    const { page, limit, skip } = parsePagination(searchParams);

    const [items, total] = await Promise.all([
      prisma.feedback.findMany({
        skip,
        take: limit,
        orderBy: { submittedAt: "desc" },
      }),
      prisma.feedback.count(),
    ]);

    return ok(items, "Feedback fetched", buildMeta(total, page, limit));
  } catch (err) {
    console.error("GET /api/feedback", err);
    return fail("Failed to fetch feedback", 500);
  }
}
