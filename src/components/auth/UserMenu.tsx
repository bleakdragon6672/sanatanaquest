'use client'

// UserMenu — top-bar user profile chip + dropdown account menu.
// Shown only when the user is authenticated.
//
// Replaces the solitary logout icon button on mobile with a safe
// dropdown menu that shows profile info, XP/streak summary, navigation
// shortcuts to Profile and Treasury, and a safe Sign Out action.

import { LogOut, User as UserIcon, Bookmark, Sparkles } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/lib/auth-context'
import { useStore } from '@/lib/store'
import { useNav } from '@/components/nav-context'
import { toast } from 'sonner'

export function UserMenu() {
  const { user, signOut } = useAuth()
  const { navigate } = useNav()
  // Subscribe to the store so this component re-renders when XP or streak updates
  const store = useStore()

  if (!user) return null

  const email = user.email ?? ''
  const displayName = user.user_metadata?.name || email.split('@')[0]
  const initial = (user.user_metadata?.name || email)[0]?.toUpperCase() ?? 'S'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 rounded-full p-1 sm:px-3 sm:py-1.5 bg-saffron-gradient-soft hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
          title={`Signed in as ${displayName}`}
          aria-label="User account menu"
        >
          <div className="h-7 w-7 sm:h-6 sm:w-6 rounded-full bg-saffron-gradient flex items-center justify-center text-xs font-bold text-white shadow-xs shrink-0">
            {initial}
          </div>
          <span className="hidden sm:inline text-xs text-muted-foreground truncate max-w-[120px] font-medium">
            {displayName}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-1.5 shadow-lg border-border/60">
        <DropdownMenuLabel className="font-normal py-1 px-2">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold leading-none">{displayName}</p>
            <p className="text-xs leading-none text-muted-foreground truncate max-w-[200px]">
              {email}
            </p>
            <div className="flex items-center gap-1.5 pt-1 text-[11px] text-primary font-medium">
              <Sparkles className="h-3 w-3 shrink-0" />
              <span>{store.totalXp.toLocaleString()} XP · 🔥 {store.currentStreak}d</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer gap-2"
          onClick={() => navigate('profile')}
        >
          <UserIcon className="h-4 w-4 text-muted-foreground" />
          <span>My Profile & Stats</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer gap-2"
          onClick={() => navigate('treasury')}
        >
          <Bookmark className="h-4 w-4 text-muted-foreground" />
          <span>Personal Treasury</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer gap-2 text-destructive focus:text-destructive"
          onClick={() => {
            signOut()
            toast.success('Signed out. Your data is saved in the cloud.')
          }}
        >
          <LogOut className="h-4 w-4 text-destructive" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
