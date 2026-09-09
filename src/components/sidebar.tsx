'use client'

import { Home, BookOpen, Sparkles, CalendarCheck, GitBranch, Trophy, Award, NotebookPen, BarChart3, User, Search, Menu, X, Crown, Bookmark, Network, Headphones, Compass, GraduationCap } from 'lucide-react'
import { useNav, ViewKey } from '@/components/nav-context'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { OmSymbol } from '@/components/spiritual-icons'
import { useStore } from '@/lib/store'
import { createContext, useContext, useState, type ReactNode } from 'react'

interface NavItem {
  view: ViewKey
  label: string
  sanskritLabel?: string
  icon: typeof Home
  description: string
}

interface NavGroup {
  title: string
  sanskrit?: string
  items: NavItem[]
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: 'Overview',
    sanskrit: 'सिंहावलोकनम्',
    items: [
      { view: 'home', label: 'Home', sanskritLabel: 'गृहम्', icon: Home, description: 'Dashboard & daily verse' },
      { view: 'search', label: 'Search', sanskritLabel: 'अन्वेषण', icon: Search, description: 'Find verses & topics' },
    ],
  },
  {
    title: 'Sacred Scriptures',
    sanskrit: 'सच्छास्त्राणि',
    items: [
      { view: 'gita', label: 'Bhagavad Gita', sanskritLabel: 'गीता', icon: BookOpen, description: 'Complete scripture & commentary' },
      { view: 'upanishad', label: 'Upanishads', sanskritLabel: 'उपनिषद्', icon: BookOpen, description: 'Isha, Katha & Mandukya' },
      { view: 'chalisa', label: 'Hanuman Chalisa', sanskritLabel: 'हनुमान चालीसा', icon: BookOpen, description: 'Devotional hymn to Hanuman' },
      { view: 'baan', label: 'Bajrang Baan', sanskritLabel: 'बजरंग बाण', icon: BookOpen, description: 'Protective arrow of Hanuman' },
      { view: 'tandav', label: 'Shiv Tandav Stotram', sanskritLabel: 'ताण्डवस्तोत्रम्', icon: BookOpen, description: "Shiva's cosmic dance hymn" },
      { view: 'yogasutras', label: 'Yoga Sutras', sanskritLabel: 'योगसूत्राणि', icon: BookOpen, description: "Patanjali's 196 aphorisms" },
      { view: 'ashtavakragita', label: 'Ashtavakra Gita', sanskritLabel: 'अष्टावक्रगीता', icon: BookOpen, description: 'Advaita dialogue ~298 verses' },
    ],
  },
  {
    title: 'Spiritual Practice',
    sanskrit: 'साधनम्',
    items: [
      { view: 'treasury', label: 'Personal Treasury', sanskritLabel: 'कोशः', icon: Bookmark, description: 'Saved verses, highlights & notes' },
      { view: 'mindmap', label: 'Dharma Mind Map', sanskritLabel: 'धर्मचित्रम्', icon: Network, description: 'Interactive cosmic concept canvas' },
      { view: 'soundscapes', label: 'Sacred Soundscapes', sanskritLabel: 'नादयोगः', icon: Headphones, description: '432Hz Om & meditation visualizer' },
      { view: 'dilemma', label: 'Dharma Dilemmas', sanskritLabel: 'धर्मसंकटम्', icon: Compass, description: 'Modern struggles & Gita wisdom' },
      { view: 'memorizer', label: 'Shloka Memorizer', sanskritLabel: 'स्वाध्यायः', icon: GraduationCap, description: 'Gamified shloka flip cards & quiz' },
      { view: 'guide', label: 'AI Spiritual Guide', sanskritLabel: 'गुरु', icon: Sparkles, description: 'Ask, explain, student mode' },
      { view: 'tracker', label: 'Daily Tracker', sanskritLabel: 'साधनम्', icon: CalendarCheck, description: 'Log your spiritual practice' },
    ],
  },
  {
    title: 'Growth & Journey',
    sanskrit: 'अभ्युदयः',
    items: [
      { view: 'skilltree', label: 'Skill Tree', sanskritLabel: 'वृक्ष', icon: GitBranch, description: 'Unlock paths of yoga' },
      { view: 'challenges', label: 'Challenges', sanskritLabel: 'अभ्यास', icon: Trophy, description: 'Active challenges' },
      { view: 'achievements', label: 'Achievements', sanskritLabel: 'सिद्धि', icon: Award, description: 'Your earned milestones' },
      { view: 'journal', label: 'Reflection Journal', sanskritLabel: 'दिनदर्शिका', icon: NotebookPen, description: 'Write & reflect' },
      { view: 'analytics', label: 'Analytics', sanskritLabel: 'विश्लेषण', icon: BarChart3, description: 'Your growth charts' },
      { view: 'leaderboard', label: 'Leaderboard', sanskritLabel: 'लीडरबोर्ड', icon: Crown, description: 'Top seekers by XP' },
      { view: 'profile', label: 'Profile', sanskritLabel: 'परिचय', icon: User, description: 'Dharma XP & share cards' },
    ],
  },
]

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  const { view, navigate } = useNav()
  return (
    <nav className="flex flex-col gap-3 px-2.5 py-2">
      {NAV_GROUPS.map((group) => (
        <div key={group.title} className="flex flex-col gap-0.5">
          <div className="flex items-center justify-between px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider text-muted-foreground/60 select-none">
            <span>{group.title}</span>
            {group.sanskrit && (
              <span
                className="text-[10px] opacity-60 hidden xl:inline"
                style={{ fontFamily: 'var(--font-serif-display), serif' }}
              >
                {group.sanskrit}
              </span>
            )}
          </div>
          {group.items.map((item) => {
            const Icon = item.icon
            const isActive = view === item.view
            return (
              <button
                key={item.view}
                onClick={() => {
                  navigate(item.view)
                  onNavigate?.()
                }}
                className={cn(
                  'nav-sacred group relative flex items-center gap-2.5 rounded-xl px-2.5 py-1.5 text-left transition-all',
                  'hover:bg-saffron-gradient-soft active:scale-[0.99]',
                  isActive && 'bg-saffron-gradient-soft glow-saffron font-medium',
                )}
                data-active={isActive}
              >
                <span className="nav-sacred-indicator" />
                <span
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors',
                    isActive
                      ? 'bg-saffron-gradient text-white shadow-sm'
                      : 'bg-muted/70 text-muted-foreground group-hover:text-primary group-hover:bg-muted',
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="flex flex-col min-w-0">
                  <span
                    className={cn(
                      'text-xs font-medium leading-snug',
                      isActive ? 'text-foreground' : 'text-foreground/80',
                    )}
                  >
                    {item.label}
                  </span>
                  <span className="text-[10px] text-muted-foreground truncate leading-tight">
                    {item.description}
                  </span>
                </span>
                {item.sanskritLabel && (
                  <span
                    className="ml-auto pr-1 text-[10px] text-muted-foreground/60 hidden xl:block shrink-0"
                    style={{ fontFamily: 'var(--font-serif-display), serif' }}
                  >
                    {item.sanskritLabel}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      ))}
    </nav>
  )
}

function Brand() {
  const { navigate } = useNav()
  const level = useStore((s) => s.totalXp)
  return (
    <button
      onClick={() => navigate('home')}
      className="flex items-center gap-3 px-4 py-3.5 w-full text-left group"
    >
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-saffron-gradient shadow-lg overflow-hidden glow-sacred-pulse">
        <OmSymbol size={24} className="!text-white" />
        <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      </span>
      <span className="flex flex-col">
        <span className="text-sm font-bold leading-tight text-saffron-gradient">
          Sanatan Quest
        </span>
        <span className="text-[11px] text-muted-foreground leading-tight">
          {level > 0 ? `${level.toLocaleString()} Dharma XP` : 'Begin your quest'}
        </span>
      </span>
    </button>
  )
}

export function Sidebar() {
  return (
    <aside className="sidebar-sacred hidden lg:flex flex-col w-72 shrink-0 border-r border-border bg-sidebar h-screen sticky top-0">
      <Brand />
      <div className="lotus-divider mx-4 mb-1" />
      <div className="flex-1 overflow-y-auto overscroll-contain pr-1 scrollbar-thin">
        <NavItems />
      </div>
      <div className="px-4 py-2.5 text-[10px] text-muted-foreground/70 border-t border-border flex items-center justify-between">
        <span style={{ fontFamily: 'var(--font-serif-display), serif' }}>ॐ नमो भगवते वासुदेवाय</span>
        <span className="opacity-60 text-[9px]">Sanatan Quest</span>
      </div>
    </aside>
  )
}

// ── Mobile nav context ──────────────────────────────────────────────
// Splits the trigger button (renders in TopBar) from the drawer overlay
// (renders at root level) so the fixed overlay isn't trapped inside the
// sticky header's stacking context.

const MobileNavCtx = createContext<{ open: boolean; setOpen: (v: boolean) => void } | null>(null)

export function MobileNavProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <MobileNavCtx.Provider value={{ open, setOpen }}>
      {children}
    </MobileNavCtx.Provider>
  )
}

function useMobileNav() {
  const ctx = useContext(MobileNavCtx)
  if (!ctx) throw new Error('useMobileNav must be used inside MobileNavProvider')
  return ctx
}

/** Hamburger button — place inside the TopBar (visible on mobile only). */
export function MobileNavTrigger() {
  const { setOpen } = useMobileNav()
  return (
    <Button
      variant="ghost"
      size="icon"
      className="lg:hidden rounded-full"
      onClick={() => setOpen(true)}
    >
      <Menu className="h-5 w-5" />
      <span className="sr-only">Open menu</span>
    </Button>
  )
}

/** Slide-over drawer — place at the root layout level (outside sticky headers). */
export function MobileNavDrawer() {
  const { open, setOpen } = useMobileNav()
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-sidebar shadow-2xl flex flex-col">
        <div className="flex items-center justify-between pr-3">
          <Brand />
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="lotus-divider mx-4 mb-1" />
        <div className="flex-1 overflow-y-auto overscroll-contain pr-1 scrollbar-thin">
          <NavItems onNavigate={() => setOpen(false)} />
        </div>
      </div>
    </div>
  )
}

/** Legacy combined component (kept for backward compatibility). */
export function MobileNav() {
  return (
    <MobileNavProvider>
      <MobileNavTrigger />
      <MobileNavDrawer />
    </MobileNavProvider>
  )
}
