import { createBrowserClient } from '@supabase/ssr';
import { env } from '$env/dynamic/public';

// Browser-side Supabase client
// Only create client if env vars are set
export function getSupabase() {
  const url = env.PUBLIC_SUPABASE_URL;
  const key = env.PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn('Supabase env vars not configured');
    return null;
  }

  return createBrowserClient(url, key);
}
