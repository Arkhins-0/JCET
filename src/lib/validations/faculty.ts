import { z } from "zod";

export const createFacultySchema = z.object({
  userId: z.string().min(1),
  employeeId: z.string().min(1, "Employee ID is required"),
  designation: z.string().min(2),
  qualification: z.string().min(2),
  departmentId: z.string().min(1, "Department is required"),
  experience: z.coerce.number().int().min(0).default(0),
  profileImage: z.string().url().optional().nullable(),
  bio: z.string().max(4000).optional().nullable(),
  isHOD: z.coerce.boolean().default(false),
  publications: z.string().max(8000).optional().nullable(),
});

export const facultyQuerySchema = z.object({
  department: z.string().optional(),
  isHOD: z
    .enum(["true", "false"])
    .transform((v) => v === "true")
    .optional(),
});

export type CreateFacultyInput = z.infer<typeof createFacultySchema>;
