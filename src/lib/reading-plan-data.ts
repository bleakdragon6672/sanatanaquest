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
  currentDay: number
  totalDays: number
  firstUnreadIndex: number
}

export function calculatePlanProgress(
  plan: ReadingPlan,
  readVerses: Record<string, number>,
): PlanProgressInfo {
  const gitaVerses = allVerses
  const totalVerses = gitaVerses.length // 700

  // Filter which Gita verses are read
  const readVerseIds = new Set(Object.keys(readVerses).filter((id) => /^\d+\.\d+$/.test(id)))
  const completedCount = readVerseIds.size
  const percentComplete = Math.min(100, Math.round((completedCount / totalVerses) * 100))
  const isGitaCompleted = completedCount >= totalVerses

  // Find first unread verse sequentially
  const firstUnreadIndex = gitaVerses.findIndex((v) => !readVerseIds.has(v.id))
  const startIndex = firstUnreadIndex === -1 ? 0 : firstUnreadIndex

  // Check how many Gita verses were read today
  const todayStr = new Date().toISOString().slice(0, 10)
  const readTodayIds = Object.entries(readVerses)
    .filter(([id, ts]) => {
      if (!/^\d+\.\d+$/.test(id)) return false
      try {
        const d = new Date(ts).toISOString().slice(0, 10)
        return d === todayStr
      } catch {
        return false
      }
    })
    .map(([id]) => id)

  const readTodayCount = readTodayIds.length
  const dailyTarget = plan.versesPerDay
  const isTodayTargetMet = readTodayCount >= dailyTarget

  // Verses assigned for today:
  // If target met, show today's read verses (or the current batch).
  // Otherwise, show the next unread ones up to dailyTarget.
  let currentSlice: Verse[] = []
  if (isGitaCompleted) {
    currentSlice = gitaVerses.slice(Math.max(0, totalVerses - dailyTarget))
  } else {
    currentSlice = gitaVerses.slice(startIndex, startIndex + dailyTarget)
  }

  const currentDay = Math.min(plan.targetDays, Math.floor(completedCount / dailyTarget) + 1)

  return {
    totalVerses,
    completedCount,
    percentComplete,
    isGitaCompleted,
    readTodayCount,
    dailyTarget,
    isTodayTargetMet,
    todaysVerses: currentSlice,
    currentDay,
    totalDays: plan.targetDays,
    firstUnreadIndex,
  }
}
