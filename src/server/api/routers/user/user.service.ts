import type { UpdateProfileSchema } from "./user.types";
import { db } from "@/server/db";
import { TRPCError } from "@trpc/server";
import { signOut } from "../auth/auth.service";
import { type User } from "lucia";
import { z } from "zod";

export async function updateProfileUser(
  values: UpdateProfileSchema,
  userId: string,
) {
  try {
    return await db.user.update({
      where: {
        id: userId,
      },
      data: values,
    });
  } catch (error) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to update profile",
    });
  }
}

export const deleteUserSelf = async (input: string, user: User) => {
  try {
    const schema = z.literal(`Delete my account, ${user.email}`);
    const result: { success: boolean } | string = schema.safeParse(input);
    if (!result.success)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Type correctly, if you want delete your account",
      });

    await signOut();

    await db.user.delete({ where: { id: user.id } });
  } catch (error) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to delete your account",
    });
  }
};
