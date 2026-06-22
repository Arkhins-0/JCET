"use client";

import { useDepartments } from "@/lib/queries/useDepartments";
import { DepartmentCard } from "@/components/shared/DepartmentCard";
import { PageHero } from "@/components/shared/PageHero";
import { Skeleton } from "@/components/ui/skeleton";
import { Reveal } from "@/components/shared/Reveal";

export default function DepartmentsPage() {
  const { data, isLoading, isError } = useDepartments();

  return (
    <>
      <PageHero
        title="Departments"
        subtitle="Industry-aligned UG and PG programmes across engineering and management"
        breadcrumbs={[{ label: "Departments" }]}
      />
      <section className="section-py">
        <div className="container-px">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading &&
              Array.from({ length: 9 }).map((_, i) => (
                <Skeleton key={i} className="h-56 rounded-xl" />
              ))}

            {isError && (
              <div className="col-span-full rounded-xl bg-white p-8 text-center text-muted shadow-card">
                Unable to load departments. Please ensure the API is running.
              </div>
            )}

            {data?.map((dept, i) => (
              <Reveal key={dept.id} delay={(i % 3) * 0.05}>
                <DepartmentCard department={dept} />
              </Reveal>
            ))}

            {data && data.length === 0 && (
              <div className="col-span-full py-12 text-center text-muted">
                No departments published yet.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
