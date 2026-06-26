// Supabase client — single shared instance.
// URL + anon key are hardcoded to match the live deployment at sanatanaquest.space-z.ai.
// (These are public values — safe to ship in client bundles. Row-level security protects data.)
//
// Live deployment reference (extracted from JS bundle):
//   URL: https://gcisycfarozcykqhepzm.supabase.co
//   Anon PK: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
//
// To use a different Supabase project, override via NEXT_PUBLIC_SUPABASE_URL and
// NEXT_PUBLIC_SUPABASE_ANON_KEY env vars.
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://gcisycfarozcykqhepzm.supabase.co'

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjaXN5Y2Zhcm96Y3lrcWhlcHptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzNzQ1MDQsImV4cCI6MjA5Nzk1MDUwNH0.QxXJi57DREEnV2mOrOOy_e4I9wePIU6R0mZUDopFdfo'

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})
