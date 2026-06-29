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

export function HomeView() {
  const { navigate } = useNav()
  const store = useStore()
  const level = useLevel()
  const chaptersCompleted = useChaptersCompleted()
  const nextLevel = getNextLevel(store.totalXp)

  // Count only Gita verses (IDs like "1.1", "2.47" — numeric dot numeric)
  const gitaVerseCount = Object.keys(store.readVerses).filter((id) => /^\d+\.\d+$/.test(id)).length
  // Count total across all scriptures
  const allScriptureTotal = totalVerseCount + allUpanishadVerses.length + hanumanChalisaVerses.length + bajrangBaanVerses.length + shivTandavVerses.length + allYogaSutraVerses.length + allAshtavakraVerses.length
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
      value: `${chaptersCompleted.length}/18`,
      icon: BookOpen,
      color: 'saffron',
      onClick: () => navigate('gita'),
    },
    {
      label: 'Verses Read',
      value: `${gitaVerseCount}/${totalVerseCount}`,
      icon: Sparkles,
      color: 'gold',
      onClick: () => navigate('gita'),
    },
    {
      label: 'Reading Time',
      value: `${readingHours.toFixed(1)}h`,
      icon: Clock,
      color: 'vermilion',
      onClick: () => navigate('analytics'),
    },
    {
      label: 'Daily Streak',
      value: `${store.currentStreak} days`,
      icon: Flame,
      color: 'saffron',
      onClick: () => navigate('tracker'),
    },
  ]

  const xpForNext = nextLevel ? nextLevel.minXp - store.totalXp : 0
  const xpIntoCurrent = store.totalXp - level.minXp
  const xpForCurrentSpan = nextLevel ? nextLevel.minXp - level.minXp : 1
  const levelPct = nextLevel ? Math.round((xpIntoCurrent / xpForCurrentSpan) * 100) : 100

  // Show progress TOWARD next level (0% at start of level, 100% at next level)
  const progressPercent = nextLevel ? Math.round((store.totalXp / nextLevel.minXp) * 100) : 100

  return (
    <div className="space-y-6">
      {/* Hero */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-[color-mix(in_oklch,var(--saffron)_18%,transparent)] via-card to-[color-mix(in_oklch,var(--gold)_12%,transparent)]">
        <div className="absolute -right-12 -top-12 opacity-[0.08] pointer-events-none">
          <LotusIcon size={240} className="text-primary" />
        </div>
        <div className="absolute -right-20 top-20 opacity-[0.07] pointer-events-none">
          <OmSymbol size={120} />
        </div>
        <div className="relative p-6 sm:p-8">
          <div className="flex flex-col gap-2 mb-4">
            <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.15em] text-muted-foreground font-semibold">
              <span className="w-2 h-2 rounded-full bg-saffron" />
              ॐ नमः · Welcome back
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-2" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
              Hari Om, <span className="text-saffron-gradient">{store.userName}</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
              Continue your sacred quest. Read a verse, log your practice, and let the Gita illumine your day.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 sm:mt-6">
            <Button className="btn-sacred shadow-md" size="default" onClick={() => navigate('gita')}>
              <BookOpen className="mr-2 h-4 w-4" /> Read the Gita
            </Button>
            <Button variant="outline" size="default" onClick={() => navigate('guide')} className="hover:border-primary/40 hover:bg-saffron-gradient-soft transition-all">
              <Sparkles className="mr-2 h-4 w-4" /> Ask the Guide
            </Button>
            <Button variant="ghost" size="default" onClick={() => navigate('tracker')} className="hover:bg-saffron-gradient-soft transition-all">
              Log today&apos;s practice
            </Button>
          </div>
        </div>
      </Card>

      {/* Level + XP bar */}
      <Card className="card-sacred p-5 sm:p-6">
        <div className="absolute right-4 top-4 opacity-10 pointer-events-none">
          <span className="text-7xl" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
            {level.icon}
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">
              Spiritual Level
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                {level.name}
              </span>
              <span className="text-base sm:text-lg text-muted-foreground" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                {level.sanskritName}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl sm:text-3xl font-bold text-saffron-gradient">
              {store.totalXp.toLocaleString()}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">Dharma XP</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="progress-sacred h-2 bg-card">
            <div className="h-full bg-gradient-to-r from-saffron to-gold rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>
          <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
            <span>{level.name} ({level.minXp} XP)</span>
            {nextLevel ? (
              <span>
                {progressPercent}% to {nextLevel.name} ({xpForNext.toLocaleString()} XP)
              </span>
            ) : (
              <span className="font-semibold text-primary">Supreme level reached 🙏</span>
            )}
          </div>
        </div>
      </Card>

      {/* Overall scripture progress */}
      <Card className="p-5 sm:p-6 relative overflow-hidden border-0 bg-gradient-to-br from-[color-mix(in_oklch,var(--saffron)_10%,transparent)] to-[color-mix(in_oklch,var(--gold)_8%,transparent)]">
        <div className="absolute -right-6 -top-6 opacity-[0.06] pointer-events-none">
          <span className="text-8xl font-bold" style={{ fontFamily: 'var(--font-serif-display), serif' }}>ॐ</span>
        </div>
        <div className="relative">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                📚 Complete Scripture Library
              </span>
              <h2 className="text-lg font-bold mt-1" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                Overall Progress
              </h2>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-saffron-gradient">{allVersesRead}</span>
              <span className="text-sm text-muted-foreground"> / {allScriptureTotal} verses</span>
            </div>
          </div>
          <div className="progress-sacred h-3 bg-card">
            <div
              className="h-full bg-gradient-to-r from-saffron via-gold to-vermilion rounded-full transition-all duration-700"
              style={{ width: `${overallPct}%` }}
            />
          </div>
          <div className="flex justify-between text-xs sm:text-sm text-muted-foreground mt-2">
            <span>7 sacred texts</span>
            <span className="font-semibold text-foreground">{overallPct}% complete</span>
            <span>Gita · Upanishads · Chalisa · Baan · Tandav · Yoga Sutras · Ashtavakra Gita</span>
          </div>
        </div>
      </Card>

      {/* Reading streak calendar */}
      <Card className="p-5 sm:p-6">
        <ReadingStreakCalendar weeks={12} />
      </Card>

      {/* Scripture Map — journey across all sacred texts */}
      <ScriptureMap />

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((s) => {
          const Icon = s.icon
          const iconColor = s.color === 'saffron'
            ? 'text-saffron'
            : s.color === 'gold'
              ? 'text-gold'
              : 'text-vermilion'
          return (
            <Card
              key={s.label}
              className="group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden"
              onClick={s.onClick}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{
                background: `linear-gradient(135deg, color-mix(in oklch, var(--${s.color}) 8%, transparent), transparent)`
              }} />
              <div className="relative p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider font-medium">{s.label}</span>
                    <span className="text-xl sm:text-2xl font-bold text-foreground">{s.value}</span>
                  </div>
                  <div className={cn(
                    'flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110',
                    iconColor,
                  )} style={{
                    background: s.color === 'saffron'
                      ? 'color-mix(in oklch, var(--saffron) 15%, transparent)'
                      : s.color === 'gold'
                        ? 'color-mix(in oklch, var(--gold) 18%, transparent)'
                        : 'color-mix(in oklch, var(--vermilion) 15%, transparent)',
                  }}>
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Verse of the Day */}
      <VerseOfDay />

      {/* Chapter progress strip */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
              Your Journey Through the Gita
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Tap any chapter to continue reading. {completionPct}% complete.
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate('gita')} className="gap-1">
            All chapters <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 gap-2">
          {chapterProgress.map((c) => {
            const pctColor = c.pct === 100 ? 'border-green-500/40 bg-green-500/5' : c.pct > 50 ? 'border-primary/30' : 'border-border'
            return (
              <button
                key={c.number}
                onClick={() => navigate('gita', { chapter: String(c.number) })}
                className={cn(
                  'group relative aspect-square rounded-xl border bg-card transition-all duration-200 p-2 flex flex-col items-center justify-center gap-1',
                  'hover:shadow-md hover:-translate-y-0.5',
                  pctColor,
                  c.pct > 0 && c.pct < 100 ? 'hover:border-primary hover:bg-saffron-gradient-soft' : '',
                  c.pct === 100 ? 'hover:border-green-500 hover:bg-green-500/10' : '',
                )}
                title={`Chapter ${c.number}: ${c.name} — ${c.read}/${c.total} verses`}
              >
                <span className="text-base font-bold" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                  {c.number}
                </span>
                <span className={cn(
                  'text-[9px] text-center leading-tight',
                  c.pct === 100 ? 'text-green-600 font-semibold' : 'text-muted-foreground',
                )}>
                  {c.pct === 100 ? '✓' : `${c.pct}%`}
                </span>
                {c.pct === 100 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-white text-[8px]">★</span>
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </Card>

      {/* Quick actions row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuickActionCard
          title="Daily Tracker"
          subtitle="Log meditation, chanting, puja, charity, and more"
          sanskrit="साधनम्"
          icon={<Flame className="h-5 w-5" />}
          onClick={() => navigate('tracker')}
        />
        <QuickActionCard
          title="Active Challenges"
          subtitle="7-Day Gita, 21-Day Meditation, 30-Day Discipline & more"
          sanskrit="अभ्यास"
          icon={<Trophy className="h-5 w-5" />}
          onClick={() => navigate('challenges')}
        />
        <QuickActionCard
          title="Reflection Journal"
          subtitle="Capture insights, gratitude, and AI weekly summaries"
          sanskrit="दिनदर्शिका"
          icon={<Star className="h-5 w-5" />}
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
  onClick,
}: {
  title: string
  subtitle: string
  sanskrit: string
  icon: React.ReactNode
  onClick: () => void
}) {
  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[color-mix(in_oklch,var(--saffron)_6%,transparent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="absolute -right-4 -bottom-4 opacity-15 group-hover:opacity-25 transition-all duration-300 pointer-events-none group-hover:scale-110">
        <span className="text-7xl" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
          {sanskrit}
        </span>
      </div>
      <div className="relative p-5">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-saffron-gradient-soft text-primary mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-sm">
          {icon}
        </span>
        <h3 className="font-semibold text-base" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{subtitle}</p>
      </div>
    </Card>
  )
}
