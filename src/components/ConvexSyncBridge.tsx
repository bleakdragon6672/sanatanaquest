'use client'

import { useConvexAutoSave } from '@/lib/convex-sync'
import type { AuthUser } from '@/lib/auth-context'

export function ConvexSyncBridge({ user }: { user: AuthUser | null }) {
  useConvexAutoSave(user)
  return null
}
