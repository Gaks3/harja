import { z } from "zod";

export const updateSwitchSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type UpdateSwitchSchema = z.infer<typeof updateSwitchSchema>;
