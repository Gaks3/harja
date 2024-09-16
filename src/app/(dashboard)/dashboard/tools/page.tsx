import EmptyTool from "@/app/_components/dashboard/tool/empty-tool";
import Tools from "@/app/_components/dashboard/tool/tools";
import { validateRequest } from "@/server/auth";
import { api } from "@/trpc/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Set up your dashboard by starting with your first tool. Explore and innovate with your new creation.",
};

export default async function ToolsPage() {
  const validate = await validateRequest();
  if (!validate.user) return redirect("/login");

  const tools = await api.tool.getTools();

  if (tools.length === 0) return <EmptyTool />;

  return <Tools tools={tools} />;
}
