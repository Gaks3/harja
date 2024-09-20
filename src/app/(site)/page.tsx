import type { Metadata } from "next";
import Hero from "@/app/_components/home/hero";
import VisiMisi from "@/app/_components/home/visi-misi";
import Benefits from "@/app/_components/home/benefits";
import Workflow from "@/app/_components/home/workflow";
import Contact from "@/app/_components/home/contact";

export const metadata: Metadata = {
  title: "Beranda",
  description:
    "Harja Smart Greenhouse menawarkan solusi greenhouse dengan teknologi otomatis. Sistem kami memantau kondisi tanaman secara real-time untuk meningkatkan efisiensi. Temukan cara cerdas menanam dan menghemat sumber daya dengan teknologi kami.",
};

export default async function Home() {
  return (
    <>
      <Hero />
      <h2 className="mx-5 mb-56 text-center text-4xl font-bold md:text-5xl">
        &quot;Bersama Kami Bangkitkan Pertanian Modern&quot;
      </h2>
      <VisiMisi />
      <Benefits />
      <Workflow />
      <Contact />
    </>
  );
}
