'use client'

import { useState, useEffect, useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Trophy,
  Flame,
  BookOpen,
  Crown,
  Medal,
  Award,
  RefreshCw,
  Users,
  Pencil,
  Check,
  Sparkles,
} from 'lucide-react'
import { SPIRITUAL_LEVELS, useStore } from '@/lib/store'
import { useAuth } from '@/lib/auth-context'
import { updateCloudUserName, formatDisplayNameFromEmail, resolveSeekerName } from '@/lib/cloud-sync'
import { isConvexConfigured } from '@/lib/convex-sync'
import { ConvexLeaderboardBridge } from '@/components/ConvexLeaderboardBridge'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface LeaderboardUser {
  rank: number
  userId: string
  userName: string
  totalXp: number
  currentStreak: number
  longestStreak: number
  versesRead: number
  joinedAt: number | null
}

function getLevel(xp: number) {
  let level = SPIRITUAL_LEVELS[0]
  for (const l of SPIRITUAL_LEVELS) {
    if (xp >= l.minXp) level = l
  }
  return level
}

const RANK_STYLES: Record<number, string> = {
  1: 'from-amber-500/20 via-yellow-500/10 to-transparent border-amber-500/30',
  2: 'from-slate-400/20 via-slate-300/10 to-transparent border-slate-400/30',
  3: 'from-orange-600/20 via-orange-500/10 to-transparent border-orange-500/30',
}

const RANK_ICONS: Record<number, typeof Trophy> = {
  1: Crown,
  2: Medal,
  3: Award,
}

