import { createBrowserClient } from '@supabase/ssr';
import {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY
} from '$env/static/public';

// Browser-side Supabase client
// Only create client if env vars are set
export const supabase = PUBLIC_SUPABASE_URL && PUBLIC_SUPABASE_ANON_KEY
  ? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)
  : null;
