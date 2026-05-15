import Link from 'next/link'

export default function NotFound() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#0a1628',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{ textAlign: 'center', maxWidth: '400px' }}>
        <div style={{
          width: '64px', height: '64px', borderRadius: '50%',
          border: '2px solid #c0392b', margin: '0 auto 1.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M7 7L21 21M21 7L7 21" stroke="#c0392b" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <h1 style={{ color: '#f8f5f0', fontSize: '1.25rem', fontWeight: 'normal', marginBottom: '0.75rem' }}>
          Dokumen Tidak Ditemukan
        </h1>
        <p style={{ color: '#8892a4', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '2rem', fontFamily: 'Courier New, monospace' }}>
          QR code ini tidak terdaftar di sistem atau sudah tidak berlaku.
          Pastikan Anda scan QR code yang benar.
        </p>
        <Link href="/" style={{
          background: 'transparent',
          border: '1px solid rgba(201,168,76,0.4)',
          color: '#c9a84c',
          padding: '0.75rem 1.5rem',
          fontSize: '0.8rem',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          fontFamily: 'Courier New, monospace',
          borderRadius: '3px',
          display: 'inline-block',
        }}>
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  )
}
