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

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden glass-strong border-t safe-area-bottom" style={{ borderColor: 'color-mix(in oklch, var(--saffron) 12%, var(--border))' }}>
      <div className="flex items-center justify-around h-16 px-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          // Highlight "Scriptures" for any scripture view
          const isActive = view === item.view ||
            (item.view === 'gita' && ['gita', 'upanishad', 'chalisa', 'baan', 'tandav', 'yogasutras', 'ashtavakragita'].includes(view))

          return (
            <button
              key={item.view}
              onClick={() => navigate(item.view)}
              className={cn(
                'relative flex flex-col items-center justify-center gap-0.5 w-16 h-14 rounded-xl transition-all duration-200',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <Icon className={cn('h-5 w-5 transition-all duration-200', isActive && 'scale-110')} />
              <span className={cn('text-[10px] font-medium transition-all duration-200', isActive ? 'font-semibold' : '')}>{item.label}</span>
              {isActive && (
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-saffron-gradient" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
