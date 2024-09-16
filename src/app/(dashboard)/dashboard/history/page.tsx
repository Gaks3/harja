import CardHistories from "@/app/_components/dashboard/card-histories";
import { validateRequest } from "@/server/auth";
import { api } from "@/trpc/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Histories",
  description:
    "A data dashboard displaying charts for soil moisture, temperature, humidity, and water pump activity, providing real-time insights into sensor readings and system performance.",
};

export default async function ToolsPage() {
  const validate = await validateRequest();
  if (!validate.user) return redirect("/login");

  const tools = await api.tool.getTools();

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Histories
        </h1>
      </div>
      <CardHistories tools={tools} />
    </div>
  );
}
