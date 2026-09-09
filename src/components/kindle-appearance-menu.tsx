'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Type,
  AlignJustify,
  Minimize2,
  Maximize2,
  BookOpen,
  ScrollText,
  Check,
  Sparkles,
} from 'lucide-react'
import {
  useStore,
  PAPER_TONES,
  type ReadingPaperTone,
  type ReaderFontFamily,
  type ReaderLayoutMode,
  type ReadingWidth,
} from '@/lib/store'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface KindleAppearanceMenuProps {
  className?: string
  align?: 'left' | 'right' | 'center'
}

const PAPER_ORDER: ReadingPaperTone[] = ['parchment', 'bhojpatra', 'aranya', 'obsidian', 'default']

const FONTS: { id: ReaderFontFamily; label: string; sample: string; desc: string }[] = [
  { id: 'cormorant', label: 'Cormorant', sample: 'Garamond', desc: 'Sacred Antiquarian' },
  { id: 'cinzel', label: 'Cinzel', sample: 'Inscriptional', desc: 'Temple Epigraph' },
  { id: 'playfair', label: 'Playfair', sample: 'Display', desc: 'Editorial Serif' },
  { id: 'sans', label: 'Modern Sans', sample: 'Clean', desc: 'Contemporary' },
]

const LINE_SPACINGS = [
  { label: 'Compact', value: 1.5 },
  { label: 'Standard', value: 1.85 },
  { label: 'Spacious', value: 2.2 },
]

