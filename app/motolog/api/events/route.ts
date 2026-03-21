import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-motolog';

export async function GET(req: Request) {
  const token = req.headers.get('x-motolog-token');

  if (!process.env.MOTOLOG_PASSWORD || token !== process.env.MOTOLOG_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('event_date', { ascending: false });

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}