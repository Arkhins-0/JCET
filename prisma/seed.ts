import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// Reference data — modelled on the real JCET (jawaharlalcolleges.com) site.
// ---------------------------------------------------------------------------

type DeptSeed = {
  name: string;
  slug: string;
  shortCode: string;
  level: "UG" | "PG" | "BOTH";
  intake: number;
  established: number;
  icon: string;
  description: string;
  hod: {
    name: string;
    email: string;
    designation: string;
    qualification: string;
    experience: number;
    bio: string;
  };
};

const DEPARTMENTS: DeptSeed[] = [
  {
    name: "Aeronautical Engineering",
    slug: "aeronautical-engineering",
    shortCode: "AE",
    level: "UG",
    intake: 60,
    established: 2008,
    icon: "plane",
    description:
      "JCET is the first engineering college in Kerala to introduce B.Tech in Aeronautical Engineering. The department trains students in aerodynamics, propulsion, aircraft structures and avionics with strong industry exposure.",
    hod: {
      name: "Dr. Anil Kumar P",
      email: "hod.ae@jawaharlalcolleges.com",
      designation: "Professor & Head",
      qualification: "Ph.D in Aerospace Engineering",
      experience: 18,
      bio: "Specialises in computational fluid dynamics and aircraft structural design with two decades of teaching and research experience.",
    },
  },
  {
    name: "Civil Engineering with Computer Application",
    slug: "civil-engineering",
    shortCode: "CE",
    level: "UG",
    intake: 60,
    established: 2009,
    icon: "building-2",
    description:
      "An industry-aligned civil engineering programme integrating modern computer applications such as BIM, STAAD.Pro and AutoCAD into core structural, geotechnical and environmental engineering.",
    hod: {
      name: "Dr. Suresh Babu K",
      email: "hod.ce@jawaharlalcolleges.com",
      designation: "Professor & Head",
      qualification: "Ph.D in Structural Engineering",
      experience: 20,
      bio: "Researcher in sustainable construction materials and earthquake-resistant structures.",
    },
  },
  {
    name: "Computer Science and Engineering",
    slug: "computer-science",
    shortCode: "CSE",
    level: "BOTH",
    intake: 120,
    established: 2008,
    icon: "cpu",
    description:
      "The NBA-accredited CSE department offers UG and PG programmes with specialised labs in AI, networks and systems. Faculty and the Xmeron student association drive a vibrant culture of research and coding.",
    hod: {
      name: "Dr. R. Satheesh Kumar",
      email: "hod.cse@jawaharlalcolleges.com",
      designation: "Professor & Head",
      qualification: "Ph.D in Computer Science and Engineering",
      experience: 22,
      bio: "Leads research in machine learning and distributed systems, with numerous publications in reputed journals.",
    },
  },
  {
    name: "Electronics and Communication Engineering",
    slug: "electronics-and-communication-engineering",
    shortCode: "ECE",
    level: "BOTH",
    intake: 60,
    established: 2008,
    icon: "radio",
    description:
      "ECE offers B.Tech and M.Tech (Communication Engineering & Signal Processing) with labs in VLSI, embedded systems, IoT and communication, backed by strong placement and research records.",
    hod: {
      name: "Dr. Latha Menon",
      email: "hod.ece@jawaharlalcolleges.com",
      designation: "Professor & Head",
      qualification: "Ph.D in Signal Processing",
      experience: 19,
      bio: "Works on wireless communication and biomedical signal processing.",
    },
  },
  {
    name: "Mechanical Engineering (Industry Integrated)",
    slug: "mechanical-engineering",
    shortCode: "ME",
    level: "UG",
    intake: 60,
    established: 2009,
    icon: "cog",
    description:
      "An industry-integrated B.Tech that blends core mechanical engineering with hands-on training in CAD/CAM, manufacturing, thermal and automotive systems through MoUs with leading industries.",
    hod: {
      name: "Dr. Vinod Raj",
      email: "hod.me@jawaharlalcolleges.com",
      designation: "Professor & Head",
      qualification: "Ph.D in Thermal Engineering",
      experience: 21,
      bio: "Specialises in renewable energy systems and advanced manufacturing.",
    },
  },
  {
    name: "Agricultural Engineering",
    slug: "agriculture-engineering",
    shortCode: "AGE",
    level: "UG",
    intake: 60,
    established: 2018,
    icon: "sprout",
    description:
      "Agricultural Engineering combines engineering principles with agricultural sciences — covering farm machinery, soil & water conservation, food processing and precision agriculture.",
    hod: {
      name: "Dr. Meera Nair",
      email: "hod.age@jawaharlalcolleges.com",
      designation: "Associate Professor & Head",
      qualification: "Ph.D in Agricultural Engineering",
      experience: 14,
      bio: "Focuses on precision farming and post-harvest technology.",
    },
  },
  {
    name: "Computer Science & Engineering (Cyber Security)",
    slug: "cyber-security",
    shortCode: "CYS",
    level: "UG",
    intake: 60,
    established: 2021,
    icon: "shield",
    description:
      "A specialised B.Tech focused on cyber security — covering ethical hacking, cryptography, network security, digital forensics and secure software development to meet the rising demand for security professionals.",
    hod: {
      name: "Dr. Arun Prakash",
      email: "hod.cys@jawaharlalcolleges.com",
      designation: "Associate Professor & Head",
      qualification: "Ph.D in Information Security",
      experience: 13,
      bio: "Researcher in network security and applied cryptography.",
    },
  },
  {
    name: "Computer Science & Engineering (Data Science)",
    slug: "data-science",
    shortCode: "DS",
    level: "UG",
    intake: 60,
    established: 2021,
    icon: "bar-chart-3",
    description:
      "A B.Tech specialisation in Data Science covering big data, machine learning, data visualisation and AI — preparing students for high-demand careers in analytics and intelligent systems.",
    hod: {
      name: "Dr. Priya Varghese",
      email: "hod.ds@jawaharlalcolleges.com",
      designation: "Associate Professor & Head",
      qualification: "Ph.D in Data Science",
      experience: 12,
      bio: "Works on deep learning and large-scale data analytics.",
    },
  },
  {
    name: "Basic Science & Humanities",
    slug: "basic-science-and-humanities",
    shortCode: "BSH",
    level: "UG",
    intake: 0,
    established: 2008,
    icon: "flask-conical",
    description:
      "The department lays the academic foundation for all engineering programmes through Mathematics, Physics, Chemistry and Humanities, nurturing analytical and communication skills.",
    hod: {
      name: "Dr. Geetha Krishnan",
      email: "hod.bsh@jawaharlalcolleges.com",
      designation: "Professor & Head",
      qualification: "Ph.D in Applied Mathematics",
      experience: 24,
      bio: "Mathematician with research interests in numerical analysis.",
    },
  },
  {
    name: "Master of Business Administration",
    slug: "mba",
    shortCode: "MBA",
    level: "PG",
    intake: 60,
    established: 2010,
    icon: "briefcase",
    description:
      "The JCET MBA develops industry-ready managers with dual specialisations, live projects, industry interactions and a strong focus on entrepreneurship and leadership.",
    hod: {
      name: "Dr. Thomas Mathew",
      email: "hod.mba@jawaharlalcolleges.com",
      designation: "Professor & Director (MBA)",
      qualification: "Ph.D in Management Studies",
      experience: 23,
      bio: "Expert in marketing strategy and organisational behaviour.",
    },
  },
];

