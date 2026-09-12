'use client'

import { Home, BookOpen, Sparkles, User } from 'lucide-react'
import { useNav, type ViewKey } from '@/components/nav-context'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'

interface NavItem {
  view: ViewKey
  label: string
  icon: typeof Home
}

const NAV_ITEMS: NavItem[] = [
  { view: 'home', label: 'Home', icon: Home },
  { view: 'gita', label: 'Scriptures', icon: BookOpen },
  { view: 'guide', label: 'AI Guide', icon: Sparkles },
  { view: 'profile', label: 'Profile', icon: User },
]

export function MobileBottomNav() {
  const { view, navigate } = useNav()
  const totalXp = useStore((s) => s.totalXp)
  const isBookReaderOpen = useStore((s) => s.isBookReaderOpen)
  const readingMode = useStore((s) => s.readingMode)
  const isZenMode = useStore((s) => s.isZenMode)

  if (isBookReaderOpen || readingMode === 'kindle' || isZenMode) {
    return null
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-card/85 backdrop-blur-xl border-t border-border/60 shadow-[0_-4px_24px_-4px_rgba(0,0,0,0.06)] safe-area-bottom transition-all">
      <div className="flex items-center justify-around h-16 px-3 max-w-md mx-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          // Highlight "Scriptures" for any scripture view
          const isActive =
            view === item.view ||
            (item.view === 'gita' &&
              ['gita', 'upanishad', 'chalisa', 'baan', 'tandav', 'yogasutras', 'ashtavakragita'].includes(view))

          return (
            <button
              key={item.view}
              onClick={() => navigate(item.view)}
              className={cn(
                'relative flex flex-col items-center justify-center gap-1 w-16 h-12 rounded-2xl transition-all duration-300',
                isActive
                  ? 'bg-primary/10 text-primary font-semibold shadow-xs'
                  : 'text-muted-foreground/80 hover:text-foreground active:scale-95',
              )}
            >
              <Icon
                className={cn(
                  'h-5 w-5 transition-transform duration-300',
                  isActive ? 'scale-110 text-primary stroke-[2.2]' : 'stroke-[1.8]'
                )}
              />
              <span
                className={cn(
                  'text-[10px] tracking-tight leading-none transition-colors',
                  isActive ? 'font-semibold text-primary' : 'font-medium'
                )}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary animate-pulse-calm" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
