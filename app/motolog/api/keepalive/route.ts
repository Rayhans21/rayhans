import { NextResponse } from 'next/server';
import { getMotologSupabase } from '@/lib/supabase-motolog';

export async function GET() {
  // Dummy read — cukup untuk cegah pause
  await getMotologSupabase().from('events').select('id').limit(1);
  return NextResponse.json({ ok: true });
}
