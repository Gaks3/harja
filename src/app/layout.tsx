import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "./_components/ui/toaster";
import { TooltipProvider } from "./_components/ui/tooltip";

export const metadata: Metadata = {
  title: {
    template: "%s | Harja",
    default: "Harja",
  },
  description:
    "Harja Smart Greenhouse menawarkan solusi greenhouse dengan teknologi otomatis. Sistem kami memantau kondisi tanaman secara real-time untuk meningkatkan efisiensi. Temukan cara cerdas menanam dan menghemat sumber daya dengan teknologi kami.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} scroll-smooth`}>
      <body>
        <TRPCReactProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
