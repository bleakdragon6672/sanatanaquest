// Sanatan Quest — Global user state (Zustand + localStorage persistence)
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { gitaChapters } from './gita-data'

export type ReadingMode =
  | 'sanskrit'
  | 'english'
  | 'sanskrit-english'
  | 'full'
  | 'focus'
  | 'night'

export type ActivityType =
  | 'gita'
  | 'ramayana'
  | 'meditation'
  | 'chanting'
  | 'temple'
  | 'charity'
  | 'yoga'
  | 'puja'
  | 'service'
  | 'gratitude'

export interface ActivityLog {
  id: string
  type: ActivityType
  date: string // ISO yyyy-mm-dd
  timestamp: number
  duration?: number // minutes
  note?: string
}

export interface JournalEntry {
  id: string
  date: string
  timestamp: number
  type: 'reflection' | 'insight' | 'gratitude'
  content: string
}

export interface ChallengeProgress {
  id: string
  startedAt: number
  completedDays: number[] // day numbers 1..N
  lastCheckedDate?: string
  completed?: boolean
}

export interface ActivitySessionLog {
  // Verses read: verseId -> timestamp
  verseId: string
  timestamp: number
  date: string
}

export interface ProgressState {
  // Verses read with timestamps
  readVerses: Record<string, number>
  // Reading time in seconds
  readingTimeSec: number
  // Last active date (yyyy-mm-dd)
  lastActiveDate?: string
  // Streak counts
  currentStreak: number
  longestStreak: number
  // Daily activity record: date -> set of activity types
  dailyActivity: Record<string, string[]>
}

export interface Level {
  name: string
  minXp: number
  sanskritName: string
  icon: string // emoji or symbol
}

export const SPIRITUAL_LEVELS: Level[] = [
  { name: 'Seeker', sanskritName: 'जिज्ञासु', minXp: 0, icon: '🌱' },
  { name: 'Sadhak', sanskritName: 'साधक', minXp: 100, icon: '🪷' },
  { name: 'Bhakta', sanskritName: 'भक्त', minXp: 300, icon: '🙏' },
  { name: 'Yogi', sanskritName: 'योगी', minXp: 700, icon: '🧘' },
  { name: 'Acharya', sanskritName: 'आचार्य', minXp: 1500, icon: '📜' },
  { name: 'Rishi', sanskritName: 'ऋषि', minXp: 3000, icon: '🔱' },
  { name: 'Dharma Guardian', sanskritName: 'धर्मरक्षक', minXp: 6000, icon: '🕊️' },
]

export const ACTIVITY_XP: Record<ActivityType, number> = {
  gita: 10,
  ramayana: 10,
  meditation: 15,
  chanting: 20,
  temple: 25,
  charity: 30,
  yoga: 15,
  puja: 20,
  service: 20,
  gratitude: 10,
}

export const ACTIVITY_LABELS: Record<ActivityType, { label: string; icon: string; sanskrit: string }> = {
  gita: { label: 'Bhagavad Gita Reading', icon: '📖', sanskrit: 'गीता' },
  ramayana: { label: 'Ramayana Reading', icon: '📕', sanskrit: 'रामायण' },
  meditation: { label: 'Meditation', icon: '🧘', sanskrit: 'ध्यान' },
  chanting: { label: 'Chanting', icon: '📿', sanskrit: 'जप' },
  temple: { label: 'Temple Visit', icon: '🛕', sanskrit: 'मंदिर' },
  charity: { label: 'Charity (Daan)', icon: '🤲', sanskrit: 'दान' },
  yoga: { label: 'Yoga Practice', icon: '🤸', sanskrit: 'योग' },
  puja: { label: 'Puja / Worship', icon: '🔥', sanskrit: 'पूजा' },
  service: { label: 'Service to Others', icon: '👐', sanskrit: 'सेवा' },
  gratitude: { label: 'Gratitude Practice', icon: '💛', sanskrit: 'कृतज्ञता' },
}

export interface Challenge {
  id: string
  title: string
  sanskritTitle: string
  description: string
  days: number
  xpReward: number
  activityType?: ActivityType
  badge: string
  color: string
}

