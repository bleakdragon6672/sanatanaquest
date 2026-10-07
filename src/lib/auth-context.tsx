'use client'

// AuthProvider — powered by Convex Auth (@convex-dev/auth).
// Provides reactive authentication state, sign up, sign in, guest access, and sign out.
// Compatible with the existing app architecture:
//   - Exposes user, session, loading, signUp, signIn, signInAsGuest, signOut.
//   - Fully replaces Supabase Auth with zero downtime or paused project issues.

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from 'react'
import { useAuthActions } from '@convex-dev/auth/react'
import { useConvexAuth, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'

export interface AuthUser {
  id: string
  email?: string
  user_metadata?: {
    name?: string
    [key: string]: any
  }
  isAnonymous?: boolean
}

export type User = AuthUser

export interface AuthContextValue {
  user: AuthUser | null
  session: { access_token?: string } | null
  loading: boolean
  signUp: (email: string, password: string, name?: string) => Promise<{ error: string | null }>
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signInAsGuest: () => Promise<{ error: string | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { isLoading, isAuthenticated } = useConvexAuth()
  const { signIn: convexSignIn, signOut: convexSignOut } = useAuthActions()

  // Reactively query the current viewer document from Convex
  const viewer = useQuery(api.users.viewer, isAuthenticated ? {} : 'skip')

  // Loading state remains true until both auth handshake and user record (if authed) are resolved
  const loading = isLoading || (isAuthenticated && viewer === undefined)

  const user = useMemo<AuthUser | null>(() => {
    if (!isAuthenticated || !viewer) return null
    return {
      id: viewer.id,
      email: viewer.email,
      user_metadata: {
        name: viewer.name,
      },
      isAnonymous: viewer.isAnonymous,
    }
  }, [isAuthenticated, viewer])

  const session = useMemo(() => {
    return isAuthenticated ? { access_token: 'convex' } : null
  }, [isAuthenticated])

  const signUp = useCallback(
    async (email: string, password: string, name?: string) => {
      try {
        const trimmedEmail = email.trim().toLowerCase()
        if (!trimmedEmail) return { error: 'Please enter a valid email address.' }
        if (password.length < 6) return { error: 'Password must be at least 6 characters.' }

        await convexSignIn('password', {
          email: trimmedEmail,
          password,
          name: (name?.trim() || trimmedEmail.split('@')[0]),
          flow: 'signUp',
        })
        return { error: null }
      } catch (err: any) {
        const msg = err?.message || 'Failed to create account.'
        if (msg.includes('already exists') || msg.includes('Account already exists')) {
          return { error: 'An account with this email already exists. Please sign in instead.' }
        }
        return { error: msg }
      }
    },
    [convexSignIn],
  )

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        const trimmedEmail = email.trim().toLowerCase()
        if (!trimmedEmail) return { error: 'Please enter your email address.' }

        await convexSignIn('password', {
          email: trimmedEmail,
          password,
          flow: 'signIn',
        })
        return { error: null }
      } catch (err: any) {
        const msg = err?.message || 'Invalid email or password.'
        if (
          msg.includes('Invalid credentials') ||
          msg.includes('Password') ||
          msg.includes('not found') ||
          msg.includes('Could not find')
        ) {
          return { error: 'Invalid email or password. Please verify your details.' }
        }
        return { error: msg }
      }
    },
    [convexSignIn],
  )

  const signInAsGuest = useCallback(async () => {
    try {
      await convexSignIn('anonymous')
      return { error: null }
    } catch (err: any) {
      return { error: err?.message || 'Failed to continue as guest.' }
    }
  }, [convexSignIn])

  const signOut = useCallback(async () => {
    try {
      await convexSignOut()
    } catch (err) {
      console.error('Error signing out:', err)
    }
  }, [convexSignOut])

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signUp,
        signIn,
        signInAsGuest,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
