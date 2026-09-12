'use client'

import { useMemo } from 'react'
import { Flame, BookOpen, Clock, Trophy, Sparkles, ChevronRight, TrendingUp, Star } from 'lucide-react'
import { useNav } from '@/components/nav-context'
import { useStore, useLevel, useChaptersCompleted, getNextLevel } from '@/lib/store'
import { gitaChapters, totalVerseCount } from '@/lib/gita-data'
import { allUpanishadVerses } from '@/lib/upanishad-data'
import { hanumanChalisaVerses } from '@/lib/hanuman-chalisa-data'
import { bajrangBaanVerses } from '@/lib/bajrang-baan-data'
import { shivTandavVerses } from '@/lib/shiv-tandav-data'
import { allYogaSutraVerses } from '@/lib/yoga-sutras-data'
import { allAshtavakraVerses } from '@/lib/ashtavakra-gita-data'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { OmSymbol, LotusIcon } from '@/components/spiritual-icons'
import { VerseOfDay } from '@/components/verse-of-day'
import { ReadingStreakCalendar } from '@/components/reading-streak-calendar'
import { ScriptureMap } from '@/components/scripture-map'
import { CountUp } from '@/components/count-up'

function getGreeting(): { greeting: string; sanskrit: string } {
  const hour = new Date().getHours()
  if (hour < 12) return { greeting: 'Good Morning', sanskrit: 'सुप्रभातम्' }
  if (hour < 17) return { greeting: 'Good Afternoon', sanskrit: 'शुभ मध्याह्नम्' }
  if (hour < 21) return { greeting: 'Good Evening', sanskrit: 'शुभ सन्ध्या' }
  return { greeting: 'Peaceful Night', sanskrit: 'शुभ रात्रिः' }
}

