'use client'

// AtmospherePanel — right-side Sheet dialog for selecting an ambient
// soundscape. Shows:
//   - Header with "🪷 Sacred Atmosphere" title
//   - Grid of 9 atmosphere buttons (8 soundscapes + 1 silent)
//   - "Recommended for this chapter" highlighting (when chapter prop is set)
//   - Volume slider
//   - Visual effects toggle
//   - Reduce motion toggle
//   - Footer note about royalty-free audio + custom audio path

import { Pause, Play, Volume2, Sparkles, Eye, Accessibility } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import {
  ATMOSPHERES,
  useAtmosphere,
  type Atmosphere,
} from '@/components/atmosphere/atmosphere-context'
import { cn } from '@/lib/utils'

export function AtmospherePanel({ chapter }: { chapter?: number }) {
  const {
    showPanel,
    closePanel,
    currentAtmosphere,
    isPlaying,
    selectAtmosphere,
    togglePlay,
    volume,
    setVolume,
    visualEffectsEnabled,
    toggleVisualEffects,
    reduceMotion,
    toggleReduceMotion,
  } = useAtmosphere()

  // Set of atmosphere IDs recommended for the current chapter.
  const recommendedIds = new Set(
    (chapter
      ? ATMOSPHERES.filter((a) => a.recommendedChapters?.includes(chapter))
      : []
    ).map((a) => a.id),
  )

  return (
    <Sheet open={showPanel} onOpenChange={(o) => !o && closePanel()}>
      <SheetContent side="right" className="w-full sm:w-[420px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle
            className="flex items-center gap-2 text-saffron-gradient"
            style={{ fontFamily: 'var(--font-serif-display), serif' }}
          >
            <span className="text-xl">🪷</span> Sacred Atmosphere
          </SheetTitle>
          <SheetDescription>
            Enhance your reading with calming ambient soundscapes
          </SheetDescription>
        </SheetHeader>

        {currentAtmosphere && currentAtmosphere.id !== 'silent' && (
          <div className="mt-4 rounded-xl bg-saffron-gradient-soft border border-primary/20 p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{currentAtmosphere.icon}</span>
                <div>
                  <p className="text-sm font-semibold leading-tight">
                    {currentAtmosphere.name}
                  </p>
                  <p
                    className="text-[10px] text-primary/80"
                    style={{ fontFamily: 'var(--font-serif-display), serif' }}
                  >
                    {currentAtmosphere.sanskritName}
                  </p>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Volume2 className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <Slider
                value={[Math.round(volume * 100)]}
                max={100}
                step={5}
                onValueChange={(v) => setVolume(v[0] / 100)}
                className="flex-1"
              />
              <span className="text-[10px] text-muted-foreground w-8 text-right">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>
        )}

        {/* Atmosphere grid */}
        <div className="mt-4 grid grid-cols-2 gap-2 px-4">
          {ATMOSPHERES.map((a: Atmosphere) => {
            const isActive = currentAtmosphere?.id === a.id
            const isRecommended = recommendedIds.has(a.id)
            return (
              <button
                key={a.id}
                onClick={() => selectAtmosphere(a.id)}
                className={cn(
                  'rounded-xl border p-3 text-left transition-all relative',
                  isActive
                    ? 'border-primary bg-saffron-gradient-soft'
                    : 'border-border hover:border-primary/40 hover:bg-saffron-gradient-soft/50',
                )}
              >
                {isRecommended && !isActive && (
                  <span className="absolute top-1.5 right-1.5 text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-primary/15 text-primary">
                    For Ch {chapter}
                  </span>
                )}
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{a.icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold leading-tight truncate">
                      {a.name}
                    </p>
                    <p
                      className="text-[9px] text-primary/80 truncate"
                      style={{ fontFamily: 'var(--font-serif-display), serif' }}
                    >
                      {a.sanskritName}
                    </p>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground line-clamp-2 leading-snug">
                  {a.description}
                </p>
              </button>
            )
          })}
        </div>

        {/* Toggles */}
        <div className="mt-4 px-4 space-y-2">
          <button
            onClick={toggleVisualEffects}
            className="w-full flex items-center justify-between rounded-lg border border-border p-3 hover:bg-saffron-gradient-soft/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-primary" />
              <div className="text-left">
                <p className="text-xs font-semibold">Visual Effects</p>
                <p className="text-[10px] text-muted-foreground">
                  Subtle full-screen ambient animations
                </p>
              </div>
            </div>
            <span
              className={cn(
                'text-xs font-bold px-2 py-0.5 rounded-full',
                visualEffectsEnabled
                  ? 'bg-primary/15 text-primary'
                  : 'bg-muted text-muted-foreground',
              )}
            >
              {visualEffectsEnabled ? 'ON' : 'OFF'}
            </span>
          </button>

          <button
            onClick={toggleReduceMotion}
            className="w-full flex items-center justify-between rounded-lg border border-border p-3 hover:bg-saffron-gradient-soft/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Accessibility className="h-4 w-4 text-primary" />
              <div className="text-left">
                <p className="text-xs font-semibold">Reduce Motion</p>
                <p className="text-[10px] text-muted-foreground">
                  Disable animated visual effects
                </p>
              </div>
            </div>
            <span
              className={cn(
                'text-xs font-bold px-2 py-0.5 rounded-full',
                reduceMotion
                  ? 'bg-primary/15 text-primary'
                  : 'bg-muted text-muted-foreground',
              )}
            >
              {reduceMotion ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>

        <div className="mt-6 px-4 pb-6">
          <div className="flex items-start gap-2 rounded-lg bg-muted/40 p-3 text-[10px] text-muted-foreground/80">
            <Sparkles className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
            <p>
              Audio files are royalty-free ambient soundscape.
              <br />
              Replace files in <code className="text-primary/60">/public/audio/atmosphere/</code>{' '}
              to customize.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
