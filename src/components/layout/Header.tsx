"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown, ExternalLink } from "lucide-react";
import { mainNav, type NavGroup } from "@/constants/navigation";
import { siteConfig } from "@/constants/siteConfig";
import { useScrollPosition } from "@/lib/hooks";
import { useUIStore } from "@/store/useUIStore";
import { cn } from "@/lib/utils";
import { MobileNav } from "./MobileNav";
import { TopBar } from "./TopBar";

function isActive(pathname: string, href?: string) {
  if (!href) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function MegaPanel({ group }: { group: NavGroup }) {
  const pathname = usePathname();
  return (
    <div className="invisible absolute left-1/2 top-full z-50 w-[min(720px,90vw)] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
      <div className="rounded-2xl border border-border bg-white p-6 shadow-hover">
        <div
          className={cn(
            "grid gap-x-8 gap-y-1",
            (group.columns?.length ?? 1) > 1 ? "sm:grid-cols-2" : "grid-cols-1"
          )}
        >
          {group.columns?.map((col, i) => (
            <div key={i}>
              {col.heading && (
                <p className="mb-2 mt-1 text-xs font-semibold uppercase tracking-wider text-secondary-dark">
                  {col.heading}
                </p>
              )}
              <ul>
                {col.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-primary/90 transition-colors hover:bg-surface hover:text-secondary-dark"
                      >
                        {link.label}
                        <ExternalLink className="h-3.5 w-3.5 text-muted" aria-hidden />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className={cn(
                          "block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-surface hover:text-secondary-dark",
                          isActive(pathname, link.href)
                            ? "font-semibold text-secondary-dark"
                            : "text-primary/90"
                        )}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const scrolled = useScrollPosition(80);
  const pathname = usePathname();
  const openMobileNav = useUIStore((s) => s.openMobileNav);

  return (
    <>
      {/* Secondary (top) header */}
      <TopBar />

      {/* Main header */}
      <header
        className={cn(
          "sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur transition-all duration-300",
          scrolled ? "py-2 shadow-card" : "py-4"
        )}
      >
        <div className="container-px flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="JCET — home">
            <Image
              src="/logo.png"
              alt="Jawaharlal College of Engineering and Technology"
              width={515}
              height={108}
              priority
              className={cn(
                "w-auto transition-all",
                scrolled ? "h-9" : "h-10 sm:h-12"
              )}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
            {mainNav.map((group) => (
              <div key={group.label} className="group relative">
                {group.columns ? (
                  <button
                    className={cn(
                      "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-surface",
                      isActive(pathname, group.href)
                        ? "text-secondary-dark"
                        : "text-primary"
                    )}
                    aria-haspopup="true"
                  >
                    {group.label}
                    <ChevronDown
                      className="h-3.5 w-3.5 transition-transform group-hover:rotate-180"
                      aria-hidden
                    />
                  </button>
                ) : (
                  <Link
                    href={group.href ?? "#"}
                    className={cn(
                      "inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-surface",
                      isActive(pathname, group.href)
                        ? "text-secondary-dark"
                        : "text-primary"
                    )}
                  >
                    {group.label}
                  </Link>
                )}
                {group.columns && <MegaPanel group={group} />}
              </div>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <a
              href={siteConfig.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold hidden sm:inline-flex"
            >
              Apply Now
            </a>
            <button
              onClick={openMobileNav}
              className="inline-flex items-center justify-center rounded-lg p-2 text-primary hover:bg-surface xl:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav />
    </>
  );
}
