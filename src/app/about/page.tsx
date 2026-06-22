import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Target, Eye, Check, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { siteConfig } from "@/constants/siteConfig";

export const metadata: Metadata = {
  title: "About JCET",
  description:
    "About Jawaharlal College of Engineering and Technology — an autonomous, NAAC A+ accredited college affiliated to KTU and part of the Nehru Group of Institutions.",
};

const missionPoints = [
  "Deliver quality education through innovative teaching practices",
  "Foster research partnerships with industry leaders",
  "Address societal challenges through technological solutions",
  "Promote entrepreneurship and lifelong learning",
];

const aboutLinks = [
  { label: "About NGI", href: "/about/ngi" },
  { label: "Management", href: "/about/management" },
  { label: "The Principal", href: "/about/principal" },
  { label: "Approvals & Affiliations", href: "/about/approvals" },
  { label: "Infrastructure", href: "/about/infrastructure" },
  { label: "Awards & Recognitions", href: "/about/awards" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About JCET"
        subtitle="An autonomous institution committed to excellence in engineering education"
        breadcrumbs={[{ label: "About Us" }, { label: "About JCET" }]}
      />

      {/* Intro + image */}
      <section className="section-py">
        <div className="container-px grid items-center gap-12 lg:grid-cols-2">
          <Reveal direction="left">
            <span className="mb-3 inline-block rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-dark">
              Est. {siteConfig.established} · {siteConfig.status}
            </span>
            <h2 className="font-display text-3xl font-bold text-primary">
              Quality education, a culture of innovation
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Jawaharlal College of Engineering and Technology (JCET), Lakkidi,
              Ottapalam, is an autonomous engineering college affiliated to the
              APJ Abdul Kalam Technological University and approved by AICTE.
              Accredited with NAAC A+ (CGPA 3.38/4) and NBA, JCET is part of the
              Nehru Group of Institutions — one of South India&apos;s largest
              education networks with nearly five decades of legacy.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              JCET holds the distinction of being the first engineering college
              in Kerala to introduce B.Tech in Aeronautical Engineering, and is
              backed by the NGI Technology Business Incubator with ₹20 crore in
              government funding to nurture startups and innovation.
            </p>
          </Reveal>
          <Reveal direction="right">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-hover">
              <Image
                src="https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=1600"
                alt="JCET campus building"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-surface section-py">
        <div className="container-px grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl bg-white p-8 shadow-card ring-1 ring-border/60">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary-dark">
                <Eye className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="font-display text-xl font-bold text-primary">
                Our Vision
              </h3>
              <p className="mt-3 leading-relaxed text-muted">
                To emerge as a Centre of Excellence for Professional Education to
                produce high-quality engineers and entrepreneurs.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-2xl bg-white p-8 shadow-card ring-1 ring-border/60">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent-dark">
                <Target className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="font-display text-xl font-bold text-primary">
                Our Mission
              </h3>
              <ul className="mt-3 space-y-2.5">
                {missionPoints.map((m) => (
                  <li key={m} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary-dark">
                      <Check className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    <span className="text-sm text-muted">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Explore more */}
      <section className="section-py">
        <div className="container-px">
          <SectionHeading
            eyebrow="Explore"
            title="Learn more about JCET"
            description="Discover our leadership, accreditations, infrastructure and achievements."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {aboutLinks.map((l, i) => (
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
