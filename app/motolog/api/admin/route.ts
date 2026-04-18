import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-motolog';
import { isMotologRequestAuthenticated } from '@/lib/motolog-auth-request';

const ALLOWED_EVENT_FIELDS = ['event_date', 'event_type', 'odometer_km', 'fuel_liter', 'fuel_price_total', 'notes'] as const;

function pickAllowedEventFields(body: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const key of ALLOWED_EVENT_FIELDS) {
    if (key in body && body[key] !== undefined) {
      out[key] = body[key];
    }
  }
  return out;
}

async function requireAuth() {
  if (!(await isMotologRequestAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

// INSERT event baru
export async function POST(req: Request) {
  const denied = await requireAuth();
  if (denied) return denied;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  const { id: _drop, ...rest } = body;
  void _drop;
  const eventData = pickAllowedEventFields(rest);

  const { error } = await supabase.from('events').insert([eventData]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

// UPDATE event existing
export async function PUT(req: Request) {
  const denied = await requireAuth();
  if (denied) return denied;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  const id = body.id;
  if (typeof id !== 'string' || !id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  const { id: _id, ...rest } = body;
  void _id;
  const eventData = pickAllowedEventFields(rest);

  const { error } = await supabase.from('events').update(eventData).eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
