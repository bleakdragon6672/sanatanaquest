'use client'

import { useState, useEffect, useRef } from 'react'
import {
  ChevronLeft, ChevronRight, Bookmark, BookmarkCheck, Highlighter, NotebookPen,
  Share2, Play, Pause, Volume2, Sparkles, Check,
} from 'lucide-react'
import {
  ashtavakraChapters, getAshtavakraChapter,
  type AshtavakraChapter, type AshtavakraVerse,
} from '@/lib/ashtavakra-gita-data'
import { useStore, type ReadingMode } from '@/lib/store'
import { useNav } from '@/components/nav-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { ShareCardModal } from '@/components/share-card-modal'
import { toast } from 'sonner'
import { OmSymbol, LotusIcon } from '@/components/spiritual-icons'
import { cn } from '@/lib/utils'
import { VerseSlider } from '@/components/verse-slider'
import { ActionButton, ActionButtonRow } from '@/components/verse-card-actions'
import { ReadingModeSwitcher } from '@/components/reading-mode-switcher'

export function AshtavakraGitaView() {
  const { params, navigate } = useNav()
  const selectedChapter = params.chapter ? getAshtavakraChapter(params.chapter) : null

  if (selectedChapter) {
    return (
      <ChapterReader
        key={`${selectedChapter.id}-${params.verse ?? ''}`}
        chapter={selectedChapter}
        initialVerseId={params.verse ?? null}
        onBack={() => navigate('ashtavakragita')}
      />
    )
  }

  return <ChapterList onOpen={(id) => navigate('ashtavakragita', { chapter: id })} />
}

