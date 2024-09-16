"use client";

import { toast } from "@/hooks/use-toast";
import {
  changePasswordSchema,
  type ChangePasswordSchema,
} from "@/server/api/routers/auth/auth.types";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRPCClientError } from "@trpc/client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useState } from "react";
import { type InputPasswordType } from "../register-form";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";

export default function UpdateUserPassword() {
  const [type, setType] = useState<InputPasswordType>({
    password: "password",
    confirm: "password",
  });

  const mutation = api.auth.changePassword.useMutation();

  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (values: ChangePasswordSchema) => {
    try {
      await mutation.mutateAsync(values);

      toast({ title: "Success to change password" });
    } catch (error) {
      if (error instanceof TRPCClientError)
        toast({ title: error.message, variant: "destructive" });
      else toast({ title: "Something went wrong", variant: "destructive" });
    }
  };

  return (
    <div className="rounded-lg border bg-background p-6">
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex w-full flex-col gap-3 md:flex-row md:gap-10">
            <div className="basis-1/3 space-y-2">
              <h3 className="text-xl font-semibold">Change Password</h3>
              <p className="text-balance text-sm text-gray-400">
                Time for a password change? Enhance your security with a new,
                stronger password.
              </p>
            </div>
            <div className="flex grow flex-col gap-y-5">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className="relative w-full">
                      <FormControl>
                        <Input {...field} type={type.password} />
                      </FormControl>
                      <div
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={() =>
                          setType((prev) => ({
                            ...prev,
                            password:
                              prev.password == "password" ? "text" : "password",
                          }))
                        }
                      >
                        {type.password == "text" ? (
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
                    <FormLabel>Confirm Password</FormLabel>
                    <div className="relative w-full">
                      <FormControl>
                        <Input {...field} type={type.confirm} />
                      </FormControl>
                      <div
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={() =>
                          setType((prev) => ({
                            ...prev,
                            confirm:
                              prev.confirm == "password" ? "text" : "password",
                          }))
                        }
                      >
                        {type.confirm == "text" ? (
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
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={mutation.isPending || mutation.isSuccess}
            >
              {mutation.isPending ? "Loading..." : "Save changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
