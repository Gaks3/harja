import EmailResetPassword from "@/app/_components/email-reset-password";
import { env } from "@/env";
import { TRPCError } from "@trpc/server";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

export async function sendEmailResetPassword(email: string, link: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Harja Smart Greenhouse <admin@harjasmartgreen.com>",
      to: [email],
      subject: "Reset password",
      react: <EmailResetPassword link={link} />,
    });

    if (error)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });

    return data;
  } catch (error) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to send email reset password",
    });
  }
}
