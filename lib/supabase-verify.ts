import { createClient } from '@supabase/supabase-js';

const supabaseVerifyUrl = process.env.VSUPABASE_URL!;
const supabaseVerifyAnonKey = process.env.VSUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseVerifyUrl, supabaseVerifyAnonKey);

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
  created_at: string;
};
