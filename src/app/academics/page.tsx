import type { Metadata } from "next";
import { SectionLanding } from "@/components/shared/SectionLanding";
import { mainNav } from "@/constants/navigation";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "Academic programmes, examinations, committees and resources at JCET.",
};

const group = mainNav.find((g) => g.label === "Academics");
const links = [
  { label: "Programmes", href: "/academics/programmes" },
  ...(group?.columns?.flatMap((c) => c.links) ?? []).filter(
    (l) => l.href !== "/academics/programmes"
  ),
];

export default function AcademicsPage() {
  return (
    <SectionLanding
      title="Academics"
      subtitle="Outcome-based, industry-relevant education"
      sectionLabel="Academics"
      intro="As an autonomous institution, JCET delivers an outcome-based curriculum supported by a robust examination system, statutory committees and rich learning resources."
      links={links}
    />
  );
}
