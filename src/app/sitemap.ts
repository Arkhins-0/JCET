import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants/siteConfig";
import { mainNav } from "@/constants/navigation";
import { contentPages } from "@/constants/contentPages";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  // Static top-level + listing pages.
  const staticPaths = [
    "/",
    "/about",
    "/departments",
    "/academics",
    "/academics/programmes",
    "/admissions",
    "/admissions/apply",
    "/admissions/scholarship",
    "/student-support",
    "/iqac",
    "/placements",
    "/news",
    "/gallery",
    "/contact",
    // Top-bar / media pages
    "/study-in-india",
    "/nirf",
    "/r-and-d-centre",
    "/media",
    "/media/upcoming-events",
    "/media/circular",
  ];

  // Internal department links from the mega-menu.
  const departmentPaths =
    mainNav
      .find((g) => g.label === "Departments")
      ?.columns?.flatMap((c) => c.links)
      .filter((l) => !l.external)
      .map((l) => l.href) ?? [];

  // Content registry pages rendered via section [slug] routes.
  // (Standalone "info" pages have their own paths in staticPaths above.)
  const contentPaths = contentPages
    .filter((p) => p.section !== "info")
    .filter((p) => !(p.section === "iqac" && p.slug === "iqac"))
    .map((p) => `/${p.section}/${p.slug}`);

  const all = Array.from(
    new Set([...staticPaths, ...departmentPaths, ...contentPaths])
  );

  return all.map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
