'use client'

import { useState, useEffect, useRef } from 'react'
import {
  ChevronLeft, ChevronRight, Bookmark, BookmarkCheck, Highlighter, NotebookPen,
  Share2, Play, Pause, Volume2, Sparkles, Check, Shield,
} from 'lucide-react'
import {
  bajrangBaanVerses, bajrangBaanInfo, getBaanVerse,
  type BaanVerse,
} from '@/lib/bajrang-baan-data'
import { useStore } from '@/lib/store'
import { useNav } from '@/components/nav-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { ShareCardModal } from '@/components/share-card-modal'
import { toast } from 'sonner'
import { LotusIcon } from '@/components/spiritual-icons'
import { cn } from '@/lib/utils'
import { VerseSlider } from '@/components/verse-slider'

export function BajrangBaanView() {
  const { params, navigate } = useNav()
  const selectedVerse = params.verse ? getBaanVerse(params.verse) : null

  if (selectedVerse) {
    return <VerseReader key={selectedVerse.id} verse={selectedVerse} onBack={() => navigate('baan')} />
  }

  return <FullBaan />
}

function FullBaan() {
  const store = useStore()
  const { navigate } = useNav()
  const readCount = bajrangBaanVerses.filter((v) => store.readVerses[v.id]).length
  const total = bajrangBaanVerses.length

  return (
    <div className="space-y-6">
      <Card className="p-6 relative overflow-hidden border-0 bg-gradient-to-br from-[color-mix(in_oklch,var(--saffron)_16%,transparent)] to-card">
        <div className="absolute -right-8 -top-8 opacity-10 pointer-events-none">
          <LotusIcon size={200} className="text-primary" />
        </div>
        <div className="relative">
          <Badge className="mb-2 bg-saffron-gradient text-white border-0">बजरंग बाण</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
            {bajrangBaanInfo.title}
          </h1>
          <p className="text-sm text-primary/80 mt-1" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
            {bajrangBaanInfo.sanskritTitle} · {bajrangBaanInfo.transliteration}
          </p>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            {bajrangBaanInfo.summary}
          </p>
          <div className="flex flex-wrap gap-3 mt-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-primary" /> {readCount}/{total} verses read</span>
            <span className="inline-flex items-center gap-1.5"><Shield className="h-4 w-4 text-primary" /> {bajrangBaanInfo.author}</span>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        {bajrangBaanVerses.map((verse) => {
          const isRead = !!store.readVerses[verse.id]
          const isDoha = verse.type === 'doha'

          return (
            <Card
              key={verse.id}
              onClick={() => navigate('baan', { verse: verse.id })}
              className={cn(
                'p-4 cursor-pointer hover:shadow-md transition-all group',
                isDoha && 'bg-saffron-gradient-soft border-primary/20',
                isRead && 'border-l-2 border-l-green-500',
              )}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-muted text-xs font-mono">
                  {isRead ? <Check className="h-4 w-4 text-green-500" /> : verse.number}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground/90 mb-1" style={{ fontFamily: 'var(--font-serif-display), "Noto Serif Devanagari", serif' }}>
                    {verse.awadhi.split('\n')[0]}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{verse.english}</p>
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

function VerseReader({ verse, onBack }: { verse: BaanVerse; onBack: () => void }) {
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

  const idx = bajrangBaanVerses.findIndex((v) => v.id === verse.id)
  const prevVerse = idx > 0 ? bajrangBaanVerses[idx - 1] : null
  const nextVerse = idx < bajrangBaanVerses.length - 1 ? bajrangBaanVerses[idx + 1] : null

  function handleMarkRead() {
    if (isRead) { store.unmarkVerseRead(verse.id); toast.success('Marked as unread') }
    else { store.markVerseRead(verse.id); store.addReadingTime(15); toast.success('Verse marked as read · +10 Dharma XP') }
  }

  function handleSaveNote() {
    store.setNote(verse.id, noteDraft); setShowNoteEditor(false); toast.success('Note saved')
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full"><ChevronLeft className="h-5 w-5" /></Button>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Bajrang Baan</p>
            <h1 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
              {verse.type === 'doha' ? 'Doha' : 'Chaupai'} {verse.number}
            </h1>
          </div>
        </div>

        <VerseSlider
          verseId={verse.id}
          hasPrevious={!!prevVerse}
          hasNext={!!nextVerse}
          onPrevious={() => prevVerse && navigate('baan', { verse: prevVerse.id })}
          onNext={() => nextVerse && navigate('baan', { verse: nextVerse.id })}
        >
        <Card className={cn('p-0 overflow-hidden', isHighlighted && 'ring-2 ring-primary/40')}>
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
              <p className="text-xl sm:text-2xl leading-[2] text-foreground/95" style={{ fontFamily: 'var(--font-serif-display), "Noto Serif Devanagari", serif', whiteSpace: 'pre-line' }}>{verse.awadhi}</p>
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
            <Button size="sm" variant="ghost" onClick={() => navigate('guide', { explain: verse.id, source: 'baan' })}>
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
        <div className="flex items-center justify-between gap-2">
          <Button
            variant="outline"
            disabled={!prevVerse}
            onClick={() => prevVerse && navigate('baan', { verse: prevVerse.id })}
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            {idx + 1} / {bajrangBaanVerses.length}
          </span>
          <Button
            variant="outline"
            disabled={!nextVerse}
            onClick={() => nextVerse && navigate('baan', { verse: nextVerse.id })}
          >
            Next <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>

      <ShareCardModal open={shareOpen} onClose={() => setShareOpen(false)} title={`Bajrang Baan — ${verse.type === 'doha' ? 'Doha' : 'Chaupai'} ${verse.number}`} subtitle={verse.transliteration.split('\n')[0]} body={verse.english} footer="Sanatan Quest · Bajrang Baan" />
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

function AudioPlayer({ verse, playing, setPlaying }: { verse: BaanVerse; playing: boolean; setPlaying: (p: boolean) => void }) {
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
