import Image from "next/image";
import type { GalleryImage } from "@/types/api";

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  if (!images.length) {
    return (
      <p className="py-12 text-center text-muted">No images to display yet.</p>
    );
  }
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
      {images.map((img) => (
        <figure
          key={img.id}
          className="group relative overflow-hidden rounded-xl bg-surface shadow-card ring-1 ring-border/60"
        >
          <Image
            src={img.imageUrl}
            alt={img.title}
            width={600}
            height={400}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-primary/90 to-transparent p-4 text-sm font-medium text-white transition-transform duration-300 group-hover:translate-y-0">
            {img.title}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
