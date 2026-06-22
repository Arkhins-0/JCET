import type { Metadata } from "next";
import { SectionLanding } from "@/components/shared/SectionLanding";
import { mainNav } from "@/constants/navigation";

export const metadata: Metadata = {
  title: "Student Support",
  description:
    "Student services, library, training, clubs and cells at JCET — supporting holistic student development.",
};

const group = mainNav.find((g) => g.label === "Student Support");
const links = group?.columns?.flatMap((c) => c.links) ?? [];

export default function StudentSupportPage() {
  return (
    <SectionLanding
      title="Student Support"
      subtitle="Holistic support for every student"
      sectionLabel="Student Support"
      intro="From the central library and e-learning to NCC, NSS, incubation and placement training — JCET supports students well beyond the classroom."
      links={links}
    />
  );
}
