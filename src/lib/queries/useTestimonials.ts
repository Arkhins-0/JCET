"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/lib/api";
import type { Testimonial } from "@/types/api";

export function useTestimonials() {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: () => fetchData<Testimonial[]>("/testimonials"),
    staleTime: 10 * 60 * 1000,
  });
}
