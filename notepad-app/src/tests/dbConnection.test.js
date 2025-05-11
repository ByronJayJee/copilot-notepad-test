import { createClient } from '@supabase/supabase-js';

export default async function testDatabaseConnection() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { data, error } = await supabase.from('test_table').select('*');

  if (error) {
    throw new Error(`Database connection failed: ${error.message}`);
  }

  if (!data || data.length === 0) {
    throw new Error('No data found in test_table');
  }

  return 'Database connection successful';
}
