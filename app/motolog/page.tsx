'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-motolog';

type Event = {
  id: string;
  event_type: string;
  odometer_km: number | null;
  event_date: string;
  fuel_type?: string | null;
  fuel_liter?: number | null;
  fuel_price_total?: number | null;
  title?: string | null;
  notes?: string | null;
};

export default function MotoLogPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabase.from('events').select('*').order('event_date', { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setEvents(data ?? []);
      }

      setLoading(false);
    }

    loadData();
  }, []);

  const formatCurrency = (value?: number | null) => {
    if (!value) return '-';
    return `Rp ${value.toLocaleString('id-ID')}`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const badgeStyle = (type: string) => {
    return {
      padding: '4px 10px',
      borderRadius: 20,
      fontSize: 12,
      fontWeight: 600,
      backgroundColor: type === 'fuel' ? '#1e3a8a' : '#854d0e',
      color: '#fff',
      display: 'inline-block',
      marginBottom: 12,
    };
  };

  return (
    <main
      style={{
        padding: 40,
        maxWidth: 800,
        margin: '0 auto',
        color: '#f5f5f5',
      }}
    >
      <h1 style={{ marginBottom: 8 }}>MotoLog</h1>
      <p style={{ color: '#888', marginBottom: 32 }}>Catatan riwayat kendaraan pribadi</p>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && events.length === 0 && <p>Belum ada data.</p>}

      {!loading &&
        events.map((event) => (
          <div
            key={event.id}
            style={{
              border: '1px solid #2a2a2a',
              padding: 24,
              marginBottom: 24,
              borderRadius: 16,
              backgroundColor: '#111',
              boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
              transition: '0.2s ease',
            }}
          >
            <div style={badgeStyle(event.event_type)}>{event.event_type === 'fuel' ? 'Fuel Log' : 'Service Log'}</div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 16,
              }}
            >
              <div>
                <p style={{ color: '#888', fontSize: 13 }}>Tanggal</p>
                <p>{formatDate(event.event_date)}</p>
              </div>

              <div>
                <p style={{ color: '#888', fontSize: 13 }}>Odometer</p>
                <p>{event.odometer_km ? `${event.odometer_km.toLocaleString('id-ID')} km` : '-'}</p>
              </div>

              {event.event_type === 'fuel' && (
                <>
                  <div>
                    <p style={{ color: '#888', fontSize: 13 }}>Jenis BBM</p>
                    <p>{event.fuel_type ?? '-'}</p>
                  </div>

                  <div>
                    <p style={{ color: '#888', fontSize: 13 }}>Volume</p>
                    <p>{event.fuel_liter ?? '-'} L</p>
                  </div>

                  <div>
                    <p style={{ color: '#888', fontSize: 13 }}>Total</p>
                    <p>{formatCurrency(event.fuel_price_total)}</p>
                  </div>
                </>
              )}

              {event.title && (
                <div>
                  <p style={{ color: '#888', fontSize: 13 }}>Judul</p>
                  <p>{event.title}</p>
                </div>
              )}

              {event.notes && (
                <div style={{ gridColumn: '1 / -1' }}>
                  <p style={{ color: '#888', fontSize: 13 }}>Catatan</p>
                  <p>{event.notes}</p>
                </div>
              )}
            </div>
          </div>
        ))}
    </main>
  );
}
