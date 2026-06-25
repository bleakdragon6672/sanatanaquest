'use client'

import { useState, useMemo } from 'react'
import { Search as SearchIcon, Sparkles, BookOpen } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { findVersesByKeyword, topicIndex, gitaChapters, allVerses, type Verse } from '@/lib/gita-data'
import { useNav } from '@/components/nav-context'
import { useStore } from '@/lib/store'
import { Bookmark } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SearchView() {
  const { navigate } = useNav()
  const store = useStore()
  const [query, setQuery] = useState('')
  const [searched, setSearched] = useState(false)

  const results = useMemo(() => {
    if (!query.trim()) return []
    const kw = query.trim()
    // Search across verses
    const verseResults = findVersesByKeyword(kw).slice(0, 30)
    // Search chapters
    const chapterResults = gitaChapters
      .filter((c) => c.name.toLowerCase().includes(kw.toLowerCase()) || c.theme.toLowerCase().includes(kw.toLowerCase()) || c.summary.toLowerCase().includes(kw.toLowerCase()))
      .map((c) => ({ type: 'chapter' as const, chapter: c }))
    // Topic matches
    const topicResults = topicIndex.filter((t) => t.topic.toLowerCase().includes(kw.toLowerCase()))
    return { verseResults, chapterResults, topicResults }
  }, [query])

  return (
    <div className="space-y-5">
      <Card className="p-6 relative overflow-hidden border-0 bg-gradient-to-br from-[color-mix(in_oklch,var(--saffron)_16%,transparent)] to-card">
        <div className="absolute -right-6 -top-6 opacity-10 pointer-events-none">
          <SearchIcon className="h-40 w-40 text-primary" />
        </div>
        <div className="relative">
          <Badge className="mb-2 bg-saffron-gradient text-white border-0">
            <SearchIcon className="mr-1 h-3 w-3" /> Search the Gita
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
            Find Any Verse, Any Topic
          </h1>
          <p className="text-muted-foreground mt-1 max-w-2xl">
            Search by keyword (karma, fear, anger, dharma), chapter name, or topic. The Gita's wisdom is at your fingertips.
          </p>
        </div>
      </Card>

      <Card className="p-5">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSearched(true)
            }}
            placeholder="Search verses, chapters, topics…"
            className="pl-10 h-12 text-base"
            autoFocus
          />
        </div>
        {!searched && (
          <div className="mt-4">
            <p className="text-xs text-muted-foreground mb-2">Quick topics:</p>
            <div className="flex flex-wrap gap-1.5">
              {topicIndex.slice(0, 10).map((t) => (
                <button
                  key={t.topic}
                  onClick={() => { setQuery(t.topic); setSearched(true) }}
                  className="px-2.5 py-1 rounded-full text-xs bg-saffron-gradient-soft text-primary hover:bg-saffron-gradient hover:text-white transition-colors"
                >
                  {t.topic}
                </button>
              ))}
            </div>
          </div>
        )}
      </Card>

      {searched && query && results && (
        <div className="space-y-5">
          {/* Topic matches */}
          {results.topicResults.length > 0 && (
            <Card className="p-5">
              <h2 className="font-semibold mb-3" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                <Sparkles className="inline h-4 w-4 mr-2 text-primary" />
                Topic Matches
              </h2>
              <div className="space-y-3">
                {results.topicResults.map((t) => (
                  <div key={t.topic} className="rounded-xl border border-border p-3 hover:border-primary/40">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{t.topic}</h3>
                      <Badge variant="secondary" className="text-[10px]">{t.verseIds.length} verses</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{t.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {t.verseIds.map((id) => (
                        <button
                          key={id}
                          onClick={() => navigate('guide', { explain: id })}
                          className="px-2 py-1 rounded-md text-xs bg-saffron-gradient-soft text-primary hover:bg-saffron-gradient hover:text-white"
                        >
                          {id}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Chapter matches */}
          {results.chapterResults.length > 0 && (
            <Card className="p-5">
              <h2 className="font-semibold mb-3" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                <BookOpen className="inline h-4 w-4 mr-2 text-primary" />
                Chapter Matches
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {results.chapterResults.map(({ chapter }) => (
                  <button
                    key={chapter.number}
                    onClick={() => navigate('gita', { chapter: String(chapter.number) })}
                    className="text-left rounded-xl border border-border p-3 hover:border-primary/40 hover:bg-saffron-gradient-soft"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl font-bold text-saffron-gradient" style={{ fontFamily: 'var(--font-serif-display), serif' }}>{chapter.number}</span>
                      <h3 className="font-semibold text-sm">{chapter.name}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{chapter.theme}</p>
                  </button>
                ))}
              </div>
            </Card>
          )}

          {/* Verse matches */}
          <Card className="p-5">
            <h2 className="font-semibold mb-3" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
              Verse Matches
              <Badge variant="secondary" className="ml-2 text-[10px]">{results.verseResults.length}</Badge>
            </h2>
            {results.verseResults.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">
                No verses matched "{query}". Try another keyword.
              </p>
            ) : (
              <div className="space-y-3 max-h-[700px] overflow-y-auto pr-2">
                {results.verseResults.map((v) => (
                  <VerseSearchResult key={v.id} verse={v} isBookmarked={store.bookmarks.includes(v.id)} />
                ))}
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  )
}

function VerseSearchResult({ verse, isBookmarked }: { verse: Verse; isBookmarked: boolean }) {
  const { navigate } = useNav()
  const store = useStore()
  const chapter = gitaChapters.find((c) => c.number === verse.chapter)
  return (
    <div className="rounded-xl border border-border p-4 hover:border-primary/40 hover:bg-saffron-gradient-soft/50 transition-all">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs">{verse.chapter}.{verse.verse}</Badge>
          <span className="text-xs text-muted-foreground">{chapter?.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7"
            onClick={() => store.toggleBookmark(verse.id)}
          >
            <Bookmark className={cn('h-3.5 w-3.5', isBookmarked && 'fill-primary text-primary')} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-7"
            onClick={() => navigate('guide', { explain: verse.id })}
          >
            <Sparkles className="mr-1 h-3 w-3 text-primary" /> Explain
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-7"
            onClick={() => navigate('gita', { chapter: String(verse.chapter), verse: verse.id })}
          >
            Read →
          </Button>
        </div>
      </div>
      <p className="sanskrit-text text-base mb-1" style={{ fontFamily: 'var(--font-serif-display), "Noto Serif Devanagari", serif', whiteSpace: 'pre-line' }}>
        {verse.sanskrit}
      </p>
      <p className="text-xs italic text-muted-foreground mb-1">{verse.transliteration}</p>
      <p className="text-sm text-foreground/85">{verse.english}</p>
    </div>
  )
}
