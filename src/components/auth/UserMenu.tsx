'use client'

// UserMenu — top-bar user profile chip + sign-out button.
// Shown only when the user is authenticated.
//
// Mirrors the live deployment's `IY` component:
//   - Avatar circle (first letter of name or email)
//   - Name/email label (hidden on small screens)
//   - Sign-out icon button

import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { useStore } from '@/lib/store'
import { toast } from 'sonner'

export function UserMenu() {
  const { user, signOut } = useAuth()
  // Subscribe to the store so this component re-renders when XP updates
  // (matches the live deployment's behavior — `eW()` call inside `IY`).
  useStore()

  if (!user) return null

  const email = user.email ?? ''
  const initial = (user.user_metadata?.name || email)[0]?.toUpperCase() ?? 'S'

  return (
    <div className="flex items-center gap-2">
      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-saffron-gradient-soft">
        <div className="h-6 w-6 rounded-full bg-saffron-gradient flex items-center justify-center text-xs font-bold text-white">
          {initial}
        </div>
        <span className="text-xs text-muted-foreground truncate max-w-[120px]">
          {user.user_metadata?.name || email.split('@')[0]}
        </span>
      </div>
      <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8 rounded-full"
        onClick={() => {
          signOut()
          toast.success('Signed out. Your data is saved in the cloud.')
        }}
        title="Sign out"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  )
}
