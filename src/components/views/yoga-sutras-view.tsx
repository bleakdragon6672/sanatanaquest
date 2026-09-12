'use client'

import { useState, useEffect, useRef } from 'react'
import {
  ChevronLeft, ChevronRight, Bookmark, BookmarkCheck, Highlighter, NotebookPen,
  Share2, Play, Pause, Volume2, Sparkles, Check, BookOpen,
} from 'lucide-react'
import {
  yogaPadas, getYogaPada,
  type YogaPada, type YogaSutraVerse,
} from '@/lib/yoga-sutras-data'
import { useStore, PASTEL_HIGHLIGHTS, PAPER_TONES, type ReadingMode } from '@/lib/store'
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
import { HighlighterPalette } from '@/components/highlighter-palette'
import { ReadingModeSwitcher } from '@/components/reading-mode-switcher'
import { KindleBookReader } from '@/components/kindle-book-reader'
import { KindleAppearanceMenu } from '@/components/kindle-appearance-menu'

export function YogaSutrasView() {
  const { params, navigate } = useNav()
  const selectedPada = params.pada ? getYogaPada(params.pada) : null

  if (selectedPada) {
    return (
      <PadaReader
        key={`${selectedPada.id}-${params.verse ?? ''}`}
        pada={selectedPada}
        initialVerseId={params.verse ?? null}
        initialBookMode={params.bookMode === '1'}
        onBack={() => navigate('yogasutras')}
      />
    )
  }

  return (
    <PadaList
      onOpen={(id, bookMode) =>
        navigate('yogasutras', { pada: id, ...(bookMode ? { bookMode: '1' } : {}) })
      }
    />
  )
}

