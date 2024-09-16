import DeleteUserForm from "@/app/_components/user-settings/delete-user-form";
import UpdateProfileForm from "@/app/_components/user-settings/update-profile-form";
import UpdateUserPassword from "@/app/_components/user-settings/update-user-password";
import { validateRequest } from "@/server/auth";
import { type Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Account",
  description:
    "Upload a profile picture of yourself, or the character, you always wanted to be.",
};

export default async function ProfilePage() {
  const validate = await validateRequest();
  if (!validate.user) return redirect("/login");

  return (
    <div className="space-y-10">
      <UpdateProfileForm user={validate.user} />
      <UpdateUserPassword />
      <DeleteUserForm user={validate.user} />
    </div>
  );
}
