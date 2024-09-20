export default function VisiMisi() {
  return (
    <section id="visi-misi" className="mx-10 mt-10 space-y-10 lg:mx-auto">
      <h2 className="text-center text-4xl font-bold">Visi dan Misi Kami</h2>
      <p className="!mt-2 text-center">
        Menjadikan Visi Kami Kenyataan dengan Misi yang Jelas
      </p>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-y-8 md:grid-cols-2">
        <div className="mx-auto max-w-sm space-y-2">
          <h3 className="text-center text-2xl font-semibold">Visi</h3>
          <p className="text-center">
            Menjadi penyedia solusi pertanian cerdas berbasis teknologi IoT
            terkemuka yang mendukung keberlanjutan, efisiensi, dan produktivitas
            pertanian modern di seluruh Indonesia.
          </p>
        </div>
        <div className="mx-auto max-w-md space-y-2">
          <h3 className="text-center text-2xl font-semibold">Misi</h3>
          <ul className="ml-5 list-disc">
            <li>Inovasi teknologi pertanian untuk semua skala usaha.</li>
            <li>
              Meningkatkan produktivitas dengan otomatisasi dan pemantauan
              real-time.
            </li>
            <li>Greenhouse ramah lingkungan dengan energi terbarukan.</li>
            <li>Solusi kustom sesuai kebutuhan lahan dan tanaman.</li>
            <li>Dukungan teknis, pelatihan, dan pemeliharaan optimal.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
