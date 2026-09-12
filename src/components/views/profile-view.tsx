'use client'

import { useState } from 'react'
import { User, Share2, RotateCcw, Edit3, Award, Flame, BookOpen, Sparkles, Check } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { useStore, useLevel, useChaptersCompleted, getNextLevel, SPIRITUAL_LEVELS, CHALLENGES, ACHIEVEMENTS, ACTIVITY_LABELS } from '@/lib/store'
import { useAuth } from '@/lib/auth-context'
import { updateCloudUserName } from '@/lib/cloud-sync'
import { totalVerseCount } from '@/lib/gita-data'
import { ShareCardModal } from '@/components/share-card-modal'
import { OmSymbol, LotusIcon } from '@/components/spiritual-icons'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog'

export function ProfileView() {
  const { user } = useAuth()
  const store = useStore()
  const level = useLevel()
  const chaptersCompleted = useChaptersCompleted()
  const nextLevel = getNextLevel(store.totalXp)
  const [shareCard, setShareCard] = useState<{
    title: string; subtitle?: string; body: string; badge?: string; variant?: 'saffron' | 'gold' | 'vermilion' | 'dark'
  } | null>(null)
  const [editNameOpen, setEditNameOpen] = useState(false)
  const [nameDraft, setNameDraft] = useState(store.userName)
  const [resetOpen, setResetOpen] = useState(false)

  const versesRead = Object.keys(store.readVerses).length

  const completedChallenges = Object.values(store.challengeProgress).filter((c) => c.completed).length

  // Compute earned achievements
  const earnedAchievements = ACHIEVEMENTS.filter((a) => {
    try {
      return a.check({
        ...store,
        chaptersCompleted,
        level,
      } as never)
    } catch {
      return false
    }
  })

  const shareCards = [
    {
      title: 'My Spiritual Level',
      subtitle: `${level.name} · ${level.sanskritName}`,
      body: `I have earned ${store.totalXp.toLocaleString()} Dharma XP on Sanatan Quest.`,
      badge: level.icon,
      variant: 'saffron' as const,
    },
    {
      title: `${store.currentStreak}-Day Streak!`,
      subtitle: 'Daily Spiritual Practice',
      body: `I have maintained a ${store.currentStreak}-day streak of daily spiritual practice. 🔥`,
      badge: '🔥',
      variant: 'vermilion' as const,
    },
    {
      title: `${versesRead} Verses Read`,
      subtitle: 'Bhagavad Gita Journey',
      body: `I have read ${versesRead} of ${totalVerseCount} verses of the Bhagavad Gita.`,
      badge: '📖',
      variant: 'gold' as const,
    },
    {
      title: `${chaptersCompleted.length} Chapters Completed`,
      subtitle: 'Bhagavad Gita',
      body: `I have completed ${chaptersCompleted.length} of 18 chapters of the Bhagavad Gita.`,
      badge: '📕',
      variant: 'dark' as const,
    },
  ]

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-8">
      {/* Hero profile */}
      <div className="card-serene p-6 sm:p-9 rounded-3xl relative overflow-hidden border border-border/60 bg-gradient-to-br from-card via-card/95 to-primary/[0.05]">
        <div className="absolute -right-8 -top-8 opacity-[0.06] pointer-events-none animate-breathe">
          <LotusIcon size={240} className="text-primary" />
        </div>
        <div className="relative z-10">
          <div className="flex items-start gap-4 sm:gap-5 mb-5">
            <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-primary via-saffron to-gold flex items-center justify-center text-4xl shadow-xs shrink-0 animate-breathe">
              {level.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground" style={{ fontFamily: 'var(--font-cinzel), var(--font-serif-display), serif' }}>
                  {store.userName}
                </h1>
                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-muted/60" onClick={() => { setNameDraft(store.userName); setEditNameOpen(true) }}>
                  <Edit3 className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </div>
              <p className="text-primary font-semibold text-sm sm:text-base" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                {level.name} · {level.sanskritName}
              </p>
              <p className="text-xs text-muted-foreground/80 mt-1 font-sans">
                Seeker since {new Date(store.joinedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="space-y-2 mt-6">
            <div className="flex justify-between text-xs text-muted-foreground font-medium">
              <span>{store.totalXp.toLocaleString()} Dharma XP</span>
              {nextLevel ? <span>{nextLevel.minXp.toLocaleString()} XP to attain {nextLevel.name}</span> : <span>Supreme rank reached</span>}
            </div>
            <div className="h-2.5 w-full bg-muted/60 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-primary via-saffron to-gold rounded-full transition-all duration-700"
                style={{ width: `${nextLevel ? Math.round(((store.totalXp - level.minXp) / (nextLevel.minXp - level.minXp)) * 100) : 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatTile icon={<Sparkles className="h-5 w-5" />} label="Dharma XP" value={store.totalXp.toLocaleString()} badgeBg="bg-primary/10 text-primary" />
        <StatTile icon={<Flame className="h-5 w-5" />} label="Current Streak" value={`${store.currentStreak} days`} badgeBg="bg-orange-500/10 text-orange-600 dark:text-orange-400" />
        <StatTile icon={<BookOpen className="h-5 w-5" />} label="Verses Contemplated" value={`${versesRead}/${totalVerseCount}`} badgeBg="bg-sky-500/10 text-sky-600 dark:text-sky-400" />
        <StatTile icon={<Award className="h-5 w-5" />} label="Achievements" value={`${earnedAchievements.length}/${ACHIEVEMENTS.length}`} badgeBg="bg-amber-500/10 text-amber-600 dark:text-amber-400" />
      </div>

      {/* Shareable cards */}
      <div className="card-serene p-6 sm:p-7 rounded-3xl border border-border/60 bg-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-base flex items-center gap-2 text-foreground" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
              <Share2 className="h-4 w-4 text-primary" /> Contemplation & Milestone Cards
            </h2>
            <p className="text-xs text-muted-foreground/80 mt-0.5">Create tranquil summary cards to share sacred inspiration with fellow seekers.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {shareCards.map((c, i) => (
            <button
              key={i}
              onClick={() => setShareCard(c)}
              className="text-left rounded-2xl border border-border/60 bg-card p-4 sm:p-5 hover:border-primary/40 hover:bg-primary/[0.02] transition-all group shadow-xs"
            >
              <div className="flex items-start justify-between mb-2.5">
                <span className="text-3xl">{c.badge}</span>
                <Share2 className="h-4 w-4 text-muted-foreground/60 group-hover:text-primary transition-colors" />
              </div>
              <p className="font-semibold text-sm text-foreground" style={{ fontFamily: 'var(--font-serif-display), serif' }}>{c.title}</p>
              {c.subtitle && <p className="text-xs text-primary/80 font-medium mt-0.5">{c.subtitle}</p>}
              <p className="text-xs text-muted-foreground/80 mt-1.5 line-clamp-2 leading-relaxed">{c.body}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Earned badges row */}
      <div className="card-serene p-6 sm:p-7 rounded-3xl border border-border/60 bg-card">
        <h2 className="font-semibold text-base mb-4 text-foreground" style={{ fontFamily: 'var(--font-serif-display), serif' }}>Earned Milestones</h2>
        {earnedAchievements.length === 0 ? (
          <p className="text-sm text-muted-foreground/70 text-center py-8">No milestones unlocked yet. Read verses and log your practice to unlock them.</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {earnedAchievements.map((a) => (
              <div key={a.id} className="flex items-center gap-2.5 rounded-2xl border border-border/60 bg-muted/20 px-3.5 py-2.5">
                <span className="text-2xl">{a.icon}</span>
                <div>
                  <p className="text-xs font-semibold leading-tight text-foreground">{a.title}</p>
                  <p className="text-[10px] text-muted-foreground/80 leading-tight mt-0.5">{a.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reset / danger zone */}
      <div className="card-serene p-6 sm:p-7 rounded-3xl border border-destructive/20 bg-destructive/[0.02]">
        <h2 className="font-semibold text-base mb-1 text-destructive" style={{ fontFamily: 'var(--font-serif-display), serif' }}>Reset Sanctuary Progress</h2>
        <p className="text-xs text-muted-foreground/80 mb-4 leading-relaxed">This will erase all recorded bookmarks, reflections, XP, and reading streaks. This cannot be undone.</p>
        <Button variant="outline" className="rounded-full text-xs text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => setResetOpen(true)}>
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Reset All Progress
        </Button>
      </div>

      {shareCard && (
        <ShareCardModal
          open={!!shareCard}
          onClose={() => setShareCard(null)}
          title={shareCard.title}
          subtitle={shareCard.subtitle}
          body={shareCard.body}
          badge={shareCard.badge}
          variant={shareCard.variant}
        />
      )}

      <Dialog open={editNameOpen} onOpenChange={setEditNameOpen}>
        <DialogContent className="rounded-3xl border border-border/60 bg-card sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground" style={{ fontFamily: 'var(--font-serif-display), serif' }}>Change Your Seeker Name</DialogTitle>
          </DialogHeader>
          <Input
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            placeholder="Your spiritual seeker name"
            className="rounded-2xl border-border/60 bg-background my-2"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const trimmed = nameDraft.trim()
                if (trimmed) {
                  store.setUserName(trimmed)
                  if (user) updateCloudUserName(user, trimmed)
                  setEditNameOpen(false)
                  toast.success('Name updated and synced to Leaderboard')
                }
              }
            }}
          />
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="ghost" onClick={() => setEditNameOpen(false)} className="rounded-full">Cancel</Button>
            <Button
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => {
                const trimmed = nameDraft.trim()
                if (trimmed) {
                  store.setUserName(trimmed)
                  if (user) updateCloudUserName(user, trimmed)
                  setEditNameOpen(false)
                  toast.success('Name updated and synced to Leaderboard')
                }
              }}
            >
              <Check className="mr-1 h-4 w-4" /> Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={resetOpen} onOpenChange={setResetOpen}>
        <DialogContent className="rounded-3xl border border-destructive/30 bg-card sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-destructive" style={{ fontFamily: 'var(--font-serif-display), serif' }}>Reset all progress?</DialogTitle>
          </DialogHeader>
          <p className="text-xs sm:text-sm text-muted-foreground/90 leading-relaxed my-2">
            This will permanently delete: {versesRead} verses read, {store.totalXp.toLocaleString()} XP, level {level.name}, {store.bookmarks.length} bookmarks, {Object.keys(store.notes).length} notes, {store.journal.length} journal entries, {store.activities.length} activities, and all challenge progress.
          </p>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="ghost" onClick={() => setResetOpen(false)} className="rounded-full">Cancel</Button>
            <Button variant="destructive" className="rounded-full" onClick={() => {
              store.resetAll()
              setResetOpen(false)
              toast.success('Progress reset. A fresh quest begins.')
            }}>
              <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Yes, reset everything
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function StatTile({ icon, label, value, badgeBg }: { icon: React.ReactNode; label: string; value: string; badgeBg: string }) {
  return (
    <div className="card-serene p-4 sm:p-5 rounded-2xl border border-border/60 bg-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground/80 font-medium">{label}</p>
          <p className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-1">{value}</p>
        </div>
        <span className={cn("flex h-10 w-10 items-center justify-center rounded-2xl shrink-0", badgeBg)}>
          {icon}
        </span>
      </div>
    </div>
  )
}
