'use client';

import { useEffect, useState } from 'react';

type Row = {
  [key: string]: string;
};

export default function MusdaPage() {
  const [data, setData] = useState<Row[]>([]);

  useEffect(() => {
    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSJG9gDA5MCMUt_pjHMow06evHkaxP9wMOeI3zdXAA2lnjyoMQU_YVMWFmkGypXrlEhGS78hnXjVwtz/pub?gid=202140653&single=true&output=csv')
      .then((res) => res.text())
      .then((csv) => {
        const [header, ...rows] = csv.split('\n');
        const keys = header.split(',');

        const formatted = rows.map((row) => {
          const values = row.split(',');
          const obj: Row = {};
          keys.forEach((key, i) => {
            obj[key.trim()] = values[i]?.trim() ?? '';
          });
          return obj;
        });

        setData(formatted);
      });
  }, []);

  return (
    <section className='min-h-screen px-6 py-24'>
      <h1 className='text-3xl font-bold text-white mb-6'>Data MUSDA</h1>

      <div className='overflow-x-auto'>
        <table className='w-full border border-white/10'>
          <thead className='bg-white/10'>
            <tr>
              {Object.keys(data[0] || {}).map((key) => (
                <th key={key} className='px-4 py-2 text-left text-sm text-white'>
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className='border-t border-white/10'>
                {Object.values(row).map((val, j) => (
                  <td key={j} className='px-4 py-2 text-sm text-white/80'>
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
