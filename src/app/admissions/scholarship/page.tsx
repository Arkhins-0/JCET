"use client";

import { Award } from "lucide-react";
import { useScholarships } from "@/lib/queries/useMisc";
import { PageHero } from "@/components/shared/PageHero";
import { Skeleton } from "@/components/ui/skeleton";
import { Reveal } from "@/components/shared/Reveal";
import { formatINR } from "@/lib/utils";

export default function ScholarshipPage() {
  const { data, isLoading, isError } = useScholarships();

  return (
    <>
      <PageHero
        title="Scholarships"
        subtitle="Merit, need-based and sports scholarships to support your education"
        breadcrumbs={[{ label: "Admissions", href: "/admissions" }, { label: "Scholarships" }]}
      />
      <section className="section-py">
        <div className="container-px">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {isLoading &&
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-52 rounded-xl" />
              ))}

            {isError && (
              <div className="col-span-full rounded-xl bg-white p-8 text-center text-muted shadow-card">
                Unable to load scholarships right now.
              </div>
            )}

            {data?.map((s, i) => (
              <Reveal key={s.id} delay={(i % 3) * 0.05}>
                <div className="flex h-full flex-col rounded-xl bg-white p-6 shadow-card ring-1 ring-border/60">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent-dark">
                    <Award className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-primary">
                    {s.name}
                  </h3>
                  {s.amount != null && (
                    <p className="mt-1 font-display text-xl font-bold text-secondary-dark">
                      {formatINR(s.amount)}
                    </p>
                  )}
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {s.description}
                  </p>
                  {s.eligibility && (
                    <p className="mt-3 text-xs text-muted">
                      <span className="font-medium text-primary/80">Eligibility: </span>
                      {s.eligibility}
                    </p>
                  )}
                  {s.category && (
                    <span className="mt-4 inline-block w-fit rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-muted">
                      {s.category}
                    </span>
                  )}
                </div>
              </Reveal>
            ))}

            {data && data.length === 0 && (
              <div className="col-span-full py-12 text-center text-muted">
                No scholarships listed at the moment.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
