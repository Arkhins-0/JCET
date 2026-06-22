import type { Metadata } from "next";
import { NewsListing } from "@/components/shared/NewsListing";

export const metadata: Metadata = {
  title: "Upcoming Events",
  description: "Upcoming events, fests and programmes at JCET.",
};

export default function UpcomingEventsPage() {
  return (
    <NewsListing
      type="EVENT"
      title="Upcoming Events"
      subtitle="Fests, workshops, seminars and programmes at JCET"
      breadcrumbs={[{ label: "Media", href: "/media" }, { label: "Upcoming Events" }]}
      emptyText="No upcoming events listed right now. Please check back soon."
    />
  );
}
