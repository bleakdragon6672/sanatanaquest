'use client'

import { useState, useEffect, useRef } from 'react'
import {
  ChevronLeft, ChevronRight, Bookmark, BookmarkCheck, Highlighter, NotebookPen,
  Share2, Play, Pause, Volume2, Settings2, Sparkles, Check,
} from 'lucide-react'
import { gitaChapters, getChapter, type Verse } from '@/lib/gita-data'
import { useStore, type ReadingMode } from '@/lib/store'
import { useNav } from '@/components/nav-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { ShareCardModal } from '@/components/share-card-modal'
import { toast } from 'sonner'
import { OmSymbol, LotusIcon } from '@/components/spiritual-icons'
import { cn } from '@/lib/utils'

const READING_MODE_LABELS: Record<ReadingMode, string> = {
  sanskrit: 'Sanskrit Only',
  english: 'English Only',
  'sanskrit-english': 'Sanskrit + English',
  full: 'Sanskrit + Transliteration + English',
  focus: 'Focus Reading Mode',
  night: 'Night Reading Mode',
}

export function GitaView() {
  const { params, navigate } = useNav()
  // Derive chapter directly from params (no effect-synced state)
  const selectedChapter = params.chapter
    ? (() => {
        const num = parseInt(params.chapter, 10)
        return !isNaN(num) && num >= 1 && num <= 18 ? num : null
      })()
    : null

  if (selectedChapter) {
    return (
      <ChapterReader
        key={`ch-${selectedChapter}-${params.verse ?? ''}`}
        chapterNum={selectedChapter}
        initialVerseId={params.verse ?? null}
        onBack={() => {
          navigate('gita')
        }}
        onSelectVerse={() => {
          /* verse navigation handled internally via key reset */
        }}
      />
    )
  }

  return <ChapterList onOpen={(num) => navigate('gita', { chapter: String(num) })} />
}

