'use client'

import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend, CartesianGrid, RadialBarChart, RadialBar } from 'recharts'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useStore, ACTIVITY_LABELS, ACTIVITY_XP, SPIRITUAL_LEVELS, type ActivityType } from '@/lib/store'
import { gitaChapters, totalVerseCount } from '@/lib/gita-data'
import { BarChart3, TrendingUp, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

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
    <div className="space-y-6 max-w-5xl mx-auto pb-8">
      <div className="card-serene p-6 sm:p-9 rounded-3xl relative overflow-hidden border border-border/60 bg-gradient-to-br from-card via-card/95 to-primary/[0.05]">
        <div className="absolute -right-6 -top-6 opacity-[0.06] pointer-events-none animate-breathe">
          <BarChart3 className="h-44 w-44 text-primary" />
        </div>
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-3">
            <TrendingUp className="mr-1 h-3.5 w-3.5" /> Growth & Insights
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 text-foreground" style={{ fontFamily: 'var(--font-cinzel), var(--font-serif-display), serif' }}>
            Spiritual Analytics
          </h1>
          <p className="text-muted-foreground/90 max-w-2xl leading-relaxed text-sm sm:text-base">
            Reflective analytics of your scripture reading rhythm, daily sadhana consistency, and long-term spiritual progression.
          </p>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total Experience" value={store.totalXp.toLocaleString()} suffix="Dharma XP" badgeColor="text-primary" />
        <KpiCard label="Verses Contemplated" value={`${versesRead}`} suffix={`of ${totalVerseCount} verses`} badgeColor="text-sky-600 dark:text-sky-400" />
        <KpiCard label="Practices Logged" value={String(store.activities.length)} suffix="conscious sessions" badgeColor="text-emerald-600 dark:text-emerald-400" />
        <KpiCard label="Deepest Streak" value={`${store.longestStreak}`} suffix="consecutive days" badgeColor="text-amber-600 dark:text-amber-400" />
      </div>

      {/* Gita completion radial */}
      <div className="card-serene p-6 sm:p-7 rounded-3xl border border-border/60 bg-card">
        <h2 className="font-semibold text-base mb-1 text-foreground" style={{ fontFamily: 'var(--font-serif-display), serif' }}>Bhagavad Gita Completion</h2>
        <p className="text-xs text-muted-foreground/80 mb-4">{versesRead} of {totalVerseCount} verses explored ({completionPct}%)</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="60%" outerRadius="100%" data={[{ name: 'Complete', value: completionPct, fill: 'var(--primary)' }]} startAngle={90} endAngle={-270}>
                <RadialBar dataKey="value" cornerRadius={20} background={{ fill: 'var(--muted)' }} />
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-foreground" style={{ fontSize: '28px', fontWeight: 700, fontFamily: 'var(--font-serif-display), serif' }}>
                  {completionPct}%
                </text>
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <p className="text-sm text-muted-foreground/85 mb-4 leading-relaxed">
              18 chapters of eternal wisdom. Each verse read gently strengthens your spiritual clarity and composure.
            </p>
            <div className="space-y-2 max-h-44 overflow-y-auto pr-2 scrollbar-thin">
              {chapterData.map((c) => (
                <div key={c.chapter} className="flex items-center gap-3 text-xs">
                  <span className="w-12 text-muted-foreground/80 font-medium shrink-0">{c.chapter}</span>
                  <div className="flex-1 h-2 bg-muted/60 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${c.pct}%` }} />
                  </div>
                  <span className="w-14 text-right text-muted-foreground/80 font-mono text-[11px] shrink-0">{c.read}/{c.total}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity count over last 30 days */}
      <div className="card-serene p-6 sm:p-7 rounded-3xl border border-border/60 bg-card">
        <h2 className="font-semibold text-base mb-1 text-foreground" style={{ fontFamily: 'var(--font-serif-display), serif' }}>Activity Rhythm — Last 30 Days</h2>
        <p className="text-xs text-muted-foreground/80 mb-4">Daily count of conscious practices logged</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activityByDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 10 }} interval={4} stroke="var(--muted-foreground)" />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, fontSize: 12 }}
                labelStyle={{ color: 'var(--foreground)' }}
              />
              <Bar dataKey="count" fill="var(--primary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activity type distribution + XP growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card-serene p-6 sm:p-7 rounded-3xl border border-border/60 bg-card">
          <h2 className="font-semibold text-base mb-1 text-foreground" style={{ fontFamily: 'var(--font-serif-display), serif' }}>Practice Distribution</h2>
          <p className="text-xs text-muted-foreground/80 mb-4">Breakdown of spiritual activities by discipline</p>
          {byType.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground/70 text-sm">
              <Calendar className="h-8 w-8 mx-auto mb-2 opacity-40" />
              Log your daily practice to see your discipline distribution
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
                    contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="card-serene p-6 sm:p-7 rounded-3xl border border-border/60 bg-card">
          <h2 className="font-semibold text-base mb-1 text-foreground" style={{ fontFamily: 'var(--font-serif-display), serif' }}>Dharma Momentum</h2>
          <p className="text-xs text-muted-foreground/80 mb-4">Cumulative spiritual XP gained over the last 30 days</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={xpTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, fontSize: 12 }}
                />
                <Line type="monotone" dataKey="xp" stroke="var(--primary)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Level progression */}
      <div className="card-serene p-6 sm:p-7 rounded-3xl border border-border/60 bg-card">
        <h2 className="font-semibold text-base mb-1 text-foreground" style={{ fontFamily: 'var(--font-serif-display), serif' }}>Sacred Stages of Seeking</h2>
        <p className="text-xs text-muted-foreground/80 mb-4">The 7 progressive milestones of the spiritual seeker</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SPIRITUAL_LEVELS.map((l) => {
            const reached = store.totalXp >= l.minXp
            return (
              <div
                key={l.name}
                className={cn(
                  'rounded-2xl border p-3.5 transition-all duration-300',
                  reached
                    ? 'border-primary/40 bg-primary/5 shadow-xs'
                    : 'border-border/60 bg-muted/20 opacity-60'
                )}
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="text-2xl">{l.icon}</span>
                  <div>
                    <p className="text-sm font-semibold leading-tight text-foreground">{l.name}</p>
                    <p className="text-[11px] text-primary/80" style={{ fontFamily: 'var(--font-serif-display), serif' }}>{l.sanskritName}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground font-medium">{l.minXp.toLocaleString()} XP {reached && '· ✓ Reached'}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function KpiCard({ label, value, suffix, badgeColor }: { label: string; value: string; suffix: string; badgeColor: string }) {
  return (
    <div className="card-serene p-5 rounded-2xl border border-border/60 bg-card">
      <p className="text-xs text-muted-foreground/80 font-medium">{label}</p>
      <p className={cn("text-2xl sm:text-3xl font-bold tracking-tight mt-1", badgeColor)}>{value}</p>
      <p className="text-[11px] text-muted-foreground/70 mt-0.5">{suffix}</p>
    </div>
  )
}
