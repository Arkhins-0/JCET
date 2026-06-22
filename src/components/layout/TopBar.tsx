"use client";

import Link from "next/link";
import { Phone, ChevronDown, ExternalLink } from "lucide-react";
import { topNav } from "@/constants/navigation";
import { siteConfig } from "@/constants/siteConfig";

/**
 * The slim secondary header that sits ABOVE the main navigation header.
 * Shown on large screens; on mobile these links are folded into MobileNav.
 */
export function TopBar() {
  return (
    <div className="hidden border-b border-white/10 bg-primary-dark text-white/85 lg:block">
      <div className="container-px flex h-9 items-center justify-between text-xs">
        {/* Left: contact + counselling code */}
        <div className="flex items-center gap-4">
          <a
            href={`tel:${siteConfig.contact.phones[0].replace(/\s/g, "")}`}
            className="inline-flex items-center gap-1.5 hover:text-secondary"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden />
            {siteConfig.contact.phones[0]}
          </a>
          <span className="text-white/30">|</span>
          <span>
            Counselling Code:{" "}
            <span className="font-semibold text-accent">
              {siteConfig.counsellingCode}
            </span>
          </span>
        </div>

        {/* Right: utility links */}
        <nav aria-label="Utility" className="flex items-center">
          {topNav.map((item) => {
            if (item.columns) {
              return (
                <div key={item.label} className="group relative">
                  <button className="inline-flex items-center gap-1 px-3 py-2 font-medium hover:text-secondary">
                    {item.label}
                    <ChevronDown
                      className="h-3 w-3 transition-transform group-hover:rotate-180"
                      aria-hidden
                    />
                  </button>
                  <div className="invisible absolute right-0 top-full z-50 w-52 pt-1 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <ul className="rounded-xl border border-border bg-white p-2 text-primary shadow-hover">
                      {item.columns
                        .flatMap((c) => c.links)
                        .map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="block rounded-lg px-3 py-1.5 text-xs hover:bg-surface hover:text-secondary-dark"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              );
            }
            return item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-2 font-medium hover:text-secondary"
              >
                {item.label}
                <ExternalLink className="h-3 w-3" aria-hidden />
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href ?? "#"}
                className="px-3 py-2 font-medium hover:text-secondary"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
