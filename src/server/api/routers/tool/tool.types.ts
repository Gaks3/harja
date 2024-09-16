import { z } from "zod";

export const createToolSchema = z.object({
  name: z.string(),
});

export type CreateToolSchema = z.infer<typeof createToolSchema>;

export const numberToolSchema = z.number();

export type NumberToolSchema = z.infer<typeof numberToolSchema>;

export const updateToolSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type UpdateToolSchema = z.infer<typeof updateToolSchema>;
