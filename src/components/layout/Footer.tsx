import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
} from "lucide-react";
import { siteConfig } from "@/constants/siteConfig";
import { quickLinks } from "@/constants/navigation";

const aboutLinks = [
  { label: "About JCET", href: "/about" },
  { label: "About NGI", href: "/about/ngi" },
  { label: "Approvals & Affiliations", href: "/about/approvals" },
  { label: "Infrastructure", href: "/about/infrastructure" },
  { label: "IQAC", href: "/iqac" },
];

const academicLinks = [
  { label: "Departments", href: "/departments" },
  { label: "Programmes", href: "/academics/programmes" },
  { label: "Admission Procedure", href: "/admissions/procedure" },
  { label: "Scholarships", href: "/admissions/scholarship" },
  { label: "Placements", href: "/placements" },
];

const socials = [
  { Icon: Facebook, href: siteConfig.social.facebook, label: "Facebook" },
  { Icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
  { Icon: Youtube, href: siteConfig.social.youtube, label: "YouTube" },
  { Icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { Icon: Twitter, href: siteConfig.social.twitter, label: "Twitter" },
];

export function Footer() {
  return (
    <footer className="bg-primary-dark text-white/80">
      {/* Accreditation strip */}
      <div className="border-b border-white/10">
        <div className="container-px flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-5 text-sm font-medium">
          {siteConfig.accreditations.map((a) => (
            <span key={a} className="text-white/90">
              {a}
            </span>
          ))}
        </div>
      </div>

      <div className="container-px grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="inline-flex items-center rounded-xl bg-white p-3">
            <Image
              src="/logo.png"
              alt="Jawaharlal College of Engineering and Technology"
              width={515}
              height={108}
              className="h-9 w-auto sm:h-10"
            />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            {siteConfig.name} — part of the {siteConfig.group}, committed to
            quality engineering education and innovation.
          </p>
          <div className="mt-5 flex gap-2">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-secondary hover:text-secondary-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* About */}
        <div>
          <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-white">
            About
          </h3>
          <ul className="space-y-2 text-sm">
            {aboutLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-secondary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Academics */}
        <div>
          <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-white">
            Academics
          </h3>
          <ul className="space-y-2 text-sm">
            {academicLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-secondary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-white">
            Contact
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden />
              <span className="text-white/70">{siteConfig.contact.address}</span>
            </li>
            {siteConfig.contact.phones.map((p) => (
              <li key={p}>
                <a
                  href={`tel:${p.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2.5 hover:text-secondary"
                >
                  <Phone className="h-4 w-4 text-secondary" aria-hidden />
                  {p}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${siteConfig.contact.emails[0]}`}
                className="inline-flex items-center gap-2.5 hover:text-secondary"
              >
                <Mail className="h-4 w-4 text-secondary" aria-hidden />
                {siteConfig.contact.emails[0]}
              </a>
            </li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            {quickLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-secondary">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-px flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/about/disclosure" className="hover:text-secondary">
              Mandatory Disclosure
            </Link>
            <Link href="/contact" className="hover:text-secondary">
              Contact
            </Link>
            <Link href="/academics/grievance-redressal-cell" className="hover:text-secondary">
              Grievance Cell
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
