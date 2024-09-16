import { validateRequest } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const validate = await validateRequest();
  if (validate.user) return redirect("/dashboard");

  return children;
}
