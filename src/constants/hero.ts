import { siteConfig } from "./siteConfig";

/* =============================================================================
 *  HERO + MARQUEE — CUSTOMIZE HERE
 *  Edit the arrays below to change the landing carousel slides and the
 *  scrolling announcement marquee. No component changes needed.
 * ========================================================================== */

export interface HeroSlide {
  /** Background image URL (use a 1600px+ wide image). */
  image: string;
  eyebrow?: string;
  /** Headline. Wrap any word(s) in *asterisks* to highlight them in gold. */
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string; external?: boolean };
  secondaryCta?: { label: string; href: string; external?: boolean };
}

export const heroSlides: HeroSlide[] = [
  {
    image: "/hero-aerial.jpg",
    eyebrow: "Admissions Open 2026–27",
    title: "Engineer Your *Future* at an Autonomous College of *Excellence*",
    subtitle:
      "NAAC A+ • NBA Accredited • KTU Affiliated • Part of the Nehru Group's 50-year legacy in Kerala.",
    primaryCta: { label: "Apply Now", href: siteConfig.applyUrl, external: true },
    secondaryCta: { label: "Explore Campus", href: "/admissions/campus-tour" },
  },
  {
    image: "/hero-tech.webp",
    eyebrow: "First in Kerala",
    title: "B.Tech *Aeronautical Engineering* & 10+ Programmes",
    subtitle:
      "From Aeronautical to Cyber Security and Data Science — industry-aligned UG & PG programmes with modern labs.",
    primaryCta: { label: "View Departments", href: "/departments" },
    secondaryCta: { label: "Browse Programmes", href: "/academics/programmes" },
  },
  {
    image: "/hero-campus.webp",
    eyebrow: "Careers that take off",
    title: "Strong *Placements* & a Thriving *Innovation* Ecosystem",
    subtitle:
      "Dedicated training & placement cell, top recruiters, IoT Centre of Excellence and a ₹20 Cr business incubator.",
    primaryCta: { label: "View Placements", href: "/placements" },
    secondaryCta: { label: "R&D Centre", href: "/r-and-d-centre" },
  },
];

export interface MarqueeItem {
  text: string;
  href?: string;
  external?: boolean;
}

/** Label shown at the start of the scrolling marquee. */
export const marqueeLabel = "Announcements";

export const marqueeItems: MarqueeItem[] = [
  { text: "🎓 Admissions open for 2026–27 — Apply now!", href: siteConfig.applyUrl, external: true },
  { text: "🏆 JCET accredited with NAAC A+ (CGPA 3.38/4)", href: "/iqac" },
  { text: "🚀 Xmeron National Tech Fest 2026 — register today", href: "/media/upcoming-events" },
  { text: "💼 Campus placement drive in progress", href: "/placements" },
  { text: "📄 Latest circulars & notices", href: "/media/circular" },
  { text: `📞 Admission helpline: ${siteConfig.contact.phones[0]}`, href: "/contact" },
];
