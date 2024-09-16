"use client";

import { useRouter } from "next/navigation";
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
import { api } from "@/trpc/react";
import { useForm } from "react-hook-form";
import {
  createToolSchema,
  type CreateToolSchema,
} from "@/server/api/routers/tool/tool.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { TRPCClientError } from "@trpc/client";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useRef } from "react";

export default function CreateToolForm({ size }: { size?: "sm" }) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const router = useRouter();

  const mutation = api.tool.create.useMutation();

  const form = useForm<CreateToolSchema>({
    resolver: zodResolver(createToolSchema),
  });

  async function onSubmit(values: CreateToolSchema) {
    try {
      await mutation.mutateAsync(values);

      closeButtonRef.current?.click();
      toast({ title: "Success to create new tool" });
      router.refresh();
    } catch (error) {
      if (error instanceof TRPCClientError)
        toast({ title: error.message, variant: "destructive" });
      else toast({ title: "Something went wrong", variant: "destructive" });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={size ?? "default"}>Create New Tool</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new tool</DialogTitle>
          <DialogDescription>
            Explore and innovate with your new creation.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tool Name</FormLabel>
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
            <Button ref={closeButtonRef} variant={"outline"}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Loading..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
