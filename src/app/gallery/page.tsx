"use client";

import { useState } from "react";
import { useGallery } from "@/lib/queries/useMisc";
import { GalleryGrid } from "@/components/shared/GalleryGrid";
import { PageHero } from "@/components/shared/PageHero";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const CATEGORIES = ["ALL", "CAMPUS", "EVENTS", "SPORTS", "CULTURAL", "ACADEMIC"];

export default function GalleryPage() {
  const [category, setCategory] = useState("ALL");
  const { data, isLoading, isError } = useGallery(
    category === "ALL" ? undefined : category
  );

  return (
    <>
      <PageHero
        title="Gallery"
        subtitle="Moments from campus life, events, sports and academics at JCET"
        breadcrumbs={[{ label: "Gallery" }]}
      />
      <section className="section-py">
        <div className="container-px">
          <div className="mb-8 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors",
                  category === c
                    ? "bg-primary text-white"
                    : "bg-white text-primary ring-1 ring-border hover:bg-surface"
                )}
              >
                {c}
              </button>
            ))}
          </div>

          {isLoading && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-56 rounded-xl" />
              ))}
            </div>
          )}

          {isError && (
            <div className="rounded-xl bg-white p-8 text-center text-muted shadow-card">
              Unable to load the gallery right now.
            </div>
          )}

          {data && <GalleryGrid images={data.images} />}
        </div>
      </section>
    </>
  );
}
