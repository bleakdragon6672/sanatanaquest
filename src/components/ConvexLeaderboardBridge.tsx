'use client'

import { useEffect } from 'react'
import { useConvexLiveLeaderboard } from '@/lib/convex-sync'

interface ConvexLeaderboardBridgeProps {
  onData: (users: any[]) => void
}

export function ConvexLeaderboardBridge({ onData }: ConvexLeaderboardBridgeProps) {
  const liveUsers = useConvexLiveLeaderboard()

  useEffect(() => {
    if (liveUsers && Array.isArray(liveUsers) && liveUsers.length > 0) {
      onData(liveUsers)
    }
  }, [liveUsers, onData])

  return null
}
