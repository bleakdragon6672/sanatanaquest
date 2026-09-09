'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import {
  X,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  BookmarkCheck,
  Check,
  Sparkles,
  Clock,
  BookOpen,
  Share2,
  Volume2,
  VolumeX,
  NotebookPen,
  Eye,
  Sliders,
  MoreHorizontal,
  Maximize2,
  Minimize2,
} from 'lucide-react'
import { playPaperFlipSound, triggerHaptic } from '@/lib/reader-sound'
import {
  useStore,
  PAPER_TONES,
  PASTEL_HIGHLIGHTS,
  type ReadingPaperTone,
  type ReaderFontFamily,
  type ReaderLayoutMode,
  type ReadingWidth,
} from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { KindleAppearanceMenu } from '@/components/kindle-appearance-menu'
import { HighlighterPalette } from '@/components/highlighter-palette'
import { ShareCardModal } from '@/components/share-card-modal'
import { formatCommentary } from '@/lib/sanitize'

export interface GenericBookVerse {
  id: string
  chapter: number | string
  verse?: number | string
  number?: number | string
  sanskrit?: string
  awadhi?: string
  transliteration?: string
  english: string
  commentary?: string
  meaning?: string
  wordMeanings?: string
}

interface KindleBookReaderProps {
  isOpen: boolean
  onClose: () => void
  scriptureTitle: string
  chapterTitle: string
  chapterSubtitle?: string
  verses: GenericBookVerse[]
  initialVerseId?: string
  onSelectVerse?: (verseId: string) => void
}

