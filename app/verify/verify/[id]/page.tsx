import { supabase, Surat } from '@/lib/supabase-verify';
import styles from './verify.module.css';
import { notFound } from 'next/navigation';

function formatTanggal(iso: string) {
  return (
    new Date(iso).toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Jakarta',
    }) + ' WIB'
  );
}

function formatTanggalSingkat(iso: string) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  });
}

async function getSurat(id: string): Promise<Surat | null> {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) return null;

  const { data, error } = await supabase.from('surat').select('*').eq('id', id).single();

  if (error || !data) return null;
  return data as Surat;
}

export default async function VerifyPage({ params }: { params: { id: string } }) {
  const surat = await getSurat(params.id);

  if (!surat) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Header verifikasi */}
        <div className={styles.verifyBanner}>
          <div className={styles.verifyIconWrap}>
            <svg width='32' height='32' viewBox='0 0 32 32' fill='none'>
              <circle cx='16' cy='16' r='15' stroke='#c9a84c' strokeWidth='1.5' />
              <path d='M9 16.5L13.5 21L23 11' stroke='#c9a84c' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </div>
          <div>
            <p className={styles.verifyLabel}>Dokumen Terverifikasi</p>
            <p className={styles.verifySubLabel}>Tanda tangan digital sah & terdaftar di sistem</p>
          </div>
        </div>

        {/* Detail surat */}
        <div className={styles.suratCard}>
          <div className={styles.suratHeader}>
            <div className={styles.jenisBadge}>{surat.jenis_surat}</div>
            <h1 className={styles.suratJudul}>{surat.judul_surat}</h1>
            <p className={styles.suratNomor}>No. {surat.nomor_surat}</p>
          </div>

          <div className={styles.suratBody}>
            {surat.perihal && (
              <div className={styles.row}>
                <span className={styles.rowLabel}>Perihal</span>
                <span className={styles.rowValue}>{surat.perihal}</span>
              </div>
            )}
            {surat.penerima && (
              <div className={styles.row}>
                <span className={styles.rowLabel}>Kepada</span>
                <span className={styles.rowValue}>{surat.penerima}</span>
              </div>
            )}
            <div className={styles.row}>
              <span className={styles.rowLabel}>Tanggal Surat</span>
              <span className={styles.rowValue}>{formatTanggalSingkat(surat.tanggal_ttd)}</span>
            </div>
            {surat.catatan && (
              <div className={styles.row}>
                <span className={styles.rowLabel}>Catatan</span>
                <span className={styles.rowValue}>{surat.catatan}</span>
              </div>
            )}
          </div>
        </div>

        {/* Blok tanda tangan */}
        <div className={styles.ttdCard}>
          <div className={styles.ttdLeft}>
            <p className={styles.ttdTopLabel}>Ditandatangani secara digital oleh</p>
            <div className={styles.ttdMonogram}>MRS</div>
          </div>
          <div className={styles.ttdRight}>
            <p className={styles.ttdNama}>{surat.penandatangan}</p>
            <p className={styles.ttdWaktu}>{formatTanggal(surat.tanggal_ttd)}</p>
            <div className={styles.ttdValidBadge}>
              <span className={styles.ttdDot}></span>
              Tanda tangan sah & valid
            </div>
          </div>
        </div>

        {/* ID dokumen */}
        <div className={styles.idBlock}>
          <p className={styles.idLabel}>ID Dokumen</p>
          <p className={styles.idValue}>{surat.id}</p>
          <p className={styles.idDesc}>Didaftarkan pada {formatTanggal(surat.created_at)}</p>
        </div>

        <div className={styles.watermark}>
          <p>rayhans.vercel.app · Sistem Verifikasi Surat Digital</p>
          <p>Muhammad Rayhan Syah</p>
        </div>
      </div>
    </main>
  );
}

export const dynamic = 'force-dynamic';
