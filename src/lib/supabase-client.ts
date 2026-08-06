// Supabase client — single shared instance.
//
// Project URL + anon key come from env vars (public, client-safe values —
// Row-Level Security protects user data):
//   NEXT_PUBLIC_SUPABASE_URL      e.g. https://<project-ref>.supabase.co
//   NEXT_PUBLIC_SUPABASE_ANON_KEY your project's anon (public) key
//
// If either is missing, `supabase` is null and the app degrades gracefully
// (the auth screen explains how to enable cloud sync) instead of throwing
// network errors against a misconfigured URL.
//
// ⚠️ The project previously hardcoded here (gcisycfarozcykqhepzm.supabase.co)
// was DELETED — its subdomain no longer resolves in DNS, which made every
// auth/cloud call fail with "Failed to fetch". Do not re-add hardcoded
// credentials; always configure via env vars.
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase: SupabaseClient | null =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      })
    : null
