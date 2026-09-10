'use client'

import { ReactNode, useMemo } from 'react'
import { ConvexProvider, ConvexReactClient } from 'convex/react'

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL

  const client = useMemo(() => {
    if (!convexUrl) return null
    try {
      return new ConvexReactClient(convexUrl)
    } catch {
      return null
    }
  }, [convexUrl])

  if (!client) {
    return <>{children}</>
  }

  return <ConvexProvider client={client}>{children}</ConvexProvider>
}
