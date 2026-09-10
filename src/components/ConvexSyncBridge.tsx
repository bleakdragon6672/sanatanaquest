'use client'

import { useConvexAutoSave } from '@/lib/convex-sync'
import type { User } from '@supabase/supabase-js'

export function ConvexSyncBridge({ user }: { user: User | null }) {
  useConvexAutoSave(user)
  return null
}