export const CHALLENGES: Challenge[] = [
  { id: 'gita-7', title: '7-Day Gita Challenge', sanskritTitle: 'गीता सप्ताह', description: 'Read at least 3 verses of the Gita every day for 7 days.', days: 7, xpReward: 50, activityType: 'gita', badge: '📜', color: 'saffron' },
  { id: 'med-21', title: '21-Day Meditation Challenge', sanskritTitle: 'ध्यान एकविंशति', description: 'Meditate for at least 10 minutes daily for 21 days.', days: 21, xpReward: 150, activityType: 'meditation', badge: '🧘', color: 'gold' },
  { id: 'disc-30', title: '30-Day Discipline Challenge', sanskritTitle: 'तपः त्रिंशत्', description: 'Maintain a daily spiritual practice for 30 consecutive days.', days: 30, xpReward: 200, badge: '🔱', color: 'vermilion' },
  { id: 'hanuman-40', title: 'Hanuman Chalisa Challenge', sanskritTitle: 'हनुमान चालीसा', description: 'Chant Hanuman Chalisa daily for 40 days.', days: 40, xpReward: 250, activityType: 'chanting', badge: '🐒', color: 'saffron' },
  { id: 'bhakti-14', title: '14-Day Bhakti Challenge', sanskritTitle: 'भक्ति पखवाड़ा', description: 'Perform puja or devotional practice for 14 days.', days: 14, xpReward: 100, activityType: 'puja', badge: '🙏', color: 'gold' },
  { id: 'karma-7', title: '7-Day Karma Yoga Challenge', sanskritTitle: 'कर्म योग सप्ताह', description: 'Perform one act of service or charity daily for 7 days.', days: 7, xpReward: 75, activityType: 'service', badge: '👐', color: 'vermilion' },
]

export interface SkillNode {
  id: string
  name: string
  sanskritName: string
  description: string
  path: 'bhakti' | 'jnana' | 'karma' | 'yoga'
  requiredActivities: ActivityType[]
  icon: string
  xpReward: number
}

