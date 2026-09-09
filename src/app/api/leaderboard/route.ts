import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-client'
import { resolveSeekerName } from '@/lib/cloud-sync'

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

export async function GET() {
  if (!supabase) {
    // Return community seekers if Supabase is unconfigured
    return NextResponse.json({
      users: COMMUNITY_SEEKERS.map((s, i) => ({ ...s, rank: i + 1 })),
      isFallback: true,
    })
  }

  try {
    const { data, error } = await supabase
      .from('leaderboard_public')
      .select('user_id, user_name, total_xp, current_streak, longest_streak, read_verses, joined_at')
      .order('total_xp', { ascending: false })
      .limit(100)

    if (error || !data || data.length === 0) {
      // Fallback to community seekers if database is empty or view returns error
      return NextResponse.json({
        users: COMMUNITY_SEEKERS.map((s, i) => ({ ...s, rank: i + 1 })),
        isFallback: true,
      })
    }

    const users = data.map((row, i) => {
      const readVerses = row.read_verses as Record<string, number> | null
      const versesRead = readVerses ? Object.keys(readVerses).length : 0
      const rawName = (row.user_name as string)?.trim()
      // Resolves to custom name if set, or deterministically assigned authentic human name
      const userName = resolveSeekerName(rawName, row.user_id as string, i)

      return {
        rank: i + 1,
        userId: row.user_id as string,
        userName,
        totalXp: (row.total_xp as number) ?? 0,
        currentStreak: (row.current_streak as number) ?? 0,
        longestStreak: (row.longest_streak as number) ?? 0,
        versesRead,
        joinedAt: row.joined_at as number | null,
      }
    })

    return NextResponse.json({ users, isFallback: false })
  } catch {
    return NextResponse.json({
      users: COMMUNITY_SEEKERS.map((s, i) => ({ ...s, rank: i + 1 })),
      isFallback: true,
    })
  }
}
