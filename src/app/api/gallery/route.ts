import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/api-utils";
import { z } from "zod";

export const dynamic = "force-dynamic";

const categoryEnum = z.enum([
  "CAMPUS",
  "EVENTS",
  "SPORTS",
  "CULTURAL",
  "ACADEMIC",
]);

// GET /api/gallery â†’ gallery albums + images (optional ?category=)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const imageWhere: Prisma.GalleryWhereInput = {};
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      const category = categoryEnum.safeParse(categoryParam);
      if (!category.success) return fail("Invalid category filter", 400);
      imageWhere.category = category.data;
    }

    const [albums, images] = await Promise.all([
      prisma.galleryAlbum.findMany({
        where: { isPublished: true },
        orderBy: { eventDate: "desc" },
        include: { _count: { select: { images: true } } },
      }),
      prisma.gallery.findMany({
        where: imageWhere,
        orderBy: { createdAt: "desc" },
        take: 60,
        select: {
          id: true,
          title: true,
          description: true,
          imageUrl: true,
          category: true,
          albumId: true,
          createdAt: true,
        },
      }),
    ]);

    return ok({ albums, images }, "Gallery fetched successfully");
  } catch (err) {
    console.error("GET /api/gallery", err);
    return fail("Failed to fetch gallery", 500);
  }
}
