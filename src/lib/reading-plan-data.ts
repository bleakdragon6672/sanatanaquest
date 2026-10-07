// Paced Scripture Completion Plans for Sanatan Quest
import { allVerses, type Verse } from './gita-data'

export type ReadingPlanTier = 'gentle' | 'steady' | 'intensive' | 'custom'

export interface ReadingPlanConfig {
  tier: ReadingPlanTier
  name: string
  sanskritName: string
  tagline: string
  versesPerDay: number
  targetDays: number
  minutesPerDay: number
  badge: string
  icon: string
  quote: string
  color: string
}

export interface ReadingPlan {
  id: string
  tier: ReadingPlanTier
  name: string
  sanskritName: string
  versesPerDay: number
  targetDays: number
  createdAt: number
  lastCompletedDate?: string
}

export const PLAN_CONFIGS: Record<ReadingPlanTier, ReadingPlanConfig> = {
  gentle: {
    tier: 'gentle',
    name: 'Gentle Seeker',
    sanskritName: 'जिज्ञासु',
    tagline: '2 Shlokas / day',
    versesPerDay: 2,
    targetDays: 350,
    minutesPerDay: 3,
    badge: 'Beginner Friendly',
    icon: '🌱',
    quote: 'A slow, mindful sip of daily wisdom. Perfect for building a lifelong habit.',
    color: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
  },
  steady: {
    tier: 'steady',
    name: 'Steady Practitioner',
    sanskritName: 'साधक',
    tagline: '5 Shlokas / day',
    versesPerDay: 5,
    targetDays: 140,
    minutesPerDay: 8,
    badge: 'Most Popular',
    icon: '🪷',
    quote: 'The golden balance of regular, dedicated sadhana before daily work.',
    color: 'from-amber-500/10 to-primary/10 border-amber-500/30 text-amber-600 dark:text-amber-400',
  },
  intensive: {
    tier: 'intensive',
    name: 'Kurukshetra Scholar',
    sanskritName: 'योद्धा',
    tagline: '1 Chapter / day (18 Days)',
    versesPerDay: 39,
    targetDays: 18,
    minutesPerDay: 25,
    badge: 'Fast Track',
    icon: '⚔️',
    quote: 'Immerse deeply like Arjuna before the battle. Transform your perspective in 18 days.',
    color: 'from-rose-500/10 to-orange-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400',
  },
  custom: {
    tier: 'custom',
    name: 'Custom Pace',
    sanskritName: 'स्वधर्म',
    tagline: 'Personalized Daily Quota',
    versesPerDay: 3,
    targetDays: 234,
    minutesPerDay: 5,
    badge: 'Customized',
    icon: '⚙️',
    quote: 'Set your own target completion date and daily volume.',
    color: 'from-sky-500/10 to-indigo-500/10 border-sky-500/30 text-sky-600 dark:text-sky-400',
  },
}

export function createPlanFromTier(tier: ReadingPlanTier, customVersesPerDay?: number): ReadingPlan {
  const config = PLAN_CONFIGS[tier]
  const vpd = tier === 'custom' && customVersesPerDay && customVersesPerDay > 0
    ? customVersesPerDay
    : config.versesPerDay

  const targetDays = Math.ceil(700 / vpd)

  return {
    id: `plan_${tier}_${Date.now()}`,
    tier,
    name: config.name,
    sanskritName: config.sanskritName,
    versesPerDay: vpd,
    targetDays,
    createdAt: Date.now(),
  }
}

export interface PlanProgressInfo {
  totalVerses: number
  completedCount: number
  percentComplete: number
  isGitaCompleted: boolean
  readTodayCount: number
  dailyTarget: number
  isTodayTargetMet: boolean
  todaysVerses: Verse[]
  tomorrowsVerses: Verse[]
  currentDay: number
  totalDays: number
  firstUnreadIndex: number
  todayStartIndex: number
  tomorrowStartIndex: number
}

// Local date string in YYYY-MM-DD format based on seeker's local calendar
export function getLocalDateStr(date: Date = new Date()): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function calculatePlanProgress(
  plan: ReadingPlan,
  readVerses: Record<string, number> = {},
  dailyActivity: Record<string, string[]> = {},
  targetDateStr?: string,
): PlanProgressInfo {
  const gitaVerses = allVerses
  const totalVerses = gitaVerses.length // 700

  // Filter which Gita verses are read
  const readVerseIds = new Set(Object.keys(readVerses).filter((id) => /^\d+\.\d+$/.test(id)))
  const completedCount = readVerseIds.size
  const percentComplete = Math.min(100, Math.round((completedCount / totalVerses) * 100))
  const isGitaCompleted = completedCount >= totalVerses

  // Local calendar date for today (e.g. "2026-10-08")
  const todayStr = targetDateStr || getLocalDateStr()

  // Find verses read on today's calendar date
  // Look up dailyActivity[todayStr] for verses that are currently marked read
  const activityToday = (dailyActivity[todayStr] || []).filter(
    (id) => /^\d+\.\d+$/.test(id) && readVerseIds.has(id)
  )
  const readTodayIds = new Set(activityToday)
  const readTodayCount = readTodayIds.size
  const dailyTarget = plan.versesPerDay || 5
  const isTodayTargetMet = readTodayCount >= dailyTarget

  // Verses read before today:
  // Any verse marked read in readVerses that was NOT read on today's date
  const readBeforeTodayIds = new Set(
    [...readVerseIds].filter((id) => !readTodayIds.has(id))
  )

  // Find the first verse that was NOT read before today.
  // This guarantees today's portion remains anchored throughout today while the user reads it!
  const firstUnreadBeforeToday = gitaVerses.findIndex((v) => !readBeforeTodayIds.has(v.id))
  const todayStartIndex = firstUnreadBeforeToday === -1 ? 0 : firstUnreadBeforeToday

  // Today's portion:
  // Show at least `dailyTarget` verses starting from `todayStartIndex`.
  // If user read ahead today (e.g. 7 read when target is 5), include all read today!
  const todaySliceLength = Math.max(dailyTarget, readTodayCount)
  const todaysVerses = isGitaCompleted
    ? gitaVerses.slice(Math.max(0, totalVerses - dailyTarget))
    : gitaVerses.slice(todayStartIndex, Math.min(totalVerses, todayStartIndex + todaySliceLength))

  // Tomorrow's portion (for preview or next-day projection):
  const tomorrowStartIndex = Math.min(totalVerses, todayStartIndex + todaySliceLength)
  const tomorrowsVerses = isGitaCompleted
    ? []
    : gitaVerses.slice(tomorrowStartIndex, Math.min(totalVerses, tomorrowStartIndex + dailyTarget))

  // Calculate currentDay (1 to targetDays) based on how many verses were read before today
  const readBeforeTodayCount = readBeforeTodayIds.size
  const currentDay = Math.min(
    plan.targetDays,
    Math.floor(readBeforeTodayCount / dailyTarget) + 1
  )

  // First unread verse index overall
  const firstUnreadIndex = gitaVerses.findIndex((v) => !readVerseIds.has(v.id))

  return {
    totalVerses,
    completedCount,
    percentComplete,
    isGitaCompleted,
    readTodayCount,
    dailyTarget,
    isTodayTargetMet,
    todaysVerses,
    tomorrowsVerses,
    currentDay,
    totalDays: plan.targetDays,
    firstUnreadIndex: firstUnreadIndex === -1 ? totalVerses : firstUnreadIndex,
    todayStartIndex,
    tomorrowStartIndex,
  }
}
