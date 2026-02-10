'use client';

import { useEffect, useMemo, useState } from 'react';

type RowData = Record<string, string>;

function parseCSV(text: string): RowData[] {
  const rows = text
    .trim()
    .split('\n')
    .map((row) => row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g)?.map((cell) => cell.replace(/^"|"$/g, '').trim()))
    .filter((row): row is string[] => Array.isArray(row));

  if (rows.length < 2) return [];

  const headers = rows[0];
  if (!headers || headers.length === 0) return [];

  return rows.slice(1).map((row) => {
    const obj: RowData = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] ?? '';
    });
    return obj;
  });
}

export default function MusdaPage() {
  const [data, setData] = useState<RowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSJG9gDA5MCMUt_pjHMow06evHkaxP9wMOeI3zdXAA2lnjyoMQU_YVMWFmkGypXrlEhGS78hnXjVwtz/pub?gid=202140653&single=true&output=csv')
      .then((res) => res.text())
      .then((text) => {
        setData(parseCSV(text));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const headers = useMemo(() => {
    if (data.length === 0) return [];
    return Object.keys(data[0]);
  }, [data]);

  const filteredData = useMemo(() => {
    return (
      data
        // ❌ buang row jika kolom pertama kosong
        .filter((row) => {
          const firstKey = headers[0];
          return firstKey && row[firstKey]?.trim() !== '';
        })
        // 🔍 search hanya untuk filter
        .filter((row) => {
          if (!search) return true;
          const rowText = Object.values(row).join(' ').toLowerCase();
          return rowText.includes(search.toLowerCase());
        })
    );
  }, [data, search, headers]);

  return (
    <section className='min-h-screen px-6 py-24 bg-gray-50'>
      <div className='relative mb-10'>
        {/* Container */}
        <div className='flex items-center justify-between max-w-6xl mx-auto px-4'>
          {/* Logo kiri */}
          <img src='/Logo_ORARI.png' alt='Logo ORARI' className='h-8 sm:h-24 w-auto object-contain' />

          {/* Spacer */}
          <div className='flex-1' />

          {/* Logo kanan */}
          <img src='/MUSDA_IX_REV2.png' alt='Logo MUSDA IX' className='h-8 sm:h-24 w-auto object-contain' />
        </div>

        {/* Judul absolute center */}
        <h1 className='absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl font-bold text-gray-900 text-center pointer-events-none'>(Arsip) Laporan Donasi MUSDA IX</h1>
        <p className='mt-2 text-sm sm:text-base text-gray-600 max-w-3xl mx-auto'>Event MUSDA IX telah selesai. Data ini ditampilkan sebagai dokumentasi transparansi dan studi kasus pengelolaan data berbasis web.</p>
      </div>

      {/* Search */}
      <div className='max-w-md mx-auto mb-6'>
        <input
          type='text'
          placeholder='Cari nama, callsign, atau keterangan…'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500'
        />
      </div>

      {loading && <p className='text-center text-gray-600'>Loading data…</p>}

      {!loading && filteredData.length === 0 && <p className='text-center text-gray-600'>Data tidak ditemukan.</p>}

      {!loading && filteredData.length > 0 && (
        <div className='overflow-x-auto overflow-y-auto max-h-[70vh] rounded-lg border border-gray-200 bg-white max-w-7xl mx-auto'>
          <table className='w-full border-collapse text-sm'>
            <thead className='sticky top-0 z-20 bg-blue-200 border-b border-blue-300 shadow-sm'>
              <tr>
                {headers.map((key) => (
                  <th key={key} className='px-4 py-3 text-left font-bold text-black whitespace-nowrap'>
                    {key}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredData.map((row, rowIndex) => {
                // ✅ highlight jika ada value TRUE di row
                const isDonated = Object.values(row).some((value) => value === 'TRUE');

                return (
                  <tr key={rowIndex} className={`border-t transition ${isDonated ? 'bg-green-100 hover:bg-green-200' : 'hover:bg-gray-50'}`}>
                    {headers.map((key, colIndex) => {
                      const value = row[key];
                      return (
                        <td key={colIndex} className='px-4 py-3 text-gray-800 whitespace-nowrap'>
                          {value === 'TRUE' ? <span className='text-green-700 font-semibold'>✔ Sudah</span> : value === 'FALSE' ? <span className='text-gray-500'>—</span> : value}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
