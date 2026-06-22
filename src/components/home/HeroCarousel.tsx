"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { heroSlides, type HeroSlide } from "@/constants/hero";
import { siteConfig } from "@/constants/siteConfig";
import { useReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { AnnouncementMarquee } from "./AnnouncementMarquee";

/** Render a title with *highlighted* words in gold. */
function HeroTitle({ title }: { title: string }) {
  const parts = title.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <span key={i} className="text-accent">
            {part.slice(1, -1)}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function CtaButton({
  cta,
  variant,
}: {
  cta: HeroSlide["primaryCta"];
  variant: "gold" | "outline";
}) {
  const cls = variant === "gold" ? "btn-gold btn-lg" : "btn-outline btn-lg";
  return cta.external ? (
    <a href={cta.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {cta.label}
      {variant === "gold" ? (
        <ArrowRight className="h-5 w-5" />
      ) : (
        <ExternalLink className="h-5 w-5" />
      )}
    </a>
  ) : (
    <Link href={cta.href} className={cls}>
      {cta.label}
      <ArrowRight className="h-5 w-5" />
    </Link>
  );
}

export function HeroCarousel() {
  const reduced = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    reduced ? [] : [Autoplay({ delay: 6000, stopOnInteraction: false })]
  );
  const [selected, setSelected] = useState(0);

  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi]
  );
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {heroSlides.map((slide, idx) => (
            <div
              key={idx}
              className="relative flex min-w-0 flex-[0_0_100%] items-center"
            >
              {/* min height ~ viewport minus the two headers */}
              <div className="relative flex min-h-[82vh] w-full items-center">
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  priority={idx === 0}
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/50 to-primary-dark/40" />

                <div className="container-px relative py-24">
                  <div className="max-w-3xl">
                    {/* Accreditation pills (first slide) */}
                    {idx === selected && (
                      <motion.div
                        key={`pills-${selected}`}
                        initial={reduced ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mb-6 flex flex-wrap gap-2"
                      >
                        {slide.eyebrow && (
                          <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-foreground">
                            {slide.eyebrow}
                          </span>
                        )}
                        {siteConfig.accreditations.slice(0, 3).map((a) => (
                          <span
                            key={a}
                            className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur"
                          >
                            {a}
                          </span>
                        ))}
                      </motion.div>
                    )}

                    <motion.h1
                      key={`title-${selected}`}
                      initial={reduced ? false : { opacity: 0, y: 20 }}
                      animate={idx === selected ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl"
                    >
                      <HeroTitle title={slide.title} />
                    </motion.h1>

                    <motion.p
                      key={`sub-${selected}`}
                      initial={reduced ? false : { opacity: 0, y: 16 }}
                      animate={idx === selected ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.25 }}
                      className="mt-6 max-w-xl text-lg text-white/85"
                    >
                      {slide.subtitle}
                    </motion.p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <CtaButton cta={slide.primaryCta} variant="gold" />
                      {slide.secondaryCta && (
                        <CtaButton cta={slide.secondaryCta} variant="outline" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={scrollPrev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/15 p-2 text-white backdrop-blur transition-colors hover:bg-secondary hover:text-secondary-foreground md:flex"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={scrollNext}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/15 p-2 text-white backdrop-blur transition-colors hover:bg-secondary hover:text-secondary-foreground md:flex"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-16 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "h-2.5 rounded-full transition-all",
              i === selected ? "w-8 bg-accent" : "w-2.5 bg-white/50 hover:bg-white"
            )}
          />
        ))}
      </div>

      {/* Marquee strip at the bottom of the hero */}
      <AnnouncementMarquee />
    </section>
  );
}
