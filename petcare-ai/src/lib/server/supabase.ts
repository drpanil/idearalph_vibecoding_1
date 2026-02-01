import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import type { Cookies } from '@sveltejs/kit';
import {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY
} from '$env/static/public';
import { env } from '$env/dynamic/private';

// Server-side Supabase client with cookie handling
export function createSupabaseServerClient(cookies: Cookies) {
  if (!PUBLIC_SUPABASE_URL || !PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Missing Supabase environment variables');
  }

  return createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
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
  const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

  if (!PUBLIC_SUPABASE_URL || !serviceRoleKey) {
    throw new Error('Missing Supabase admin environment variables');
  }

  return createClient(PUBLIC_SUPABASE_URL, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