type ProgSeed = {
  name: string;
  slug: string;
  degree: "BTECH" | "MTECH" | "MBA" | "MCA";
  duration: number;
  deptSlug: string;
  totalSeats: number;
  fees: number;
  eligibility: string;
  accreditation: "NBA" | "NAAC" | "NONE";
};

const PROGRAMMES: ProgSeed[] = [
  { name: "B.Tech Aeronautical Engineering", slug: "btech-aeronautical", degree: "BTECH", duration: 4, deptSlug: "aeronautical-engineering", totalSeats: 60, fees: 65000, eligibility: "Pass in +2 with 50% in Physics, Chemistry & Mathematics and a valid KEAM/JEE score.", accreditation: "NONE" },
  { name: "B.Tech Civil Engineering with Computer Application", slug: "btech-civil", degree: "BTECH", duration: 4, deptSlug: "civil-engineering", totalSeats: 60, fees: 65000, eligibility: "Pass in +2 with 50% in Physics, Chemistry & Mathematics and a valid KEAM/JEE score.", accreditation: "NONE" },
  { name: "B.Tech Computer Science and Engineering", slug: "btech-cse", degree: "BTECH", duration: 4, deptSlug: "computer-science", totalSeats: 60, fees: 75000, eligibility: "Pass in +2 with 50% in Physics, Chemistry & Mathematics and a valid KEAM/JEE score.", accreditation: "NBA" },
  { name: "B.Tech CSE (Cyber Security)", slug: "btech-cse-cyber-security", degree: "BTECH", duration: 4, deptSlug: "cyber-security", totalSeats: 60, fees: 75000, eligibility: "Pass in +2 with 50% in Physics, Chemistry & Mathematics and a valid KEAM/JEE score.", accreditation: "NONE" },
  { name: "B.Tech CSE (Data Science)", slug: "btech-cse-data-science", degree: "BTECH", duration: 4, deptSlug: "data-science", totalSeats: 60, fees: 75000, eligibility: "Pass in +2 with 50% in Physics, Chemistry & Mathematics and a valid KEAM/JEE score.", accreditation: "NONE" },
  { name: "B.Tech Electronics and Communication Engineering", slug: "btech-ece", degree: "BTECH", duration: 4, deptSlug: "electronics-and-communication-engineering", totalSeats: 60, fees: 70000, eligibility: "Pass in +2 with 50% in Physics, Chemistry & Mathematics and a valid KEAM/JEE score.", accreditation: "NBA" },
  { name: "B.Tech Mechanical Engineering (Industry Integrated)", slug: "btech-mechanical", degree: "BTECH", duration: 4, deptSlug: "mechanical-engineering", totalSeats: 60, fees: 70000, eligibility: "Pass in +2 with 50% in Physics, Chemistry & Mathematics and a valid KEAM/JEE score.", accreditation: "NONE" },
  { name: "B.Tech Agricultural Engineering", slug: "btech-agricultural", degree: "BTECH", duration: 4, deptSlug: "agriculture-engineering", totalSeats: 60, fees: 65000, eligibility: "Pass in +2 with 50% in Physics, Chemistry & Mathematics and a valid KEAM/JEE score.", accreditation: "NONE" },
  { name: "M.Tech Communication Engineering & Signal Processing", slug: "mtech-ece-cesp", degree: "MTECH", duration: 2, deptSlug: "electronics-and-communication-engineering", totalSeats: 18, fees: 60000, eligibility: "B.Tech with 60% aggregate and a valid GATE score (relaxed for management quota).", accreditation: "NONE" },
  { name: "M.Tech CSE (Cyber Security)", slug: "mtech-cse-cyber-security", degree: "MTECH", duration: 2, deptSlug: "computer-science", totalSeats: 18, fees: 60000, eligibility: "B.Tech with 60% aggregate and a valid GATE score (relaxed for management quota).", accreditation: "NONE" },
  { name: "M.Tech CSE (Data Science)", slug: "mtech-cse-data-science", degree: "MTECH", duration: 2, deptSlug: "computer-science", totalSeats: 18, fees: 60000, eligibility: "B.Tech with 60% aggregate and a valid GATE score (relaxed for management quota).", accreditation: "NONE" },
  { name: "Master of Business Administration (MBA)", slug: "mba", degree: "MBA", duration: 2, deptSlug: "mba", totalSeats: 60, fees: 90000, eligibility: "50% aggregate in any degree from a recognised university with a valid KMAT/CMAT/CAT score.", accreditation: "NONE" },
];

