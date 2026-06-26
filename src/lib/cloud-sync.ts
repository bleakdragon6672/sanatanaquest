// Cloud sync helpers — load/save the user's spiritual progress to the
// `user_progress` table in Supabase. Used by AuthGate (load on login) and
// the AppShell auto-save effect (debounced save on every state change).
//
// Table schema (managed by Supabase; one row per user_id):
//   user_id            uuid  PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE
//   user_name          text
//   total_xp           integer     DEFAULT 0
//   read_verses        jsonb       DEFAULT '{}'
//   reading_time_sec   integer     DEFAULT 0
//   current_streak     integer     DEFAULT 0
//   longest_streak     integer     DEFAULT 0
//   last_active_date   text
//   daily_activity     jsonb       DEFAULT '{}'
//   activities         jsonb       DEFAULT '[]'
//   bookmarks          jsonb       DEFAULT '[]'
//   highlights         jsonb       DEFAULT '[]'
//   notes              jsonb       DEFAULT '{}'
//   journal            jsonb       DEFAULT '[]'
//   challenge_progress jsonb       DEFAULT '{}'
//   unlocked_skills    jsonb       DEFAULT '[]'
//   reading_mode       text        DEFAULT 'full'
//   font_scale         real        DEFAULT 1
//   joined_at          bigint      DEFAULT extract(epoch from now()) * 1000
//   created_at         timestamptz DEFAULT now()
//   updated_at         timestamptz DEFAULT now()
//
// RLS: users can SELECT, INSERT, UPDATE only their own row.
//
// Recovery note: this table must exist on the Supabase project for cloud sync
// to work. A reference SQL migration is provided at:
//   /home/z/my-project/prisma/supabase_user_progress.sql

import { supabase } from '@/lib/supabase-client'
import type { User } from '@supabase/supabase-js'
import type {
  ActivityLog,
  ChallengeProgress,
  JournalEntry,
  ReadingMode,
  ReadingWidth,
  ReadingViewMode,
  AccentColor,
} from '@/lib/store'

/** Shape of the cloud row (snake_case DB columns). */
export interface CloudProgressRow {
  user_id: string
  user_name: string | null
  total_xp: number | null
  reading_time_sec: number | null
  current_streak: number | null
  longest_streak: number | null
  last_active_date: string | null
  read_verses: Record<string, number> | null
  bookmarks: string[] | null
  highlights: string[] | null
  notes: Record<string, string> | null
  daily_activity: Record<string, string[]> | null
  activities: ActivityLog[] | null
  journal: JournalEntry[] | null
  challenge_progress: Record<string, ChallengeProgress> | null
  unlocked_skills: string[] | null
  reading_mode: ReadingMode | null
  font_scale: number | null
  line_spacing: number | null
  reading_width: string | null
  reading_view_mode: string | null
  animations_enabled: boolean | null
  accent_color: string | null
  joined_at: number | null
}

/** Shape of the store state we serialize to the cloud. */
export interface StoreSnapshot {
  userName: string
  totalXp: number
  readingTimeSec: number
  currentStreak: number
  longestStreak: number
  lastActiveDate?: string
  readVerses: Record<string, number>
  bookmarks: string[]
  highlights: string[]
  notes: Record<string, string>
  dailyActivity: Record<string, string[]>
  activities: ActivityLog[]
  journal: JournalEntry[]
  challengeProgress: Record<string, ChallengeProgress>
  unlockedSkills: string[]
  readingMode: ReadingMode
  fontScale: number
  lineSpacing: number
  readingWidth: ReadingWidth
  readingViewMode: ReadingViewMode
  animationsEnabled: boolean
  accentColor: AccentColor
  joinedAt: number
}

/**
 * Load the user's progress row from Supabase. If no row exists yet, an empty
 * row is inserted (so subsequent saves can upsert without conflict).
 *
 * Returns null if no row exists OR if the load failed — caller should treat
 * null as "start fresh".
 */
export async function loadCloudProgress(user: User): Promise<StoreSnapshot | null> {
  if (!supabase) return null

  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (error) {
    // PGRST116 = no row found. Create an empty initial row.
    if (error.code === 'PGRST116') {
      const { error: insertError } = await supabase
        .from('user_progress')
        .insert({ user_id: user.id })
      if (insertError) {
        // Failed to create initial row — non-critical
      }
    }
    return null
  }

  if (!data) {
    return null
  }

  const row = data as CloudProgressRow

  return {
    userName: row.user_name || 'Seeker',
    totalXp: row.total_xp || 0,
    readingTimeSec: row.reading_time_sec || 0,
    currentStreak: row.current_streak || 0,
    longestStreak: row.longest_streak || 0,
    lastActiveDate: row.last_active_date || undefined,
    readVerses: row.read_verses || {},
    bookmarks: row.bookmarks || [],
    highlights: row.highlights || [],
    notes: row.notes || {},
    dailyActivity: row.daily_activity || {},
    activities: row.activities || [],
    journal: row.journal || [],
    challengeProgress: row.challenge_progress || {},
    unlockedSkills: row.unlocked_skills || [],
    readingMode: row.reading_mode || 'full',
    fontScale: row.font_scale || 1,
    lineSpacing: row.line_spacing ?? 1.8,
    readingWidth: (row.reading_width as ReadingWidth) || 'normal',
    readingViewMode: (row.reading_view_mode as ReadingViewMode) || 'standard',
    animationsEnabled: row.animations_enabled ?? true,
    accentColor: (row.accent_color as AccentColor) || 'saffron',
    joinedAt: row.joined_at || Date.now(),
  }
}

/**
 * Save the user's progress to Supabase (upsert on user_id).
 * Returns { error: null } on success, { error: string } on failure.
 */
export async function saveCloudProgress(
  user: User,
  snapshot: StoreSnapshot,
): Promise<{ error: string | null }> {
  if (!supabase) return { error: 'Supabase not configured' }

  const row: CloudProgressRow = {
    user_id: user.id,
    user_name: snapshot.userName,
    total_xp: snapshot.totalXp,
    reading_time_sec: snapshot.readingTimeSec,
    current_streak: snapshot.currentStreak,
    longest_streak: snapshot.longestStreak,
    last_active_date: snapshot.lastActiveDate ?? null,
    read_verses: snapshot.readVerses,
    bookmarks: snapshot.bookmarks,
    highlights: snapshot.highlights,
    notes: snapshot.notes,
    daily_activity: snapshot.dailyActivity,
    activities: snapshot.activities,
    journal: snapshot.journal,
    challenge_progress: snapshot.challengeProgress,
    unlocked_skills: snapshot.unlockedSkills,
    reading_mode: snapshot.readingMode,
    font_scale: snapshot.fontScale,
    line_spacing: snapshot.lineSpacing,
    reading_width: snapshot.readingWidth,
    reading_view_mode: snapshot.readingViewMode,
    animations_enabled: snapshot.animationsEnabled,
    accent_color: snapshot.accentColor,
    joined_at: snapshot.joinedAt,
  }

  const { error } = await supabase
    .from('user_progress')
    .upsert(row, { onConflict: 'user_id' })

  if (error) {
    return { error: error.message }
  }

  return { error: null }
}