export function KindleAppearanceMenu({ className, align = 'right' }: KindleAppearanceMenuProps) {
  const store = useStore()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const currentPaper = PAPER_TONES[store.paperTone] || PAPER_TONES.parchment

  return (
    <div className="relative inline-flex items-center" ref={menuRef}>
      {/* Apple Books / Kindle iconic "aA" Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Theme & Typography Settings"
        aria-expanded={isOpen}
        className={cn(
          'flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-200 text-sm font-serif select-none',
          isOpen
            ? 'bg-primary/10 border-primary/50 text-primary shadow-sm'
            : 'border-border/60 hover:border-border hover:bg-muted/60 text-foreground/80',
          className
        )}
      >
        <span className="text-base font-bold leading-none tracking-tight">A</span>
        <span className="text-xs font-medium leading-none opacity-80">A</span>
      </button>

      {/* Popover Card */}
      {isOpen && (
        <div
          className={cn(
            'absolute top-full mt-2 w-[340px] sm:w-[380px] p-4 rounded-2xl shadow-2xl border backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150',
            'bg-card/95 text-card-foreground border-border/80',
            align === 'right' && 'right-0',
            align === 'left' && 'left-0',
            align === 'center' && 'left-1/2 -translate-x-1/2'
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-border/40 mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Reader Appearance
              </span>
            </div>
            <span className="text-[11px] font-mono text-muted-foreground">
              {currentPaper.sanskrit} • {currentPaper.name}
            </span>
          </div>

          {/* 1. Paper Tones (Kindle / Apple Books surfaces) */}
          <div className="mb-4">
            <label className="text-xs font-medium text-muted-foreground block mb-2">
              Manuscript Paper Tone
            </label>
            <div className="grid grid-cols-5 gap-2">
              {PAPER_ORDER.map((toneKey) => {
                const meta = PAPER_TONES[toneKey]
                const isActive = store.paperTone === toneKey
                return (
                  <button
                    key={toneKey}
                    type="button"
                    onClick={() => store.setPaperTone(toneKey)}
                    title={`${meta.name} (${meta.sanskrit}) — ${meta.description}`}
                    className={cn(
                      'group flex flex-col items-center gap-1 p-2 rounded-xl border transition-all text-center relative',
                      meta.swatchClass,
                      isActive
                        ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-105 shadow-md border-primary/40'
                        : 'opacity-70 hover:opacity-100 hover:scale-102 border-border/60'
                    )}
                  >
                    <div
                      className={cn(
                        'w-7 h-7 rounded-full border shadow-inner flex items-center justify-center',
                        toneKey === 'parchment' && 'bg-[#F8F5EE] border-[#E8DEC8]',
                        toneKey === 'bhojpatra' && 'bg-[#EFE6D5] border-[#DFD0B8]',
                        toneKey === 'aranya' && 'bg-[#EDF1EA] border-[#D5DDD1]',
                        toneKey === 'obsidian' && 'bg-[#141210] border-[#2E2722]',
                        toneKey === 'default' && 'bg-background border-border'
                      )}
                    >
                      {isActive && (
                        <Check
                          className={cn(
                            'w-3.5 h-3.5',
                            toneKey === 'obsidian' ? 'text-amber-400' : 'text-primary'
                          )}
                        />
                      )}
                    </div>
                    <span className="text-[10px] font-sans font-medium line-clamp-1 leading-tight mt-0.5">
                      {meta.sanskrit}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 2. Font Size Stepper */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-muted-foreground">Font Size</label>
              <span className="text-xs font-mono font-medium text-foreground">
                {Math.round(store.fontScale * 100)}%
              </span>
            </div>
            <div className="flex items-center gap-2 bg-muted/40 p-1 rounded-xl border border-border/50">
              <button
                type="button"
                onClick={() => store.setFontScale(store.fontScale - 0.05)}
                disabled={store.fontScale <= 0.85}
                className="flex-1 py-1.5 rounded-lg text-xs font-serif font-semibold transition hover:bg-background/80 disabled:opacity-40"
              >
                A <span className="text-[10px] opacity-70">−</span>
              </button>
              <div className="w-px h-5 bg-border/60" />
              <button
                type="button"
                onClick={() => store.setFontScale(1.0)}
                className="px-3 py-1.5 rounded-lg text-[11px] font-sans font-medium transition hover:bg-background/80 text-muted-foreground"
              >
                Reset
              </button>
              <div className="w-px h-5 bg-border/60" />
              <button
                type="button"
                onClick={() => store.setFontScale(store.fontScale + 0.05)}
                disabled={store.fontScale >= 1.5}
                className="flex-1 py-1.5 rounded-lg text-base font-serif font-bold transition hover:bg-background/80 disabled:opacity-40"
              >
                A <span className="text-xs opacity-70">+</span>
              </button>
            </div>
          </div>

          {/* 3. Font Family Selector */}
          <div className="mb-4">
            <label className="text-xs font-medium text-muted-foreground block mb-2">
              Typography Style
            </label>
            <div className="grid grid-cols-2 gap-2">
              {FONTS.map((f) => {
                const isActive = store.readerFont === f.id
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => store.setReaderFont(f.id)}
                    className={cn(
                      'p-2.5 rounded-xl border text-left transition-all relative',
                      isActive
                        ? 'bg-primary/10 border-primary text-primary shadow-xs'
                        : 'border-border/50 hover:border-border hover:bg-muted/40'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          'text-sm font-semibold',
                          f.id === 'cormorant' && 'font-serif',
                          f.id === 'cinzel' && 'tracking-wide font-serif',
                          f.id === 'playfair' && 'font-serif',
                          f.id === 'sans' && 'font-sans'
                        )}
                      >
                        {f.label}
                      </span>
                      {isActive && <Check className="w-3.5 h-3.5 text-primary" />}
                    </div>
                    <span className="text-[10px] text-muted-foreground block mt-0.5">
                      {f.desc}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 4. Line Spacing & Reading Width */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                Line Spacing
              </label>
              <div className="flex bg-muted/40 p-1 rounded-xl border border-border/50">
                {LINE_SPACINGS.map((sp) => {
                  const isActive = Math.abs(store.lineSpacing - sp.value) < 0.1
                  return (
                    <button
                      key={sp.label}
                      type="button"
                      onClick={() => store.setLineSpacing(sp.value)}
                      className={cn(
                        'flex-1 py-1 rounded-lg text-[11px] font-medium transition',
                        isActive
                          ? 'bg-background shadow-xs text-foreground font-semibold'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {sp.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                Reading Width
              </label>
              <div className="flex bg-muted/40 p-1 rounded-xl border border-border/50">
                {(['narrow', 'normal', 'wide'] as ReadingWidth[]).map((w) => {
                  const isActive = store.readingWidth === w
                  return (
                    <button
                      key={w}
                      type="button"
                      onClick={() => store.setReadingWidth(w)}
                      className={cn(
                        'flex-1 py-1 rounded-lg text-[11px] capitalize font-medium transition',
                        isActive
                          ? 'bg-background shadow-xs text-foreground font-semibold'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {w}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* 5. Page Layout Mode (Paged Book Flip vs Continuous Scroll) */}
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">
              Reading Layout
            </label>
            <div className="grid grid-cols-2 gap-2 bg-muted/40 p-1 rounded-xl border border-border/50">
              <button
                type="button"
                onClick={() => store.setReaderPaging('paged')}
                className={cn(
                  'flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition',
                  store.readerPaging === 'paged'
                    ? 'bg-background shadow-xs text-foreground font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Paged Book</span>
              </button>
              <button
                type="button"
                onClick={() => store.setReaderPaging('scroll')}
                className={cn(
                  'flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition',
                  store.readerPaging === 'scroll'
                    ? 'bg-background shadow-xs text-foreground font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <ScrollText className="w-3.5 h-3.5" />
                <span>Continuous</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
