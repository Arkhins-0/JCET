import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/api-utils";

export const dynamic = "force-dynamic";

// GET /api/news/[slug] → single published post
export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await prisma.newsEvent.findFirst({
      where: { slug: params.slug, isPublished: true },
      include: { author: { select: { name: true } } },
    });

    if (!post) return fail("Post not found", 404);
    return ok(post, "Post fetched successfully");
  } catch (err) {
    console.error("GET /api/news/[slug]", err);
    return fail("Failed to fetch post", 500);
  }
}
