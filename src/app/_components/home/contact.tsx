import { ExternalLinkIcon, InstagramIcon, MapPinIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import Whatsapp from "../../../../public/whatsapp-icon.svg";
import Link from "next/link";

export default function Contact() {
  return (
    <section id="contact" className="mx-10 mt-10 space-y-10 lg:mx-auto">
      <h2 className="text-center text-4xl font-bold">Kontak Kami</h2>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="flex items-center p-6">
            <MapPinIcon className="mr-4 h-10 w-10 flex-shrink-0 text-primary" />
            <div>
              <h3 className="mb-2 text-lg font-semibold">Alamat</h3>
              <p className="text-sm text-gray-500">
                BlunyahGede Rt09/RW33 Sinduadi, Mlati, Sleman, Daerah Istimewa
                Yogyakarta. 55284
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex h-full items-center p-6">
            <InstagramIcon className="mr-4 h-10 w-10 flex-shrink-0 text-primary" />
            <div>
              <h3 className="mb-2 text-lg font-semibold">Instagram</h3>
              <Link
                href="https://www.instagram.com/harjasmartgreen"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center hover:underline"
              >
                <span className="mr-1">@harjasmartgreen</span>
                <ExternalLinkIcon className="h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex h-full items-center p-6">
            <Whatsapp className="mr-4 h-10 w-10 flex-shrink-0 fill-primary" />
            <div>
              <h3 className="mb-2 text-lg font-semibold">Whatsapp</h3>
              <Link
                href="https://wa.me/qr/X6C7LXFX2N4TN1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center hover:underline"
              >
                <span className="mr-1">+62 895-4050-69792</span>
                <ExternalLinkIcon className="h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
