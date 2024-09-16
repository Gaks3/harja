import LoginForm from "@/app/_components/login-form";
import Link from "next/link";
import Image from "next/image";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login your account to access dashboard",
};

export default async function LoginPage() {
  return (
    <div className="h-screen w-full lg:grid lg:grid-cols-2">
      <div className="flex h-full items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email to access dashboard
            </p>
          </div>
          <LoginForm />
          <div className="mt-2 text-center text-sm">
            <Link
              href={"/reset-password"}
              className="ml-auto inline-block text-sm font-semibold underline"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="mt-4 space-x-2 text-center text-sm">
            <span>Don&apos;t have an account?</span>
            <Link
              href={"/register"}
              className="ml-auto inline-block text-sm font-semibold underline"
            >
              Register for Harja.
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden items-center justify-center bg-muted lg:flex">
        <Image
          src="/logo-green.png"
          alt="Logo Harja"
          width="1920"
          height="1080"
          className="max-w-[200px] dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
