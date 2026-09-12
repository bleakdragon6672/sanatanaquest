'use client'

import { GitBranch, Lock, Check, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useStore, SKILL_TREE, ACTIVITY_LABELS, type SkillNode } from '@/lib/store'
import { OmSymbol } from '@/components/spiritual-icons'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const PATHS = [
  { id: 'bhakti', name: 'Bhakti Path', sanskrit: 'भक्ति मार्ग', color: 'saffron', description: 'The path of love and devotion to the Divine.' },
  { id: 'jnana', name: 'Jnana Path', sanskrit: 'ज्ञान मार्ग', color: 'gold', description: 'The path of knowledge and self-inquiry.' },
  { id: 'karma', name: 'Karma Path', sanskrit: 'कर्म मार्ग', color: 'vermilion', description: 'The path of selfless action and duty.' },
  { id: 'yoga', name: 'Yoga Path', sanskrit: 'योग मार्ग', color: 'gold', description: 'The path of meditation and self-mastery.' },
] as const

export function SkillTreeView() {
  const store = useStore()

  function isUnlockable(node: SkillNode): boolean {
    // Each required activity must have at least one log
    return node.requiredActivities.every((a) =>
      store.activities.some((act) => act.type === a),
    )
  }

  function isUnlocked(node: SkillNode): boolean {
    return store.unlockedSkills.includes(node.id)
  }

  function tryUnlock(node: SkillNode) {
    if (isUnlocked(node)) return
    if (!isUnlockable(node)) {
      toast.error('Complete the required activities first', {
        description: `Required: ${node.requiredActivities.map((a) => ACTIVITY_LABELS[a].label).join(', ')}`,
      })
      return
    }
    store.unlockSkill(node.id)
    toast.success(`🎉 Skill Unlocked: ${node.name}!`, {
      description: `+${node.xpReward} Dharma XP earned · ${node.description}`,
    })
  }

  return (
    <div className="space-y-6">
      <Card className="card-serene p-6 sm:p-9 rounded-3xl relative overflow-hidden border border-border/60 bg-gradient-to-br from-card via-card/95 to-primary/[0.04]">
        <div className="absolute -right-6 -top-6 opacity-[0.06] pointer-events-none animate-breathe">
          <GitBranch className="h-44 w-44 text-primary" />
        </div>
        <div className="relative z-10">
          <Badge className="mb-3 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs px-3 py-1 font-serif">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" /> योगमार्ग · Spiritual Skill Tree
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-1" style={{ fontFamily: 'var(--font-cinzel), var(--font-serif-display), serif' }}>
            The Four Paths of Yoga
          </h1>
          <p className="text-muted-foreground mt-1 max-w-2xl text-sm sm:text-base leading-relaxed">
            Unlock skills along the four classical paths — Bhakti (devotion), Jnana (knowledge),
            Karma (action), and Yoga (meditation). Each node requires specific practices to unlock.
          </p>
          <div className="mt-4 flex items-center gap-3 text-sm">
            <span className="text-muted-foreground">Unlocked Paths:</span>
            <span className="font-semibold text-primary font-mono">{store.unlockedSkills.length}/{SKILL_TREE.length}</span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {PATHS.map((path) => {
          const nodes = SKILL_TREE.filter((n) => n.path === path.id)
          return (
            <Card key={path.id} className="card-serene rounded-3xl p-6 border border-border/60 bg-card">
              <div className="mb-5 pb-3 border-b border-border/40">
                <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: 'var(--font-cinzel), var(--font-serif-display), serif' }}>
                  {path.name}
                </h2>
                <p className="text-sm text-primary/80 mt-0.5" style={{ fontFamily: 'var(--font-serif-display), serif' }}>{path.sanskrit}</p>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{path.description}</p>
              </div>
              <div className="space-y-3">
                {nodes.map((node, i) => {
                  const unlocked = isUnlocked(node)
                  const unlockable = isUnlockable(node)
                  return (
                    <div key={node.id}>
                      {i > 0 && (
                        <div className="ml-6 h-4 w-0.5 bg-border/60 mx-auto my-1" />
                      )}
                      <div
                        className={cn(
                          'rounded-2xl border p-4 transition-all relative overflow-hidden',
                          unlocked ? 'border-primary/40 bg-primary/[0.03]' : unlockable ? 'border-primary/30 bg-card hover:border-primary/60' : 'border-border/60 bg-muted/20 opacity-80',
                        )}
                      >
                        <div className="flex items-start gap-3.5">
                          <div
                            className={cn(
                              'h-12 w-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-xs',
                              unlocked ? 'bg-gradient-to-br from-primary via-saffron to-gold text-white' : 'bg-muted/70 grayscale',
                            )}
                          >
                            {unlocked ? node.icon : <Lock className="h-5 w-5 text-muted-foreground" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h3 className="font-semibold text-sm text-foreground">{node.name}</h3>
                              {unlocked && <Badge variant="secondary" className="text-[10px] h-5 rounded-full bg-primary/20 text-primary border border-primary/30">Unlocked</Badge>}
                              <Badge variant="outline" className="text-[10px] h-5 text-primary border-primary/30 rounded-full">+{node.xpReward} XP</Badge>
                            </div>
                            <p className="text-xs text-primary/80 mb-1" style={{ fontFamily: 'var(--font-serif-display), serif' }}>{node.sanskritName}</p>
                            <p className="text-xs text-muted-foreground leading-snug mb-2">{node.description}</p>
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Requires:</span>
                              {node.requiredActivities.map((a) => {
                                const done = store.activities.some((act) => act.type === a)
                                return (
                                  <span
                                    key={a}
                                    className={cn(
                                      'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px]',
                                      done ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground',
                                    )}
                                  >
                                    {done ? <Check className="h-2.5 w-2.5" /> : <Lock className="h-2.5 w-2.5" />}
                                    {ACTIVITY_LABELS[a].label}
                                  </span>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                        {!unlocked && unlockable && (
                          <Button
                            size="sm"
                            className="w-full mt-3 bg-saffron-gradient text-white"
                            onClick={() => tryUnlock(node)}
                          >
                            <Sparkles className="mr-1 h-3.5 w-3.5" /> Unlock Skill · +{node.xpReward} XP
                          </Button>
                        )}
                        {!unlocked && !unlockable && (
                          <p className="text-[11px] text-muted-foreground mt-3 text-center italic">
                            Complete the required activities above to unlock this skill
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
