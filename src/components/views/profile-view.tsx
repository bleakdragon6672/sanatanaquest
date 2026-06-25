'use client'

import { useState } from 'react'
import { User, Share2, RotateCcw, Edit3, Award, Flame, BookOpen, Sparkles, Check } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { useStore, useLevel, useChaptersCompleted, getNextLevel, SPIRITUAL_LEVELS, CHALLENGES, ACHIEVEMENTS, ACTIVITY_LABELS } from '@/lib/store'
import { totalVerseCount } from '@/lib/gita-data'
import { ShareCardModal } from '@/components/share-card-modal'
import { OmSymbol, LotusIcon } from '@/components/spiritual-icons'
import { toast } from 'sonner'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog'

export function ProfileView() {
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
    <div className="space-y-5">
      {/* Hero profile */}
      <Card className="p-6 sm:p-8 relative overflow-hidden border-0 bg-gradient-to-br from-[color-mix(in_oklch,var(--saffron)_22%,transparent)] via-card to-[color-mix(in_oklch,var(--gold)_14%,transparent)]">
        <div className="absolute -right-12 -top-12 opacity-[0.1] pointer-events-none">
          <LotusIcon size={240} className="text-primary" />
        </div>
        <div className="absolute -right-20 bottom-0 opacity-[0.08] pointer-events-none">
          <OmSymbol size={120} />
        </div>
        <div className="relative">
          <div className="flex items-start gap-4 mb-4">
            <div className="h-20 w-20 rounded-2xl bg-saffron-gradient flex items-center justify-center text-4xl shadow-lg shrink-0">
              {level.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                  {store.userName}
                </h1>
                <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full" onClick={() => { setNameDraft(store.userName); setEditNameOpen(true) }}>
                  <Edit3 className="h-3.5 w-3.5" />
                </Button>
              </div>
              <p className="text-primary font-semibold" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                {level.name} · {level.sanskritName}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Joined {new Date(store.joinedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="space-y-2 mt-5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{store.totalXp.toLocaleString()} XP</span>
              {nextLevel ? <span>{nextLevel.minXp.toLocaleString()} XP for {nextLevel.name}</span> : <span>Max level</span>}
            </div>
            <Progress
              value={nextLevel ? Math.round(((store.totalXp - level.minXp) / (nextLevel.minXp - level.minXp)) * 100) : 100}
              className="h-2.5 bg-muted"
            />
          </div>
        </div>
      </Card>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatTile icon={<Sparkles className="h-5 w-5" />} label="Dharma XP" value={store.totalXp.toLocaleString()} color="saffron" />
        <StatTile icon={<Flame className="h-5 w-5" />} label="Current Streak" value={`${store.currentStreak} days`} color="vermilion" />
        <StatTile icon={<BookOpen className="h-5 w-5" />} label="Verses Read" value={`${versesRead}/${totalVerseCount}`} color="gold" />
        <StatTile icon={<Award className="h-5 w-5" />} label="Achievements" value={`${earnedAchievements.length}/${ACHIEVEMENTS.length}`} color="saffron" />
      </div>

      {/* Shareable cards */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-semibold flex items-center gap-2" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
              <Share2 className="h-4 w-4 text-primary" /> Shareable Cards
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">Generate beautiful cards to share your journey on Instagram, WhatsApp, or X.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {shareCards.map((c, i) => (
            <button
              key={i}
              onClick={() => setShareCard(c)}
              className="text-left rounded-xl border border-border p-4 hover:border-primary hover:bg-saffron-gradient-soft transition-all group"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-3xl">{c.badge}</span>
                <Share2 className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </div>
              <p className="font-semibold text-sm" style={{ fontFamily: 'var(--font-serif-display), serif' }}>{c.title}</p>
              {c.subtitle && <p className="text-xs text-primary/80">{c.subtitle}</p>}
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{c.body}</p>
            </button>
          ))}
        </div>
      </Card>

      {/* Earned badges row */}
      <Card className="p-5">
        <h2 className="font-semibold mb-3" style={{ fontFamily: 'var(--font-serif-display), serif' }}>Earned Badges</h2>
        {earnedAchievements.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">No badges yet. Begin your quest to earn them.</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {earnedAchievements.map((a) => (
              <div key={a.id} className="flex items-center gap-2 rounded-xl border border-primary/30 bg-saffron-gradient-soft px-3 py-2">
                <span className="text-2xl">{a.icon}</span>
                <div>
                  <p className="text-xs font-semibold leading-tight">{a.title}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">{a.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Reset / danger zone */}
      <Card className="p-5 border-destructive/30">
        <h2 className="font-semibold mb-1 text-destructive" style={{ fontFamily: 'var(--font-serif-display), serif' }}>Reset Progress</h2>
        <p className="text-xs text-muted-foreground mb-3">This will erase all your bookmarks, notes, XP, and progress. This cannot be undone.</p>
        <Button variant="outline" className="text-destructive border-destructive/40 hover:bg-destructive/10" onClick={() => setResetOpen(true)}>
          <RotateCcw className="mr-2 h-4 w-4" /> Reset All Progress
        </Button>
      </Card>

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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change your name</DialogTitle>
          </DialogHeader>
          <Input
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            placeholder="Your name"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                store.setUserName(nameDraft)
                setEditNameOpen(false)
                toast.success('Name updated')
              }
            }}
          />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditNameOpen(false)}>Cancel</Button>
            <Button className="bg-saffron-gradient text-white" onClick={() => { store.setUserName(nameDraft); setEditNameOpen(false); toast.success('Name updated') }}>
              <Check className="mr-1 h-4 w-4" /> Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={resetOpen} onOpenChange={setResetOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-destructive">Reset all progress?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This will permanently delete: {versesRead} verses read, {store.totalXp.toLocaleString()} XP, level {level.name}, {store.bookmarks.length} bookmarks, {Object.keys(store.notes).length} notes, {store.journal.length} journal entries, {store.activities.length} activities, and all challenge progress.
          </p>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setResetOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => {
              store.resetAll()
              setResetOpen(false)
              toast.success('Progress reset. A fresh quest begins.')
            }}>
              <RotateCcw className="mr-1 h-4 w-4" /> Yes, reset everything
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function StatTile({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: 'saffron' | 'gold' | 'vermilion' }) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold text-saffron-gradient mt-0.5">{value}</p>
        </div>
        <span
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{
            background: color === 'saffron' ? 'color-mix(in oklch, var(--saffron) 18%, transparent)' : color === 'gold' ? 'color-mix(in oklch, var(--gold) 22%, transparent)' : 'color-mix(in oklch, var(--vermilion) 18%, transparent)',
            color: color === 'saffron' ? 'var(--saffron)' : color === 'gold' ? 'var(--gold)' : 'var(--vermilion)',
          }}
        >
          {icon}
        </span>
      </div>
    </Card>
  )
}
