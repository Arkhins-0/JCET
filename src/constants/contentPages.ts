/**
 * Content registry for the informational pages reachable from the header
 * mega-menu. Each entry is rendered by the reusable <ContentPage> template via
 * the section [slug] routes (about, academics, admissions, student-support, iqac).
 */

export type ContentSectionName =
  | "about"
  | "academics"
  | "admissions"
  | "student-support"
  | "iqac"
  | "media"
  | "info";

export interface ContentBlock {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface ContentPageData {
  slug: string;
  section: ContentSectionName;
  sectionLabel: string;
  /** Breadcrumb link for the section. Defaults to `/${section}` for known sections. */
  sectionHref?: string;
  title: string;
  subtitle?: string;
  intro?: string;
  blocks: ContentBlock[];
  highlights?: { label: string; value: string }[];
  cta?: { label: string; href: string; external?: boolean };
}

export const contentPages: ContentPageData[] = [
  // ----------------------------- ABOUT ------------------------------------
  {
    slug: "ngi",
    section: "about",
    sectionLabel: "About Us",
    title: "About Nehru Group of Institutions",
    subtitle: "Five decades of educational excellence",
    intro:
      "The Nehru Group of Institutions (NGI) is one of South India's largest educational conglomerates, comprising over 20 reputed institutions and a 750-bed super-specialty medical college hospital.",
    blocks: [
      {
        paragraphs: [
          "Founded by the late Chairman Shri P. K. Das, NGI carries a legacy of nearly five decades in education. The group spans medicine, engineering, aeronautics, architecture, pharmacy, arts & science, management, law and nursing — offering undergraduate, postgraduate and diploma programmes.",
          "JCET operates within this ecosystem, sharing NGI's admissions infrastructure, the counselling code JCE, scholarship programmes and a one-lakh-strong alumni network.",
        ],
      },
      {
        heading: "Member Institutions",
        bullets: [
          "Nehru College of Engineering and Research Centre",
          "Jawaharlal College of Engineering and Technology (JCET)",
          "Jawaharlal Aviation Institute",
          "Nehru College of Architecture",
          "Nehru Academy of Law",
          "Nehru College of Pharmacy",
          "Nehru Arts & Science Colleges",
          "Nehru College of Nursing & Medical College",
        ],
      },
    ],
    highlights: [
      { label: "Institutions", value: "20+" },
      { label: "Students", value: "18,000+" },
      { label: "Alumni", value: "1 Lakh+" },
      { label: "Campus", value: "200+ acres" },
    ],
  },
  {
    slug: "management",
    section: "about",
    sectionLabel: "About Us",
    title: "Management",
    subtitle: "Leadership and governance",
    intro:
      "JCET is governed by the management of the Nehru Group of Institutions, guided by a vision of accessible, quality professional education.",
    blocks: [
      {
        paragraphs: [
          "The management provides strategic direction, infrastructure and resources that enable academic excellence, research and student welfare across all departments.",
          "A governing body comprising academicians, industry experts and management representatives oversees the institution's autonomous functioning and quality assurance.",
        ],
      },
      {
        heading: "Governance Pillars",
        bullets: [
          "Governing Body & Academic Council (autonomous status)",
          "Board of Studies for each department",
          "Finance Committee",
          "Internal Quality Assurance Cell (IQAC)",
        ],
      },
    ],
  },
  {
    slug: "directors",
    section: "about",
    sectionLabel: "About Us",
    title: "Directors & Executive Members",
    subtitle: "The executive team",
    intro:
      "The Directors and Executive Members of the Nehru Group steer the institution's growth, industry partnerships and academic initiatives.",
    blocks: [
      {
        paragraphs: [
          "The executive team brings together decades of experience in education, administration and industry to ensure JCET stays at the forefront of engineering education in Kerala.",
        ],
      },
    ],
  },
  {
    slug: "principal",
    section: "about",
    sectionLabel: "About Us",
    title: "The Principal",
    subtitle: "Message from the Principal",
    blocks: [
      {
        paragraphs: [
          "Welcome to Jawaharlal College of Engineering and Technology. As an autonomous institution accredited with NAAC A+ and affiliated to APJ Abdul Kalam Technological University, we are committed to nurturing competent, ethical and innovative engineers.",
          "Our outcome-based curriculum, experienced faculty, modern laboratories and strong industry connections ensure that every student is prepared not just for a job, but for a meaningful career and lifelong learning.",
          "I invite you to be part of our journey of excellence.",
        ],
      },
    ],
  },
  {
    slug: "vice-principal",
    section: "about",
    sectionLabel: "About Us",
    title: "Vice Principal",
    subtitle: "Message from the Vice Principal",
    blocks: [
      {
        paragraphs: [
          "At JCET, we believe in holistic development — combining academic rigour with co-curricular and extra-curricular opportunities. Our students grow into well-rounded professionals through research, entrepreneurship, sports and community service.",
          "We continuously strengthen our teaching-learning processes and student support systems to help every learner reach their full potential.",
        ],
      },
    ],
  },
  {
    slug: "approvals",
    section: "about",
    sectionLabel: "About Us",
    title: "Approvals & Affiliations",
    subtitle: "Recognised, accredited, autonomous",
    intro:
      "JCET's academic standing is backed by approvals and accreditations from the country's premier regulatory and quality assurance bodies.",
    blocks: [
      {
        heading: "Approvals & Accreditations",
        bullets: [
          "Autonomous status",
          "Affiliated to APJ Abdul Kalam Technological University (KTU)",
          "Approved by AICTE, New Delhi",
          "NAAC A+ accreditation (CGPA 3.38/4, first cycle)",
          "NBA accredited programmes",
          "ISO 9001:2015 certified",
        ],
      },
    ],
    highlights: [
      { label: "NAAC", value: "A+ (3.38/4)" },
      { label: "NBA", value: "Accredited" },
      { label: "Status", value: "Autonomous" },
      { label: "Affiliation", value: "KTU" },
    ],
  },
  {
    slug: "infrastructure",
    section: "about",
    sectionLabel: "About Us",
    title: "Infrastructure",
    subtitle: "A campus built for learning",
    intro:
      "Set within a 200+ acre green campus, JCET offers world-class infrastructure for academics, research, residence and recreation.",
    blocks: [
      {
        heading: "Academic & Research",
        bullets: [
          "Modern, well-equipped department laboratories",
          "IoT Centre of Excellence for industry-sponsored projects",
          "Central Library with digital resources (NDL, DELNET)",
          "Smart classrooms and seminar halls",
        ],
      },
      {
        heading: "Campus Life",
        bullets: [
          "Separate hostels for boys and girls",
          "Transport fleet covering major routes",
          "Sports grounds, indoor games and gymnasium",
          "Cafeteria, medical facilities and 24x7 security",
        ],
      },
    ],
  },
  {
    slug: "disclosure",
    section: "about",
    sectionLabel: "About Us",
    title: "Mandatory Disclosure",
    subtitle: "Statutory transparency",
    intro:
      "In compliance with AICTE and regulatory norms, JCET publishes its mandatory disclosure detailing institutional, academic and infrastructural information.",
    blocks: [
      {
        paragraphs: [
          "The mandatory disclosure includes details of approvals, governance, faculty, programmes, intake, fees, and facilities. Official documents are available for download below.",
        ],
        bullets: [
          "AICTE Mandatory Disclosure (PDF)",
          "Approval letters and affiliation orders",
          "Programme-wise sanctioned intake",
          "Fee structure as approved by the fee regulatory committee",
        ],
      },
    ],
    cta: {
      label: "Download HR Manual (PDF)",
      href: "https://jawaharlalcolleges.com/downloads/hr-manual/JCET-HR-Policy-2022.pdf",
      external: true,
    },
  },
  {
    slug: "awards",
    section: "about",
    sectionLabel: "About Us",
    title: "Awards & Recognitions",
    subtitle: "Celebrating excellence",
    intro:
      "Over the years, JCET and its students have earned numerous accolades in academics, research, innovation and sports.",
    blocks: [
      {
        bullets: [
          "First engineering college in Kerala to offer B.Tech Aeronautical Engineering",
          "NAAC A+ accreditation in the first cycle",
          "NBA accreditation for eligible programmes",
          "Recognition for entrepreneurship through NGI Technology Business Incubator",
          "Student achievements in national hackathons, sports and cultural events",
        ],
      },
    ],
  },

  // --------------------------- ACADEMICS ----------------------------------
  {
    slug: "controller-of-examinations",
    section: "academics",
    sectionLabel: "Academics",
    title: "Controller of Examinations",
    subtitle: "Autonomous examination system",
    intro:
      "As an autonomous institution, JCET conducts its own examinations under the Office of the Controller of Examinations (CoE), ensuring a fair, transparent and timely evaluation process.",
    blocks: [
      {
        heading: "Highlights",
        bullets: [
          "Continuous internal evaluation and end-semester examinations",
          "Outcome-based assessment aligned with programme outcomes",
          "Results typically published within days of the final examination",
          "Transparent re-valuation and grievance mechanism",
        ],
      },
    ],
    highlights: [
      { label: "Results in", value: "~4 days" },
      { label: "Evaluation", value: "Outcome-based" },
    ],
  },
  {
    slug: "committee",
    section: "academics",
    sectionLabel: "Academics",
    title: "Committees",
    subtitle: "Statutory & support committees",
    intro:
      "JCET operates a range of statutory and support committees to safeguard a safe, inclusive and high-quality campus environment.",
    blocks: [
      {
        bullets: [
          "Anti-Ragging Committee & Squad",
          "Internal Complaints Committee (ICC)",
          "SC/ST Cell",
          "Women's Empowerment Cell",
          "Academic Council & Boards of Studies",
          "Library Advisory Committee",
        ],
      },
    ],
  },
  {
    slug: "grievance-redressal-cell",
    section: "academics",
    sectionLabel: "Academics",
    title: "Grievance Redressal Cell",
    subtitle: "Your voice matters",
    intro:
      "The Grievance Redressal Cell provides students, faculty and staff a fair and confidential channel to raise and resolve concerns.",
    blocks: [
      {
        paragraphs: [
          "Grievances may relate to academics, examinations, facilities, harassment or any other institutional matter. The cell ensures timely, impartial resolution in line with UGC and statutory guidelines.",
        ],
        heading: "How to raise a grievance",
        bullets: [
          "Submit a written grievance to the cell or through the online feedback form",
          "Acknowledgement and review by the committee",
          "Resolution and communication to the complainant",
        ],
      },
    ],
    cta: {
      label: "Submit Feedback / Grievance",
      href: "https://forms.gle/Y7FotDGdZ5JiSo2a9",
      external: true,
    },
  },
  {
    slug: "downloads",
    section: "academics",
    sectionLabel: "Academics",
    title: "Downloads",
    subtitle: "Forms, manuals & documents",
    intro:
      "Frequently used institutional documents, forms and manuals are available here for download.",
    blocks: [
      {
        bullets: [
          "Academic calendar",
          "Syllabus and curriculum (programme-wise)",
          "Examination forms",
          "Anti-ragging undertaking",
        ],
      },
    ],
    cta: {
      label: "Open Safety Manual (PDF)",
      href: "https://jawaharlalcolleges.com/downloads/SAFETY%20MANUAL.pdf",
      external: true,
    },
  },
  {
    slug: "ngi-smart",
    section: "academics",
    sectionLabel: "Academics",
    title: "NGI Smart",
    subtitle: "Digital campus & learning platform",
    intro:
      "NGI Smart is the Nehru Group's integrated digital campus platform — connecting students, faculty and parents with academics, attendance, results and learning resources.",
    blocks: [
      {
        heading: "What you get",
        bullets: [
          "Attendance and internal marks tracking",
          "Digital course material and assignments",
          "Examination results and academic records",
          "Notifications and circulars",
        ],
      },
    ],
    cta: {
      label: "Go to NGI Smart",
      href: "https://jawaharlalcolleges.com/ngi-smart",
      external: true,
    },
  },

  // --------------------------- ADMISSIONS ---------------------------------
  {
    slug: "procedure",
    section: "admissions",
    sectionLabel: "Admissions",
    title: "Admission Procedure",
    subtitle: "How to join JCET",
    intro:
      "Admissions to JCET programmes are offered through Government (KEAM), Management, NRI and Lateral Entry quotas. Here's everything you need to apply.",
    blocks: [
      {
        heading: "Eligibility — B.Tech",
        bullets: [
          "Pass in Higher Secondary (+2) with Physics, Chemistry & Mathematics",
          "Minimum 50% (Government quota via KEAM rank list) / 55% (Management quota)",
          "Valid KEAM / JEE score",
          "NRI quota: 50% in +2 with PCM (15% seats reserved)",
        ],
      },
      {
        heading: "Eligibility — M.Tech / MBA",
        bullets: [
          "M.Tech: B.Tech with 60% aggregate and a valid GATE score (relaxed for management quota)",
          "MBA: 50% aggregate in any degree with a valid KMAT / CMAT / CAT score",
        ],
      },
      {
        heading: "Steps to Apply",
        bullets: [
          "Apply online via the NGI admissions portal (or submit forms to the Principal)",
          "Document verification with originals",
          "Counselling and seat allotment (counselling code: JCE)",
          "Fee payment and admission confirmation",
        ],
      },
      {
        heading: "Documents Required",
        bullets: [
          "SSLC and +2 / qualifying degree certificates and mark lists",
          "Transfer Certificate (TC) and Conduct Certificate",
          "KEAM / entrance score card",
          "Aadhaar, passport-size photographs and medical fitness certificate",
        ],
      },
    ],
    cta: {
      label: "Apply Online",
      href: "https://admissions.nehrucolleges.com/application-form",
      external: true,
    },
  },
  {
    slug: "centers",
    section: "admissions",
    sectionLabel: "Admissions",
    title: "Admission Centres",
    subtitle: "Reach us near you",
    intro:
      "Prospective students can connect with JCET admission centres for guidance on programmes, eligibility and the application process.",
    blocks: [
      {
        paragraphs: [
          "Our admission team is available on campus and over phone/email to assist applicants and parents. Counselling code: JCE.",
        ],
        heading: "Contact the Admission Cell",
        bullets: [
          "Campus: Lakkidi, Ottapalam, Palakkad, Kerala — 679301",
          "Phone: +91 96057 71555, +91 75103 31777",
          "Landline: 0466 2344800",
          "Email: jcetadmissions@nehrucolleges.com",
        ],
      },
    ],
    cta: { label: "Admission Enquiry", href: "/contact" },
  },
  {
    slug: "pay-fees",
    section: "admissions",
    sectionLabel: "Admissions",
    title: "Pay Fees",
    subtitle: "Secure online fee payment",
    intro:
      "Students can pay tuition and other fees online through the secure NGI payment gateway.",
    blocks: [
      {
        heading: "How to pay",
        bullets: [
          "Keep your application/admission number ready",
          "Choose the fee head (tuition, hostel, exam, etc.)",
          "Pay securely via UPI, net banking, debit or credit card",
          "Download and retain the payment receipt",
        ],
      },
    ],
    cta: {
      label: "Proceed to Pay Fees",
      href: "https://jawaharlalcolleges.com/pay-fees.php",
      external: true,
    },
  },
  {
    slug: "campus-tour",
    section: "admissions",
    sectionLabel: "Admissions",
    title: "Campus Tour",
    subtitle: "Experience JCET",
    intro:
      "See our 200+ acre green campus, modern laboratories, library, hostels and sports facilities — in person or virtually.",
    blocks: [
      {
        paragraphs: [
          "We welcome prospective students and parents to visit the campus and meet our faculty. To schedule a guided visit, contact the admission cell.",
        ],
        heading: "On your visit you'll see",
        bullets: [
          "Department laboratories and the IoT Centre of Excellence",
          "Central Library and digital learning spaces",
          "Hostels, cafeteria and sports facilities",
          "Student clubs, incubation centre and innovation labs",
        ],
      },
    ],
    cta: { label: "Book a Campus Visit", href: "/contact" },
  },

  // ------------------------- STUDENT SUPPORT ------------------------------
  {
    slug: "certificate",
    section: "student-support",
    sectionLabel: "Student Support",
    title: "Certificates",
    subtitle: "Bonafide, NOC, Transcript & Migration",
    intro:
      "Current students and alumni can request official certificates from the institution. Requests are processed by the office and issued after verification.",
    blocks: [
      {
        heading: "Certificates issued",
        bullets: [
          "Bonafide Certificate",
          "No Objection Certificate (NOC)",
          "Transcript",
          "Migration Certificate",
        ],
      },
      {
        heading: "How to request",
        bullets: [
          "Logged-in students can raise a request from the student portal",
          "Provide the certificate type and reason",
          "Track status: Pending → Processing → Ready → Delivered",
        ],
      },
    ],
    cta: { label: "Request via Student Portal", href: "/portal/certificates" },
  },
  {
    slug: "central-library",
    section: "student-support",
    sectionLabel: "Student Support",
    title: "Central Library",
    subtitle: "Knowledge at your fingertips",
    intro:
      "The Central Library is the academic heart of JCET — a rich collection of books, journals and digital resources supporting teaching, learning and research.",
    blocks: [
      {
        heading: "Resources",
        bullets: [
          "Thousands of titles across engineering and management",
          "National and international journals",
          "Access to the National Digital Library (NDL) and DELNET",
          "E-books, e-journals and reference section",
          "Reading halls and digital library zone",
        ],
      },
    ],
    cta: {
      label: "Browse National Digital Library",
      href: "https://ndl.iitkgp.ac.in/",
      external: true,
    },
  },
  {
    slug: "e-learning",
    section: "student-support",
    sectionLabel: "Student Support",
    title: "E-Learning",
    subtitle: "Learn anywhere, anytime",
    intro:
      "JCET promotes blended learning through digital course material, recorded lectures and access to leading online learning platforms.",
    blocks: [
      {
        bullets: [
          "Department e-learning portals and course material",
          "NPTEL / SWAYAM MOOCs and certifications",
          "Recorded lectures and tutorials",
          "Virtual labs and simulation tools",
        ],
      },
    ],
  },
  {
    slug: "iot-lab",
    section: "student-support",
    sectionLabel: "Student Support",
    title: "IoT Lab — Centre of Excellence",
    subtitle: "Build the connected future",
    intro:
      "The IoT Centre of Excellence enables students to work on industry-sponsored projects in the Internet of Things, embedded systems and automation.",
    blocks: [
      {
        heading: "Focus areas",
        bullets: [
          "Sensor networks and embedded systems",
          "Smart automation and robotics",
          "Industry-sponsored projects and internships",
          "Hackathons and prototype development",
        ],
      },
    ],
  },
  {
    slug: "noble-training",
    section: "student-support",
    sectionLabel: "Student Support",
    title: "Noble Training",
    subtitle: "Career & skill development",
    intro:
      "The Noble Training programme builds employability through aptitude, technical and soft-skills training, mentoring and placement preparation.",
    blocks: [
      {
        bullets: [
          "Aptitude and reasoning training",
          "Communication and soft skills",
          "Technical and coding skill development",
          "Mock interviews and group discussions",
          "Industry interactions and certifications",
        ],
      },
    ],
    cta: { label: "View Placements", href: "/placements" },
  },
  {
    slug: "physical-education",
    section: "student-support",
    sectionLabel: "Student Support",
    title: "Physical Education",
    subtitle: "A healthy mind in a healthy body",
    intro:
      "JCET encourages sports and fitness through well-maintained grounds, courts and a gymnasium, supported by a dedicated physical education department.",
    blocks: [
      {
        bullets: [
          "Outdoor grounds for cricket, football and athletics",
          "Indoor games and gymnasium",
          "Inter-collegiate and university tournaments",
          "Sports scholarships for outstanding athletes",
        ],
      },
    ],
  },
  {
    slug: "ncc",
    section: "student-support",
    sectionLabel: "Student Support",
    title: "National Cadet Corps (NCC)",
    subtitle: "Discipline, unity & leadership",
    intro:
      "The NCC unit at JCET develops character, discipline, leadership and a spirit of service among cadets through training, camps and national events.",
    blocks: [
      {
        bullets: [
          "Drill, physical training and adventure activities",
          "National integration camps",
          "Certificate examinations (A/B/C)",
          "Social service and community outreach",
        ],
      },
    ],
  },
  {
    slug: "nss",
    section: "student-support",
    sectionLabel: "Student Support",
    title: "National Service Scheme (NSS)",
    subtitle: "Not me, but you",
    intro:
      "The NSS unit channels student energy into community service — fostering social responsibility, empathy and citizenship.",
    blocks: [
      {
        bullets: [
          "Village adoption and community development",
          "Health, hygiene and blood donation camps",
          "Environmental and cleanliness drives",
          "Special camps and awareness programmes",
        ],
      },
    ],
  },

  // ------------------------------- IQAC -----------------------------------
  {
    slug: "iqac",
    section: "iqac",
    sectionLabel: "IQAC",
    title: "Internal Quality Assurance Cell (IQAC)",
    subtitle: "Sustaining a culture of quality",
    intro:
      "The IQAC drives JCET's continuous improvement in academics, research, administration and student support, in line with NAAC guidelines.",
    blocks: [
      {
        heading: "Objectives",
        bullets: [
          "Develop a system for conscious, consistent quality enhancement",
          "Promote outcome-based education and best practices",
          "Facilitate accreditation (NAAC, NBA) and quality audits",
          "Collect and act on stakeholder feedback",
        ],
      },
      {
        heading: "Key Functions",
        bullets: [
          "Annual Quality Assurance Report (AQAR)",
          "Academic and administrative audits",
          "Faculty development programmes",
          "Curriculum review and feedback analysis",
        ],
      },
    ],
    highlights: [
      { label: "NAAC", value: "A+ (3.38/4)" },
      { label: "Framework", value: "Outcome-based" },
    ],
  },
  {
    slug: "nba",
    section: "iqac",
    sectionLabel: "IQAC",
    title: "NBA Accreditation",
    subtitle: "Outcome-based quality assurance",
    intro:
      "The National Board of Accreditation (NBA) accredits eligible engineering programmes at JCET, affirming their adherence to outcome-based education standards.",
    blocks: [
      {
        paragraphs: [
          "NBA accreditation validates that a programme meets rigorous quality benchmarks in curriculum, faculty, infrastructure, processes and student outcomes — enhancing graduate employability and global recognition.",
        ],
        heading: "What NBA accreditation ensures",
        bullets: [
          "Well-defined Programme Educational Objectives (PEOs) and Outcomes (POs)",
          "Continuous assessment and improvement",
          "Industry-relevant, outcome-based curriculum",
          "Qualified faculty and modern facilities",
        ],
      },
    ],
  },

  // ------------------------------- MEDIA ----------------------------------
  {
    slug: "blogs",
    section: "media",
    sectionLabel: "Media",
    sectionHref: "/media",
    title: "Blogs",
    subtitle: "Stories, insights and ideas from the JCET community",
    intro:
      "Read articles and reflections from our students, faculty and alumni on technology, campus life, research and careers.",
    blocks: [
      {
        paragraphs: [
          "Our blog features student project showcases, faculty perspectives, event recaps, placement journeys and tips for aspiring engineers.",
          "New posts are added regularly — check back soon, or follow us on social media for the latest.",
        ],
      },
    ],
    cta: { label: "See Latest News & Events", href: "/news" },
  },

  // ------------------------ STANDALONE (info) -----------------------------
  {
    slug: "study-in-india",
    section: "info",
    sectionLabel: "Study in India",
    title: "Study in India",
    subtitle: "A welcoming destination for students across India and abroad",
    intro:
      "JCET welcomes students from every state of India and from abroad, offering quality engineering and management education in an inclusive, multicultural campus.",
    blocks: [
      {
        heading: "Why study at JCET",
        bullets: [
          "Autonomous, NAAC A+ and NBA accredited programmes",
          "Affordable, world-class education affiliated to KTU",
          "200+ acre green campus with hostels and modern facilities",
          "Strong placement support and industry connections",
        ],
      },
      {
        heading: "For international & out-of-state students",
        bullets: [
          "Dedicated admission support and document guidance",
          "On-campus hostel accommodation and dining",
          "NRI quota seats and scholarship opportunities",
          "Vibrant, safe and culturally diverse student community",
        ],
      },
    ],
    cta: {
      label: "Apply Online",
      href: "https://admissions.nehrucolleges.com/application-form",
      external: true,
    },
  },
  {
    slug: "nirf",
    section: "info",
    sectionLabel: "NIRF",
    title: "NIRF",
    subtitle: "National Institutional Ranking Framework",
    intro:
      "The National Institutional Ranking Framework (NIRF), launched by the Ministry of Education, ranks institutions across India. JCET participates in NIRF as part of its commitment to transparency and continuous improvement.",
    blocks: [
      {
        heading: "Ranking parameters",
        bullets: [
          "Teaching, Learning & Resources (TLR)",
          "Research and Professional Practice (RP)",
          "Graduation Outcomes (GO)",
          "Outreach and Inclusivity (OI)",
          "Peer Perception",
        ],
      },
      {
        paragraphs: [
          "JCET's NIRF data submissions and disclosure reports are prepared by the IQAC and made available as per the framework's guidelines.",
        ],
      },
    ],
    cta: { label: "View IQAC", href: "/iqac" },
  },
  {
    slug: "r-and-d-centre",
    section: "info",
    sectionLabel: "R&D Centre",
    title: "Research & Development Centre",
    subtitle: "Driving innovation, research and entrepreneurship",
    intro:
      "The R&D Centre at JCET fosters a culture of research, innovation and industry collaboration across all departments — supported by the IoT Centre of Excellence and the NGI Technology Business Incubator.",
    blocks: [
      {
        heading: "Focus areas",
        bullets: [
          "Funded research projects and consultancy",
          "Publications in reputed journals and conferences",
          "Patents and prototype development",
          "Industry MoUs and collaborative research",
        ],
      },
      {
        heading: "Innovation ecosystem",
        bullets: [
          "IoT Centre of Excellence for sponsored projects",
          "₹20 Cr NGI Technology Business Incubator (TBI)",
          "Student innovation through IEDC",
          "Faculty development and research mentoring",
        ],
      },
    ],
    highlights: [
      { label: "TBI Fund", value: "₹20 Cr" },
      { label: "Focus", value: "IoT & Innovation" },
    ],
  },
];

export function getContentPage(
  section: ContentSectionName,
  slug: string
): ContentPageData | undefined {
  return contentPages.find((p) => p.section === section && p.slug === slug);
}

export function getSectionPages(
  section: ContentSectionName
): ContentPageData[] {
  return contentPages.filter((p) => p.section === section);
}

/** Find a page by slug across all sections (used by standalone routes). */
export function getPageBySlug(slug: string): ContentPageData | undefined {
  return contentPages.find((p) => p.slug === slug);
}
