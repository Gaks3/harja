import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Panduan",
  description: "Panduan Penggunaan Alat di Harja Smart Green",
};

export default function UserGuide() {
  return (
    <main className="mx-auto max-w-5xl space-y-5 px-10 lg:px-0">
      <h1 className="pt-32 text-4xl font-bold">
        Panduan Penggunaan Alat di Harja Smart Green
      </h1>
      <ol className="ml-5 space-y-5">
        <li className="list-[upper-roman] text-2xl">
          <h2 className="text-2xl font-semibold">
            Membuat Akun di Website Harja Smart Green
          </h2>
          <p className="text-base">
            Ikuti langkah-langkah berikut untuk membuat akun dan mendapatkan
            token :
          </p>
          <ol className="ml-5 list-decimal text-base">
            <li>
              <h3>Daftar atau Login</h3>
              Buka website{" "}
              <Link href={"/"} className="text-blue-500 hover:underline">
                harjasmartgreen.com
              </Link>{" "}
              melalui browser. Jika belum mempunyai akun, silahkan{" "}
              <Link
                href={"/register"}
                className="text-blue-500 hover:underline"
              >
                Daftar
              </Link>{" "}
              terlebih dahulu. Jika sudah punya akun,{" "}
              <Link href={"/login"} className="text-blue-500 hover:underline">
                Login
              </Link>{" "}
              menggunakan username dan password Anda.
            </li>
            <li>
              <h3>Buat Alat Baru</h3>
              <p>
                Setelah berhasil login, klik tombol &quot;Create New Tool&quot;
                atau &quot;Buat Alat Baru&quot;.
              </p>
            </li>
            <li>
              <h3>Masukkan Nama Alat</h3>
              <p>
                Beri nama alat sesuai keinginan Anda (misalnya: &quot;Alat
                Rumahku&quot;).
              </p>
            </li>
            <li>
              <h3>Pilih Alat yang Dibuat</h3>
              <p>
                Setelah alat berhasil dibuat, klik alat tersebut untuk masuk ke
                halaman konfigurasi.
              </p>
            </li>
            <li>
              <h3>Salin Token</h3>
              <p>
                Di halaman alat, temukan bagian Token dan salin kode token
                tersebut. Token ini akan digunakan untuk menghubungkan alat ke
                WiFi.
              </p>
            </li>
          </ol>
        </li>
        <li className="list-[upper-roman] text-2xl">
          <h2 className="text-2xl font-semibold">
            Mengonfigurasi Alat dan Menghubungkan ke WiFi
          </h2>
          <p className="text-base">
            Ikuti langkah-langkah berikut untuk membuat akun dan mendapatkan
            token :
          </p>
          <ol className="ml-5 list-decimal text-base">
            <li>
              <h3>Sambungkan ke WiFi &quot;ESP_Config&quot;</h3>
              <p>
                Pada smartphone, buka pengaturan WiFi dan sambungkan ke jaringan
                WiFi bernama &quot;ESP_Config&quot;. Jika diminta memasukkan
                password, ketik &quot;12345678&quot;.
              </p>
            </li>
            <li>
              <h3>Buka Halaman Konfigurasi</h3>
              <p>
                Setelah tersambung, buka browser di smartphone Anda (seperti
                Chrome atau Safari). Akses halaman konfigurasi dengan
                mengetikkan alamat ini di kolom pencarian: 192.168.4.1.
              </p>
            </li>
            <li>
              <h3>Masukkan Informasi WiFi</h3>
              <p>
                Di halaman yang terbuka, masukkan nama WiFi rumah Anda, password
                WiFi, serta <strong>token</strong> yang sudah Anda salin dari
                website.
              </p>
            </li>
            <li>
              <h3>Sukses Menghubungkan</h3>
              <p>
                Jika koneksi berhasil, jaringan WiFi &quot;ESP_Config&quot; akan
                terputus secara otomatis. Ini menandakan alat sudah terhubung ke
                WiFi rumah Anda.
              </p>
            </li>
            <li>
              <h3>Jika Gagal</h3>
              <p>
                Jika jaringan WiFi &quot;ESP_Config&quot; masih ada, kemungkinan
                nama WiFi atau password yang Anda masukkan salah. Ulangi
                langkah-langkah di atas dan pastikan informasi yang dimasukkan
                benar.
              </p>
            </li>
          </ol>
        </li>
      </ol>
      <h2 className="mt-10 text-xl font-bold">
        Sekarang alat Anda sudah terhubung dan siap digunakan!
      </h2>
    </main>
  );
}
