'use client'

import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend, CartesianGrid, RadialBarChart, RadialBar } from 'recharts'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useStore, ACTIVITY_LABELS, ACTIVITY_XP, SPIRITUAL_LEVELS, type ActivityType } from '@/lib/store'
import { gitaChapters, totalVerseCount } from '@/lib/gita-data'
import { BarChart3, TrendingUp, Calendar } from 'lucide-react'

const CHART_COLORS = ['#f59e0b', '#fbbf24', '#dc2626', '#10b981', '#a855f7', '#06b6d4', '#ec4899', '#84cc16', '#f97316', '#6366f1']

function last30Days(): string[] {
  const days: string[] = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`)
  }
  return days
}

export function AnalyticsView() {
  const store = useStore()

  const last30 = last30Days()

  // Activity count over last 30 days (let React Compiler memoize)
  const activityByDay = last30.map((d) => ({
    date: d,
    label: new Date(d + 'T00:00:00').toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
    count: store.dailyActivity[d]?.length ?? 0,
    xp: store.activities
      .filter((a) => a.date === d)
      .reduce((sum, a) => sum + (ACTIVITY_XP[a.type] ?? 0), 0),
  }))

  // Breakdown by activity type
  const byType = useMemo(() => {
    const counts: Record<string, number> = {}
    store.activities.forEach((a) => {
      counts[a.type] = (counts[a.type] ?? 0) + 1
    })
    return (Object.keys(ACTIVITY_LABELS) as ActivityType[])
      .map((t) => ({ type: t, label: ACTIVITY_LABELS[t].label, count: counts[t] ?? 0, icon: ACTIVITY_LABELS[t].icon }))
      .filter((x) => x.count > 0)
  }, [store.activities])

  // Chapter reading completion
  const chapterData = useMemo(() => {
    return gitaChapters.map((c) => {
      const read = c.verses.filter((v) => store.readVerses[v.id]).length
      return {
        chapter: `Ch ${c.number}`,
        read,
        total: c.verses.length,
        pct: c.verses.length ? Math.round((read / c.verses.length) * 100) : 0,
      }
    })
  }, [store.readVerses])

  const versesRead = Object.keys(store.readVerses).length
  const completionPct = Math.min(100, Math.round((versesRead / totalVerseCount) * 100))

  // Recent XP trend (cumulative over 30 days)
  const xpTrend = useMemo(() => {
    const dailyXp = activityByDay.map((d) => d.xp)
    const totalRecent = dailyXp.reduce((a, b) => a + b, 0)
    const startBaseline = Math.max(0, store.totalXp - totalRecent)
    // Build cumulative XP using reduce (no mutation of outer scope)
    return activityByDay.reduce<Array<{ date: string; xp: number; day: number }>>((acc, d, i) => {
      const prevXp = i === 0 ? startBaseline : acc[i - 1].xp
      acc.push({ date: d.label, xp: prevXp + d.xp, day: i + 1 })
      return acc
    }, [])
  }, [activityByDay, store.totalXp])

  // Level progression
  const levelData = useMemo(() => {
    return SPIRITUAL_LEVELS.map((l, i) => ({
      name: l.name,
      xp: l.minXp,
      fill: CHART_COLORS[i % CHART_COLORS.length],
    }))
  }, [])

  return (
    <div className="space-y-5">
      <Card className="p-6 relative overflow-hidden border-0 bg-gradient-to-br from-[color-mix(in_oklch,var(--saffron)_16%,transparent)] to-card">
        <div className="absolute -right-6 -top-6 opacity-10 pointer-events-none">
          <BarChart3 className="h-40 w-40 text-primary" />
        </div>
        <div className="relative">
          <Badge className="mb-2 bg-saffron-gradient text-white border-0">
            <TrendingUp className="mr-1 h-3 w-3" /> Analytics
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
            Your Spiritual Growth
          </h1>
          <p className="text-muted-foreground mt-1">Detailed insights into your reading, practice, and progress over time.</p>
        </div>
      </Card>

      {/* Top KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiCard label="Total XP" value={store.totalXp.toLocaleString()} suffix="Dharma XP" />
        <KpiCard label="Verses Read" value={`${versesRead}`} suffix={`of ${totalVerseCount}`} />
        <KpiCard label="Total Activities" value={String(store.activities.length)} suffix="logged" />
        <KpiCard label="Longest Streak" value={`${store.longestStreak}`} suffix="days" />
      </div>

      {/* Gita completion radial */}
      <Card className="p-5">
        <h2 className="font-semibold mb-1" style={{ fontFamily: 'var(--font-serif-display), serif' }}>Bhagavad Gita Completion</h2>
        <p className="text-xs text-muted-foreground mb-4">{versesRead} of {totalVerseCount} total verses ({completionPct}%)</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="60%" outerRadius="100%" data={[{ name: 'Complete', value: completionPct, fill: 'var(--saffron)' }]} startAngle={90} endAngle={-270}>
                <RadialBar dataKey="value" cornerRadius={20} background={{ fill: 'var(--muted)' }} />
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-foreground" style={{ fontSize: '28px', fontWeight: 700, fontFamily: 'var(--font-serif-display), serif' }}>
                  {completionPct}%
                </text>
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-3">
              The Bhagavad Gita contains 18 chapters and 700 verses. Continue reading to deepen your connection with the teachings.
            </p>
            <div className="space-y-1.5 max-h-40 overflow-y-auto">
              {chapterData.map((c) => (
                <div key={c.chapter} className="flex items-center gap-2 text-xs">
                  <span className="w-12 text-muted-foreground shrink-0">{c.chapter}</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-saffron-gradient" style={{ width: `${c.pct}%` }} />
                  </div>
                  <span className="w-12 text-right text-muted-foreground shrink-0">{c.read}/{c.total}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Activity count over last 30 days */}
      <Card className="p-5">
        <h2 className="font-semibold mb-1" style={{ fontFamily: 'var(--font-serif-display), serif' }}>Activity — Last 30 Days</h2>
        <p className="text-xs text-muted-foreground mb-4">Daily count of spiritual activities logged</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activityByDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 10 }} interval={4} stroke="var(--muted-foreground)" />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: 'var(--foreground)' }}
              />
              <Bar dataKey="count" fill="var(--saffron)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Activity type distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <h2 className="font-semibold mb-1" style={{ fontFamily: 'var(--font-serif-display), serif' }}>Practice Distribution</h2>
          <p className="text-xs text-muted-foreground mb-4">Breakdown of all activities by type</p>
          {byType.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-sm">
              <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
              Log activities to see your practice distribution
            </div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={byType} dataKey="count" nameKey="label" cx="50%" cy="50%" outerRadius={90} label={(e: { icon: string; label: string; count: number }) => `${e.icon} ${e.count}`}>
                    {byType.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>

        <Card className="p-5">
          <h2 className="font-semibold mb-1" style={{ fontFamily: 'var(--font-serif-display), serif' }}>XP Growth</h2>
          <p className="text-xs text-muted-foreground mb-4">Cumulative Dharma XP over last 30 days</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={xpTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}
                />
                <Line type="monotone" dataKey="xp" stroke="var(--saffron)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Level progression */}
      <Card className="p-5">
        <h2 className="font-semibold mb-1" style={{ fontFamily: 'var(--font-serif-display), serif' }}>Spiritual Levels</h2>
        <p className="text-xs text-muted-foreground mb-4">The 7 levels of spiritual progression</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SPIRITUAL_LEVELS.map((l) => {
            const reached = store.totalXp >= l.minXp
            return (
              <div key={l.name} className={`rounded-xl border p-3 ${reached ? 'border-primary bg-saffron-gradient-soft' : 'border-border opacity-70'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{l.icon}</span>
                  <div>
                    <p className="text-sm font-semibold leading-tight">{l.name}</p>
                    <p className="text-[10px] text-primary/80" style={{ fontFamily: 'var(--font-serif-display), serif' }}>{l.sanskritName}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{l.minXp.toLocaleString()} XP {reached && '· ✓'}</p>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}

function KpiCard({ label, value, suffix }: { label: string; value: string; suffix: string }) {
  return (
    <Card className="p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold text-saffron-gradient mt-0.5">{value}</p>
      <p className="text-[10px] text-muted-foreground">{suffix}</p>
    </Card>
  )
}
