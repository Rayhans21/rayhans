'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase-verify';
import QRCode from 'qrcode';
import styles from './page.module.css';

const JENIS_SURAT = ['Surat Keterangan', 'Surat Tugas', 'Surat Perjanjian', 'Surat Kuasa', 'Surat Pernyataan', 'Surat Undangan', 'Surat Rekomendasi', 'Surat Balasan', 'Surat Pengantar', 'Surat Lainnya'];

export default function HomePage() {
  const [form, setForm] = useState({
    nomor_surat: '',
    judul_surat: '',
    jenis_surat: JENIS_SURAT[0],
    perihal: '',
    penerima: '',
    catatan: '',
    tanggal_ttd: new Date().toISOString().slice(0, 16),
  });
  const [loading, setLoading] = useState(false);
  const [qrUrl, setQrUrl] = useState('');
  const [suratId, setSuratId] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setQrUrl('');

    try {
      const { data, error: dbError } = await supabase
        .from('surat')
        .insert({
          nomor_surat: form.nomor_surat,
          judul_surat: form.judul_surat,
          jenis_surat: form.jenis_surat,
          perihal: form.perihal || null,
          penerima: form.penerima || null,
          catatan: form.catatan || null,
          tanggal_ttd: new Date(form.tanggal_ttd).toISOString(),
          penandatangan: 'Muhammad Rayhan Syah',
        })
        .select()
        .single();

      if (dbError) throw dbError;

      const verifyUrl = `${window.location.origin}/verify/${data.id}`;
      const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
        width: 300,
        margin: 2,
        color: { dark: '#0a1628', light: '#f8f5f0' },
        errorCorrectionLevel: 'H',
      });

      setQrUrl(qrDataUrl);
      setSuratId(data.id);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan. Cek koneksi Supabase.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = `qr-ttd-${form.nomor_surat.replace(/\//g, '-') || suratId}.png`;
    link.href = qrUrl;
    link.click();
  };

  const handleReset = () => {
    setQrUrl('');
    setSuratId('');
    setForm({
      nomor_surat: '',
      judul_surat: '',
      jenis_surat: JENIS_SURAT[0],
      perihal: '',
      penerima: '',
      catatan: '',
      tanggal_ttd: new Date().toISOString().slice(0, 16),
    });
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.monogram}>MRS</div>
          <div>
            <h1 className={styles.headerTitle}>Generator QR Tanda Tangan</h1>
            <p className={styles.headerSub}>Muhammad Rayhan Syah · Sistem Verifikasi Surat Digital</p>
          </div>
        </div>
      </header>

      <div className={styles.container}>
        {!qrUrl ? (
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>✦</span>
              <h2 className={styles.cardTitle}>Input Data Surat</h2>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.row2}>
                <div className={styles.field}>
                  <label className={styles.label}>
                    Nomor Surat <span className={styles.req}>*</span>
                  </label>
                  <input name='nomor_surat' value={form.nomor_surat} onChange={handleChange} required placeholder='001/MRS/VI/2025' className={styles.input} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>
                    Jenis Surat <span className={styles.req}>*</span>
                  </label>
                  <select name='jenis_surat' value={form.jenis_surat} onChange={handleChange} className={styles.input}>
                    {JENIS_SURAT.map((j) => (
                      <option key={j} value={j}>
                        {j}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>
                  Judul / Hal Surat <span className={styles.req}>*</span>
                </label>
                <input name='judul_surat' value={form.judul_surat} onChange={handleChange} required placeholder='Surat Keterangan Domisili atas nama ...' className={styles.input} />
              </div>

              <div className={styles.row2}>
                <div className={styles.field}>
                  <label className={styles.label}>Perihal</label>
                  <input name='perihal' value={form.perihal} onChange={handleChange} placeholder='Permohonan data kependudukan' className={styles.input} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Ditujukan Kepada</label>
                  <input name='penerima' value={form.penerima} onChange={handleChange} placeholder='PT. Contoh Indonesia' className={styles.input} />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>
                  Tanggal & Waktu Tanda Tangan <span className={styles.req}>*</span>
                </label>
                <input type='datetime-local' name='tanggal_ttd' value={form.tanggal_ttd} onChange={handleChange} required className={styles.input} />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Catatan (opsional)</label>
                <textarea name='catatan' value={form.catatan} onChange={handleChange} placeholder='Catatan tambahan tentang surat ini...' className={styles.textarea} rows={3} />
              </div>

              {error && <p className={styles.error}>⚠ {error}</p>}

              <div className={styles.signatureBlock}>
                <p className={styles.signatureLabel}>Penandatangan</p>
                <p className={styles.signatureName}>Muhammad Rayhan Syah</p>
              </div>

              <button type='submit' disabled={loading} className={styles.btnPrimary}>
                {loading ? 'Menyimpan...' : '✦ Generate QR Tanda Tangan'}
              </button>
            </form>
          </div>
        ) : (
          <div className={styles.resultWrap}>
            <div className={styles.successBadge}>✓ Tanda tangan berhasil didaftarkan</div>

            <div className={styles.qrCard}>
              <div className={styles.qrHeader}>
                <p className={styles.qrLabel}>Scan untuk verifikasi</p>
                <h2 className={styles.qrTitle}>{form.judul_surat}</h2>
                <p className={styles.qrNomor}>{form.nomor_surat}</p>
              </div>

              <div className={styles.qrImageWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qrUrl} alt='QR Code Tanda Tangan' className={styles.qrImage} />
              </div>

              <div className={styles.qrFooter}>
                <p className={styles.qrSigner}>Muhammad Rayhan Syah</p>
                <p className={styles.qrDate}>
                  {new Date(form.tanggal_ttd).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
                <p className={styles.qrId}>ID: {suratId}</p>
              </div>
            </div>

            <div className={styles.actionRow}>
              <button onClick={handleDownload} className={styles.btnPrimary}>
                ↓ Unduh QR Code (PNG)
              </button>
              <button onClick={handleReset} className={styles.btnSecondary}>
                + Buat Surat Baru
              </button>
            </div>

            <p className={styles.hint}>Tempelkan QR ini pada surat fisik Anda. Siapapun yang scan akan diarahkan ke halaman verifikasi digital.</p>
          </div>
        )}
      </div>
    </main>
  );
}
