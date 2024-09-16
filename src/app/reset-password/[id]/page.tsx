import ChangePasswordForm from "@/app/_components/change-password-form";
import { api } from "@/trpc/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Change Password",
  description:
    "A secure page allowing users to update their password by entering their current password and creating a new one.",
};

export default async function ChangePasswordPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const resetPassword = await api.auth.getResetPassword(id);
  if (!resetPassword) return notFound();

  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted/40">
      <div className="w-full max-w-md space-y-3">
        <h1 className="text-center text-xl font-semibold">
          Change your password
        </h1>
        <ChangePasswordForm
          id={resetPassword.id}
          userId={resetPassword.userId}
        />
      </div>
    </div>
  );
}
