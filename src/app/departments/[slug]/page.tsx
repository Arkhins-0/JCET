"use client";

import { use } from "react";
import Link from "next/link";
import { GraduationCap, Users, Calendar, BadgeCheck, ArrowRight } from "lucide-react";
import { useDepartment } from "@/lib/queries/useDepartments";
import { PageHero } from "@/components/shared/PageHero";
import { DepartmentIcon } from "@/components/shared/DepartmentIcon";
import { DepartmentTabs, SectionHtml, type DeptTab } from "@/components/shared/DepartmentTabs";
import { Skeleton } from "@/components/ui/skeleton";
import { formatINR } from "@/lib/utils";
import type { Department } from "@/types/api";

function ProgrammesPanel({ dept }: { dept: Department }) {
  if (!dept.programmes || dept.programmes.length === 0) return null;
  return (
    <div className="space-y-4">
      {dept.programmes.map((p) => (
        <div
          key={p.id}
          className="rounded-xl bg-white p-5 shadow-card ring-1 ring-border/60"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-display font-semibold text-primary">{p.name}</h3>
            <div className="flex items-center gap-2 text-xs">
              <span className="rounded-full bg-primary/5 px-2.5 py-1 font-medium text-primary">
                {p.degree}
              </span>
              {p.accreditation !== "NONE" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary/10 px-2.5 py-1 font-medium text-secondary-dark">
                  <BadgeCheck className="h-3.5 w-3.5" /> {p.accreditation}
                </span>
              )}
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted">
            <span>{p.duration} years</span>
            {p.totalSeats ? <span>{p.totalSeats} seats</span> : null}
            {p.fees ? <span>Fees: {formatINR(p.fees)}/yr</span> : null}
          </div>
          {p.eligibility && (
            <p className="mt-2 text-xs text-muted">
              <span className="font-medium text-primary/80">Eligibility: </span>
              {p.eligibility}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default function DepartmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  // Support both Next 14 (object) and 15 (promise) params shapes.
  const resolved =
    params instanceof Promise ? use(params) : (params as { slug: string });
  const { data: dept, isLoading, isError } = useDepartment(resolved.slug);

  if (isLoading) {
    return (
      <div className="container-px section-py space-y-6">
        <Skeleton className="h-40 w-full rounded-2xl" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  if (isError || !dept) {
    return (
      <div className="container-px py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-primary">
          Department not found
        </h1>
        <p className="mt-2 text-muted">
          We couldn&apos;t load this department. Please check back later.
        </p>
        <Link href="/departments" className="btn-primary mt-6">
          All departments
        </Link>
      </div>
    );
  }

  // Build tabs from the scraped sections, then splice in a DB-sourced
  // "Programmes" tab right after "About".
  const tabs: DeptTab[] = (dept.sections ?? []).map((s) => ({
    key: s.key,
    label: s.label,
    content: <SectionHtml html={s.html} />,
  }));

  if (dept.programmes && dept.programmes.length > 0) {
    const programmesTab: DeptTab = {
      key: "programmes",
      label: "Programmes",
      content: <ProgrammesPanel dept={dept} />,
    };
    const aboutIdx = tabs.findIndex((t) => t.key === "about");
    tabs.splice(aboutIdx >= 0 ? aboutIdx + 1 : 0, 0, programmesTab);
  }

  return (
    <>
      <PageHero
        title={dept.name}
        subtitle={
          dept.level === "BOTH"
            ? "Undergraduate & Postgraduate"
            : `${dept.level} programmes`
        }
        breadcrumbs={[
          { label: "Departments", href: "/departments" },
          { label: dept.name },
        ]}
      />

      {/* Quick facts */}
      <section className="border-b border-border bg-white py-6">
        <div className="container-px flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
          <span className="inline-flex items-center gap-2 text-primary">
            <DepartmentIcon icon={dept.icon} className="h-5 w-5 text-secondary" />
            {dept.shortCode}
          </span>
          {dept.established && (
            <span className="inline-flex items-center gap-2 text-muted">
              <Calendar className="h-4 w-4 text-secondary" /> Est. {dept.established}
            </span>
          )}
          {dept.intake ? (
            <span className="inline-flex items-center gap-2 text-muted">
              <Users className="h-4 w-4 text-secondary" /> Intake {dept.intake}
            </span>
          ) : null}
          {dept._count?.faculty ? (
            <span className="inline-flex items-center gap-2 text-muted">
              <GraduationCap className="h-4 w-4 text-secondary" />
              {dept._count.faculty} faculty
            </span>
          ) : null}
        </div>
      </section>

      {/* Tabbed content */}
      <section className="container-px pb-4 pt-2">
        {tabs.length > 0 ? (
          <DepartmentTabs tabs={tabs} />
        ) : (
          <div className="section-py">
            {dept.description && (
              <>
                <h2 className="font-display text-2xl font-bold text-primary">
                  About the Department
                </h2>
                <p className="mt-4 max-w-3xl leading-relaxed text-muted">
                  {dept.description}
                </p>
              </>
            )}
            <div className="mt-10">
              <ProgrammesPanel dept={dept} />
            </div>
          </div>
        )}
      </section>

      {/* Admissions CTA */}
      <section className="section-py pt-0">
        <div className="container-px">
          <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-primary p-8 text-white sm:flex-row sm:items-center">
            <div>
              <h3 className="font-display text-xl font-bold">
                Interested in {dept.name}?
              </h3>
              <p className="mt-1 text-sm text-white/80">
                Explore admission options, eligibility and fees for this department.
              </p>
            </div>
            <Link href="/admissions" className="btn-gold shrink-0">
              Admissions <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
