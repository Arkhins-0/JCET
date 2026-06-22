import { Building2, Users } from "lucide-react";
import type { PlacementItem } from "@/types/api";
import { formatLPA } from "@/lib/utils";

export function PlacementCard({ item }: { item: PlacementItem }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white p-5 shadow-card ring-1 ring-border/60">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary">
          <Building2 className="h-6 w-6" aria-hidden />
        </div>
        <div>
          <h3 className="font-display font-semibold text-primary">
            {item.companyName}
          </h3>
          <p className="text-sm text-muted">{item.role ?? item.sector}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-display text-lg font-bold text-secondary-dark">
          {formatLPA(item.package)}
        </p>
        <p className="inline-flex items-center gap-1 text-xs text-muted">
          <Users className="h-3.5 w-3.5" aria-hidden />
          {item.studentsHired} hired
        </p>
      </div>
    </div>
  );
}
