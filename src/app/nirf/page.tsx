import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/shared/ContentPage";
import { getPageBySlug } from "@/constants/contentPages";

const page = getPageBySlug("nirf");

export const metadata: Metadata = {
  title: page?.title ?? "NIRF",
  description: page?.intro,
};

export default function NirfPage() {
  if (!page) notFound();
  return <ContentPage page={page} />;
}
