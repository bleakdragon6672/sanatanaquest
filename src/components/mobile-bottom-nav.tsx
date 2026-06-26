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
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden glass-strong border-t border-border/40 safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          // Highlight "Scriptures" for any scripture view
          const isActive = view === item.view ||
            (item.view === 'gita' && ['gita', 'upanishad', 'chalisa', 'baan', 'tandav'].includes(view))

          return (
            <button
              key={item.view}
              onClick={() => navigate(item.view)}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 w-16 h-14 rounded-xl transition-all',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <Icon className={cn('h-5 w-5 transition-transform', isActive && 'scale-110')} />
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute bottom-0 w-8 h-0.5 rounded-full bg-saffron-gradient" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
