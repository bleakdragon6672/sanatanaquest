'use client'

import { Settings2, BookOpen, Sparkles } from 'lucide-react'
import { useStore, type ReadingMode } from '@/lib/store'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

const READING_MODE_LABELS: Record<ReadingMode, string> = {
  kindle: '📖 Kindle / Apple Books Mode',
  full: 'Sanskrit + Transliteration + English',
  'sanskrit-english': 'Sanskrit + English',
  sanskrit: 'Sanskrit Only',
  english: 'English Only',
  focus: 'Focus Reading Mode',
  night: 'Night Reading Mode',
}

const READING_MODE_DESCRIPTIONS: Record<ReadingMode, string> = {
  kindle: 'Full-screen luxury book reader with page turning & paper surfaces',
  full: 'Sanskrit, transliteration, and English',
  'sanskrit-english': 'Sanskrit alongside English',
  sanskrit: 'Only the original Sanskrit text',
  english: 'Only the English translation',
  focus: 'Distraction-free reading',
  night: 'Warm tones for low light',
}

interface ReadingModeSwitcherProps {
  onOpenBookMode?: () => void
}

export function ReadingModeSwitcher({ onOpenBookMode }: ReadingModeSwitcherProps = {}) {
  const store = useStore()

  const handleSelectMode = (m: ReadingMode) => {
    store.setReadingMode(m)
    if (m === 'kindle') {
      store.setBookReaderOpen(true)
      onOpenBookMode?.()
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            'gap-1.5 rounded-full border-dashed transition-all',
            store.readingMode === 'kindle' && 'border-primary/60 bg-saffron-gradient-soft text-primary font-medium',
          )}
        >
          {store.readingMode === 'kindle' ? (
            <BookOpen className="h-3.5 w-3.5 text-primary" />
          ) : (
            <Settings2 className="h-3.5 w-3.5" />
          )}
          <span className="hidden sm:inline text-xs">
            {READING_MODE_LABELS[store.readingMode] || 'Reading Mode'}
          </span>
          <span className="sm:hidden text-xs">
            {store.readingMode === 'kindle' ? 'Kindle' : 'Mode'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-2 shadow-xl border-border/80">
        <DropdownMenuLabel className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Reading Mode
        </DropdownMenuLabel>
        
        {/* Featured Kindle / Apple Books Mode item */}
        <div className="p-1 mb-1">
          <DropdownMenuItem
            onClick={() => handleSelectMode('kindle')}
            className={cn(
              'flex flex-col items-start gap-1 p-3 rounded-xl cursor-pointer border transition-all duration-200',
              'bg-gradient-to-r from-amber-500/15 via-saffron/10 to-amber-500/5 hover:from-amber-500/25 hover:via-saffron/20 hover:to-amber-500/10 border-amber-400/40 text-foreground shadow-xs',
              store.readingMode === 'kindle' && 'ring-2 ring-primary/40',
            )}
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-sm font-semibold flex items-center gap-1.5 text-amber-700 dark:text-amber-300">
                <BookOpen className="w-4 h-4 text-primary" />
                Kindle / Apple Books Mode
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/25 text-amber-800 dark:text-amber-200 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5" /> LUXURY
              </span>
            </div>
            <span className="text-[11px] text-muted-foreground leading-snug">
              Authentic paper surfaces, bottom scrubber, reading speed, and page-turning feel.
            </span>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        {/* Standard Modes */}
        {(['full', 'sanskrit-english', 'sanskrit', 'english', 'focus', 'night'] as ReadingMode[]).map((m) => (
          <DropdownMenuItem
            key={m}
            onClick={() => handleSelectMode(m)}
            className={cn(
              'flex flex-col items-start gap-0.5 px-3 py-2.5 rounded-lg mb-0.5 cursor-pointer',
              'transition-colors duration-150',
              store.readingMode === m && 'bg-saffron-gradient-soft font-medium text-foreground',
            )}
          >
            <span className="text-sm font-medium">{READING_MODE_LABELS[m]}</span>
            <span className="text-[11px] text-muted-foreground">{READING_MODE_DESCRIPTIONS[m]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