function PadaList({ onOpen }: { onOpen: (id: string, bookMode?: boolean) => void }) {
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
          {[...Array(4)].map((_, i) => (
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
      <Card className="card-serene p-6 sm:p-9 rounded-3xl relative overflow-hidden border border-border/60 bg-gradient-to-br from-card via-card/95 to-primary/[0.04]">
        <div className="absolute -right-8 -top-8 opacity-[0.06] pointer-events-none animate-breathe">
          <LotusIcon size={240} className="text-primary" />
        </div>
        <div className="relative z-10">
          <Badge className="mb-3 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs px-3 py-1 font-serif">
            पातञ्जलयोगसूत्राणि
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-foreground" style={{ fontFamily: 'var(--font-cinzel), var(--font-serif-display), serif' }}>
            Yoga Sutras of Patanjali
          </h1>
          <p className="text-sm text-primary/80 mb-2" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
            पातञ्जलयोगसूत्राणि · Pātañjalayogasūtrāṇi
          </p>
          <p className="text-muted-foreground mb-6 max-w-2xl leading-relaxed text-sm sm:text-base">
            The foundational text of Classical Yoga philosophy. 196 aphorisms divided into four chapters (padas) covering
            the nature of consciousness, the path of practice, the attainment of powers, and the final state of liberation (kaivalya).
            Attributed to Maharishi Patanjali, ~400-200 BCE.
          </p>
          <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-muted-foreground">
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

          <div className="flex flex-wrap items-center gap-3 mt-6 pt-5 border-t border-border/40">
            <Button
              size="default"
              onClick={() => {
                const firstUnread = yogaPadas.find((p) => p.verses.some((v) => !store.readVerses[v.id])) || yogaPadas[0]
                onOpen(firstUnread.id, true)
              }}
              className="rounded-full gap-2 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-500 text-white font-medium shadow-xs hover:shadow-md transition-all px-5 py-2.5 text-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span>📖 Read in Kindle Book Mode</span>
              <Badge variant="secondary" className="bg-white/20 text-white border-0 text-[10px] ml-1">LUXURY</Badge>
            </Button>
            <Button
              variant="outline"
              size="default"
              onClick={() => {
                const firstUnread = yogaPadas.find((p) => p.verses.some((v) => !store.readVerses[v.id])) || yogaPadas[0]
                onOpen(firstUnread.id, false)
              }}
              className="rounded-full gap-2 border-border/60 hover:bg-muted/60"
            >
              <span>Continue Pada {yogaPadas.find((p) => p.verses.some((v) => !store.readVerses[v.id]))?.number || 1}</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
            <KindleAppearanceMenu align="right" />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {yogaPadas.map((p) => {
          const read = p.verses.filter((v) => store.readVerses[v.id]).length
          const total = p.verses.length
          const pct = total ? Math.round((read / total) * 100) : 0
          const isAllRead = read === total
          return (
            <Card
              key={p.id}
              onClick={() => onOpen(p.id)}
              className={cn(
                "card-serene p-5 sm:p-6 cursor-pointer hover:border-primary/40 hover:-translate-y-0.5 transition-all group relative overflow-hidden rounded-2xl border border-border/60",
                isAllRead && "border-l-4 border-l-emerald-500/70"
              )}
            >
              <div className="absolute -right-3 -top-3 opacity-[0.04] group-hover:opacity-[0.10] transition-opacity pointer-events-none">
                <span className="text-7xl font-bold" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                  {p.number}
                </span>
              </div>
              <div className="relative">
                <div className="flex items-start justify-between mb-2">
                  <Badge className="bg-primary/10 text-primary border border-primary/20 text-xs font-serif rounded-full">
                    {p.transliteration}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{total} sutras</span>
                </div>
                <h3 className="font-semibold text-base leading-tight text-foreground" style={{ fontFamily: 'var(--font-cinzel), var(--font-serif-display), serif' }}>
                  {p.name}
                </h3>
                <p className="text-sm text-primary/80 mt-0.5" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                  {p.sanskritName}
                </p>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">{p.theme}</p>
                <div className="mt-3">
                  <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                    <span>{read}/{total} read</span>
                    <span>{pct}%</span>
                  </div>
                  <Progress value={pct} className="h-1.5 bg-muted rounded-full" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function PadaReader({
  pada,
  initialVerseId,
  initialBookMode = false,
  onBack,
}: {
  pada: YogaPada
  initialVerseId: string | null
  initialBookMode?: boolean
  onBack: () => void
}) {
  const store = useStore()
  const { navigate } = useNav()
  const [currentVerseId, setCurrentVerseId] = useState<string>(
    initialVerseId && pada.verses.some((v) => v.id === initialVerseId)
      ? initialVerseId
      : pada.verses[0]?.id ?? '',
  )
  const [bookReaderOpen, setBookReaderOpen] = useState(
    initialBookMode || store.isBookReaderOpen || store.readingMode === 'kindle'
  )
  const [loading, setLoading] = useState(false)
  const verse = pada.verses.find((v) => v.id === currentVerseId) ?? null

  // Wait for the VerseSlider animation to finish, then scroll to top
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
        <p className="text-muted-foreground">Loading sutra…</p>
      </div>
    )
  }

  const verseIdx = pada.verses.findIndex((v) => v.id === verse.id)

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
              {pada.transliteration}
            </p>
            <h1 className="text-xl sm:text-2xl font-semibold leading-tight" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
              {pada.name}
            </h1>
            <p className="text-[10px] sm:text-xs text-primary/70 mt-0.5" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
              {pada.sanskritName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button
            size="sm"
            onClick={() => {
              setBookReaderOpen(true)
              store.setBookReaderOpen(true)
            }}
            className="rounded-full gap-1.5 bg-gradient-to-r from-amber-600 via-saffron to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all px-2.5 sm:px-3.5 py-1.5 text-xs sm:text-sm border border-amber-300/30 ring-2 ring-amber-500/20 animate-pulse-subtle"
            title="Read in Kindle / Apple Books Mode"
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="hidden xs:inline font-medium">📖 Kindle Mode</span>
            <span className="xs:hidden font-medium">📖 Book</span>
            <span className="hidden sm:inline text-[9px] uppercase tracking-wider bg-white/25 px-1.5 py-0.5 rounded-full font-bold">New</span>
          </Button>
          <KindleAppearanceMenu align="right" />
          <ReadingModeSwitcher
            onOpenBookMode={() => {
              setBookReaderOpen(true)
              store.setBookReaderOpen(true)
            }}
          />
        </div>
      </div>

      {/* Summary banner (only on first verse) */}
      {verse.id === pada.verses[0].id && (
        <Card className="p-4 sm:p-5 bg-saffron-gradient-soft border-primary/20">
          <p className="text-[10px] sm:text-xs uppercase tracking-widest text-primary/70 mb-2" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
            {pada.sanskritName} · {pada.transliteration}
          </p>
          <p className="text-sm sm:text-base text-foreground/85 leading-relaxed">{pada.summary}</p>
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
          hasNext={verseIdx < pada.verses.length - 1}
          onPrevious={() => {
            if (verseIdx > 0) setCurrentVerseId(pada.verses[verseIdx - 1].id)
          }}
          onNext={() => {
            if (verseIdx < pada.verses.length - 1) setCurrentVerseId(pada.verses[verseIdx + 1].id)
          }}
        >
          <VerseCard key={verse.id} verse={verse} padaId={pada.id} />
        </VerseSlider>
      )}

      {/* Verse navigation */}
      <div className="flex items-center justify-between gap-2 sm:gap-3 p-2 sm:p-4">
        <Button
          variant="outline"
          size="sm"
          disabled={verseIdx === 0}
          onClick={() => {
            if (verseIdx > 0) setCurrentVerseId(pada.verses[verseIdx - 1].id)
          }}
          className="flex-1 sm:flex-initial text-xs sm:text-sm px-2.5 sm:px-3"
        >
          <ChevronLeft className="mr-1 h-4 w-4 shrink-0" />
          <span className="inline sm:hidden">Prev</span>
          <span className="hidden sm:inline">Previous Sutra</span>
        </Button>
        <span className="text-xs sm:text-sm text-muted-foreground font-medium shrink-0 px-1 text-center">
          <span className="sm:hidden">{verseIdx + 1} / {pada.verses.length}</span>
          <span className="hidden sm:inline">Sutra {verse.number} · {verseIdx + 1}/{pada.verses.length}</span>
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={verseIdx === pada.verses.length - 1}
          onClick={() => {
            if (verseIdx < pada.verses.length - 1) setCurrentVerseId(pada.verses[verseIdx + 1].id)
          }}
          className="flex-1 sm:flex-initial text-xs sm:text-sm px-2.5 sm:px-3"
        >
          <span className="inline sm:hidden">Next</span>
          <span className="hidden sm:inline">Next Sutra</span>
          <ChevronRight className="ml-1 h-4 w-4 shrink-0" />
        </Button>
      </div>

      {/* Previous / Next Pada */}
      <div className="flex justify-between gap-2 pt-3 sm:pt-6 border-t border-border/50">
        {pada.number > 1 ? (
          <Button variant="ghost" size="sm" onClick={() => navigate('yogasutras', { pada: yogaPadas[pada.number - 2].id })} className="flex-1 sm:flex-initial text-xs sm:text-sm truncate">
            <ChevronLeft className="mr-1 h-4 w-4 shrink-0" />
            <span className="truncate sm:hidden">Pada {pada.number - 1}</span>
            <span className="truncate hidden sm:inline">{yogaPadas[pada.number - 2].name}</span>
          </Button>
        ) : <div className="flex-1 sm:flex-initial"></div>}
        {pada.number < yogaPadas.length ? (
          <Button variant="ghost" size="sm" onClick={() => navigate('yogasutras', { pada: yogaPadas[pada.number].id })} className="flex-1 sm:flex-initial text-xs sm:text-sm truncate">
            <span className="truncate sm:hidden">Pada {pada.number + 1}</span>
            <span className="truncate hidden sm:inline">{yogaPadas[pada.number].name}</span>
            <ChevronRight className="ml-1 h-4 w-4 shrink-0" />
          </Button>
        ) : <div className="flex-1 sm:flex-initial"></div>}
      </div>

      {/* Kindle / Apple Books Full-Screen Luxury Reader */}
      <KindleBookReader
        isOpen={bookReaderOpen}
        onClose={() => {
          setBookReaderOpen(false)
          store.setBookReaderOpen(false)
          if (store.readingMode === 'kindle') {
            store.setReadingMode('full')
          }
        }}
        scriptureTitle="Patanjali Yoga Sutras"
        chapterTitle={`Pada ${pada.number}: ${pada.name}`}
        chapterSubtitle={`${pada.sanskritName} • ${pada.transliteration}`}
        verses={pada.verses.map((v) => ({
          ...v,
          chapter: v.pada,
          verse: v.number,
        }))}
        initialVerseId={currentVerseId}
        onSelectVerse={(id) => setCurrentVerseId(id)}
      />
    </div>
  )
}

function VerseCard({ verse, padaId }: { verse: YogaSutraVerse; padaId: string }) {
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
  const highlightColor = store.highlightColors?.[verse.id] || 'saffron'
  const highlightMeta = PASTEL_HIGHLIGHTS[highlightColor] || PASTEL_HIGHLIGHTS.saffron

  function handleMarkRead() {
    if (isRead) {
      store.unmarkVerseRead(verse.id)
      toast.success('Marked as unread')
    } else {
      store.markVerseRead(verse.id)
      store.addReadingTime(15)
      toast.success(`Sutra marked as read · +10 Dharma XP`, {
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
  const showSanskrit = mode === 'sanskrit' || mode === 'sanskrit-english' || mode === 'full' || mode === 'focus' || mode === 'night' || mode === 'kindle'
  const showTranslit = mode === 'full' || mode === 'kindle'
  const showEnglish = mode === 'english' || mode === 'sanskrit-english' || mode === 'full' || mode === 'focus' || mode === 'night' || mode === 'kindle'
  const isNight = mode === 'night'
  const isFocus = mode === 'focus'
  const currentPaper = PAPER_TONES[store.paperTone] || PAPER_TONES.parchment

  return (
    <>
      <Card
        className={cn(
          'p-0 overflow-hidden transition-all verse-card-animated border rounded-3xl card-serene',
          store.paperTone !== 'default'
            ? currentPaper.cardClass
            : isNight
            ? 'bg-[#1a1410] text-amber-50 border-amber-900/30'
            : 'bg-card/95 text-card-foreground border-border/60',
          isHighlighted ? highlightMeta.cardClass : 'hover:border-primary/30',
          isFocus && 'mx-auto max-w-2xl',
        )}
      >
        {/* Verse header */}
        <div className="px-4 sm:px-7 pt-3.5 sm:pt-4 pb-2 flex flex-wrap items-center justify-between gap-2 border-b border-border/40">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <Badge variant="outline" className="font-mono text-xs">
              {verse.id}
            </Badge>
            <Badge variant="secondary" className="text-[10px]">
              Pada {verse.pada} · Sutra {verse.number}
            </Badge>
            {isRead && (
              <Badge className="bg-saffron-gradient text-white border-0 text-[10px]">✓ Read</Badge>
            )}
            {isHighlighted && (
              <Badge variant="outline" className={cn('text-[10px] font-medium border gap-1 shadow-xs', highlightMeta.textClass, highlightMeta.borderClass)}>
                <span className={cn('w-1.5 h-1.5 rounded-full', highlightMeta.dotClass)} />
                {highlightMeta.name}
              </Badge>
            )}
          </div>
          <ActionButtonRow>
            <ActionButton icon={Check} active={isRead} label={isRead ? 'Marked as read' : 'Mark as read (+10 XP)'} onClick={handleMarkRead} shortcut="R" />
            <ActionButton icon={isBookmarked ? BookmarkCheck : Bookmark} active={isBookmarked} label="Bookmark" onClick={() => { store.toggleBookmark(verse.id); toast.success(isBookmarked ? 'Removed bookmark' : 'Sutra bookmarked') }} shortcut="B" />
            <HighlighterPalette verseId={verse.id} shortcut="H" />
            <ActionButton icon={NotebookPen} active={!!existingNote} label="Note" onClick={() => { setNoteDraft(existingNote); setShowNoteEditor(!showNoteEditor) }} shortcut="N" />
            <ActionButton icon={Share2} label="Share" onClick={() => setShareOpen(true)} shortcut="S" />
          </ActionButtonRow>
        </div>

        {/* Verse body */}
        <div className="px-4 sm:px-7 py-5 sm:py-6 space-y-4">
          {showSanskrit && (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1" style={{ fontFamily: 'var(--font-cinzel), var(--font-serif-display), serif' }}>
                संस्कृतम् · Sanskrit
              </p>
              <p
                className="verse-sanskrit-animated text-xl sm:text-2xl leading-[2.2] text-foreground/95"
                style={{
                  fontFamily: 'var(--font-devanagari), "Noto Serif Devanagari", serif',
                  fontSize: `${store.fontScale * 1.35}rem`,
                  whiteSpace: 'pre-line',
                  letterSpacing: '0.025em',
                }}
              >
                {verse.sanskrit}
              </p>
            </div>
          )}
          {showTranslit && (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1" style={{ fontFamily: 'var(--font-cinzel), var(--font-serif-display), serif' }}>IAST Transliteration</p>
              <p
                className={cn('text-base italic leading-relaxed verse-translit-text', `reader-font-${store.readerFont}`)}
                style={{
                  fontSize: `${store.fontScale * 1.0}rem`,
                  lineHeight: store.lineSpacing,
                  whiteSpace: 'pre-line',
                }}
              >
                {verse.transliteration}
              </p>
            </div>
          )}
          {showEnglish && (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1" style={{ fontFamily: 'var(--font-cinzel), var(--font-serif-display), serif' }}>English Translation</p>
              <p
                className={cn('leading-relaxed text-foreground/90 verse-english-text', `reader-font-${store.readerFont}`)}
                style={{
                  fontSize: `${store.fontScale * 1.12}rem`,
                  lineHeight: store.lineSpacing,
                  whiteSpace: 'pre-line',
                }}
              >
                {verse.english}
              </p>
            </div>
          )}
          {verse.commentary && (
            <div className="relative rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[color-mix(in_oklch,var(--saffron)_8%,transparent)] via-[color-mix(in_oklch,var(--gold)_5%,transparent)] to-transparent" />
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" />
              <div className="relative px-5 py-4 sm:px-6 sm:py-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl leading-none text-primary/20 select-none" style={{ fontFamily: 'var(--font-cinzel), Georgia, serif' }}>"</span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-primary/60 font-semibold" style={{ fontFamily: 'var(--font-cinzel), sans-serif' }}>Explanation</p>
                  </div>
                </div>
                <p
                  className={cn('leading-relaxed verse-commentary-text text-foreground/85', `reader-font-${store.readerFont}`)}
                  style={{
                    fontSize: `${store.fontScale * 1.0}rem`,
                    lineHeight: store.lineSpacing,
                  }}
                >{verse.commentary}</p>
                <div className="flex justify-end mt-2">
                  <span className="text-3xl leading-none text-primary/20 select-none" style={{ fontFamily: 'var(--font-cinzel), Georgia, serif' }}>"</span>
                </div>
              </div>
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
              onClick={() => navigate('guide', { explain: verse.id, source: 'yogasutras' })}
            >
              <Sparkles className="mr-1 h-3.5 w-3.5 text-primary" /> AI Explain this Sutra
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
              placeholder="Write your reflection on this sutra…"
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
        title={`Yoga Sutra ${verse.id}`}
        subtitle={verse.transliteration}
        body={verse.english}
        footer="Sanatan Quest · Yoga Sutras of Patanjali"
      />
    </>
  )
}



function AudioPlayer({
  verse,
  playing,
  setPlaying,
}: {
  verse: YogaSutraVerse
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
    // Try to load audio from /audio/yoga-sutras/ folder (Edge TTS generated)
    const audio = new Audio(`/audio/yoga-sutras/${verse.id}.mp3`)
    audio.playbackRate = speed
    audio.onended = () => setPlaying(false)
    audio.onerror = () => {
      // Fallback: recite Sanskrit using TTS
      if ('speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(verse.sanskrit)
        u.lang = 'hi'  // Hindi language gives good Devanagari pronunciation
        u.rate = speed * 0.7; u.pitch = 0.85
        u.onend = () => setPlaying(false)
        window.speechSynthesis.speak(u)
        setPlaying(true)
      } else {
        setPlaying(false)
        toast.error('Audio not available for this sutra')
      }
    }
    audioRef.current = audio
    audio.play().catch(() => {
      // If audio playback fails, try TTS with Sanskrit
      if ('speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(verse.sanskrit)
        u.lang = 'hi'
        u.rate = speed * 0.7; u.pitch = 0.85
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
