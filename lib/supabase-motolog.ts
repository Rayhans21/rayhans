import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.SUPABASE_MOTOLOG_URL!,
  process.env.SUPABASE_MOTOLOG_ANON_KEY!
);