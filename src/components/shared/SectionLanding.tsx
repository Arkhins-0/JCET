import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { NavLink } from "@/constants/navigation";
import { PageHero } from "./PageHero";
import { Reveal } from "./Reveal";

/** Landing page for a top-level section: a grid of cards linking to sub-pages. */
export function SectionLanding({
  title,
  subtitle,
  sectionLabel,
  intro,
  links,
}: {
  title: string;
  subtitle?: string;
  sectionLabel: string;
  intro?: string;
  links: NavLink[];
}) {
  return (
    <>
      <PageHero
        title={title}
        subtitle={subtitle}
        breadcrumbs={[{ label: sectionLabel }]}
      />
      <section className="section-py">
        <div className="container-px">
          {intro && (
            <Reveal className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-lg leading-relaxed text-muted">{intro}</p>
            </Reveal>
          )}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {links.map((link, i) => {
              const content = (
                <>
                  <h3 className="font-display text-lg font-semibold text-primary">
                    {link.label}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-secondary-dark">
                    {link.external ? "Visit" : "View"}
                    {link.external ? (
                      <ExternalLink className="h-4 w-4" aria-hidden />
                    ) : (
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    )}
                  </span>
                </>
              );
              const cls =
                "group flex h-full flex-col justify-between rounded-xl border border-transparent bg-white p-6 shadow-card ring-1 ring-border/60 transition-all duration-300 hover:-translate-y-1 hover:border-secondary/50 hover:shadow-hover";
              return (
                <Reveal key={i} delay={i * 0.04}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cls}
                    >
                      {content}
                    </a>
                  ) : (
                    <Link href={link.href} className={cls}>
                      {content}
                    </Link>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
