'use client'

import { useEffect, useState, useCallback } from 'react'
import { useStore } from '@/lib/store'

interface Particle {
  id: number
  x: number
  size: number
  duration: number
  delay: number
  opacity: number
}

export function AmbientBackground() {
  const animationsEnabled = useStore((s) => s.animationsEnabled)
  const [particles, setParticles] = useState<Particle[]>([])

  const generateParticles = useCallback(() => {
    const count = 12
    const newParticles: Particle[] = []
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        size: 1 + Math.random() * 2,
        duration: 15 + Math.random() * 25,
        delay: Math.random() * 20,
        opacity: 0.15 + Math.random() * 0.25,
      })
    }
    setParticles(newParticles)
  }, [])

  useEffect(() => {
    if (animationsEnabled) {
      generateParticles()
    }
  }, [animationsEnabled, generateParticles])

  if (!animationsEnabled) return null

  return (
    <div className="ambient-bg" aria-hidden>
      {/* Subtle gradient glow */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, color-mix(in oklch, var(--saffron) 8%, transparent) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, color-mix(in oklch, var(--gold) 6%, transparent) 0%, transparent 50%)',
        }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="ambient-particle"
          style={{
            left: `${p.x}%`,
            bottom: '-10px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
