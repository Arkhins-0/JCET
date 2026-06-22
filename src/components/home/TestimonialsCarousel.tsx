"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useTestimonials } from "@/lib/queries/useTestimonials";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Skeleton } from "@/components/ui/skeleton";
import { youtubeId } from "@/lib/utils";

export function TestimonialsCarousel() {
  const { data, isLoading } = useTestimonials();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="bg-primary section-py">
      <div className="container-px">
        <SectionHeading
          light
          eyebrow="Testimonials"
          title="Hear from our students"
          description="Real stories from JCET students and alumni about their journey and success."
        />

        <div className="relative mt-12">
          {isLoading && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-xl bg-white/10" />
              ))}
            </div>
          )}

          {data && data.length > 0 && (
            <>
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-5">
                  {data.map((t) => {
                    const vid = youtubeId(t.youtubeUrl);
                    return (
                      <div
                        key={t.id}
                        className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                      >
                        <figure className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-card">
                          {vid ? (
                            <div className="mb-4 aspect-video overflow-hidden rounded-xl">
                              <iframe
                                loading="lazy"
                                src={`https://www.youtube.com/embed/${vid}`}
                                title={`${t.studentName} testimonial`}
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="h-full w-full"
                              />
                            </div>
                          ) : (
                            <Quote className="mb-3 h-8 w-8 text-secondary/40" aria-hidden />
                          )}
                          <blockquote className="flex-1 text-sm leading-relaxed text-primary/90">
                            “{t.quote}”
                          </blockquote>
                          <figcaption className="mt-4 border-t border-border pt-4">
                            <p className="font-display font-semibold text-primary">
                              {t.studentName}
                            </p>
                            <p className="text-xs text-muted">
                              {[t.department, t.batch].filter(Boolean).join(" • ")}
                            </p>
                          </figcaption>
                        </figure>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 flex justify-center gap-3">
                <button
                  onClick={scrollPrev}
                  aria-label="Previous testimonial"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-secondary hover:text-secondary-foreground"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={scrollNext}
                  aria-label="Next testimonial"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-secondary hover:text-secondary-foreground"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </>
          )}

          {data && data.length === 0 && (
            <p className="text-center text-white/70">
              Testimonials coming soon.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
