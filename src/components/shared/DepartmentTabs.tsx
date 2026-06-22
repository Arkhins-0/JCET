"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface DeptTab {
  key: string;
  label: string;
  content: React.ReactNode;
}

/** Renders sanitized scraped HTML for a department section. */
export function SectionHtml({ html }: { html: string }) {
  return (
    <div
      className="dept-prose"
      // Content is sanitised at scrape time (no script/style/event handlers).
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/**
 * Accessible, horizontally-scrollable tab bar for department detail pages —
 * mirrors the tabbed layout on jawaharlalcolleges.com.
 */
export function DepartmentTabs({ tabs }: { tabs: DeptTab[] }) {
  const [active, setActive] = useState(0);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  if (tabs.length === 0) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const next = (active + dir + tabs.length) % tabs.length;
    setActive(next);
    btnRefs.current[next]?.focus();
  };

  return (
    <div>
      {/* Tab bar */}
      <div
        role="tablist"
        aria-label="Department information"
        onKeyDown={onKeyDown}
        className="sticky top-16 z-20 flex flex-wrap border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80"
      >
        {tabs.map((t, i) => {
          const selected = i === active;
          return (
            <button
              key={t.key}
              ref={(el) => {
                btnRefs.current[i] = el;
              }}
              role="tab"
              id={`tab-${t.key}`}
              aria-selected={selected}
              aria-controls={`panel-${t.key}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "relative flex-1 basis-32 whitespace-nowrap px-4 py-3 text-center text-sm font-medium transition-colors",
                selected
                  ? "text-primary"
                  : "text-muted hover:text-primary"
              )}
            >
              {t.label}
              <span
                className={cn(
                  "absolute inset-x-2 -bottom-px h-0.5 rounded-full transition-all",
                  selected ? "bg-secondary" : "bg-transparent"
                )}
              />
            </button>
          );
        })}
      </div>

      {/* Panels */}
      <div className="py-8">
        {tabs.map((t, i) => (
          <div
            key={t.key}
            role="tabpanel"
            id={`panel-${t.key}`}
            aria-labelledby={`tab-${t.key}`}
            hidden={i !== active}
          >
            {i === active && t.content}
          </div>
        ))}
      </div>
    </div>
  );
}
