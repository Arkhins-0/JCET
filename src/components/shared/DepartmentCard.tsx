import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Department } from "@/types/api";
import { DepartmentIcon } from "./DepartmentIcon";

export function DepartmentCard({ department }: { department: Department }) {
  return (
    <Link
      href={`/departments/${department.slug}`}
      className="group flex h-full flex-col rounded-xl border border-transparent bg-white p-6 shadow-card ring-1 ring-border/60 transition-all duration-300 hover:-translate-y-1 hover:border-secondary/50 hover:shadow-hover focus-visible:-translate-y-1 focus-visible:border-secondary"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">
        <DepartmentIcon icon={department.icon} />
      </div>
      <h3 className="font-display text-lg font-semibold leading-snug text-primary">
        {department.name}
      </h3>
      {department.description && (
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
          {department.description}
        </p>
      )}
      <div className="mt-4 flex items-center gap-3 text-xs font-medium text-muted">
        <span className="rounded-full bg-surface px-2.5 py-1">
          {department.shortCode}
        </span>
        <span className="rounded-full bg-surface px-2.5 py-1">
          {department.level}
        </span>
        {department._count?.programmes ? (
          <span className="rounded-full bg-surface px-2.5 py-1">
            {department._count.programmes} programmes
          </span>
        ) : null}
      </div>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-secondary-dark">
        Explore
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
