"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/lib/api";
import type { PlacementsResponse } from "@/types/api";

export function usePlacements() {
  return useQuery({
    queryKey: ["placements"],
    queryFn: () => fetchData<PlacementsResponse>("/placements"),
    staleTime: 10 * 60 * 1000,
  });
}
