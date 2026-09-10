'use client'

import { useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { NavProvider, useNav, type ViewKey } from '@/components/nav-context'
import { Sidebar, MobileNavProvider, MobileNavTrigger, MobileNavDrawer } from '@/components/sidebar'
import { ThemeToggle } from '@/components/theme-toggle'
import { HomeView } from '@/components/views/home-view'
import { GitaView } from '@/components/views/gita-view'
import { GuideView } from '@/components/views/guide-view'
import { ProfileView } from '@/components/views/profile-view'

// Lazy-loaded views — keeps initial bundle small; loads on first visit
function ViewSkeleton() {
  return (
    <div className="animate-scale-in space-y-4">
      <div className="h-48 rounded-2xl bg-gradient-to-br from-[color-mix(in_oklch,var(--saffron)_8%,transparent)] to-card relative overflow-hidden">
        <div className="absolute inset-0 shimmer" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-24 rounded-xl bg-muted/60 relative overflow-hidden"><div className="absolute inset-0 shimmer" /></div>
        <div className="h-24 rounded-xl bg-muted/60 relative overflow-hidden"><div className="absolute inset-0 shimmer" /></div>
      </div>
    </div>
  )
}
const skeleton = <ViewSkeleton />

const UpanishadView = dynamic(() => import('@/components/views/upanishad-view').then(m => ({ default: m.UpanishadView })), { ssr: false, loading: () => skeleton })
const HanumanChalisaView = dynamic(() => import('@/components/views/chalisa-view').then(m => ({ default: m.HanumanChalisaView })), { ssr: false, loading: () => skeleton })
const BajrangBaanView = dynamic(() => import('@/components/views/baan-view').then(m => ({ default: m.BajrangBaanView })), { ssr: false, loading: () => skeleton })
const TandavView = dynamic(() => import('@/components/views/tandav-view').then(m => ({ default: m.TandavView })), { ssr: false, loading: () => skeleton })
const TrackerView = dynamic(() => import('@/components/views/tracker-view').then(m => ({ default: m.TrackerView })), { ssr: false, loading: () => skeleton })
const SkillTreeView = dynamic(() => import('@/components/views/skilltree-view').then(m => ({ default: m.SkillTreeView })), { ssr: false, loading: () => skeleton })
const ChallengesView = dynamic(() => import('@/components/views/challenges-view').then(m => ({ default: m.ChallengesView })), { ssr: false, loading: () => skeleton })
const AchievementsView = dynamic(() => import('@/components/views/achievements-view').then(m => ({ default: m.AchievementsView })), { ssr: false, loading: () => skeleton })
const JournalView = dynamic(() => import('@/components/views/journal-view').then(m => ({ default: m.JournalView })), { ssr: false, loading: () => skeleton })
const AnalyticsView = dynamic(() => import('@/components/views/analytics-view').then(m => ({ default: m.AnalyticsView })), { ssr: false, loading: () => skeleton })
const SearchView = dynamic(() => import('@/components/views/search-view').then(m => ({ default: m.SearchView })), { ssr: false, loading: () => skeleton })
const LeaderboardView = dynamic(() => import('@/components/views/leaderboard-view').then(m => ({ default: m.LeaderboardView })), { ssr: false, loading: () => skeleton })
const YogaSutrasView = dynamic(() => import('@/components/views/yoga-sutras-view').then(m => ({ default: m.YogaSutrasView })), { ssr: false, loading: () => skeleton })
const AshtavakraGitaView = dynamic(() => import('@/components/views/ashtavakra-gita-view').then(m => ({ default: m.AshtavakraGitaView })), { ssr: false, loading: () => skeleton })
const TreasuryView = dynamic(() => import('@/components/views/treasury-view').then(m => ({ default: m.TreasuryView })), { ssr: false, loading: () => skeleton })
const MindMapView = dynamic(() => import('@/components/views/mindmap-view').then(m => ({ default: m.MindMapView })), { ssr: false, loading: () => skeleton })
const SoundscapesView = dynamic(() => import('@/components/views/soundscapes-view').then(m => ({ default: m.SoundscapesView })), { ssr: false, loading: () => skeleton })
const DilemmaView = dynamic(() => import('@/components/views/dilemma-view').then(m => ({ default: m.DilemmaView })), { ssr: false, loading: () => skeleton })
const MemorizerView = dynamic(() => import('@/components/views/memorizer-view').then(m => ({ default: m.MemorizerView })), { ssr: false, loading: () => skeleton })
import { OmSymbol } from '@/components/spiritual-icons'
import { useStore } from '@/lib/store'
import { BookOpen, Search, Menu, Headphones } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AuthProvider, useAuth } from '@/lib/auth-context'
import { AuthGate } from '@/components/auth/AuthGate'
import { UserMenu } from '@/components/auth/UserMenu'
import {
  AtmosphereProvider,
  useAtmosphere,
} from '@/components/atmosphere/atmosphere-context'
import { AtmospherePanel } from '@/components/atmosphere/atmosphere-panel'
import { AtmosphereMiniWidget } from '@/components/atmosphere/atmosphere-mini-widget'
import { AtmosphereVisualEffects } from '@/components/atmosphere/atmosphere-visual-effects'
import { saveCloudProgress, type StoreSnapshot } from '@/lib/cloud-sync'
import type { User } from '@supabase/supabase-js'
import { AmbientBackground } from '@/components/ambient-background'
import { cn } from '@/lib/utils'
import { XpGainOverlay, LevelUpOverlay, useXpTracker } from '@/components/xp-animations'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'

