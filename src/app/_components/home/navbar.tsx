"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AlignJustifyIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import type { User } from "lucia";
import UserHeader from "../dashboard/user-header";
import { Button } from "../ui/button";

export default function Navbar({ user }: { user?: User | null }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <header className="translate-3d-custom sticky top-0 z-40 w-full transform transition duration-300 ease-in-out">
      <div
        className={cn(
          "absolute inset-0 h-20 w-full",
          scrolled
            ? "bg-white bg-opacity-75 shadow-md backdrop-blur-lg"
            : "bg-transparent",
        )}
      ></div>
      <nav className="absolute inset-4 z-40 mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Harja Smart Greenhouse</span>
            <Image
              width={32}
              height={32}
              alt={"Logo Harja Smart Greenhouse"}
              src={"/logo-green.png"}
              className="h-8 w-auto"
            />
          </Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            href="/"
            className="text-sm font-semibold leading-6 text-black hover:underline"
          >
            Beranda
          </Link>
          <Link
            href="#visi-misi"
            className="text-sm font-semibold leading-6 text-black hover:underline"
          >
            Visi Misi
          </Link>
          {user && (
            <Link
              href="/dashboard"
              className="text-sm font-semibold leading-6 text-black hover:underline"
            >
              Dashboard
            </Link>
          )}
          <Link
            href="#contact"
            className="text-sm font-semibold leading-6 text-black hover:underline"
          >
            Kontak
          </Link>
        </div>
        <div className="hidden gap-x-3 lg:flex lg:flex-1 lg:justify-end">
          {!user ? (
            <>
              <Button asChild variant={"outline"}>
                <Link href="/login" className="">
                  Masuk
                </Link>
              </Button>
              <Button asChild>
                <Link href="/register" className="">
                  Daftar
                </Link>
              </Button>
            </>
          ) : (
            <UserHeader user={user} />
          )}
        </div>
        <Sheet>
          <div className="flex gap-3 lg:hidden">
            <SheetTrigger
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <AlignJustifyIcon aria-hidden="true" className="h-6 w-6" />
            </SheetTrigger>
          </div>
          <SheetContent>
            <div className="mt-6 flow-root h-full">
              <div className="-my-6 flex h-full flex-col justify-between divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {user && (
                    <div className="flex w-full flex-col items-center justify-center gap-y-2 lg:hidden">
                      <UserHeader user={user} className="ml-0" size="lg" />
                      <span className="text-lg font-semibold">
                        {user.firstName}
                      </span>
                    </div>
                  )}
                  <Link
                    href="/"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Beranda
                  </Link>
                  <Link
                    href="#about"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Visi Misi
                  </Link>
                  {user && (
                    <Link
                      href="/dashboard"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link
                    href="#contact"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Contact
                  </Link>
                </div>
                {!user && (
                  <div className="flex flex-col gap-y-3 py-6">
                    <Button variant={"outline"} asChild>
                      <Link href={"/login"}>Masuk</Link>
                    </Button>
                    <Button asChild>
                      <Link href={"/register"}>Register</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
