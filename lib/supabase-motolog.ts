import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | undefined;

export function getMotologSupabase(): SupabaseClient {
  if (!client) {
    const url = process.env.SUPABASE_MOTOLOG_URL;
    const key = process.env.SUPABASE_MOTOLOG_ANON_KEY;
    if (!url || !key) {
      throw new Error(
        'Missing SUPABASE_MOTOLOG_URL or SUPABASE_MOTOLOG_ANON_KEY. Add them to .env.local.',
      );
    }
    client = createClient(url, key);
  }
  return client;
}