export const SKILL_TREE: SkillNode[] = [
  // Bhakti
  { id: 'krishna-bhakti', name: 'Krishna Bhakti', sanskritName: 'कृष्ण भक्ति', description: 'Cultivate devotion to Lord Krishna through chanting and worship.', path: 'bhakti', requiredActivities: ['chanting', 'puja'], icon: '🪈', xpReward: 100 },
  { id: 'rama-bhakti', name: 'Rama Bhakti', sanskritName: 'राम भक्ति', description: 'Devotion to Lord Rama — embody dharma, truth, and duty.', path: 'bhakti', requiredActivities: ['chanting', 'gita'], icon: '🏹', xpReward: 100 },
  { id: 'hanuman-bhakti', name: 'Hanuman Bhakti', sanskritName: 'हनुमत् भक्ति', description: 'Devotion to Hanuman — surrender, strength, and selfless service.', path: 'bhakti', requiredActivities: ['chanting', 'service'], icon: '🐒', xpReward: 100 },
  // Jnana
  { id: 'gita-jnana', name: 'Bhagavad Gita', sanskritName: 'गीता ज्ञान', description: 'Master the wisdom of the Gita through daily reading and reflection.', path: 'jnana', requiredActivities: ['gita'], icon: '📖', xpReward: 100 },
  { id: 'vedanta', name: 'Vedanta', sanskritName: 'वेदान्त', description: 'Study the Upanishadic wisdom of the Self (Atman) and Brahman.', path: 'jnana', requiredActivities: ['gita', 'meditation'], icon: '🌅', xpReward: 120 },
  { id: 'upanishads', name: 'Upanishads', sanskritName: 'उपनिषद्', description: 'Sit with the sages — contemplate the deepest truths of existence.', path: 'jnana', requiredActivities: ['meditation', 'gita'], icon: '🔱', xpReward: 150 },
  // Karma
  { id: 'service', name: 'Service (Seva)', sanskritName: 'सेवा', description: 'Selfless service without expectation of reward — the heart of karma yoga.', path: 'karma', requiredActivities: ['service'], icon: '👐', xpReward: 80 },
  { id: 'duty', name: 'Duty (Dharma)', sanskritName: 'धर्म', description: 'Perform your duty faithfully, surrendering results to the Divine.', path: 'karma', requiredActivities: ['gita', 'puja'], icon: '⚖️', xpReward: 100 },
  { id: 'discipline', name: 'Discipline (Tapas)', sanskritName: 'तपस्', description: 'Cultivate steady discipline in body, speech, and mind.', path: 'karma', requiredActivities: ['yoga', 'meditation'], icon: '🔥', xpReward: 120 },
  // Yoga
  { id: 'meditation', name: 'Meditation (Dhyana)', sanskritName: 'ध्यान', description: 'Steady the mind in the Self through daily meditation practice.', path: 'yoga', requiredActivities: ['meditation'], icon: '🧘', xpReward: 80 },
  { id: 'mindfulness', name: 'Mindfulness', sanskritName: 'स्मृति', description: 'Maintain continuous awareness throughout daily activities.', path: 'yoga', requiredActivities: ['meditation', 'gratitude'], icon: '👁️', xpReward: 100 },
  { id: 'self-control', name: 'Self-Control', sanskritName: 'इन्द्रिय निग्रह', description: 'Master the senses — the gateway to wisdom, peace, and liberation.', path: 'yoga', requiredActivities: ['yoga', 'meditation'], icon: '🎯', xpReward: 120 },
]

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  check: (state: StoreState) => boolean
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-verse', title: 'First Verse Read', description: 'Read your first verse of the Gita.', icon: '📜', check: (s) => Object.keys(s.readVerses).length >= 1 },
  { id: 'first-chapter', title: 'First Chapter Completed', description: 'Complete reading an entire chapter.', icon: '📕', check: (s) => s.chaptersCompleted.length >= 1 },
  { id: '100-verses', title: '100 Verses Read', description: 'Read 100 unique verses of the Gita.', icon: '📚', check: (s) => Object.keys(s.readVerses).length >= 100 },
  { id: '7-streak', title: '7-Day Streak', description: 'Maintain a 7-day reading streak.', icon: '🔥', check: (s) => s.currentStreak >= 7 },
  { id: '30-streak', title: '30-Day Streak', description: 'Maintain a 30-day reading streak.', icon: '⚡', check: (s) => s.currentStreak >= 30 },
  { id: 'gita-complete', title: 'Entire Bhagavad Gita Completed', description: 'Read all 700 verses of the Gita.', icon: '🏆', check: (s) => Object.keys(s.readVerses).length >= 700 },
  { id: 'med-100', title: '100 Meditation Sessions', description: 'Complete 100 meditation sessions.', icon: '🧘', check: (s) => s.activities.filter(a => a.type === 'meditation').length >= 100 },
  { id: '1000-xp', title: '1000 Dharma XP', description: 'Earn 1000 Dharma XP in total.', icon: '🌟', check: (s) => s.totalXp >= 1000 },
  { id: 'first-journal', title: 'First Reflection', description: 'Write your first journal entry.', icon: '✍️', check: (s) => s.journal.length >= 1 },
  { id: 'bhakta', title: 'True Bhakta', description: 'Complete 50 puja or chanting sessions.', icon: '🙏', check: (s) => s.activities.filter(a => a.type === 'puja' || a.type === 'chanting').length >= 50 },
  { id: 'karma-yogi', title: 'Karma Yogi', description: 'Perform 25 acts of service or charity.', icon: '👐', check: (s) => s.activities.filter(a => a.type === 'service' || a.type === 'charity').length >= 25 },
  { id: 'scholar', title: 'Vedic Scholar', description: 'Unlock 6 skill tree nodes.', icon: '🎓', check: (s) => s.unlockedSkills.length >= 6 },
]

interface StoreState {
  // Identity
  userName: string
  joinedAt: number

  // Settings
  readingMode: ReadingMode
  fontScale: number

  // Progress
  readVerses: Record<string, number>
  readingTimeSec: number
  currentStreak: number
  longestStreak: number
  lastActiveDate?: string
  dailyActivity: Record<string, string[]>

  // Bookmarks / highlights / notes
  bookmarks: string[]
  highlights: string[]
  notes: Record<string, string>

  // XP & Levels
  totalXp: number

  // Activities
  activities: ActivityLog[]

  // Journal
  journal: JournalEntry[]

  // Challenges
  challengeProgress: Record<string, ChallengeProgress>

  // Skill tree
  unlockedSkills: string[]

  // Actions
  setUserName: (name: string) => void
  setReadingMode: (m: ReadingMode) => void
  setFontScale: (n: number) => void

