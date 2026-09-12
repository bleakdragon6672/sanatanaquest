'use client'

import { useMemo, useState } from 'react'
import { Calendar, Flame, Check, Plus, Clock, TrendingUp } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { useStore, ACTIVITY_XP, ACTIVITY_LABELS, type ActivityType } from '@/lib/store'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

function todayStr(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function last7Days(): string[] {
  const days: string[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(todayStr(d))
  }
  return days
}

export function TrackerView() {
  const store = useStore()
  const today = todayStr()
  const [duration, setDuration] = useState<Record<ActivityType, string>>({
    gita: '', ramayana: '', meditation: '', chanting: '', temple: '',
    charity: '', yoga: '', puja: '', service: '', gratitude: '',
  })
  const [note, setNote] = useState('')

  const todaysActivities = useMemo(
    () => store.activities.filter((a) => a.date === today),
    [store.activities, today],
  )

  const todaysTypes = new Set(todaysActivities.map((a) => a.type))
  const last7 = last7Days()

  function logActivity(type: ActivityType) {
    const dur = duration[type] ? parseInt(duration[type], 10) : undefined
    store.logActivity(type, dur, note || undefined)
    const xp = ACTIVITY_XP[type]
    toast.success(`+${xp} Dharma XP · ${ACTIVITY_LABELS[type].label}`, {
      description: note ? undefined : 'Activity logged for today',
    })
    setDuration((d) => ({ ...d, [type]: '' }))
    setNote('')
  }

  // Weekly stats
  const weeklyCount = last7.filter((d) => (store.dailyActivity[d]?.length ?? 0) > 0).length
  const weeklyTotal = last7.reduce(
    (sum, d) => sum + (store.dailyActivity[d]?.length ?? 0),
    0,
  )

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-8">
      {/* Header */}
      <div className="card-serene p-6 sm:p-9 rounded-3xl relative overflow-hidden border border-border/60 bg-gradient-to-br from-card via-card/95 to-primary/[0.05]">
        <div className="absolute -right-6 -top-6 opacity-[0.06] pointer-events-none animate-breathe">
          <Calendar className="h-44 w-44 text-primary" />
        </div>
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-3">
            <Flame className="mr-1 h-3.5 w-3.5" /> Daily Sadhana
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-1.5 text-foreground" style={{ fontFamily: 'var(--font-cinzel), var(--font-serif-display), serif' }}>
            Spiritual Practice Log
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground/80">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-card border border-border/60 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                <Flame className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{store.currentStreak}</p>
                <p className="text-[11px] text-muted-foreground/80 font-medium">current streak</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-card border border-border/60 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{store.longestStreak}</p>
                <p className="text-[11px] text-muted-foreground/80 font-medium">longest streak</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-card border border-border/60 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{todaysActivities.length}</p>
                <p className="text-[11px] text-muted-foreground/80 font-medium">today&apos;s deeds</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly grid */}
      <div className="card-serene p-5 sm:p-7 rounded-3xl border border-border/60 bg-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-base text-foreground" style={{ fontFamily: 'var(--font-serif-display), serif' }}>Last 7 Days Reflection</h2>
            <p className="text-xs text-muted-foreground/80">{weeklyCount} active days · {weeklyTotal} total practices logged</p>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1.5 sm:gap-3">
          {last7.map((d) => {
            const count = store.dailyActivity[d]?.length ?? 0
            const isToday = d === today
            const dayName = new Date(d + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)
            const dayNum = new Date(d + 'T00:00:00').getDate()
            return (
              <div
                key={d}
                className={cn(
                  'flex flex-col items-center gap-1.5 rounded-2xl border p-2 sm:p-3 transition-all min-w-0',
                  isToday
                    ? 'border-primary/40 bg-primary/5 shadow-xs'
                    : 'border-border/60 bg-muted/20',
                  count > 0 && !isToday && 'border-primary/20 bg-primary/[0.02]',
                )}
              >
                <span className="text-[11px] text-muted-foreground/70 font-medium">{dayName}</span>
                <span className="text-xs sm:text-sm font-semibold text-foreground">{dayNum}</span>
                <div className={cn(
                  'h-6 w-6 sm:h-7 sm:w-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-all',
                  count > 0 ? 'bg-primary text-primary-foreground shadow-xs' : 'bg-muted/60 text-muted-foreground/50',
                )}>
                  {count > 0 ? count : '·'}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Log activity */}
      <div className="card-serene p-6 sm:p-7 rounded-3xl border border-border/60 bg-card">
        <h2 className="font-semibold text-base mb-1 text-foreground" style={{ fontFamily: 'var(--font-serif-display), serif' }}>Record Sadhana</h2>
        <p className="text-xs text-muted-foreground/80 mb-4">Each conscious spiritual action earns Dharma XP and brings sacred mindfulness.</p>
        <Input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Optional reflection note (e.g. chanted 108 rounds of Mahamantra, morning meditation)"
          className="mb-5 rounded-2xl border-border/60 bg-background text-xs sm:text-sm"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {(Object.keys(ACTIVITY_LABELS) as ActivityType[]).map((type) => {
            const meta = ACTIVITY_LABELS[type]
            const done = todaysTypes.has(type)
            return (
              <div
                key={type}
                className={cn(
                  'rounded-2xl border p-3.5 flex flex-col gap-2.5 transition-all duration-300',
                  done
                    ? 'border-emerald-500/30 bg-emerald-500/[0.03]'
                    : 'border-border/60 bg-card hover:border-primary/40 hover:shadow-xs',
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{meta.icon}</span>
                    <div>
                      <p className="text-sm font-semibold leading-tight text-foreground">{meta.label}</p>
                      <p className="text-[11px] text-muted-foreground/70" style={{ fontFamily: 'var(--font-serif-display), serif' }}>{meta.sanskrit}</p>
                    </div>
                  </div>
                  {done && <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  {type === 'meditation' || type === 'yoga' || type === 'chanting' || type === 'gita' || type === 'ramayana' ? (
                    <div className="flex items-center gap-1.5 flex-1">
                      <Input
                        type="number"
                        value={duration[type]}
                        onChange={(e) => setDuration((d) => ({ ...d, [type]: e.target.value }))}
                        placeholder="min"
                        className="h-8 text-xs rounded-xl"
                      />
                      <Clock className="h-3.5 w-3.5 text-muted-foreground/60" />
                    </div>
                  ) : <span className="flex-1" />}
                  <Button
                    size="sm"
                    variant={done ? 'outline' : 'default'}
                    className={cn(
                      'h-8 rounded-full px-3 text-xs gap-1 font-medium transition-all',
                      !done && 'bg-primary text-primary-foreground hover:bg-primary/90'
                    )}
                    onClick={() => logActivity(type)}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    +{ACTIVITY_XP[type]} XP
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Today's log */}
      <div className="card-serene p-6 sm:p-7 rounded-3xl border border-border/60 bg-card">
        <h2 className="font-semibold text-base mb-3 text-foreground" style={{ fontFamily: 'var(--font-serif-display), serif' }}>Today&apos;s Sadhana Log</h2>
        {todaysActivities.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground/70">
            <Flame className="h-8 w-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm font-medium">No practices logged yet today.</p>
            <p className="text-xs text-muted-foreground/60 mt-0.5">Begin with even a 5-minute conscious pause.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {todaysActivities.map((a) => {
              const meta = ACTIVITY_LABELS[a.type]
              return (
                <div key={a.id} className="flex items-center gap-3 p-3 rounded-2xl bg-muted/30 border border-border/40">
                  <span className="text-xl">{meta.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{meta.label}</p>
                    {a.duration && <p className="text-xs text-muted-foreground">{a.duration} minutes</p>}
                    {a.note && <p className="text-xs text-muted-foreground/80 italic truncate">&quot;{a.note}&quot;</p>}
                  </div>
                  <Badge variant="secondary" className="rounded-full text-[10px] bg-primary/10 text-primary border-0 font-semibold">
                    +{ACTIVITY_XP[a.type]} XP
                  </Badge>
                  <span className="text-xs text-muted-foreground/70 font-mono">
                    {new Date(a.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
