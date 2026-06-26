'use client'

// AuthGate — wraps the app and decides what to render:
//   - While auth is loading → "Loading your spiritual journey…" splash
//   - While cloud data is being restored (after login) → "Restoring your progress…" splash
//   - If user is authenticated and cloud data is loaded → render children (the app)
//   - If user is not authenticated → render <AuthScreen />
//
// Mirrors the live deployment's AuthGate (function `I$` in the bundle).

import { useEffect, useState, type ReactNode } from 'react'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { loadCloudProgress } from '@/lib/cloud-sync'
import { useStore } from '@/lib/store'
import { toast } from 'sonner'
import { OmSymbol } from '@/components/spiritual-icons'
import { AuthScreen } from '@/components/auth/AuthScreen'

export function AuthGate({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  const [cloudLoaded, setCloudLoaded] = useState(false)

  useEffect(() => {
    if (!user) {
      setCloudLoaded(false)
      return
    }

    let cancelled = false
    setCloudLoaded(false)

    ;(async () => {
      const cloudData = await loadCloudProgress(user)
      if (cancelled) return

      if (cloudData && (cloudData.totalXp ?? 0) > 0) {
        // Only overwrite local data if cloud has meaningful progress
        // This prevents losing local progress when Supabase is reset or empty
        useStore.getState().loadFromCloud(cloudData)
        toast.success('Your progress has been restored from the cloud')
      }
      // If cloud has no data, keep local localStorage data intact
      setCloudLoaded(true)
    })()

    return () => {
      cancelled = true
    }
  }, [user])

  // Show loading splash while auth is initializing OR cloud data is being restored.
  if (loading || (user && !cloudLoaded)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <OmSymbol size={64} className="animate-om-pulse" />
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">
              {loading
                ? 'Loading your spiritual journey…'
                : 'Restoring your progress from the cloud…'}
            </span>
          </div>
        </div>
      </div>
    )
  }

  // Authenticated + cloud data loaded → render the app.
  if (user) {
    return <>{children}</>
  }

  // Not authenticated → show the sign-up / sign-in screen.
  return <AuthScreen />
}
