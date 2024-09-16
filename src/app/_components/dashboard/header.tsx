"use client";

import { HistoryIcon, HomeIcon, PanelLeft, WrenchIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { usePathname } from "next/navigation";
import { type User } from "lucia";
import UserHeader from "./user-header";
import { Fragment } from "react";

export default function Header({ user }: { user: User }) {
  const pathname = usePathname().slice(1).split("/");

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <HomeIcon className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Home Page</span>
            </Link>
            <Link
              href="/dashboard/tools"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <WrenchIcon className="h-5 w-5" />
              Tools
            </Link>
            <Link
              href="/dashboard/history"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <HistoryIcon className="h-5 w-5" />
              History
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">
                <HomeIcon className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">Home Page</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {pathname.map((value, index) => {
            return (
              <Fragment key={index}>
                {index !== pathname.length - 1 ? (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link
                          className="capitalize"
                          href={`/${index == 0 ? value : pathname.slice(0, index).join("/")}`}
                        >
                          {value}
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </>
                ) : (
                  <BreadcrumbItem key={index}>
                    <BreadcrumbPage className="capitalize">
                      {value}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                )}
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <UserHeader user={user} />
    </header>
  );
}
