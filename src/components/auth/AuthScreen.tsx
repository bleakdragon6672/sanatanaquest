'use client'

// AuthScreen — full-page sign up / sign in form powered by Convex Auth.
// Features:
//   - Fast, resilient email + password authentication (sign up & sign in)
//   - Instant "Continue as Guest" so seekers are never blocked from reading scriptures
//   - Serene aesthetic with subtle gradients, soft borders, and sacred Om motif
//   - Seamless cross-device cloud sync and leaderboard recognition

import { useState } from 'react'
import { Loader2, Cloud, Shield, Compass, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { OmSymbol } from '@/components/spiritual-icons'
import { useAuth } from '@/lib/auth-context'
import { useStore } from '@/lib/store'
import { formatDisplayNameFromEmail } from '@/lib/cloud-sync'
import { toast } from 'sonner'

type Mode = 'signup' | 'login'

export function AuthScreen() {
  const [mode, setMode] = useState<Mode>('signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [guestLoading, setGuestLoading] = useState(false)
  const { signUp, signIn, signInAsGuest } = useAuth()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !password.trim()) return
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    setSubmitting(true)
    try {
      if (mode === 'signup') {
        const chosenName = name.trim() || formatDisplayNameFromEmail(email.trim())
        const { error } = await signUp(email.trim(), password, chosenName)
        if (error) {
          toast.error(error)
        } else {
          useStore.getState().setUserName(chosenName)
          toast.success(`Welcome to Sanatan Quest, ${chosenName}! 🙏`)
        }
      } else {
        const { error } = await signIn(email.trim(), password)
        if (error) {
          toast.error(error)
        } else {
          const currentName = useStore.getState().userName
          if (!currentName || currentName === 'Seeker') {
            const fallback = formatDisplayNameFromEmail(email.trim())
            useStore.getState().setUserName(fallback)
          }
          toast.success('Welcome back! 🙏')
        }
      }
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleGuestLogin() {
    setGuestLoading(true)
    try {
      const { error } = await signInAsGuest()
      if (error) {
        toast.error(error)
      } else {
        toast.success('Welcome! You can explore and read freely. 🙏')
      }
    } catch {
      toast.error('Could not begin guest session. Please try again.')
    } finally {
      setGuestLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[color-mix(in_oklch,var(--saffron)_12%,transparent)] via-background to-[color-mix(in_oklch,var(--gold)_8%,transparent)] p-4 relative overflow-hidden">
      {/* Decorative background watermark */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 opacity-[0.05] pointer-events-none select-none">
        <OmSymbol size={340} className="text-primary" />
      </div>

      <Card className="w-full max-w-md p-8 relative shadow-2xl border-primary/20 backdrop-blur-md bg-card/90">
        <div className="text-center mb-6">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-saffron-gradient shadow-lg mb-3">
            <OmSymbol size={36} className="!text-white" />
          </div>
          <h1
            className="text-2xl font-bold text-saffron-gradient"
            style={{ fontFamily: 'var(--font-serif-display), serif' }}
          >
            Sanatan Quest
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === 'signup' ? 'Begin your spiritual journey' : 'Welcome back, seeker'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'signup' && (
            <div>
              <Input
                type="text"
                placeholder="Your Name (e.g. Arjun, Priya, Samarth)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11"
              />
              <p className="text-[11px] text-muted-foreground mt-1 px-1">
                Your spiritual display name on the Dharma Leaderboard.
              </p>
            </div>
          )}
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-11"
          />
          <Input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-11"
          />
          <Button
            type="submit"
            disabled={submitting || guestLoading}
            className="w-full h-11 bg-saffron-gradient text-white font-semibold shadow-md hover:opacity-95 transition-opacity"
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait…
              </>
            ) : mode === 'signup' ? (
              'Create Account'
            ) : (
              'Sign In'
            )}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
            className="text-sm text-primary hover:underline cursor-pointer"
          >
            {mode === 'signup'
              ? 'Already have an account? Sign in'
              : "Don't have an account? Sign up"}
          </button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/50" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground font-medium">Or explore first</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleGuestLogin}
          disabled={submitting || guestLoading}
          className="w-full h-11 border-primary/30 hover:bg-primary/5 hover:border-primary/50 text-foreground font-medium flex items-center justify-center gap-2 cursor-pointer"
        >
          {guestLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Entering sanctuary…
            </>
          ) : (
            <>
              <Compass className="h-4 w-4 text-primary" />
              <span>Continue as Guest</span>
            </>
          )}
        </Button>

        <div className="mt-6 pt-4 border-t border-border/40 space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Cloud className="h-3.5 w-3.5 text-primary shrink-0" />
            <span>Real-time cloud sync powered by Convex</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Shield className="h-3.5 w-3.5 text-primary shrink-0" />
            <span>Encrypted credentials & secure spiritual journal</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
            <span>Earn Dharma XP, track reading streaks, and climb leaderboards</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
