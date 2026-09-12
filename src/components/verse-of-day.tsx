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
    <div className="card-serene p-6 sm:p-8 rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card/95 to-primary/[0.04] relative overflow-hidden transition-all duration-300">
      {/* Decorative ambient subtle circle */}
      <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-primary/5 blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Verse of the Day
          </span>
          <span className="text-xs text-muted-foreground/80 font-medium">
            Chapter {verse.chapter} · Verse {verse.verse}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full hover:bg-muted/60"
            onClick={() => {
              store.toggleBookmark(verse.id)
              toast.success(isBookmarked ? 'Removed bookmark' : 'Verse saved to personal treasury')
            }}
            title={isBookmarked ? 'Remove bookmark' : 'Save verse'}
          >
            <Bookmark className={`h-4 w-4 transition-colors ${isBookmarked ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full hover:bg-muted/60"
            onClick={() => setShareOpen(true)}
            title="Share verse"
          >
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs uppercase tracking-widest text-muted-foreground/70 font-medium" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
          {chapter?.sanskritName} · {chapter?.name}
        </p>

        {/* Sacred Sanskrit Calligraphy */}
        <div className="py-2">
          <p
            className="text-xl sm:text-2xl lg:text-3xl text-foreground font-medium leading-relaxed sm:leading-loose text-center sm:text-left"
            dir="ltr"
            style={{ fontFamily: 'var(--font-serif-display), "Noto Serif Devanagari", serif' }}
          >
            {verse.sanskrit}
          </p>
        </div>

        {/* Transliteration */}
        <p className="text-xs sm:text-sm italic text-muted-foreground/85 leading-relaxed">
          {verse.transliteration}
        </p>

        {/* English Translation */}
        <p className="text-sm sm:text-base text-foreground/90 font-normal leading-relaxed">
          {verse.english}
        </p>

        {/* Commentary/Meaning Pill */}
        {verse.meaning && (
          <div className="p-4 rounded-2xl bg-muted/40 border border-border/40 text-xs sm:text-sm text-muted-foreground leading-relaxed italic">
            {verse.meaning}
          </div>
        )}

        {/* Action pills */}
        <div className="flex flex-wrap gap-2.5 pt-2">
          <Button
            size="sm"
            variant="outline"
            className="rounded-full px-4 text-xs border-border/70 hover:border-primary/40 hover:bg-primary/5 transition-all"
            onClick={() => navigate('guide', { explain: verse.id })}
          >
            <Sparkles className="mr-1.5 h-3.5 w-3.5 text-primary" /> AI Explanation
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="rounded-full px-4 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
            onClick={() => navigate('gita', { chapter: String(verse.chapter), verse: verse.id })}
          >
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
    </div>
  )
}
