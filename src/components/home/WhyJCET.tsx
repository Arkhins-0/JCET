import {
  Award,
  FlaskConical,
  Briefcase,
  Rocket,
  BookOpen,
  Users,
  Building,
  HandCoins,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";

const features = [
  { Icon: Award, title: "NAAC A+ & NBA", desc: "Accredited programmes with proven academic quality." },
  { Icon: FlaskConical, title: "Modern Labs", desc: "Well-equipped department labs and an IoT Centre of Excellence." },
  { Icon: Briefcase, title: "Strong Placements", desc: "Dedicated training & placement cell with top recruiters." },
  { Icon: Rocket, title: "Incubation & Startups", desc: "₹20 Cr NGI Technology Business Incubator for entrepreneurs." },
  { Icon: BookOpen, title: "Autonomous Curriculum", desc: "Outcome-based, industry-relevant syllabus and fast results." },
  { Icon: Users, title: "Experienced Faculty", desc: "Mentors with strong academic and research backgrounds." },
  { Icon: Building, title: "200+ Acre Campus", desc: "Green campus with hostels, sports and transport." },
  { Icon: HandCoins, title: "Scholarships", desc: "Merit, need-based and sports scholarships for students." },
];

export function WhyJCET() {
  return (
    <section className="bg-surface section-py">
      <div className="container-px">
        <SectionHeading
          eyebrow="Why JCET"
          title="Everything you need to succeed"
          description="A holistic ecosystem that nurtures technical excellence, innovation and character."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.05}>
              <div className="flex h-full flex-col rounded-xl bg-white p-6 shadow-card ring-1 ring-border/60 transition-all hover:-translate-y-1 hover:shadow-hover">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary-dark">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="font-display text-base font-semibold text-primary">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
