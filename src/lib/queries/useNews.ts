"use client";

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { fetchData, fetchEnvelope } from "@/lib/api";
import type { NewsEvent, NewsType } from "@/types/api";

export function useLatestNews(limit = 3) {
  return useQuery({
    queryKey: ["news", "latest", limit],
    queryFn: () => fetchData<NewsEvent[]>("/news", { page: 1, limit }),
  });
}

export function useNewsPost(slug: string) {
  return useQuery({
    queryKey: ["news", slug],
    queryFn: () => fetchData<NewsEvent>(`/news/${slug}`),
    enabled: !!slug,
  });
}

export function useInfiniteNews(type?: NewsType, limit = 9) {
  return useInfiniteQuery({
    queryKey: ["news", "infinite", type ?? "ALL", limit],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      fetchEnvelope<NewsEvent[]>("/news", { page: pageParam, limit, type }),
    getNextPageParam: (lastPage) =>
      lastPage.meta?.hasNextPage ? (lastPage.meta.page ?? 1) + 1 : undefined,
  });
}
