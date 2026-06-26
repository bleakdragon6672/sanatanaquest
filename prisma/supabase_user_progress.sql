-- ─────────────────────────────────────────────────────────────────────
-- SanatanaQuest — Supabase migration for the `user_progress` table.
--
-- This file documents the cloud-sync schema expected by the recovered
-- source. To enable cloud sync on a Supabase project, run this SQL in
-- the Supabase SQL editor. The app hardcodes the project URL + anon key
-- at src/lib/supabase-client.ts — change those to point at your own
-- project if you fork.
--
-- Table: user_progress
--   One row per authenticated user. Upserted on every store change.
-- ─────────────────────────────────────────────────────────────────────

-- Enable the pgcrypto extension for gen_random_uuid() (usually already on).
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- The user_progress table — one row per user (RLS-protected below).
CREATE TABLE IF NOT EXISTS public.user_progress (
  user_id            uuid         PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name          text         DEFAULT 'Seeker',
  total_xp           integer      NOT NULL DEFAULT 0,
  reading_time_sec   integer      NOT NULL DEFAULT 0,
  current_streak     integer      NOT NULL DEFAULT 0,
  longest_streak     integer      NOT NULL DEFAULT 0,
  last_active_date   text,
  read_verses        jsonb        NOT NULL DEFAULT '{}'::jsonb,
  bookmarks          jsonb        NOT NULL DEFAULT '[]'::jsonb,
  highlights         jsonb        NOT NULL DEFAULT '[]'::jsonb,
  notes              jsonb        NOT NULL DEFAULT '{}'::jsonb,
  daily_activity     jsonb        NOT NULL DEFAULT '{}'::jsonb,
  activities         jsonb        NOT NULL DEFAULT '[]'::jsonb,
  journal            jsonb        NOT NULL DEFAULT '[]'::jsonb,
  challenge_progress jsonb        NOT NULL DEFAULT '{}'::jsonb,
  unlocked_skills    jsonb        NOT NULL DEFAULT '[]'::jsonb,
  reading_mode       text         NOT NULL DEFAULT 'full',
  font_scale         real         NOT NULL DEFAULT 1,
  line_spacing       real         NOT NULL DEFAULT 1.8,
  reading_width      text         NOT NULL DEFAULT 'normal',
  reading_view_mode  text         NOT NULL DEFAULT 'standard',
  animations_enabled boolean      NOT NULL DEFAULT true,
  accent_color       text         NOT NULL DEFAULT 'saffron',
  joined_at          bigint       NOT NULL DEFAULT (extract(epoch from now()) * 1000)::bigint,
  created_at         timestamptz  NOT NULL DEFAULT now(),
  updated_at         timestamptz  NOT NULL DEFAULT now()
);

-- Auto-update updated_at on every row update.
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_user_progress_touch_updated_at ON public.user_progress;
CREATE TRIGGER trg_user_progress_touch_updated_at
  BEFORE UPDATE ON public.user_progress
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- ── Row-Level Security ─────────────────────────────────────────────────
-- Each user can only SELECT, INSERT, UPDATE, DELETE their own row.

ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own progress" ON public.user_progress;
CREATE POLICY "Users can read own progress"
  ON public.user_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own progress" ON public.user_progress;
CREATE POLICY "Users can insert own progress"
  ON public.user_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own progress" ON public.user_progress;
CREATE POLICY "Users can update own progress"
  ON public.user_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own progress" ON public.user_progress;
CREATE POLICY "Users can delete own progress"
  ON public.user_progress
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ── Notes ─────────────────────────────────────────────────────────────
-- 1. Auth (sign-up / sign-in) is handled by Supabase Auth directly —
--    no custom auth tables required. Email/password with email confirmation
--    is the default flow used by the SanatanaQuest app.
--
-- 2. The anon key in src/lib/supabase-client.ts is safe to ship in client
--    bundles because RLS prevents anyone from reading/writing another
--    user's data.
--
-- 3. To use a different Supabase project, set these env vars in .env.local:
--      NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
--      NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
--    Then run this SQL on your new project.
