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
    <div className="space-y-5">
      {/* Header */}
      <Card className="p-6 relative overflow-hidden border-0 bg-gradient-to-br from-[color-mix(in_oklch,var(--saffron)_16%,transparent)] to-card">
        <div className="absolute -right-6 -top-6 opacity-10 pointer-events-none">
          <Calendar className="h-40 w-40 text-primary" />
        </div>
        <div className="relative">
          <Badge className="mb-2 bg-saffron-gradient text-white border-0">
            <Flame className="mr-1 h-3 w-3" /> Daily Sadhana
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
            Today's Spiritual Practice
          </h1>
          <p className="text-muted-foreground mt-1">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold text-saffron-gradient">{store.currentStreak}</p>
                <p className="text-xs text-muted-foreground">current streak</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold text-saffron-gradient">{store.longestStreak}</p>
                <p className="text-xs text-muted-foreground">longest streak</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold text-saffron-gradient">{todaysActivities.length}</p>
                <p className="text-xs text-muted-foreground">today's activities</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Weekly grid */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-semibold" style={{ fontFamily: 'var(--font-serif-display), serif' }}>Last 7 Days</h2>
            <p className="text-xs text-muted-foreground">{weeklyCount} active days · {weeklyTotal} total activities</p>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {last7.map((d) => {
            const count = store.dailyActivity[d]?.length ?? 0
            const isToday = d === today
            const dayName = new Date(d + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)
            const dayNum = new Date(d + 'T00:00:00').getDate()
            return (
              <div
                key={d}
                className={cn(
                  'flex flex-col items-center gap-1 rounded-xl border p-2 transition-all',
                  isToday ? 'border-primary bg-saffron-gradient-soft' : 'border-border bg-card',
                  count > 0 && 'border-primary/40',
                )}
              >
                <span className="text-[10px] text-muted-foreground">{dayName}</span>
                <span className="text-sm font-semibold">{dayNum}</span>
                <div className={cn(
                  'h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold',
                  count > 0 ? 'bg-saffron-gradient text-white' : 'bg-muted text-muted-foreground',
                )}>
                  {count > 0 ? count : '·'}
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Log activity */}
      <Card className="p-5">
        <h2 className="font-semibold mb-1" style={{ fontFamily: 'var(--font-serif-display), serif' }}>Log an Activity</h2>
        <p className="text-xs text-muted-foreground mb-4">Each activity earns Dharma XP and contributes to your spiritual growth.</p>
        <Input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Optional note (e.g. chanted 108 rounds, meditated on Krishna)"
          className="mb-4"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {(Object.keys(ACTIVITY_LABELS) as ActivityType[]).map((type) => {
            const meta = ACTIVITY_LABELS[type]
            const done = todaysTypes.has(type)
            return (
              <div
                key={type}
                className={cn(
                  'rounded-xl border p-3 flex flex-col gap-2 transition-all',
                  done ? 'border-primary bg-saffron-gradient-soft' : 'border-border bg-card hover:border-primary/40',
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{meta.icon}</span>
                    <div>
                      <p className="text-sm font-semibold leading-tight">{meta.label}</p>
                      <p className="text-[10px] text-muted-foreground" style={{ fontFamily: 'var(--font-serif-display), serif' }}>{meta.sanskrit}</p>
                    </div>
                  </div>
                  {done && <Check className="h-4 w-4 text-primary" />}
                </div>
                <div className="flex items-center gap-2">
                  {type === 'meditation' || type === 'yoga' || type === 'chanting' || type === 'gita' || type === 'ramayana' ? (
                    <div className="flex items-center gap-1 flex-1">
                      <Input
                        type="number"
                        value={duration[type]}
                        onChange={(e) => setDuration((d) => ({ ...d, [type]: e.target.value }))}
                        placeholder="min"
                        className="h-8 text-xs"
                      />
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                  ) : <span className="flex-1" />}
                  <Button
                    size="sm"
                    variant={done ? 'outline' : 'default'}
                    className={cn('h-8 gap-1', !done && 'bg-saffron-gradient text-white')}
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
      </Card>

      {/* Today's log */}
      <Card className="p-5">
        <h2 className="font-semibold mb-3" style={{ fontFamily: 'var(--font-serif-display), serif' }}>Today's Log</h2>
        {todaysActivities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Flame className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No activities logged yet today.</p>
            <p className="text-xs">Begin your day with even one small practice.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {todaysActivities.map((a) => {
              const meta = ACTIVITY_LABELS[a.type]
              return (
                <div key={a.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                  <span className="text-xl">{meta.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{meta.label}</p>
                    {a.duration && <p className="text-xs text-muted-foreground">{a.duration} min</p>}
                    {a.note && <p className="text-xs text-muted-foreground italic truncate">"{a.note}"</p>}
                  </div>
                  <Badge variant="secondary" className="text-[10px]">+{ACTIVITY_XP[a.type]} XP</Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(a.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </Card>
    </div>
  )
}
