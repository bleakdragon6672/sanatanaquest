'use client'

import { useState, useRef, useEffect } from 'react'
import { Highlighter, X, Check } from 'lucide-react'
import { useStore, PASTEL_HIGHLIGHTS, type PastelHighlightColor } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface HighlighterPaletteProps {
  verseId: string
  className?: string
  shortcut?: string
}

const COLOR_KEYS: PastelHighlightColor[] = ['saffron', 'lotus', 'vermilion', 'ash', 'teal']

export function HighlighterPalette({ verseId, className, shortcut }: HighlighterPaletteProps) {
  const store = useStore()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const isHighlighted = store.highlights.includes(verseId)
  const activeColor = store.highlightColors?.[verseId] || 'saffron'

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSelectColor = (color: PastelHighlightColor) => {
    store.setHighlightColor(verseId, color)
    setIsOpen(false)
    toast.success(`Highlighted in ${PASTEL_HIGHLIGHTS[color].name} (${PASTEL_HIGHLIGHTS[color].sanskrit})`)
  }

  const handleRemove = () => {
    store.toggleHighlight(verseId)
    setIsOpen(false)
    toast.success('Highlight removed')
  }

  const currentColorMeta = PASTEL_HIGHLIGHTS[activeColor] || PASTEL_HIGHLIGHTS.saffron

  return (
    <div className="relative inline-flex items-center" ref={menuRef}>
      <Button
        size="icon"
        variant="ghost"
        className={cn(
          'verse-action-btn h-8 w-8 rounded-full transition-all duration-200 relative',
          'hover:scale-110',
          isHighlighted
            ? 'bg-muted shadow-sm'
            : 'hover:bg-saffron-gradient-soft text-muted-foreground',
          className
        )}
        onClick={() => setIsOpen(!isOpen)}
        title={isHighlighted ? `Highlight: ${currentColorMeta.name}` : `Highlight (H)`}
      >
        <Highlighter
          className={cn(
            'h-4 w-4 transition-colors',
            isHighlighted ? currentColorMeta.textClass : 'text-muted-foreground'
          )}
        />
        {isHighlighted && (
          <span
            className={cn(
              'absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-background shadow-xs',
              currentColorMeta.dotClass
            )}
          />
        )}
        <span className="sr-only">Highlighter Palette</span>
      </Button>

      {/* Kindle-Style Floating 5-Color Pastel Palette */}
      {isOpen && (
        <div
          className={cn(
            'absolute top-full right-0 mt-1.5 z-50 p-2 rounded-2xl bg-card/95 backdrop-blur-md border border-border shadow-2xl animate-scale-in flex items-center gap-1.5'
          )}
        >
          {COLOR_KEYS.map((colorKey) => {
            const meta = PASTEL_HIGHLIGHTS[colorKey]
            const isCurrent = isHighlighted && activeColor === colorKey
            return (
              <button
                key={colorKey}
                onClick={() => handleSelectColor(colorKey)}
                className={cn(
                  'group relative w-7 h-7 rounded-full transition-all flex items-center justify-center',
                  meta.dotClass,
                  'hover:scale-125 hover:shadow-md active:scale-95',
                  isCurrent ? 'ring-2 ring-foreground ring-offset-2 scale-110 shadow-sm' : 'opacity-85 hover:opacity-100'
                )}
                title={`${meta.name} · ${meta.sanskrit}`}
              >
                {isCurrent && <Check className="w-3.5 h-3.5 text-black/70 stroke-[3]" />}
                <span className="sr-only">{meta.name}</span>
              </button>
            )
          })}

          {isHighlighted && (
            <>
              <div className="w-px h-4 bg-border/80 mx-0.5" />
              <button
                onClick={handleRemove}
                className="w-6 h-6 rounded-full hover:bg-muted text-muted-foreground hover:text-destructive flex items-center justify-center transition-colors"
                title="Remove Highlight"
              >
                <X className="w-3.5 h-3.5" />
                <span className="sr-only">Remove Highlight</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
