import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { deleteUserSelf, updateProfileUser } from "./user.service";
import { updateProfileSchema } from "./user.types";

export const userRouter = createTRPCRouter({
  updateProfile: protectedProcedure
    .input(updateProfileSchema)
    .mutation(async ({ input, ctx }) => {
      await updateProfileUser(input, ctx.user.id);
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      return await deleteUserSelf(input, ctx.user);
    }),
});
