import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | undefined;

export function getVerifySupabase(): SupabaseClient {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_VSUPABASE_URL ?? process.env.VSUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_VSUPABASE_ANON_KEY ?? process.env.VSUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error(
        'Missing VSUPABASE_URL or VSUPABASE_ANON_KEY. Add them to .env.local.',
      );
    }
    client = createClient(url, key);
  }
  return client;
}

export type Surat = {
  id: string;
  nomor_surat: string;
  judul_surat: string;
  jenis_surat: string;
  perihal: string | null;
  penerima: string | null;
  penandatangan: string;
  tanggal_ttd: string;
  catatan: string | null;
  pdf_path: string | null;
  created_at: string;
};
