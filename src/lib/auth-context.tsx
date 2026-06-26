'use client'

// AuthProvider — wraps the entire app with a Supabase auth context.
// Mirrors the live deployment's behavior exactly:
//   - On mount, get existing session (if any) and subscribe to auth state changes.
//   - Exposes user, session, loading, signUp, signIn, signOut to descendants.
//
// Sign-up uses Supabase email/password with an optional `name` field stored in
// user_metadata. Sign-in uses signInWithPassword. Sign-out calls supabase.auth.signOut.

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase-client'

export interface AuthContextValue {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, name?: string) => Promise<{ error: string | null }>
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    // Get the initial session (if any) and mark loading as done.
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s)
      setUser(s?.user ?? null)
      setLoading(false)
    })

    // Subscribe to auth state changes (login, logout, token refresh).
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      setUser(newSession?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = useCallback(
    async (email: string, password: string, name?: string) => {
      if (!supabase) return { error: 'Supabase not configured' }
      if (password.length < 6) return { error: 'Password must be at least 6 characters' }
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name: name ?? '' } },
      })
      if (error) return { error: error.message }
      // User created but email-confirmation is required → no session yet.
      if (data.user && !data.session) {
        return { error: 'Please check your email to confirm your account.' }
      }
      return { error: null }
    },
    [],
  )

  const signIn = useCallback(async (email: string, password: string) => {
    if (!supabase) return { error: 'Supabase not configured' }
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return error ? { error: error.message } : { error: null }
  }, [])

  const signOut = useCallback(async () => {
    if (!supabase) return
    await supabase.auth.signOut()
  }, [])

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
