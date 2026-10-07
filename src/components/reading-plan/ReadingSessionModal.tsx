'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Sparkles,
  Volume2,
  VolumeX,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Flame,
  Check,
} from 'lucide-react'
import { type Verse } from '@/lib/gita-data'
import { useStore } from '@/lib/store'
import { triggerXpGain } from '@/components/xp-animations'
import { cn } from '@/lib/utils'
import { OmSymbol, LotusIcon } from '@/components/spiritual-icons'
import { toast } from 'sonner'

interface ReadingSessionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  verses: Verse[]
  planName?: string
  dailyTarget: number
  onCompleteSession?: () => void
}

export function ReadingSessionModal({
  open,
  onOpenChange,
  verses,
  planName = 'Daily Gita Plan',
  dailyTarget,
  onCompleteSession,
}: ReadingSessionModalProps) {
  const store = useStore()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [showCommentary, setShowCommentary] = useState(false)
  const [sessionCompleted, setSessionCompleted] = useState(false)

  // Reset index when opening with new verses
  useEffect(() => {
    if (open) {
      // Find the first unread verse in this batch
      const firstUnread = verses.findIndex((v) => !store.readVerses[v.id])
      setCurrentIndex(firstUnread >= 0 ? firstUnread : 0)
      setSessionCompleted(false)
      setShowCommentary(false)
    }
  }, [open, verses])

  if (!verses || verses.length === 0) return null

  const currentVerse = verses[currentIndex] || verses[0]
  const isCurrentRead = Boolean(store.readVerses[currentVerse.id])
  const allInBatchRead = verses.every((v) => Boolean(store.readVerses[v.id]))

  function speakText(text: string) {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      toast.error('Audio recitation is not supported on this browser.')
      return
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel()
      setIsPlayingAudio(false)
      return
    }

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'hi-IN'
    utterance.rate = 0.85
    utterance.onend = () => setIsPlayingAudio(false)
    utterance.onerror = () => setIsPlayingAudio(false)

    setIsPlayingAudio(true)
    window.speechSynthesis.speak(utterance)
  }

  function handleMarkReadAndAdvance() {
    if (!isCurrentRead) {
      store.markVerseRead(currentVerse.id)
      triggerXpGain(10)
      toast.success(`Verse ${currentVerse.id} completed! (+10 Dharma XP)`)
    }

    if (currentIndex < verses.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setShowCommentary(false)
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel()
        setIsPlayingAudio(false)
      }
    } else {
      // Completed the batch!
      setSessionCompleted(true)
      onCompleteSession?.()
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val && typeof window !== 'undefined' && window.speechSynthesis) {
          window.speechSynthesis.cancel()
          setIsPlayingAudio(false)
        }
        onOpenChange(val)
      }}
    >
      <DialogContent className="sm:max-w-2xl max-h-[92vh] overflow-y-auto p-6 border-primary/20 bg-background/98 backdrop-blur-2xl">
        {!sessionCompleted ? (
          <div>
            {/* Header with Progress Steps */}
            <div className="flex items-center justify-between border-b border-border/50 pb-3 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse-calm" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {planName}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {verses.map((v, i) => {
                  const isRead = Boolean(store.readVerses[v.id])
                  const isCurrent = i === currentIndex
                  return (
                    <button
                      key={v.id}
                      onClick={() => {
                        setCurrentIndex(i)
                        setShowCommentary(false)
                      }}
                      className={cn(
                        'w-7 h-7 rounded-lg text-xs font-bold transition-all flex items-center justify-center cursor-pointer',
                        isCurrent
                          ? 'bg-primary text-primary-foreground shadow-xs ring-2 ring-primary/40'
                          : isRead
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                          : 'bg-muted/70 text-muted-foreground hover:bg-muted'
                      )}
                      title={`Go to Verse ${v.id}`}
                    >
                      {isRead ? <Check className="w-3.5 h-3.5" /> : i + 1}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Verse Citation & Badges */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron-gradient-soft text-primary font-semibold text-xs border border-primary/20 mb-2">
                <OmSymbol size={14} className="text-primary" />
                <span>Bhagavad Gita · Chapter {currentVerse.chapter}, Verse {currentVerse.verse}</span>
              </div>
            </div>

            {/* Sanskrit Shloka Box */}
            <div className="relative rounded-2xl p-6 bg-gradient-to-br from-card via-card/90 to-primary/[0.04] border border-primary/20 shadow-sm text-center mb-5">
              <p
                className="text-lg sm:text-2xl font-bold leading-relaxed tracking-wide text-foreground mb-3 text-balance select-text"
                style={{ fontFamily: 'var(--font-noto-devanagari), serif' }}
              >
                {currentVerse.sanskrit}
              </p>

              <p
                className="text-xs sm:text-sm text-primary/90 italic font-medium leading-relaxed max-w-lg mx-auto mb-4"
                style={{ fontFamily: 'var(--font-cormorant), var(--font-serif-display), serif' }}
              >
                {currentVerse.transliteration}
              </p>

              <div className="flex justify-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => speakText(currentVerse.sanskrit)}
                  className="rounded-full h-8 px-3 text-xs border-primary/30 hover:bg-primary/5 text-primary flex items-center gap-1.5 cursor-pointer"
                >
                  {isPlayingAudio ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5" /> Stop Recitation
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5" /> Listen Chanting
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* English Translation */}
            <div className="rounded-2xl p-5 bg-card/80 border border-border/60 mb-5">
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/70 block mb-1.5">
                English Translation
              </span>
              <p className="text-sm sm:text-base text-foreground/95 leading-relaxed font-normal">
                {currentVerse.english}
              </p>

              {currentVerse.meaning && (
                <div className="mt-3 pt-3 border-t border-border/40 text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground/90 font-medium">Core Insight: </strong>
                  {currentVerse.meaning}
                </div>
              )}
            </div>

            {/* Commentary Toggle */}
            {currentVerse.commentary && (
              <div className="mb-5">
                <button
                  type="button"
                  onClick={() => setShowCommentary(!showCommentary)}
                  className="text-xs text-primary hover:underline font-medium flex items-center gap-1 cursor-pointer"
                >
                  <span>{showCommentary ? 'Hide' : 'Read'} Commentary & Spiritual Context</span>
                  <ChevronRight className={cn('w-3 h-3 transition-transform', showCommentary && 'rotate-90')} />
                </button>

                {showCommentary && (
                  <div className="mt-2.5 p-4 rounded-xl bg-muted/40 border border-border/60 text-xs text-muted-foreground/90 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-line animate-fade-in">
                    {currentVerse.commentary}
                  </div>
                )}
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-border/50">
              <Button
                variant="ghost"
                size="sm"
                disabled={currentIndex === 0}
                onClick={() => {
                  setCurrentIndex((prev) => Math.max(0, prev - 1))
                  setShowCommentary(false)
                }}
                className="rounded-xl text-xs h-10 px-3 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </Button>

              <Button
                size="sm"
                onClick={handleMarkReadAndAdvance}
                className="rounded-xl h-10 px-5 bg-primary text-primary-foreground font-semibold shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {isCurrentRead ? (
                  <>
                    <span>Next Verse</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Complete & Next (+10 XP)</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          /* Session Completed Celebration Screen */
          <div className="py-6 text-center animate-scale-in">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500/20 via-primary/20 to-primary/30 mx-auto flex items-center justify-center mb-4 border border-primary/30 shadow-md">
              <LotusIcon size={44} className="text-primary animate-pulse-calm" />
            </div>

            <h2
              className="text-2xl sm:text-3xl font-bold text-foreground mb-1.5"
              style={{ fontFamily: 'var(--font-cinzel), var(--font-serif-display), serif' }}
            >
              Sadhana Complete!
            </h2>
            <p className="text-xs uppercase tracking-widest text-primary font-bold mb-4">
              ॐ तत्सदिति श्रीमद्भगवद्गीतासु
            </p>

            <p className="text-sm text-muted-foreground/90 max-w-md mx-auto leading-relaxed mb-6">
              You have completed today's study quota. Contemplate these verses as you go about your duty today.
            </p>

            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto mb-6">
              <div className="p-3.5 rounded-2xl bg-card border border-border/60">
                <div className="flex items-center justify-center gap-1 text-primary text-lg font-bold">
                  <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                  <span>{store.currentStreak} Days</span>
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">Reading Streak</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-card border border-border/60">
                <div className="flex items-center justify-center gap-1 text-amber-600 dark:text-amber-400 text-lg font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>+{verses.length * 10} XP</span>
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">Dharma XP Earned</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 justify-center max-w-md mx-auto">
              <Button
                className="rounded-xl h-11 px-6 bg-primary text-primary-foreground font-semibold shadow-sm hover:scale-[1.02] transition-all cursor-pointer"
                onClick={() => onOpenChange(false)}
              >
                Conclude for Today 🙏
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
