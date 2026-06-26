'use client'

import { useState } from 'react'
import {
  Settings2, Type, AlignJustify, Maximize2, Minimize2,
  Eye, Focus, Moon, Sparkles, Volume2,
} from 'lucide-react'
import { useStore, type ReadingWidth, type ReadingViewMode, type AccentColor } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const WIDTH_LABELS: Record<ReadingWidth, string> = {
  narrow: 'Narrow',
  normal: 'Normal',
  wide: 'Wide',
}

const VIEW_MODE_LABELS: Record<ReadingViewMode, { label: string; icon: typeof Eye; description: string }> = {
  standard: { label: 'Standard', icon: Eye, description: 'Full UI' },
  focus: { label: 'Focus', icon: Focus, description: 'Centered reading' },
  zen: { label: 'Zen', icon: Moon, description: 'Minimal, distraction-free' },
}

const ACCENT_COLORS: { id: AccentColor; label: string; color: string }[] = [
  { id: 'saffron', label: 'Saffron', color: 'oklch(0.72 0.19 58)' },
  { id: 'gold', label: 'Gold', color: 'oklch(0.82 0.15 85)' },
  { id: 'vermilion', label: 'Vermilion', color: 'oklch(0.58 0.2 35)' },
  { id: 'lotus', label: 'Lotus', color: 'oklch(0.7 0.15 340)' },
  { id: 'ocean', label: 'Ocean', color: 'oklch(0.65 0.12 240)' },
  { id: 'forest', label: 'Forest', color: 'oklch(0.6 0.14 155)' },
]

export function ReadingToolbar() {
  const store = useStore()
  const [expanded, setExpanded] = useState(false)

  const maxW = store.readingWidth === 'narrow' ? 'max-w-xl' : store.readingWidth === 'wide' ? 'max-w-5xl' : 'max-w-3xl'

  return (
    <div className={cn(
      'fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300',
      'toolbar-glass',
      expanded ? 'w-[90vw] max-w-lg' : 'w-auto',
    )}>
      {/* Collapsed bar */}
      <div className="flex items-center gap-1 px-3 py-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => store.setFontScale(store.fontScale - 0.05)}
          title="Decrease font size"
        >
          <Type className="h-3.5 w-3.5" />
        </Button>

        <span className="text-[10px] text-muted-foreground font-mono min-w-[2.5rem] text-center">
          {Math.round(store.fontScale * 100)}%
        </span>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => store.setFontScale(store.fontScale + 0.05)}
          title="Increase font size"
        >
          <Type className="h-4 w-4" />
        </Button>

        <div className="w-px h-5 bg-border mx-1" />

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => {
            const widths: ReadingWidth[] = ['narrow', 'normal', 'wide']
            const idx = widths.indexOf(store.readingWidth)
            store.setReadingWidth(widths[(idx + 1) % widths.length])
          }}
          title={`Reading width: ${WIDTH_LABELS[store.readingWidth]}`}
        >
          <AlignJustify className="h-4 w-4" />
        </Button>

        <div className="w-px h-5 bg-border mx-1" />

        {(['standard', 'focus', 'zen'] as ReadingViewMode[]).map((mode) => {
          const ModeIcon = VIEW_MODE_LABELS[mode].icon
          return (
            <Button
              key={mode}
              variant="ghost"
              size="icon"
              className={cn(
                'h-8 w-8 rounded-full',
                store.readingViewMode === mode && 'bg-saffron-gradient-soft text-primary',
              )}
              onClick={() => store.setReadingViewMode(mode)}
              title={VIEW_MODE_LABELS[mode].label}
            >
              <ModeIcon className="h-4 w-4" />
            </Button>
          )
        })}

        <div className="w-px h-5 bg-border mx-1" />

        <Button
          variant="ghost"
          size="icon"
          className={cn('h-8 w-8 rounded-full', expanded && 'bg-saffron-gradient-soft text-primary')}
          onClick={() => setExpanded(!expanded)}
          title="More settings"
        >
          <Settings2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Expanded panel */}
      {expanded && (
        <div className="px-4 pb-4 pt-1 border-t border-border/40 space-y-4 animate-slide-up">
          {/* Line spacing */}
          <div>
            <label className="text-xs text-muted-foreground font-medium">Line Spacing</label>
            <div className="flex items-center gap-2 mt-1.5">
              <Minimize2 className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="range"
                min="1.2"
                max="2.5"
                step="0.1"
                value={store.lineSpacing}
                onChange={(e) => store.setLineSpacing(parseFloat(e.target.value))}
                className="flex-1 accent-primary h-1"
              />
              <Maximize2 className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-mono min-w-[2rem] text-right">
                {store.lineSpacing.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Accent color */}
          <div>
            <label className="text-xs text-muted-foreground font-medium">Accent Color</label>
            <div className="flex items-center gap-2 mt-1.5">
              {ACCENT_COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => store.setAccentColor(c.id)}
                  className={cn(
                    'w-7 h-7 rounded-full border-2 transition-all',
                    store.accentColor === c.id ? 'border-foreground scale-110' : 'border-transparent hover:scale-105',
                  )}
                  style={{ background: c.color }}
                  title={c.label}
                />
              ))}
            </div>
          </div>

          {/* Animations toggle */}
          <div className="flex items-center justify-between">
            <label className="text-xs text-muted-foreground font-medium">Animations</label>
            <Button
              variant="ghost"
              size="sm"
              className={cn('h-7 rounded-full text-xs', store.animationsEnabled && 'bg-saffron-gradient-soft text-primary')}
              onClick={() => store.setAnimationsEnabled(!store.animationsEnabled)}
            >
              {store.animationsEnabled ? 'On' : 'Off'}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
