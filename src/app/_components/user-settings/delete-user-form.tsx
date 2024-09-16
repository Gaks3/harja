"use client";

import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { TRPCClientError } from "@trpc/client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRef } from "react";
import { type User } from "lucia";

export default function DeleteUserForm({ user }: { user: User }) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const router = useRouter();

  const mutation = api.user.delete.useMutation();

  const schema = z.object({
    confirm: z.literal(`Delete ${user.email}`, {
      errorMap: () => ({
        message: "Type correctly, if you want delete your account",
      }),
    }),
  });
  type Schema = z.infer<typeof schema>;

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: Schema) {
    try {
      await mutation.mutateAsync(values.confirm);

      closeButtonRef.current?.click();
      toast({ title: "Success to delete user" });
      router.refresh();
    } catch (error) {
      if (error instanceof TRPCClientError)
        toast({ title: error.message, variant: "destructive" });
      else toast({ title: "Something went wrong", variant: "destructive" });
    }
  }

  return (
    <div className="rounded-lg border bg-background p-6">
      <Dialog>
        <h3 className="text-xl font-semibold">Delete account</h3>
        <p className="text-balance text-sm">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <DialogTrigger asChild>
          <Button className="mt-5" variant={"destructive"}>
            Delete your account
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-destructive">Delete user</DialogTitle>
            <DialogDescription>
              Are you sure to delete your account? All your data will be deleted
              to.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="confirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      To verify, type &quot;Delete {user.email}&quot; below
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <DialogFooter>
            <DialogClose asChild>
              <Button ref={closeButtonRef} variant={"destructive"}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={mutation.isPending}
              variant={"outline"}
            >
              {mutation.isPending ? "Loading..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
