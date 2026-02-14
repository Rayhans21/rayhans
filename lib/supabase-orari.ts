import { createClient } from '@supabase/supabase-js';

export const supabaseOrari = createClient(process.env.NEXT_PUBLIC_SUPABASE_ORARI_URL!, process.env.NEXT_PUBLIC_SUPABASE_ORARI_ANON_KEY!);
