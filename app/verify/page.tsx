'use client';

import { useRef, useState } from 'react';
import { getVerifySupabase } from '@/lib/supabase-verify';
import { attachSuratPdf, validatePdfFile } from '@/lib/verify-pdf';
import { getVerifyPublicUrl } from '@/lib/verify-url';
import type { Surat } from '@/lib/supabase-verify';
import QRCode from 'qrcode';
import styles from './page.module.css';

const JENIS_SURAT = ['Surat Keterangan', 'Surat Penawaran', 'Surat Tugas', 'Surat Perjanjian', 'Surat Kuasa', 'Surat Pernyataan', 'Surat Undangan', 'Surat Rekomendasi', 'Surat Balasan', 'Surat Pengantar', 'Surat Lainnya'];

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function buildQrDataUrl(suratId: string) {
  return QRCode.toDataURL(getVerifyPublicUrl(suratId), {
    width: 300,
    margin: 2,
    color: { dark: '#0a1628', light: '#f8f5f0' },
    errorCorrectionLevel: 'H',
  });
}

function suratToForm(surat: Surat) {
  const tanggal = new Date(surat.tanggal_ttd);
  const pad = (n: number) => String(n).padStart(2, '0');
  const tanggal_ttd = `${tanggal.getFullYear()}-${pad(tanggal.getMonth() + 1)}-${pad(tanggal.getDate())}T${pad(tanggal.getHours())}:${pad(tanggal.getMinutes())}`;
  return {
    nomor_surat: surat.nomor_surat,
    judul_surat: surat.judul_surat,
    jenis_surat: surat.jenis_surat,
    perihal: surat.perihal ?? '',
    penerima: surat.penerima ?? '',
    catatan: surat.catatan ?? '',
    tanggal_ttd,
  };
}

