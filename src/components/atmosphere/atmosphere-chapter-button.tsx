'use client'

// AtmosphereChapterButton — small button rendered in the gita-view chapter
// reader's verse footer, next to the "AI Explain this verse" button.
// Opens the AtmospherePanel. Shows the current atmosphere's icon (or 🪷 if
// none selected) and a pulsing dot when audio is playing.

import { Button } from '@/components/ui/button'
import { useAtmosphere } from '@/components/atmosphere/atmosphere-context'
import { cn } from '@/lib/utils'

export function AtmosphereChapterButton({ chapter: _chapter }: { chapter: number }) {
  const { openPanel, currentAtmosphere, isPlaying } = useAtmosphere()

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={openPanel}
      className={cn(
        'gap-1.5 rounded-full border-primary/30 hover:bg-saffron-gradient-soft transition-all',
        currentAtmosphere &&
          currentAtmosphere.id !== 'silent' &&
          'border-primary bg-saffron-gradient-soft',
      )}
    >
      <span className="text-base">{currentAtmosphere?.icon ?? '🪷'}</span>
      <span className="hidden sm:inline text-xs font-medium">
        {currentAtmosphere && currentAtmosphere.id !== 'silent'
          ? currentAtmosphere.name
          : 'Sacred Atmosphere'}
      </span>
      {isPlaying && (
        <span className="flex items-center gap-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
        </span>
      )}
    </Button>
  )
}
