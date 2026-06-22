import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/shared/ContentPage";
import { getPageBySlug } from "@/constants/contentPages";

const page = getPageBySlug("r-and-d-centre");

export const metadata: Metadata = {
  title: page?.title ?? "R&D Centre",
  description: page?.intro,
};

export default function RAndDCentrePage() {
  if (!page) notFound();
  return <ContentPage page={page} />;
}
