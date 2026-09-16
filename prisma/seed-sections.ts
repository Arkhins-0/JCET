// Seeds DepartmentSection rows from the scraped jawaharlalcolleges.com data.
// Run AFTER the main seed (departments must exist):  npm run db:seed:sections
import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { join } from "path";

const prisma = new PrismaClient();

type Section = {
  key: string;
  label: string;
  order: number;
  html: string;
  images: string[];
};
type DeptData = { slug: string; sourceUrl: string; sections: Section[] };

async function main() {
  const file = join(__dirname, "data", "department_sections.json");
  const data: Record<string, DeptData> = JSON.parse(readFileSync(file, "utf-8"));

  const departments = await prisma.department.findMany({
    select: { id: true, slug: true },
  });
  const idBySlug = new Map(departments.map((d) => [d.slug, d.id]));

  if (idBySlug.size === 0) {
    console.error("✖ No departments found. Run `npm run db:seed` first.");
    process.exit(1);
  }

  let seeded = 0;
  let sectionCount = 0;
  const missing: string[] = [];

  for (const [slug, dept] of Object.entries(data)) {
    const departmentId = idBySlug.get(slug);
    if (!departmentId) {
      missing.push(slug);
      continue;
    }

    // Clean replace: drop existing sections, then recreate.
    await prisma.departmentSection.deleteMany({ where: { departmentId } });
    await prisma.departmentSection.createMany({
      data: dept.sections.map((s) => ({
        departmentId,
        key: s.key,
        label: s.label,
        order: s.order,
        html: s.html,
        images: s.images,
      })),
    });

    seeded++;
    sectionCount += dept.sections.length;
    console.log(
      `  ✔ ${slug.padEnd(45)} ${dept.sections.length} sections, ` +
        `${dept.sections.reduce((n, s) => n + s.images.length, 0)} images`
    );
  }

  console.log(
    `\n✅ Seeded ${sectionCount} sections across ${seeded} departments.`
  );
  if (missing.length) {
    console.log(
      `   Skipped (no matching DB department): ${missing.join(", ")}`
    );
  }
}

main()
  .catch((e) => {
    console.error("❌ Section seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
