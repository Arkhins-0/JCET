import Link from "next/link";
import { Check, ExternalLink, Phone, ArrowRight } from "lucide-react";
import type { ContentPageData } from "@/constants/contentPages";
import { siteConfig } from "@/constants/siteConfig";
import { PageHero } from "./PageHero";
import { Reveal } from "./Reveal";

const KNOWN_SECTION_INDEX = new Set([
  "about",
  "academics",
  "admissions",
  "student-support",
  "iqac",
  "media",
]);

export function ContentPage({ page }: { page: ContentPageData }) {
  const sectionHref =
    page.sectionHref ??
    (KNOWN_SECTION_INDEX.has(page.section) ? `/${page.section}` : undefined);

  const breadcrumbs = sectionHref
    ? [{ label: page.sectionLabel, href: sectionHref }, { label: page.title }]
    : [{ label: page.title }];

  return (
    <>
      <PageHero
        title={page.title}
        subtitle={page.subtitle}
        breadcrumbs={breadcrumbs}
      />

      <section className="section-py">
        <div className="container-px grid gap-12 lg:grid-cols-[1fr_320px]">
          {/* Main content */}
          <div>
            {page.intro && (
              <Reveal>
                <p className="text-lg leading-relaxed text-primary/90">
                  {page.intro}
                </p>
              </Reveal>
            )}

            {page.highlights && page.highlights.length > 0 && (
              <Reveal>
                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {page.highlights.map((h) => (
                    <div
                      key={h.label}
                      className="rounded-xl bg-primary p-4 text-center text-white"
                    >
                      <p className="font-display text-xl font-bold text-accent">
                        {h.value}
                      </p>
                      <p className="mt-1 text-xs text-white/70">{h.label}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            <div className="mt-10 space-y-10">
              {page.blocks.map((block, i) => (
                <Reveal key={i}>
                  <div>
                    {block.heading && (
                      <h2 className="mb-4 font-display text-2xl font-bold text-primary">
                        {block.heading}
                      </h2>
                    )}
                    {block.paragraphs?.map((p, j) => (
                      <p
                        key={j}
                        className="mb-4 leading-relaxed text-muted-foreground"
                      >
                        {p}
                      </p>
                    ))}
                    {block.bullets && (
                      <ul className="space-y-3">
                        {block.bullets.map((b, k) => (
                          <li key={k} className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary-dark">
                              <Check className="h-3.5 w-3.5" aria-hidden />
                            </span>
                            <span className="text-muted-foreground">{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>

            {page.cta && (
              <Reveal>
                <div className="mt-10">
                  {page.cta.external ? (
                    <a
                      href={page.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold"
                    >
                      {page.cta.label}
                      <ExternalLink className="h-4 w-4" aria-hidden />
                    </a>
                  ) : (
                    <Link href={page.cta.href} className="btn-primary">
                      {page.cta.label}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  )}
                </div>
              </Reveal>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-2xl bg-primary p-6 text-white">
              <h3 className="font-display text-lg font-bold">Admissions 2026–27</h3>
              <p className="mt-2 text-sm text-white/80">
                Applications are open across B.Tech, M.Tech and MBA programmes.
              </p>
              <a
                href={siteConfig.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold mt-4 w-full"
              >
                Apply Now
              </a>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-border/60">
              <h3 className="font-display text-lg font-bold text-primary">
                Need help?
              </h3>
              <p className="mt-2 text-sm text-muted">
                Talk to our admission cell.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {siteConfig.contact.phones.map((p) => (
                  <li key={p}>
                    <a
                      href={`tel:${p.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-2 text-primary hover:text-secondary-dark"
                    >
                      <Phone className="h-4 w-4 text-secondary" aria-hidden />
                      {p}
                    </a>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-secondary-dark"
              >
                Contact us
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
