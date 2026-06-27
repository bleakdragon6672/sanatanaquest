'use client'

import { useState, useEffect, useRef } from 'react'
import {
  ChevronLeft, ChevronRight, Bookmark, BookmarkCheck, Highlighter, NotebookPen,
  Share2, Play, Pause, Volume2, Settings2, Sparkles, Check, Heart,
} from 'lucide-react'
import {
  hanumanChalisaVerses, hanumanChalisaInfo, getChalisaVerse,
  type ChalisaVerse,
} from '@/lib/hanuman-chalisa-data'
import { useStore, type ReadingMode } from '@/lib/store'
import { useNav } from '@/components/nav-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { ShareCardModal } from '@/components/share-card-modal'
import { toast } from 'sonner'
import { OmSymbol, LotusIcon } from '@/components/spiritual-icons'
import { cn } from '@/lib/utils'
import { VerseSlider } from '@/components/verse-slider'

export function HanumanChalisaView() {
  const { params, navigate } = useNav()
  const store = useStore()

  // If a specific verse is selected, show reader; otherwise show the full Chalisa
  const selectedVerse = params.verse ? getChalisaVerse(params.verse) : null

  if (selectedVerse) {
    return (
      <VerseReader
        verse={selectedVerse}
        onBack={() => navigate('chalisa')}
      />
    )
  }

  return <FullChalisa />
}

