'use client'

import { Trophy, Play, Check, Flame, Lock } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useStore, CHALLENGES } from '@/lib/store'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

function todayStr(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
function diffDays(a: string, b: string) {
  const da = new Date(a + 'T00:00:00')
  const db = new Date(b + 'T00:00:00')
  return Math.round((db.getTime() - da.getTime()) / 86400000)
}

export function ChallengesView() {
  const store = useStore()

  function start(id: string) {
    store.startChallenge(id)
    const c = CHALLENGES.find((c) => c.id === id)
    toast.success(`Challenge started: ${c?.title}`, {
      description: `Check in daily for ${c?.days} days to earn ${c?.xpReward} XP`,
    })
  }

  function checkIn(id: string) {
    const prog = store.challengeProgress[id]
    if (!prog) return
    const c = CHALLENGES.find((c) => c.id === id)
    if (!c) return
    if (prog.lastCheckedDate === todayStr()) {
      toast.info('Already checked in today for this challenge')
      return
    }
    store.checkInChallenge(id)
    const updated = store.challengeProgress[id]
    if (updated?.completed && !prog.completed) {
      toast.success(`🏆 Challenge Completed: ${c.title}!`, {
        description: `+${c.xpReward} Dharma XP earned`,
      })
    } else {
      toast.success(`Day ${updated?.completedDays.length} complete!`, {
        description: `${(c.days - (updated?.completedDays.length ?? 0))} days to go`,
      })
    }
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-8">
      {/* Header */}
      <div className="card-serene p-6 sm:p-9 rounded-3xl relative overflow-hidden border border-border/60 bg-gradient-to-br from-card via-card/95 to-primary/[0.05]">
        <div className="absolute -right-6 -top-6 opacity-[0.06] pointer-events-none animate-breathe">
          <Trophy className="h-44 w-44 text-primary" />
        </div>
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-3">
            <Trophy className="mr-1 h-3.5 w-3.5" /> Sadhana Quests
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 text-foreground" style={{ fontFamily: 'var(--font-cinzel), var(--font-serif-display), serif' }}>
            Sacred Challenges
          </h1>
          <p className="text-muted-foreground/90 max-w-2xl leading-relaxed text-sm sm:text-base">
            Forge deep spiritual discipline through mindful daily commitments. Complete quests to deepen focus and earn Dharma milestones.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {CHALLENGES.map((c) => {
          const prog = store.challengeProgress[c.id]
          const started = !!prog
          const completed = prog?.completed
          const completedDays = prog?.completedDays.length ?? 0
          const pct = started ? Math.round((completedDays / c.days) * 100) : 0
          const alreadyCheckedToday = prog?.lastCheckedDate === todayStr()
          const dayNum = started ? diffDays(todayStr(new Date(prog.startedAt)), todayStr()) + 1 : 0

          return (
            <div
              key={c.id}
              className={cn(
                'card-serene p-6 rounded-3xl border border-border/60 bg-card relative overflow-hidden transition-all duration-300',
                completed && 'border-emerald-500/30 bg-emerald-500/[0.02]',
                started && !completed && 'border-primary/30'
              )}
            >
              <div className="absolute -right-2 -bottom-2 opacity-[0.08] pointer-events-none text-8xl">
                {c.badge}
              </div>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="text-lg font-bold leading-tight text-foreground" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                      {c.title}
                    </h2>
                    <p className="text-xs text-primary/80 mt-0.5" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                      {c.sanskritTitle}
                    </p>
                  </div>
                  <span className="text-3xl drop-shadow-xs">{c.badge}</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground/85 mb-4 leading-relaxed">{c.description}</p>

                {started && (
                  <div className="mb-4 space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-muted-foreground">
                        {completed ? '🏆 Quest Fulfilled!' : `Day ${Math.min(dayNum, c.days)} of ${c.days}`}
                      </span>
                      <span className="text-primary font-semibold">{completedDays}/{c.days} days · {pct}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted/60 rounded-full overflow-hidden p-0.5">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          completed ? "bg-emerald-500" : "bg-primary"
                        )}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {Array.from({ length: c.days }).map((_, i) => {
                        const day = i + 1
                        const isDone = prog?.completedDays.includes(day)
                        return (
                          <div
                            key={day}
                            className={cn(
                              'h-7 w-7 rounded-xl flex items-center justify-center text-[10px] font-semibold transition-all',
                              isDone
                                ? 'bg-primary text-primary-foreground shadow-xs'
                                : 'bg-muted/60 text-muted-foreground/70',
                            )}
                          >
                            {isDone ? <Check className="h-3.5 w-3.5" /> : day}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border/50">
                  <Badge variant="secondary" className="rounded-full text-[10px] bg-primary/10 text-primary border-0 font-semibold">
                    +{c.xpReward} XP
                  </Badge>
                  <Badge variant="outline" className="rounded-full text-[10px] border-border/60 text-muted-foreground">
                    {c.days} days commitment
                  </Badge>
                  {!started ? (
                    <Button
                      size="sm"
                      className="ml-auto rounded-full bg-primary text-primary-foreground font-medium shadow-xs hover:bg-primary/90"
                      onClick={() => start(c.id)}
                    >
                      <Play className="mr-1 h-3.5 w-3.5" /> Embark Quest
                    </Button>
                  ) : completed ? (
                    <Badge className="ml-auto rounded-full bg-emerald-600 text-white font-medium px-3 py-1">
                      🏆 Completed
                    </Badge>
                  ) : (
                    <Button
                      size="sm"
                      variant={alreadyCheckedToday ? 'outline' : 'default'}
                      className={cn(
                        'ml-auto rounded-full text-xs font-medium transition-all',
                        !alreadyCheckedToday && 'bg-primary text-primary-foreground hover:bg-primary/90',
                        alreadyCheckedToday && 'border-border/60 text-muted-foreground'
                      )}
                      disabled={alreadyCheckedToday}
                      onClick={() => checkIn(c.id)}
                    >
                      {alreadyCheckedToday ? '✓ Checked in today' : 'Log Day Check-in'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
