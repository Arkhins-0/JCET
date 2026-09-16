import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ok, fail, parsePagination, buildMeta, slugify } from "@/lib/api-utils";
import { requireRole } from "@/lib/guards";
import { createNewsSchema, newsTypeEnum } from "@/lib/validations/news";

export const dynamic = "force-dynamic";

// GET /api/news â†’ paginated news/events (filter by type). Public sees published only.
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const { page, limit, skip } = parsePagination(searchParams);

    const where: Prisma.NewsEventWhereInput = { isPublished: true };

    const typeParam = searchParams.get("type");
    if (typeParam) {
      const type = newsTypeEnum.safeParse(typeParam);
      if (!type.success) return fail("Invalid type filter", 400);
      where.type = type.data;
    }

    const tag = searchParams.get("tag");
    if (tag) where.tags = { has: tag };

    const [items, total] = await Promise.all([
      prisma.newsEvent.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          type: true,
          thumbnail: true,
          publishedAt: true,
          eventDate: true,
          tags: true,
          author: { select: { name: true } },
        },
      }),
      prisma.newsEvent.count({ where }),
    ]);

    return ok(items, "News fetched successfully", buildMeta(total, page, limit));
  } catch (err) {
    console.error("GET /api/news", err);
    return fail("Failed to fetch news", 500);
  }
}

// POST /api/news â†’ create post (ADMIN / STAFF)
export async function POST(req: Request) {
  const { session, error } = await requireRole(["ADMIN", "STAFF"]);
  if (error) return error;

  try {
    const body = await req.json().catch(() => null);
    if (!body) return fail("Invalid JSON body", 400);

    const parsed = createNewsSchema.safeParse(body);
    if (!parsed.success) {
      return fail("Validation failed", 422, parsed.error.flatten());
    }
    const data = parsed.data;
    const slug = data.slug || slugify(data.title);

    const exists = await prisma.newsEvent.findUnique({ where: { slug } });
    if (exists) return fail("A post with this slug already exists", 409);

    const created = await prisma.newsEvent.create({
      data: {
        title: data.title,
        slug,
        content: data.content,
        excerpt: data.excerpt ?? null,
        type: data.type,
        thumbnail: data.thumbnail ?? null,
        eventDate: data.eventDate ?? null,
        isPublished: data.isPublished,
        publishedAt: data.isPublished ? new Date() : null,
        tags: data.tags,
        authorId: session.user.id,
      },
    });

    return ok(created, "Post created successfully", undefined, 201);
  } catch (err) {
    console.error("POST /api/news", err);
    return fail("Failed to create post", 500);
  }
}
