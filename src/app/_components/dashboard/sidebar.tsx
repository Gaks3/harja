import { HistoryIcon, WrenchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Image
            src={"/logo-white.png"}
            alt="Harja Logo"
            width={16}
            height={16}
            className="h-4 w-4 transition-all group-hover:scale-110"
          />
          <span className="sr-only">Harja Logo</span>
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/dashboard/tools"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <WrenchIcon className="h-5 w-5" />
              <span className="sr-only">Tools</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Tools</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/dashboard/history"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <HistoryIcon className="h-5 w-5" />
              <span className="sr-only">History</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">History</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}
