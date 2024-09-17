"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AlignJustifyIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import type { User } from "lucia";
import UserHeader from "../dashboard/user-header";

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
            <span className="sr-only">Harja</span>
            <Image
              width={32}
              height={32}
              alt={"/logo-green.png"}
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
            Home
          </Link>
          <Link
            href="#about"
            className="text-sm font-semibold leading-6 text-black hover:underline"
          >
            About
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
            Contact
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {!user ? (
            <Link
              href="/login"
              className="rounded-md bg-[#188753] px-[18px] py-[7px] text-sm font-semibold leading-6 text-white hover:bg-[#145d40]"
            >
              Log in
            </Link>
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
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
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
                    Home
                  </Link>
                  <Link
                    href="#about"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    About
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
                  <div className="flex py-6">
                    <Link
                      href="/login"
                      className="-mx-3 flex w-full items-center rounded-lg bg-primary p-5 px-3 py-2.5 text-base font-semibold leading-7 text-primary-foreground transition-colors duration-300 hover:bg-primary/90"
                    >
                      Log in
                    </Link>
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
