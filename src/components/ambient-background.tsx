'use client'

import { useEffect, useState, useCallback } from 'react'
import { useStore } from '@/lib/store'

import { OmSymbol } from '@/components/spiritual-icons'

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
    const count = 20
    const newParticles: Particle[] = []
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        size: 2 + Math.random() * 3,
        duration: 12 + Math.random() * 20,
        delay: Math.random() * 15,
        opacity: 0.2 + Math.random() * 0.35,
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
    <div className="ambient-bg pointer-events-none overflow-hidden fixed inset-0 z-0" aria-hidden>
      {/* Subtle gradient aura */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 25% 15%, color-mix(in oklch, var(--saffron) 12%, transparent) 0%, transparent 55%), radial-gradient(ellipse at 75% 85%, color-mix(in oklch, var(--gold) 10%, transparent) 0%, transparent 60%)',
        }}
      />

      {/* Floating Sacred Om Watermark */}
      <div className="absolute right-[-4vw] top-[15vh] opacity-[0.035] animate-om-pulse select-none">
        <OmSymbol size={420} className="text-primary" />
      </div>
      <div className="absolute left-[-5vw] bottom-[10vh] opacity-[0.025] animate-om-pulse select-none" style={{ animationDelay: '2s' }}>
        <OmSymbol size={360} className="text-primary" />
      </div>

      {/* Floating Golden Sparks */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="ambient-particle rounded-full"
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            bottom: '-10px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: 'radial-gradient(circle, var(--gold) 0%, var(--saffron) 100%)',
            boxShadow: '0 0 8px var(--saffron)',
            opacity: p.opacity,
            animation: `particle-float ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
