import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_MOTOLOG_URL!, process.env.NEXT_PUBLIC_SUPABASE_MOTOLOG_ANON_KEY!);
