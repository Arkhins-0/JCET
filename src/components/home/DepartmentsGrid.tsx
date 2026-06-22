"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useDepartments } from "@/lib/queries/useDepartments";
import { DepartmentCard } from "@/components/shared/DepartmentCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Skeleton } from "@/components/ui/skeleton";
import { Reveal } from "@/components/shared/Reveal";

export function DepartmentsGrid() {
  const { data, isLoading, isError } = useDepartments();

  return (
    <section className="section-py">
      <div className="container-px">
        <SectionHeading
          eyebrow="Departments"
          title="Explore our academic departments"
          description="Industry-aligned UG and PG programmes across engineering and management, taught by experienced faculty in modern, well-equipped labs."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading &&
            Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-56 w-full rounded-xl" />
            ))}

          {isError && (
            <div className="col-span-full rounded-xl bg-white p-8 text-center text-muted shadow-card">
              Unable to load departments right now. Please try again later.
            </div>
          )}

          {data?.slice(0, 6).map((dept, i) => (
            <Reveal key={dept.id} delay={i * 0.05}>
              <DepartmentCard department={dept} />
            </Reveal>
          ))}

          {data && data.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted">
              No departments published yet.
            </div>
          )}
        </div>

        <div className="mt-10 text-center">
          <Link href="/departments" className="btn-outline">
            View all departments
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