function formatError(err: unknown): string {
  if (err && typeof err === 'object' && 'message' in err && typeof (err as { message: unknown }).message === 'string') {
    return (err as { message: string }).message;
  }
  if (err instanceof Error) return err.message;
  return 'Terjadi kesalahan. Cek koneksi Supabase.';
}

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

  const [latePdfFile, setLatePdfFile] = useState<File | null>(null);
  const [pdfUploading, setPdfUploading] = useState(false);
  const [pdfUploaded, setPdfUploaded] = useState(false);
  const [pdfUploadError, setPdfUploadError] = useState('');
  const latePdfInputRef = useRef<HTMLInputElement>(null);

  const [existingSuratId, setExistingSuratId] = useState('');
  const [existingPdfFile, setExistingPdfFile] = useState<File | null>(null);
  const [existingPdfUploading, setExistingPdfUploading] = useState(false);
  const [existingPdfSuccess, setExistingPdfSuccess] = useState(false);
  const [existingPdfError, setExistingPdfError] = useState('');
  const existingPdfInputRef = useRef<HTMLInputElement>(null);

  const [regenerateId, setRegenerateId] = useState('');
  const [regenerateLoading, setRegenerateLoading] = useState(false);
  const [regenerateError, setRegenerateError] = useState('');
  const [verifyLink, setVerifyLink] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const pickPdfFile = (file: File | undefined, onValid: (f: File) => void, onError: (msg: string) => void, input?: HTMLInputElement | null) => {
    if (!file) return;
    const validationError = validatePdfFile(file);
    if (validationError) {
      onError(validationError);
      if (input) input.value = '';
      return;
    }
    onValid(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setQrUrl('');
    setVerifyLink('');
    setPdfUploaded(false);
    setPdfUploadError('');

    try {
      const { data, error: dbError } = await getVerifySupabase()
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

      const verifyUrl = getVerifyPublicUrl(data.id);
      const qrDataUrl = await buildQrDataUrl(data.id);

      setQrUrl(qrDataUrl);
      setSuratId(data.id);
      setVerifyLink(verifyUrl);
      setLatePdfFile(null);
      if (latePdfInputRef.current) latePdfInputRef.current.value = '';
    } catch (err: unknown) {
      setError(formatError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleLatePdfUpload = async () => {
    if (!suratId || !latePdfFile) {
      setPdfUploadError('Pilih file PDF terlebih dahulu.');
      return;
    }
    setPdfUploading(true);
    setPdfUploadError('');
    try {
      await attachSuratPdf(suratId, latePdfFile);
      setPdfUploaded(true);
    } catch (err: unknown) {
      setPdfUploadError(formatError(err));
    } finally {
      setPdfUploading(false);
    }
  };

  const handleRegenerateQr = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = regenerateId.trim();
    if (!UUID_REGEX.test(id)) {
      setRegenerateError('ID dokumen tidak valid. Salin UUID lengkap dari halaman verifikasi atau database.');
      return;
    }
    setRegenerateLoading(true);
    setRegenerateError('');
    setQrUrl('');
    setVerifyLink('');
    try {
      const { data, error: dbError } = await getVerifySupabase().from('surat').select('*').eq('id', id).single();
      if (dbError || !data) throw new Error('Surat tidak ditemukan. Periksa ID dokumen.');

      const surat = data as Surat;
      const verifyUrl = getVerifyPublicUrl(surat.id);
      const qrDataUrl = await buildQrDataUrl(surat.id);

      setForm(suratToForm(surat));
      setQrUrl(qrDataUrl);
      setSuratId(surat.id);
      setVerifyLink(verifyUrl);
      setLatePdfFile(null);
      setPdfUploaded(false);
      setPdfUploadError('');
      if (latePdfInputRef.current) latePdfInputRef.current.value = '';
    } catch (err: unknown) {
      setRegenerateError(formatError(err));
    } finally {
      setRegenerateLoading(false);
    }
  };

  const handleExistingPdfUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = existingSuratId.trim();
    if (!id) {
      setExistingPdfError('Masukkan ID dokumen surat.');
      return;
    }
    if (!existingPdfFile) {
      setExistingPdfError('Pilih file PDF surat.');
      return;
    }
    setExistingPdfUploading(true);
    setExistingPdfError('');
    setExistingPdfSuccess(false);
    try {
      await attachSuratPdf(id, existingPdfFile);
      setExistingPdfSuccess(true);
    } catch (err: unknown) {
      setExistingPdfError(formatError(err));
    } finally {
      setExistingPdfUploading(false);
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
    setVerifyLink('');
    setRegenerateId('');
    setRegenerateError('');
    setLatePdfFile(null);
    setPdfUploaded(false);
    setPdfUploadError('');
    if (latePdfInputRef.current) latePdfInputRef.current.value = '';
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
          <>
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

            <div className={`${styles.card} ${styles.cardSecondary}`}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>↑</span>
                <h2 className={styles.cardTitle}>Unggah PDF Surat (Langkah 2)</h2>
              </div>
              <form onSubmit={handleExistingPdfUpload} className={styles.form}>
                <p className={styles.stepHint}>
                  Setelah QR ditempel di dokumen, unggah PDF final di sini. Gunakan ID dokumen dari halaman setelah generate QR.
                </p>
                <div className={styles.field}>
                  <label className={styles.label}>ID Dokumen</label>
                  <input
                    value={existingSuratId}
                    onChange={(e) => {
                      setExistingSuratId(e.target.value);
                      setExistingPdfSuccess(false);
                    }}
                    placeholder='xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                    className={styles.input}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>File PDF Surat</label>
                  <input
                    ref={existingPdfInputRef}
                    type='file'
                    accept='application/pdf'
                    onChange={(e) => {
                      setExistingPdfError('');
                      setExistingPdfSuccess(false);
                      pickPdfFile(
                        e.target.files?.[0],
                        setExistingPdfFile,
                        setExistingPdfError,
                        e.target,
                      );
                    }}
                    className={styles.fileInput}
                  />
                  <p className={styles.fileHint}>
                    {existingPdfFile ? existingPdfFile.name : 'PDF final yang sudah berisi QR · maks. 10 MB'}
                  </p>
                </div>
                {existingPdfError && <p className={styles.error}>⚠ {existingPdfError}</p>}
                {existingPdfSuccess && <p className={styles.successInline}>✓ PDF berhasil diunggah</p>}
                <button type='submit' disabled={existingPdfUploading} className={styles.btnSecondary}>
                  {existingPdfUploading ? 'Mengunggah...' : 'Unggah PDF'}
                </button>
              </form>
            </div>

            <div className={`${styles.card} ${styles.cardSecondary}`}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>↻</span>
                <h2 className={styles.cardTitle}>Generate Ulang QR (ID yang sama)</h2>
              </div>
              <form onSubmit={handleRegenerateQr} className={styles.form}>
                <p className={styles.stepHint}>
                  Untuk surat yang sudah terdaftar (misalnya QR sempat dibuat dari localhost). ID di database tidak berubah — hanya gambar QR baru dengan URL produksi.
                </p>
                <div className={styles.field}>
                  <label className={styles.label}>ID Dokumen</label>
                  <input
                    value={regenerateId}
                    onChange={(e) => {
                      setRegenerateId(e.target.value);
                      setRegenerateError('');
                    }}
                    placeholder='xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                    className={styles.input}
                  />
                </div>
                {regenerateError && <p className={styles.error}>⚠ {regenerateError}</p>}
                <button type='submit' disabled={regenerateLoading} className={styles.btnSecondary}>
                  {regenerateLoading ? 'Memuat...' : '↻ Generate ulang QR'}
                </button>
              </form>
            </div>
          </>
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
                {verifyLink && <p className={styles.qrLink}>{verifyLink}</p>}
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

            <p className={styles.hint}>
              Langkah 1: Unduh QR, tempelkan ke surat (Word/PDF), lalu ekspor PDF final. Langkah 2: Unggah PDF di bawah.
            </p>

            <div className={`${styles.card} ${styles.pdfUploadCard}`}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>↑</span>
                <h2 className={styles.cardTitle}>Unggah PDF Final</h2>
              </div>
              <div className={styles.form}>
                <p className={styles.stepHint}>PDF surat yang sudah memuat QR di atas. Bisa diunggah kapan saja; mengganti file lama jika diunggah ulang.</p>
                <div className={styles.field}>
                  <input
                    ref={latePdfInputRef}
                    type='file'
                    accept='application/pdf'
                    disabled={pdfUploaded}
                    onChange={(e) => {
                      setPdfUploadError('');
                      pickPdfFile(
                        e.target.files?.[0],
                        (f) => setLatePdfFile(f),
                        setPdfUploadError,
                        e.target,
                      );
                    }}
                    className={styles.fileInput}
                  />
                  <p className={styles.fileHint}>
                    {latePdfFile ? latePdfFile.name : 'Pilih PDF · maks. 10 MB'}
                  </p>
                </div>
                {pdfUploadError && <p className={styles.error}>⚠ {pdfUploadError}</p>}
                {pdfUploaded ? (
                  <p className={styles.successInline}>✓ PDF berhasil diunggah — pemindai QR akan melihat dokumen lengkap</p>
                ) : (
                  <button
                    type='button'
                    onClick={handleLatePdfUpload}
                    disabled={pdfUploading || !latePdfFile}
                    className={styles.btnPrimary}
                  >
                    {pdfUploading ? 'Mengunggah...' : 'Unggah PDF Surat'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
