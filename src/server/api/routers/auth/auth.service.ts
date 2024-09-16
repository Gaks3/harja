"use server";

import { db } from "@/server/db";
import type {
  ChangePasswordSchema,
  ChangeResetPasswordSchema,
  RegisterSchema,
  ResetPasswordSchema,
  SignInSchema,
} from "./auth.types";
import { TRPCError } from "@trpc/server";
import { Argon2id } from "oslo/password";
import { validateRequest, lucia } from "@/server/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { addHours, addMinutes } from "date-fns";
import { env } from "@/env";
import { generateId } from "lucia";
import { sendEmailResetPassword } from "@/server/email";

export async function getUserByEmail(email: string) {
  return await db.user.findUnique({
    where: {
      email,
    },
  });
}

export async function signIn(values: SignInSchema) {
  try {
    const user = await getUserByEmail(values.email);
    if (!user)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Email or Password is wrong",
      });

    const validPassword = await new Argon2id().verify(
      user.hashedPassword,
      values.password,
    );
    if (!validPassword)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Email or Password is wrong",
      });

    await lucia.deleteExpiredSessions();

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (error) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to sign in",
    });
  }
}

export async function register(values: RegisterSchema) {
  try {
    const hashedPassword = await new Argon2id().hash(values.password);

    const alreadyUse = await getUserByEmail(values.email);
    if (alreadyUse)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Email already in use",
      });

    const user = await db.user.create({
      data: {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        hashedPassword,
      },
    });

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (error) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to register",
    });
  }
}

export async function signOut() {
  try {
    const user = await validateRequest();
    if (!user?.session) return redirect("/login");

    await lucia.invalidateSession(user.session.id);
    await lucia.deleteExpiredSessions();

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (error) {
    console.log(error);
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to sign out",
    });
  }
}

export async function updatePassword(
  values: ChangePasswordSchema,
  userId: string,
) {
  try {
    const hashedPassword = await new Argon2id().hash(values.password);

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedPassword,
      },
    });
  } catch (error) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to update password",
    });
  }
}

export async function resetPassword({ captcha, userId }: ResetPasswordSchema) {
  try {
    await deleteResetPasswordExpired();

    const alreadyExist = await db.resetPassword.findUnique({
      where: { userId },
    });
    if (
      alreadyExist &&
      alreadyExist.dueDate.getTime() > addHours(new Date(), 7).getTime()
    )
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Please check your email, or try again 10 minutes later",
      });

    const captchaValidate = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: env.RECAPTCHA_SECRET_KEY,
          response: captcha,
        }),
      },
    );
    if (!captchaValidate.ok)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Captcha not valid",
      });

    const res = await db.resetPassword.create({
      data: {
        id: generateId(20),
        userId,
        dueDate: addHours(addMinutes(new Date(), 10), 7),
      },
      include: {
        user: true,
      },
    });

    await sendEmailResetPassword(
      res.user.email,
      env.NEXT_PUBLIC_BASE_URL + "/reset-password/" + res.id,
    );
  } catch (error) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create reset password link",
    });
  }
}

export async function deleteResetPasswordExpired() {
  return await db.resetPassword.deleteMany({
    where: {
      dueDate: {
        lte: addHours(new Date(), 7),
      },
    },
  });
}

export async function getResetPasswordById(id: string) {
  try {
    await deleteResetPasswordExpired();

    return await db.resetPassword.findUnique({ where: { id } });
  } catch (error) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get reset password by id",
    });
  }
}

export async function changePassword(values: ChangeResetPasswordSchema) {
  try {
    const hashPassword = await new Argon2id().hash(values.password);

    return await db.user.update({
      where: {
        id: values.userId,
        resetPasswords: {
          id: values.resetId,
        },
      },
      data: {
        hashedPassword: hashPassword,
        resetPasswords: {
          delete: { userId: values.userId, id: values.resetId },
        },
      },
    });
  } catch (error) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to update user by id",
    });
  }
}
