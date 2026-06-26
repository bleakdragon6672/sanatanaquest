'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Trophy, Flame, BookOpen, Crown, Medal, Award, RefreshCw, Users } from 'lucide-react'
import { SPIRITUAL_LEVELS } from '@/lib/store'
import { useAuth } from '@/lib/auth-context'
import { cn } from '@/lib/utils'

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

function getProgressToNext(xp: number) {
  const currentIdx = SPIRITUAL_LEVELS.findIndex((l) => l.minXp > xp) - 1
  const current = SPIRITUAL_LEVELS[currentIdx >= 0 ? currentIdx : 0]
  const next = SPIRITUAL_LEVELS[currentIdx + 1]
  if (!next) return { current, next: null, pct: 100 }
  const pct = Math.round(((xp - current.minXp) / (next.minXp - current.minXp)) * 100)
  return { current, next, pct }
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
  const [users, setUsers] = useState<LeaderboardUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function fetchLeaderboard() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/leaderboard')
      const data = await res.json()
      if (data.error) {
        setError(data.error)
      }
      setUsers(data.users ?? [])
    } catch {
      setError('Failed to load leaderboard')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const myRank = users.find((u) => u.userId === user?.id)

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <Card className="p-6 relative overflow-hidden border-0 bg-gradient-to-br from-[color-mix(in_oklch,var(--saffron)_16%,transparent)] to-card">
        <div className="absolute -right-6 -top-6 opacity-10 pointer-events-none">
          <Trophy className="h-32 w-32 text-primary" />
        </div>
        <div className="relative">
          <Badge className="mb-2 bg-saffron-gradient text-white border-0">लीडरबोर्ड</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
            Dharma Leaderboard
          </h1>
          <p className="text-muted-foreground mt-2 max-w-xl">
            Seekers ranked by their spiritual XP. Every verse read, every practice logged
            — all contribute to your journey upward.
          </p>
          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-4 w-4 text-primary" /> {users.length} seeker{users.length !== 1 ? 's' : ''}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchLeaderboard}
              disabled={loading}
              className="h-7 gap-1 text-xs"
            >
              <RefreshCw className={cn('h-3 w-3', loading && 'animate-spin')} />
              Refresh
            </Button>
          </div>
        </div>
      </Card>

      {/* Your rank highlight */}
      {myRank && (
        <Card className="p-4 border-primary/30 bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-saffron-gradient text-white font-bold text-sm">
              #{myRank.rank}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">Your Current Rank</p>
              <p className="text-xs text-muted-foreground">
                {getLevel(myRank.totalXp).icon} {myRank.totalXp.toLocaleString()} XP · {myRank.versesRead} verses read
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Loading state */}
      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="p-4 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 bg-muted rounded" />
                  <div className="h-3 w-48 bg-muted rounded" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <Card className="p-8 text-center">
          <Trophy className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
          <p className="text-muted-foreground text-sm">{error}</p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Make sure cloud sync is configured and the user_progress table is accessible.
          </p>
        </Card>
      )}

      {/* Empty state */}
      {!loading && !error && users.length === 0 && (
        <Card className="p-8 text-center">
          <Trophy className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
          <p className="text-muted-foreground">No seekers on the leaderboard yet.</p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Start reading scriptures and logging practices to appear here.
          </p>
        </Card>
      )}

      {/* Leaderboard list */}
      {!loading && users.length > 0 && (
        <div className="space-y-2">
          {users.map((u) => {
            const level = getLevel(u.totalXp)
            const isMe = u.userId === user?.id
            const RankIcon = RANK_ICONS[u.rank]
            const rankStyle = RANK_STYLES[u.rank]

            return (
              <Card
                key={u.userId}
                className={cn(
                  'p-4 transition-all hover:shadow-md',
                  isMe && 'ring-1 ring-primary/40',
                  rankStyle && `bg-gradient-to-r ${rankStyle} border`,
                )}
              >
                <div className="flex items-center gap-3">
                  {/* Rank */}
                  <div
                    className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-sm',
                      u.rank === 1 && 'bg-amber-500 text-white shadow-lg shadow-amber-500/30',
                      u.rank === 2 && 'bg-slate-400 text-white shadow-md',
                      u.rank === 3 && 'bg-orange-600 text-white shadow-md',
                      u.rank > 3 && 'bg-muted text-muted-foreground',
                    )}
                  >
                    {u.rank <= 3 && RankIcon ? (
                      <RankIcon className="h-5 w-5" />
                    ) : (
                      u.rank
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm truncate">
                        {u.userName}
                      </span>
                      {isMe && (
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 border-primary/40 text-primary">
                          You
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                      <span>{level.icon} {level.name}</span>
                      <span>·</span>
                      <span className="inline-flex items-center gap-1">
                        <Flame className="h-3 w-3 text-orange-500" />
                        {u.currentStreak}d streak
                      </span>
                      <span>·</span>
                      <span className="inline-flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {u.versesRead} verses
                      </span>
                    </div>
                  </div>

                  {/* XP */}
                  <div className="text-right shrink-0">
                    <p className="font-bold text-sm text-primary">
                      {u.totalXp.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-muted-foreground">XP</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