function ChapterList({ onOpen }: { onOpen: (num: number) => void }) {
  const store = useStore()
  return (
    <div className="space-y-6">
      <Card className="p-6 relative overflow-hidden border-0 bg-gradient-to-br from-[color-mix(in_oklch,var(--saffron)_16%,transparent)] to-card">
        <div className="absolute -right-8 -top-8 opacity-10 pointer-events-none">
          <LotusIcon size={200} className="text-primary" />
        </div>
        <div className="relative">
          <Badge className="mb-2 bg-saffron-gradient text-white border-0">श्रीमद्भगवद्गीता</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
            The Bhagavad Gita
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            The eternal song of the Divine. 18 chapters, 700 verses — the complete dialogue between
            Lord Krishna and Arjuna on the battlefield of Kurukshetra. Read in multiple modes,
            bookmark your favorite verses, write notes, and ask the AI to explain any verse.
          </p>
          <div className="flex flex-wrap gap-3 mt-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Bookmark className="h-4 w-4 text-primary" /> {store.bookmarks.length} bookmarked</span>
            <span className="inline-flex items-center gap-1.5"><Highlighter className="h-4 w-4 text-primary" /> {store.highlights.length} highlighted</span>
            <span className="inline-flex items-center gap-1.5"><NotebookPen className="h-4 w-4 text-primary" /> {Object.keys(store.notes).length} notes</span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {gitaChapters.map((c) => {
          const read = c.verses.filter((v) => store.readVerses[v.id]).length
          const total = c.verses.length
          const pct = total ? Math.round((read / total) * 100) : 0
          return (
            <Card
              key={c.number}
              onClick={() => onOpen(c.number)}
              className="p-5 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all group relative overflow-hidden"
            >
              <div className="absolute -right-3 -top-3 opacity-[0.08] group-hover:opacity-[0.18] transition-opacity pointer-events-none">
                <span className="text-8xl font-bold" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                  {c.number}
                </span>
              </div>
              <div className="relative">
                <div className="flex items-start justify-between mb-2">
                  <span
                    className="text-2xl font-bold text-saffron-gradient"
                    style={{ fontFamily: 'var(--font-serif-display), serif' }}
                  >
                    {c.number}
                  </span>
                  <span className="text-xs text-muted-foreground">{c.verseCount} verses</span>
                </div>
                <h3 className="font-semibold text-base leading-tight" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                  {c.name}
                </h3>
                <p className="text-sm text-primary/80 mt-0.5" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                  {c.sanskritName}
                </p>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{c.theme}</p>
                <div className="mt-3">
                  <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                    <span>{read}/{total} read</span>
                    <span>{pct}%</span>
                  </div>
                  <Progress value={pct} className="h-1 bg-muted" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function ChapterReader({
  chapterNum,
  initialVerseId,
  onBack,
  onSelectVerse,
}: {
  chapterNum: number
  initialVerseId: string | null
  onBack: () => void
  onSelectVerse: (id: string) => void
}) {
  const chapter = getChapter(chapterNum)!
  const store = useStore()
  const { navigate } = useNav()
  // Local verse state, initialized from initialVerseId or first verse of chapter
  const [currentVerseId, setCurrentVerseId] = useState<string>(
    initialVerseId && chapter.verses.some((v) => v.id === initialVerseId)
      ? initialVerseId
      : chapter.verses[0]?.id ?? '',
  )
  const verse = chapter.verses.find((v) => v.id === currentVerseId) ?? null

  function selectVerse(id: string) {
    setCurrentVerseId(id)
    onSelectVerse(id)
  }

  if (!verse) {
    return (
      <div className="text-center py-20 text-muted-foreground">Loading verse…</div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Chapter {chapter.number}</p>
            <h1 className="text-lg sm:text-xl font-semibold leading-tight" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
              {chapter.name}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <ReadingModeSwitcher />
        </div>
      </div>

      {/* Chapter summary banner (only when on first verse) */}
      {verse.id === chapter.verses[0].id && (
        <Card className="p-4 sm:p-5 bg-saffron-gradient-soft border-primary/20">
          <p className="text-xs uppercase tracking-widest text-primary/70 mb-1.5" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
            {chapter.sanskritName} · {chapter.transliteration}
          </p>
          <p className="text-sm text-foreground/85 leading-relaxed">{chapter.summary}</p>
        </Card>
      )}

      {/* Verse display — key resets internal state when verse changes */}
      <VerseCard key={verse.id} verse={verse} />

      {/* Verse navigation */}
      <div className="flex items-center justify-between gap-2">
        <Button
          variant="outline"
          disabled={verse.id === chapter.verses[0].id}
          onClick={() => {
            const idx = chapter.verses.findIndex((v) => v.id === verse.id)
            if (idx > 0) selectVerse(chapter.verses[idx - 1].id)
          }}
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> Previous Verse
        </Button>
        <span className="text-sm text-muted-foreground">
          {chapter.verses.findIndex((v) => v.id === verse.id) + 1} / {chapter.verses.length}
        </span>
        <Button
          variant="outline"
          disabled={verse.id === chapter.verses[chapter.verses.length - 1].id}
          onClick={() => {
            const idx = chapter.verses.findIndex((v) => v.id === verse.id)
            if (idx < chapter.verses.length - 1) selectVerse(chapter.verses[idx + 1].id)
          }}
        >
          Next Verse <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      {/* Previous / Next chapter */}
      <div className="flex justify-between gap-2 pt-3 border-t border-border">
        {chapterNum > 1 ? (
          <Button variant="ghost" size="sm" onClick={() => navigate('gita', { chapter: String(chapterNum - 1) })}>
            <ChevronLeft className="mr-1 h-4 w-4" /> Chapter {chapterNum - 1}
          </Button>
        ) : <span />}
        {chapterNum < 18 ? (
          <Button variant="ghost" size="sm" onClick={() => navigate('gita', { chapter: String(chapterNum + 1) })}>
            Chapter {chapterNum + 1} <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        ) : <span />}
      </div>
    </div>
  )
}

function ReadingModeSwitcher() {
  const store = useStore()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings2 className="mr-1 h-4 w-4" />
          <span className="hidden sm:inline">{READING_MODE_LABELS[store.readingMode]}</span>
          <span className="sm:hidden">Mode</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Reading Mode</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {(Object.keys(READING_MODE_LABELS) as ReadingMode[]).map((m) => (
          <DropdownMenuItem
            key={m}
            onClick={() => store.setReadingMode(m)}
            className={cn(store.readingMode === m && 'bg-saffron-gradient-soft')}
          >
            {READING_MODE_LABELS[m]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function VerseCard({ verse }: { verse: Verse }) {
  const store = useStore()
  const { navigate } = useNav()
  const existingNote = store.notes[verse.id] ?? ''
  const [showNoteEditor, setShowNoteEditor] = useState(false)
  const [noteDraft, setNoteDraft] = useState(existingNote)
  const [shareOpen, setShareOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const readTimestamp = store.readVerses[verse.id]
  const isBookmarked = store.bookmarks.includes(verse.id)
  const isHighlighted = store.highlights.includes(verse.id)
  const isRead = !!readTimestamp

  function handleMarkRead() {
    if (isRead) {
      // Already read — unmark it (no XP refund)
      store.unmarkVerseRead(verse.id)
      toast.success('Marked as unread')
    } else {
      // Mark as read and award XP
      store.markVerseRead(verse.id)
      store.addReadingTime(15)
      toast.success(`Verse marked as read · +10 Dharma XP`, {
        description: `${verse.chapter}.${verse.verse} — keep reading!`,
      })
    }
  }

  function handleSaveNote() {
    store.setNote(verse.id, noteDraft)
    setShowNoteEditor(false)
    toast.success('Note saved')
  }

  // Display logic per mode
  const mode = store.readingMode
  const showSanskrit = mode === 'sanskrit' || mode === 'sanskrit-english' || mode === 'full' || mode === 'focus' || mode === 'night'
  const showTranslit = mode === 'full'
  const showEnglish = mode === 'english' || mode === 'sanskrit-english' || mode === 'full' || mode === 'focus' || mode === 'night'
  const isNight = mode === 'night'
  const isFocus = mode === 'focus'

  return (
    <>
      <Card
        className={cn(
          'p-0 overflow-hidden transition-all',
          isHighlighted && 'ring-2 ring-primary/40',
          isNight && 'bg-[#1a1410] text-amber-50 border-amber-900/30',
          isFocus && 'mx-auto max-w-2xl',
        )}
      >
        {/* Verse header */}
        <div className="px-5 sm:px-7 pt-4 pb-2 flex items-center justify-between gap-3 border-b border-border/40">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono">
              {verse.chapter}.{verse.verse}
            </Badge>
            {isRead && (
              <Badge className="bg-saffron-gradient text-white border-0 text-[10px]">✓ Read</Badge>
            )}
            {isHighlighted && <Badge variant="secondary" className="text-[10px]">Highlighted</Badge>}
          </div>
          <div className="flex items-center gap-0.5">
            <ActionButton
              icon={Check}
              active={isRead}
              label={isRead ? 'Marked as read' : 'Mark as read (+10 XP)'}
              onClick={handleMarkRead}
            />
            <ActionButton
              icon={isBookmarked ? BookmarkCheck : Bookmark}
              active={isBookmarked}
              label="Bookmark"
              onClick={() => {
                store.toggleBookmark(verse.id)
                toast.success(isBookmarked ? 'Removed bookmark' : 'Verse bookmarked')
              }}
            />
            <ActionButton
              icon={Highlighter}
              active={isHighlighted}
              label="Highlight"
              onClick={() => {
                store.toggleHighlight(verse.id)
                toast.success(isHighlighted ? 'Highlight removed' : 'Verse highlighted')
              }}
            />
            <ActionButton
              icon={NotebookPen}
              active={!!existingNote}
              label="Note"
              onClick={() => {
                setNoteDraft(existingNote)
                setShowNoteEditor(!showNoteEditor)
              }}
            />
            <ActionButton
              icon={Share2}
              label="Share"
              onClick={() => setShareOpen(true)}
            />
          </div>
        </div>

        {/* Verse body */}
        <div className="px-5 sm:px-7 py-6 space-y-4">
          {showSanskrit && (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                संस्कृतम् · Sanskrit
              </p>
              <p
                className="sanskrit-text text-xl sm:text-2xl leading-[2] text-foreground/95"
                style={{ fontFamily: 'var(--font-serif-display), "Noto Serif Devanagari", serif', whiteSpace: 'pre-line' }}
              >
                {verse.sanskrit}
              </p>
            </div>
          )}
          {showTranslit && (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Transliteration</p>
              <p className="text-sm italic text-muted-foreground leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                {verse.transliteration}
              </p>
            </div>
          )}
          {showEnglish && (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">English Translation</p>
              <p className="text-base sm:text-lg leading-relaxed text-foreground/90" style={{ whiteSpace: 'pre-line' }}>
                {verse.english}
              </p>
            </div>
          )}
          {verse.meaning && (
            <div className="border-l-2 border-primary/40 pl-3 italic text-sm text-muted-foreground/90 leading-relaxed">
              {verse.meaning}
            </div>
          )}
        </div>

        {/* Verse footer with audio + AI explain */}
        <div className="px-5 sm:px-7 pb-4 flex flex-wrap items-center justify-between gap-2 border-t border-border/40 pt-3">
          <div className="flex items-center gap-1">
            <AudioPlayer verse={verse} playing={playing} setPlaying={setPlaying} />
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => navigate('guide', { explain: verse.id })}
          >
            <Sparkles className="mr-1 h-3.5 w-3.5 text-primary" /> AI Explain this verse
          </Button>
        </div>

        {/* Note editor */}
        {showNoteEditor && (
          <div className="px-5 sm:px-7 pb-5 pt-3 border-t border-border/40 bg-muted/30">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Personal Note</p>
            <Textarea
              value={noteDraft}
              onChange={(e) => setNoteDraft(e.target.value)}
              placeholder="Write your reflection on this verse…"
              className="min-h-[100px] bg-background"
            />
            <div className="flex justify-end gap-2 mt-2">
              <Button size="sm" variant="ghost" onClick={() => setShowNoteEditor(false)}>Cancel</Button>
              <Button size="sm" className="bg-saffron-gradient text-white" onClick={handleSaveNote}>Save Note</Button>
            </div>
          </div>
        )}
      </Card>

      <ShareCardModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        title={`Chapter ${verse.chapter}, Verse ${verse.verse}`}
        subtitle={verse.transliteration.split('\n')[0]}
        body={verse.english}
        footer="Sanatan Quest"
      />
    </>
  )
}

function ActionButton({
  icon: Icon,
  active,
  label,
  onClick,
}: {
  icon: typeof Bookmark
  active?: boolean
  label: string
  onClick: () => void
}) {
  return (
    <Button
      size="icon"
      variant="ghost"
      className={cn('h-8 w-8 rounded-full', active && 'bg-saffron-gradient-soft text-primary')}
      onClick={onClick}
      title={label}
    >
      <Icon className={cn('h-4 w-4', active && 'fill-current')} />
      <span className="sr-only">{label}</span>
    </Button>
  )
}

// Audio player — uses Web Speech API as a synthetic recitation fallback
function AudioPlayer({
  verse,
  playing,
  setPlaying,
}: {
  verse: Verse
  playing: boolean
  setPlaying: (p: boolean) => void
}) {
  const [speed, setSpeed] = useState(1)
  const [showSpeed, setShowSpeed] = useState(false)
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null)

  function speak() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      toast.error('Audio not supported in this browser')
      return
    }
    if (playing) {
      window.speechSynthesis.cancel()
      setPlaying(false)
      return
    }
    // Recite only the English translation — Sanskrit recitation via TTS sounds
    // harsh and unnatural, so we keep the audio clean and accessible.
    const text = verse.english
    const u = new SpeechSynthesisUtterance(text)
    u.rate = speed
    u.pitch = 0.95
    // Try to find an Indic-sounding voice
    const voices = window.speechSynthesis.getVoices()
    const indic = voices.find((v) => /hi|india|sansksrit/i.test(v.lang) || /india|sansksrit|google.*hi/i.test(v.name))
    if (indic) u.voice = indic
    u.onend = () => setPlaying(false)
    u.onerror = () => setPlaying(false)
    utterRef.current = u
    window.speechSynthesis.speak(u)
    setPlaying(true)
  }

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [verse.id])

  return (
    <div className="flex items-center gap-1">
      <Button size="sm" variant="ghost" className="h-8 gap-1.5" onClick={speak}>
        {playing ? <Pause className="h-4 w-4 text-primary" /> : <Play className="h-4 w-4 text-primary" />}
        <span className="text-xs">{playing ? 'Pause' : 'Recite'}</span>
      </Button>
      <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8"
        onClick={() => setShowSpeed(!showSpeed)}
        title="Playback speed"
      >
        <Volume2 className="h-4 w-4" />
      </Button>
      {showSpeed && (
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-muted">
          {[0.75, 1, 1.25, 1.5].map((s) => (
            <button
              key={s}
              onClick={() => {
                setSpeed(s)
                setShowSpeed(false)
                toast.success(`Speed: ${s}x`)
              }}
              className={cn(
                'text-[10px] px-1.5 py-0.5 rounded',
                s === speed ? 'bg-primary text-primary-foreground' : 'hover:bg-background',
              )}
            >
              {s}x
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
