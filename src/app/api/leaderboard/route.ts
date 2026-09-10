import { NextResponse } from 'next/server'
import { ConvexHttpClient } from 'convex/browser'
import { api } from '@/convex/_generated/api'
import { resolveSeekerName } from '@/lib/cloud-sync'

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL
const convexClient = convexUrl ? new ConvexHttpClient(convexUrl) : null

const COMMUNITY_SEEKERS = [
  {
    userId: 'community-1',
    userName: 'Arjun Sharma',
    totalXp: 18450,
    currentStreak: 28,
    longestStreak: 45,
    versesRead: 700,
    joinedAt: 1770000000000,
  },
  {
    userId: 'community-2',
    userName: 'Ananya Iyer',
    totalXp: 14200,
    currentStreak: 21,
    longestStreak: 30,
    versesRead: 532,
    joinedAt: 1772000000000,
  },
  {
    userId: 'community-3',
    userName: 'Vikramaditya Sen',
    totalXp: 11800,
    currentStreak: 16,
    longestStreak: 25,
    versesRead: 410,
    joinedAt: 1774000000000,
  },
  {
    userId: 'community-4',
    userName: 'Priya Patel',
    totalXp: 9650,
    currentStreak: 14,
    longestStreak: 18,
    versesRead: 320,
    joinedAt: 1775000000000,
  },
  {
    userId: 'community-5',
    userName: 'Rohan Verma',
    totalXp: 7900,
    currentStreak: 11,
    longestStreak: 14,
    versesRead: 245,
    joinedAt: 1776000000000,
  },
  {
    userId: 'community-6',
    userName: 'Devika Nair',
    totalXp: 6300,
    currentStreak: 9,
    longestStreak: 12,
    versesRead: 198,
    joinedAt: 1777000000000,
  },
  {
    userId: 'community-7',
    userName: 'Keshav Rao',
    totalXp: 4850,
    currentStreak: 7,
    longestStreak: 10,
    versesRead: 154,
    joinedAt: 1778000000000,
  },
  {
    userId: 'community-8',
    userName: 'Sunita Krishnan',
    totalXp: 3400,
    currentStreak: 5,
    longestStreak: 8,
    versesRead: 112,
    joinedAt: 1779000000000,
  },
  {
    userId: 'community-9',
    userName: 'Aditya Deshmukh',
    totalXp: 2650,
    currentStreak: 4,
    longestStreak: 6,
    versesRead: 85,
    joinedAt: 1780000000000,
  },
  {
    userId: 'community-10',
    userName: 'Meera Joshi',
    totalXp: 1900,
    currentStreak: 3,
    longestStreak: 5,
    versesRead: 62,
    joinedAt: 1781000000000,
  },
  {
    userId: 'community-11',
    userName: 'Siddharth Gupta',
    totalXp: 1350,
    currentStreak: 2,
    longestStreak: 3,
    versesRead: 45,
    joinedAt: 1782000000000,
  },
  {
    userId: 'community-12',
    userName: 'Pooja Kulkarni',
    totalXp: 850,
    currentStreak: 1,
    longestStreak: 2,
    versesRead: 28,
    joinedAt: 1783000000000,
  },
]

export const revalidate = 60

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

interface LeaderboardPayload {
  users: LeaderboardUser[]
  isFallback: boolean
}

// In-memory cache to guarantee zero database hits within 60 seconds across all visitors
let cachedLeaderboard: { payload: LeaderboardPayload; timestamp: number } | null = null
const CACHE_TTL_MS = 60 * 1000 // 60 seconds

export async function GET() {
  const now = Date.now()

  // Return cached result if fresh to prevent database load and preserve Disk IO budget
  if (cachedLeaderboard && now - cachedLeaderboard.timestamp < CACHE_TTL_MS) {
    return NextResponse.json(cachedLeaderboard.payload, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        'X-Cache': 'HIT',
      },
    })
  }

  if (!convexClient) {
    return NextResponse.json(
      {
        users: COMMUNITY_SEEKERS.map((s, i) => ({ ...s, rank: i + 1 })),
        isFallback: true,
      },
      {
        headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' },
      }
    )
  }

  try {
    const data = await convexClient.query(api.leaderboard.getLeaderboard, {})

    if (!data || data.length === 0) {
      if (cachedLeaderboard) {
        return NextResponse.json(cachedLeaderboard.payload, {
          headers: { 'Cache-Control': 'public, s-maxage=30', 'X-Cache': 'STALE' },
        })
      }
      return NextResponse.json({
        users: COMMUNITY_SEEKERS.map((s, i) => ({ ...s, rank: i + 1 })),
        isFallback: true,
      })
    }

    const users: LeaderboardUser[] = data.map((row: any, i: number) => {
      const rawName = (row.userName as string)?.trim()
      const userName = resolveSeekerName(rawName, row.userId as string, i)

      return {
        rank: i + 1,
        userId: row.userId as string,
        userName,
        totalXp: (row.totalXp as number) ?? 0,
        currentStreak: (row.currentStreak as number) ?? 0,
        longestStreak: (row.longestStreak as number) ?? 0,
        versesRead: (row.versesRead as number) ?? 0,
        joinedAt: (row.joinedAt as number) ?? null,
      }
    })

    const payload: LeaderboardPayload = { users, isFallback: false }
    cachedLeaderboard = { payload, timestamp: now }

    return NextResponse.json(payload, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        'X-Cache': 'MISS',
      },
    })
  } catch {
    if (cachedLeaderboard) {
      return NextResponse.json(cachedLeaderboard.payload, {
        headers: { 'Cache-Control': 'public, s-maxage=30', 'X-Cache': 'STALE' },
      })
    }
    return NextResponse.json({
      users: COMMUNITY_SEEKERS.map((s, i) => ({ ...s, rank: i + 1 })),
      isFallback: true,
    })
  }
}
