import {
  BrushIcon,
  CpuIcon,
  HeadsetIcon,
  LayoutGridIcon,
  LightbulbIcon,
  PackageIcon,
  RefreshCcwIcon,
} from "lucide-react";
import type { Props } from "./benefit";
import Benefit from "./benefit";

const listBenefit: Props[] = [
  {
    Icon: CpuIcon,
    title: "Teknologi IoT",
    description:
      "Kami mengintegrasikan teknologi IoT (Internet of Things) dalam setiap solusi, memungkinkan pengawasan dan pengendalian dari mana saja secara real-time.",
  },
  {
    Icon: RefreshCcwIcon,
    title: "Sistem Pengendalian Otomatis",
    description:
      "Dengan sistem otomatisasi, kami memastikan operasional yang efisien dan minim intervensi manual, memberikan kemudahan dan efektivitas.",
  },
  {
    Icon: PackageIcon,
    title: "Paket Sistem yang Dapat Dijual Terpisah",
    description:
      "Kami menawarkan paket solusi yang fleksibel, dapat disesuaikan dan dijual secara terpisah sesuai kebutuhan Anda.",
  },
  {
    Icon: BrushIcon,
    title: "Desain Custom",
    description:
      "Setiap solusi kami dirancang sesuai dengan kebutuhan spesifik klien, memberikan hasil yang lebih personal dan tepat guna.",
  },
  {
    Icon: LightbulbIcon,
    title: "Lampu LED",
    description:
      "Kami menggunakan teknologi lampu LED hemat energi yang tahan lama, ideal untuk berbagai aplikasi industri dan rumah tangga.",
  },
  {
    Icon: LayoutGridIcon,
    title: "Panel Surya",
    description:
      "Solusi energi terbarukan dengan panel surya berkualitas tinggi, membantu mengurangi jejak karbon dan menekan biaya energi.",
  },
  {
    Icon: HeadsetIcon,
    title: "Dukungan Teknis dan Pemeliharaan",
    description:
      "Kami menyediakan layanan dukungan teknis lengkap dan pemeliharaan berkala untuk memastikan sistem tetap berfungsi optimal sepanjang waktu.",
  },
];

export default function Benefits() {
  return (
    <section className="mt-20 space-y-10 bg-primary bg-gradient-to-r from-[#17884f] via-[#188653] to-[#25c481] py-32 text-primary-foreground">
      <div className="mx-10 max-w-4xl space-y-2 lg:mx-auto">
        <h2 className="text-center text-4xl font-semibold">
          Mengapa Memilih Kami?
        </h2>
        <p className="text-center">
          Menjadi penyedia solusi pertanian cerdas berbasis teknologi IoT
          terkemuka yang mendukung keberlanjutan, efisiensi, dan produktivitas
          pertanian modern.
        </p>
        <div className="!mt-14 grid grid-cols-1 gap-x-10 gap-y-5 lg:grid-cols-2">
          {listBenefit.map(({ Icon, description, title }, index) => (
            <Benefit
              key={index}
              Icon={Icon}
              title={title}
              description={description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
