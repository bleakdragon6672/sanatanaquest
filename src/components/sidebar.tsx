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
    <nav className="flex flex-col gap-4 px-3 py-2">
      {NAV_GROUPS.map((group) => (
        <div key={group.title} className="flex flex-col gap-1">
          <div className="flex items-center justify-between px-3 py-1.5 text-[10px] uppercase font-medium tracking-widest text-muted-foreground/70 select-none">
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-primary/40" />
              {group.title}
            </span>
            {group.sanskrit && (
              <span
                className="text-[11px] opacity-50 hidden xl:inline text-primary/80 font-normal"
                style={{ fontFamily: 'var(--font-serif-display), serif' }}
              >
                {group.sanskrit}
              </span>
            )}
          </div>
          <div className="space-y-0.5">
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
                    'group relative flex items-center gap-3 w-full rounded-2xl px-3 py-2 text-left transition-all duration-300',
                    isActive
                      ? 'bg-primary/10 text-primary shadow-xs font-medium'
                      : 'text-foreground/75 hover:text-foreground hover:bg-muted/50 active:scale-[0.99]',
                  )}
                  data-active={isActive}
                >
                  {/* Subtle active pill indicator */}
                  {isActive && (
                    <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-5 rounded-full bg-primary transition-all duration-300" />
                  )}

                  <span
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all duration-300',
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-sm scale-105'
                        : 'bg-muted/60 text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 group-hover:scale-105',
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>

                  <span className="flex flex-col min-w-0 flex-1">
                    <span
                      className={cn(
                        'text-xs leading-snug tracking-tight transition-colors',
                        isActive ? 'text-foreground font-semibold' : 'text-foreground/85 font-medium',
                      )}
                    >
                      {item.label}
                    </span>
                    <span className="text-[10px] text-muted-foreground/80 truncate leading-tight mt-0.5">
                      {item.description}
                    </span>
                  </span>

                  {item.sanskritLabel && (
                    <span
                      className={cn(
                        'ml-auto pr-1 text-[11px] hidden xl:block shrink-0 transition-opacity',
                        isActive ? 'text-primary/90 opacity-90 font-medium' : 'text-muted-foreground/50 opacity-60 group-hover:opacity-80'
                      )}
                      style={{ fontFamily: 'var(--font-serif-display), serif' }}
                    >
                      {item.sanskritLabel}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
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
      className="flex items-center gap-3.5 px-4 py-4 w-full text-left group transition-all"
    >
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-saffron to-gold shadow-sm overflow-hidden animate-breathe">
        <OmSymbol size={22} className="!text-white drop-shadow-xs" />
        <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </span>
      <span className="flex flex-col">
        <span
          className="text-sm font-semibold tracking-wider text-foreground leading-tight group-hover:text-primary transition-colors"
          style={{ fontFamily: 'var(--font-cinzel), serif' }}
        >
          SANATAN QUEST
        </span>
        <span className="text-[11px] text-muted-foreground/80 leading-tight mt-0.5 flex items-center gap-1.5 font-sans">
          <span className="w-1.5 h-1.5 rounded-full bg-primary/70 inline-block" />
          {level > 0 ? `${level.toLocaleString()} Dharma XP` : 'Begin your journey'}
        </span>
      </span>
    </button>
  )
}

export function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-72 shrink-0 border-r border-border/60 bg-sidebar/95 backdrop-blur-md h-screen sticky top-0 transition-colors">
      <Brand />
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mx-4 mb-2 opacity-60" />
      <div className="flex-1 overflow-y-auto overscroll-contain pr-1 scrollbar-thin">
        <NavItems />
      </div>
      <div className="px-4 py-3 text-[11px] text-muted-foreground/70 border-t border-border/50 flex items-center justify-between bg-sidebar/50">
        <span className="italic tracking-wide" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
          ॐ शान्तिः शान्तिः शान्तिः
        </span>
        <span className="text-[9px] uppercase tracking-widest text-primary/70 font-semibold">
          Sanctuary
        </span>
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
      <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-sidebar/98 backdrop-blur-xl border-r border-border/60 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between pr-3">
          <Brand />
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="rounded-full hover:bg-muted/60">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mx-4 mb-2 opacity-60" />
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
