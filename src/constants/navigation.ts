/**
 * Header navigation — mega menu.
 *
 * Rule (per the JCET site): links under the college domain
 * (jawaharlalcolleges.com/*.php) become REAL internal pages; everything else
 * (external portals, PDFs, third-party sites) is an external redirect
 * rendered with target="_blank".
 */

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  description?: string;
}

export interface NavGroup {
  label: string;
  href?: string;
  external?: boolean;
  /** Mega-menu columns of links. */
  columns?: { heading?: string; links: NavLink[] }[];
}

export const mainNav: NavGroup[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    columns: [
      {
        heading: "The Institution",
        links: [
          { label: "About NGI", href: "/about/ngi" },
          { label: "About JCET", href: "/about" },
          { label: "Management", href: "/about/management" },
          { label: "Directors & Executive Members", href: "/about/directors" },
          { label: "The Principal", href: "/about/principal" },
          { label: "Vice Principal", href: "/about/vice-principal" },
        ],
      },
      {
        heading: "Quality & Compliance",
        links: [
          { label: "Approvals & Affiliations", href: "/about/approvals" },
          { label: "Infrastructure", href: "/about/infrastructure" },
          { label: "Mandatory Disclosure", href: "/about/disclosure" },
          { label: "Awards & Recognitions", href: "/about/awards" },
          {
            label: "HR Manual (PDF)",
            href: "https://jawaharlalcolleges.com/downloads/hr-manual/JCET-HR-Policy-2022.pdf",
            external: true,
          },
          {
            label: "Safety Manual (PDF)",
            href: "https://jawaharlalcolleges.com/downloads/SAFETY%20MANUAL.pdf",
            external: true,
          },
        ],
      },
    ],
  },
  {
    label: "Departments",
    href: "/departments",
    columns: [
      {
        heading: "Engineering — UG",
        links: [
          { label: "Aeronautical Engineering", href: "/departments/aeronautical-engineering" },
          { label: "Civil Engineering (with Computer Application)", href: "/departments/civil-engineering" },
          { label: "Computer Science & Engineering", href: "/departments/computer-science" },
          { label: "Electronics & Communication", href: "/departments/electronics-and-communication-engineering" },
          { label: "Mechanical Engineering (Industry Integrated)", href: "/departments/mechanical-engineering" },
        ],
      },
      {
        heading: "Specialisations & PG",
        links: [
          { label: "Agricultural Engineering", href: "/departments/agriculture-engineering" },
          { label: "CSE — Cyber Security", href: "/departments/cyber-security" },
          { label: "CSE — Data Science", href: "/departments/data-science" },
          { label: "Basic Science & Humanities", href: "/departments/basic-science-and-humanities" },
          { label: "MBA", href: "/departments/mba" },
        ],
      },
    ],
  },
  {
    label: "Academics",
    href: "/academics",
    columns: [
      {
        links: [
          { label: "Programmes", href: "/academics/programmes" },
          { label: "Controller of Examinations", href: "/academics/controller-of-examinations" },
          { label: "Committee", href: "/academics/committee" },
          { label: "Grievance Redressal Cell", href: "/academics/grievance-redressal-cell" },
        ],
      },
      {
        links: [
          { label: "Downloads", href: "/academics/downloads" },
          { label: "NGI Smart", href: "/academics/ngi-smart" },
          {
            label: "National Digital Library",
            href: "https://ndl.iitkgp.ac.in/",
            external: true,
          },
        ],
      },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    columns: [
      {
        links: [
          {
            label: "Apply Online",
            href: "https://admissions.nehrucolleges.com/application-form",
            external: true,
          },
          { label: "Admission Procedure", href: "/admissions/procedure" },
          { label: "Admission Centres", href: "/admissions/centers" },
          { label: "Pay Fees", href: "/admissions/pay-fees" },
        ],
      },
      {
        links: [
          { label: "Campus Tour", href: "/admissions/campus-tour" },
          { label: "Scholarships", href: "/admissions/scholarship" },
          { label: "Admission Enquiry", href: "/contact" },
        ],
      },
    ],
  },
  {
    label: "Student Support",
    href: "/student-support",
    columns: [
      {
        heading: "Services",
        links: [
          { label: "Certificates", href: "/student-support/certificate" },
          { label: "Central Library", href: "/student-support/central-library" },
          { label: "E-Learning", href: "/student-support/e-learning" },
          { label: "IoT Lab", href: "/student-support/iot-lab" },
          { label: "Noble Training", href: "/student-support/noble-training" },
          { label: "Physical Education", href: "/student-support/physical-education" },
        ],
      },
      {
        heading: "Cells & Clubs",
        links: [
          { label: "NCC", href: "/student-support/ncc" },
          { label: "NSS", href: "/student-support/nss" },
          { label: "NGI TBI", href: "https://ngitbi.com/", external: true },
          { label: "IEDC", href: "https://iedcjcet.in/", external: true },
          { label: "IEEE SB JCET", href: "http://ieeesbjcet.org/", external: true },
          {
            label: "Student Feedback",
            href: "https://forms.gle/Y7FotDGdZ5JiSo2a9",
            external: true,
          },
        ],
      },
    ],
  },
  {
    label: "IQAC",
    href: "/iqac",
    columns: [
      {
        links: [
          { label: "IQAC", href: "/iqac" },
          { label: "NBA", href: "/iqac/nba" },
        ],
      },
    ],
  },
];

// Secondary nav surfaced directly on the homepage / footer.
export const quickLinks: NavLink[] = [
  { label: "Placements", href: "/placements" },
  { label: "News & Events", href: "/news" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

/**
 * Top utility header (the slim bar above the main header).
 * Same rule: college-domain links are internal pages; the rest redirect out.
 */
export const topNav: NavGroup[] = [
  { label: "Pay Fees", href: "/admissions/pay-fees" },
  { label: "Study in India", href: "/study-in-india" },
  {
    label: "Media",
    href: "/media",
    columns: [
      {
        links: [
          { label: "Gallery", href: "/gallery" },
          { label: "News & Events", href: "/news" },
          { label: "Upcoming Events", href: "/media/upcoming-events" },
          { label: "Circulars", href: "/media/circular" },
          { label: "Blogs", href: "/media/blogs" },
        ],
      },
    ],
  },
  { label: "NIRF", href: "/nirf" },
  { label: "R&D Centre", href: "/r-and-d-centre" },
  { label: "Feedback", href: "/contact" },
  {
    label: "Anti-Ragging",
    href: "https://jawaharlalcolleges.com/downloads/antiragging/ANTIRAGGING.pdf",
    external: true,
  },
  {
    label: "Careers",
    href: "https://hrms.thenehrugroup.com/careers/3",
    external: true,
  },
  {
    label: "iCampuz Login",
    href: "https://www.icampuz.in/ngi/",
    external: true,
  },
];
