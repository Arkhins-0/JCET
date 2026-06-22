import Link from "next/link";
import { Megaphone } from "lucide-react";
import { marqueeItems, marqueeLabel } from "@/constants/hero";

/** Scrolling announcement ticker. Content is customizable in constants/hero.ts. */
export function AnnouncementMarquee() {
  if (marqueeItems.length === 0) return null;

  // Duplicate the list so the loop is seamless.
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="flex items-stretch border-y border-white/10 bg-primary text-white">
      {/* Fixed label */}
      <div className="z-10 flex shrink-0 items-center gap-2 bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground">
        <Megaphone className="h-4 w-4" aria-hidden />
        <span className="hidden sm:inline">{marqueeLabel}</span>
      </div>

      {/* Scrolling track */}
      <div className="marquee-mask group relative flex-1 overflow-hidden">
        <div className="flex w-max items-center gap-8 py-2.5 animate-marquee group-hover:[animation-play-state:paused]">
          {items.map((item, i) => {
            const content = (
              <span className="text-sm text-white/90 transition-colors hover:text-accent">
                {item.text}
              </span>
            );
            return (
              <span
                key={`${item.text}-${i}`}
                className="inline-flex shrink-0 items-center gap-8"
              >
                {item.href ? (
                  item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {content}
                    </a>
                  ) : (
                    <Link href={item.href}>{content}</Link>
                  )
                ) : (
                  content
                )}
                <span aria-hidden className="text-accent/60">
                  ◆
                </span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
