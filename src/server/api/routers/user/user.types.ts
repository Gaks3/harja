import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  bio: z.string().optional(),
  picture: z.string().optional(),
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
