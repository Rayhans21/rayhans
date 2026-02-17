'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-motolog';

// 1. Definisikan tipe literal untuk event_type agar tidak 'any'
type EventType = 'fuel' | 'oil_change' | 'periodic_service' | 'tire_change' | 'gear_oil';

type Event = {
  id?: string;
  event_date: string;
  event_type: EventType;
  odometer_km: number | null;
  fuel_liter?: number | null;
  fuel_price_total?: number | null;
  notes?: string | null;
};

export default function SecretPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  /* ============================= */
  /* LOAD DATA (FIXED EFFECT)      */
  /* ============================= */

  // Menggunakan fungsi di dalam useEffect untuk menghindari peringatan cascading renders
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const { data } = await supabase.from('events').select('*').order('event_date', { ascending: false }).order('odometer_km', { ascending: false });

        if (isMounted) {
          setEvents(data || []);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []); // Kosongkan dependency jika hanya ingin load sekali saat mount

  /* ============================= */
  /* HANDLERS                      */
  /* ============================= */

  // Explicit type untuk field dan value
  const handleChange = (index: number, field: keyof Event, value: string) => {
    setEvents((prev) => {
      const updated = [...prev];
      const numericFields: (keyof Event)[] = ['odometer_km', 'fuel_liter', 'fuel_price_total'];

      updated[index] = {
        ...updated[index],
        [field]: numericFields.includes(field) ? (value === '' ? null : Number(value)) : value,
      };
      return updated;
    });
  };

  async function handleSave(event: Event, tempId: string) {
    setSavingId(tempId);

    const { error } = event.id ? await supabase.from('events').update(event).eq('id', event.id) : await supabase.from('events').insert([event]);

    if (error) {
      alert('Gagal: ' + error.message);
    } else {
      // Refresh data secara manual setelah save berhasil
      const { data } = await supabase.from('events').select('*').order('event_date', { ascending: false }).order('odometer_km', { ascending: false });
      setEvents(data || []);
    }
    setSavingId(null);
  }

  const addRow = () => {
    const newRow: Event = {
      event_date: new Date().toISOString().split('T')[0],
      event_type: 'fuel',
      odometer_km: events.length > 0 ? events[0].odometer_km : null,
      fuel_liter: null,
      fuel_price_total: null,
      notes: '',
    };
    setEvents([newRow, ...events]);
  };

  if (loading) return <div style={{ color: '#fff', padding: 40 }}>Loading system...</div>;

  return (
    <main style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <h1>MotoLog Admin</h1>
        <button onClick={addRow} style={addButtonStyle}>
          + Event Baru
        </button>
      </div>

      <div style={tableContainerStyle}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
          <thead>
            <tr style={headerRowStyle}>
              {['Tanggal', 'Tipe', 'Odometer', 'Ltr', 'Total Harga', 'Catatan', ''].map((h) => (
                <th key={h} style={thStyle}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {events.map((event, i) => {
              const rowId = event.id || `temp-${i}`;
              return (
                <tr key={rowId} style={rowStyle}>
                  <td style={tdStyle}>
                    <input type='date' value={event.event_date} onChange={(e) => handleChange(i, 'event_date', e.target.value)} style={inputStyle} />
                  </td>
                  <td style={tdStyle}>
                    <select value={event.event_type} onChange={(e) => handleChange(i, 'event_type', e.target.value as EventType)} style={inputStyle}>
                      <option value='fuel'>⛽ Fuel</option>
                      <option value='oil_change'>🛢️ Oil Change</option>
                      <option value='gear_oil'>⚙️ Gear Oil</option>
                      <option value='periodic_service'>🛠️ Service</option>
                      <option value='tire_change'>🛞 Tire</option>
                    </select>
                  </td>
                  <td style={tdStyle}>
                    <input type='number' placeholder='KM' value={event.odometer_km ?? ''} onChange={(e) => handleChange(i, 'odometer_km', e.target.value)} style={inputStyle} />
                  </td>
                  <td style={tdStyle}>
                    <input type='number' placeholder='Ltr' value={event.fuel_liter ?? ''} onChange={(e) => handleChange(i, 'fuel_liter', e.target.value)} style={inputStyle} />
                  </td>
                  <td style={tdStyle}>
                    <input type='number' placeholder='Rp' value={event.fuel_price_total ?? ''} onChange={(e) => handleChange(i, 'fuel_price_total', e.target.value)} style={inputStyle} />
                  </td>
                  <td style={tdStyle}>
                    <input type='text' placeholder='...' value={event.notes ?? ''} onChange={(e) => handleChange(i, 'notes', e.target.value)} style={inputStyle} />
                  </td>
                  <td style={tdStyle}>
                    <button onClick={() => handleSave(event, rowId)} disabled={savingId === rowId} style={{ ...saveButtonStyle, opacity: savingId === rowId ? 0.5 : 1 }}>
                      {savingId === rowId ? '...' : 'Simpan'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}

// Styles (Tetap sama dengan sebelumnya)
const containerStyle: React.CSSProperties = { minHeight: '100vh', background: '#000', color: '#fff', padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' };
const tableContainerStyle: React.CSSProperties = { background: '#0a0a0a', borderRadius: '16px', border: '1px solid #222', padding: '10px', overflowX: 'auto' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '10px', background: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '14px' };
const addButtonStyle: React.CSSProperties = { padding: '12px 24px', fontWeight: 700, background: '#00ff7f', color: '#000', borderRadius: '12px', border: 'none', cursor: 'pointer' };
const saveButtonStyle: React.CSSProperties = { padding: '8px 16px', background: '#fff', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' };
const thStyle: React.CSSProperties = { padding: '15px 10px', fontSize: '12px', color: '#666', textAlign: 'left', textTransform: 'uppercase' };
const tdStyle: React.CSSProperties = { padding: '8px' };
const rowStyle: React.CSSProperties = { borderBottom: '1px solid #111' };
const headerRowStyle: React.CSSProperties = { borderBottom: '2px solid #222' };
