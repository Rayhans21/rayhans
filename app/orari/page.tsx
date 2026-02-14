import Link from 'next/link';
import Image from 'next/image';
import { supabaseOrari } from '@/lib/supabase-orari';

type Anggota = {
  id: string;
  nama: string;
  callsign: string;
  masa_berlaku: string;
};

export const revalidate = 60;

export default async function OrariPage() {
  const { data } = await supabaseOrari.from('anggota').select('*').order('nama', { ascending: true });

  const anggota: Anggota[] = data ?? [];
  const today = new Date();

  const total = anggota.length;
  const aktif = anggota.filter((a) => new Date(a.masa_berlaku) >= today).length;
  const expired = total - aktif;

  return (
    <div className='min-h-screen bg-black text-white overflow-hidden'>
      {/* BACKGROUND GLOW */}
      <div className='absolute top-50 left-50 w-125 h-125 bg-blue-600 opacity-20 blur-[180px] rounded-full' />
      <div className='absolute bottom-50 right-50 w-125 h-125 bg-purple-600 opacity-20 blur-[180px] rounded-full' />

      {/* NAVBAR */}
      <nav className='relative z-50 backdrop-blur-md bg-white/5 border-b border-white/10'>
        <div className='max-w-7xl mx-auto px-6 py-5 flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <Image src='/Logo_ORARI.png' alt='ORARI' width={36} height={36} />
            <span className='font-semibold tracking-wide'>ORARI LOKAL PEKANBARU</span>
          </div>

          <div className='flex items-center gap-6 text-sm text-white/80'>
            <Link href='#anggota' className='hover:text-white transition'>
              Members
            </Link>
            <Link href='/orari/dashboard' className='bg-white text-black px-4 py-2 rounded-full font-medium hover:scale-105 transition'>
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className='relative z-10 py-28 text-center'>
        <div className='max-w-4xl mx-auto px-6'>
          <h1 className='text-6xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>Radio. Community. Future.</h1>

          <p className='mt-8 text-lg text-white/70 leading-relaxed'>Platform digital modern untuk ORARI Lokal — bukan sekadar data anggota, tapi pusat kolaborasi & tata kelola masa depan.</p>

          <div className='mt-10 flex justify-center gap-4'>
            <Link href='#anggota' className='px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-medium hover:scale-105 transition'>
              Explore Members
            </Link>

            <Link href='/orari/dashboard' className='px-6 py-3 border border-white/20 rounded-full text-white/80 hover:bg-white/10 transition'>
              Admin Access
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className='relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 mb-24'>
        <StatCard title='Total Members' value={total} />
        <StatCard title='Active Callsign' value={aktif} />
        <StatCard title='Expired' value={expired} />
      </section>

      {/* MEMBERS */}
      <section id='anggota' className='relative z-10 max-w-6xl mx-auto px-6 pb-28'>
        <h2 className='text-3xl font-bold mb-12 text-center'>Member Directory</h2>

        <div className='grid md:grid-cols-2 gap-6'>
          {anggota.map((a) => {
            const isExpired = new Date(a.masa_berlaku) < today;

            return (
              <div key={a.id} className='bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition'>
                <div className='flex justify-between items-center'>
                  <div>
                    <h3 className='text-lg font-semibold'>{a.nama}</h3>
                    <p className='text-sm text-white/60'>{a.callsign}</p>
                  </div>

                  <span className={`text-xs px-3 py-1 rounded-full ${isExpired ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>{isExpired ? 'Expired' : 'Active'}</span>
                </div>

                <div className='mt-4 text-sm text-white/50'>Valid until: {a.masa_berlaku}</div>
              </div>
            );
          })}

          {anggota.length === 0 && <div className='text-center text-white/40 col-span-full'>No member data yet.</div>}
        </div>
      </section>

      {/* FOOTER */}
      <footer className='relative z-10 border-t border-white/10 py-10 text-center text-sm text-white/40'>© {new Date().getFullYear()} ORARI Lokal Pekanbaru — Digital Evolution</footer>
    </div>
  );
}

/* ---------- COMPONENT ---------- */

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className='bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-10 text-center hover:scale-105 transition'>
      <p className='text-white/60 text-sm mb-4 uppercase tracking-wide'>{title}</p>
      <h3 className='text-5xl font-bold'>{value}</h3>
    </div>
  );
}
