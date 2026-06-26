'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'

export type ViewKey =
  | 'home'
  | 'gita'
  | 'upanishad'
  | 'chalisa'
  | 'baan'
  | 'tandav'
  | 'guide'
  | 'tracker'
  | 'skilltree'
  | 'challenges'
  | 'achievements'
  | 'journal'
  | 'analytics'
  | 'profile'
  | 'search'

interface NavState {
  view: ViewKey
  params: Record<string, string>
  navigate: (view: ViewKey, params?: Record<string, string>) => void
}

const NavContext = createContext<NavState | undefined>(undefined)

const STORAGE_KEY = 'sanatan-quest-view'

export function NavProvider({ children }: { children: ReactNode }) {
  // Always start with 'home' so server and client render the same initial HTML.
  // Reading from localStorage during render would cause a hydration mismatch
  // (server has no localStorage → 'home'; client has localStorage → saved view).
  const [view, setView] = useState<ViewKey>('home')
  const [params, setParams] = useState<Record<string, string>>({})

  // Persist the current view to localStorage whenever it changes.
  // This runs after every navigation, keeping the saved view in sync.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ view, params }))
    } catch {
      /* ignore */
    }
  }, [view, params])

  // On mount (client-only), read the saved view and navigate to it if different.
  // This runs once after hydration, so the initial paint always shows 'home'
  // (matching SSR), then switches to the saved view if one exists.
  // Reading from localStorage in an effect is the React-recommended pattern for
  // external browser APIs — the set-state-in-effect rule is disabled here because
  // this is not derived state, it's external state synchronization.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (!saved) return
      const parsed = JSON.parse(saved) as { view: ViewKey; params: Record<string, string> }
      if (parsed.view && parsed.view !== 'home') {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setView(parsed.view)
        setParams(parsed.params || {})
      }
    } catch {
      /* ignore */
    }
  }, [])

  const navigate = useCallback((v: ViewKey, p: Record<string, string> = {}) => {
    setView(v)
    setParams(p)
    if (typeof window !== 'undefined') {
      requestAnimationFrame(() => {
        const main = document.getElementById('main-scroll')
        if (main) main.scrollTo({ top: 0, behavior: 'smooth' })
        else window.scrollTo({ top: 0, behavior: 'smooth' })
      })
    }
  }, [])

  return (
    <NavContext.Provider value={{ view, params, navigate }}>{children}</NavContext.Provider>
  )
}

export function useNav() {
  const ctx = useContext(NavContext)
  if (!ctx) throw new Error('useNav must be used inside NavProvider')
  return ctx
}
