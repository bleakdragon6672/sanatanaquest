'use client'

import { useState, useEffect, useRef } from 'react'
import {
  ChevronLeft, ChevronRight, Bookmark, BookmarkCheck, Highlighter, NotebookPen,
  Share2, Play, Pause, Volume2, Settings2, Sparkles, Check,
} from 'lucide-react'
import {
  allUpanishads, getUpanishad, getUpanishadVerse,
  type Upanishad, type UpanishadVerse, type Section,
} from '@/lib/upanishad-data'
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
import { sanitizeHtml } from '@/lib/sanitize'
import { VerseSlider } from '@/components/verse-slider'

const READING_MODE_LABELS: Record<ReadingMode, string> = {
  sanskrit: 'Sanskrit Only',
  english: 'English Only',
  'sanskrit-english': 'Sanskrit + English',
  full: 'Sanskrit + Transliteration + English',
  focus: 'Focus Reading Mode',
  night: 'Night Reading Mode',
}

export function UpanishadView() {
  const { params, navigate } = useNav()
  const selectedUpanishadId = params.upanishad ?? null
  const selectedUpanishad = selectedUpanishadId ? getUpanishad(selectedUpanishadId) : null

  if (selectedUpanishad) {
    return (
      <UpanishadReader
        key={`${selectedUpanishad.id}-${params.verse ?? ''}`}
        upanishad={selectedUpanishad}
        initialVerseId={params.verse ?? null}
        onBack={() => navigate('upanishad')}
      />
    )
  }

  return <UpanishadList onOpen={(id) => navigate('upanishad', { upanishad: id })} />
}

