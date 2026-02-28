'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-motolog';

type Event = {
  id: string;
  event_type: string;
  odometer_km: number | null;
  event_date: string;
  fuel_liter?: number | null;
};

/* ============================= */
/* COMPONENTS                    */
/* ============================= */

function ProgressBar({ value }: { value: number }) {
  const safe = Math.min(Math.max(value, 0), 100);
  const color = safe < 70 ? '#00ff7f' : safe < 90 ? '#ffcc00' : '#ff3b3b';

  return (
    <div style={{ height: 10, background: '#111', borderRadius: 8, overflow: 'hidden', marginTop: 6 }}>
      <div
        style={{
          width: `${safe}%`,
          height: '100%',
          background: color,
          transition: '0.4s ease',
        }}
      />
    </div>
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
  /* DATA FETCHING & LOGIC         */
  /* ============================= */

  const dummyEvents: Event[] = [
    { id: '1', event_type: 'fuel', odometer_km: 12500, event_date: '2024-12-01', fuel_liter: 4 },
    { id: '2', event_type: 'fuel', odometer_km: 12400, event_date: '2024-11-20', fuel_liter: 4 },
  ];

  useEffect(() => {
    if (!isPrivate) return;
    let ignore = false;
    async function loadRealData() {
      const { data } = await supabase.from('events').select('*').order('event_date', { ascending: false });
      if (!ignore) setRealEvents(data ?? []);
    }
    loadRealData();
    return () => {
      ignore = true;
    };
  }, [isPrivate]);

  const displayEvents = (isPrivate ? realEvents : dummyEvents).slice().sort((a, b) => new Date(b.event_date).getTime() - new Date(a.event_date).getTime());
  const plateNumber = isPrivate ? 'BM 4583 AAL' : 'YC 5 NCM';
  const expNumber = isPrivate ? '10•24' : '21•02';
  const latestOdometer = displayEvents.length > 0 ? (displayEvents[0].odometer_km ?? 0) : 0;

  // Efficiency Calculation
  let efficiency = 0;
  const fuelEvents = displayEvents.filter((e) => e.event_type === 'fuel');
  if (fuelEvents.length >= 2) {
    const distance = (fuelEvents[0].odometer_km ?? 0) - (fuelEvents[1].odometer_km ?? 0);
    const liter = fuelEvents[0].fuel_liter ?? 0;
    if (distance > 0 && liter > 0) efficiency = distance / liter;
  }

  /* ============================= */
  /* GAUGE & RENDER UTILS          */
  /* ============================= */

  const MAX_EFFICIENCY = 80;
  const centerX = 160;
  const centerY = 180;
  const radius = 120;
  const needleRotation = (Math.min(efficiency, MAX_EFFICIENCY) / MAX_EFFICIENCY) * 240 - 120;

  function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ');
  }

  function renderTicks() {
    const ticks = [];
    for (let i = 0; i <= MAX_EFFICIENCY; i += 5) {
      const angle = (i / MAX_EFFICIENCY) * 240 - 120;
      const rad = ((angle - 90) * Math.PI) / 180;
      const isMajor = i % 20 === 0;
      const inner = radius - (isMajor ? 15 : 8);
      const outer = radius + 2;
      const x1 = centerX + inner * Math.cos(rad);
      const y1 = centerY + inner * Math.sin(rad);
      const x2 = centerX + outer * Math.cos(rad);
      const y2 = centerY + outer * Math.sin(rad);

      ticks.push(<line key={`tick-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={isMajor ? '#fff' : '#444'} strokeWidth={isMajor ? 2 : 1} />);

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
  /* MAINTENANCE LOGIC             */
  /* ============================= */

  const SERVICE_INTERVAL = 8000;
  const OIL_INTERVAL = 2000;
  const TIRE_INTERVAL = 12000;
  const serviceKm = displayEvents.find((e) => e.event_type === 'service')?.odometer_km ?? 0;
  const oilKm = displayEvents.find((e) => e.event_type === 'oil_change')?.odometer_km ?? 0;
  const tireKm = displayEvents.find((e) => e.event_type === 'tire_change')?.odometer_km ?? 0;
  const gearOilKm = displayEvents.find((e) => e.event_type === 'gear_oil')?.odometer_km ?? 0;

  const calcProgress = (lastKm: number, interval: number) => ((latestOdometer - lastKm) / interval) * 100;

  async function handleUnlock() {
    setLoading(true);
    setError('');
    const res = await fetch('/motolog/api/auth', { method: 'POST', body: JSON.stringify({ password }) });
    const data = await res.json();
    if (data.success) {
      setIsPrivate(true);
      setShowUnlock(false);
      setPassword('');
    } else {
      setError('Password salah');
    }
    setLoading(false);
  }

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#fff', padding: 40, maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 40, letterSpacing: -1 }}>MotoLog</h1>

      {/* PLATE NUMBER */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 60,
        }}
      >
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
          <div
            style={{
              position: 'absolute',
              inset: 10,
              border: '3px solid #000',
              borderRadius: 12,
            }}
          />

          {/* PLATE TEXT */}
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

          {/* EXP NUMBER */}
          <div
            style={{
              position: 'absolute',
              bottom: 18,
              right: 20,
              fontSize: 'clamp(12px, 3vw, 22px)',
              fontWeight: 700,
              color: '#000',
            }}
          >
            {expNumber}
          </div>
        </div>
      </div>
      {/* NEW RACING SPEEDOMETER */}
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

          {/* Decorative Outer Rings */}
          <path d={describeArc(160, 180, 145, -125, 125)} fill='none' stroke='#222' strokeWidth='1' />
          <path d={describeArc(160, 180, 138, -120, 120)} fill='none' stroke='url(#ringGradient)' strokeWidth='3' strokeOpacity='0.5' />

          {/* Main Track */}
          <path d={describeArc(160, 180, 120, -120, 120)} fill='none' stroke='#111' strokeWidth='14' strokeLinecap='round' />

          {renderTicks()}

          {/* Needle with Animation Fix */}
          <g
            style={{
              transform: `rotate(${needleRotation}deg)`,
              transformOrigin: '160px 180px',
              transition: 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <line x1='160' y1='188' x2='160' y2='75' stroke='#ff3b3b' strokeWidth='4' strokeLinecap='round' />
            <circle cx='160' cy='180' r='10' fill='#ff3b3b' />
            <circle cx='160' cy='180' r='4' fill='#fff' />
          </g>

          {/* Neon Digital Display */}
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

      {/* MAINTENANCE & HISTORY (Sama seperti sebelumnya) */}
      <div style={{ marginBottom: 60 }}>
        <h2 style={{ marginBottom: 24 }}>Maintenance Status</h2>
        <div style={{ display: 'grid', gap: 24 }}>
          <div>
            🛠 Service Berkala <ProgressBar value={calcProgress(serviceKm, SERVICE_INTERVAL)} />
          </div>
          <div>
            🛢 Ganti Oli <ProgressBar value={calcProgress(oilKm, OIL_INTERVAL)} />
          </div>
          <div>
            ⚙️ Gear Oil <ProgressBar value={calcProgress(gearOilKm, OIL_INTERVAL * 2)} />
          </div>
          <div>
            🛞 Ganti Ban <ProgressBar value={calcProgress(tireKm, TIRE_INTERVAL)} />
          </div>
        </div>
      </div>

      <h2 style={{ marginBottom: 20 }}>Riwayat Perjalanan</h2>
      <div style={{ display: 'grid', gap: 16 }}>
        {displayEvents.map((event) => (
          <div key={event.id} style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: 20, borderRadius: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ textTransform: 'capitalize', fontSize: 18 }}>{event.event_type.replace('_', ' ')}</strong>
              <span style={{ color: '#00ff7f', fontWeight: 700 }}>{event.odometer_km} km</span>
            </div>
            <p style={{ color: '#555', fontSize: 14, marginTop: 4 }}>{event.event_date}</p>
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
