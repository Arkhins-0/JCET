// Replaces placeholder (Unsplash) gallery images with real jawaharlalcolleges.com
// photos. Safe to re-run.  npm run db:seed:gallery
import { PrismaClient, GalleryCategory } from "@prisma/client";

const prisma = new PrismaClient();

const REAL_IMAGES: { title: string; imageUrl: string; category: GalleryCategory }[] = [
  { title: "JCET Campus", imageUrl: "https://jawaharlalcolleges.com/images/college/2.jpg", category: "CAMPUS" },
  { title: "Academic Block", imageUrl: "https://jawaharlalcolleges.com/images/college/arc.jpg", category: "ACADEMIC" },
  { title: "Smriti Dinam 2026", imageUrl: "https://jawaharlalcolleges.com/globalpannel/public/images/smriti_dinam_2026_1.webp", category: "CULTURAL" },
];

async function main() {
  const admin =
    (await prisma.user.findFirst({ where: { role: "ADMIN" } })) ??
    (await prisma.user.findFirst());
  if (!admin) {
    console.error("✖ No users found. Run `npm run db:seed` first.");
    process.exit(1);
  }

  // Drop any placeholder images.
  const removed = await prisma.gallery.deleteMany({
    where: { imageUrl: { contains: "unsplash.com" } },
  });

  let album = await prisma.galleryAlbum.findFirst({ where: { title: "Campus Life" } });
  if (!album) {
    album = await prisma.galleryAlbum.create({
      data: {
        title: "Campus Life",
        description: "Glimpses of life at the JCET campus in Lakkidi, Ottapalam.",
        isPublished: true,
        eventDate: new Date(),
      },
    });
  }

  for (const img of REAL_IMAGES) {
    const existing = await prisma.gallery.findFirst({ where: { title: img.title } });
    if (existing) {
      await prisma.gallery.update({
        where: { id: existing.id },
        data: { imageUrl: img.imageUrl, category: img.category, albumId: album.id },
      });
    } else {
      await prisma.gallery.create({
        data: { ...img, albumId: album.id, uploadedById: admin.id },
      });
    }
  }

  console.log(
    `✅ Gallery updated: ${REAL_IMAGES.length} real images set, ${removed.count} placeholder(s) removed.`
  );
}

main()
  .catch((e) => {
    console.error("❌ Gallery seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
