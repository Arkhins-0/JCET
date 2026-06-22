// Shared API response types — mirror the jcet-backend Prisma models.

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  meta?: PaginationMeta;
  errors?: unknown;
}

export type DepartmentLevel = "UG" | "PG" | "BOTH";
export type Degree = "BTECH" | "MTECH" | "MBA" | "MCA";
export type Accreditation = "NBA" | "NAAC" | "NONE";
export type NewsType = "NEWS" | "EVENT" | "CIRCULAR" | "ANNOUNCEMENT";
export type GalleryCategory =
  | "CAMPUS"
  | "EVENTS"
  | "SPORTS"
  | "CULTURAL"
  | "ACADEMIC";
export type AdmissionCategory = "GENERAL" | "OBC" | "SC" | "ST" | "EWS";
export type PlacementSector = "IT" | "CORE" | "MANAGEMENT" | "PSU" | "RESEARCH";

export interface FacultySummary {
  id: string;
  designation: string;
  qualification: string;
  experience: number;
  profileImage: string | null;
  isHOD: boolean;
  bio?: string | null;
  user: { name: string; email?: string };
  department?: { id: string; name: string; slug: string; shortCode: string };
}

export interface Programme {
  id: string;
  name: string;
  slug: string;
  degree: Degree;
  duration: number;
  totalSeats: number | null;
  fees: number | null;
  eligibility: string | null;
  accreditation: Accreditation;
  isActive: boolean;
  department?: { id: string; name: string; slug: string; shortCode: string };
}

export interface DepartmentSection {
  id: string;
  key: string;
  label: string;
  order: number;
  html: string;
  images: string[];
}

export interface Department {
  id: string;
  name: string;
  slug: string;
  shortCode: string;
  description: string | null;
  level: DepartmentLevel;
  intake: number | null;
  established: number | null;
  image: string | null;
  icon: string | null;
  isActive: boolean;
  hod?: {
    id: string;
    designation: string;
    qualification?: string;
    profileImage?: string | null;
    bio?: string | null;
    user: { name: string; email?: string };
  } | null;
  faculty?: FacultySummary[];
  programmes?: Programme[];
  sections?: DepartmentSection[];
  _count?: { programmes: number; faculty: number; students: number };
}

export interface NewsEvent {
  id: string;
  title: string;
  slug: string;
  content?: string;
  excerpt: string | null;
  type: NewsType;
  thumbnail: string | null;
  publishedAt: string | null;
  eventDate: string | null;
  tags: string[];
  author?: { name: string };
}

export interface PlacementItem {
  id: string;
  companyName: string;
  companyLogo: string | null;
  package: number;
  role: string | null;
  batch: string | null;
  studentsHired: number;
  sector: PlacementSector;
}

export interface PlacementsResponse {
  stats: {
    highestPackage: number;
    averagePackage: number;
    totalHired: number;
    totalCompanies: number;
  };
  placements: PlacementItem[];
  recruiters: { name: string; logo: string | null }[];
}

export interface Testimonial {
  id: string;
  studentName: string;
  batch: string | null;
  department: string | null;
  youtubeUrl: string | null;
  thumbnailUrl: string | null;
  quote: string;
  order: number;
}

export interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  category: GalleryCategory;
  albumId: string | null;
  createdAt: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  description: string | null;
  coverImage: string | null;
  eventDate: string | null;
  _count?: { images: number };
}

export interface GalleryResponse {
  albums: GalleryAlbum[];
  images: GalleryImage[];
}

export interface Scholarship {
  id: string;
  name: string;
  description: string;
  amount: number | null;
  category: string | null;
  eligibility: string | null;
  lastDate: string | null;
}

export interface AdmissionResult {
  id: string;
  applicationNumber: string;
  applicantName: string;
  status: string;
  appliedAt: string;
}
