"use client";

import { TrendingUp, Users, Building2, Briefcase } from "lucide-react";
import { usePlacements } from "@/lib/queries/usePlacements";
import { PageHero } from "@/components/shared/PageHero";
import { PlacementCard } from "@/components/shared/PlacementCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Skeleton } from "@/components/ui/skeleton";
import { Reveal } from "@/components/shared/Reveal";
import { formatLPA } from "@/lib/utils";

export default function PlacementsPage() {
  const { data, isLoading, isError } = usePlacements();
  const stats = data?.stats;

  return (
    <>
      <PageHero
        title="Training & Placements"
        subtitle="Connecting our students to rewarding careers with leading recruiters"
        breadcrumbs={[{ label: "Placements" }]}
      />

      {/* Stats */}
      <section className="bg-primary py-12">
        <div className="container-px grid grid-cols-2 gap-6 lg:grid-cols-4">
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-xl bg-white/10" />
            ))}
          {stats && (
            <>
              <Stat Icon={TrendingUp} value={formatLPA(stats.highestPackage)} label="Highest Package" />
              <Stat Icon={Briefcase} value={formatLPA(stats.averagePackage)} label="Average Package" />
              <Stat Icon={Users} value={`${stats.totalHired}+`} label="Students Placed" />
              <Stat Icon={Building2} value={`${stats.totalCompanies}+`} label="Companies" />
            </>
          )}
        </div>
      </section>

      {/* Records */}
      <section className="section-py">
        <div className="container-px">
          <SectionHeading
            eyebrow="Recruiters"
            title="Where our students work"
            description="A snapshot of recent campus recruitment across IT and core sectors."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {isLoading &&
              Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-24 rounded-xl" />
              ))}

            {isError && (
              <div className="col-span-full rounded-xl bg-white p-8 text-center text-muted shadow-card">
                Placement data is unavailable right now.
              </div>
            )}

            {data?.placements.map((item, i) => (
              <Reveal key={item.id} delay={(i % 2) * 0.05}>
                <PlacementCard item={item} />
              </Reveal>
            ))}

            {data && data.placements.length === 0 && (
              <div className="col-span-full py-12 text-center text-muted">
                Placement records will be published soon.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({
  Icon,
  value,
  label,
}: {
  Icon: typeof TrendingUp;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl bg-white/5 p-6 text-center ring-1 ring-white/10">
      <Icon className="mx-auto h-7 w-7 text-secondary" aria-hidden />
      <p className="mt-3 font-display text-2xl font-extrabold text-accent sm:text-3xl">
        {value}
      </p>
      <p className="mt-1 text-sm text-white/70">{label}</p>
    </div>
  );
}