function FullChalisa() {
  const store = useStore()
  const { navigate } = useNav()
  const [loading, setLoading] = useState(true)
  const readCount = hanumanChalisaVerses.filter((v) => store.readVerses[v.id]).length
  const total = hanumanChalisaVerses.length

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
        <div className="space-y-3">
          {[...Array(40)].map((_, i) => (
            <Card key={i} className="p-4 animate-pulse">
              <div className="h-4 w-32 bg-muted rounded mb-2"></div>
              <div className="h-3 w-full bg-muted rounded"></div>
              <div className="h-3 w-3/4 bg-muted rounded mt-2"></div>
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
            हनुमान चालीसा
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
            {hanumanChalisaInfo.title}
          </h1>
          <p className="text-sm text-primary/80 mb-2" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
            {hanumanChalisaInfo.sanskritTitle} · {hanumanChalisaInfo.transliteration}
          </p>
          <p className="text-muted-foreground mb-6 max-w-2xl leading-relaxed">
            {hanumanChalisaInfo.summary}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" /> {readCount}/{total} verses read
            </span>
            <span className="inline-flex items-center gap-2">
              <Heart className="h-4 w-4 text-primary" /> {hanumanChalisaInfo.author} · {hanumanChalisaInfo.period}
            </span>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {hanumanChalisaVerses.map((verse, idx) => {
          const isRead = !!store.readVerses[verse.id]
          const isDoha = verse.type === 'doha'

          return (
            <Card
              key={verse.id}
              onClick={() => navigate('chalisa', { verse: verse.id })}
              className={cn(
                'p-4 sm:p-5 cursor-pointer hover:shadow-md transition-all group',
                isDoha && 'bg-saffron-gradient-soft border-primary/20',
                isRead && 'border-l-2 border-l-green-500',
              )}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-muted text-xs font-mono">
                  {isRead ? <Check className="h-4 w-4 text-green-500" /> : verse.number}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-medium text-foreground/90 mb-1 sm:mb-2" style={{ fontFamily: 'var(--font-serif-display), "Noto Serif Devanagari", serif' }}>
                    {verse.awadhi.split('\n')[0]}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                    {verse.english}
                  </p>
                </div>
                <Badge variant="outline" className="text-[10px] shrink-0">
                  {verse.type === 'doha' ? 'दोहा' : 'चौपाई'}
                </Badge>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function VerseReader({ verse, onBack }: { verse: ChalisaVerse; onBack: () => void }) {
  const store = useStore()
  const { navigate } = useNav()
  const existingNote = store.notes[verse.id] ?? ''

  // Scroll to top on verse change so user sees the animated card
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [verse.id])
  const [showNoteEditor, setShowNoteEditor] = useState(false)
  const [noteDraft, setNoteDraft] = useState(existingNote)
  const [shareOpen, setShareOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const isRead = !!store.readVerses[verse.id]
  const isBookmarked = store.bookmarks.includes(verse.id)
  const isHighlighted = store.highlights.includes(verse.id)

  // Find prev/next verse
  const idx = hanumanChalisaVerses.findIndex((v) => v.id === verse.id)
  const prevVerse = idx > 0 ? hanumanChalisaVerses[idx - 1] : null
  const nextVerse = idx < hanumanChalisaVerses.length - 1 ? hanumanChalisaVerses[idx + 1] : null

  function handleMarkRead() {
    if (isRead) {
      store.unmarkVerseRead(verse.id)
      toast.success('Marked as unread')
    } else {
      store.markVerseRead(verse.id)
      store.addReadingTime(15)
      toast.success(`Verse marked as read · +10 Dharma XP`)
    }
  }

  function handleSaveNote() {
    store.setNote(verse.id, noteDraft)
    setShowNoteEditor(false)
    toast.success('Note saved')
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full hover:bg-saffron-gradient-soft">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
              Hanuman Chalisa
            </p>
            <h1 className="text-lg sm:text-xl font-semibold leading-tight" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
              {verse.type === 'doha' ? 'Doha' : 'Chaupai'} {verse.number}
            </h1>
          </div>
        </div>

        <VerseSlider
          verseId={verse.id}
          hasPrevious={!!prevVerse}
          hasNext={!!nextVerse}
          onPrevious={() => prevVerse && navigate('chalisa', { verse: prevVerse.id })}
          onNext={() => nextVerse && navigate('chalisa', { verse: nextVerse.id })}
        >
        <Card className={cn('p-0 overflow-hidden verse-card-animated', isHighlighted && 'ring-2 ring-primary/40')}>
          <div className="px-5 sm:px-7 pt-4 pb-2 flex items-center justify-between gap-3 border-b border-border/40">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-xs">{verse.id}</Badge>
              <Badge variant="secondary" className="text-[10px]">{verse.type === 'doha' ? 'दोहा' : 'चौपाई'}</Badge>
              {isRead && <Badge className="bg-saffron-gradient text-white border-0 text-[10px]">✓ Read</Badge>}
            </div>
            <div className="flex items-center gap-0.5">
              <ActionButton icon={Check} active={isRead} label="Mark read" onClick={handleMarkRead} />
              <ActionButton icon={isBookmarked ? BookmarkCheck : Bookmark} active={isBookmarked} label="Bookmark" onClick={() => { store.toggleBookmark(verse.id); toast.success(isBookmarked ? 'Removed' : 'Bookmarked') }} />
              <ActionButton icon={Highlighter} active={isHighlighted} label="Highlight" onClick={() => { store.toggleHighlight(verse.id); toast.success(isHighlighted ? 'Removed' : 'Highlighted') }} />
              <ActionButton icon={NotebookPen} active={!!existingNote} label="Note" onClick={() => { setNoteDraft(existingNote); setShowNoteEditor(!showNoteEditor) }} />
              <ActionButton icon={Share2} label="Share" onClick={() => setShareOpen(true)} />
            </div>
          </div>

          <div className="px-5 sm:px-7 py-6 space-y-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1" style={{ fontFamily: 'var(--font-serif-display), serif' }}>अवधी · Awadhi</p>
              <p className="verse-sanskrit-animated text-xl sm:text-2xl leading-[2] text-foreground/95" style={{ fontFamily: 'var(--font-serif-display), "Noto Serif Devanagari", serif', whiteSpace: 'pre-line' }}>{verse.awadhi}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Transliteration</p>
              <p className="text-sm italic text-muted-foreground leading-relaxed" style={{ whiteSpace: 'pre-line' }}>{verse.transliteration}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">English Translation</p>
              <p className="text-base sm:text-lg leading-relaxed text-foreground/90" style={{ whiteSpace: 'pre-line' }}>{verse.english}</p>
            </div>
            {verse.commentary && (
              <div className="relative rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[color-mix(in_oklch,var(--saffron)_8%,transparent)] via-[color-mix(in_oklch,var(--gold)_5%,transparent)] to-transparent" />
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" />
                <div className="relative px-5 py-4 sm:px-6 sm:py-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl leading-none text-primary/20 select-none" style={{ fontFamily: 'Georgia, serif' }}>"</span>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-primary/60 font-semibold">Significance</p>
                  </div>
                  <p
                    className="text-[0.9rem] text-foreground/80 leading-[1.85]"
                    style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
                  >{verse.commentary}</p>
                  <div className="flex justify-end mt-2">
                    <span className="text-3xl leading-none text-primary/20 select-none" style={{ fontFamily: 'Georgia, serif' }}>"</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="px-5 sm:px-7 pb-4 flex flex-wrap items-center justify-between gap-2 border-t border-border/40 pt-3">
            <div className="flex items-center gap-1">
              <AudioPlayer verse={verse} playing={playing} setPlaying={setPlaying} />
            </div>
            <Button size="sm" variant="ghost" onClick={() => navigate('guide', { explain: verse.id, source: 'chalisa' })}>
              <Sparkles className="mr-1 h-3.5 w-3.5 text-primary" /> AI Explain
            </Button>
          </div>

          {showNoteEditor && (
            <div className="px-5 sm:px-7 pb-5 pt-3 border-t border-border/40 bg-muted/30">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Personal Note</p>
              <Textarea value={noteDraft} onChange={(e) => setNoteDraft(e.target.value)} placeholder="Write your reflection…" className="min-h-[100px] bg-background" />
              <div className="flex justify-end gap-2 mt-2">
                <Button size="sm" variant="ghost" onClick={() => setShowNoteEditor(false)}>Cancel</Button>
                <Button size="sm" className="bg-saffron-gradient text-white" onClick={handleSaveNote}>Save Note</Button>
              </div>
            </div>
          )}
        </Card>
        </VerseSlider>

        {/* Verse navigation */}
        <div className="flex items-center justify-between gap-2 sm:gap-3 p-3 sm:p-4">
          <Button
            variant="outline"
            size="sm"
            disabled={!prevVerse}
            onClick={() => prevVerse && navigate('chalisa', { verse: prevVerse.id })}
            className="w-full sm:w-auto"
          >
            <ChevronLeft className="mr-1.5 h-4 w-4" /> Previous
          </Button>
          <span className="text-sm sm:text-base text-muted-foreground font-medium min-w-[80px] text-center">
            {idx + 1} / {hanumanChalisaVerses.length}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={!nextVerse}
            onClick={() => nextVerse && navigate('chalisa', { verse: nextVerse.id })}
            className="w-full sm:w-auto"
          >
            Next <ChevronRight className="ml-1.5 h-4 w-4" />
          </Button>
        </div>
      </div>

      <ShareCardModal open={shareOpen} onClose={() => setShareOpen(false)} title={`Hanuman Chalisa — ${verse.type === 'doha' ? 'Doha' : 'Chaupai'} ${verse.number}`} subtitle={verse.transliteration.split('\n')[0]} body={verse.english} footer="Sanatan Quest · Hanuman Chalisa" />
    </>
  )
}

function ActionButton({ icon: Icon, active, label, onClick }: { icon: typeof Bookmark; active?: boolean; label: string; onClick: () => void }) {
  return (
    <Button size="icon" variant="ghost" className={cn('h-8 w-8 rounded-full', active && 'bg-saffron-gradient-soft text-primary')} onClick={onClick} title={label}>
      <Icon className={cn('h-4 w-4', active && 'fill-current')} />
      <span className="sr-only">{label}</span>
    </Button>
  )
}

function AudioPlayer({ verse, playing, setPlaying }: { verse: ChalisaVerse; playing: boolean; setPlaying: (p: boolean) => void }) {
  const [speed, setSpeed] = useState(1)
  const [showSpeed, setShowSpeed] = useState(false)

  function speak() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) { toast.error('Audio not supported'); return }
    if (playing) { window.speechSynthesis.cancel(); setPlaying(false); return }
    const u = new SpeechSynthesisUtterance(verse.english)
    u.rate = speed; u.pitch = 0.95
    const voices = window.speechSynthesis.getVoices()
    const indic = voices.find((v) => /hi|india/i.test(v.lang) || /india|google.*hi/i.test(v.name))
    if (indic) u.voice = indic
    u.onend = () => setPlaying(false); u.onerror = () => setPlaying(false)
    window.speechSynthesis.speak(u); setPlaying(true)
  }

  useEffect(() => { return () => { if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel() } }, [verse.id])

  return (
    <div className="flex items-center gap-1">
      <Button size="sm" variant="ghost" className="h-8 gap-1.5" onClick={speak}>
        {playing ? <Pause className="h-4 w-4 text-primary" /> : <Play className="h-4 w-4 text-primary" />}
        <span className="text-xs">{playing ? 'Pause' : 'Recite'}</span>
      </Button>
      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setShowSpeed(!showSpeed)} title="Speed">
        <Volume2 className="h-4 w-4" />
      </Button>
      {showSpeed && (
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-muted">
          {[0.75, 1, 1.25, 1.5].map((s) => (
            <button key={s} onClick={() => { setSpeed(s); setShowSpeed(false); toast.success(`Speed: ${s}x`) }} className={cn('text-[10px] px-1.5 py-0.5 rounded', s === speed ? 'bg-primary text-primary-foreground' : 'hover:bg-background')}>
              {s}x
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
