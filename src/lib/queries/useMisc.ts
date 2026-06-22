"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchData, postData } from "@/lib/api";
import type {
  GalleryResponse,
  Scholarship,
  AdmissionResult,
} from "@/types/api";

export function useGallery(category?: string) {
  return useQuery({
    queryKey: ["gallery", category ?? "ALL"],
    queryFn: () => fetchData<GalleryResponse>("/gallery", category ? { category } : undefined),
  });
}

export function useScholarships() {
  return useQuery({
    queryKey: ["scholarships"],
    queryFn: () => fetchData<Scholarship[]>("/scholarships"),
  });
}

export function useSubmitAdmission() {
  return useMutation({
    mutationFn: (payload: unknown) =>
      postData<AdmissionResult>("/admissions", payload),
  });
}

export function useSubmitFeedback() {
  return useMutation({
    mutationFn: (payload: unknown) => postData("/feedback", payload),
  });
}