function ChapterList({ onOpen }: { onOpen: (id: string) => void }) {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
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

  const totalVerses = ashtavakraChapters.reduce((acc, c) => acc + c.verses.length, 0)

  return (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8 relative overflow-hidden border-0 bg-gradient-to-br from-[color-mix(in_oklch,var(--saffron)_16%,transparent)] to-card">
        <div className="absolute -right-8 -top-8 opacity-10 pointer-events-none">
          <LotusIcon size={200} className="text-primary" />
        </div>
        <div className="relative">
          <Badge className="mb-3 bg-saffron-gradient text-white border-0 text-sm px-3 py-1">
            अष्टावक्रगीता
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
            Ashtavakra Gita
          </h1>
          <p className="text-sm text-primary/80 mb-2" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
            अष्टावक्रगीता · Aṣṭāvakragītā
          </p>
          <p className="text-muted-foreground mb-6 max-w-2xl leading-relaxed">
            A radical non-dual (Advaita Vedanta) scripture in the form of a dialogue between the sage Ashtavakra
            and King Janaka. It takes the most direct approach to Self-realization — declaring that you are already
            the infinite, unbounded Self. {totalVerses} verses across {ashtavakraChapters.length} chapters.
            Attributed to Sage Ashtavakra, ~500-200 BCE. Highly regarded by Ramana Maharshi and Swami Vivekananda.
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {ashtavakraChapters.map((ch) => {
          const read = ch.verses.filter((v) => store.readVerses[v.id]).length
          const total = ch.verses.length
          const pct = total ? Math.round((read / total) * 100) : 0
          const isAllRead = read === total
          return (
            <Card
              key={ch.id}
              onClick={() => onOpen(ch.id)}
              className={cn(
                "p-5 sm:p-6 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all group relative overflow-hidden",
                isAllRead && "border-l-4 border-l-green-500"
              )}
            >
              <div className="absolute -right-3 -top-3 opacity-[0.06] group-hover:opacity-[0.14] transition-opacity pointer-events-none">
                <span className="text-7xl font-bold text-amber-900/10" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                  {ch.number}
                </span>
              </div>
              <div className="relative">
                <div className="flex items-start justify-between mb-2">
                  <Badge className="bg-saffron-gradient text-white border-0 text-xs">
                    {ch.sanskritName}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{total} verses</span>
                </div>
                <h3 className="font-semibold text-base leading-tight" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                  Chapter {ch.number}: {ch.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{ch.theme}</p>
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
  chapter,
  initialVerseId,
  onBack,
}: {
  chapter: AshtavakraChapter
  initialVerseId: string | null
  onBack: () => void
}) {
  const store = useStore()
  const { navigate } = useNav()
  const [currentVerseId, setCurrentVerseId] = useState<string>(
    initialVerseId && chapter.verses.some((v) => v.id === initialVerseId)
      ? initialVerseId
      : chapter.verses[0]?.id ?? '',
  )
  const [loading, setLoading] = useState(false)
  const verse = chapter.verses.find((v) => v.id === currentVerseId) ?? null

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setLoading(false)
    }, 350)
    return () => clearTimeout(timer)
  }, [currentVerseId])

  if (!verse) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin h-8 w-8 border-2 border-saffron border-t-transparent rounded-full mb-4"></div>
        <p className="text-muted-foreground">Loading verse…</p>
      </div>
    )
  }

  const verseIdx = chapter.verses.findIndex((v) => v.id === verse.id)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3 sm:gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full hover:bg-saffron-gradient-soft">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
              Chapter {chapter.number}
            </p>
            <h1 className="text-xl sm:text-2xl font-semibold leading-tight" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
              {chapter.name}
            </h1>
            <p className="text-[10px] sm:text-xs text-primary/70 mt-0.5" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
              {chapter.sanskritName} · {chapter.verses.length} verses
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ReadingModeSwitcher />
        </div>
      </div>

      {/* Summary banner */}
      {verse.id === chapter.verses[0].id && (
        <Card className="p-4 sm:p-5 bg-saffron-gradient-soft border-primary/20">
          <p className="text-[10px] sm:text-xs uppercase tracking-widest text-primary/70 mb-2" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
            {chapter.sanskritName} · Chapter {chapter.number}
          </p>
          <p className="text-sm sm:text-base text-foreground/85 leading-relaxed">{chapter.summary}</p>
        </Card>
      )}

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
          hasNext={verseIdx < chapter.verses.length - 1}
          onPrevious={() => {
            if (verseIdx > 0) setCurrentVerseId(chapter.verses[verseIdx - 1].id)
          }}
          onNext={() => {
            if (verseIdx < chapter.verses.length - 1) setCurrentVerseId(chapter.verses[verseIdx + 1].id)
          }}
        >
          <VerseCard key={verse.id} verse={verse} chapterNumber={chapter.number} />
        </VerseSlider>
      )}

      <div className="flex items-center justify-between gap-2 sm:gap-3 p-3 sm:p-4">
        <Button
          variant="outline"
          size="sm"
          disabled={verseIdx === 0}
          onClick={() => {
            if (verseIdx > 0) setCurrentVerseId(chapter.verses[verseIdx - 1].id)
          }}
          className="w-full sm:w-auto"
        >
          <ChevronLeft className="mr-1.5 h-4 w-4" /> Previous Verse
        </Button>
        <span className="text-sm sm:text-base text-muted-foreground font-medium min-w-[80px] text-center">
          Verse {verse.number} · {verseIdx + 1}/{chapter.verses.length}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={verseIdx === chapter.verses.length - 1}
          onClick={() => {
            if (verseIdx < chapter.verses.length - 1) setCurrentVerseId(chapter.verses[verseIdx + 1].id)
          }}
          className="w-full sm:w-auto"
        >
          Next Verse <ChevronRight className="ml-1.5 h-4 w-4" />
        </Button>
      </div>

      {/* Previous / Next Chapter */}
      <div className="flex justify-between gap-2 pt-4 sm:pt-6 border-t border-border/50">
        {chapter.number > 1 ? (
          <Button variant="ghost" size="sm" onClick={() => navigate('ashtavakragita', { chapter: ashtavakraChapters[chapter.number - 2].id })} className="w-full sm:w-auto">
            <ChevronLeft className="mr-1.5 h-4 w-4" /> Ch.{chapter.number - 1}: {ashtavakraChapters[chapter.number - 2].name}
          </Button>
        ) : <div className="w-full sm:w-auto"></div>}
        {chapter.number < ashtavakraChapters.length ? (
          <Button variant="ghost" size="sm" onClick={() => navigate('ashtavakragita', { chapter: ashtavakraChapters[chapter.number].id })} className="w-full sm:w-auto">
            Ch.{chapter.number + 1}: {ashtavakraChapters[chapter.number].name} <ChevronRight className="ml-1.5 h-4 w-4" />
          </Button>
        ) : <div className="w-full sm:w-auto"></div>}
      </div>
    </div>
  )
}

