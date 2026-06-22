export const siteConfig = {
  name: "Jawaharlal College of Engineering and Technology",
  shortName: "JCET",
  tagline: "Engineer Your Future",
  status: "Autonomous",
  affiliation: "Affiliated to APJ Abdul Kalam Technological University (KTU)",
  group: "Nehru Group of Institutions (NGI)",
  established: 2008,
  counsellingCode: "JCE",
  description:
    "Jawaharlal College of Engineering and Technology (JCET), Lakkidi, Ottapalam — an autonomous, NAAC A+ and NBA accredited engineering college affiliated to APJ Abdul Kalam Technological University and part of the Nehru Group of Institutions.",

  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://jawaharlalcolleges.com",
  applyUrl:
    process.env.NEXT_PUBLIC_APPLY_URL ??
    "https://admissions.nehrucolleges.com/application-form",

  contact: {
    address:
      "Jawaharlal College of Engineering and Technology, Lakkidi, Ottapalam, Palakkad, Kerala — 679301",
    phones: ["+91 96057 71555", "+91 75103 31777"],
    landline: "0466 2344800",
    emails: ["jcetadmissions@nehrucolleges.com", "jcetncerc@gmail.com"],
    mapQuery: "Jawaharlal College of Engineering and Technology Lakkidi Ottapalam",
  },

  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "918592884777",

  social: {
    facebook: "https://www.facebook.com/jawaharlalcolleges",
    instagram: "https://www.instagram.com/jawaharlalcolleges",
    youtube: "https://www.youtube.com/@jawaharlalcolleges",
    linkedin: "https://www.linkedin.com/school/jawaharlalcolleges",
    twitter: "https://twitter.com/jawaharlalclg",
  },

  accreditations: [
    "NAAC A+ (3.38/4)",
    "NBA Accredited",
    "Autonomous",
    "ISO 9001:2015",
    "KTU Affiliated",
  ],

  // Group-level figures (Nehru Group of Institutions) shown on the stats bar.
  stats: [
    { label: "Years of NGI Legacy", value: 50, suffix: "+" },
    { label: "Students across NGI", value: 18000, suffix: "+" },
    { label: "Departments at JCET", value: 10, suffix: "" },
    { label: "Alumni Network", value: 100000, suffix: "+", display: "1 Lakh+" },
    { label: "Scholarships Disbursed", value: 10, suffix: " Cr+", prefix: "₹" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
