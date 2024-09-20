import Image from "next/image";

export default function Workflow() {
  return (
    <section id="workflow" className="mx-10 mt-20 space-y-10 lg:mx-auto">
      <h2 className="text-center text-4xl font-bold">Cara Kerja Kami</h2>
      <div className="mx-auto max-w-5xl space-y-10 lg:space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-52">
            <Image
              src={"/farmer2.jpeg"}
              alt="Farmer"
              fill
              className="object-cover lg:object-contain"
            />
          </div>
          <div className="space-y-3 py-3 lg:py-10">
            <h3 className="text-xl font-semibold">
              Otomatisasi dan Pemantauan
            </h3>
            <p>
              Otomatisasi dan pemantauan dalam sistem berbasis IoT untuk
              pertanian cerdas, seperti pada smart greenhouse, memungkinkan
              pengontrolan kondisi lingkungan secara otomatis, termasuk suhu,
              kelembapan, dan pencahayaan. Sensor-sensor yang terhubung akan
              memantau data secara real-time dan mengirimkannya ke website.
              Dengan pemantauan yang berkelanjutan, pengguna dapat memantau
              status lingkungan dan kondisi greenhouse melalui website atau
              dashboard IoT.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="space-y-3 py-3 lg:py-10">
            <h3 className="text-xl font-semibold">Desain Kustom</h3>
            <p>
              Desain kustom greenhouse memungkinkan penyesuaian struktur sesuai
              dengan ukuran lahan, jenis tanaman yang dibudidayakan, serta
              kebutuhan spesifik pelanggan. Setiap elemen, mulai dari dimensi
              fisik, bahan bangunan, hingga sistem irigasi, dirancang untuk
              mengoptimalkan kondisi pertumbuhan tanaman dan efisiensi
              penggunaan lahan. Dengan pendekatan ini, greenhouse tidak hanya
              berfungsi sebagai tempat menanam, tetapi juga dapat memberikan
              solusi pertanian yang lebih efektif dan berkelanjutan.
            </p>
          </div>
          <div className="relative -order-1 min-h-52 lg:order-2">
            <Image
              src={"/architect.jpeg"}
              alt="Architect"
              fill
              className="object-cover lg:object-contain"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="relative min-h-52">
            <Image
              src={"/solar-panel2.jpeg"}
              alt="Solar Panel"
              fill
              className="object-cover lg:object-contain"
            />
          </div>
          <div className="space-y-3 py-3 lg:py-10">
            <h3 className="text-xl font-semibold">Energi Terbarukan</h3>
            <p>
              Penggunaan energi terbarukan dalam greenhouse sangat penting untuk
              mendukung keberlanjutan lingkungan. Dengan memanfaatkan energi
              matahari, biaya operasional dapat ditekan secara signifikan karena
              ketergantungan terhadap energi fosil berkurang. Selain itu,
              penggunaan panel surya membantu mengurangi jejak karbon, mendukung
              upaya global dalam menghadapi perubahan iklim. Sistem ini juga
              berfungsi secara mandiri, mengurangi kebutuhan jaringan listrik
              eksternal.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="space-y-3 py-3 lg:py-10">
            <h3 className="text-xl font-semibold">Paket Sistem Otomatisasi</h3>
            <p>
              Paket sistem otomatisasi dikirim langsung ke lokasi pelanggan
              dengan semua komponen yang dibutuhkan. Setiap paket dilengkapi
              dengan sensor, perangkat pengontrol, dan modul pemantauan yang
              siap dipasang. Untuk memudahkan instalasi, disertakan juga panduan
              penggunaan yang detail dan mudah dipahami. Sistem ini dirancang
              agar pelanggan dapat langsung mengatur pengendalian otomatis untuk
              suhu, kelembapan, pencahayaan, dan irigasi. Selain itu, dukungan
              teknis tersedia jika diperlukan bantuan lebih lanjut.
            </p>
          </div>
          <div className="relative -order-1 min-h-52 lg:order-2">
            <Image
              src={"/meeting.jpeg"}
              alt="Meeting"
              fill
              className="object-cover lg:object-contain"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="relative min-h-52">
            <Image
              src={"/technician.jpeg"}
              alt="Technician"
              fill
              className="object-cover lg:object-contain"
            />
          </div>
          <div className="space-y-3 py-3 lg:py-10">
            <h3 className="text-xl font-semibold">
              Dukungan Teknis dan Pemeliharaan
            </h3>
            <p>
              Kami menyediakan dukungan teknis lengkap untuk memastikan sistem
              beroperasi dengan optimal. Pelatihan pengguna dilakukan untuk
              mengenalkan fitur-fitur sistem dan cara penggunaannya. Selain itu,
              kami juga menawarkan pemeliharaan rutin untuk memeriksa dan
              memperbaiki komponen yang diperlukan. Dengan pemeliharaan ini,
              masalah dapat diidentifikasi dan diatasi sebelum berkembang
              menjadi isu yang lebih besar. Tim dukungan kami siap membantu
              pelanggan melalui konsultasi dan layanan teknis. Dengan demikian,
              pelanggan dapat fokus pada pertumbuhan tanaman tanpa khawatir
              tentang gangguan teknis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
