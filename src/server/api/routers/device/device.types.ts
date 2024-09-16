import { z } from "zod";

export const getDeviceSchema = z.object({
  id: z.number(),
});

export type GetDeviceSchema = z.infer<typeof getDeviceSchema>;
