import type { Metadata } from "next";
import { NewsListing } from "@/components/shared/NewsListing";

export const metadata: Metadata = {
  title: "Circulars",
  description: "Official circulars and notices from JCET.",
};

export default function CircularPage() {
  return (
    <NewsListing
      type="CIRCULAR"
      title="Circulars"
      subtitle="Official notices and circulars from the institution"
      breadcrumbs={[{ label: "Media", href: "/media" }, { label: "Circulars" }]}
      emptyText="No circulars published right now."
    />
  );
}
