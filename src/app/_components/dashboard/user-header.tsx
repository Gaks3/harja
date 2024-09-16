import Image from "next/image";
import { Button } from "../ui/button";
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

export default function UserHeader({ user }: { user: User }) {
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
        <Button
          variant="outline"
          size="icon"
          className="ml-auto overflow-hidden rounded-full"
        >
          <Avatar>
            <AvatarImage src={`${env.NEXT_PUBLIC_BASE_URL}/${user.picture}`} />
            <AvatarFallback className="uppercase">
              {user.firstName.at(0)}
              {user.lastName.at(0)}
            </AvatarFallback>
          </Avatar>

          <Image
            src="/logo-green.png"
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
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
