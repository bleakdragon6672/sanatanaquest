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
    <div className="space-y-5">
      <Card className="p-6 relative overflow-hidden border-0 bg-gradient-to-br from-[color-mix(in_oklch,var(--saffron)_16%,transparent)] to-card">
        <div className="absolute -right-6 -top-6 opacity-10 pointer-events-none">
          <Trophy className="h-40 w-40 text-primary" />
        </div>
        <div className="relative">
          <Badge className="mb-2 bg-saffron-gradient text-white border-0">
            <Trophy className="mr-1 h-3 w-3" /> Sadhana Challenges
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
            Test Your Discipline
          </h1>
          <p className="text-muted-foreground mt-1 max-w-2xl">
            Commit to a challenge. Check in daily. Earn badges and Dharma XP. Build the unbreakable habit of sadhana.
          </p>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CHALLENGES.map((c) => {
          const prog = store.challengeProgress[c.id]
          const started = !!prog
          const completed = prog?.completed
          const completedDays = prog?.completedDays.length ?? 0
          const pct = started ? Math.round((completedDays / c.days) * 100) : 0
          const alreadyCheckedToday = prog?.lastCheckedDate === todayStr()
          const dayNum = started ? diffDays(todayStr(new Date(prog.startedAt)), todayStr()) + 1 : 0

          return (
            <Card key={c.id} className={cn('p-5 relative overflow-hidden', completed && 'border-primary bg-saffron-gradient-soft')}>
              <div className="absolute -right-3 -bottom-3 opacity-10 pointer-events-none text-8xl">
                {c.badge}
              </div>
              <div className="relative">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="text-lg font-bold leading-tight" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                      {c.title}
                    </h2>
                    <p className="text-xs text-primary/80" style={{ fontFamily: 'var(--font-serif-display), serif' }}>{c.sanskritTitle}</p>
                  </div>
                  <span className="text-3xl">{c.badge}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{c.description}</p>

                {started && (
                  <div className="mb-3 space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">
                        {completed ? '🏆 Completed!' : `Day ${Math.min(dayNum, c.days)} of ${c.days}`}
                      </span>
                      <span className="font-semibold text-primary">{completedDays}/{c.days} days · {pct}%</span>
                    </div>
                    <Progress value={pct} className="h-2 bg-muted" />
                    <div className="flex flex-wrap gap-1 mt-2">
                      {Array.from({ length: c.days }).map((_, i) => {
                        const day = i + 1
                        const isDone = prog?.completedDays.includes(day)
                        return (
                          <div
                            key={day}
                            className={cn(
                              'h-6 w-6 rounded-md flex items-center justify-center text-[10px] font-bold',
                              isDone ? 'bg-saffron-gradient text-white' : 'bg-muted text-muted-foreground',
                            )}
                          >
                            {isDone ? <Check className="h-3 w-3" /> : day}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 mt-4">
                  <Badge variant="secondary" className="text-[10px]">+{c.xpReward} XP</Badge>
                  <Badge variant="outline" className="text-[10px]">{c.days} days</Badge>
                  {!started ? (
                    <Button size="sm" className="ml-auto bg-saffron-gradient text-white" onClick={() => start(c.id)}>
                      <Play className="mr-1 h-3.5 w-3.5" /> Start Challenge
                    </Button>
                  ) : completed ? (
                    <Badge className="ml-auto bg-primary text-primary-foreground">🏆 Completed</Badge>
                  ) : (
                    <Button
                      size="sm"
                      variant={alreadyCheckedToday ? 'outline' : 'default'}
                      disabled={alreadyCheckedToday}
                      className={cn('ml-auto', !alreadyCheckedToday && 'bg-saffron-gradient text-white')}
                      onClick={() => checkIn(c.id)}
                    >
                      {alreadyCheckedToday ? (
                        <><Check className="mr-1 h-3.5 w-3.5" /> Checked in</>
                      ) : (
                        <><Flame className="mr-1 h-3.5 w-3.5" /> Check in Today</>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
