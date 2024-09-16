"use client";

import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { TRPCClientError } from "@trpc/client";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useRef } from "react";
import type { Tool } from "@prisma/client";

export default function DeleteToolForm({ tool }: { tool: Tool }) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const router = useRouter();

  const mutation = api.tool.deleteTool.useMutation();

  const schema = z.object({
    confirm: z.literal(`Delete ${tool.name}`, {
      errorMap: () => ({
        message: "Type correctly, if you want delete your tool",
      }),
    }),
  });
  type Schema = z.infer<typeof schema>;

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  async function onSubmit() {
    try {
      await mutation.mutateAsync(tool.id);

      closeButtonRef.current?.click();
      toast({ title: "Success to delete tool" });
      router.push("/dashboard/tools");
      router.refresh();
    } catch (error) {
      if (error instanceof TRPCClientError)
        toast({ title: error.message, variant: "destructive" });
      else toast({ title: "Something went wrong", variant: "destructive" });
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-destructive">Delete tool</DialogTitle>
        <DialogDescription>
          Are you sure to delete your tool? All your data will be deleted to.
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
                  To verify, type &quot;Delete {tool.name}&quot; below
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
  );
}
