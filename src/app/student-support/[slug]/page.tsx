import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/shared/ContentPage";
import { getContentPage, getSectionPages } from "@/constants/contentPages";

export function generateStaticParams() {
  return getSectionPages("student-support").map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const page = getContentPage("student-support", params.slug);
  if (!page) return {};
  return { title: page.title, description: page.intro ?? page.subtitle };
}

export default function StudentSupportSubPage({
  params,
}: {
  params: { slug: string };
}) {
  const page = getContentPage("student-support", params.slug);
  if (!page) notFound();
  return <ContentPage page={page} />;
}
