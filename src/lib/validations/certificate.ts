import { z } from "zod";

export const certificateTypeEnum = z.enum([
  "BONAFIDE",
  "NOC",
  "TRANSCRIPT",
  "MIGRATION",
]);

export const createCertificateSchema = z.object({
  type: certificateTypeEnum,
  reason: z.string().max(1000).optional().nullable(),
});

export type CreateCertificateInput = z.infer<typeof createCertificateSchema>;
