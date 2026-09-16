import { z } from "zod";

export const admissionCategoryEnum = z.enum([
  "GENERAL",
  "OBC",
  "SC",
  "ST",
  "EWS",
]);

export const admissionStatusEnum = z.enum([
  "PENDING",
  "SHORTLISTED",
  "ADMITTED",
  "REJECTED",
  "WAITLISTED",
]);

/** Public application submission — POST /api/admissions */
export const createAdmissionSchema = z.object({
  applicantName: z.string().min(3, "Name must be at least 3 characters").max(120),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^[0-9+\-\s()]{7,15}$/, "Invalid phone number"),
  dob: z.coerce.date({ message: "Invalid date of birth" }),
  address: z.string().min(5, "Address is required").max(500),
  programmeId: z.string().min(1, "Programme is required"),
  keamRank: z.coerce.number().int().positive().optional().nullable(),
  plusTwoPercent: z.coerce
    .number()
    .min(0)
    .max(100, "Percentage cannot exceed 100")
    .optional()
    .nullable(),
  category: admissionCategoryEnum.default("GENERAL"),
  documents: z
    .object({
      tenthCertificate: z.string().url().optional(),
      twelfthCertificate: z.string().url().optional(),
      transferCertificate: z.string().url().optional(),
      idProof: z.string().url().optional(),
    })
    .partial()
    .optional(),
});

/** Admin status update — PATCH /api/admissions/[id] */
export const updateAdmissionSchema = z.object({
  status: admissionStatusEnum,
});

export type CreateAdmissionInput = z.infer<typeof createAdmissionSchema>;
export type UpdateAdmissionInput = z.infer<typeof updateAdmissionSchema>;
