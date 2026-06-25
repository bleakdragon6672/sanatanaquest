'use client'

import { useMemo, useState } from 'react'
import { Share2, Bookmark, Sparkles, Loader2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { allVerses, gitaChapters } from '@/lib/gita-data'
import { useStore } from '@/lib/store'
import { useNav } from '@/components/nav-context'
import { ShareCardModal } from '@/components/share-card-modal'
import { toast } from 'sonner'

function getDailyVerse(): (typeof allVerses)[number] {
  // Deterministic verse of the day based on day-of-year
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = now.getTime() - start.getTime()
  const dayOfYear = Math.floor(diff / 86400000)
  return allVerses[dayOfYear % allVerses.length]
}

export function VerseOfDay() {
  const verse = useMemo(() => getDailyVerse(), [])
  const store = useStore()
  const { navigate } = useNav()
  const [shareOpen, setShareOpen] = useState(false)
  const isBookmarked = store.bookmarks.includes(verse.id)
  const chapter = gitaChapters.find((c) => c.number === verse.chapter)

  return (
    <Card className="p-0 overflow-hidden border-0 bg-gradient-to-br from-card via-card to-[color-mix(in_oklch,var(--saffron)_8%,transparent)]">
      <div className="px-5 sm:px-7 pt-5 sm:pt-6 pb-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Badge className="bg-saffron-gradient text-white border-0">
            <Sparkles className="mr-1 h-3 w-3" /> Verse of the Day
          </Badge>
          <span className="text-xs text-muted-foreground">
            Chapter {verse.chapter} · Verse {verse.verse}
          </span>
        </div>
        <div className="flex gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full"
            onClick={() => {
              store.toggleBookmark(verse.id)
              toast.success(isBookmarked ? 'Removed bookmark' : 'Verse bookmarked')
            }}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-primary text-primary' : ''}`} />
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full" onClick={() => setShareOpen(true)}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="px-5 sm:px-7 pb-5 sm:pb-7">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
          {chapter?.sanskritName} · {chapter?.name}
        </p>
        <p
          className="sanskrit-text text-xl sm:text-2xl text-foreground/90 leading-relaxed mb-4"
          dir="ltr"
          style={{ fontFamily: 'var(--font-serif-display), "Noto Serif Devanagari", serif' }}
        >
          {verse.sanskrit}
        </p>
        <p className="text-sm italic text-muted-foreground mb-3">
          {verse.transliteration}
        </p>
        <p className="text-base text-foreground/90 leading-relaxed mb-4">
          {verse.english}
        </p>
        {verse.meaning && (
          <p className="text-sm text-muted-foreground/90 leading-relaxed border-l-2 border-primary/40 pl-3 italic">
            {verse.meaning}
          </p>
        )}
        <div className="flex flex-wrap gap-2 mt-4">
          <Button size="sm" variant="outline" onClick={() => navigate('guide', { explain: verse.id })}>
            <Sparkles className="mr-1 h-3.5 w-3.5" /> AI Explanation
          </Button>
          <Button size="sm" variant="ghost" onClick={() => navigate('gita', { chapter: String(verse.chapter), verse: verse.id })}>
            Read full chapter →
          </Button>
        </div>
      </div>

      <ShareCardModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        title="Verse of the Day"
        subtitle={`Bhagavad Gita ${verse.chapter}.${verse.verse}`}
        body={verse.english}
        footer="Sanatan Quest"
      />
    </Card>
  )
}
