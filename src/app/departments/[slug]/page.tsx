"use client";

import { use } from "react";
import Link from "next/link";
import { GraduationCap, Users, Calendar, BadgeCheck, ArrowRight } from "lucide-react";
import { useDepartment } from "@/lib/queries/useDepartments";
import { PageHero } from "@/components/shared/PageHero";
import { FacultyCard } from "@/components/shared/FacultyCard";
import { DepartmentIcon } from "@/components/shared/DepartmentIcon";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Skeleton } from "@/components/ui/skeleton";
import { Reveal } from "@/components/shared/Reveal";
import { formatINR } from "@/lib/utils";

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

  return (
    <>
      <PageHero
        title={dept.name}
        subtitle={dept.level === "BOTH" ? "Undergraduate & Postgraduate" : `${dept.level} programmes`}
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

      {/* About */}
      <section className="section-py">
        <div className="container-px grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            {dept.description && (
              <Reveal>
                <h2 className="font-display text-2xl font-bold text-primary">
                  About the Department
                </h2>
                <p className="mt-4 leading-relaxed text-muted">
                  {dept.description}
                </p>
              </Reveal>
            )}

            {/* Programmes */}
            {dept.programmes && dept.programmes.length > 0 && (
              <Reveal>
                <div className="mt-12">
                  <h2 className="font-display text-2xl font-bold text-primary">
                    Programmes Offered
                  </h2>
                  <div className="mt-5 space-y-4">
                    {dept.programmes.map((p) => (
                      <div
                        key={p.id}
                        className="rounded-xl bg-white p-5 shadow-card ring-1 ring-border/60"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="font-display font-semibold text-primary">
                            {p.name}
                          </h3>
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
                            <span className="font-medium text-primary/80">
                              Eligibility:{" "}
                            </span>
                            {p.eligibility}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>

          {/* HOD sidebar */}
          <aside className="space-y-6">
            {dept.hod && (
              <div className="rounded-2xl bg-white p-6 text-center shadow-card ring-1 ring-border/60">
                <p className="text-xs font-semibold uppercase tracking-wider text-secondary-dark">
                  Head of Department
                </p>
                <h3 className="mt-2 font-display text-lg font-bold text-primary">
                  {dept.hod.user.name}
                </h3>
                <p className="text-sm text-muted">{dept.hod.designation}</p>
                {dept.hod.qualification && (
                  <p className="mt-1 text-xs text-muted">
                    {dept.hod.qualification}
                  </p>
                )}
                {dept.hod.bio && (
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {dept.hod.bio}
                  </p>
                )}
              </div>
            )}
            <div className="rounded-2xl bg-primary p-6 text-white">
              <h3 className="font-display text-lg font-bold">Interested?</h3>
              <p className="mt-2 text-sm text-white/80">
                Explore admission options for this department.
              </p>
              <Link href="/admissions" className="btn-gold mt-4 w-full">
                Admissions <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Faculty */}
      {dept.faculty && dept.faculty.length > 0 && (
        <section className="bg-surface section-py">
          <div className="container-px">
            <SectionHeading eyebrow="Our Team" title="Faculty" />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {dept.faculty.map((f, i) => (
                <Reveal key={f.id} delay={(i % 4) * 0.05}>
                  <FacultyCard faculty={f} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
