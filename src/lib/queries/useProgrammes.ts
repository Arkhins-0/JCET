"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/lib/api";
import type { Programme, Degree } from "@/types/api";

export function useProgrammes(filters?: { degree?: Degree; department?: string }) {
  return useQuery({
    queryKey: ["programmes", filters ?? {}],
    queryFn: () => fetchData<Programme[]>("/programmes", filters),
    staleTime: 10 * 60 * 1000,
  });
}