function UpanishadList({ onOpen }: { onOpen: (id: string) => void }) {
  const store = useStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="p-6 relative overflow-hidden border-0">
          <div className="absolute -right-8 -top-8 opacity-10 pointer-events-none">
            <LotusIcon size={200} className="text-primary" />
          </div>
          <div className="animate-pulse">
            <div className="h-6 w-48 bg-muted rounded mb-2"></div>
            <div className="h-8 w-72 bg-muted rounded mb-4"></div>
            <div className="h-4 w-96 bg-muted rounded mb-3"></div>
            <div className="h-4 w-80 bg-muted rounded"></div>
          </div>
        </Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="p-5 animate-pulse">
              <div className="h-4 w-32 bg-muted rounded mb-2"></div>
              <div className="h-5 w-24 bg-muted rounded mb-3"></div>
              <div className="h-2 w-full bg-muted rounded"></div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8 relative overflow-hidden border-0 bg-gradient-to-br from-[color-mix(in_oklch,var(--saffron)_16%,transparent)] to-card">
        <div className="absolute -right-8 -top-8 opacity-10 pointer-events-none">
          <LotusIcon size={200} className="text-primary" />
        </div>
        <div className="relative">
          <Badge className="mb-3 bg-saffron-gradient text-white border-0 text-sm px-3 py-1">
            उपनिषद्
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
            The Principal Upanishads
          </h1>
          <p className="text-muted-foreground mb-6 max-w-2xl leading-relaxed">
            The foundational scriptures of Vedanta — dialogues between sages and seekers on the nature
            of the Self (Atman), the Absolute (Brahman), and the path to liberation (Moksha).
            Three essential Upanishads with complete text, commentary, and AI guidance.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Bookmark className="h-4 w-4 text-primary" /> {store.bookmarks.length} bookmarked
            </span>
            <span className="inline-flex items-center gap-2">
              <Highlighter className="h-4 w-4 text-primary" /> {store.highlights.length} highlighted
            </span>
            <span className="inline-flex items-center gap-2">
              <NotebookPen className="h-4 w-4 text-primary" /> {Object.keys(store.notes).length} notes
            </span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {allUpanishads.map((u) => {
          const read = u.verses.filter((v) => store.readVerses[v.id]).length
          const total = u.verseCount
          const pct = total ? Math.round((read / total) * 100) : 0
          const isAllRead = read === total
          return (
            <Card
              key={u.id}
              onClick={() => onOpen(u.id)}
              className={cn(
                "p-5 sm:p-6 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all group relative overflow-hidden",
                isAllRead && "border-l-4 border-l-green-500"
              )}
            >
              <div className="absolute -right-3 -top-3 opacity-[0.06] group-hover:opacity-[0.14] transition-opacity pointer-events-none">
                <span className="text-7xl font-bold" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                  ॐ
                </span>
              </div>
              <div className="relative">
                <div className="flex items-start justify-between mb-2">
                  <Badge className="bg-saffron-gradient text-white border-0 text-xs">
                    {u.transliteration}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{total} verses</span>
                </div>
                <h3 className="font-semibold text-base leading-tight" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                  {u.name}
                </h3>
                <p className="text-sm text-primary/80 mt-0.5" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                  {u.sanskritName}
                </p>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{u.theme}</p>
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

function UpanishadReader({
  upanishad,
  initialVerseId,
  onBack,
}: {
  upanishad: Upanishad
  initialVerseId: string | null
  onBack: () => void
}) {
  const store = useStore()
  const { navigate } = useNav()
  const [currentVerseId, setCurrentVerseId] = useState<string>(
    initialVerseId && upanishad.verses.some((v) => v.id === initialVerseId)
      ? initialVerseId
      : upanishad.verses[0]?.id ?? '',
  )
  const [loading, setLoading] = useState(false)
  const verse = upanishad.verses.find((v) => v.id === currentVerseId) ?? null

  // Wait for the VerseSlider animation to finish, then scroll to top
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setLoading(false)
    }, 350)
    return () => clearTimeout(timer)
  }, [currentVerseId])

  // Find which section this verse belongs to (for Katha's Adhyaya/Valli structure)
  const currentSection = upanishad.sections.find((s) =>
    s.verses.some((v) => v.id === currentVerseId),
  )

  if (!verse) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin h-8 w-8 border-2 border-saffron border-t-transparent rounded-full mb-4"></div>
        <p className="text-muted-foreground">Loading verse…</p>
      </div>
    )
  }

  const verseIdx = upanishad.verses.findIndex((v) => v.id === verse.id)

  return (
    <div className="space-y-5">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3 sm:gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full hover:bg-saffron-gradient-soft">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
              {upanishad.transliteration}
            </p>
            <h1 className="text-xl sm:text-2xl font-semibold leading-tight" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
              {upanishad.name}
            </h1>
            {currentSection && (
              <p className="text-[10px] sm:text-xs text-primary/70 mt-1" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                {currentSection.name} {currentSection.sanskritName && `· ${currentSection.sanskritName}`}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ReadingModeSwitcher />
        </div>
      </div>

      {/* Summary banner (only on first verse) */}
      {verse.id === upanishad.verses[0].id && (
        <Card className="p-4 sm:p-5 bg-saffron-gradient-soft border-primary/20">
          <p className="text-[10px] sm:text-xs uppercase tracking-widest text-primary/70 mb-2" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
            {upanishad.sanskritName} · {upanishad.transliteration}
          </p>
          <p className="text-sm sm:text-base text-foreground/85 leading-relaxed">{upanishad.summary}</p>
        </Card>
      )}

      {/* Verse display with loading state */}
      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-64 bg-muted rounded-lg"></div>
          <div className="flex justify-between items-center">
            <div className="h-4 w-32 bg-muted rounded"></div>
            <div className="h-4 w-24 bg-muted rounded"></div>
          </div>
        </div>
      ) : (
        <VerseSlider
          verseId={verse.id}
          hasPrevious={verseIdx > 0}
          hasNext={verseIdx < upanishad.verses.length - 1}
          onPrevious={() => {
            if (verseIdx > 0) setCurrentVerseId(upanishad.verses[verseIdx - 1].id)
          }}
          onNext={() => {
            if (verseIdx < upanishad.verseCount - 1) setCurrentVerseId(upanishad.verses[verseIdx + 1].id)
          }}
        >
          <Card className={cn('p-0 overflow-hidden', 'verse-card-animated')}>
            <div className="px-5 sm:px-7 pt-4 pb-2 flex items-center justify-between gap-3 border-b border-border/40">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono text-xs">{verse.id}</Badge>
                <Badge variant="secondary" className="text-[10px]">Section {currentSection?.name}</Badge>
              </div>
            </div>
            <div className="px-5 sm:px-7 py-6 space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1" style={{ fontFamily: 'var(--font-serif-display), serif' }}>Sanskrit</p>
                <p className="verse-sanskrit-animated text-xl sm:text-2xl leading-[2] text-foreground/95" style={{ fontFamily: 'var(--font-serif-display), "Noto Serif Devanagari", serif', whiteSpace: 'pre-line' }}>{verse.sanskrit}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Transliteration</p>
                <p className="text-sm italic text-muted-foreground leading-relaxed" style={{ whiteSpace: 'pre-line' }}>{verse.transliteration}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">English</p>
                <p className="text-sm text-foreground/90 leading-relaxed" style={{ whiteSpace: 'pre-line' }}>{verse.english}</p>
              </div>
            </div>
          </Card>
        </VerseSlider>
      )}

      <VerseSlider
        verseId={verse.id}
        hasPrevious={verseIdx > 0}
        hasNext={verseIdx < upanishad.verses.length - 1}
        onPrevious={() => {
          if (verseIdx > 0) setCurrentVerseId(upanishad.verses[verseIdx - 1].id)
        }}
        onNext={() => {
          if (verseIdx < upanishad.verses.length - 1) setCurrentVerseId(upanishad.verses[verseIdx + 1].id)
        }}
      >
        <VerseCard key={verse.id} verse={verse} upanishadId={upanishad.id} />
      </VerseSlider>

      {/* Verse navigation */}
      <div className="flex items-center justify-between gap-2">
        <Button
          variant="outline"
          disabled={verseIdx === 0}
          onClick={() => {
            if (verseIdx > 0) setCurrentVerseId(upanishad.verses[verseIdx - 1].id)
          }}
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> Previous Verse
        </Button>
        <span className="text-sm text-muted-foreground">
          {verseIdx + 1} / {upanishad.verses.length}
        </span>
        <Button
          variant="outline"
          disabled={verseIdx === upanishad.verses.length - 1}
          onClick={() => {
            if (verseIdx < upanishad.verses.length - 1) setCurrentVerseId(upanishad.verses[verseIdx + 1].id)
          }}
        >
          Next Verse <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      {/* Previous / Next Upanishad */}
      <div className="flex justify-between gap-2 pt-3 border-t border-border">
        {(() => {
          const idx = allUpanishads.findIndex((u) => u.id === upanishad.id)
          return (
            <>
              {idx > 0 ? (
                <Button variant="ghost" size="sm" onClick={() => navigate('upanishad', { upanishad: allUpanishads[idx - 1].id })}>
                  <ChevronLeft className="mr-1 h-4 w-4" /> {allUpanishads[idx - 1].name}
                </Button>
              ) : <span />}
              {idx < allUpanishads.length - 1 ? (
                <Button variant="ghost" size="sm" onClick={() => navigate('upanishad', { upanishad: allUpanishads[idx + 1].id })}>
                  {allUpanishads[idx + 1].name} <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              ) : <span />}
            </>
          )
        })()}
      </div>
    </div>
  )
}