function TopBar() {
  const { view, navigate } = useNav()
  const totalXp = useStore((s) => s.totalXp)
  const streak = useStore((s) => s.currentStreak)

  const viewTitles: Record<string, { title: string; sanskrit: string }> = {
    home: { title: 'Dashboard', sanskrit: 'गृहम्' },
    gita: { title: 'Bhagavad Gita', sanskrit: 'श्रीमद्भगवद्गीता' },
    upanishad: { title: 'Upanishads', sanskrit: 'उपनिषद्' },
    chalisa: { title: 'Hanuman Chalisa', sanskrit: 'हनुमान चालीसा' },
    baan: { title: 'Bajrang Baan', sanskrit: 'बजरंग बाण' },
    tandav: { title: 'Shiv Tandav Stotram', sanskrit: 'शिवताण्डवस्तोत्रम्' },
    guide: { title: 'AI Spiritual Guide', sanskrit: 'गुरु' },
    tracker: { title: 'Daily Tracker', sanskrit: 'साधनम्' },
    skilltree: { title: 'Skill Tree', sanskrit: 'वृक्ष' },
    challenges: { title: 'Challenges', sanskrit: 'अभ्यास' },
    achievements: { title: 'Achievements', sanskrit: 'सिद्धि' },
    journal: { title: 'Journal', sanskrit: 'दिनदर्शिका' },
    analytics: { title: 'Analytics', sanskrit: 'विश्लेषण' },
    profile: { title: 'Profile', sanskrit: 'परिचय' },
    search: { title: 'Search', sanskrit: 'अन्वेषण' },
    leaderboard: { title: 'Leaderboard', sanskrit: 'लीडरबोर्ड' },
    yogasutras: { title: 'Yoga Sutras', sanskrit: 'योगसूत्राणि' },
    ashtavakragita: { title: 'Ashtavakra Gita', sanskrit: 'अष्टावक्रगीता' },
    treasury: { title: 'Personal Treasury', sanskrit: 'कोशः' },
    mindmap: { title: 'Dharma Mind Map', sanskrit: 'धर्मचित्रम्' },
    soundscapes: { title: 'Sacred Soundscapes', sanskrit: 'नादयोगः' },
    dilemma: { title: 'Dharma Dilemmas', sanskrit: 'धर्मसंकटम्' },
    memorizer: { title: 'Shloka Memorizer', sanskrit: 'स्वाध्यायः' },
  }

  const current = viewTitles[view] ?? viewTitles.home

  return (
    <header className="topbar-sacred sticky top-0 z-30">
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3">
        <div className="flex items-center gap-3">
          <MobileNavTrigger />
          <div>
            <h1 className="text-base sm:text-lg font-semibold leading-tight" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
              {current.title}
            </h1>
            <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
              {current.sanskrit}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => navigate('gita')}
            className={cn(
              'hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-saffron-gradient-soft transition-colors',
              view === 'gita' && 'bg-saffron-gradient-soft text-primary font-semibold'
            )}
            title="Read Bhagavad Gita"
          >
            <BookOpen className="h-4 w-4" />
          </button>
          <button
            onClick={() => navigate('soundscapes')}
            className={cn(
              'hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-saffron-gradient-soft transition-colors',
              view === 'soundscapes' && 'bg-saffron-gradient-soft text-primary font-semibold'
            )}
            title="Sacred Soundscapes (432Hz Om, Tanpura, Flute)"
          >
            <Headphones className="h-4 w-4" />
          </button>
          <button
            onClick={() => navigate('search')}
            className={cn(
              'hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-saffron-gradient-soft transition-colors',
              view === 'search' && 'bg-saffron-gradient-soft text-primary font-semibold'
            )}
            title="Search Scripture"
          >
            <Search className="h-4 w-4" />
          </button>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-saffron-gradient-soft text-xs">
            <span className="font-semibold text-primary">{totalXp.toLocaleString()} XP</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-primary">🔥 {streak}d</span>
          </div>
          <button
            onClick={() => navigate('tracker')}
            className="flex sm:hidden items-center gap-1 px-2.5 py-1 rounded-full bg-saffron-gradient-soft text-xs font-semibold text-primary hover:opacity-80 transition-opacity"
            title="View Daily Tracker & Sadhana"
            aria-label="View streak"
          >
            🔥 {streak}d
          </button>
          <UserMenu />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

function ViewRouter() {
  const { view } = useNav()
  switch (view) {
    case 'home': return <HomeView />
    case 'gita': return <GitaView />
    case 'upanishad': return <UpanishadView />
    case 'chalisa': return <HanumanChalisaView />
    case 'baan': return <BajrangBaanView />
    case 'tandav': return <TandavView />
    case 'guide': return <GuideView />
    case 'tracker': return <TrackerView />
    case 'skilltree': return <SkillTreeView />
    case 'challenges': return <ChallengesView />
    case 'achievements': return <AchievementsView />
    case 'journal': return <JournalView />
    case 'analytics': return <AnalyticsView />
    case 'profile': return <ProfileView />
    case 'search': return <SearchView />
    case 'leaderboard': return <LeaderboardView />
    case 'yogasutras': return <YogaSutrasView />
    case 'ashtavakragita': return <AshtavakraGitaView />
    case 'treasury': return <TreasuryView />
    case 'mindmap': return <MindMapView />
    case 'soundscapes': return <SoundscapesView />
    case 'dilemma': return <DilemmaView />
    case 'memorizer': return <MemorizerView />
    default: return <HomeView />
  }
}


function getStoreSnapshot(): StoreSnapshot {
  const s = useStore.getState()
  return {
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
}

/**
 * useCloudAutoSave — debounced 25-second auto-save of the entire store state to
 * Supabase whenever any persisted field changes. Runs only when authenticated.
 *
 * Performance & Disk IOPS safeguards:
 * 1. 25-second debounce (prevents hammering Supabase with WAL/TOAST disk writes every 2 seconds).
 * 2. Deep dirty-checking: skips network & database write entirely if data hasn't changed.
 * 3. Immediate flush on tab blur / window close (via visibilitychange and beforeunload) so progress is never lost.
 * 4. Local state is ALREADY synchronously saved to localStorage on every change via Zustand persist.
 */
function useCloudAutoSave(user: User | null) {
  const store = useStore()
  const lastSavedJsonRef = useRef<string>('')
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const flushSave = useCallback(() => {
    if (!user) return
    const snapshot = getStoreSnapshot()
    let serialized = ''
    try {
      serialized = JSON.stringify(snapshot)
    } catch {
      return
    }

    if (serialized && serialized === lastSavedJsonRef.current) {
      return // Unchanged, skip database write to protect Disk IO
    }

    lastSavedJsonRef.current = serialized
    saveCloudProgress(user, snapshot)
  }, [user])

  useEffect(() => {
    if (!user) return

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      flushSave()
    }, 25000) // 25s debounce protects Supabase Disk IOPS

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
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

  // Flush immediately on tab blur, minimize, or page unload so progress is never lost
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

function AppShell() {
  const { user } = useAuth()
  useCloudAutoSave(user)

  const { currentAtmosphere } = useAtmosphere()
  const { view, params } = useNav()
  const store = useStore()
  const chapterFromParams = params.chapter ? parseInt(params.chapter, 10) : undefined

  // Track XP changes for animations
  useXpTracker()

  // Reading views where text column width constraint is desired
  const scriptureViews: ViewKey[] = [
    'gita',
    'upanishad',
    'chalisa',
    'baan',
    'tandav',
    'yogasutras',
    'ashtavakragita',
  ]
  const isScriptureView = scriptureViews.includes(view)

  // Scope reading width: non-reading views (Dashboard, Mind Map, Analytics, Skill Tree, Treasury, etc.)
  // get full desktop max-w-7xl so multi-column layouts and charts aren't squished!
  const widthClass = isScriptureView
    ? store.readingWidth === 'narrow'
      ? 'max-w-4xl'
      : store.readingWidth === 'wide'
      ? 'max-w-7xl'
      : 'max-w-5xl'
    : 'max-w-7xl'

  // Reading view mode classes — only apply zen / focus shell override when actively reading a scripture!
  const isZen = isScriptureView && store.readingViewMode === 'zen'
  const isFocus = isScriptureView && store.readingViewMode === 'focus'

  return (
    <MobileNavProvider>
    <div className={cn('sacred-bg flex min-h-screen bg-background relative', isZen && 'reading-zen', isFocus && 'reading-focus')}>
      {/* XP gain animation overlay */}
      <XpGainOverlay />
      {/* Level up celebration overlay */}
      <LevelUpOverlay />
      {/* Ambient background */}
      <AmbientBackground />
      {/* Visual effects layer sits behind everything (z-0). */}
      <AtmosphereVisualEffects atmosphere={currentAtmosphere} />
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {!isZen && <TopBar />}
        <main id="main-scroll" className={cn('flex-1 px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-6 w-full mx-auto', widthClass)}>
          <div key={view} className="animate-slide-up">
            <ViewRouter />
          </div>
        </main>
        {!isZen && (
          <footer className="mt-auto px-4 sm:px-6 py-4 pb-24 lg:pb-4 text-center text-xs text-muted-foreground">
            <div className="divine-divider mb-3" />
            <p style={{ fontFamily: 'var(--font-serif-display), serif' }} className="mb-1">
              ॐ शान्तिः शान्तिः शान्तिः
            </p>
            <p>
              Sanatan Quest · Made with devotion ·{' '}
              <span className="text-primary/70">Read the Gita, live its wisdom</span>
            </p>
          </footer>
        )}
      </div>
      <MobileNavDrawer />
      <MobileBottomNav />
      <AtmospherePanel chapter={chapterFromParams} />
      <AtmosphereMiniWidget />
    </div>
    </MobileNavProvider>
  )
}

export default function Home() {
  return (
    <AuthProvider>
      <AtmosphereProvider>
        <AuthGate>
          <NavProvider>
            <AppShell />
          </NavProvider>
        </AuthGate>
      </AtmosphereProvider>
    </AuthProvider>
  )
}
