'use client'

import { useEffect } from 'react'
import { NavProvider, useNav } from '@/components/nav-context'
import { Sidebar, MobileNavProvider, MobileNavTrigger, MobileNavDrawer } from '@/components/sidebar'
import { ThemeToggle } from '@/components/theme-toggle'
import { HomeView } from '@/components/views/home-view'
import { GitaView } from '@/components/views/gita-view'
import { UpanishadView } from '@/components/views/upanishad-view'
import { HanumanChalisaView } from '@/components/views/chalisa-view'
import { BajrangBaanView } from '@/components/views/baan-view'
import { TandavView } from '@/components/views/tandav-view'
import { GuideView } from '@/components/views/guide-view'
import { TrackerView } from '@/components/views/tracker-view'
import { SkillTreeView } from '@/components/views/skilltree-view'
import { ChallengesView } from '@/components/views/challenges-view'
import { AchievementsView } from '@/components/views/achievements-view'
import { JournalView } from '@/components/views/journal-view'
import { AnalyticsView } from '@/components/views/analytics-view'
import { ProfileView } from '@/components/views/profile-view'
import { SearchView } from '@/components/views/search-view'
import { OmSymbol } from '@/components/spiritual-icons'
import { useStore } from '@/lib/store'
import { BookOpen, Search, Menu } from 'lucide-react'
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
import { saveCloudProgress } from '@/lib/cloud-sync'
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
  }

  const current = viewTitles[view] ?? viewTitles.home

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
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
            className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-saffron-gradient-soft"
            title="Read Gita"
          >
            <BookOpen className="h-4 w-4" />
          </button>
          <button
            onClick={() => navigate('search')}
            className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-saffron-gradient-soft"
            title="Search"
          >
            <Search className="h-4 w-4" />
          </button>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-saffron-gradient-soft text-xs">
            <span className="font-semibold text-primary">{totalXp.toLocaleString()} XP</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-primary">🔥 {streak}d</span>
          </div>
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
    default: return <HomeView />
  }
}

/**
 * useCloudAutoSave — debounced 2-second auto-save of the entire store state to
 * Supabase whenever any persisted field changes. Runs only when authenticated.
 *
 * Mirrors the live deployment's IIFE-inside-IZ auto-save effect.
 */
function useCloudAutoSave(user: User | null) {
  const store = useStore()

  useEffect(() => {
    if (!user) return
    const timer = setTimeout(() => {
      const s = useStore.getState()
      saveCloudProgress(user, {
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
      })
    }, 2000)
    return () => clearTimeout(timer)
  }, [
    user,
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
}

function AppShell() {
  const { user } = useAuth()
  useCloudAutoSave(user)

  const { currentAtmosphere } = useAtmosphere()
  const { params } = useNav()
  const store = useStore()
  const chapterFromParams = params.chapter ? parseInt(params.chapter, 10) : undefined

  // Track XP changes for animations
  useXpTracker()

  // Reading width classes
  const widthClass = store.readingWidth === 'narrow' ? 'max-w-3xl' : store.readingWidth === 'wide' ? 'max-w-7xl' : 'max-w-6xl'

  // Reading view mode classes
  const isZen = store.readingViewMode === 'zen'
  const isFocus = store.readingViewMode === 'focus'

  return (
    <MobileNavProvider>
    <div className={cn('flex min-h-screen bg-background relative', isZen && 'reading-zen', isFocus && 'reading-focus')}>
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
        <main id="main-scroll" className={cn('flex-1 px-4 sm:px-6 lg:px-8 py-6 w-full mx-auto', widthClass)}>
          <ViewRouter />
        </main>
        {!isZen && (
          <footer className="mt-auto px-4 sm:px-6 py-4 text-center text-xs text-muted-foreground border-t border-border">
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
      {/* Mobile bottom navigation */}
      <MobileBottomNav />
      {/* Atmosphere panel (right-side Sheet, opened from the gita-view or mini widget). */}
      <AtmospherePanel chapter={chapterFromParams} />
      {/* Mini widget floating bottom-right whenever an atmosphere is selected. */}
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
