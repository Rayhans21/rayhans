'use client'; // Wajib ditambahkan agar bisa mendeteksi rute (URL) saat ini

import { usePathname } from 'next/navigation';
// Pastikan impor Navbar/Footer kamu di bawah sini (sesuaikan dengan nama komponen aslimu)
// import Navbar from './Navbar';
// import Footer from './Footer';

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Daftarkan rute yang ingin dibersihkan dari Navbar dan Footer (untuk cetak PDF)
  const isPrintPage = pathname === '/porto' || pathname === '/resume';

  return (
    <>
      {/* Navbar hanya akan dirender JIKA bukan di halaman cetak */}
      {!isPrintPage && (
        <header>
          {/* Letakkan komponen Navbar-mu di sini */}
          {/* <Navbar /> */}
        </header>
      )}

      {/* Konten utama halaman (termasuk halaman porto & resume) */}
      <main>{children}</main>

      {/* Footer juga biasanya disembunyikan saat mencetak PDF */}
      {!isPrintPage && (
        <footer>
          {/* Letakkan komponen Footer-mu di sini */}
          {/* <Footer /> */}
        </footer>
      )}
    </>
  );
}
