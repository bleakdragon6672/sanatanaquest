'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Sparkles,
  BookOpen,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  Play,
  Settings2,
  ChevronRight,
  Flame,
  ArrowRight,
  Check,
  Sunrise,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { useStore } from '@/lib/store'
import {
  calculatePlanProgress,
  PLAN_CONFIGS,
  type ReadingPlan,
} from '@/lib/reading-plan-data'
import { getChapter, getVerse, gitaChapters, allVerses } from '@/lib/gita-data'
import { KindleBookReader } from '@/components/kindle-book-reader'
import { ReadingPlanPickerModal } from './ReadingPlanPickerModal'
import { OmSymbol } from '@/components/spiritual-icons'
import { triggerXpGain } from '@/components/xp-animations'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export function ReadingPlanDashboardCard() {
  const store = useStore()
  const plan = store.readingPlan

  const [pickerOpen, setPickerOpen] = useState(false)
  const [kindleOpen, setKindleOpen] = useState(false)
  const [selectedVerseId, setSelectedVerseId] = useState<string>('1.1')
  const [showTomorrowPreview, setShowTomorrowPreview] = useState(false)

  // If no plan, render the invitation banner
  if (!plan) {
    return (
      <>
        <div className="card-serene relative overflow-hidden p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-card via-card/95 to-amber-500/[0.06] border border-border/60 group hover:border-primary/40 transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium mb-2.5">
                <OmSymbol size={14} className="text-primary" />
                <span>Paced Scripture Journey</span>
              </div>
              <h2
                className="text-xl sm:text-2xl font-bold text-foreground mb-1.5"
                style={{ fontFamily: 'var(--font-cinzel), var(--font-serif-display), serif' }}
              >
                Complete the Gita at Your Pace
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground/90 leading-relaxed mb-3">
                No rush, no guilt. Read all 700 verses in a structured daily routine — choose from 2 shlokas a day (Beginner), 5 shlokas a day (Steady), or 1 chapter a day (Fast-track) in beautiful Kindle book mode.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="px-2.5 py-1 rounded-lg bg-muted/60 border border-border/40">🌿 2 Shlokas/day (~1 Year)</span>
                <span className="px-2.5 py-1 rounded-lg bg-muted/60 border border-border/40">🪷 5 Shlokas/day (~4.5 Mo)</span>
                <span className="px-2.5 py-1 rounded-lg bg-muted/60 border border-border/40">⚔️ 18-Day Intensive</span>
              </div>
            </div>

            <div className="shrink-0">
              <Button
                onClick={() => setPickerOpen(true)}
                className="w-full sm:w-auto rounded-full px-6 py-2.5 bg-primary text-primary-foreground font-semibold shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Choose Reading Pace</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <ReadingPlanPickerModal open={pickerOpen} onOpenChange={setPickerOpen} />
      </>
    )
  }

  // Plan is active — calculate progress with local timezone auto-advancement
  const progressInfo = calculatePlanProgress(plan, store.readVerses, store.dailyActivity)
  const config = PLAN_CONFIGS[plan.tier]

  function handleToggleVerseRead(verseId: string) {
    const isRead = Boolean(store.readVerses[verseId])
    if (isRead) {
      store.unmarkVerseRead(verseId)
      toast.success('Marked verse as unread')
    } else {
      store.markVerseRead(verseId)
      triggerXpGain(10)
      toast.success(`Verse ${verseId} marked as read (+10 XP)`)
    }
  }

  function handleOpenVerseInKindle(verseId: string) {
    setSelectedVerseId(verseId)
    setKindleOpen(true)
    store.setBookReaderOpen(true)
  }

  function handleStartDailySession() {
    const firstUnread = progressInfo.todaysVerses.find((v) => !store.readVerses[v.id])
    if (firstUnread) {
      handleOpenVerseInKindle(firstUnread.id)
    } else if (progressInfo.tomorrowsVerses.length > 0) {
      handleOpenVerseInKindle(progressInfo.tomorrowsVerses[0].id)
    } else {
      handleOpenVerseInKindle(progressInfo.todaysVerses[0]?.id || '1.1')
    }
  }

  // Determine active chapter and verse to pass into KindleBookReader
  const activeVerse = getVerse(selectedVerseId) || progressInfo.todaysVerses[0] || allVerses[0]
  const activeChapter = getChapter(activeVerse?.chapter || 1) || gitaChapters[0]

  return (
    <>
      <div className="card-serene relative overflow-hidden p-6 sm:p-7 rounded-3xl bg-card border border-border/60 hover:border-primary/30 transition-all">
        {/* Header row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-saffron-gradient-soft border border-primary/20 flex items-center justify-center text-xl shrink-0">
              {config.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg text-foreground leading-tight">
                  {plan.name}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium border border-primary/20">
                  {plan.versesPerDay} / day
                </span>
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                Day {progressInfo.currentDay} of {progressInfo.totalDays} · {progressInfo.completedCount} / 700 Shlokas ({progressInfo.percentComplete}%)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPickerOpen(true)}
              className="rounded-xl text-xs h-8 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <Settings2 className="w-3.5 h-3.5 mr-1" /> Change Pace
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 mb-5">
          <div className="h-2 w-full bg-muted/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary via-saffron to-gold rounded-full transition-all duration-700"
              style={{ width: `${progressInfo.percentComplete}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-muted-foreground/80">
            <span>Overall Gita Completion</span>
            <span className="font-semibold text-primary">{progressInfo.percentComplete}% Complete</span>
          </div>
        </div>

        {/* Today's Sacred Quota Section */}
        <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-muted/30 to-card border border-border/60">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-primary">
                Today's Sacred Portion
              </span>
              {progressInfo.isTodayTargetMet && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <Check className="w-3 h-3" /> Quota Completed Today
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground font-medium">
              {progressInfo.readTodayCount} of {progressInfo.dailyTarget} read today
            </span>
          </div>

          {/* Target met congratulatory banner + tomorrow notice */}
          {progressInfo.isTodayTargetMet && (
            <div className="mb-4 p-3.5 rounded-xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-primary/10 border border-emerald-500/30 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-xs space-y-1">
                <div className="font-semibold text-foreground flex items-center gap-1.5">
                  <span>Sadhana fulfilled for today!</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono">
                    Day {progressInfo.currentDay} of {progressInfo.totalDays}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  You finished all {progressInfo.dailyTarget} shlokas for today. Tomorrow at midnight, your sacred portion will automatically advance to the next {progressInfo.dailyTarget} verses
                  {progressInfo.tomorrowsVerses.length > 0 && (
                    <span className="font-medium text-foreground">
                      {' '}(Gita {progressInfo.tomorrowsVerses[0]?.chapter}.{progressInfo.tomorrowsVerses[0]?.verse} – {progressInfo.tomorrowsVerses[progressInfo.tomorrowsVerses.length - 1]?.chapter}.{progressInfo.tomorrowsVerses[progressInfo.tomorrowsVerses.length - 1]?.verse})
                    </span>
                  )}. You can also preview or continue reading ahead below anytime!
                </p>
              </div>
            </div>
          )}

          {/* Verses List — clicking ANY verse opens Kindle Mode directly */}
          <div className="space-y-2 mb-4">
            {progressInfo.todaysVerses.map((v, idx) => {
              const isRead = Boolean(store.readVerses[v.id])
              const isExtraReadAhead = idx >= progressInfo.dailyTarget
              return (
                <div
                  key={v.id}
                  onClick={() => handleOpenVerseInKindle(v.id)}
                  title="Click to read in Kindle Reader"
                  className={cn(
                    'p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer group hover:scale-[1.008] active:scale-[0.995]',
                    isRead
                      ? 'bg-emerald-500/[0.04] border-emerald-500/30'
                      : 'bg-card border-border/60 hover:border-primary/50 hover:shadow-xs'
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleToggleVerseRead(v.id)
                      }}
                      className={cn(
                        'w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer',
                        isRead
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-muted-foreground group-hover:text-primary'
                      )}
                      title={isRead ? 'Mark as unread' : 'Mark as read (+10 XP)'}
                    >
                      {isRead ? (
                        <CheckCircle2 className="w-5 h-5 fill-emerald-500/20" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                          Bhagavad Gita {v.chapter}.{v.verse}
                        </span>
                        {isExtraReadAhead && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-primary/10 text-primary font-medium">
                            Read Ahead
                          </span>
                        )}
                      </div>
                      <div
                        className="text-xs text-muted-foreground truncate max-w-sm sm:max-w-md"
                        style={{ fontFamily: 'var(--font-noto-devanagari), serif' }}
                      >
                        {v.sanskrit}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <span
                      className={cn(
                        'text-[10px] px-2 py-0.5 rounded-md font-medium',
                        isRead
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-muted text-muted-foreground'
                      )}
                    >
                      {isRead ? 'Read' : '+10 XP'}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-primary/80 font-medium group-hover:text-primary group-hover:translate-x-0.5 transition-all">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Kindle</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Tomorrow's Portion Preview (when today's target is met) */}
          {progressInfo.isTodayTargetMet && progressInfo.tomorrowsVerses.length > 0 && (
            <div className="mb-4 pt-3 border-t border-border/40">
              <button
                type="button"
                onClick={() => setShowTomorrowPreview(!showTomorrowPreview)}
                className="w-full flex items-center justify-between text-xs text-muted-foreground hover:text-foreground p-2 rounded-xl hover:bg-muted/40 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2 font-medium">
                  <Sunrise className="w-4 h-4 text-amber-500" />
                  <span>Tomorrow's Sacred Portion (Day {progressInfo.currentDay + 1})</span>
                  <span className="text-[10px] text-muted-foreground">
                    · Gita {progressInfo.tomorrowsVerses[0]?.chapter}.{progressInfo.tomorrowsVerses[0]?.verse} to {progressInfo.tomorrowsVerses[progressInfo.tomorrowsVerses.length - 1]?.chapter}.{progressInfo.tomorrowsVerses[progressInfo.tomorrowsVerses.length - 1]?.verse}
                  </span>
                </span>
                {showTomorrowPreview ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </button>

              {showTomorrowPreview && (
                <div className="space-y-2 mt-2.5 pl-2 sm:pl-3 border-l-2 border-amber-500/40">
                  <p className="text-[11px] text-muted-foreground">
                    These {progressInfo.tomorrowsVerses.length} verses will automatically appear in your main queue tomorrow. Tap any verse to read ahead now:
                  </p>
                  {progressInfo.tomorrowsVerses.map((v) => (
                    <div
                      key={v.id}
                      onClick={() => handleOpenVerseInKindle(v.id)}
                      className="p-2.5 rounded-xl border border-border/50 bg-card hover:border-primary/40 hover:bg-muted/30 transition-all flex items-center justify-between gap-2 cursor-pointer group"
                    >
                      <div className="min-w-0">
                        <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                          Bhagavad Gita {v.chapter}.{v.verse}
                        </span>
                        <p className="text-[11px] text-muted-foreground truncate" style={{ fontFamily: 'var(--font-noto-devanagari), serif' }}>
                          {v.sanskrit}
                        </p>
                      </div>
                      <span className="shrink-0 text-[10px] text-primary flex items-center gap-1 font-medium group-hover:translate-x-0.5 transition-transform">
                        Read in Kindle <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Action Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>
                {progressInfo.isTodayTargetMet
                  ? 'Daily goal fulfilled · Feel free to read ahead'
                  : `Estimated time: ~${Math.max(1, (progressInfo.dailyTarget - progressInfo.readTodayCount) * 2)} minutes`}
              </span>
            </div>

            <Button
              onClick={handleStartDailySession}
              className="w-full sm:w-auto rounded-xl px-5 h-10 bg-primary text-primary-foreground font-semibold shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 fill-primary-foreground" />
              <span>
                {progressInfo.isTodayTargetMet
                  ? 'Read Ahead in Kindle Mode'
                  : 'Start Daily Kindle Session'}
              </span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </Button>
          </div>
        </div>
      </div>

      <ReadingPlanPickerModal open={pickerOpen} onOpenChange={setPickerOpen} />

      {/* Flagship Kindle / Apple Books Full-Screen Reader */}
      <KindleBookReader
        isOpen={kindleOpen}
        onClose={() => {
          setKindleOpen(false)
          store.setBookReaderOpen(false)
          if (store.readingMode === 'kindle') {
            store.setReadingMode('full')
          }
        }}
        scriptureTitle="Bhagavad Gita"
        chapterTitle={`Chapter ${activeChapter.number}: ${activeChapter.name}`}
        chapterSubtitle={`${activeChapter.sanskritName} • ${activeChapter.transliteration}`}
        verses={activeChapter.verses}
        initialVerseId={selectedVerseId}
        onSelectVerse={(id) => setSelectedVerseId(id)}
      />
    </>
  )
}
