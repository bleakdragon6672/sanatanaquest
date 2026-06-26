'use client'

import { useMemo } from 'react'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'

// Get the last N days as date strings
function getLastNDays(n: number): string[] {
  const days: string[] = []
  const now = new Date()
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    days.push(d.toISOString().split('T')[0])
  }
  return days
}

// Map activity intensity to color opacity
function getIntensity(hasActivity: boolean, hasReading: boolean): number {
  if (!hasActivity) return 0
  if (hasReading) return 4
  return 2
}

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export function ReadingStreakCalendar({ weeks = 12 }: { weeks?: number }) {
  const dailyActivity = useStore((s) => s.dailyActivity)
  const readVerses = useStore((s) => s.readVerses)
  const currentStreak = useStore((s) => s.currentStreak)
  const longestStreak = useStore((s) => s.longestStreak)

  const totalDays = weeks * 7
  const days = getLastNDays(totalDays)

  // Group days into weeks
  const weeksData = useMemo(() => {
    const result: string[][] = []
    for (let i = 0; i < days.length; i += 7) {
      result.push(days.slice(i, i + 7))
    }
    return result
  }, [days])

  // Count reading days from verse timestamps
  const readingDays = useMemo(() => {
    const daySet = new Set<string>()
    for (const ts of Object.values(readVerses)) {
      daySet.add(new Date(ts).toISOString().split('T')[0])
    }
    return daySet
  }, [readVerses])

  const activeDays = useMemo(() => {
    const allDays = new Set<string>(Object.keys(dailyActivity))
    for (const d of readingDays) allDays.add(d)
    return allDays
  }, [dailyActivity, readingDays])

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
            Reading Streak
          </h3>
          <p className="text-xs text-muted-foreground">
            {currentStreak > 0 ? `🔥 ${currentStreak} day streak` : 'Start your streak today'}
            {longestStreak > 0 && ` · Best: ${longestStreak} days`}
          </p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-saffron-gradient">{activeDays.size}</span>
          <p className="text-[10px] text-muted-foreground">active days</p>
        </div>
      </div>

      <div className="flex gap-0.5">
        {/* Day labels */}
        <div className="flex flex-col gap-0.5 mr-1">
          {DAY_LABELS.map((label, i) => (
            <div key={i} className="h-3 w-3 text-[8px] text-muted-foreground flex items-center justify-center">
              {i % 2 === 1 ? label : ''}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="flex gap-0.5 overflow-x-auto">
          {weeksData.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-0.5">
              {week.map((day, di) => {
                const isActive = activeDays.has(day)
                const isToday = day === new Date().toISOString().split('T')[0]
                const intensity = getIntensity(isActive, readingDays.has(day))

                return (
                  <div
                    key={di}
                    className={cn(
                      'h-3 w-3 rounded-[2px] transition-colors',
                      isToday && 'ring-1 ring-primary',
                      intensity === 0 && 'bg-muted/50',
                      intensity === 2 && 'bg-primary/30',
                      intensity === 4 && 'bg-primary/60',
                    )}
                    title={`${day}${isActive ? ' ✓' : ''}`}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
        <span>Less</span>
        <div className="h-3 w-3 rounded-[2px] bg-muted/50" />
        <div className="h-3 w-3 rounded-[2px] bg-primary/30" />
        <div className="h-3 w-3 rounded-[2px] bg-primary/60" />
        <span>More</span>
      </div>
    </div>
  )
}
