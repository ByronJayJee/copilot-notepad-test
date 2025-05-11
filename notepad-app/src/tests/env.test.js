export default async function testEnvironmentVariables() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Environment variables are not set correctly');
  }
  return 'Environment variables are set correctly';
}