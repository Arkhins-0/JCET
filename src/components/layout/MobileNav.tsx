"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ChevronDown, ExternalLink } from "lucide-react";
import { mainNav, quickLinks, topNav } from "@/constants/navigation";
import { siteConfig } from "@/constants/siteConfig";
import { useUIStore } from "@/store/useUIStore";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const open = useUIStore((s) => s.mobileNavOpen);
  const close = useUIStore((s) => s.closeMobileNav);
  const pathname = usePathname();

  // Close on route change.
  useEffect(() => {
    close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Lock body scroll when open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-primary/50 backdrop-blur-sm transition-opacity duration-300 xl:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={close}
        aria-hidden
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-[70] flex w-[88%] max-w-sm flex-col bg-white shadow-hover transition-transform duration-300 xl:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="font-display text-lg font-bold text-primary">
            Menu
          </span>
          <button
            onClick={close}
            className="rounded-lg p-2 text-primary hover:bg-surface"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile">
          <ul className="space-y-1">
            {mainNav.map((group) =>
              group.columns ? (
                <li key={group.label}>
                  <details className="group rounded-lg">
                    <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2.5 font-medium text-primary hover:bg-surface">
                      {group.label}
                      <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                    </summary>
                    <ul className="ml-2 border-l border-border pl-3">
                      {group.columns.flatMap((c) => c.links).map((link) => (
                        <li key={link.href}>
                          {link.external ? (
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-muted hover:text-secondary-dark"
                            >
                              {link.label}
                              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                            </a>
                          ) : (
                            <Link
                              href={link.href}
                              className="block rounded-lg px-3 py-2 text-sm text-muted hover:text-secondary-dark"
                            >
                              {link.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ) : (
                <li key={group.label}>
                  <Link
                    href={group.href ?? "#"}
                    className="block rounded-lg px-3 py-2.5 font-medium text-primary hover:bg-surface"
                  >
                    {group.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          <div className="my-4 border-t border-border" />
          <ul className="space-y-1">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-primary hover:bg-surface"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Utility (top bar) links */}
          <div className="my-4 border-t border-border" />
          <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-muted">
            Quick Links
          </p>
          <ul className="space-y-1">
            {topNav
              .flatMap((item) =>
                item.columns ? item.columns.flatMap((c) => c.links) : [{ label: item.label, href: item.href ?? "#", external: item.external }]
              )
              .map((link) => (
                <li key={`${link.label}-${link.href}`}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm text-muted hover:text-secondary-dark"
                    >
                      {link.label}
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="block rounded-lg px-3 py-2.5 text-sm text-muted hover:text-secondary-dark"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
          </ul>
        </nav>

        <div className="border-t border-border p-4">
          <a
            href={siteConfig.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold w-full"
          >
            Apply Now
          </a>
        </div>
      </div>
    </>
  );
}
