'use client';

import { useState } from 'react';
import { supabaseOrari } from '@/lib/supabase-orari';

export default function Dashboard() {
  const [form, setForm] = useState({
    nama: '',
    callsign: '',
    masa_berlaku: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabaseOrari.from('anggota').insert([
      {
        nama: form.nama,
        callsign: form.callsign,
        masa_berlaku: form.masa_berlaku,
      },
    ]);

    if (error) {
      alert('Error: ' + error.message);
    } else {
      alert('Berhasil ditambahkan');
      setForm({ nama: '', callsign: '', masa_berlaku: '' });
    }
  };

  return (
    <div className='min-h-screen bg-black text-white p-10'>
      <h1 className='text-3xl font-bold mb-10'>Tambah Anggota</h1>

      <form onSubmit={handleSubmit} className='space-y-6 max-w-md'>
        <input type='text' placeholder='Nama' value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} className='w-full p-3 rounded bg-white/10 border border-white/20' />

        <input type='text' placeholder='Callsign' value={form.callsign} onChange={(e) => setForm({ ...form, callsign: e.target.value })} className='w-full p-3 rounded bg-white/10 border border-white/20' />

        <input type='date' value={form.masa_berlaku} onChange={(e) => setForm({ ...form, masa_berlaku: e.target.value })} className='w-full p-3 rounded bg-white/10 border border-white/20' />

        <button className='bg-blue-600 px-6 py-3 rounded-full hover:scale-105 transition'>Simpan</button>
      </form>
    </div>
  );
}