function VerseCard({ verse, upanishadId }: { verse: UpanishadVerse; upanishadId: string }) {
  const store = useStore()
  const { navigate } = useNav()
  const existingNote = store.notes[verse.id] ?? ''
  const [showNoteEditor, setShowNoteEditor] = useState(false)
  const [noteDraft, setNoteDraft] = useState(existingNote)
  const [shareOpen, setShareOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const isRead = !!store.readVerses[verse.id]
  const isBookmarked = store.bookmarks.includes(verse.id)
  const isHighlighted = store.highlights.includes(verse.id)

  function handleMarkRead() {
    if (isRead) {
      store.unmarkVerseRead(verse.id)
      toast.success('Marked as unread')
    } else {
      store.markVerseRead(verse.id)
      store.addReadingTime(15)
      toast.success(`Verse marked as read · +10 Dharma XP`, {
        description: `${verse.id} — keep reading!`,
      })
    }
  }

  function handleSaveNote() {
    store.setNote(verse.id, noteDraft)
    setShowNoteEditor(false)
    toast.success('Note saved')
  }

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
          'p-0 overflow-hidden transition-all verse-card-animated',
          isHighlighted && 'ring-2 ring-primary/40',
          isNight && 'bg-[#1a1410] text-amber-50 border-amber-900/30',
          isFocus && 'mx-auto max-w-2xl',
        )}
      >
        {/* Verse header */}
        <div className="px-5 sm:px-7 pt-4 pb-2 flex items-center justify-between gap-3 border-b border-border/40">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono text-xs">
              {verse.id}
            </Badge>
            {isRead && (
              <Badge className="bg-saffron-gradient text-white border-0 text-[10px]">✓ Read</Badge>
            )}
            {isHighlighted && <Badge variant="secondary" className="text-[10px]">Highlighted</Badge>}
          </div>
          <div className="flex items-center gap-0.5">
            <ActionButton icon={Check} active={isRead} label={isRead ? 'Marked as read' : 'Mark as read (+10 XP)'} onClick={handleMarkRead} />
            <ActionButton icon={isBookmarked ? BookmarkCheck : Bookmark} active={isBookmarked} label="Bookmark" onClick={() => { store.toggleBookmark(verse.id); toast.success(isBookmarked ? 'Removed bookmark' : 'Verse bookmarked') }} />
            <ActionButton icon={Highlighter} active={isHighlighted} label="Highlight" onClick={() => { store.toggleHighlight(verse.id); toast.success(isHighlighted ? 'Highlight removed' : 'Verse highlighted') }} />
            <ActionButton icon={NotebookPen} active={!!existingNote} label="Note" onClick={() => { setNoteDraft(existingNote); setShowNoteEditor(!showNoteEditor) }} />
            <ActionButton icon={Share2} label="Share" onClick={() => setShareOpen(true)} />
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
                    className="verse-sanskrit-animated text-xl sm:text-2xl leading-[2] text-foreground/95"
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
          {verse.commentary && (
            <div className="rounded-xl bg-saffron-gradient-soft border border-primary/20 p-4">
              <p className="text-[10px] uppercase tracking-widest text-primary/70 mb-2 font-semibold">
                📜 Commentary
              </p>
              <p
                className="text-sm text-foreground/85 leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{
                  __html: verse.commentary.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'),
                }}
              />
            </div>
          )}
        </div>

        {/* Footer: audio + AI explain */}
        <div className="px-5 sm:px-7 pb-4 flex flex-wrap items-center justify-between gap-2 border-t border-border/40 pt-3">
          <div className="flex items-center gap-1">
            <AudioPlayer verse={verse} playing={playing} setPlaying={setPlaying} />
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => navigate('guide', { explain: verse.id, source: 'upanishad' })}
            >
              <Sparkles className="mr-1 h-3.5 w-3.5 text-primary" /> AI Explain this verse
            </Button>
          </div>
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
        title={verse.id}
        subtitle={verse.transliteration.split('\n')[0]}
        body={verse.english}
        footer="Sanatan Quest · Upanishads"
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

function AudioPlayer({
  verse,
  playing,
  setPlaying,
}: {
  verse: UpanishadVerse
  playing: boolean
  setPlaying: (p: boolean) => void
}) {
  const [speed, setSpeed] = useState(1)
  const [showSpeed, setShowSpeed] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  function play() {
    if (playing && audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setPlaying(false)
      return
    }
    const audio = new Audio(`/audio/upanishads/${verse.id}.mp3`)
    audio.playbackRate = speed
    audio.onended = () => setPlaying(false)
    audio.onerror = () => { setPlaying(false); toast.error('Audio not available for this verse') }
    audioRef.current = audio
    audio.play()
    setPlaying(true)
  }

  useEffect(() => {
    return () => { if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0 } }
  }, [verse.id])

  return (
    <div className="flex items-center gap-1">
      <Button size="sm" variant="ghost" className="h-8 gap-1.5" onClick={play}>
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
              onClick={() => { setSpeed(s); setShowSpeed(false); toast.success(`Speed: ${s}x`) }}
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
