"use client";

import {
  signInSchema,
  type SignInSchema,
} from "@/server/api/routers/auth/auth.types";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRPCClientError } from "@trpc/client";
import { toast } from "@/hooks/use-toast";
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

export default function LoginForm() {
  const [type, setType] = useState<"password" | "text">("password");

  const router = useRouter();

  const mutation = api.auth.signIn.useMutation();

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  async function onSubmit(values: SignInSchema) {
    try {
      await mutation.mutateAsync(values);

      toast({ title: "Success to login, redirect to dashboard..." });
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
        <Button
          type="submit"
          className="w-full"
          disabled={mutation.isPending || mutation.isSuccess}
        >
          {mutation.isPending ? "Loading..." : "Login"}
        </Button>
      </form>
    </Form>
  );
}
