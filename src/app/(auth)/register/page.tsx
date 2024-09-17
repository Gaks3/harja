import RegisterForm from "@/app/_components/register-form";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Register",
  description: "Get features from us by simply creating an account",
};

export default function RegisterPage() {
  return (
    <div className="h-screen w-full lg:grid lg:grid-cols-2">
      <div className="sticky hidden max-h-screen min-h-screen items-center justify-center bg-primary lg:flex">
        <Image
          src="/logo-white.png"
          alt="Logo Harja"
          width="1920"
          height="1080"
          className="max-w-[200px] dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex h-full items-center justify-center overflow-x-auto px-5 py-12 md:px-3 lg:px-0">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Register</h1>
            <p className="text-muted-foreground">
              Get features from us by simply creating an account
            </p>
          </div>
          <RegisterForm />
          <div className="mt-2 space-x-2 text-center text-sm">
            <span>Already have an account?</span>
            <Link
              href={"/login"}
              className="ml-auto inline-block text-sm font-semibold underline"
            >
              Login here.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