export function KindleBookReader({
  isOpen,
  onClose,
  scriptureTitle,
  chapterTitle,
  chapterSubtitle,
  verses,
  initialVerseId,
  onSelectVerse,
}: KindleBookReaderProps) {
  const store = useStore()
  
  // Find initial verse index
  const initialIndex = useMemo(() => {
    if (!initialVerseId || !verses.length) return 0
    const idx = verses.findIndex((v) => v.id === initialVerseId)
    return idx >= 0 ? idx : 0
  }, [initialVerseId, verses])

  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex)
  const [hudVisible, setHudVisible] = useState<boolean>(true)
  const [turnDirection, setTurnDirection] = useState<'next' | 'prev' | 'none'>('none')
  const [showNoteEditor, setShowNoteEditor] = useState<boolean>(false)
  const [noteDraft, setNoteDraft] = useState<string>('')
  const [shareOpen, setShareOpen] = useState<boolean>(false)
  const [playingAudio, setPlayingAudio] = useState<boolean>(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const verseRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const autoHideTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Fullscreen state tracking with vendor prefix support
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)

  useEffect(() => {
    const handleFullscreenChange = () => {
      const doc = document as unknown as {
        fullscreenElement?: Element
        webkitFullscreenElement?: Element
      }
      setIsFullscreen(Boolean(doc.fullscreenElement || doc.webkitFullscreenElement))
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
    }
  }, [])

  const toggleFullscreen = async () => {
    try {
      const doc = document as unknown as {
        fullscreenElement?: Element
        webkitFullscreenElement?: Element
        exitFullscreen?: () => Promise<void>
        webkitExitFullscreen?: () => Promise<void>
      }
      const el = document.documentElement as unknown as {
        requestFullscreen?: () => Promise<void>
        webkitRequestFullscreen?: () => Promise<void>
      }

      if (!doc.fullscreenElement && !doc.webkitFullscreenElement) {
        if (el.requestFullscreen) {
          await el.requestFullscreen()
        } else if (el.webkitRequestFullscreen) {
          await el.webkitRequestFullscreen()
        }
      } else {
        if (doc.exitFullscreen) {
          await doc.exitFullscreen()
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen()
        }
      }
    } catch {
      // Ignored if permissions not granted
    }
  }

  // Auto-hide inactivity timer (4 seconds of idle reading fades the HUD into pure Zen mode)
  const resetInactivityTimer = () => {
    if (autoHideTimerRef.current) {
      clearTimeout(autoHideTimerRef.current)
    }
    if (!showNoteEditor && !shareOpen) {
      autoHideTimerRef.current = setTimeout(() => {
        setHudVisible(false)
      }, 4000)
    }
  }

  const handleUserActivity = () => {
    setHudVisible(true)
    resetInactivityTimer()
  }

  useEffect(() => {
    if (isOpen) {
      resetInactivityTimer()
    }
    return () => {
      if (autoHideTimerRef.current) clearTimeout(autoHideTimerRef.current)
    }
  }, [isOpen, showNoteEditor, shareOpen])

  // Synchronize when initialVerseId changes
  useEffect(() => {
    if (isOpen && initialVerseId) {
      const idx = verses.findIndex((v) => v.id === initialVerseId)
      if (idx >= 0) setCurrentIndex(idx)
    }
  }, [isOpen, initialVerseId, verses])

  // Stop audio on unmount or close
  useEffect(() => {
    if (!isOpen && audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setPlayingAudio(false)
    }
  }, [isOpen])

  const currentVerse: GenericBookVerse | undefined = verses[currentIndex]

  // Track active note draft
  useEffect(() => {
    if (currentVerse) {
      setNoteDraft(store.notes[currentVerse.id] || '')
    }
  }, [currentVerse?.id, store.notes])

  // Minutes left in chapter calculation
  const minutesLeft = useMemo(() => {
    if (!verses.length) return 0
    const remaining = verses.length - (currentIndex + 1)
    if (remaining <= 0) return 1
    return Math.max(1, Math.round((remaining * 40) / 60))
  }, [verses.length, currentIndex])

  // Percent complete
  const progressPercent = useMemo(() => {
    if (!verses.length) return 0
    return Math.round(((currentIndex + 1) / verses.length) * 100)
  }, [verses.length, currentIndex])

  // Sound and haptic feedback helper on page navigation
  const triggerPageFeedback = () => {
    if (store.pageTurnSound) {
      playPaperFlipSound()
    }
    if (store.hapticsEnabled) {
      triggerHaptic(10)
    }
  }

  // Paging controls
  const goToIndex = (idx: number, direction: 'next' | 'prev' | 'none' = 'none') => {
    if (idx < 0 || idx >= verses.length) return
    if (idx !== currentIndex) {
      triggerPageFeedback()
    }
    setTurnDirection(direction)
    setCurrentIndex(idx)
    handleUserActivity()
    if (onSelectVerse && verses[idx]) {
      onSelectVerse(verses[idx].id)
    }
    // If in scroll mode, scroll the target verse into view
    if (store.readerPaging === 'scroll') {
      const el = verseRefs.current[verses[idx].id]
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  const goNext = () => {
    if (currentIndex < verses.length - 1) {
      goToIndex(currentIndex + 1, 'next')
    }
  }

  const goPrev = () => {
    if (currentIndex > 0) {
      goToIndex(currentIndex - 1, 'prev')
    }
  }

  // Touch swipe handling for mobile
  const touchStartX = useRef<number>(0)
  const touchStartY = useRef<number>(0)
  const touchStartTime = useRef<number>(0)
  const isSwiping = useRef<boolean>(false)

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    touchStartTime.current = Date.now()
    isSwiping.current = true
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isSwiping.current) return
    isSwiping.current = false
    const touchEndX = e.changedTouches[0].clientX
    const touchEndY = e.changedTouches[0].clientY
    const deltaX = touchEndX - touchStartX.current
    const deltaY = touchEndY - touchStartY.current
    const deltaTime = Date.now() - touchStartTime.current

    // Only recognize horizontal swipe if |deltaX| is at least 40px and more than 1.3x vertical movement
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3 && deltaTime < 600) {
      if (deltaX < 0) {
        // Swiped left -> Next page
        goNext()
      } else {
        // Swiped right -> Previous page
        goPrev()
      }
    }
  }

  const handleCanvasClick = (e: React.MouseEvent) => {
    // If user clicked inside an interactive element, do not trigger page turn / HUD
    const target = e.target as HTMLElement
    if (target.closest('button, a, input, textarea, select, [role="button"], [contenteditable]')) {
      return
    }

    if (store.readerPaging === 'paged') {
      const { clientX } = e
      const windowWidth = window.innerWidth
      const leftZone = windowWidth * 0.22  // Left 22% tap zone
      const rightZone = windowWidth * 0.78 // Right 22% tap zone

      if (clientX < leftZone) {
        goPrev()
        return
      }
      if (clientX > rightZone) {
        goNext()
        return
      }
    }

    // Tap center zone (or anywhere in continuous scroll mode) -> Toggle HUD
    setHudVisible((prev) => {
      const next = !prev
      if (next) {
        resetInactivityTimer()
      } else if (autoHideTimerRef.current) {
        clearTimeout(autoHideTimerRef.current)
      }
      return next
    })
  }

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(e: KeyboardEvent) {
      // Ignore if typing in a textarea or input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      handleUserActivity()

      switch (e.key) {
        case 'ArrowRight':
        case 'j':
        case 'PageDown':
          e.preventDefault()
          goNext()
          break
        case 'ArrowLeft':
        case 'k':
        case 'PageUp':
          e.preventDefault()
          goPrev()
          break
        case 'b':
        case 'B':
          if (currentVerse) {
            e.preventDefault()
            const exists = store.bookmarks.includes(currentVerse.id)
            store.toggleBookmark(currentVerse.id)
            if (store.hapticsEnabled) triggerHaptic([8, 35, 12])
            toast.success(exists ? 'Bookmark removed' : 'Bookmarked verse')
          }
          break
        case 'h':
        case 'H':
          if (currentVerse) {
            e.preventDefault()
            const isH = store.highlights.includes(currentVerse.id)
            store.toggleHighlight(currentVerse.id)
            if (store.hapticsEnabled) triggerHaptic([8, 35, 12])
            toast.success(isH ? 'Highlight removed' : 'Highlighted verse')
          }
          break
        case 'Escape':
          e.preventDefault()
          if (isFullscreen) {
            toggleFullscreen()
          } else {
            onClose()
          }
          break
        case 'f':
        case 'F':
          // Toggle HUD
          e.preventDefault()
          setHudVisible((prev) => {
            const next = !prev
            if (next) resetInactivityTimer()
            return next
          })
          break
        case 'z':
        case 'Z':
          // Toggle Zen Fullscreen Mode
          e.preventDefault()
          toggleFullscreen()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex, currentVerse, verses.length, store, onClose, isFullscreen])

  // Audio recitation toggle
  const toggleAudio = () => {
    if (!currentVerse) return

    if (playingAudio && audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setPlayingAudio(false)
      return
    }

    // Audio convention: /audio/{type}/{id}.mp3
    const audioUrl = `/audio/gita/${currentVerse.id}.mp3`
    const audio = new Audio(audioUrl)
    audio.onended = () => setPlayingAudio(false)
    audio.onerror = () => {
      setPlayingAudio(false)
      toast.error('Chanting audio not available for this verse')
    }
    audioRef.current = audio
    audio.play().then(() => setPlayingAudio(true)).catch(() => {
      setPlayingAudio(false)
    })
  }

  // Save personal note
  const handleSaveNote = () => {
    if (!currentVerse) return
    store.setNote(currentVerse.id, noteDraft)
    setShowNoteEditor(false)
    toast.success('Reflection saved')
  }

  if (!isOpen || !verses.length) return null

  // Paper surface class
  const paperToneClass =
    store.paperTone === 'parchment'
      ? 'paper-surface-parchment'
      : store.paperTone === 'bhojpatra'
      ? 'paper-surface-bhojpatra'
      : store.paperTone === 'aranya'
      ? 'paper-surface-aranya'
      : store.paperTone === 'obsidian'
      ? 'paper-surface-obsidian'
      : 'paper-surface-default'

  // Font family class
  const readerFontClass =
    store.readerFont === 'cinzel'
      ? 'reader-font-cinzel'
      : store.readerFont === 'playfair'
      ? 'reader-font-playfair'
      : store.readerFont === 'sans'
      ? 'reader-font-sans'
      : 'reader-font-cormorant'

  // Reading width constraint
  const widthConstraintClass =
    store.readingWidth === 'narrow'
      ? 'max-w-xl'
      : store.readingWidth === 'wide'
      ? 'max-w-4xl'
      : 'max-w-2xl'

  return (
    <div
      onMouseMove={handleUserActivity}
      onTouchMove={handleUserActivity}
      className={cn(
        'fixed inset-0 z-50 flex flex-col transition-colors duration-300 select-none overflow-hidden',
        paperToneClass
      )}
    >
      {/* ── TOP HUD (Apple Books / Kindle bar) ────────────────── */}
      <header
        className={cn(
          'relative z-30 flex items-center justify-between px-4 sm:px-8 py-3 border-b transition-all duration-300 backdrop-blur-md',
          store.paperTone === 'obsidian'
            ? 'bg-[#141210]/90 border-[#2E2722] text-[#EAE0D2]'
            : 'bg-background/80 border-border/40 text-foreground',
          hudVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-full pointer-events-none'
        )}
      >
        {/* Left: Back / Close & Scripture Info */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-black/5 dark:hover:bg-white/10 shrink-0 h-8 w-8 sm:h-9 sm:w-9"
            title="Exit Book Mode (Esc)"
          >
            <X className="w-5 h-5" />
          </Button>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-xs uppercase tracking-wider sm:tracking-widest font-semibold opacity-60 truncate max-w-[90px] sm:max-w-none">
                {scriptureTitle}
              </span>
              <span className="text-xs opacity-40">•</span>
              <span className="text-xs font-mono font-medium opacity-80 truncate">
                {currentVerse ? `v${currentVerse.chapter}.${currentVerse.verse ?? currentVerse.number}` : chapterTitle}
              </span>
            </div>
            {chapterSubtitle && (
              <p className="text-[10px] sm:text-[11px] opacity-60 truncate italic font-serif hidden xs:block">
                {chapterSubtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right: Desktop Controls (hidden on small mobile) */}
        <div className="hidden sm:flex items-center gap-1.5 sm:gap-2">
          {currentVerse && (
            <>
              {/* Chanting Audio */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleAudio}
                className={cn(
                  'rounded-full h-8 w-8 hover:bg-black/5 dark:hover:bg-white/10',
                  playingAudio && 'text-amber-500 animate-pulse'
                )}
                title={playingAudio ? 'Stop Recitation' : 'Listen to Chanting'}
              >
                {playingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>

              {/* Personal Note */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowNoteEditor(!showNoteEditor)}
                className={cn(
                  'rounded-full h-8 w-8 hover:bg-black/5 dark:hover:bg-white/10',
                  store.notes[currentVerse.id] && 'text-amber-500'
                )}
                title="Personal Reflection (N)"
              >
                <NotebookPen className="w-4 h-4" />
              </Button>

              {/* Bookmark Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  store.toggleBookmark(currentVerse.id)
                  toast.success(
                    store.bookmarks.includes(currentVerse.id)
                      ? 'Bookmark removed'
                      : 'Verse bookmarked'
                  )
                }}
                className={cn(
                  'rounded-full h-8 w-8 hover:bg-black/5 dark:hover:bg-white/10',
                  store.bookmarks.includes(currentVerse.id) && 'text-amber-500'
                )}
                title="Bookmark (B)"
              >
                {store.bookmarks.includes(currentVerse.id) ? (
                  <BookmarkCheck className="w-4 h-4" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </Button>

              {/* 5-Color Pastel Highlighter Palette */}
              <HighlighterPalette verseId={currentVerse.id} />

              {/* Share Card Modal */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShareOpen(true)}
                className="rounded-full h-8 w-8 hover:bg-black/5 dark:hover:bg-white/10"
                title="Share Card (S)"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </>
          )}

          {/* Kindle iconic "aA" Appearance Menu */}
          <KindleAppearanceMenu align="right" />

          {/* Zen Fullscreen Mode Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="rounded-full h-8 w-8 hover:bg-black/5 dark:hover:bg-white/10"
            title={isFullscreen ? 'Exit Zen Fullscreen (Z)' : 'Zen Fullscreen Mode (Z)'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 text-amber-500" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Right: Mobile Controls (< sm screens) */}
        <div className="flex sm:hidden items-center gap-1">
          {currentVerse && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                store.toggleBookmark(currentVerse.id)
                toast.success(
                  store.bookmarks.includes(currentVerse.id)
                    ? 'Bookmark removed'
                    : 'Verse bookmarked'
                )
              }}
              className={cn(
                'rounded-full h-8 w-8 hover:bg-black/5 dark:hover:bg-white/10',
                store.bookmarks.includes(currentVerse.id) && 'text-amber-500'
              )}
              title="Bookmark"
            >
              {store.bookmarks.includes(currentVerse.id) ? (
                <BookmarkCheck className="w-4 h-4" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </Button>
          )}

          {/* aA menu button */}
          <KindleAppearanceMenu align="right" />

          {/* More Actions Dropdown on Mobile */}
          {currentVerse && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8 hover:bg-black/5 dark:hover:bg-white/10"
                  title="More actions"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl shadow-xl z-50">
                <DropdownMenuLabel className="text-[10px] uppercase font-semibold text-muted-foreground px-2 py-1">
                  Verse Actions • {currentVerse.chapter}.{currentVerse.verse ?? currentVerse.number}
                </DropdownMenuLabel>
                
                <DropdownMenuItem onClick={toggleAudio} className="gap-2.5 rounded-xl text-xs py-2 cursor-pointer">
                  {playingAudio ? <VolumeX className="w-4 h-4 text-amber-500" /> : <Volume2 className="w-4 h-4" />}
                  <span>{playingAudio ? 'Stop Recitation' : 'Listen to Chanting'}</span>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setShowNoteEditor(true)} className="gap-2.5 rounded-xl text-xs py-2 cursor-pointer">
                  <NotebookPen className={cn('w-4 h-4', store.notes[currentVerse.id] && 'text-amber-500')} />
                  <span>{store.notes[currentVerse.id] ? 'Edit Reflection' : 'Add Personal Reflection'}</span>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setShareOpen(true)} className="gap-2.5 rounded-xl text-xs py-2 cursor-pointer">
                  <Share2 className="w-4 h-4" />
                  <span>Share Sacred Verse</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => {
                    if (store.readVerses[currentVerse.id]) {
                      store.unmarkVerseRead(currentVerse.id)
                      toast.success('Marked unread')
                    } else {
                      store.markVerseRead(currentVerse.id)
                      store.addReadingTime(20)
                      toast.success('Marked as read · +10 XP')
                    }
                  }}
                  className="gap-2.5 rounded-xl text-xs py-2 cursor-pointer"
                >
                  <Check className={cn('w-4 h-4', store.readVerses[currentVerse.id] && 'text-green-500')} />
                  <span>{store.readVerses[currentVerse.id] ? 'Mark as Unread' : 'Mark as Read (+10 XP)'}</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={toggleFullscreen} className="gap-2.5 rounded-xl text-xs py-2 cursor-pointer">
                  {isFullscreen ? <Minimize2 className="w-4 h-4 text-amber-500" /> : <Maximize2 className="w-4 h-4" />}
                  <span>{isFullscreen ? 'Exit Fullscreen' : 'Zen Fullscreen Mode'}</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <div className="px-2 py-2">
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground block mb-2">
                    Sacred Highlighter
                  </span>
                  <div className="flex items-center justify-between gap-1">
                    {(['saffron', 'lotus', 'vermilion', 'ash', 'teal'] as const).map((colorKey) => {
                      const meta = PASTEL_HIGHLIGHTS[colorKey]
                      const isCurrent = store.highlights.includes(currentVerse.id) && (store.highlightColors?.[currentVerse.id] || 'saffron') === colorKey
                      return (
                        <button
                          key={colorKey}
                          type="button"
                          onClick={() => {
                            store.setHighlightColor(currentVerse.id, colorKey)
                            toast.success(`Highlighted in ${meta.name}`)
                          }}
                          className={cn(
                            'w-6 h-6 rounded-full border shadow-xs transition-transform active:scale-95 flex items-center justify-center',
                            meta.dotClass,
                            isCurrent && 'ring-2 ring-primary ring-offset-1 scale-110'
                          )}
                          title={meta.name}
                        >
                          {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </header>

      {/* ── READING CANVAS (PAGED or SCROLL) with TOUCH SWIPE ─── */}
      <main
        ref={scrollContainerRef}
        onClick={handleCanvasClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={cn(
          'relative flex-1 overflow-y-auto px-3 sm:px-8 py-4 sm:py-6 flex flex-col justify-start items-center transition-all touch-pan-y',
          store.readerPaging === 'paged' ? 'cursor-pointer' : 'cursor-auto'
        )}
      >
        {/* PAGED LAYOUT MODE */}
        {store.readerPaging === 'paged' && currentVerse && (
          <div
            key={currentVerse.id}
            className={cn(
              'w-full my-auto transition-all animate-book-page',
              turnDirection === 'next' && 'animate-book-turn-right',
              turnDirection === 'prev' && 'animate-book-turn-left',
              widthConstraintClass
            )}
            onClick={(e) => {
              // Prevent click event bubbling when interacting with verse text
              e.stopPropagation()
            }}
          >
            <BookVerseCard
              verse={currentVerse}
              readerFontClass={readerFontClass}
              fontScale={store.fontScale}
              lineSpacing={store.lineSpacing}
              paperTone={store.paperTone}
              isBookmarked={store.bookmarks.includes(currentVerse.id)}
              isRead={!!store.readVerses[currentVerse.id]}
              isHighlighted={store.highlights.includes(currentVerse.id)}
              highlightColor={store.highlightColors?.[currentVerse.id] || 'saffron'}
              onToggleRead={() => {
                if (store.readVerses[currentVerse.id]) {
                  store.unmarkVerseRead(currentVerse.id)
                  toast.success('Marked unread')
                } else {
                  store.markVerseRead(currentVerse.id)
                  store.addReadingTime(20)
                  toast.success('Marked as read · +10 XP')
                }
              }}
            />
          </div>
        )}

        {/* CONTINUOUS SCROLL LAYOUT MODE */}
        {store.readerPaging === 'scroll' && (
          <div
            className={cn('w-full space-y-12 py-6', widthConstraintClass)}
            onClick={(e) => e.stopPropagation()}
          >
            {verses.map((v, idx) => {
              const isCurrent = idx === currentIndex
              return (
                <div
                  key={v.id}
                  ref={(el) => {
                    verseRefs.current[v.id] = el
                  }}
                  className={cn(
                    'transition-opacity duration-300 pb-8 border-b border-border/20 last:border-b-0',
                    isCurrent ? 'opacity-100' : 'opacity-90'
                  )}
                  onClick={() => setCurrentIndex(idx)}
                >
                  <BookVerseCard
                    verse={v}
                    readerFontClass={readerFontClass}
                    fontScale={store.fontScale}
                    lineSpacing={store.lineSpacing}
                    paperTone={store.paperTone}
                    isBookmarked={store.bookmarks.includes(v.id)}
                    isRead={!!store.readVerses[v.id]}
                    isHighlighted={store.highlights.includes(v.id)}
                    highlightColor={store.highlightColors?.[v.id] || 'saffron'}
                    onToggleRead={() => {
                      if (store.readVerses[v.id]) {
                        store.unmarkVerseRead(v.id)
                        toast.success('Marked unread')
                      } else {
                        store.markVerseRead(v.id)
                        store.addReadingTime(20)
                        toast.success('Marked as read · +10 XP')
                      }
                    }}
                  />
                  {/* Decorative Sanskritic Fleuron between continuous verses */}
                  {idx < verses.length - 1 && (
                    <div className="flex items-center justify-center gap-3 pt-8 opacity-30">
                      <span className="h-px w-12 bg-current" />
                      <span className="font-serif text-sm">❧ ॐ ☙</span>
                      <span className="h-px w-12 bg-current" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Inline Reflection/Note Editor Modal */}
        {showNoteEditor && currentVerse && (
          <div
            className={cn(
              'fixed inset-x-4 bottom-24 sm:bottom-28 max-w-xl mx-auto p-4 rounded-2xl border shadow-2xl backdrop-blur-xl z-40 animate-in fade-in slide-in-from-bottom-6',
              store.paperTone === 'obsidian'
                ? 'bg-[#1B1815]/95 border-[#38302A] text-[#EAE0D2]'
                : 'bg-card/95 border-border text-card-foreground'
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider opacity-70">
                Reflection • Verse {currentVerse.chapter}.{currentVerse.verse ?? currentVerse.number}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNoteEditor(false)}
                className="h-6 w-6 p-0 rounded-full"
              >
                <X className="w-3.5 h-3.5" />
              </Button>
            </div>
            <Textarea
              value={noteDraft}
              onChange={(e) => setNoteDraft(e.target.value)}
              placeholder="Record your spiritual insights, questions, or realizations on this verse…"
              className="min-h-[90px] mb-3 text-sm bg-transparent border-border/50"
            />
            <div className="flex justify-end gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowNoteEditor(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSaveNote}
                className="text-xs bg-primary text-primary-foreground"
              >
                Save Reflection
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* ── BOTTOM HUD (Paging, Scrubber Bar, Reading Time) ── */}
      <footer
        className={cn(
          'relative z-30 px-3 sm:px-8 py-2.5 sm:py-3 border-t transition-all duration-300 backdrop-blur-md pb-[max(0.75rem,env(safe-area-inset-bottom))]',
          store.paperTone === 'obsidian'
            ? 'bg-[#141210]/90 border-[#2E2722] text-[#EAE0D2]'
            : 'bg-background/80 border-border/40 text-foreground',
          hudVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-full pointer-events-none'
        )}
      >
        <div className="max-w-4xl mx-auto flex flex-col gap-1.5 sm:gap-2">
          {/* Scrubber slider & Shloka count */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Prev page button */}
            <Button
              variant="ghost"
              size="icon"
              disabled={currentIndex === 0}
              onClick={goPrev}
              className="rounded-full h-9 w-9 hover:bg-black/5 dark:hover:bg-white/10 shrink-0"
              title="Previous Verse (← / K)"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Interactive Kindle-style Scrubber Slider */}
            <div className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max={verses.length - 1}
                  value={currentIndex}
                  onChange={(e) => goToIndex(parseInt(e.target.value, 10))}
                  aria-label="Chapter Progress Scrubber"
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-amber-500 bg-border/60 hover:bg-border transition-colors touch-pan-x"
                />
              </div>
            </div>

            {/* Next page button */}
            <Button
              variant="ghost"
              size="icon"
              disabled={currentIndex === verses.length - 1}
              onClick={goNext}
              className="rounded-full h-9 w-9 hover:bg-black/5 dark:hover:bg-white/10 shrink-0"
              title="Next Verse (→ / J)"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Bottom Metainfo: Shloka Counter + Time Remaining + Percentage */}
          <div className="flex items-center justify-between text-[11px] font-mono opacity-70 px-1">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{minutesLeft}m left</span>
            </span>

            <span className="font-sans font-medium text-xs">
              Verse {currentIndex + 1} of {verses.length}
            </span>

            <span>{progressPercent}%</span>
          </div>
        </div>
      </footer>

      {/* Share Card Modal */}
      {currentVerse && (
        <ShareCardModal
          open={shareOpen}
          onClose={() => setShareOpen(false)}
          title={`${scriptureTitle} • Verse ${currentVerse.chapter}.${currentVerse.verse ?? currentVerse.number}`}
          subtitle={currentVerse.transliteration?.split('\n')[0] || ''}
          body={currentVerse.english}
          footer="Sanatan Quest Luxury Reader"
        />
      )}
    </div>
  )
}

/* ── Individual Book Page Card Component ────────────────────────── */
interface BookVerseCardProps {
  verse: GenericBookVerse
  readerFontClass: string
  fontScale: number
  lineSpacing: number
  paperTone: ReadingPaperTone
  isBookmarked: boolean
  isRead: boolean
  isHighlighted: boolean
  highlightColor: string
  onToggleRead: () => void
}

function BookVerseCard({
  verse,
  readerFontClass,
  fontScale,
  lineSpacing,
  paperTone,
  isBookmarked,
  isRead,
  isHighlighted,
  highlightColor,
  onToggleRead,
}: BookVerseCardProps) {
  const highlightMeta =
    PASTEL_HIGHLIGHTS[highlightColor as keyof typeof PASTEL_HIGHLIGHTS] ||
    PASTEL_HIGHLIGHTS.saffron

  const sacredScript = verse.sanskrit || verse.awadhi

  return (
    <article
      className={cn(
        'relative rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 transition-all duration-300 border shadow-md w-full max-w-full overflow-hidden',
        paperTone === 'obsidian'
          ? 'bg-[#181613] border-[#2C2621] text-[#EAE0D2]'
          : paperTone === 'bhojpatra'
          ? 'bg-[#E7DCC7]/50 border-[#D6C5A9] text-[#2A1B0E]'
          : paperTone === 'parchment'
          ? 'bg-[#F4EFE6]/60 border-[#E2D6BE] text-[#2B2118]'
          : paperTone === 'aranya'
          ? 'bg-[#E4EAE0]/50 border-[#C8D3C4] text-[#1A251A]'
          : 'bg-card/70 border-border text-card-foreground',
        isHighlighted && highlightMeta.cardClass
      )}
    >
      {/* Top Header info */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 pb-2.5 sm:pb-3 border-b border-current/10">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <Badge
            variant="outline"
            className="font-mono text-xs px-2.5 py-0.5 border-current/20 bg-transparent text-current"
          >
            {verse.chapter}.{verse.verse ?? verse.number}
          </Badge>
          {isRead && (
            <Badge className="bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[10px] px-2">
              ✓ Read
            </Badge>
          )}
          {isHighlighted && (
            <Badge
              variant="outline"
              className={cn(
                'text-[10px] font-medium border gap-1 shadow-xs',
                highlightMeta.textClass,
                highlightMeta.borderClass
              )}
            >
              <span className={cn('w-1.5 h-1.5 rounded-full', highlightMeta.dotClass)} />
              {highlightMeta.name}
            </Badge>
          )}
        </div>

        <button
          type="button"
          onClick={onToggleRead}
          className="text-xs opacity-60 hover:opacity-100 transition-opacity font-medium py-1 px-1.5 rounded-md"
        >
          {isRead ? 'Mark as Unread' : 'Mark as Read'}
        </button>
      </div>

      {/* Sanskrit / Awadhi Sacred Text */}
      {sacredScript && (
        <div className="mb-5 sm:mb-6 text-center">
          <p
            className="sanskrit-text font-medium leading-[2.1] sm:leading-[2.4] tracking-wide select-text text-balance break-words"
            style={{
              fontFamily:
                'var(--font-noto-devanagari), var(--font-devanagari), "Noto Serif Devanagari", serif',
              fontSize: `clamp(1.15rem, 4.2vw, ${1.35 * fontScale}rem)`,
            }}
          >
            {sacredScript}
          </p>
        </div>
      )}

      {/* Transliteration */}
      {verse.transliteration && (
        <div className="mb-5 sm:mb-6 text-center">
          <p
            className="italic opacity-75 leading-relaxed tracking-normal select-text text-balance break-words"
            style={{
              fontFamily:
                'var(--font-cormorant-garamond), var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
              fontSize: `clamp(0.95rem, 3.2vw, ${1.05 * fontScale}rem)`,
              lineHeight: lineSpacing * 0.95,
            }}
          >
            {verse.transliteration}
          </p>
        </div>
      )}

      {/* English Translation */}
      <div className="mb-5 sm:mb-6">
        <p
          className={cn('select-text text-balance break-words', readerFontClass)}
          style={{
            fontSize: `clamp(1.05rem, 3.6vw, ${1.18 * fontScale}rem)`,
            lineHeight: lineSpacing,
          }}
        >
          {verse.english}
        </p>
      </div>

      {/* Word-by-word meaning if available */}
      {verse.meaning && (
        <div className="mb-5 sm:mb-6 border-l-2 border-amber-500/40 pl-3 sm:pl-4 py-1 italic opacity-85 text-xs sm:text-sm select-text break-words">
          {verse.meaning}
        </div>
      )}

      {/* Classical Commentary */}
      {verse.commentary && (
        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-current/10 relative">
          <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
            <span className="text-xl font-serif opacity-30 leading-none">“</span>
            <span className="text-xs uppercase tracking-wider font-semibold opacity-60">
              Commentary
            </span>
          </div>
          <div
            className={cn('opacity-90 select-text leading-relaxed break-words', readerFontClass)}
            style={{
              fontSize: `clamp(0.92rem, 3.2vw, ${1.05 * fontScale}rem)`,
              lineHeight: lineSpacing,
            }}
            dangerouslySetInnerHTML={{
              __html: formatCommentary(verse.commentary),
            }}
          />
        </div>
      )}
    </article>
  )
}
