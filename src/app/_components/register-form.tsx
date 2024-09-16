"use client";

import { toast } from "@/hooks/use-toast";
import {
  registerSchema,
  type RegisterSchema,
} from "@/server/api/routers/auth/auth.types";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRPCClientError } from "@trpc/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";

export type InputType = "password" | "text";

export type InputPasswordType = {
  password: InputType;
  confirm: InputType;
};

export default function RegisterForm() {
  const [type, setType] = useState<InputPasswordType>({
    password: "password",
    confirm: "password",
  });

  const router = useRouter();

  const mutation = api.auth.register.useMutation();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(values: RegisterSchema) {
    try {
      await mutation.mutateAsync(values);

      toast({ title: "Success to register, redirect to dashboard..." });
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof TRPCClientError)
        toast({ title: error.message, variant: "destructive" });
      else toast({ title: "Something went wrong", variant: "destructive" });
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-5">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type={"email"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                      confirm: prev.confirm == "password" ? "text" : "password",
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
        <Button
          type="submit"
          className="w-full"
          disabled={mutation.isPending || mutation.isSuccess}
        >
          {mutation.isPending ? "Loading..." : "Register"}
        </Button>
      </form>
    </Form>
  );
}
