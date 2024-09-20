import { InstagramIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Whatsapp from "../../../../public/whatsapp-icon.svg";

export default function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="flex items-center justify-center gap-x-3">
            <Image src={"/logo-green.png"} alt="Logo" width={30} height={30} />
            <span className="text-sm font-semibold">
              Harja Smart Greenhouse
            </span>
          </div>
          <p className="mx-auto mt-5 max-w-80 text-center text-sm">
            BlunyahGede Rt09/RW33 Sinduadi, Mlati, Sleman, Daerah Istimewa
            Yogyakarta. 55284
          </p>
          <nav className="mt-10 text-sm" aria-label="quick links">
            <div className="-my-1 mx-10 flex flex-wrap items-center gap-x-6 md:mx-0 md:justify-center">
              <Link
                className="inline-block basis-1/2 rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 md:basis-auto"
                href="/#visi-misi"
              >
                Visi Misi
              </Link>
              <Link
                className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                href="/#benefits"
              >
                Keunggulan
              </Link>
              <Link
                className="inline-block basis-1/2 rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 md:basis-auto"
                href="/#workflow"
              >
                Cara Kerja
              </Link>
              <Link
                className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                href="/#contact"
              >
                Kontak
              </Link>
              <Link
                className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                href="/panduan"
              >
                Panduan
              </Link>
            </div>
          </nav>
        </div>
        <div className="flex flex-col items-center border-t border-slate-400/20 py-10 sm:flex-row-reverse sm:justify-between">
          <div className="flex gap-x-6">
            <Link
              href={"https://www.instagram.com/harjasmartgreen/"}
              className="group transition-colors duration-200"
            >
              <InstagramIcon className="size-6 stroke-slate-500 stroke-2 group-hover:stroke-slate-700" />
            </Link>
            <Link
              href={"https://wa.me/qr/X6C7LXFX2N4TN1"}
              className="group transition-colors duration-200"
            >
              <Whatsapp className="size-6 fill-slate-500 stroke-2 group-hover:fill-slate-700" />
            </Link>
          </div>
          <p className="mt-6 text-center text-sm text-slate-500 sm:mt-0">
            Copyright © 2024 Harja Smart Greenhouse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
