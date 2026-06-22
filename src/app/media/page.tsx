import type { Metadata } from "next";
import { SectionLanding } from "@/components/shared/SectionLanding";
import { topNav } from "@/constants/navigation";

export const metadata: Metadata = {
  title: "Media",
  description:
    "Gallery, news & events, upcoming events, circulars and blogs from JCET.",
};

const media = topNav.find((g) => g.label === "Media");
const links = media?.columns?.flatMap((c) => c.links) ?? [];

export default function MediaPage() {
  return (
    <SectionLanding
      title="Media"
      subtitle="News, events, circulars, gallery and blogs"
      sectionLabel="Media"
      intro="Stay connected with everything happening at JCET — from photo galleries and event updates to official circulars and community blogs."
      links={links}
    />
  );
}
