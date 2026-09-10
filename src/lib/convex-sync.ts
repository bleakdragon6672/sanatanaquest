'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useStore } from '@/lib/store'
import type { StoreSnapshot } from '@/lib/cloud-sync'
import type { User } from '@supabase/supabase-js'

export const isConvexConfigured = Boolean(process.env.NEXT_PUBLIC_CONVEX_URL)

/**
 * Convex auto-save hook.
 * Saves user progress to Convex reactive storage.
 */
export function useConvexAutoSave(user: User | null) {
  const store = useStore()
  const saveProgressMutation = useMutation(api.progress.saveProgress)
  const lastSavedJsonRef = useRef<string>('')
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const flushSave = useCallback(async () => {
    if (!user) return
    const s = useStore.getState()
    const snapshot: StoreSnapshot = {
      userName: s.userName,
      totalXp: s.totalXp,
      readingTimeSec: s.readingTimeSec,
      currentStreak: s.currentStreak,
      longestStreak: s.longestStreak,
      lastActiveDate: s.lastActiveDate,
      readVerses: s.readVerses,
      bookmarks: s.bookmarks,
      highlights: s.highlights,
      notes: s.notes,
      dailyActivity: s.dailyActivity,
      activities: s.activities,
      journal: s.journal,
      challengeProgress: s.challengeProgress,
      unlockedSkills: s.unlockedSkills,
      readingMode: s.readingMode,
      fontScale: s.fontScale,
      lineSpacing: s.lineSpacing,
      readingWidth: s.readingWidth,
      readingViewMode: s.readingViewMode,
      animationsEnabled: s.animationsEnabled,
      accentColor: s.accentColor,
      joinedAt: s.joinedAt,
    }

    let serialized = ''
    try {
      serialized = JSON.stringify(snapshot)
    } catch {
      return
    }

    if (serialized && serialized === lastSavedJsonRef.current) {
      return
    }

    lastSavedJsonRef.current = serialized

    try {
      await saveProgressMutation({
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
    } catch (err) {
      console.warn('[Convex] Auto-save failed:', err)
    }
  }, [user, saveProgressMutation])

  useEffect(() => {
    if (!user) return

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      flushSave()
    }, 10000) // 10s auto-save is effortless for Convex

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [
    user,
    flushSave,
    store.totalXp,
    store.readVerses,
    store.bookmarks,
    store.highlights,
    store.notes,
    store.activities,
    store.journal,
    store.challengeProgress,
    store.unlockedSkills,
    store.currentStreak,
    store.readingTimeSec,
    store.userName,
    store.readingMode,
    store.fontScale,
  ])

  // Flush on tab switch or page close
  useEffect(() => {
    if (!user) return

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        flushSave()
      }
    }

    const handleBeforeUnload = () => {
      flushSave()
    }

    window.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [user, flushSave])
}

/**
 * Convex Live Leaderboard query hook.
 * Reactively subscribes to Convex websocket updates.
 */
export function useConvexLiveLeaderboard() {
  const data = useQuery(api.leaderboard.getLeaderboard, {})
  return data
}
