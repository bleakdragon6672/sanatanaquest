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

import { ConvexHttpClient } from 'convex/browser'
import { api } from '@/convex/_generated/api'
import type { User } from '@supabase/supabase-js'

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL
const convexClient = convexUrl ? new ConvexHttpClient(convexUrl) : null
import {
  useStore,
  type ActivityLog,
  type ChallengeProgress,
  type JournalEntry,
  type ReadingMode,
  type ReadingWidth,
  type ReadingViewMode,
  type AccentColor,
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
  if (!convexClient) return null

  try {
    const row = await convexClient.query(api.progress.getProgress, { userId: user.id })
    if (!row) return null

    const snapshot: StoreSnapshot = {
      userName: row.userName || 'Seeker',
      totalXp: row.totalXp || 0,
      readingTimeSec: row.readingTimeSec || 0,
      currentStreak: row.currentStreak || 0,
      longestStreak: row.longestStreak || 0,
      lastActiveDate: row.lastActiveDate ?? undefined,
      readVerses: row.readVerses || {},
      bookmarks: row.bookmarks || [],
      highlights: row.highlights || [],
      notes: row.notes || {},
      dailyActivity: row.dailyActivity || {},
      activities: row.activities || [],
      journal: row.journal || [],
      challengeProgress: row.challengeProgress || {},
      unlockedSkills: row.unlockedSkills || [],
      readingMode: row.readingMode || 'full',
      fontScale: row.fontScale || 1,
      lineSpacing: row.lineSpacing ?? 1.8,
      readingWidth: (row.readingWidth as ReadingWidth) || 'normal',
      readingViewMode: (row.readingViewMode as ReadingViewMode) || 'standard',
      animationsEnabled: row.animationsEnabled ?? true,
      accentColor: (row.accentColor as AccentColor) || 'saffron',
      joinedAt: row.joinedAt || Date.now(),
    }

    try {
      lastSavedSignatures.set(user.id, JSON.stringify(snapshot))
    } catch {}

    return snapshot
  } catch (err) {
    console.warn('[Convex] Failed to load progress from cloud:', err)
    return null
  }
}

// In-memory cache of the last synced payload signature per user to prevent redundant DB writes & save Disk IO
const lastSavedSignatures = new Map<string, string>()

export function setCloudSyncBaseline(userId: string, snapshot: StoreSnapshot) {
  try {
    lastSavedSignatures.set(userId, JSON.stringify(snapshot))
  } catch {}
}

/**
 * Save the user's progress to Convex.
 * Skips the database write if the snapshot signature has not changed since the last save.
 * Returns { error: null, skipped?: boolean } on success, { error: string } on failure.
 */
export async function saveCloudProgress(
  user: User,
  snapshot: StoreSnapshot,
  force = false
): Promise<{ error: string | null; skipped?: boolean }> {
  if (!convexClient) return { error: null, skipped: true }

  let signature = ''
  try {
    signature = JSON.stringify(snapshot)
    if (!force && lastSavedSignatures.get(user.id) === signature) {
      return { error: null, skipped: true }
    }
  } catch {}

  try {
    await convexClient.mutation(api.progress.saveProgress, {
      userId: user.id,
      userName: snapshot.userName,
      totalXp: snapshot.totalXp,
      readingTimeSec: snapshot.readingTimeSec,
      currentStreak: snapshot.currentStreak,
      longestStreak: snapshot.longestStreak,
      lastActiveDate: snapshot.lastActiveDate,
      readVerses: snapshot.readVerses,
      bookmarks: snapshot.bookmarks,
      highlights: snapshot.highlights,
      notes: snapshot.notes,
      dailyActivity: snapshot.dailyActivity,
      activities: snapshot.activities,
      journal: snapshot.journal,
      challengeProgress: snapshot.challengeProgress,
      unlockedSkills: snapshot.unlockedSkills,
      readingMode: snapshot.readingMode,
      fontScale: snapshot.fontScale,
      lineSpacing: snapshot.lineSpacing,
      readingWidth: snapshot.readingWidth,
      readingViewMode: snapshot.readingViewMode,
      animationsEnabled: snapshot.animationsEnabled,
      accentColor: snapshot.accentColor,
      joinedAt: snapshot.joinedAt,
    })

    if (signature) {
      lastSavedSignatures.set(user.id, signature)
    }

    return { error: null }
  } catch (err) {
    return { error: String(err) }
  }
}

