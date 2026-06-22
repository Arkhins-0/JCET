import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Upload, Users, GraduationCap, ArrowRight, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { siteConfig } from "@/constants/siteConfig";

export const metadata: Metadata = {
  title: "Admissions 2026–27",
  description:
    "Admissions to B.Tech, M.Tech and MBA programmes at JCET through KEAM, Management, NRI and Lateral Entry quotas. Counselling code: JCE.",
};

const quotas = [
  { name: "Government (KEAM)", desc: "Through the KEAM rank list and centralised allotment." },
  { name: "Management", desc: "Direct admission for eligible candidates with 55% in PCM." },
  { name: "NRI", desc: "15% seats reserved; 50% in +2 with PCM." },
  { name: "Lateral Entry", desc: "For diploma holders into the 3rd semester of B.Tech." },
];

const steps = [
  { Icon: FileText, title: "Apply", desc: "Submit the online application form." },
  { Icon: Upload, title: "Documents", desc: "Upload and verify required certificates." },
  { Icon: Users, title: "Counselling", desc: "Attend counselling (code JCE)." },
  { Icon: GraduationCap, title: "Admission", desc: "Pay fees and confirm your seat." },
];

const links = [
  { label: "Admission Procedure", href: "/admissions/procedure" },
  { label: "Admission Centres", href: "/admissions/centers" },
  { label: "Pay Fees", href: "/admissions/pay-fees" },
  { label: "Campus Tour", href: "/admissions/campus-tour" },
  { label: "Scholarships", href: "/admissions/scholarship" },
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        title="Admissions 2026–27"
        subtitle="Your journey to becoming an engineer starts here"
        breadcrumbs={[{ label: "Admissions" }]}
      />

      {/* CTA banner */}
      <section className="bg-primary py-10">
        <div className="container-px flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">
              Applications are open
            </h2>
            <p className="text-white/75">
              B.Tech • M.Tech • MBA — Counselling Code {siteConfig.counsellingCode}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={siteConfig.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              Apply Online <ExternalLink className="h-4 w-4" />
            </a>
            <Link href="/admissions/apply" className="btn-teal">
              Quick Enquiry Form
            </Link>
          </div>
        </div>
      </section>

      {/* Quotas */}
      <section className="section-py">
        <div className="container-px">
          <SectionHeading
            eyebrow="Admission Quotas"
            title="Multiple pathways to JCET"
            description="Choose the admission route that fits you best."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {quotas.map((q, i) => (
              <Reveal key={q.name} delay={i * 0.05}>
                <div className="h-full rounded-xl bg-white p-6 shadow-card ring-1 ring-border/60">
                  <h3 className="font-display font-semibold text-primary">
                    {q.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{q.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-surface section-py">
        <div className="container-px">
          <SectionHeading eyebrow="Process" title="How to apply in 4 steps" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <div className="relative h-full rounded-xl bg-white p-6 shadow-card ring-1 ring-border/60">
                  <span className="absolute right-4 top-4 font-display text-3xl font-extrabold text-surface">
                    {i + 1}
                  </span>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary-dark">
                    <s.Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="font-display font-semibold text-primary">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="section-py">
        <div className="container-px">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {links.map((l, i) => (
              <Reveal key={l.href} delay={i * 0.04}>
                <Link
                  href={l.href}
                  className="group flex items-center justify-between rounded-xl bg-white p-5 shadow-card ring-1 ring-border/60 transition-all hover:-translate-y-1 hover:shadow-hover"
                >
                  <span className="font-display font-semibold text-primary">
                    {l.label}
                  </span>
                  <ArrowRight className="h-4 w-4 text-secondary transition-transform group-hover:translate-x-1" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
