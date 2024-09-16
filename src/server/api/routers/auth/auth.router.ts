import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";
import {
  signInSchema,
  registerSchema,
  changePasswordSchema,
  resetPasswordSchema,
  changeResetPasswordSchema,
} from "./auth.types";
import {
  signIn,
  signOut,
  register,
  updatePassword,
  getUserByEmail,
  resetPassword,
  getResetPasswordById,
  changePassword,
} from "./auth.service";
import { z } from "zod";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input }) => {
      await register(input);
    }),
  signIn: publicProcedure.input(signInSchema).mutation(async ({ input }) => {
    await signIn(input);
  }),
  signOut: protectedProcedure.query(async () => {
    await signOut();
  }),
  changePassword: protectedProcedure
    .input(changePasswordSchema)
    .mutation(async ({ input, ctx }) => {
      await updatePassword(input, ctx.user.id);
    }),
  getByEmail: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return await getUserByEmail(input);
  }),
  resetPassword: publicProcedure
    .input(resetPasswordSchema)
    .mutation(async ({ input }) => {
      return await resetPassword(input);
    }),
  changeResetPassword: publicProcedure
    .input(changeResetPasswordSchema)
    .mutation(async ({ input }) => {
      await changePassword(input);
    }),
  getResetPassword: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      return await getResetPasswordById(input);
    }),
});
