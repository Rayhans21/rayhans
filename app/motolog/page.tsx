'use client';

import { useEffect, useState } from 'react';

type Event = {
  id: string;
  event_type: string;
  odometer_km: number | null;
  event_date: string;
  fuel_liter?: number | null;
  fuel_price_total?: number | null;
};

const DUMMY_EVENTS: Event[] = [
  { id: '1', event_type: 'fuel', odometer_km: 12500, event_date: '2024-12-01', fuel_liter: 4 },
  { id: '2', event_type: 'fuel', odometer_km: 12400, event_date: '2024-11-20', fuel_liter: 4 },
];

const MAINTENANCE_ITEMS = [
  { key: 'oil_change', label: '🛢 Ganti Oli Mesin', interval: 2000 },
  { key: 'gear_oil', label: '⚙️ Ganti Oli Gardan', interval: 4000 },
  { key: 'cvt_service', label: '🔧 CVT & TB Cleaning', interval: 6000 },
  { key: 'air_filter', label: '💨 Filter Udara', interval: 16000 },
  { key: 'drive_belt', label: '⛓ V-Belt & Roller', interval: 24000 },
];

/* ============================= */
/* COMPONENTS                    */
/* ============================= */

function ProgressBar({ value }: { value: number }) {
  const safe = Math.min(Math.max(value, 0), 100);
  const color = safe < 70 ? '#00ff7f' : safe < 90 ? '#ffcc00' : '#ff3b3b';
  return (
    <div style={{ height: 10, background: '#111', borderRadius: 8, overflow: 'hidden', marginTop: 6 }}>
      <div style={{ width: `${safe}%`, height: '100%', background: color, transition: '0.4s ease' }} />
    </div>
  );
}

function FuelChart({ data }: { data: { key: string; label: string; liter: number; cost: number }[] }) {
  if (data.every((d) => d.liter === 0)) return null;

  const W = 820,
    H = 200;
  const padL = 50,
    padR = 60,
    padT = 20,
    padB = 30;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const n = data.length;
  const barW = (chartW / n) * 0.45;
  const gap = chartW / n;

  const maxLiter = Math.max(...data.map((d) => d.liter), 1);
  const maxCost = Math.max(...data.map((d) => d.cost), 1);

  const barX = (i: number) => padL + gap * i + gap / 2 - barW / 2;
  const barH = (liter: number) => (liter / maxLiter) * chartH;
  const lineY = (cost: number) => padT + chartH - (cost / maxCost) * chartH;

  const points = data.map((d, i) => `${padL + gap * i + gap / 2},${lineY(d.cost)}`).join(' ');

  return (
    <svg width='100%' viewBox={`0 0 ${W} ${H + 10}`} style={{ display: 'block' }}>
      {/* Grid lines */}
      {[0.25, 0.5, 0.75, 1].map((t) => (
        <line key={t} x1={padL} y1={padT + chartH * (1 - t)} x2={W - padR} y2={padT + chartH * (1 - t)} stroke='#1a1a1a' strokeWidth='1' />
      ))}

      {/* Bars — liter */}
      {data.map((d, i) => (
        <g key={d.key}>
          <rect x={barX(i)} y={padT + chartH - barH(d.liter)} width={barW} height={barH(d.liter)} fill='#00ff7f' opacity='0.25' rx='3' />
          {d.liter > 0 && (
            <text x={barX(i) + barW / 2} y={padT + chartH - barH(d.liter) + 14} textAnchor='middle' fill='#00ff7f' fontSize='10' opacity='0.7'>
              {d.liter.toFixed(1)}L
            </text>
          )}
        </g>
      ))}

      {/* Line — cost */}
      {data.some((d) => d.cost > 0) && (
        <>
          <polyline points={points} fill='none' stroke='#ffcc00' strokeWidth='2' strokeLinejoin='round' />
          {data.map(
            (d, i) =>
              d.cost > 0 && (
                <g key={`dot-${d.key}`}>
                  <circle cx={padL + gap * i + gap / 2} cy={lineY(d.cost)} r='4' fill='#ffcc00' />
                  <text x={padL + gap * i + gap / 2} y={lineY(d.cost) - 14} textAnchor='middle' fill='#ffcc00' fontSize='9' opacity='0.8'>
                    {(d.cost / 1000).toFixed(0)}k
                  </text>
                </g>
              ),
          )}
        </>
      )}

      {/* X labels */}
      {data.map((d, i) => (
        <text key={`xl-${d.key}`} x={padL + gap * i + gap / 2} y={H - 2} textAnchor='middle' fill='#555' fontSize='11'>
          {d.label}
        </text>
      ))}

      {/* Y axis left — liter */}
      <text x={padL - 6} y={padT + chartH} textAnchor='end' fill='#00ff7f' fontSize='9' opacity='0.5'>
        0
      </text>
      <text x={padL - 6} y={padT} textAnchor='end' fill='#00ff7f' fontSize='9' opacity='0.5'>
        {maxLiter.toFixed(0)}L
      </text>

      {/* Y axis right — cost */}
      <text x={W - padR + 6} y={padT + chartH} textAnchor='start' fill='#ffcc00' fontSize='9' opacity='0.5'>
        0
      </text>
      <text x={W - padR + 6} y={padT} textAnchor='start' fill='#ffcc00' fontSize='9' opacity='0.5'>
        {(maxCost / 1000).toFixed(0)}k
      </text>

      {/* Legend */}
      <rect x={padL} y={padT} width='10' height='10' fill='#00ff7f' opacity='0.4' rx='2' />
      <text x={padL + 14} y={padT + 9} fill='#555' fontSize='10'>
        Liter
      </text>
      <line x1={padL + 55} y1={padT + 5} x2={padL + 65} y2={padT + 5} stroke='#ffcc00' strokeWidth='2' />
      <text x={padL + 69} y={padT + 9} fill='#555' fontSize='10'>
        Pengeluaran
      </text>
    </svg>
  );
}

