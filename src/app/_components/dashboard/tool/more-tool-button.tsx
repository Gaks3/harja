import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import DeleteToolForm from "./delete-tool-form";
import type { Tool } from "@prisma/client";
import { Dialog, DialogTrigger } from "../../ui/dialog";

export default function MoreToolButton({ tool }: { tool: Tool }) {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <ChevronDown size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32" align="end">
          <DropdownMenuItem asChild>
            <DialogTrigger className="w-full cursor-pointer text-red-600 hover:text-red-600 focus:text-red-600">
              Delete
            </DialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteToolForm tool={tool} />
    </Dialog>
  );
}
