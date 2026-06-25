'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'

export type ViewKey =
  | 'home'
  | 'gita'
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

function readSavedView(): { view: ViewKey; params: Record<string, string> } | null {
  if (typeof window === 'undefined') return null
  try {
    const saved = localStorage.getItem('sanatan-quest-view')
    if (!saved) return null
    const parsed = JSON.parse(saved) as { view: ViewKey; params: Record<string, string> }
    if (parsed.view) return { view: parsed.view, params: parsed.params || {} }
  } catch {
    /* ignore */
  }
  return null
}

export function NavProvider({ children }: { children: ReactNode }) {
  // Lazy init from localStorage so we don't need an effect to read it
  const initial = typeof window !== 'undefined' ? readSavedView() : null
  const [view, setView] = useState<ViewKey>(initial?.view ?? 'home')
  const [params, setParams] = useState<Record<string, string>>(initial?.params ?? {})

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

  // Persist on every change (this is a side-effect, not state sync — allowed)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sanatan-quest-view', JSON.stringify({ view, params }))
    }
  }, [view, params])

  return (
    <NavContext.Provider value={{ view, params, navigate }}>{children}</NavContext.Provider>
  )
}

export function useNav() {
  const ctx = useContext(NavContext)
  if (!ctx) throw new Error('useNav must be used inside NavProvider')
  return ctx
}
