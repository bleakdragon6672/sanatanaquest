'use client'

// AtmosphereMiniWidget — fixed bottom-right pill shown whenever an atmosphere
// is selected (and not silent). Lets the user quickly open the panel,
// pause/resume audio, and adjust volume without leaving the current view.

import { Pause, Play, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { useAtmosphere } from '@/components/atmosphere/atmosphere-context'

export function AtmosphereMiniWidget() {
  const {
    currentAtmosphere,
    isPlaying,
    togglePlay,
    volume,
    setVolume,
    openPanel,
    showMiniWidget,
  } = useAtmosphere()

  if (!showMiniWidget) return null

  return (
    <div className="fixed bottom-4 right-4 z-40 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center gap-2 rounded-full bg-card/95 backdrop-blur-md border border-primary/30 shadow-lg px-3 py-2">
        <button onClick={openPanel} className="flex items-center gap-2">
          <span className="text-lg">{currentAtmosphere?.icon}</span>
          <span className="text-xs font-medium hidden sm:inline">
            {currentAtmosphere?.name}
          </span>
        </button>
        <Button
          size="icon"
          variant="ghost"
          className="h-7 w-7 rounded-full"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <Pause className="h-3.5 w-3.5" />
          ) : (
            <Play className="h-3.5 w-3.5" />
          )}
        </Button>
        <div className="hidden sm:flex items-center gap-1 w-20">
          <Volume2 className="h-3 w-3 text-muted-foreground" />
          <Slider
            value={[Math.round(volume * 100)]}
            max={100}
            step={5}
            onValueChange={(v) => setVolume(v[0] / 100)}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  )
}
