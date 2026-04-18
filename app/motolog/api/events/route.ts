import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-motolog';
import { isMotologRequestAuthenticated } from '@/lib/motolog-auth-request';

export async function GET() {
  if (!(await isMotologRequestAuthenticated())) {
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
