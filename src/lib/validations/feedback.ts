import { z } from "zod";

export const feedbackTypeEnum = z.enum(["GENERAL", "COMPLAINT", "SUGGESTION"]);

export const createFeedbackSchema = z.object({
  name: z.string().min(2, "Name is required").max(120),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^[0-9+\-\s()]{7,15}$/, "Invalid phone number")
    .optional()
    .nullable(),
  subject: z.string().max(200).optional().nullable(),
  message: z.string().min(5, "Message is required").max(2000),
  type: feedbackTypeEnum.default("GENERAL"),
});

export type CreateFeedbackInput = z.infer<typeof createFeedbackSchema>;