function VerseCard({ verse, chapterNumber }: { verse: AshtavakraVerse; chapterNumber: number }) {
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

  const speakerLabel = verse.speaker === 'Janaka' ? 'King Janaka' : verse.speaker === 'Ashtavakra' ? 'Sage Ashtavakra' : null

  function handleMarkRead() {
    if (isRead) {
      store.unmarkVerseRead(verse.id)
      toast.success('Marked as unread')
    } else {
      store.markVerseRead(verse.id)
      store.addReadingTime(15)
      toast.success(`Verse marked as read · +10 Dharma XP`, {
        description: `${verse.id} — keep exploring!`,
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
        <div className="px-5 sm:px-7 pt-4 pb-2 flex items-center justify-between gap-3 border-b border-border/40">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono text-xs">
              {verse.id}
            </Badge>
            <Badge variant="secondary" className="text-[10px]">
              Chapter {verse.chapter} · Verse {verse.number}
            </Badge>
            {speakerLabel && (
              <Badge variant="outline" className="text-[10px] text-primary/70">
                {speakerLabel}
              </Badge>
            )}
            {isRead && (
              <Badge className="bg-saffron-gradient text-white border-0 text-[10px]">✓ Read</Badge>
            )}
            {isHighlighted && <Badge variant="secondary" className="text-[10px]">Highlighted</Badge>}
          </div>
          <ActionButtonRow>
            <ActionButton icon={Check} active={isRead} label={isRead ? 'Marked as read' : 'Mark as read (+10 XP)'} onClick={handleMarkRead} shortcut="R" />
            <ActionButton icon={isBookmarked ? BookmarkCheck : Bookmark} active={isBookmarked} label="Bookmark" onClick={() => { store.toggleBookmark(verse.id); toast.success(isBookmarked ? 'Removed bookmark' : 'Verse bookmarked') }} shortcut="B" />
            <ActionButton icon={Highlighter} active={isHighlighted} label="Highlight" onClick={() => { store.toggleHighlight(verse.id); toast.success(isHighlighted ? 'Highlight removed' : 'Verse highlighted') }} shortcut="H" />
            <ActionButton icon={NotebookPen} active={!!existingNote} label="Note" onClick={() => { setNoteDraft(existingNote); setShowNoteEditor(!showNoteEditor) }} shortcut="N" />
            <ActionButton icon={Share2} label="Share" onClick={() => setShareOpen(true)} shortcut="S" />
          </ActionButtonRow>
        </div>

        <div className="px-5 sm:px-7 py-6 space-y-4">
          {showSanskrit && verse.sanskrit && (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                संस्कृतम् · Sanskrit
              </p>
              <p
                className="verse-sanskrit-animated text-xl sm:text-2xl leading-[2] text-foreground/95"
                style={{ fontFamily: 'var(--font-serif-display), "Noto Serif Devanagari", serif' }}
              >
                {verse.sanskrit}
              </p>
            </div>
          )}
          {showTranslit && verse.transliteration && (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">IAST Transliteration</p>
              <p className="text-sm italic text-muted-foreground leading-relaxed verse-translit-text" style={{ whiteSpace: 'pre-line' }}>
                {verse.transliteration}
              </p>
            </div>
          )}
          {showEnglish && (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">English Translation</p>
              <p className="text-base sm:text-lg leading-relaxed text-foreground/90 verse-english-text">
                  {verse.english}
              </p>
            </div>
          )}
          {!showSanskrit && !showTranslit && !showEnglish && (
            <p className="text-muted-foreground italic text-sm">No display mode selected. Use the mode menu to switch reading modes.</p>
          )}
        </div>

        <div className="px-5 sm:px-7 pb-4 flex flex-wrap items-center justify-between gap-2 border-t border-border/40 pt-3">
          <div className="flex items-center gap-1">
            <AudioPlayer verse={verse} playing={playing} setPlaying={setPlaying} />
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => navigate('guide', { explain: verse.id, source: 'ashtavakragita' })}
            >
              <Sparkles className="mr-1 h-3.5 w-3.5 text-primary" /> AI Explain this Verse
            </Button>
          </div>
        </div>

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
        title={`Ashtavakra Gita ${verse.id}`}
        subtitle={verse.transliteration}
        body={verse.english}
        footer="Sanatan Quest · Ashtavakra Gita"
      />
    </>
  )
}



function AudioPlayer({
  verse,
  playing,
  setPlaying,
}: {
  verse: AshtavakraVerse
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
    const audio = new Audio(`/audio/ashtavakra/${verse.id}.mp3`)
    audio.playbackRate = speed
    audio.onended = () => setPlaying(false)
    audio.onerror = () => {
      if ('speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(verse.english)
        u.rate = speed; u.pitch = 0.9
        u.onend = () => setPlaying(false)
        window.speechSynthesis.speak(u)
        setPlaying(true)
      } else {
        setPlaying(false)
        toast.error('Audio not available for this verse')
      }
    }
    audioRef.current = audio
    audio.play().catch(() => {
      if ('speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(verse.english)
        u.rate = speed; u.pitch = 0.9
        u.onend = () => setPlaying(false)
        window.speechSynthesis.speak(u)
        setPlaying(true)
      }
    })
    setPlaying(true)
  }

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [verse.id])

  return (
    <div className="flex items-center gap-1">
      <Button size="sm" variant="ghost" className={cn('h-8 gap-1.5 audio-btn-premium', playing && 'playing')} onClick={play}>
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
