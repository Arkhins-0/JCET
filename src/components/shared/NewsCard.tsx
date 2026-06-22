import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import type { NewsEvent } from "@/types/api";
import { formatDate } from "@/lib/utils";

const TYPE_STYLES: Record<string, string> = {
  NEWS: "bg-secondary/15 text-secondary-dark",
  EVENT: "bg-accent/15 text-accent-dark",
  CIRCULAR: "bg-primary/10 text-primary",
  ANNOUNCEMENT: "bg-rose-100 text-rose-600",
};

export function NewsCard({ post }: { post: NewsEvent }) {
  const date = post.eventDate ?? post.publishedAt;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-card ring-1 ring-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-hover">
      <Link href={`/news/${post.slug}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden bg-surface">
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-primary-light">
              <span className="font-display text-2xl font-bold text-white/90">
                JCET
              </span>
            </div>
          )}
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
              TYPE_STYLES[post.type] ?? TYPE_STYLES.NEWS
            }`}
          >
            {post.type}
          </span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        {date && (
          <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-medium text-muted">
            <Calendar className="h-3.5 w-3.5" aria-hidden />
            {formatDate(date)}
          </span>
        )}
        <h3 className="font-display text-lg font-semibold leading-snug text-primary">
          <Link href={`/news/${post.slug}`} className="hover:text-secondary-dark">
            {post.title}
          </Link>
        </h3>
        {post.excerpt && (
          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
            {post.excerpt}
          </p>
        )}
        <Link
          href={`/news/${post.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-secondary-dark"
        >
          Read more
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
