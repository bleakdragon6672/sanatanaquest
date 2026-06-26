'use client'

// AuthScreen — full-page sign up / sign in form.
// Matches the live deployment's UX exactly:
//   - Toggles between "signup" and "login" modes
//   - On signup: name (optional), email, password (min 6 chars)
//   - On login: email, password
//   - Shows friendly toast messages for email-confirmation, rate limits, errors
//   - Marketing bullets: "progress syncs across devices", "data is private"
//
// All interactions are powered by useAuth() from the AuthProvider.

import { useState } from 'react'
import { Loader2, Cloud, Shield } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { OmSymbol } from '@/components/spiritual-icons'
import { useAuth } from '@/lib/auth-context'
import { toast } from 'sonner'

type Mode = 'signup' | 'login'

export function AuthScreen() {
  const [mode, setMode] = useState<Mode>('signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { signUp, signIn } = useAuth()

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
        const { error } = await signUp(email.trim(), password, name.trim() || 'Seeker')
        if (error) {
          if (error.includes('confirm') || error.includes('check your email')) {
            toast.success('Check your email!', {
              description: 'Click the confirmation link to activate your account, then sign in.',
            })
          } else if (error.includes('rate limit') || error.includes('429')) {
            toast.error('Too many signups attempted', {
              description:
                'Please wait a few minutes and try again, or sign in if you already have an account.',
            })
          } else {
            toast.error(error)
          }
        } else {
          toast.success('Welcome to Sanatan Quest! 🙏')
        }
      } else {
        const { error } = await signIn(email.trim(), password)
        if (error) {
          if (error.includes('rate limit') || error.includes('429')) {
            toast.error('Too many attempts', {
              description: 'Please wait a few minutes and try again.',
            })
          } else {
            toast.error(error)
          }
        } else {
          toast.success('Welcome back! 🙏')
        }
      }
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[color-mix(in_oklch,var(--saffron)_12%,transparent)] via-background to-[color-mix(in_oklch,var(--gold)_8%,transparent)] p-4">
      <div className="absolute top-8 left-1/2 -translate-x-1/2 opacity-[0.06] pointer-events-none">
        <OmSymbol size={300} className="text-primary" />
      </div>
      <Card className="w-full max-w-md p-8 relative shadow-xl border-primary/20">
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
                placeholder="Your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11"
              />
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
            disabled={submitting}
            className="w-full h-11 bg-saffron-gradient text-white font-semibold"
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
            onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
            className="text-sm text-primary hover:underline"
          >
            {mode === 'signup'
              ? 'Already have an account? Sign in'
              : "Don't have an account? Sign up"}
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-border/40 space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Cloud className="h-3.5 w-3.5 text-primary" />
            <span>Your progress syncs across all your devices</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Shield className="h-3.5 w-3.5 text-primary" />
            <span>Your data is private and secure — only you can see it</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
