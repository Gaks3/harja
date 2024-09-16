import { type Tool } from "@prisma/client";
import CardTools from "../card-tools";
import CreateToolForm from "../create-tool-form";

export default function Tools({ tools }: { tools: Tool[] }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Tools
        </h1>
        <div className="ml-auto">
          <CreateToolForm size="sm" />
        </div>
      </div>
      <CardTools tools={tools} />
    </div>
  );
}
