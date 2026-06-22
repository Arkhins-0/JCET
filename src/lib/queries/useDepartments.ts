"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/lib/api";
import type { Department } from "@/types/api";

export function useDepartments() {
  return useQuery({
    queryKey: ["departments"],
    queryFn: () => fetchData<Department[]>("/departments"),
    staleTime: 10 * 60 * 1000,
  });
}

export function useDepartment(slug: string) {
  return useQuery({
    queryKey: ["department", slug],
    queryFn: () => fetchData<Department>(`/departments/${slug}`),
    enabled: !!slug,
  });
}
