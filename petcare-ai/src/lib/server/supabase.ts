import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import type { Cookies } from '@sveltejs/kit';
import { env as publicEnv } from '$env/dynamic/public';
import { env as privateEnv } from '$env/dynamic/private';

// Server-side Supabase client with cookie handling
export function createSupabaseServerClient(cookies: Cookies) {
  const url = publicEnv.PUBLIC_SUPABASE_URL;
  const key = publicEnv.PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error('Missing Supabase environment variables');
  }

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookies.set(name, value, { ...options, path: '/' });
        });
      }
    }
  });
}

// Admin client for server-side operations (bypasses RLS)
export function getSupabaseAdmin() {
  const url = publicEnv.PUBLIC_SUPABASE_URL;
  const serviceRoleKey = privateEnv.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error('Missing Supabase admin environment variables');
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
