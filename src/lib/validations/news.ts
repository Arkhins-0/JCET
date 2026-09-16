import { z } from "zod";

export const newsTypeEnum = z.enum([
  "NEWS",
  "EVENT",
  "CIRCULAR",
  "ANNOUNCEMENT",
]);

export const createNewsSchema = z.object({
  title: z.string().min(3, "Title is required").max(200),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens")
    .optional(),
  content: z.string().min(10, "Content is required"),
  excerpt: z.string().max(400).optional().nullable(),
  type: newsTypeEnum.default("NEWS"),
  thumbnail: z.string().url().optional().nullable(),
  eventDate: z.coerce.date().optional().nullable(),
  isPublished: z.coerce.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export const newsQuerySchema = z.object({
  type: newsTypeEnum.optional(),
  published: z
    .enum(["true", "false"])
    .transform((v) => v === "true")
    .optional(),
});

export type CreateNewsInput = z.infer<typeof createNewsSchema>;
