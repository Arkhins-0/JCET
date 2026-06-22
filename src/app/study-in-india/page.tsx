import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/shared/ContentPage";
import { getPageBySlug } from "@/constants/contentPages";

const page = getPageBySlug("study-in-india");

export const metadata: Metadata = {
  title: page?.title ?? "Study in India",
  description: page?.intro,
};

export default function StudyInIndiaPage() {
  if (!page) notFound();
  return <ContentPage page={page} />;
}