  markVerseRead: (verseId: string) => void
  unmarkVerseRead: (verseId: string) => void
  addReadingTime: (sec: number) => void
  touchStreak: () => void

  toggleBookmark: (verseId: string) => void
  toggleHighlight: (verseId: string) => void
  setNote: (verseId: string, note: string) => void

  logActivity: (type: ActivityType, duration?: number, note?: string) => void

  addJournal: (type: JournalEntry['type'], content: string) => void
  deleteJournal: (id: string) => void

  startChallenge: (id: string) => void
  checkInChallenge: (id: string) => void

  unlockSkill: (id: string) => void

  resetAll: () => void

  // Derived (computed in selectors)
  chaptersCompleted: string[]
  level: Level
}

// Helper: today's date as yyyy-mm-dd in local tz
function todayStr(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function diffDays(a: string, b: string): number {
  const da = new Date(a + 'T00:00:00')
  const db = new Date(b + 'T00:00:00')
  return Math.round((db.getTime() - da.getTime()) / 86400000)
}

// Determine completed chapters from readVerses
function computeChaptersCompleted(readVerses: Record<string, number>): string[] {
  const result: string[] = []
  for (const ch of gitaChapters) {
    // Mark complete if all *listed* verses in that chapter are read
    const allRead = ch.verses.every((v) => readVerses[v.id])
    if (allRead && ch.verses.length > 0) result.push(`Chapter ${ch.number}`)
  }
  return result
}

export function getLevel(xp: number): Level {
  let level = SPIRITUAL_LEVELS[0]
  for (const l of SPIRITUAL_LEVELS) {
    if (xp >= l.minXp) level = l
  }
  return level
}

export function getNextLevel(xp: number): Level | null {
  for (const l of SPIRITUAL_LEVELS) {
    if (xp < l.minXp) return l
  }
  return null
}

const initialState = {
  userName: 'Seeker',
  joinedAt: Date.now(),
  readingMode: 'full' as ReadingMode,
  fontScale: 1,
  readVerses: {} as Record<string, number>,
  readingTimeSec: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: undefined as string | undefined,
  dailyActivity: {} as Record<string, string[]>,
  bookmarks: [] as string[],
  highlights: [] as string[],
  notes: {} as Record<string, string>,
  totalXp: 0,
  activities: [] as ActivityLog[],
  journal: [] as JournalEntry[],
  challengeProgress: {} as Record<string, ChallengeProgress>,
  unlockedSkills: [] as string[],
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setUserName: (name) => set({ userName: name || 'Seeker' }),
      setReadingMode: (m) => set({ readingMode: m }),
      setFontScale: (n) => set({ fontScale: Math.min(1.6, Math.max(0.85, n)) }),

      markVerseRead: (verseId) => {
        const state = get()
        if (state.readVerses[verseId]) return // already counted
        set({
          readVerses: { ...state.readVerses, [verseId]: Date.now() },
          totalXp: state.totalXp + ACTIVITY_XP.gita,
        })
        get().touchStreak()
      },

      unmarkVerseRead: (verseId) => {
        const state = get()
        if (!state.readVerses[verseId]) return
        const newReadVerses = { ...state.readVerses }
        delete newReadVerses[verseId]
        set({ readVerses: newReadVerses })
      },

      addReadingTime: (sec) => {
        const state = get()
        set({ readingTimeSec: state.readingTimeSec + sec })
      },

      touchStreak: () => {
        const state = get()
        const today = todayStr()
        if (state.lastActiveDate === today) return
        let newStreak = 1
        if (state.lastActiveDate) {
          const d = diffDays(state.lastActiveDate, today)
          if (d === 1) newStreak = state.currentStreak + 1
          else if (d <= 0) newStreak = state.currentStreak
          else newStreak = 1 // gap
        }
        set({
          currentStreak: newStreak,
          longestStreak: Math.max(state.longestStreak, newStreak),
          lastActiveDate: today,
        })
      },

      toggleBookmark: (verseId) => {
        const state = get()
        const exists = state.bookmarks.includes(verseId)
        set({
          bookmarks: exists
            ? state.bookmarks.filter((b) => b !== verseId)
            : [...state.bookmarks, verseId],
        })
      },

      toggleHighlight: (verseId) => {
        const state = get()
        const exists = state.highlights.includes(verseId)
        set({
          highlights: exists
            ? state.highlights.filter((h) => h !== verseId)
            : [...state.highlights, verseId],
        })
      },

      setNote: (verseId, note) => {
        const state = get()
        const newNotes = { ...state.notes }
        if (note.trim()) newNotes[verseId] = note
        else delete newNotes[verseId]
        set({ notes: newNotes })
      },

      logActivity: (type, duration, note) => {
        const state = get()
        const today = todayStr()
        const entry: ActivityLog = {
          id: `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          type,
          date: today,
          timestamp: Date.now(),
          duration,
          note,
        }
        const daily = { ...state.dailyActivity }
        daily[today] = Array.from(new Set([...(daily[today] ?? []), type]))
        set({
          activities: [entry, ...state.activities].slice(0, 2000),
          totalXp: state.totalXp + ACTIVITY_XP[type],
          dailyActivity: daily,
        })
        get().touchStreak()
      },

      addJournal: (type, content) => {
        const state = get()
        const entry: JournalEntry = {
          id: `j-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          date: todayStr(),
          timestamp: Date.now(),
          type,
          content,
        }
        set({ journal: [entry, ...state.journal].slice(0, 500) })
      },

      deleteJournal: (id) => {
        const state = get()
        set({ journal: state.journal.filter((j) => j.id !== id) })
      },

      startChallenge: (id) => {
        const state = get()
        if (state.challengeProgress[id]) return
        set({
          challengeProgress: {
            ...state.challengeProgress,
            [id]: { id, startedAt: Date.now(), completedDays: [] },
          },
        })
      },

      checkInChallenge: (id) => {
        const state = get()
        const prog = state.challengeProgress[id]
        if (!prog) return
        const today = todayStr()
        if (prog.lastCheckedDate === today) return
        const challenge = CHALLENGES.find((c) => c.id === id)
        if (!challenge) return

        // Determine day number from start
        const dayNum = diffDays(todayStr(new Date(prog.startedAt)), today) + 1
        if (dayNum < 1 || dayNum > challenge.days) return

        const newCompleted = Array.from(new Set([...prog.completedDays, dayNum])).sort((a, b) => a - b)
        const justCompleted = newCompleted.length === challenge.days && !prog.completed
        set({
          challengeProgress: {
            ...state.challengeProgress,
            [id]: {
              ...prog,
              completedDays: newCompleted,
              lastCheckedDate: today,
              completed: justCompleted || prog.completed,
            },
          },
          totalXp: justCompleted ? state.totalXp + challenge.xpReward : state.totalXp,
        })
      },

      unlockSkill: (id) => {
        const state = get()
        if (state.unlockedSkills.includes(id)) return
        const skill = SKILL_TREE.find((s) => s.id === id)
        const xpGain = skill?.xpReward ?? 50
        set({
          unlockedSkills: [...state.unlockedSkills, id],
          totalXp: state.totalXp + xpGain,
        })
      },

      resetAll: () => set({ ...initialState, joinedAt: Date.now() }),

      get chaptersCompleted() {
        return computeChaptersCompleted(get().readVerses)
      },

      get level() {
        return getLevel(get().totalXp)
      },
    }),
    {
      name: 'sanatan-quest-v1',
      // Don't persist computed getters
      partialize: (s) => ({
        userName: s.userName,
        joinedAt: s.joinedAt,
        readingMode: s.readingMode,
        fontScale: s.fontScale,
        readVerses: s.readVerses,
        readingTimeSec: s.readingTimeSec,
        currentStreak: s.currentStreak,
        longestStreak: s.longestStreak,
        lastActiveDate: s.lastActiveDate,
        dailyActivity: s.dailyActivity,
        bookmarks: s.bookmarks,
        highlights: s.highlights,
        notes: s.notes,
        totalXp: s.totalXp,
        activities: s.activities,
        journal: s.journal,
        challengeProgress: s.challengeProgress,
        unlockedSkills: s.unlockedSkills,
      }),
    },
  ),
)

// Selector hooks
export function useChaptersCompleted(): string[] {
  return computeChaptersCompleted(useStore((s) => s.readVerses))
}

export function useLevel(): Level {
  return useStore((s) => getLevel(s.totalXp))
}
