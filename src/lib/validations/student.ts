import { z } from "zod";

export const admissionTypeEnum = z.enum([
  "KEAM",
  "MANAGEMENT",
  "NRI",
  "LATERAL",
]);

export const studentStatusEnum = z.enum(["ACTIVE", "GRADUATED", "DROPPED"]);

export const createStudentSchema = z.object({
  userId: z.string().min(1),
  rollNumber: z.string().min(1, "Roll number is required"),
  batch: z.string().min(4, "Batch is required (e.g. 2022-2026)"),
  semester: z.coerce.number().int().min(1).max(10).default(1),
  departmentId: z.string().min(1, "Department is required"),
  admissionType: admissionTypeEnum.default("KEAM"),
  status: studentStatusEnum.default("ACTIVE"),
});

export type CreateStudentInput = z.infer<typeof createStudentSchema>;
