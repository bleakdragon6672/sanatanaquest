'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { createPortal } from 'react-dom'
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
  type PastelHighlightColor,
} from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
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
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Synchronize store.isBookReaderOpen whenever KindleBookReader is open
  const setBookReaderOpen = useStore((s) => s.setBookReaderOpen)
  useEffect(() => {
    if (isOpen) {
      setBookReaderOpen(true)
    }
    return () => {
      setBookReaderOpen(false)
    }
  }, [isOpen, setBookReaderOpen])

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
      const isFs = Boolean(doc.fullscreenElement || doc.webkitFullscreenElement)
      setIsFullscreen(isFs)
      // If hardware fullscreen was dismissed via Esc or OS gesture, sync zen mode off
      if (!isFs && useStore.getState().isZenMode) {
        useStore.getState().setZenMode(false)
        setHudVisible(true)
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
    }
  }, [])

  // Zen mode toggle: activates on Mobile (iOS Safari & Android) and Desktop
  const toggleZenMode = async () => {
    const nextZen = !store.isZenMode
    store.setZenMode(nextZen)

    if (store.hapticsEnabled) {
      triggerHaptic([10, 35, 12])
    }

    if (nextZen) {
      setHudVisible(false)
      toast.success('Zen Mode active · Tap center to show controls')
      try {
        const el = document.documentElement as unknown as {
          requestFullscreen?: (opt?: { navigationUI?: string }) => Promise<void>
          webkitRequestFullscreen?: () => Promise<void>
        }
        if (el.requestFullscreen) {
          await el.requestFullscreen({ navigationUI: 'hide' }).catch(() => {})
        } else if (el.webkitRequestFullscreen) {
          await el.webkitRequestFullscreen().catch(() => {})
        }
      } catch {
        // Handled gracefully on iOS Safari
      }
    } else {
      setHudVisible(true)
      toast('Exited Zen Mode')
      try {
        const doc = document as unknown as {
          fullscreenElement?: Element
          webkitFullscreenElement?: Element
          exitFullscreen?: () => Promise<void>
          webkitExitFullscreen?: () => Promise<void>
        }
        if (doc.fullscreenElement || doc.webkitFullscreenElement) {
          if (doc.exitFullscreen) await doc.exitFullscreen().catch(() => {})
          else if (doc.webkitExitFullscreen) await doc.webkitExitFullscreen().catch(() => {})
        }
      } catch {}
    }
  }

  // React if zen mode is toggled externally (e.g. from aA menu)
  const prevZenRef = useRef(store.isZenMode)
  useEffect(() => {
    if (prevZenRef.current === store.isZenMode) return
    prevZenRef.current = store.isZenMode

    if (store.isZenMode) {
      setHudVisible(false)
      try {
        const el = document.documentElement as unknown as {
          requestFullscreen?: (opt?: { navigationUI?: string }) => Promise<void>
          webkitRequestFullscreen?: () => Promise<void>
        }
        if (el.requestFullscreen) el.requestFullscreen({ navigationUI: 'hide' }).catch(() => {})
        else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen().catch(() => {})
      } catch {}
    } else {
      setHudVisible(true)
      try {
        const doc = document as unknown as {
          fullscreenElement?: Element
          webkitFullscreenElement?: Element
          exitFullscreen?: () => Promise<void>
          webkitExitFullscreen?: () => Promise<void>
        }
        if (doc.fullscreenElement || doc.webkitFullscreenElement) {
          if (doc.exitFullscreen) doc.exitFullscreen().catch(() => {})
          else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen().catch(() => {})
        }
      } catch {}
    }
  }, [store.isZenMode])

  // Inactivity timer: in normal mode, auto-hides after 4s idle. In Zen mode, stays hidden.
  const resetInactivityTimer = () => {
    if (autoHideTimerRef.current) {
      clearTimeout(autoHideTimerRef.current)
    }
    if (!showNoteEditor && !shareOpen && !store.isZenMode) {
      autoHideTimerRef.current = setTimeout(() => {
        setHudVisible(false)
      }, 4000)
    }
  }

  const handleUserActivity = () => {
    if (store.isZenMode) return
    setHudVisible(true)
    resetInactivityTimer()
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (store.isZenMode) {
      // Hover near top edge (< 45px) reveals HUD temporarily on desktop
      if (e.clientY < 45) {
        setHudVisible(true)
        if (autoHideTimerRef.current) clearTimeout(autoHideTimerRef.current)
        autoHideTimerRef.current = setTimeout(() => {
          if (store.isZenMode) setHudVisible(false)
        }, 3000)
      }
      return
    }
    setHudVisible(true)
    resetInactivityTimer()
  }

  useEffect(() => {
    if (isOpen && !store.isZenMode) {
      resetInactivityTimer()
    }
    return () => {
      if (autoHideTimerRef.current) clearTimeout(autoHideTimerRef.current)
    }
  }, [isOpen, showNoteEditor, shareOpen, store.isZenMode])

  // Synchronize when initialVerseId changes
  useEffect(() => {
    if (isOpen && initialVerseId) {
      const idx = verses.findIndex((v) => v.id === initialVerseId)
      if (idx >= 0) setCurrentIndex(idx)
    }
  }, [isOpen, initialVerseId, verses])

  // Stop audio and reset Zen mode / hardware fullscreen on close
  useEffect(() => {
    if (!isOpen) {
      if (useStore.getState().isZenMode) {
        useStore.getState().setZenMode(false)
      }
      try {
        const doc = document as unknown as {
          fullscreenElement?: Element
          webkitFullscreenElement?: Element
          exitFullscreen?: () => Promise<void>
          webkitExitFullscreen?: () => Promise<void>
        }
        if (doc.fullscreenElement || doc.webkitFullscreenElement) {
          doc.exitFullscreen?.().catch(() => {})
        }
      } catch {}
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        setPlayingAudio(false)
      }
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
            const s = useStore.getState()
            const exists = s.bookmarks.includes(currentVerse.id)
            s.toggleBookmark(currentVerse.id)
            if (s.hapticsEnabled) triggerHaptic([8, 35, 12])
            toast.success(exists ? 'Bookmark removed' : 'Bookmarked verse')
          }
          break
        case 'h':
        case 'H':
          if (currentVerse) {
            e.preventDefault()
            const s = useStore.getState()
            const isH = s.highlights.includes(currentVerse.id)
            s.toggleHighlight(currentVerse.id)
            if (s.hapticsEnabled) triggerHaptic([8, 35, 12])
            toast.success(isH ? 'Highlight removed' : 'Highlighted verse')
          }
          break
        case 'Escape':
          e.preventDefault()
          if (useStore.getState().isZenMode || isFullscreen) {
            toggleZenMode()
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
            if (next && !useStore.getState().isZenMode) resetInactivityTimer()
            return next
          })
          break
        case 'z':
        case 'Z':
          // Toggle Zen Fullscreen Mode
          e.preventDefault()
          toggleZenMode()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex, currentVerse, verses.length, onClose, isFullscreen])

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

  if (!isOpen || !verses.length || !mounted || typeof document === 'undefined' || !document.body) return null

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

  return createPortal(
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        'fixed inset-0 h-[100dvh] w-screen z-[60] flex flex-col transition-colors duration-300 select-none overflow-hidden overscroll-none',
        paperToneClass
      )}
    >
      {/* Subtle Floating Zen Exit Pill on Mobile & Desktop when HUD is hidden in Zen Mode */}
      {store.isZenMode && !hudVisible && (
        <button
          type="button"
          onClick={toggleZenMode}
          className="fixed top-3 right-3 z-40 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 dark:bg-zinc-800/80 text-white backdrop-blur-md text-[11px] font-medium border border-white/20 shadow-lg active:scale-95 transition-all opacity-80 hover:opacity-100"
          title="Exit Zen Mode (Z)"
        >
          <Minimize2 className="w-3.5 h-3.5 text-amber-400" />
          <span>Exit Zen</span>
        </button>
      )}
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
            onClick={toggleZenMode}
            className="rounded-full h-8 w-8 hover:bg-black/5 dark:hover:bg-white/10"
            title={store.isZenMode ? 'Exit Zen Fullscreen (Z)' : 'Zen Fullscreen Mode (Z)'}
          >
            {store.isZenMode ? (
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

          {/* More Actions Menu on Mobile */}
          {currentVerse && (
            <MobileMoreMenu
              currentVerse={currentVerse}
              playingAudio={playingAudio}
              toggleAudio={toggleAudio}
              onOpenNote={() => setShowNoteEditor(true)}
              onOpenShare={() => setShareOpen(true)}
              onToggleZen={toggleZenMode}
              isZenMode={store.isZenMode}
              isRead={Boolean(store.readVerses[currentVerse.id])}
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
              noteDraftExists={Boolean(store.notes[currentVerse.id])}
              highlightColors={store.highlightColors || {}}
              highlights={store.highlights || []}
              onSelectHighlight={(colorKey) => {
                store.setHighlightColor(currentVerse.id, colorKey)
                const meta = PASTEL_HIGHLIGHTS[colorKey as keyof typeof PASTEL_HIGHLIGHTS]
                if (meta) toast.success(`Highlighted in ${meta.name}`)
                if (store.hapticsEnabled) triggerHaptic(10)
              }}
            />
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
              isZenMode={store.isZenMode}
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
                    isZenMode={store.isZenMode}
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
    </div>,
    document.body
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
  isZenMode?: boolean
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
  isZenMode = false,
}: BookVerseCardProps) {
  const highlightMeta =
    PASTEL_HIGHLIGHTS[highlightColor as keyof typeof PASTEL_HIGHLIGHTS] ||
    PASTEL_HIGHLIGHTS.saffron

  const sacredScript = verse.sanskrit || verse.awadhi
  const currentPaper = PAPER_TONES[paperTone] || PAPER_TONES.parchment

  return (
    <article
      className={cn(
        'relative transition-all duration-300 w-full max-w-full overflow-hidden',
        isZenMode
          ? 'border-0 shadow-none bg-transparent p-1 sm:p-4 text-current'
          : cn(
              'rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 border shadow-md',
              currentPaper.cardClass
            ),
        isHighlighted && highlightMeta.cardClass
      )}
    >
      {/* Zen Mode subtle top rubric (no buttons) */}
      {isZenMode && (
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4 opacity-40 select-none">
          <span className="font-serif text-[11px] tracking-widest uppercase">
            ❧ {verse.chapter}.{verse.verse ?? verse.number} ❧
          </span>
        </div>
      )}

      {/* Standard Header info (hidden in Zen mode for distraction-free reading) */}
      {!isZenMode && (
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
      )}

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

/* ── Mobile More Actions Menu Component ─────────────────────────── */
interface MobileMoreMenuProps {
  currentVerse: GenericBookVerse
  playingAudio: boolean
  toggleAudio: () => void
  onOpenNote: () => void
  onOpenShare: () => void
  onToggleZen: () => void
  isZenMode: boolean
  isRead: boolean
  onToggleRead: () => void
  noteDraftExists: boolean
  highlightColors: Record<string, PastelHighlightColor>
  highlights: string[]
  onSelectHighlight: (color: PastelHighlightColor) => void
}

function MobileMoreMenu({
  currentVerse,
  playingAudio,
  toggleAudio,
  onOpenNote,
  onOpenShare,
  onToggleZen,
  isZenMode,
  isRead,
  onToggleRead,
  noteDraftExists,
  highlightColors,
  highlights,
  onSelectHighlight,
}: MobileMoreMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(e: MouseEvent | TouchEvent) {
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
      document.addEventListener('touchstart', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div className="relative inline-flex items-center" ref={menuRef}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'rounded-full h-8 w-8 transition-colors select-none',
          isOpen
            ? 'bg-black/10 dark:bg-white/15 text-foreground'
            : 'hover:bg-black/5 dark:hover:bg-white/10 text-foreground/80'
        )}
        title="More actions"
        aria-label="More actions"
        aria-expanded={isOpen}
      >
        <MoreHorizontal className="w-4 h-4" />
      </Button>

      {/* Backdrop overlay for mobile to tap anywhere outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/25 backdrop-blur-xs"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Popover Card */}
      {isOpen && (
        <div
          className={cn(
            'fixed sm:absolute top-14 sm:top-full mt-2 right-3 w-[265px] p-2.5 rounded-2xl shadow-2xl border backdrop-blur-xl z-50',
            'bg-card text-card-foreground border-border/80 shadow-black/30 animate-in fade-in zoom-in-95 duration-150 select-none'
          )}
        >
          {/* Header */}
          <div className="text-[10px] uppercase font-semibold text-muted-foreground px-2 py-1 flex items-center justify-between border-b border-border/40 mb-1.5 pb-1.5">
            <span>Verse Actions</span>
            <span className="font-mono text-[11px] opacity-75">
              v{currentVerse.chapter}.{currentVerse.verse ?? currentVerse.number}
            </span>
          </div>

          {/* Action List */}
          <div className="flex flex-col gap-0.5">
            {/* Chanting Audio */}
            <button
              type="button"
              onClick={() => {
                toggleAudio()
                setIsOpen(false)
              }}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium hover:bg-muted/70 active:scale-[0.98] transition-all text-left w-full cursor-pointer"
            >
              {playingAudio ? (
                <VolumeX className="w-4 h-4 text-amber-500 shrink-0" />
              ) : (
                <Volume2 className="w-4 h-4 text-muted-foreground shrink-0" />
              )}
              <span className={playingAudio ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''}>
                {playingAudio ? 'Stop Recitation' : 'Listen to Chanting'}
              </span>
            </button>

            {/* Reflection Note */}
            <button
              type="button"
              onClick={() => {
                onOpenNote()
                setIsOpen(false)
              }}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium hover:bg-muted/70 active:scale-[0.98] transition-all text-left w-full cursor-pointer"
            >
              <NotebookPen className={cn('w-4 h-4 shrink-0', noteDraftExists ? 'text-amber-500' : 'text-muted-foreground')} />
              <span>{noteDraftExists ? 'Edit Reflection' : 'Add Personal Reflection'}</span>
            </button>

            {/* Share Sacred Verse */}
            <button
              type="button"
              onClick={() => {
                onOpenShare()
                setIsOpen(false)
              }}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium hover:bg-muted/70 active:scale-[0.98] transition-all text-left w-full cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-muted-foreground shrink-0" />
              <span>Share Sacred Verse</span>
            </button>

            {/* Mark as Read */}
            <button
              type="button"
              onClick={() => {
                onToggleRead()
                setIsOpen(false)
              }}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium hover:bg-muted/70 active:scale-[0.98] transition-all text-left w-full cursor-pointer"
            >
              <Check className={cn('w-4 h-4 shrink-0', isRead ? 'text-emerald-500 font-bold' : 'text-muted-foreground')} />
              <span>{isRead ? 'Mark as Unread' : 'Mark as Read (+10 XP)'}</span>
            </button>

            {/* Zen Mode */}
            <button
              type="button"
              onClick={() => {
                onToggleZen()
                setIsOpen(false)
              }}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium hover:bg-muted/70 active:scale-[0.98] transition-all text-left w-full cursor-pointer"
            >
              {isZenMode ? (
                <Minimize2 className="w-4 h-4 text-amber-500 shrink-0" />
              ) : (
                <Maximize2 className="w-4 h-4 text-muted-foreground shrink-0" />
              )}
              <span>{isZenMode ? 'Exit Zen Mode' : 'Zen Fullscreen Mode'}</span>
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-border/40 my-2" />

          {/* Sacred Highlighter Palette */}
          <div className="px-1 py-1">
            <span className="text-[10px] uppercase font-semibold text-muted-foreground block mb-2 px-1">
              Sacred Highlighter
            </span>
            <div className="flex items-center justify-between gap-1 px-1">
              {(['saffron', 'lotus', 'vermilion', 'ash', 'teal'] as const).map((colorKey) => {
                const meta = PASTEL_HIGHLIGHTS[colorKey]
                const isCurrent =
                  highlights.includes(currentVerse.id) &&
                  (highlightColors?.[currentVerse.id] || 'saffron') === colorKey
                return (
                  <button
                    key={colorKey}
                    type="button"
                    onClick={() => onSelectHighlight(colorKey)}
                    className={cn(
                      'w-7 h-7 rounded-full border shadow-xs transition-transform active:scale-95 flex items-center justify-center cursor-pointer',
                      meta.dotClass,
                      isCurrent && 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-110'
                    )}
                    title={meta.name}
                    aria-label={`Highlight with ${meta.name}`}
                  >
                    {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
