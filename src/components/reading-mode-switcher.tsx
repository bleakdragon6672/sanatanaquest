'use client'

import { Settings2 } from 'lucide-react'
import { useStore, type ReadingMode } from '@/lib/store'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

const READING_MODE_LABELS: Record<ReadingMode, string> = {
  sanskrit: 'Sanskrit Only',
  english: 'English Only',
  'sanskrit-english': 'Sanskrit + English',
  full: 'Sanskrit + Transliteration + English',
  focus: 'Focus Reading Mode',
  night: 'Night Reading Mode',
}

const READING_MODE_DESCRIPTIONS: Record<ReadingMode, string> = {
  sanskrit: 'Only the original Sanskrit text',
  english: 'Only the English translation',
  'sanskrit-english': 'Sanskrit alongside English',
  full: 'Sanskrit, transliteration, and English',
  focus: 'Distraction-free reading',
  night: 'Warm tones for low light',
}

export function ReadingModeSwitcher() {
  const store = useStore()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5 rounded-full border-dashed">
          <Settings2 className="h-3.5 w-3.5" />
          <span className="hidden sm:inline text-xs">{READING_MODE_LABELS[store.readingMode]}</span>
          <span className="sm:hidden text-xs">Mode</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 p-2">
        <DropdownMenuLabel className="px-2">Reading Mode</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {(Object.keys(READING_MODE_LABELS) as ReadingMode[]).map((m) => (
          <DropdownMenuItem
            key={m}
            onClick={() => store.setReadingMode(m)}
            className={cn(
              'flex flex-col items-start gap-0.5 px-3 py-2.5 rounded-lg mb-0.5 cursor-pointer',
              'transition-colors duration-150',
              store.readingMode === m && 'bg-saffron-gradient-soft',
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
