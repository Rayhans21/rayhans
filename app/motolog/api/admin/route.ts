import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-motolog';

function isAuthorized(req: Request) {
  const token = req.headers.get('x-motolog-token');
  return !!process.env.MOTOLOG_PASSWORD && token === process.env.MOTOLOG_PASSWORD;
}

// INSERT event baru
export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { id, ...eventData } = body;

  const { error } = await supabase.from('events').insert([eventData]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

// UPDATE event existing
export async function PUT(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { id, ...eventData } = body;

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  const { error } = await supabase.from('events').update(eventData).eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}