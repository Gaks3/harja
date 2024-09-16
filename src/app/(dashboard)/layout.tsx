import { validateRequest } from "@/server/auth";
import { redirect } from "next/navigation";
import Sidebar from "../_components/dashboard/sidebar";
import Header from "../_components/dashboard/header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const validate = await validateRequest();
  if (!validate.user) return redirect("/login");

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex min-h-screen flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header user={validate.user} />
        <main className="my-4 flex min-h-full w-full max-w-[59rem] flex-1 flex-col px-4 lg:mx-auto lg:px-0">
          {children}
        </main>
      </div>
    </div>
  );
}
