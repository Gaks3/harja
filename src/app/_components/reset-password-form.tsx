"use client";

import { api } from "@/trpc/react";
import { Card, CardHeader } from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRPCClientError } from "@trpc/client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";

const schema = z.object({
  email: z.string().email(),
});

type Schema = z.infer<typeof schema>;

export default function ResetPasswordForm() {
  const getUserByEmail = api.auth.getByEmail.useMutation();
  const mutation = api.auth.resetPassword.useMutation();

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: Schema) {
    try {
      const email = await getUserByEmail.mutateAsync(values.email);
      if (!email)
        return form.setError("email", { message: "Email not registered" });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const tokenReCaptcha = recaptchaRef.current?.getValue();
      if (!tokenReCaptcha)
        return toast({ title: "ReCaptcha not valid", variant: "destructive" });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      await mutation.mutateAsync({ userId: email.id, captcha: tokenReCaptcha });

      toast({ title: "Please check your email" });
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Enter your user account&apos;s verified email address and we
                    will send you a password reset link.
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ReCAPTCHA
              ref={recaptchaRef}
              size="normal"
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              Send password reset email
            </Button>
          </form>
        </Form>
      </CardHeader>
    </Card>
  );
}
