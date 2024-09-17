import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import type { User } from "lucia";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { TRPCClientError } from "@trpc/client";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { env } from "@/env";
import { cn } from "@/lib/utils";

export default function UserHeader({
  user,
  className,
  size = "sm",
}: {
  user: User;
  className?: string;
  size?: "sm" | "lg";
}) {
  const router = useRouter();

  const query = api.auth.signOut.useQuery(void 0, {
    enabled: false,
  });

  async function handleLogOut() {
    try {
      await query.refetch(void 0);

      router.push("/login");
      router.refresh();
    } catch (error) {
      if (error instanceof TRPCClientError)
        toast({ title: error.message, variant: "destructive" });
      else toast({ title: "Something went wrong", variant: "destructive" });
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar
          className={cn(
            "ml-auto cursor-pointer border",
            className,
            size == "lg" ? "size-24" : "size-10",
          )}
        >
          <AvatarImage src={`${env.NEXT_PUBLIC_BASE_URL}/${user.picture}`} />
          <AvatarFallback className="uppercase">
            {user.firstName.at(0)}
            {user.lastName.at(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={size == "lg" ? "center" : "end"}>
        <DropdownMenuLabel>
          Hello {user.firstName} {user.lastName}👋
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={"/account"}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-500 hover:text-red-500 focus:text-red-500"
          onClick={handleLogOut}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
