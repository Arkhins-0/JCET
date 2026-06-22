"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp, Users, Building2 } from "lucide-react";
import { usePlacements } from "@/lib/queries/usePlacements";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Skeleton } from "@/components/ui/skeleton";
import { formatLPA } from "@/lib/utils";

export function PlacementsSection() {
  const { data, isLoading, isError } = usePlacements();

  const stats = data?.stats;
  const recruiters = data?.recruiters ?? [];

  return (
    <section className="section-py">
      <div className="container-px">
        <SectionHeading
          eyebrow="Placements"
          title="Careers that take off"
          description="A dedicated training & placement cell, industry MoUs and rigorous skill-building connect our students to leading recruiters."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}

          {isError && (
            <div className="col-span-full rounded-xl bg-white p-8 text-center text-muted shadow-card">
              Placement data is unavailable right now.
            </div>
          )}

          {stats && (
            <>
              <StatCard
                Icon={TrendingUp}
                value={formatLPA(stats.highestPackage)}
                label="Highest Package"
              />
              <StatCard
                Icon={Users}
                value={`${stats.totalHired}+`}
                label="Students Placed"
              />
              <StatCard
                Icon={Building2}
                value={`${stats.totalCompanies}+`}
                label="Recruiting Companies"
              />
            </>
          )}
        </div>

        {/* Recruiter marquee */}
        {recruiters.length > 0 && (
          <div className="marquee-mask mt-12 overflow-hidden">
            <div className="flex w-max animate-marquee gap-4">
              {[...recruiters, ...recruiters].map((r, i) => (
                <div
                  key={`${r.name}-${i}`}
                  className="flex h-16 min-w-[160px] items-center justify-center rounded-xl bg-white px-6 font-display font-semibold text-primary shadow-card ring-1 ring-border/60"
                >
                  {r.name}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link href="/placements" className="btn-outline">
            View placement records
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  Icon,
  value,
  label,
}: {
  Icon: typeof TrendingUp;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl bg-primary p-6 text-center text-white shadow-card">
      <Icon className="mx-auto h-7 w-7 text-secondary" aria-hidden />
      <p className="mt-3 font-display text-3xl font-extrabold text-accent">
        {value}
      </p>
      <p className="mt-1 text-sm text-white/70">{label}</p>
    </div>
  );
}