async function main() {
  console.log("🌱 Seeding JCET database…");

  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@jawaharlalcolleges.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "Admin@JCET2026";
  const hash = (pwd: string) => bcrypt.hash(pwd, 10);

  // --- Admin + staff users ---
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: await hash(adminPassword),
      name: "JCET Administrator",
      role: "ADMIN",
      phone: "0466-2344800",
    },
  });

  await prisma.user.upsert({
    where: { email: "staff@jawaharlalcolleges.com" },
    update: {},
    create: {
      email: "staff@jawaharlalcolleges.com",
      password: await hash("Staff@JCET2026"),
      name: "JCET Office Staff",
      role: "STAFF",
    },
  });

  // --- Departments + HODs ---
  for (const d of DEPARTMENTS) {
    const dept = await prisma.department.upsert({
      where: { slug: d.slug },
      update: {
        name: d.name,
        shortCode: d.shortCode,
        description: d.description,
        level: d.level,
        intake: d.intake,
        established: d.established,
        icon: d.icon,
        isActive: true,
      },
      create: {
        name: d.name,
        slug: d.slug,
        shortCode: d.shortCode,
        description: d.description,
        level: d.level,
        intake: d.intake,
        established: d.established,
        icon: d.icon,
        isActive: true,
      },
    });

    const hodUser = await prisma.user.upsert({
      where: { email: d.hod.email },
      update: { name: d.hod.name },
      create: {
        email: d.hod.email,
        password: await hash("Faculty@JCET2026"),
        name: d.hod.name,
        role: "FACULTY",
      },
    });

    const employeeId = `JCET-${d.shortCode}-HOD`;
    const hodFaculty = await prisma.faculty.upsert({
      where: { employeeId },
      update: {
        designation: d.hod.designation,
        qualification: d.hod.qualification,
        experience: d.hod.experience,
        bio: d.hod.bio,
        departmentId: dept.id,
        isHOD: true,
      },
      create: {
        userId: hodUser.id,
        employeeId,
        designation: d.hod.designation,
        qualification: d.hod.qualification,
        experience: d.hod.experience,
        bio: d.hod.bio,
        departmentId: dept.id,
        isHOD: true,
      },
    });

    await prisma.department.update({
      where: { id: dept.id },
      data: { hodId: hodFaculty.id },
    });
  }

  // --- A few extra CSE faculty to populate the faculty listing ---
  const cse = await prisma.department.findUnique({ where: { slug: "computer-science" } });
  if (cse) {
    const extraFaculty = [
      { name: "Prof. Deepa S", designation: "Assistant Professor", qualification: "M.Tech CSE", experience: 8 },
      { name: "Prof. Rahul Krishna", designation: "Assistant Professor", qualification: "M.Tech CSE (Ph.D pursuing)", experience: 6 },
      { name: "Prof. Sneha Ramesh", designation: "Assistant Professor", qualification: "M.Tech Data Science", experience: 5 },
    ];
    for (let i = 0; i < extraFaculty.length; i++) {
      const f = extraFaculty[i];
      const email = `cse.faculty${i + 1}@jawaharlalcolleges.com`;
      const u = await prisma.user.upsert({
        where: { email },
        update: { name: f.name },
        create: { email, password: await hash("Faculty@JCET2026"), name: f.name, role: "FACULTY" },
      });
      await prisma.faculty.upsert({
        where: { employeeId: `JCET-CSE-${100 + i}` },
        update: { designation: f.designation, qualification: f.qualification, experience: f.experience, departmentId: cse.id },
        create: {
          userId: u.id,
          employeeId: `JCET-CSE-${100 + i}`,
          designation: f.designation,
          qualification: f.qualification,
          experience: f.experience,
          departmentId: cse.id,
          isHOD: false,
        },
      });
    }
  }

  // --- Programmes ---
  const deptBySlug = new Map(
    (await prisma.department.findMany()).map((d) => [d.slug, d.id])
  );
  for (const p of PROGRAMMES) {
    const departmentId = deptBySlug.get(p.deptSlug);
    if (!departmentId) continue;
    await prisma.programme.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        degree: p.degree,
        duration: p.duration,
        departmentId,
        totalSeats: p.totalSeats,
        fees: new Prisma.Decimal(p.fees),
        eligibility: p.eligibility,
        accreditation: p.accreditation,
        isActive: true,
      },
      create: {
        name: p.name,
        slug: p.slug,
        degree: p.degree,
        duration: p.duration,
        departmentId,
        totalSeats: p.totalSeats,
        fees: new Prisma.Decimal(p.fees),
        eligibility: p.eligibility,
        accreditation: p.accreditation,
        isActive: true,
      },
    });
  }

  // --- News & events ---
  const news = [
    {
      title: "Admissions Open for 2026–27 Academic Year",
      slug: "admissions-open-2026-27",
      type: "ANNOUNCEMENT" as const,
      excerpt: "Applications are now open for B.Tech, M.Tech and MBA programmes at JCET for 2026–27.",
      content:
        "Jawaharlal College of Engineering and Technology (Autonomous) invites applications for the 2026–27 academic year across all B.Tech, M.Tech and MBA programmes. Apply online through the Nehru Group admissions portal. Counselling code: JCE.",
      tags: ["admissions", "2026"],
    },
    {
      title: "JCET Secures NAAC A+ Accreditation",
      slug: "jcet-naac-a-plus",
      type: "NEWS" as const,
      excerpt: "JCET has been awarded NAAC A+ accreditation with a CGPA of 3.38/4 in its first cycle.",
      content:
        "JCET is proud to announce that it has been accredited with NAAC A+ (CGPA 3.38/4) in its very first cycle — a testament to the institution's commitment to quality education, research and infrastructure.",
      tags: ["naac", "accreditation", "quality"],
    },
    {
      title: "National Tech Fest 'Xmeron' 2026",
      slug: "xmeron-techfest-2026",
      type: "EVENT" as const,
      eventDate: new Date("2026-03-14"),
      excerpt: "The CSE department's flagship technical festival returns with hackathons, workshops and talks.",
      content:
        "Xmeron, the flagship technical fest of the Department of Computer Science and Engineering, returns in 2026 with a 24-hour hackathon, industry workshops, coding contests and expert talks. Open to students across Kerala.",
      tags: ["events", "techfest", "cse"],
    },
    {
      title: "Campus Placement Drive 2026 — Record Offers",
      slug: "placement-drive-2026",
      type: "NEWS" as const,
      excerpt: "JCET students bag record offers during the 2026 placement season from leading recruiters.",
      content:
        "The 2026 placement season has seen JCET students receive a record number of offers from leading IT and core companies, with the highest package reaching new heights. Congratulations to all our placed students!",
      tags: ["placements", "training"],
    },
  ];
  for (const n of news) {
    await prisma.newsEvent.upsert({
      where: { slug: n.slug },
      update: {},
      create: {
        title: n.title,
        slug: n.slug,
        type: n.type,
        excerpt: n.excerpt,
        content: n.content,
        eventDate: "eventDate" in n ? (n.eventDate as Date) : null,
        tags: n.tags,
        isPublished: true,
        publishedAt: new Date(),
        authorId: admin.id,
      },
    });
  }

  // --- Placements (recruiters + stats) ---
  const placements = [
    { companyName: "TCS", package: 700000, role: "Systems Engineer", batch: "2025", studentsHired: 42, sector: "IT" as const },
    { companyName: "Infosys", package: 650000, role: "Systems Engineer", batch: "2025", studentsHired: 35, sector: "IT" as const },
    { companyName: "Wipro", package: 600000, role: "Project Engineer", batch: "2025", studentsHired: 28, sector: "IT" as const },
    { companyName: "Cognizant", package: 800000, role: "Programmer Analyst", batch: "2025", studentsHired: 22, sector: "IT" as const },
    { companyName: "UST Global", package: 950000, role: "Software Engineer", batch: "2025", studentsHired: 18, sector: "IT" as const },
    { companyName: "IBS Software", package: 1200000, role: "Associate Engineer", batch: "2025", studentsHired: 9, sector: "IT" as const },
    { companyName: "L&T Construction", package: 720000, role: "Graduate Engineer Trainee", batch: "2025", studentsHired: 12, sector: "CORE" as const },
    { companyName: "Tata Elxsi", package: 1000000, role: "Design Engineer", batch: "2025", studentsHired: 7, sector: "CORE" as const },
  ];
  // Avoid duplicate inserts on re-seed.
  const existingPlacements = await prisma.placement.count();
  if (existingPlacements === 0) {
    await prisma.placement.createMany({
      data: placements.map((p) => ({
        companyName: p.companyName,
        package: new Prisma.Decimal(p.package),
        role: p.role,
        batch: p.batch,
        studentsHired: p.studentsHired,
        sector: p.sector,
        type: "ON_CAMPUS",
      })),
    });
  }

  // --- Testimonials ---
  const testimonials = [
    { studentName: "Arjun Menon", batch: "2020–2024", department: "Computer Science", quote: "JCET gave me the technical foundation and confidence to crack my dream job. The faculty support and placement training were exceptional.", order: 1 },
    { studentName: "Fathima Rashid", batch: "2019–2023", department: "Electronics & Communication", quote: "The labs and project culture at JCET helped me build real skills. I'm now working at a top product company.", order: 2 },
    { studentName: "Vishnu Prasad", batch: "2018–2022", department: "Mechanical Engineering", quote: "The industry-integrated programme meant I was job-ready from day one. Grateful for the mentorship I received.", order: 3 },
  ];
  const existingTestimonials = await prisma.testimonial.count();
  if (existingTestimonials === 0) {
    await prisma.testimonial.createMany({ data: testimonials });
  }

  // --- Scholarships ---
  const scholarships = [
    { name: "Merit Scholarship", description: "Awarded to students with outstanding academic performance in qualifying examinations.", amount: 50000, category: "Merit", eligibility: "Top rank holders in KEAM / qualifying exam.", isActive: true },
    { name: "Nehru Group Need-Based Scholarship", description: "Financial assistance for economically weaker but deserving students across NGI institutions.", amount: 25000, category: "Need-Based", eligibility: "Family income below the prescribed limit with good academic standing.", isActive: true },
    { name: "Sports Excellence Scholarship", description: "Support for students who represent the state or nation in sports.", amount: 30000, category: "Sports", eligibility: "State/national level sports achievements.", isActive: true },
  ];
  const existingScholarships = await prisma.scholarship.count();
  if (existingScholarships === 0) {
    await prisma.scholarship.createMany({
      data: scholarships.map((s) => ({ ...s, amount: new Prisma.Decimal(s.amount) })),
    });
  }

  // --- Notifications ---
  const existingNotifications = await prisma.notification.count();
  if (existingNotifications === 0) {
    await prisma.notification.createMany({
      data: [
        { title: "Admissions 2026–27 Open", message: "Apply now for B.Tech, M.Tech and MBA programmes. Counselling code: JCE.", type: "INFO", targetRole: "ALL" },
        { title: "End Semester Exam Timetable Released", message: "The end semester examination timetable has been published. Check the downloads section.", type: "EXAM", targetRole: "STUDENT" },
        { title: "Campus Placement Drive", message: "Leading recruiters visiting campus this month. Eligible students register with the Training & Placement Cell.", type: "PLACEMENT", targetRole: "STUDENT" },
      ],
    });
  }

  // --- Gallery ---
  const existingAlbums = await prisma.galleryAlbum.count();
  if (existingAlbums === 0) {
    await prisma.galleryAlbum.create({
      data: {
        title: "Campus Life",
        description: "Glimpses of life at the JCET campus in Lakkidi, Ottapalam.",
        isPublished: true,
        eventDate: new Date(),
        images: {
          create: [
            { title: "JCET Campus", imageUrl: "https://jawaharlalcolleges.com/images/college/2.jpg", category: "CAMPUS", uploadedById: admin.id },
            { title: "Academic Block", imageUrl: "https://jawaharlalcolleges.com/images/college/arc.jpg", category: "ACADEMIC", uploadedById: admin.id },
            { title: "Smriti Dinam 2026", imageUrl: "https://jawaharlalcolleges.com/globalpannel/public/images/smriti_dinam_2026_1.webp", category: "CULTURAL", uploadedById: admin.id },
          ],
        },
      },
    });
  }

  console.log("✅ Seed complete.");
  console.log(`   Admin login: ${adminEmail} / ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
