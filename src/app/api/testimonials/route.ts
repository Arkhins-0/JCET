import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/api-utils";

export const dynamic = "force-dynamic";

// GET /api/testimonials â†’ published testimonials, ordered
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { isPublished: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return ok(testimonials, "Testimonials fetched successfully");
  } catch (err) {
    console.error("GET /api/testimonials", err);
    return fail("Failed to fetch testimonials", 500);
  }
}
