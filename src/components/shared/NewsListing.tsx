"use client";

import { useInfiniteNews } from "@/lib/queries/useNews";
import { NewsCard } from "@/components/shared/NewsCard";
import { PageHero, type Crumb } from "@/components/shared/PageHero";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/Reveal";
import type { NewsType } from "@/types/api";

/** Reusable type-filtered news listing (used by Media → Events / Circulars). */
export function NewsListing({
  type,
  title,
  subtitle,
  breadcrumbs,
  emptyText = "Nothing here yet. Please check back soon.",
}: {
  type?: NewsType;
  title: string;
  subtitle?: string;
  breadcrumbs: Crumb[];
  emptyText?: string;
}) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteNews(type);

  const posts = data?.pages.flatMap((p) => p.data) ?? [];

  return (
    <>
      <PageHero title={title} subtitle={subtitle} breadcrumbs={breadcrumbs} />
      <section className="section-py">
        <div className="container-px">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading &&
              Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-80 rounded-xl" />
              ))}

            {isError && (
              <div className="col-span-full rounded-xl bg-white p-8 text-center text-muted shadow-card">
                Unable to load content. Please ensure the API is running.
              </div>
            )}

            {posts.map((post, i) => (
              <Reveal key={post.id} delay={(i % 3) * 0.05}>
                <NewsCard post={post} />
              </Reveal>
            ))}

            {data && posts.length === 0 && (
              <div className="col-span-full py-12 text-center text-muted">
                {emptyText}
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
