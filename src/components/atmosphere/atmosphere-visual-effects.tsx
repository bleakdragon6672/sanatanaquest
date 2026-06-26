'use client'

// AtmosphereVisualEffects — fixed full-screen overlay rendering animated
// backgrounds for each atmosphere type. Sits behind all content (z-0) and
// does not capture pointer events.
//
// Skipped when:
//   - No atmosphere is selected
//   - Visual effects are disabled (user toggle)
//   - Reduce motion is enabled (accessibility)
//   - The atmosphere has background="none" (silent mode)
//
// Animations are defined as @keyframes in src/app/globals.css:
//   river-flow, rain-fall, leaf-float, temple-glow,
//   star-twinkle, fire-flicker, garden-float, flute-pulse

import { useAtmosphere, type Atmosphere } from '@/components/atmosphere/atmosphere-context'

export function AtmosphereVisualEffects({ atmosphere }: { atmosphere: Atmosphere | null }) {
  const { visualEffectsEnabled, reduceMotion } = useAtmosphere()

  if (!atmosphere || !visualEffectsEnabled || reduceMotion || atmosphere.background === 'none') {
    return null
  }

  const bg = atmosphere.background
  const accentColor = atmosphere.accentColor

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden
    >
      {bg === 'river' && (
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            background: `linear-gradient(180deg, transparent 0%, ${accentColor}40 50%, transparent 100%)`,
            animation: 'river-flow 8s ease-in-out infinite alternate',
          }}
        />
      )}
      {bg === 'rain' && (
        <div className="absolute inset-0 opacity-[0.05]">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-8 rounded-full"
              style={{
                left: `${(3.3 * i) % 100}%`,
                background: accentColor,
                animation: `rain-fall ${1 + (i % 3) * 0.5}s linear infinite`,
                animationDelay: `${0.15 * i}s`,
              }}
            />
          ))}
        </div>
      )}
      {bg === 'forest' && (
        <div className="absolute inset-0 opacity-[0.06]">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${(10 + 12 * i) % 80}%`,
                top: `${(17 * i) % 100}%`,
                animation: `leaf-float ${6 + (i % 4) * 2}s ease-in-out infinite`,
                animationDelay: `${0.8 * i}s`,
              }}
            >
              🍃
            </div>
          ))}
        </div>
      )}
      {bg === 'temple' && (
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            background: `radial-gradient(ellipse at 50% 100%, ${accentColor}60 0%, transparent 60%)`,
            animation: 'temple-glow 4s ease-in-out infinite alternate',
          }}
        />
      )}
      {bg === 'night' && (
        <div className="absolute inset-0 opacity-[0.1]">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 rounded-full"
              style={{
                left: `${(4.1 * i) % 100}%`,
                top: `${(7.3 * i) % 70}%`,
                background: accentColor,
                animation: `star-twinkle ${2 + (i % 3)}s ease-in-out infinite`,
                animationDelay: `${0.2 * i}s`,
              }}
            />
          ))}
        </div>
      )}
      {bg === 'fire' && (
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            background: `radial-gradient(ellipse at 50% 80%, ${accentColor}80 0%, transparent 50%)`,
            animation: 'fire-flicker 0.8s ease-in-out infinite alternate',
          }}
        />
      )}
      {bg === 'garden' && (
        <div className="absolute inset-0 opacity-[0.05]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${(15 + 14 * i) % 70}%`,
                top: `${(20 + 11 * i) % 60}%`,
                background: accentColor,
                animation: `garden-float ${5 + (i % 3) * 2}s ease-in-out infinite`,
                animationDelay: `${0.5 * i}s`,
              }}
            />
          ))}
        </div>
      )}
      {bg === 'flute' && (
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            background: `radial-gradient(ellipse at 30% 40%, ${accentColor}50 0%, transparent 60%)`,
            animation: 'flute-pulse 5s ease-in-out infinite alternate',
          }}
        />
      )}
    </div>
  )
}
