import { z } from "zod";

export const degreeEnum = z.enum(["BTECH", "MTECH", "MBA", "MCA"]);

export const programmeQuerySchema = z.object({
  degree: degreeEnum.optional(),
  department: z.string().optional(),
});

export type ProgrammeQuery = z.infer<typeof programmeQuerySchema>;
