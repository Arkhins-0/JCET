"use client";

import { useState } from "react";
import { useInfiniteNews } from "@/lib/queries/useNews";
import { NewsCard } from "@/components/shared/NewsCard";
import { PageHero } from "@/components/shared/PageHero";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";
import type { NewsType } from "@/types/api";

const TABS: { label: string; value: NewsType | undefined }[] = [
  { label: "All", value: undefined },
  { label: "News", value: "NEWS" },
  { label: "Events", value: "EVENT" },
  { label: "Announcements", value: "ANNOUNCEMENT" },
  { label: "Circulars", value: "CIRCULAR" },
];

export default function NewsPage() {
  const [type, setType] = useState<NewsType | undefined>(undefined);
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteNews(type);

  const posts = data?.pages.flatMap((p) => p.data) ?? [];

  return (
    <>
      <PageHero
        title="News & Events"
        subtitle="Stay updated with announcements, events and achievements at JCET"
        breadcrumbs={[{ label: "News & Events" }]}
      />
      <section className="section-py">
        <div className="container-px">
          {/* Tabs */}
          <div className="mb-8 flex flex-wrap gap-2">
            {TABS.map((t) => (
              <button
                key={t.label}
                onClick={() => setType(t.value)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  type === t.value
                    ? "bg-primary text-white"
                    : "bg-white text-primary ring-1 ring-border hover:bg-surface"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading &&
              Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-80 rounded-xl" />
              ))}

            {isError && (
              <div className="col-span-full rounded-xl bg-white p-8 text-center text-muted shadow-card">
                Unable to load news. Please ensure the API is running.
              </div>
            )}

            {posts.map((post, i) => (
              <Reveal key={post.id} delay={(i % 3) * 0.05}>
                <NewsCard post={post} />
              </Reveal>
            ))}

            {data && posts.length === 0 && (
              <div className="col-span-full py-12 text-center text-muted">
                No posts found.
              </div>
            )}
          </div>

          {hasNextPage && (
            <div className="mt-10 text-center">
              <Button
                variant="outline"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? "Loading…" : "Load more"}
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
