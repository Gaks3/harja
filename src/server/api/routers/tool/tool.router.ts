import { createTRPCRouter, protectedProcedure } from "../../trpc";
import {
  createTool,
  deleteToolById,
  getToolById,
  getToolHistory,
  getToolsByUserId,
  updateTool,
} from "./tool.service";
import {
  createToolSchema,
  numberToolSchema,
  updateToolSchema,
} from "./tool.types";

export const toolRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createToolSchema)
    .mutation(async ({ input, ctx }) => {
      await createTool(input, ctx.user.id, ctx.session.id);
    }),
  getTools: protectedProcedure.query(async ({ ctx }) => {
    return await getToolsByUserId(ctx.user.id);
  }),
  getTool: protectedProcedure
    .input(numberToolSchema)
    .query(async ({ input, ctx }) => {
      return await getToolById(input, ctx.user.id);
    }),
  updateTool: protectedProcedure
    .input(updateToolSchema)
    .mutation(async ({ input, ctx }) => {
      await updateTool(input, ctx.user.id);
    }),
  deleteTool: protectedProcedure
    .input(numberToolSchema)
    .mutation(async ({ input, ctx }) => {
      await deleteToolById(input, ctx.user.id);
    }),
  getToolHistory: protectedProcedure
    .input(numberToolSchema)
    .query(async ({ input, ctx }) => {
      return await getToolHistory(input, ctx.user.id);
    }),
});
