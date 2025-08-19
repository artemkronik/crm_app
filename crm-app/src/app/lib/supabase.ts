import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://eqibsckwfphppgbctntt.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // put your service key in .env

export const supabase = createClient(supabaseUrl, supabaseKey);
