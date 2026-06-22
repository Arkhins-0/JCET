import Image from "next/image";
import { UserRound, Award } from "lucide-react";
import type { FacultySummary } from "@/types/api";

export function FacultyCard({ faculty }: { faculty: FacultySummary }) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-card ring-1 ring-border/60">
      <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full bg-primary/5 ring-2 ring-secondary/30">
        {faculty.profileImage ? (
          <Image
            src={faculty.profileImage}
            alt={faculty.user.name}
            fill
            sizes="96px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-primary/40">
            <UserRound className="h-10 w-10" aria-hidden />
          </div>
        )}
      </div>
      <h3 className="font-display text-base font-semibold text-primary">
        {faculty.user.name}
      </h3>
      <p className="text-sm text-secondary-dark">{faculty.designation}</p>
      <p className="mt-1 text-xs text-muted">{faculty.qualification}</p>
      <div className="mt-3 flex items-center gap-3 text-xs text-muted">
        {faculty.isHOD && (
          <span className="rounded-full bg-accent/15 px-2 py-0.5 font-semibold text-accent-dark">
            HOD
          </span>
        )}
        <span className="inline-flex items-center gap-1">
          <Award className="h-3.5 w-3.5" aria-hidden />
          {faculty.experience}+ yrs
        </span>
      </div>
    </div>
  );
}
