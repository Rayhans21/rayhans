'use client';

import { useEffect, useState } from 'react';

type EventType = 'fuel' | 'oil_change' | 'gear_oil' | 'cvt_service' | 'air_filter' | 'drive_belt' | 'spare_part';

type Event = {
  id?: string;
  event_date: string;
  event_type: EventType;
  odometer_km: number | null;
  fuel_liter?: number | null;
  fuel_price_total?: number | null;
  notes?: string | null;
};

const EVENT_OPTIONS: { value: EventType; label: string }[] = [
  { value: 'fuel', label: '⛽ Fuel' },
  { value: 'oil_change', label: '🛢️ Ganti Oli Mesin' },
  { value: 'gear_oil', label: '⚙️ Ganti Oli Gardan' },
  { value: 'cvt_service', label: '🔧 CVT & TB Cleaning' },
  { value: 'air_filter', label: '💨 Filter Udara' },
  { value: 'drive_belt', label: '⛓ V-Belt & Roller' },
  { value: 'spare_part', label: '🔩 Ganti Sparepart' },
];

export default function SecretPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [tokenInput, setTokenInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);

  /* ============================= */
  /* AUTH + SESSION                */
  /* ============================= */

  useEffect(() => {
    let ignore = false;
    async function probe() {
      const res = await fetch('/motolog/api/auth', { credentials: 'include' });
      const data = await res.json();
      if (!ignore && data.authenticated) setAuthenticated(true);
      if (!ignore) setSessionChecked(true);
    }
    probe();
    return () => {
      ignore = true;
    };
  }, []);

  async function handleAuth() {
    setAuthLoading(true);
    setAuthError('');
    const res = await fetch('/motolog/api/auth', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: tokenInput }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      setTokenInput('');
      setAuthenticated(true);
    } else {
      setAuthError(data.error === 'Too many attempts' ? 'Terlalu banyak percobaan. Coba lagi nanti.' : 'Password salah');
    }
    setAuthLoading(false);
  }

  /* ============================= */
  /* LOAD DATA                     */
  /* ============================= */

  const [refreshKey, setRefreshKey] = useState(0);

  function loadData() {
    setRefreshKey((k) => k + 1);
  }

  useEffect(() => {
    if (!authenticated) return;
    let ignore = false;

    async function load() {
      setLoading(true);
      const res = await fetch('/motolog/api/events', { credentials: 'include' });
      if (res.ok && !ignore) {
        const data = await res.json();
        setEvents(data ?? []);
      }
      if (!ignore) setLoading(false);
    }

    load();
    return () => {
      ignore = true;
    };
  }, [authenticated, refreshKey]);

  /* ============================= */
  /* HANDLERS                      */
  /* ============================= */

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
    const res = await fetch('/motolog/api/admin', {
      method: event.id ? 'PUT' : 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
    if (!res.ok) {
      const err = await res.json();
      alert('Gagal: ' + err.error);
    } else {
      loadData();
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

  /* ============================= */
  /* AUTH GATE                     */
  /* ============================= */

  if (!sessionChecked) {
    return (
      <main style={{ minHeight: '100vh', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#555' }}>Loading…</p>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main style={{ minHeight: '100vh', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#111', padding: 40, borderRadius: 24, width: 340, border: '1px solid #222', textAlign: 'center' }}>
          <h3 style={{ marginBottom: 8 }}>MotoLog Admin</h3>
          <p style={{ color: '#555', fontSize: 13, marginBottom: 24 }}>Restricted access</p>
          <input
            type='password'
            placeholder='Enter Code'
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
            style={{ width: '100%', padding: 12, marginBottom: 16, background: '#000', border: '1px solid #333', color: '#fff', borderRadius: 12, textAlign: 'center', fontSize: 18, boxSizing: 'border-box' }}
          />
          <button onClick={handleAuth} disabled={authLoading} style={{ width: '100%', padding: 14, background: '#fff', color: '#000', borderRadius: 12, fontWeight: 700, cursor: 'pointer', border: 'none' }}>
            {authLoading ? 'Verifying...' : 'Unlock'}
          </button>
          {authError && <p style={{ color: '#ff3b3b', marginTop: 16 }}>{authError}</p>}
        </div>
      </main>
    );
  }

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
                      {EVENT_OPTIONS.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
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

const containerStyle: React.CSSProperties = { minHeight: '100vh', background: '#000', color: '#fff', padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' };
const tableContainerStyle: React.CSSProperties = { background: '#0a0a0a', borderRadius: '16px', border: '1px solid #222', padding: '10px', overflowX: 'auto' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '10px', background: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '14px' };
const addButtonStyle: React.CSSProperties = { padding: '12px 24px', fontWeight: 700, background: '#00ff7f', color: '#000', borderRadius: '12px', border: 'none', cursor: 'pointer' };
const saveButtonStyle: React.CSSProperties = { padding: '8px 16px', background: '#fff', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' };
const thStyle: React.CSSProperties = { padding: '15px 10px', fontSize: '12px', color: '#666', textAlign: 'left', textTransform: 'uppercase' };
const tdStyle: React.CSSProperties = { padding: '8px' };
const rowStyle: React.CSSProperties = { borderBottom: '1px solid #111' };
const headerRowStyle: React.CSSProperties = { borderBottom: '2px solid #222' };
