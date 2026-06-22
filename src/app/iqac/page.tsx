import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/shared/ContentPage";
import { getContentPage } from "@/constants/contentPages";

export const metadata: Metadata = {
  title: "IQAC",
  description:
    "Internal Quality Assurance Cell (IQAC) at JCET — driving continuous quality enhancement.",
};

export default function IqacPage() {
  const page = getContentPage("iqac", "iqac");
  if (!page) notFound();
  return <ContentPage page={page} />;
}