export function LeaderboardView() {
  const { user } = useAuth()
  const store = useStore()
  const [rawUsers, setRawUsers] = useState<LeaderboardUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Name editing dialog state
  const [editNameOpen, setEditNameOpen] = useState(false)
  const [nameDraft, setNameDraft] = useState(store.userName)
  const [savingName, setSavingName] = useState(false)

  async function fetchLeaderboard() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/leaderboard')
      const data = await res.json()
      if (data.error && (!data.users || data.users.length === 0)) {
        setError(data.error)
      }
      setRawUsers(data.users ?? [])
    } catch {
      setError('Failed to load leaderboard')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  // Automatically ensure current user is accurately placed on the leaderboard
  // and that all other users have real, authentic names
  const users = useMemo(() => {
    const list = rawUsers.map((u, i) => ({
      ...u,
      userName: resolveSeekerName(u.userName, u.userId, i),
    }))
    const userIndex = list.findIndex((u) => u.userId === user?.id)

    if (userIndex >= 0) {
      // Ensure current user's live store values and real name are reflected
      list[userIndex] = {
        ...list[userIndex],
        userName: store.userName,
        totalXp: Math.max(list[userIndex].totalXp, store.totalXp),
        currentStreak: Math.max(list[userIndex].currentStreak, store.currentStreak),
        versesRead: Math.max(list[userIndex].versesRead, Object.keys(store.readVerses).length),
      }
    } else if (user) {
      // Add current user to leaderboard if not already returned by server
      list.push({
        rank: 0,
        userId: user.id,
        userName: store.userName,
        totalXp: store.totalXp,
        currentStreak: store.currentStreak,
        longestStreak: store.longestStreak,
        versesRead: Object.keys(store.readVerses).length,
        joinedAt: store.joinedAt,
      })
    }

    // Sort by XP descending and reassign ranks
    list.sort((a, b) => b.totalXp - a.totalXp)
    return list.map((u, i) => ({ ...u, rank: i + 1 }))
  }, [
    rawUsers,
    user?.id,
    store.userName,
    store.totalXp,
    store.currentStreak,
    store.longestStreak,
    store.readVerses,
    store.joinedAt,
  ])

  const myRank = users.find((u) => u.userId === user?.id)
  const myLevel = getLevel(store.totalXp)

  // Name suggestions for public profile
  const nameSuggestions = useMemo(() => {
    const list: string[] = []
    if (user?.user_metadata?.name?.trim()) {
      list.push(user.user_metadata.name.trim())
    }
    if (user?.email) {
      const emailName = formatDisplayNameFromEmail(user.email)
      if (emailName && !list.includes(emailName)) list.push(emailName)
    }
    const firstName = (store.userName !== 'Seeker' ? store.userName : list[0] || 'Arjun').split(' ')[0]
    list.push(`Sadhaka ${firstName}`)
    list.push(`Yogi ${firstName}`)
    return Array.from(new Set(list)).slice(0, 4)
  }, [user, store.userName])

  async function handleSaveName() {
    const trimmed = nameDraft.trim()
    if (!trimmed) {
      toast.error('Please enter a display name')
      return
    }

    setSavingName(true)
    try {
      if (user) {
        const res = await updateCloudUserName(user, trimmed)
        if (!res.success && res.error) {
          toast.error(res.error)
          return
        }
      } else {
        store.setUserName(trimmed)
      }

      toast.success(`Display name updated to "${trimmed}" on the Leaderboard! 🙏`)
      setEditNameOpen(false)
      fetchLeaderboard()
    } catch {
      toast.error('Failed to update name')
    } finally {
      setSavingName(false)
    }
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-8">
      {/* Live Convex WebSocket sync when configured */}
      {isConvexConfigured && (
        <ConvexLeaderboardBridge
          onData={(liveUsers) => {
            setRawUsers(liveUsers)
            setLoading(false)
          }}
        />
      )}

      {/* Header */}
      <div className="card-serene p-6 sm:p-9 rounded-3xl relative overflow-hidden border border-border/60 bg-gradient-to-br from-card via-card/95 to-primary/[0.05]">
        <div className="absolute -right-6 -top-6 opacity-[0.06] pointer-events-none animate-breathe">
          <Trophy className="h-44 w-44 text-primary" />
        </div>
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-3">
            लीडरबोर्ड · Fellowship of Seekers
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 text-foreground" style={{ fontFamily: 'var(--font-cinzel), var(--font-serif-display), serif' }}>
            Dharma Leaderboard
          </h1>
          <p className="text-muted-foreground/90 max-w-xl text-sm sm:text-base leading-relaxed">
            Fellow seekers united on the path of wisdom. Every verse contemplated and every sadhana practice logged gently elevates your spiritual ascent.
          </p>
          <div className="flex items-center gap-4 mt-4 text-xs sm:text-sm text-muted-foreground/80 flex-wrap">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Users className="h-4 w-4 text-primary" /> {users.length} active seeker{users.length !== 1 ? 's' : ''}
            </span>
            {isConvexConfigured && (
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-calm" /> Live Real-time Sync
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchLeaderboard}
              disabled={loading}
              className="rounded-full h-7 gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className={cn('h-3 w-3', loading && 'animate-spin')} />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Your Public Leaderboard Identity Card */}
      <div className="card-serene p-5 rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 via-primary/[0.04] to-transparent relative overflow-hidden shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-primary via-saffron to-gold flex items-center justify-center text-sm font-bold text-white shadow-xs shrink-0">
              {store.userName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-base text-foreground truncate" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                  {store.userName}
                </span>
                <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px] px-2 py-0.5 rounded-full">
                  {myRank ? `Rank #${myRank.rank}` : 'Unranked'}
                </Badge>
                {store.userName === 'Seeker' && (
                  <Badge variant="outline" className="text-[10px] px-2 py-0.5 rounded-full border-amber-500/40 text-amber-600 dark:text-amber-400">
                    Default Name
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground/80 mt-0.5">
                {myLevel.icon} {myLevel.name} · {store.totalXp.toLocaleString()} XP · 🔥 {store.currentStreak}d streak · {Object.keys(store.readVerses).length} verses read
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setNameDraft(store.userName)
              setEditNameOpen(true)
            }}
            className="rounded-full h-8 gap-1.5 text-xs font-medium self-start sm:self-auto border-primary/30 hover:bg-primary/10 shrink-0"
          >
            <Pencil className="h-3.5 w-3.5 text-primary" />
            Edit Public Name
          </Button>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="card-serene p-4 rounded-2xl border border-border/60 bg-card animate-pulse">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 bg-muted rounded" />
                  <div className="h-3 w-48 bg-muted rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && !loading && users.length === 0 && (
        <div className="card-serene p-8 rounded-3xl border border-border/60 bg-card text-center">
          <Trophy className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
          <p className="text-muted-foreground text-sm">{error}</p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Make sure cloud sync is configured and the user_progress table is accessible.
          </p>
        </div>
      )}

      {/* Empty state */}
      {!loading && users.length === 0 && (
        <div className="card-serene p-8 rounded-3xl border border-border/60 bg-card text-center">
          <Trophy className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
          <p className="text-muted-foreground">No seekers on the leaderboard yet.</p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Start reading scriptures and logging practices to appear here.
          </p>
        </div>
      )}

      {/* Leaderboard list */}
      {!loading && users.length > 0 && (
        <div className="space-y-2.5">
          {users.map((u) => {
            const level = getLevel(u.totalXp)
            const isMe = u.userId === user?.id
            const RankIcon = RANK_ICONS[u.rank]

            const displayName = isMe
              ? store.userName
              : resolveSeekerName(u.userName, u.userId, u.rank - 1)

            return (
              <div
                key={u.userId}
                className={cn(
                  'card-serene p-4 sm:p-4.5 rounded-2xl border transition-all duration-300',
                  isMe
                    ? 'border-primary/50 bg-primary/[0.04] shadow-xs'
                    : 'border-border/60 bg-card hover:border-primary/40 hover:shadow-xs',
                  u.rank === 1 && !isMe && 'border-amber-500/30 bg-amber-500/[0.03]',
                  u.rank === 2 && !isMe && 'border-slate-400/30 bg-slate-400/[0.02]',
                  u.rank === 3 && !isMe && 'border-orange-500/30 bg-orange-500/[0.02]',
                )}
              >
                <div className="flex items-center gap-3.5">
                  {/* Rank Badge */}
                  <div
                    className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl font-bold text-sm',
                      u.rank === 1 && 'bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30',
                      u.rank === 2 && 'bg-slate-400/20 text-slate-700 dark:text-slate-300 border border-slate-400/30',
                      u.rank === 3 && 'bg-orange-500/20 text-orange-700 dark:text-orange-400 border border-orange-500/30',
                      u.rank > 3 && 'bg-muted/50 text-muted-foreground/80 font-medium',
                    )}
                  >
                    {u.rank <= 3 && RankIcon ? (
                      <RankIcon className="h-5 w-5" />
                    ) : (
                      u.rank
                    )}
                  </div>

                  {/* Seeker Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm sm:text-base truncate text-foreground" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                        {displayName}
                      </span>
                      {isMe && (
                        <Badge className="text-[10px] px-1.5 py-0 h-4 rounded-full bg-primary text-primary-foreground border-0">
                          You
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 mt-0.5 text-xs text-muted-foreground/80 flex-wrap">
                      <span>{level.icon} {level.name}</span>
                      <span>·</span>
                      <span className="inline-flex items-center gap-1">
                        <Flame className="h-3 w-3 text-orange-500 shrink-0" />
                        {u.currentStreak}d streak
                      </span>
                      <span>·</span>
                      <span className="inline-flex items-center gap-1">
                        <BookOpen className="h-3 w-3 shrink-0 text-primary" />
                        {u.versesRead} verses
                      </span>
                    </div>
                  </div>

                  {/* XP */}
                  <div className="text-right shrink-0">
                    <p className="font-bold text-sm sm:text-base text-primary">
                      {u.totalXp.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-muted-foreground/70">Dharma XP</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Edit Public Display Name Dialog */}
      <Dialog open={editNameOpen} onOpenChange={setEditNameOpen}>
        <DialogContent className="rounded-3xl border border-border/60 bg-card sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
              <Pencil className="h-4 w-4 text-primary" /> Change Public Seeker Name
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <p className="text-xs text-muted-foreground/80 leading-relaxed">
              This name is publicly displayed on the Dharma Leaderboard. Choose your real name, first name, or a spiritual alias.
            </p>
            <div>
              <label className="text-xs font-medium text-foreground block mb-1.5">
                Display Name
              </label>
              <Input
                value={nameDraft}
                onChange={(e) => setNameDraft(e.target.value)}
                placeholder="Enter your name (e.g. Arjun, Priya, Samarth)"
                maxLength={40}
                className="rounded-2xl border-border/60 bg-background"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveName()
                }}
              />
            </div>
            {nameSuggestions.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[11px] text-muted-foreground/80 block font-medium">Quick suggestions:</span>
                <div className="flex flex-wrap gap-1.5">
                  {nameSuggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setNameDraft(s)}
                      className="text-xs px-3 py-1 rounded-full border border-border/60 bg-muted/20 hover:border-primary/50 text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="ghost" onClick={() => setEditNameOpen(false)} disabled={savingName} className="rounded-full">
              Cancel
            </Button>
            <Button
              onClick={handleSaveName}
              disabled={savingName || !nameDraft.trim()}
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Check className="mr-1.5 h-4 w-4" /> Save Name
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

