import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/shared/ContentPage";
import { getContentPage, getSectionPages } from "@/constants/contentPages";

export function generateStaticParams() {
  // Exclude the "iqac" index slug (served by /iqac directly).
  return getSectionPages("iqac")
    .filter((p) => p.slug !== "iqac")
    .map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const page = getContentPage("iqac", params.slug);
  if (!page) return {};
  return { title: page.title, description: page.intro ?? page.subtitle };
}

export default function IqacSubPage({ params }: { params: { slug: string } }) {
  const page = getContentPage("iqac", params.slug);
  if (!page || page.slug === "iqac") notFound();
  return <ContentPage page={page} />;
}
