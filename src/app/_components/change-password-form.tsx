"use client";

import {
  changeResetPasswordSchema,
  type ChangeResetPasswordSchema,
} from "@/server/api/routers/auth/auth.types";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRPCClientError } from "@trpc/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardHeader } from "./ui/card";
import { toast } from "@/hooks/use-toast";

export default function ChangePasswordForm({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) {
  const [type, setType] = useState<"password" | "text">("password");

  const router = useRouter();

  const mutation = api.auth.changeResetPassword.useMutation();

  const form = useForm<ChangeResetPasswordSchema>({
    resolver: zodResolver(changeResetPasswordSchema),
    defaultValues: {
      resetId: id,
      userId,
    },
  });

  async function onSubmit(values: ChangeResetPasswordSchema) {
    try {
      await mutation.mutateAsync(values);

      toast({ title: "Success to change password, redirect to login page..." });

      router.push("/login");
    } catch (error) {
      if (error instanceof TRPCClientError)
        toast({ title: error.message, variant: "destructive" });
      else toast({ title: "Something went wrong", variant: "destructive" });
    }
  }

  return (
    <Card>
      <CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="relative w-full">
                    <FormControl>
                      <Input {...field} type={type} />
                    </FormControl>
                    <div
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                      onClick={() =>
                        setType((prev) =>
                          prev == "password" ? "text" : "password",
                        )
                      }
                    >
                      {type == "text" ? (
                        <Eye className="size-4" />
                      ) : (
                        <EyeOff className="size-4" />
                      )}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              Change password
            </Button>
          </form>
        </Form>
      </CardHeader>
    </Card>
  );
}
