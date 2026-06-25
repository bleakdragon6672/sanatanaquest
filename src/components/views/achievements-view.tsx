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
    <div className="space-y-5">
      <Card className="p-6 relative overflow-hidden border-0 bg-gradient-to-br from-[color-mix(in_oklch,var(--saffron)_16%,transparent)] to-card">
        <div className="absolute -right-6 -top-6 opacity-10 pointer-events-none">
          <Award className="h-40 w-40 text-primary" />
        </div>
        <div className="relative">
          <Badge className="mb-2 bg-saffron-gradient text-white border-0">
            <Award className="mr-1 h-3 w-3" /> Siddhi Gallery
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
            Your Achievements
          </h1>
          <p className="text-muted-foreground mt-1">
            {unlockedIds.size} of {ACHIEVEMENTS.length} milestones unlocked.
          </p>
          <div className="mt-4">
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-saffron-gradient transition-all"
                style={{ width: `${(unlockedIds.size / ACHIEVEMENTS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {ACHIEVEMENTS.map((a) => {
          const got = unlockedIds.has(a.id)
          return (
            <Card
              key={a.id}
              className={cn(
                'p-5 relative overflow-hidden transition-all',
                got ? 'border-primary bg-saffron-gradient-soft' : 'opacity-70 hover:opacity-100',
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    'h-14 w-14 rounded-2xl flex items-center justify-center text-3xl shrink-0',
                    got ? 'bg-saffron-gradient' : 'bg-muted grayscale',
                  )}
                >
                  {got ? a.icon : <Lock className="h-6 w-6 text-muted-foreground" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm leading-tight">{a.title}</h3>
                    {got && <Badge className="text-[9px] h-4 px-1.5 bg-primary text-primary-foreground">Earned</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">{a.description}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
