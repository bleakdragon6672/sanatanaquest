'use client'

import { useState, useEffect, useCallback, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useStore, getLevel, type Level } from '@/lib/store'
import { cn } from '@/lib/utils'

// ── XP Gain Animation ──────────────────────────────────────────────

interface XpGain {
  id: number
  amount: number
  x: number
  y: number
}

let xpGainId = 0
let notifyXpGain: ((amount: number) => void) | null = null

/** Call this from anywhere to trigger an XP gain animation */
export function triggerXpGain(amount: number) {
  notifyXpGain?.(amount)
}

export function XpGainOverlay() {
  const [gains, setGains] = useState<XpGain[]>([])

  useEffect(() => {
    notifyXpGain = (amount: number) => {
      const id = ++xpGainId
      // Random position near center-bottom
      const x = 40 + Math.random() * 20
      const y = 60 + Math.random() * 15
      setGains((prev) => [...prev, { id, amount, x, y }])
      // Remove after animation
      setTimeout(() => {
        setGains((prev) => prev.filter((g) => g.id !== id))
      }, 2000)
    }
    return () => { notifyXpGain = null }
  }, [])

  if (gains.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]" aria-hidden>
      {gains.map((gain) => (
        <div
          key={gain.id}
          className="absolute xp-float-up font-bold text-lg"
          style={{
            left: `${gain.x}%`,
            top: `${gain.y}%`,
            color: 'var(--saffron)',
            textShadow: '0 1px 4px oklch(0 0 0 / 20%)',
          }}
        >
          +{gain.amount} XP ✨
        </div>
      ))}
    </div>
  )
}

// ── Level Up Celebration ───────────────────────────────────────────

interface LevelUpState {
  show: boolean
  level: Level | null
}

let notifyLevelUp: ((level: Level) => void) | null = null

/** Call this when XP changes and a level-up is detected */
export function triggerLevelUp(level: Level) {
  notifyLevelUp?.(level)
}

export function LevelUpOverlay() {
  const [state, setState] = useState<LevelUpState>({ show: false, level: null })
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; color: string; delay: number }[]>([])

  useEffect(() => {
    notifyLevelUp = (level: Level) => {
      setState({ show: true, level })
      // Generate confetti
      const colors = ['var(--saffron)', 'var(--gold)', 'var(--vermilion)', '#f472b6', '#a78bfa', '#34d399']
      const pieces = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 20,
        color: colors[i % colors.length],
        delay: Math.random() * 0.5,
      }))
      setConfetti(pieces)
      // Auto-dismiss after 4 seconds
      setTimeout(() => {
        setState({ show: false, level: null })
        setConfetti([])
      }, 4000)
    }
    return () => { notifyLevelUp = null }
  }, [])

  if (!state.show || !state.level) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center" aria-live="polite">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Confetti */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {confetti.map((c) => (
          <div
            key={c.id}
            className="absolute w-2 h-2 rounded-full confetti-fall"
            style={{
              left: `${c.x}%`,
              top: `${c.y}%`,
              background: c.color,
              animationDelay: `${c.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Modal */}
      <div className="relative z-10 animate-scale-in">
        <div className="glass-strong rounded-2xl p-8 max-w-sm mx-4 text-center space-y-4">
          <div className="text-6xl animate-bounce">{state.level.icon}</div>
          <h2
            className="text-2xl font-bold text-saffron-gradient"
            style={{ fontFamily: 'var(--font-serif-display), serif' }}
          >
            Level Up!
          </h2>
          <div>
            <p className="text-lg font-semibold">{state.level.name}</p>
            <p className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
              {state.level.sanskritName}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            You've reached a new spiritual milestone. Keep walking the path.
          </p>
          <button
            onClick={() => { setState({ show: false, level: null }); setConfetti([]) }}
            className="px-6 py-2 rounded-full bg-saffron-gradient text-white font-medium hover:opacity-90 transition-opacity"
          >
            Continue Journey 🙏
          </button>
        </div>
      </div>
    </div>
  )
}

// ── XP Tracker Hook ────────────────────────────────────────────────
// Watches XP changes and triggers animations

export function useXpTracker() {
  const totalXp = useStore((s) => s.totalXp)
  const prevXpRef = useRef(totalXp)
  const prevLevelRef = useRef(getLevel(totalXp))

  useEffect(() => {
    const prevXp = prevXpRef.current
    const prevLevel = prevLevelRef.current
    prevXpRef.current = totalXp

    // XP gain animation
    if (totalXp > prevXp) {
      const gained = totalXp - prevXp
      triggerXpGain(gained)
    }

    // Level up detection
    const currentLevel = getLevel(totalXp)
    if (currentLevel.minXp > prevLevel.minXp) {
      triggerLevelUp(currentLevel)
    }
    prevLevelRef.current = currentLevel
  }, [totalXp])
}
