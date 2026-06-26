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
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { OmSymbol, LotusIcon } from '@/components/spiritual-icons'
import { VerseOfDay } from '@/components/verse-of-day'
import { ReadingStreakCalendar } from '@/components/reading-streak-calendar'

export function HomeView() {
  const { navigate } = useNav()
  const store = useStore()
  const level = useLevel()
  const chaptersCompleted = useChaptersCompleted()
  const nextLevel = getNextLevel(store.totalXp)

  // Count only Gita verses (IDs like "1.1", "2.47" — numeric dot numeric)
  const gitaVerseCount = Object.keys(store.readVerses).filter((id) => /^\d+\.\d+$/.test(id)).length
  // Count total across all scriptures
  const allScriptureTotal = totalVerseCount + allUpanishadVerses.length + hanumanChalisaVerses.length + bajrangBaanVerses.length + shivTandavVerses.length
  const allVersesRead = Object.keys(store.readVerses).length
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
          <div className="flex flex-col gap-1 mb-3">
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              ॐ नमः · Welcome back
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
              Hari Om, <span className="text-saffron-gradient">{store.userName}</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Continue your sacred quest. Read a verse, log your practice, and let the Gita illumine your day.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <Button className="bg-saffron-gradient hover:opacity-90 text-white" onClick={() => navigate('gita')}>
              <BookOpen className="mr-2 h-4 w-4" /> Read the Gita
            </Button>
            <Button variant="outline" onClick={() => navigate('guide')}>
              <Sparkles className="mr-2 h-4 w-4" /> Ask the Guide
            </Button>
            <Button variant="ghost" onClick={() => navigate('tracker')}>
              Log today's practice
            </Button>
          </div>
        </div>
      </Card>

      {/* Level + XP bar */}
      <Card className="p-5 sm:p-6 relative overflow-hidden">
        <div className="absolute right-4 top-4 opacity-10 pointer-events-none">
          <span className="text-7xl" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
            {level.icon}
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              Spiritual Level
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                {level.name}
              </span>
              <span className="text-base text-muted-foreground" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                {level.sanskritName}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-saffron-gradient">
              {store.totalXp.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Dharma XP</div>
          </div>
        </div>
        <div className="space-y-2">
          <Progress value={levelPct} className="h-2.5 bg-muted" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{level.name} ({level.minXp} XP)</span>
            {nextLevel ? (
              <span>
                {nextLevel.name} in <span className="font-semibold text-primary">{xpForNext.toLocaleString()} XP</span>
              </span>
            ) : (
              <span className="font-semibold text-primary">Supreme level reached 🙏</span>
            )}
          </div>
        </div>
      </Card>

      {/* Reading streak calendar */}
      <Card className="p-5">
        <ReadingStreakCalendar weeks={12} />
      </Card>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <Card
              key={s.label}
              className="p-4 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all"
              onClick={s.onClick}
            >
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                  <span className="text-2xl font-bold text-foreground">{s.value}</span>
                </div>
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{
                    background: 'saffron' === s.color
                      ? 'color-mix(in oklch, var(--saffron) 18%, transparent)'
                      : 'gold' === s.color
                        ? 'color-mix(in oklch, var(--gold) 22%, transparent)'
                        : 'color-mix(in oklch, var(--vermilion) 18%, transparent)',
                    color: 'saffron' === s.color ? 'var(--saffron)' : 'gold' === s.color ? 'var(--gold)' : 'var(--vermilion)',
                  }}
                >
                  <Icon className="h-5 w-5" />
                </span>
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
          <Button variant="ghost" size="sm" onClick={() => navigate('gita')}>
            All chapters <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 gap-2">
          {chapterProgress.map((c) => (
            <button
              key={c.number}
              onClick={() => navigate('gita', { chapter: String(c.number) })}
              className="group relative aspect-square rounded-xl border border-border bg-card hover:border-primary hover:bg-saffron-gradient-soft transition-all p-2 flex flex-col items-center justify-center gap-1"
              title={`Chapter ${c.number}: ${c.name} — ${c.read}/${c.total} verses`}
            >
              <span className="text-base font-bold" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                {c.number}
              </span>
              <span className="text-[9px] text-muted-foreground text-center leading-tight">
                {c.pct}%
              </span>
              {c.pct === 100 && (
                <span className="absolute top-1 right-1 text-amber-500 text-xs">★</span>
              )}
            </button>
          ))}
        </div>
      </Card>

      {/* Quick actions row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
      className="p-5 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all group relative overflow-hidden"
    >
      <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
        <span className="text-7xl" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
          {sanskrit}
        </span>
      </div>
      <div className="relative">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-saffron-gradient-soft text-primary mb-3">
          {icon}
        </span>
        <h3 className="font-semibold text-base" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      </div>
    </Card>
  )
}
