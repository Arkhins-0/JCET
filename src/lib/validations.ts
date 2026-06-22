import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(120),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .regex(/^[0-9+\-\s()]{7,15}$/, "Enter a valid phone number")
    .optional()
    .or(z.literal("")),
  subject: z.string().max(200).optional().or(z.literal("")),
  message: z.string().min(5, "Please enter a message").max(2000),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const admissionCategory = z.enum([
  "GENERAL",
  "OBC",
  "SC",
  "ST",
  "EWS",
]);

// Step 1 — personal
export const personalSchema = z.object({
  applicantName: z.string().min(3, "Enter your full name").max(120),
  email: z.string().email("Enter a valid email"),
  phone: z.string().regex(/^[0-9+\-\s()]{7,15}$/, "Enter a valid phone number"),
  dob: z.string().min(1, "Select your date of birth"),
  address: z.string().min(5, "Enter your address").max(500),
});

// Step 2 — academic
export const academicSchema = z.object({
  programmeId: z.string().min(1, "Select a programme"),
  category: admissionCategory,
  keamRank: z
    .union([z.coerce.number().int().positive(), z.literal("")])
    .optional(),
  plusTwoPercent: z
    .union([z.coerce.number().min(0).max(100), z.literal("")])
    .optional(),
});

export const admissionSchema = personalSchema.merge(academicSchema);

export type AdmissionFormValues = z.infer<typeof admissionSchema>;
