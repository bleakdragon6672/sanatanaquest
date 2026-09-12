'use client'

import { Award, Lock } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useStore, ACHIEVEMENTS } from '@/lib/store'
import { gitaChapters } from '@/lib/gita-data'
import { cn } from '@/lib/utils'

export function AchievementsView() {
  const store = useStore()
  // Compute unlocked state
  const chaptersCompleted = gitaChapters
    .filter((c) => c.verses.length > 0 && c.verses.every((v) => store.readVerses[v.id]))
    .map((c) => `Chapter ${c.number}`)

  const unlocked = ACHIEVEMENTS.filter((a) =>
    a.check({
      ...store,
      chaptersCompleted,
      level: { name: '', minXp: 0, sanskritName: '', icon: '' },
    } as never),
  )
  const unlockedIds = new Set(unlocked.map((a) => a.id))

  return (
    <div className="space-y-6">
      <Card className="card-serene p-6 sm:p-9 rounded-3xl relative overflow-hidden border border-border/60 bg-gradient-to-br from-card via-card/95 to-primary/[0.04]">
        <div className="absolute -right-6 -top-6 opacity-[0.06] pointer-events-none animate-breathe">
          <Award className="h-44 w-44 text-primary" />
        </div>
        <div className="relative z-10">
          <Badge className="mb-3 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs px-3 py-1 font-serif">
            <Award className="mr-1.5 h-3.5 w-3.5" /> सिद्धि · Siddhi Gallery
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-1" style={{ fontFamily: 'var(--font-cinzel), var(--font-serif-display), serif' }}>
            Sacred Milestones
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {unlockedIds.size} of {ACHIEVEMENTS.length} spiritual milestones unlocked on your journey.
          </p>
          <div className="mt-4 max-w-md">
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary via-saffron to-gold transition-all duration-700 rounded-full"
                style={{ width: `${(unlockedIds.size / ACHIEVEMENTS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ACHIEVEMENTS.map((a) => {
          const got = unlockedIds.has(a.id)
          return (
            <Card
              key={a.id}
              className={cn(
                'card-serene rounded-2xl p-5 relative overflow-hidden transition-all border',
                got ? 'border-primary/40 bg-primary/[0.03]' : 'border-border/50 opacity-70 hover:opacity-100',
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    'h-13 w-13 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-xs',
                    got ? 'bg-gradient-to-br from-primary via-saffron to-gold text-white' : 'bg-muted/70 grayscale',
                  )}
                >
                  {got ? a.icon : <Lock className="h-5 w-5 text-muted-foreground" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm leading-tight text-foreground">{a.title}</h3>
                    {got && <Badge className="text-[9px] h-4 px-1.5 rounded-full bg-primary/20 text-primary border border-primary/30">Earned</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{a.description}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
