import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-client'

export async function GET() {
  if (!supabase) {
    return NextResponse.json({ users: [], error: 'Cloud sync not configured' })
  }

  const { data, error } = await supabase
    .from('leaderboard_public')
    .select('user_id, user_name, total_xp, current_streak, longest_streak, read_verses, joined_at')
    .order('total_xp', { ascending: false })
    .limit(100)

  if (error) {
    return NextResponse.json({ users: [], error: error.message })
  }

  const users = (data ?? []).map((row, i) => {
    const readVerses = row.read_verses as Record<string, number> | null
    const versesRead = readVerses ? Object.keys(readVerses).length : 0
    return {
      rank: i + 1,
      userId: row.user_id as string,
      userName: (row.user_name as string) || 'Seeker',
      totalXp: (row.total_xp as number) ?? 0,
      currentStreak: (row.current_streak as number) ?? 0,
      longestStreak: (row.longest_streak as number) ?? 0,
      versesRead,
      joinedAt: row.joined_at as number | null,
    }
  })

  return NextResponse.json({ users })
}