export function HomeView() {
  const { navigate } = useNav()
  const store = useStore()
  const level = useLevel()
  const chaptersCompleted = useChaptersCompleted()
  const nextLevel = getNextLevel(store.totalXp)
  const greetingInfo = getGreeting()

  // Count only Gita verses (IDs like "1.1", "2.47" — numeric dot numeric)
  const gitaVerseCount = Object.keys(store.readVerses).filter((id) => /^\d+\.\d+$/.test(id)).length
  // Count total across all scriptures
  const allScriptureTotal =
    totalVerseCount +
    allUpanishadVerses.length +
    hanumanChalisaVerses.length +
    bajrangBaanVerses.length +
    shivTandavVerses.length +
    allYogaSutraVerses.length +
    allAshtavakraVerses.length
  const allVersesRead = Object.keys(store.readVerses).length
  const overallPct = allScriptureTotal > 0 ? Math.min(100, Math.round((allVersesRead / allScriptureTotal) * 100)) : 0
  const readingHours = store.readingTimeSec / 3600
  const completionPct = Math.min(100, Math.round((gitaVerseCount / totalVerseCount) * 100))

  const chapterProgress = useMemo(() => {
    return gitaChapters.map((c) => {
      const read = c.verses.filter((v) => store.readVerses[v.id]).length
      const total = c.verses.length
      return { number: c.number, name: c.name, read, total, pct: total ? Math.round((read / total) * 100) : 0 }
    })
  }, [store.readVerses])

  const stats = [
    {
      label: 'Chapters Completed',
      value: chaptersCompleted.length,
      suffix: `/${18}`,
      icon: BookOpen,
      badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      borderHover: 'hover:border-emerald-500/30',
      onClick: () => navigate('gita'),
    },
    {
      label: 'Verses Read',
      value: gitaVerseCount,
      suffix: `/${totalVerseCount}`,
      icon: Sparkles,
      badgeBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
      borderHover: 'hover:border-sky-500/30',
      onClick: () => navigate('gita'),
    },
    {
      label: 'Reading Time',
      value: readingHours,
      decimals: 1,
      suffix: 'h',
      icon: Clock,
      badgeBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      borderHover: 'hover:border-amber-500/30',
      onClick: () => navigate('analytics'),
    },
    {
      label: 'Daily Streak',
      value: store.currentStreak,
      suffix: ' days',
      icon: Flame,
      badgeBg: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
      borderHover: 'hover:border-orange-500/30',
      onClick: () => navigate('tracker'),
    },
  ]

  const xpForNext = nextLevel ? nextLevel.minXp - store.totalXp : 0
  const xpIntoCurrent = store.totalXp - level.minXp
  const xpForCurrentSpan = nextLevel ? nextLevel.minXp - level.minXp : 1
  const levelPct = nextLevel ? Math.round((xpIntoCurrent / xpForCurrentSpan) * 100) : 100
  const progressPercent = nextLevel ? Math.round((store.totalXp / nextLevel.minXp) * 100) : 100

  return (
    <div className="space-y-6 stagger-group max-w-7xl mx-auto pb-8">
      {/* Sanctuary Hero Banner */}
      <div className="card-serene relative overflow-hidden p-6 sm:p-9 rounded-3xl bg-gradient-to-br from-card via-card/95 to-primary/[0.06] border border-border/60">
        {/* Ambient breathing spiritual backdrop */}
        <div className="absolute -right-8 -top-8 opacity-[0.06] pointer-events-none animate-breathe">
          <LotusIcon size={260} className="text-primary" />
        </div>
        <div className="absolute right-24 bottom-0 opacity-[0.04] pointer-events-none animate-float-gentle">
          <OmSymbol size={160} />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-calm" />
            <span>ॐ नमः · {greetingInfo.sanskrit}</span>
          </div>

          <h1
            className="text-2xl sm:text-4xl font-bold tracking-tight mb-2 text-foreground"
            style={{ fontFamily: 'var(--font-cinzel), var(--font-serif-display), serif' }}
          >
            {greetingInfo.greeting},{' '}
            <span className="text-primary">{store.userName || 'Seeker'}</span>
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground/90 leading-relaxed max-w-xl">
            Welcome to your sacred sanctuary. Immerse in timeless wisdom, nurture your daily practice, and let divine peace accompany your journey.
          </p>

          <div className="flex flex-wrap gap-2.5 mt-6">
            <Button
              className="rounded-full px-5 py-2.5 bg-primary text-primary-foreground font-medium shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
              onClick={() => navigate('gita')}
            >
              <BookOpen className="mr-2 h-4 w-4" /> Read the Gita
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-5 py-2.5 border-border/70 hover:border-primary/40 hover:bg-primary/5 transition-all"
              onClick={() => navigate('guide')}
            >
              <Sparkles className="mr-2 h-4 w-4 text-primary" /> Ask AI Guide
            </Button>
            <Button
              variant="ghost"
              className="rounded-full px-4 py-2.5 text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
              onClick={() => navigate('tracker')}
            >
              Daily Sadhana
            </Button>
          </div>
        </div>
      </div>

      {/* Level + XP Progression */}
      <div className="card-serene p-6 sm:p-7 rounded-3xl relative overflow-hidden bg-card border border-border/60">
        <div className="absolute right-6 top-6 opacity-10 pointer-events-none">
          <span className="text-7xl" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
            {level.icon}
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground/70 font-semibold mb-1">
              Spiritual Level
            </span>
            <div className="flex items-baseline gap-2.5 mt-0.5">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                {level.name}
              </span>
              <span className="text-sm sm:text-base text-primary/80 font-normal" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                {level.sanskritName}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              <CountUp value={store.totalXp} />
            </div>
            <div className="text-xs text-muted-foreground/80 font-medium">Dharma XP Earned</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-2.5 w-full bg-muted/60 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-primary via-saffron to-gold rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground/80 pt-0.5">
            <span>{level.name} ({level.minXp.toLocaleString()} XP)</span>
            {nextLevel ? (
              <span>
                {progressPercent}% toward {nextLevel.name} ({xpForNext.toLocaleString()} XP left)
              </span>
            ) : (
              <span className="font-semibold text-primary">Supreme stage reached 🙏</span>
            )}
          </div>
        </div>
      </div>

      {/* Complete Scripture Library Progress */}
      <div className="card-serene p-6 sm:p-7 rounded-3xl relative overflow-hidden bg-gradient-to-br from-card to-muted/30 border border-border/60">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/70 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              Sacred Scripture Library
            </span>
            <h2 className="text-lg font-bold tracking-tight mt-1" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
              Overall Wisdom Journey
            </h2>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-foreground">
              <CountUp value={allVersesRead} />
            </span>
            <span className="text-xs sm:text-sm text-muted-foreground/80"> / {allScriptureTotal} verses</span>
          </div>
        </div>
        <div className="h-2.5 w-full bg-muted/60 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-emerald-500/80 via-primary to-amber-500 rounded-full transition-all duration-700"
            style={{ width: `${overallPct}%` }}
          />
        </div>
        <div className="flex flex-wrap items-center justify-between text-xs text-muted-foreground/80 mt-2.5 gap-2">
          <span className="font-medium text-foreground/80">7 Sacred Texts</span>
          <span className="font-semibold text-primary">{overallPct}% complete</span>
          <span className="hidden md:inline text-xs opacity-75">Gita · Upanishads · Chalisa · Baan · Tandav · Yoga Sutras · Ashtavakra Gita</span>
        </div>
      </div>

      {/* Reading streak calendar */}
      <div className="card-serene p-5 sm:p-7 rounded-3xl border border-border/60 bg-card">
        <ReadingStreakCalendar weeks={12} />
      </div>

      {/* Scripture Map — journey across all sacred texts */}
      <ScriptureMap />

      {/* Stats Grid: 4 minimalist serene cards with pastel discs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div
              key={s.label}
              onClick={s.onClick}
              className={cn(
                'card-serene group cursor-pointer p-4 sm:p-5 rounded-2xl border border-border/60 bg-card relative overflow-hidden transition-all duration-300',
                s.borderHover
              )}
            >
              <div className="flex items-start justify-between gap-2 sm:gap-3">
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-[10px] sm:text-xs text-muted-foreground/80 uppercase tracking-wider font-medium truncate">
                    {s.label}
                  </span>
                  <span className="text-lg sm:text-2xl font-bold text-foreground tracking-tight">
                    <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                  </span>
                </div>
                <div
                  className={cn(
                    'flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-2xl flex-shrink-0 transition-transform duration-300 group-hover:scale-105',
                    s.badgeBg
                  )}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Verse of the Day */}
      <VerseOfDay />

      {/* Chapter progress strip */}
      <div className="card-serene p-5 sm:p-7 rounded-3xl border border-border/60 bg-card">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-semibold tracking-tight" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
              Your Journey Through the Gita
            </h2>
            <p className="text-xs text-muted-foreground/80 mt-0.5">
              18 chapters of eternal guidance · {completionPct}% complete. Tap any chapter to continue.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('gita')}
            className="rounded-full text-xs text-muted-foreground hover:text-foreground gap-1"
          >
            All chapters <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 gap-2 sm:gap-2.5">
          {chapterProgress.map((c) => {
            const isComplete = c.pct === 100
            const isPartial = c.pct > 0 && c.pct < 100
            return (
              <button
                key={c.number}
                onClick={() => navigate('gita', { chapter: String(c.number) })}
                className={cn(
                  'group relative aspect-square rounded-2xl border transition-all duration-300 p-2 flex flex-col items-center justify-center gap-1',
                  'hover:-translate-y-0.5 hover:shadow-xs',
                  isComplete
                    ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400'
                    : isPartial
                      ? 'border-primary/30 bg-primary/5 text-foreground'
                      : 'border-border/60 bg-card text-foreground/75 hover:border-border hover:bg-muted/40'
                )}
                title={`Chapter ${c.number}: ${c.name} — ${c.read}/${c.total} verses`}
              >
                <span className="text-base font-bold" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                  {c.number}
                </span>
                <span
                  className={cn(
                    'text-[10px] leading-tight font-medium',
                    isComplete ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground/70'
                  )}
                >
                  {isComplete ? '✓' : `${c.pct}%`}
                </span>
                {isComplete && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center shadow-xs">
                    <span className="text-white text-[8px]">★</span>
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Quick actions row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuickActionCard
          title="Daily Sadhana"
          subtitle="Log meditation, japa, chanting, puja, and sacred deeds"
          sanskrit="साधनम्"
          icon={<Flame className="h-5 w-5" />}
          badgeBg="bg-orange-500/10 text-orange-600 dark:text-orange-400"
          onClick={() => navigate('tracker')}
        />
        <QuickActionCard
          title="Active Challenges"
          subtitle="7-Day Gita, 21-Day Meditation, 30-Day Spiritual Discipline"
          sanskrit="अभ्यास"
          icon={<Trophy className="h-5 w-5" />}
          badgeBg="bg-amber-500/10 text-amber-600 dark:text-amber-400"
          onClick={() => navigate('challenges')}
        />
        <QuickActionCard
          title="Reflection Journal"
          subtitle="Write daily reflections, insights, gratitude, and AI summaries"
          sanskrit="दिनदर्शिका"
          icon={<Star className="h-5 w-5" />}
          badgeBg="bg-sky-500/10 text-sky-600 dark:text-sky-400"
          onClick={() => navigate('journal')}
        />
      </div>
    </div>
  )
}

function QuickActionCard({
  title,
  subtitle,
  sanskrit,
  icon,
  badgeBg,
  onClick,
}: {
  title: string
  subtitle: string
  sanskrit: string
  icon: React.ReactNode
  badgeBg: string
  onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
      className="card-serene group cursor-pointer p-6 rounded-3xl border border-border/60 bg-card hover:border-primary/30 relative overflow-hidden transition-all duration-300"
    >
      <div className="absolute -right-3 -bottom-3 opacity-[0.08] group-hover:opacity-[0.16] transition-all duration-300 pointer-events-none group-hover:scale-105">
        <span className="text-6xl font-normal" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
          {sanskrit}
        </span>
      </div>
      <div className="relative z-10">
        <span
          className={cn(
            'inline-flex h-11 w-11 items-center justify-center rounded-2xl mb-3.5 transition-transform duration-300 group-hover:scale-105',
            badgeBg
          )}
        >
          {icon}
        </span>
        <h3 className="font-semibold text-base tracking-tight text-foreground" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground/80 mt-1 leading-relaxed">{subtitle}</p>
      </div>
    </div>
  )
}