export default function MotoLogPage() {
  const [realEvents, setRealEvents] = useState<Event[]>([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [showUnlock, setShowUnlock] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /* ============================= */
  /* SESSION + DATA FETCHING       */
  /* ============================= */

  useEffect(() => {
    let ignore = false;
    async function restoreSession() {
      const res = await fetch('/motolog/api/auth', { credentials: 'include' });
      const data = await res.json();
      if (!ignore && data.authenticated) setIsPrivate(true);
    }
    restoreSession();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!isPrivate) return;
    let ignore = false;
    async function loadRealData() {
      const res = await fetch('/motolog/api/events', { credentials: 'include' });
      if (!res.ok) {
        if (!ignore) setRealEvents([]);
        return;
      }
      const data: Event[] = await res.json();
      if (!ignore) setRealEvents(data ?? []);
    }
    loadRealData();
    return () => {
      ignore = true;
    };
  }, [isPrivate]);

  const displayEvents = (isPrivate ? realEvents : DUMMY_EVENTS).slice().sort((a, b) => new Date(b.event_date).getTime() - new Date(a.event_date).getTime());

  const plateNumber = isPrivate ? 'BM 4583 AAL' : 'YC 5 NCM';
  const expNumber = isPrivate ? '10•24' : '21•02';
  const latestOdometer = displayEvents[0]?.odometer_km ?? 0;

  /* ============================= */
  /* EFFICIENCY CALCULATION        */
  /* ============================= */

  let efficiency = 0;
  const fuelEvents = displayEvents.filter((e) => e.event_type === 'fuel');
  if (fuelEvents.length >= 2) {
    const distance = (fuelEvents[0].odometer_km ?? 0) - (fuelEvents[1].odometer_km ?? 0);
    const liter = fuelEvents[0].fuel_liter ?? 0;
    if (distance > 0 && liter > 0) efficiency = distance / liter;
  }

  /* ============================= */
  /* FUEL COST STATISTICS          */
  /* ============================= */

  const now = new Date();
  const fuelThisMonth = fuelEvents.filter((e) => {
    const d = new Date(e.event_date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  const totalCostThisMonth = fuelThisMonth.reduce((sum, e) => sum + (e.fuel_price_total ?? 0), 0);
  const totalLiterThisMonth = fuelThisMonth.reduce((sum, e) => sum + (e.fuel_liter ?? 0), 0);
  const avgPricePerLiter = totalLiterThisMonth > 0 ? totalCostThisMonth / totalLiterThisMonth : 0;
  const totalCostAllTime = fuelEvents.reduce((sum, e) => sum + (e.fuel_price_total ?? 0), 0);
  const totalLiterAllTime = fuelEvents.reduce((sum, e) => sum + (e.fuel_liter ?? 0), 0);

  /* ============================= */
  /* MAINTENANCE CALCULATION       */
  /* ============================= */

  const calcProgress = (eventType: string, interval: number) => {
    const lastEvent = displayEvents.find((e) => e.event_type === eventType);
    const lastKm = lastEvent?.odometer_km ?? 0;
    return ((latestOdometer - lastKm) / interval) * 100;
  };

  /* ============================= */
  /* FUEL CHART DATA               */
  /* ============================= */

  const monthlyFuel = (() => {
    if (fuelEvents.length === 0) return [];

    // Ambil 6 bulan terakhir
    const months: { key: string; label: string; liter: number; cost: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const label = d.toLocaleDateString('id-ID', { month: 'short' });
      const events = fuelEvents.filter((e) => e.event_date.startsWith(key));
      months.push({
        key,
        label,
        liter: events.reduce((s, e) => s + (e.fuel_liter ?? 0), 0),
        cost: events.reduce((s, e) => s + (e.fuel_price_total ?? 0), 0),
      });
    }
    return months;
  })();

  /* ============================= */
  /* GAUGE UTILS                   */
  /* ============================= */

  const MAX_EFFICIENCY = 80;
  const centerX = 160,
    centerY = 180,
    radius = 120;
  const needleRotation = (Math.min(efficiency, MAX_EFFICIENCY) / MAX_EFFICIENCY) * 240 - 120;

  function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  function describeArc(x: number, y: number, r: number, startAngle: number, endAngle: number) {
    const start = polarToCartesian(x, y, r, endAngle);
    const end = polarToCartesian(x, y, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return ['M', start.x, start.y, 'A', r, r, 0, largeArcFlag, 0, end.x, end.y].join(' ');
  }

  function renderTicks() {
    const ticks = [];
    for (let i = 0; i <= MAX_EFFICIENCY; i += 5) {
      const angle = (i / MAX_EFFICIENCY) * 240 - 120;
      const rad = ((angle - 90) * Math.PI) / 180;
      const isMajor = i % 20 === 0;
      const inner = radius - (isMajor ? 15 : 8);
      ticks.push(
        <line
          key={`tick-${i}`}
          x1={centerX + inner * Math.cos(rad)}
          y1={centerY + inner * Math.sin(rad)}
          x2={centerX + (radius + 2) * Math.cos(rad)}
          y2={centerY + (radius + 2) * Math.sin(rad)}
          stroke={isMajor ? '#fff' : '#444'}
          strokeWidth={isMajor ? 2 : 1}
        />,
      );
      if (isMajor) {
        const lx = centerX + (radius - 32) * Math.cos(rad);
        const ly = centerY + (radius - 32) * Math.sin(rad);
        ticks.push(
          <text key={`label-${i}`} x={lx} y={ly} fill='#777' fontSize='12' fontWeight='700' textAnchor='middle' dominantBaseline='middle'>
            {i}
          </text>,
        );
      }
    }
    return ticks;
  }

  /* ============================= */
  /* AUTH                          */
  /* ============================= */

  async function handleUnlock() {
    setLoading(true);
    setError('');
    const res = await fetch('/motolog/api/auth', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      setPassword('');
      setIsPrivate(true);
      setShowUnlock(false);
    } else setError(data.error === 'Too many attempts' ? 'Terlalu banyak percobaan. Coba lagi nanti.' : 'Password salah');
    setLoading(false);
  }

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#fff', padding: 40, maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 40, letterSpacing: -1 }}>MotoLog</h1>

      {/* PLATE NUMBER */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 60 }}>
        <div
          onClick={() => !isPrivate && setShowUnlock(true)}
          style={{
            width: '100%',
            maxWidth: 420,
            aspectRatio: '27 / 11',
            background: '#fff',
            borderRadius: 18,
            border: '4px solid #000',
            position: 'relative',
            cursor: isPrivate ? 'default' : 'pointer',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', inset: 10, border: '3px solid #000', borderRadius: 12 }} />
          <div
            style={{
              position: 'absolute',
              top: '45%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              gap: 'clamp(8px, 4vw, 24px)',
              fontSize: 'clamp(22px, 8vw, 44px)',
              fontWeight: 800,
              letterSpacing: 'clamp(1px, 0.6vw, 4px)',
              color: '#000',
              whiteSpace: 'nowrap',
            }}
          >
            {plateNumber.split(' ').map((part, i) => (
              <span key={i}>{part}</span>
            ))}
          </div>
          <div style={{ position: 'absolute', bottom: 18, right: 20, fontSize: 'clamp(12px, 3vw, 22px)', fontWeight: 700, color: '#000' }}>{expNumber}</div>
        </div>
      </div>

      {/* SPEEDOMETER */}
      <div style={{ width: 320, margin: '0 auto 60px', textAlign: 'center' }}>
        <svg width='320' height='260' viewBox='0 0 320 260'>
          <defs>
            <filter id='neonGlow' x='-50%' y='-50%' width='200%' height='200%'>
              <feGaussianBlur stdDeviation='4' result='blur' />
              <feComposite in='SourceGraphic' in2='blur' operator='over' />
            </filter>
            <linearGradient id='ringGradient' x1='0%' y1='0%' x2='100%' y2='0%'>
              <stop offset='0%' stopColor='#ff3b3b' />
              <stop offset='50%' stopColor='#ffcc00' />
              <stop offset='100%' stopColor='#00ff7f' />
            </linearGradient>
          </defs>
          <path d={describeArc(160, 180, 145, -125, 125)} fill='none' stroke='#222' strokeWidth='1' />
          <path d={describeArc(160, 180, 138, -120, 120)} fill='none' stroke='url(#ringGradient)' strokeWidth='3' strokeOpacity='0.5' />
          <path d={describeArc(160, 180, 120, -120, 120)} fill='none' stroke='#111' strokeWidth='14' strokeLinecap='round' />
          {renderTicks()}
          <g style={{ transform: `rotate(${needleRotation}deg)`, transformOrigin: '160px 180px', transition: 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
            <line x1='160' y1='188' x2='160' y2='75' stroke='#ff3b3b' strokeWidth='4' strokeLinecap='round' />
            <circle cx='160' cy='180' r='10' fill='#ff3b3b' />
            <circle cx='160' cy='180' r='4' fill='#fff' />
          </g>
          <text x='160' y='235' textAnchor='middle' fill='#00ff7f' fontSize='42' fontWeight='800' fontFamily='monospace' filter='url(#neonGlow)'>
            {efficiency ? efficiency.toFixed(1) : '0.0'}
          </text>
          <text x='160' y='255' textAnchor='middle' fill='#555' fontSize='11' fontWeight='bold' letterSpacing='3'>
            KM / LITER
          </text>
        </svg>
      </div>

      {/* ODOMETER */}
      <div style={{ marginBottom: 60, textAlign: 'center' }}>
        <h3 style={{ fontSize: 14, color: '#444', letterSpacing: 4, marginBottom: 15 }}>TOTAL DISTANCE</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
          {latestOdometer
            .toString()
            .padStart(6, '0')
            .split('')
            .map((digit, i) => (
              <div key={i} style={{ background: '#111', color: '#00ff7f', padding: '10px 14px', borderRadius: 8, fontSize: 32, fontWeight: 700, fontFamily: 'monospace', border: '1px solid #222' }}>
                {digit}
              </div>
            ))}
        </div>
      </div>

      {/* MAINTENANCE */}
      <div style={{ marginBottom: 60 }}>
        <h2 style={{ marginBottom: 24 }}>Maintenance Status</h2>
        <div style={{ display: 'grid', gap: 20 }}>
          {MAINTENANCE_ITEMS.map(({ key, label, interval }) => (
            <div key={key}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 2 }}>
                <span>{label}</span>
                <span style={{ color: '#444', fontSize: 12 }}>tiap {interval.toLocaleString()} km</span>
              </div>
              <ProgressBar value={calcProgress(key, interval)} />
            </div>
          ))}
        </div>
      </div>

      {/* FUEL STATS */}
      {isPrivate && totalCostAllTime > 0 && (
        <div style={{ marginBottom: 60 }}>
          <h2 style={{ marginBottom: 20 }}>Fuel Statistics</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
            {[
              { label: 'BULAN INI', value: totalCostThisMonth > 0 ? `Rp ${totalCostThisMonth.toLocaleString('id-ID')}` : '—', sub: `${totalLiterThisMonth.toFixed(1)} liter` },
              { label: 'RATA-RATA / LITER', value: avgPricePerLiter > 0 ? `Rp ${Math.round(avgPricePerLiter).toLocaleString('id-ID')}` : '—', sub: 'harga per liter' },
              { label: 'TOTAL SEMUA', value: `Rp ${totalCostAllTime.toLocaleString('id-ID')}`, sub: `${totalLiterAllTime.toFixed(1)} liter total` },
            ].map(({ label, value, sub }) => (
              <div key={label} style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 14, padding: '20px 16px', textAlign: 'center' }}>
                <p style={{ fontSize: 11, color: '#444', letterSpacing: 3, marginBottom: 8 }}>{label}</p>
                <p style={{ fontSize: 22, fontWeight: 700, fontFamily: 'monospace', color: '#00ff7f', marginBottom: 4 }}>{value}</p>
                <p style={{ fontSize: 12, color: '#555' }}>{sub}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FUEL CHART */}
      {isPrivate && monthlyFuel.some((d) => d.liter > 0) && (
        <div style={{ marginBottom: 60 }}>
          <h2 style={{ marginBottom: 20 }}>Konsumsi BBM — 6 Bulan Terakhir</h2>
          <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 14, padding: '20px 16px' }}>
            <FuelChart data={monthlyFuel} />
          </div>
        </div>
      )}

      {/* HISTORY */}
      <h2 style={{ marginBottom: 20 }}>Riwayat Perjalanan</h2>
      <div style={{ display: 'grid', gap: 16 }}>
        {displayEvents.map((event) => (
          <div key={event.id} style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: 20, borderRadius: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ textTransform: 'capitalize', fontSize: 18 }}>{event.event_type.replace(/_/g, ' ')}</strong>
              <span style={{ color: '#00ff7f', fontWeight: 700 }}>{event.odometer_km?.toLocaleString()} km</span>
            </div>
            <p style={{ color: '#555', fontSize: 14, marginTop: 4 }}>{event.event_date}</p>
            {event.event_type === 'fuel' && (event.fuel_liter || event.fuel_price_total) && (
              <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                {event.fuel_liter && <span style={{ fontSize: 13, color: '#666' }}>⛽ {event.fuel_liter} ltr</span>}
                {event.fuel_price_total && <span style={{ fontSize: 13, color: '#666' }}>💵 Rp {event.fuel_price_total.toLocaleString('id-ID')}</span>}
                {event.fuel_liter && event.fuel_price_total && <span style={{ fontSize: 13, color: '#444' }}>≈ Rp {Math.round(event.fuel_price_total / event.fuel_liter).toLocaleString('id-ID')}/ltr</span>}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* UNLOCK MODAL */}
      {showUnlock && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(5px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <div style={{ background: '#111', padding: 40, borderRadius: 24, width: 340, border: '1px solid #222', textAlign: 'center' }}>
            <h3 style={{ marginBottom: 24 }}>System Locked</h3>
            <input
              type='password'
              placeholder='Enter Code'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
              style={{ width: '100%', padding: 12, marginBottom: 16, background: '#000', border: '1px solid #333', color: '#fff', borderRadius: 12, textAlign: 'center', fontSize: 18 }}
            />
            <button onClick={handleUnlock} disabled={loading} style={{ width: '100%', padding: 14, background: '#fff', color: '#000', borderRadius: 12, fontWeight: 700, cursor: 'pointer' }}>
              {loading ? 'Verifying...' : 'Unlock System'}
            </button>
            {error && <p style={{ color: '#ff3b3b', marginTop: 16 }}>{error}</p>}
          </div>
        </div>
      )}
    </main>
  );
}
