import {
  containsNumber,
  containsSpecialChars,
  containsUppercase,
} from "@/lib/utils";
import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().trim().min(1, { message: "Password required" }),
});

export type SignInSchema = z.infer<typeof signInSchema>;

const passwordSchema = z.string().superRefine((value, ctx) => {
  if (value.length < 8) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Must be 8 or more characters long",
      fatal: true,
    });

    return z.NEVER;
  }

  if (!containsUppercase(value)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "At least contains one uppercase letter",
      fatal: true,
    });

    return z.NEVER;
  }

  if (!containsNumber(value)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "At least contains one number",
      fatal: true,
    });

    return z.NEVER;
  }

  if (!containsSpecialChars(value)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "At least contains one special characters (@, #, $, etc.)",
      fatal: true,
    });

    return z.NEVER;
  }
});

export const registerSchema = z
  .object({
    email: z.string().email("Not a valid email"),
    firstName: z.string(),
    lastName: z.string(),
    password: passwordSchema,
    confirm: z.string(),
  })
  .refine((values) => values.password === values.confirm, {
    message: "Password don't match",
    path: ["confirm"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

export const resetPasswordSchema = z.object({
  userId: z.string(),
  captcha: z.string(),
});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export const changeResetPasswordSchema = z
  .object({
    resetId: z.string(),
    userId: z.string(),
    password: passwordSchema,
    confirm: z.string(),
  })
  .refine((values) => values.password === values.confirm, {
    message: "Password dont match",
    path: ["confirm"],
  });

export type ChangeResetPasswordSchema = z.infer<
  typeof changeResetPasswordSchema
>;

export const changePasswordSchema = z
  .object({
    password: passwordSchema,
    confirm: z.string(),
  })
  .refine((values) => values.password === values.confirm, {
    message: "Password dont match",
    path: ["confirm"],
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
