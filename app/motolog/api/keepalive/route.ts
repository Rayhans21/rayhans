import { NextRequest, NextResponse } from 'next/server';
import { getMotologSupabase } from '@/lib/supabase-motolog';

export const dynamic = 'force-dynamic';

function isAuthorizedCron(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return true;
  return req.headers.get('authorization') === `Bearer ${secret}`;
}

export async function GET(req: NextRequest) {
  if (!isAuthorizedCron(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { error } = await getMotologSupabase().from('events').select('id').limit(1);
  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message, at: new Date().toISOString() },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, at: new Date().toISOString() });
}
