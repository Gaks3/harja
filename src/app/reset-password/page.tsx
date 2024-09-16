import { validateRequest } from "@/server/auth";
import { redirect } from "next/navigation";
import ResetPasswordForm from "../_components/reset-password-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description:
    "A page that allows users to securely reset their password by providing their email address and following the verification process.",
};

export default async function ResetPasswordPage() {
  const validate = await validateRequest();
  if (validate.user) return redirect("/dashboard/tools");

  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted/40">
      <div className="mx-4 w-full max-w-md space-y-3 md:mx-0">
        <h1 className="text-center text-xl font-semibold">
          Reset your password
        </h1>
        <ResetPasswordForm />
      </div>
    </div>
  );
}
