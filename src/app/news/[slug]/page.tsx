"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowLeft, Tag } from "lucide-react";
import { useNewsPost } from "@/lib/queries/useNews";
import { PageHero } from "@/components/shared/PageHero";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";

export default function NewsPostPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolved =
    params instanceof Promise ? use(params) : (params as { slug: string });
  const { data: post, isLoading, isError } = useNewsPost(resolved.slug);

  if (isLoading) {
    return (
      <div className="container-px section-py space-y-6">
        <Skeleton className="h-10 w-3/4 rounded-lg" />
        <Skeleton className="h-72 w-full rounded-2xl" />
        <Skeleton className="h-40 w-full rounded-lg" />
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="container-px py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-primary">
          Post not found
        </h1>
        <Link href="/news" className="btn-primary mt-6">
          Back to news
        </Link>
      </div>
    );
  }

  const date = post.eventDate ?? post.publishedAt;

  return (
    <>
      <PageHero
        title={post.title}
        breadcrumbs={[
          { label: "News & Events", href: "/news" },
          { label: post.type },
        ]}
      />
      <article className="section-py">
        <div className="container-px max-w-3xl">
          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted">
            {date && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-secondary" /> {formatDate(date)}
              </span>
            )}
            {post.author && <span>By {post.author.name}</span>}
            <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-semibold text-secondary-dark">
              {post.type}
            </span>
          </div>

          {post.thumbnail && (
            <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl">
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          )}

          {post.excerpt && (
            <p className="mb-6 text-lg font-medium leading-relaxed text-primary/90">
              {post.excerpt}
            </p>
          )}

          <div className="prose-jcet whitespace-pre-line leading-relaxed text-muted-foreground">
            {post.content}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <Tag className="h-4 w-4 text-muted" aria-hidden />
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-surface px-3 py-1 text-xs text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="mt-10">
            <Link
              href="/news"
              className="inline-flex items-center gap-1 text-sm font-semibold text-secondary-dark"
            >
              <ArrowLeft className="h-4 w-4" /> Back to all news
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
