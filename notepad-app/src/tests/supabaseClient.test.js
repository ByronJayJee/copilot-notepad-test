import { createClient } from '@supabase/supabase-js';

export default async function testSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase environment variables are missing');
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  if (!supabase) {
    throw new Error('Failed to initialize Supabase client');
  }

  return 'Supabase client initialized successfully';
}
