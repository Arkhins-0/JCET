"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLatestNews } from "@/lib/queries/useNews";
import { NewsCard } from "@/components/shared/NewsCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Skeleton } from "@/components/ui/skeleton";
import { Reveal } from "@/components/shared/Reveal";

export function NewsSection() {
  const { data, isLoading, isError } = useLatestNews(3);

  return (
    <section className="bg-surface section-py">
      <div className="container-px">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="News & Events"
            title="Latest from campus"
            description="Announcements, events and achievements from the JCET community."
          />
          <Link
            href="/news"
            className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-secondary-dark"
          >
            View all news
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-xl" />
            ))}

          {isError && (
            <div className="col-span-full rounded-xl bg-white p-8 text-center text-muted shadow-card">
              Unable to load news right now.
            </div>
          )}

          {data?.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.05}>
              <NewsCard post={post} />
            </Reveal>
          ))}

          {data && data.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted">
              No news published yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