/**
 * Format a human-friendly display name from an email address when no name was entered.
 * e.g. "arjun.sharma@gmail.com" -> "Arjun Sharma"
 *      "priya_patel@yahoo.com" -> "Priya Patel"
 */
export function formatDisplayNameFromEmail(email: string): string {
  if (!email) return 'Seeker'
  const username = email.split('@')[0] || ''
  // Replace dots, underscores, hyphens, and strip trailing numbers
  const cleaned = username
    .replace(/[._-]+/g, ' ')
    .replace(/[0-9]+$/g, '')
    .trim()
  if (!cleaned) return 'Seeker'
  // Capitalize each word
  return cleaned
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
}

/**
 * Immediately update the user's public display name in both the local Zustand store
 * and the Supabase `user_progress` table.
 *
 * This ensures that when a user sets their public name on the Leaderboard or Profile,
 * the change takes effect immediately without waiting for the 2-second debounced auto-save.
 */
export async function updateCloudUserName(
  user: User,
  newName: string
): Promise<{ success: boolean; error?: string }> {
  const trimmed = newName.trim()
  if (!trimmed) {
    return { success: false, error: 'Name cannot be empty' }
  }

  // 1. Update local store
  useStore.getState().setUserName(trimmed)

  // 2. Update Convex if available
  if (convexClient) {
    try {
      await convexClient.mutation(api.progress.updateUserName, {
        userId: user.id,
        newName: trimmed,
      })
      lastSavedSignatures.delete(user.id)
    } catch (err) {
      return { success: false, error: String(err) }
    }
  }

  return { success: true }
}

export const DIVERSE_SEEKER_NAMES = [
  'Aarav Sharma',
  'Ananya Iyer',
  'Vikramaditya Sen',
  'Priya Patel',
  'Rohan Verma',
  'Devika Nair',
  'Keshav Rao',
  'Sunita Krishnan',
  'Aditya Deshmukh',
  'Meera Joshi',
  'Siddharth Gupta',
  'Pooja Kulkarni',
  'Kabir Dasgupta',
  'Sneha Reddy',
  'Arvind Swamy',
  'Kavita Nambiar',
  'Gautam Banerjee',
  'Tanvi Bhatia',
  'Harish Choudhury',
  'Divya Menon',
  'Naveen Hegde',
  'Ishita Mukherjee',
  'Rajesh Sundaram',
  'Shalini Tiwari',
  'Pranav Pillai',
  'Bhavna Saxena',
  'Manish Chawla',
  'Anuradha Somayaji',
  'Kunal Singhania',
  'Deepa Namboodiri',
  'Vivek Ramaswamy',
  'Tarun Bhatt',
]

/**
 * Resolves a seeker's public name so that nobody is ever shown as generic "Seeker".
 * - If the user has a custom name, returns that name.
 * - If the user never edited their name or has 'Seeker', deterministically assigns
 *   an authentic, distinct Dharmic name based on their unique userId.
 */
export function resolveSeekerName(
  rawName: string | null | undefined,
  userId: string | null | undefined,
  fallbackIndex = 0
): string {
  const trimmed = rawName?.trim()
  if (trimmed && trimmed !== 'Seeker' && !trimmed.startsWith('Seeker #')) {
    return trimmed
  }

  if (userId) {
    let hash = 0
    for (let i = 0; i < userId.length; i++) {
      hash = (hash << 5) - hash + userId.charCodeAt(i)
      hash |= 0
    }
    const idx = Math.abs(hash) % DIVERSE_SEEKER_NAMES.length
    return DIVERSE_SEEKER_NAMES[idx]
  }

  return DIVERSE_SEEKER_NAMES[fallbackIndex % DIVERSE_SEEKER_NAMES.length]
}


