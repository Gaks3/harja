import type { Metadata } from "next";
import Hero from "./_components/home/hero";
import Navbar from "./_components/home/navbar";
import { validateRequest } from "@/server/auth";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Harja Smart Greenhouse menawarkan solusi greenhouse dengan teknologi otomatis. Sistem kami memantau kondisi tanaman secara real-time untuk meningkatkan efisiensi. Temukan cara cerdas menanam dan menghemat sumber daya dengan teknologi kami.",
};

export default async function Home() {
  const validate = await validateRequest();

  return (
    <>
      <Navbar user={validate.user} />
      <Hero />
    </>
  );
}
