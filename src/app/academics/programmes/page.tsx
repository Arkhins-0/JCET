"use client";

import { useState } from "react";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { useProgrammes } from "@/lib/queries/useProgrammes";
import { PageHero } from "@/components/shared/PageHero";
import { Skeleton } from "@/components/ui/skeleton";
import { Reveal } from "@/components/shared/Reveal";
import { formatINR, cn } from "@/lib/utils";
import type { Degree } from "@/types/api";

const FILTERS: { label: string; value: Degree | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "B.Tech", value: "BTECH" },
  { label: "M.Tech", value: "MTECH" },
  { label: "MBA", value: "MBA" },
];

export default function ProgrammesPage() {
  const [filter, setFilter] = useState<Degree | "ALL">("ALL");
  const { data, isLoading, isError } = useProgrammes(
    filter === "ALL" ? undefined : { degree: filter }
  );

  return (
    <>
      <PageHero
        title="Programmes"
        subtitle="B.Tech, M.Tech and MBA programmes designed for industry and research"
        breadcrumbs={[{ label: "Academics", href: "/academics" }, { label: "Programmes" }]}
      />
      <section className="section-py">
        <div className="container-px">
          {/* Filters */}
          <div className="mb-8 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  filter === f.value
                    ? "bg-primary text-white"
                    : "bg-white text-primary ring-1 ring-border hover:bg-surface"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {isLoading &&
              Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-40 rounded-xl" />
              ))}

            {isError && (
              <div className="col-span-full rounded-xl bg-white p-8 text-center text-muted shadow-card">
                Unable to load programmes. Please ensure the API is running.
              </div>
            )}

            {data?.map((p, i) => (
              <Reveal key={p.id} delay={(i % 2) * 0.05}>
                <div className="h-full rounded-xl bg-white p-6 shadow-card ring-1 ring-border/60">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold text-primary">
                      {p.name}
                    </h3>
                    <span className="rounded-full bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary">
                      {p.degree}
                    </span>
                  </div>
                  {p.department && (
                    <Link
                      href={`/departments/${p.department.slug}`}
                      className="mt-1 inline-block text-sm text-secondary-dark hover:underline"
                    >
                      {p.department.name}
                    </Link>
                  )}
                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted">
                    <span>{p.duration} years</span>
                    {p.totalSeats ? <span>{p.totalSeats} seats</span> : null}
                    {p.fees ? <span>{formatINR(p.fees)}/yr</span> : null}
                    {p.accreditation !== "NONE" && (
                      <span className="inline-flex items-center gap-1 text-secondary-dark">
                        <BadgeCheck className="h-4 w-4" /> {p.accreditation}
                      </span>
                    )}
                  </div>
                  {p.eligibility && (
                    <p className="mt-3 text-xs text-muted">
                      <span className="font-medium text-primary/80">Eligibility: </span>
                      {p.eligibility}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}

            {data && data.length === 0 && (
              <div className="col-span-full py-12 text-center text-muted">
                No programmes found for this filter.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
