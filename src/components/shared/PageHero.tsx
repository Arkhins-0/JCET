import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

/** Reusable inner-page hero with breadcrumbs. */
export function PageHero({
  title,
  subtitle,
  breadcrumbs = [],
  className,
}: {
  title: string;
  subtitle?: string;
  breadcrumbs?: Crumb[];
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-primary py-16 md:py-20",
        className
      )}
    >
      {/* decorative gradient accents */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

      <div className="container-px relative">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-white/70">
            <li>
              <Link href="/" className="hover:text-secondary">
                Home
              </Link>
            </li>
            {breadcrumbs.map((c, i) => (
              <li key={i} className="flex items-center gap-1">
                <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                {c.href && i < breadcrumbs.length - 1 ? (
                  <Link href={c.href} className="hover:text-secondary">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white" aria-current="page">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <h1 className="max-w-3xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-white/80">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
