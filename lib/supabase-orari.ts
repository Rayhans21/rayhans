import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | undefined;

export function getOrariSupabase(): SupabaseClient {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_ORARI_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ORARI_ANON_KEY;
    if (!url || !key) {
      throw new Error(
        'Missing NEXT_PUBLIC_SUPABASE_ORARI_URL or NEXT_PUBLIC_SUPABASE_ORARI_ANON_KEY. Add them to .env.local.',
      );
    }
    client = createClient(url, key);
  }
  return client;
}
