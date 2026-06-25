'use client'

import { NavProvider, useNav } from '@/components/nav-context'
import { Sidebar, MobileNav } from '@/components/sidebar'
import { ThemeToggle } from '@/components/theme-toggle'
import { HomeView } from '@/components/views/home-view'
import { GitaView } from '@/components/views/gita-view'
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

function TopBar() {
  const { view, navigate } = useNav()
  const totalXp = useStore((s) => s.totalXp)
  const streak = useStore((s) => s.currentStreak)

  const viewTitles: Record<string, { title: string; sanskrit: string }> = {
    home: { title: 'Dashboard', sanskrit: 'गृहम्' },
    gita: { title: 'Bhagavad Gita', sanskrit: 'श्रीमद्भगवद्गीता' },
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
          <MobileNav />
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

function AppShell() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main id="main-scroll" className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-6xl w-full mx-auto">
          <ViewRouter />
        </main>
        <footer className="mt-auto px-4 sm:px-6 py-4 text-center text-xs text-muted-foreground border-t border-border">
          <p style={{ fontFamily: 'var(--font-serif-display), serif' }} className="mb-1">
            ॐ शान्तिः शान्तिः शान्तिः
          </p>
          <p>
            Sanatan Quest · Made with devotion ·{' '}
            <span className="text-primary/70">Read the Gita, live its wisdom</span>
          </p>
        </footer>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <NavProvider>
      <AppShell />
    </NavProvider>
  )
}
