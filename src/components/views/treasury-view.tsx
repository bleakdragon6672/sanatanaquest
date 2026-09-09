'use client'

import { useState } from 'react'
import {
  Bookmark, BookmarkCheck, Highlighter, NotebookPen, Sparkles, Trash2,
  ExternalLink, Share2, Search, Filter, BookOpen, ChevronRight, RefreshCw, Pencil, Check
} from 'lucide-react'
import { useStore, PASTEL_HIGHLIGHTS, type PastelHighlightColor } from '@/lib/store'
import { useNav, ViewKey } from '@/components/nav-context'
import { getVerse, type Verse } from '@/lib/gita-data'
import { getUpanishadVerse, type UpanishadVerse } from '@/lib/upanishad-data'
import { getChalisaVerse, type ChalisaVerse } from '@/lib/hanuman-chalisa-data'
import { getBaanVerse, type BaanVerse } from '@/lib/bajrang-baan-data'
import { getTandavVerse, type TandavVerse } from '@/lib/shiv-tandav-data'
import { getAshtavakraVerse, type AshtavakraVerse } from '@/lib/ashtavakra-gita-data'
import { getYogaSutra, type YogaSutraVerse } from '@/lib/yoga-sutras-data'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { ShareCardModal } from '@/components/share-card-modal'
import { OmSymbol, LotusIcon } from '@/components/spiritual-icons'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export interface UnifiedVerseDetail {
  id: string
  sourceKey: 'gita' | 'upanishad' | 'chalisa' | 'baan' | 'tandav' | 'ashtavakra' | 'yogasutras'
  sourceTitle: string
  sanskrit: string
  transliteration?: string
  english: string
  meaning?: string
  commentary?: string
  view: ViewKey
  params: Record<string, string>
}

export function resolveVerseDetail(id: string): UnifiedVerseDetail | null {
  // 1. Check Upanishads (e.g. isha.0.1, katha.1.1.1, mandukya.0.1)
  const uv = getUpanishadVerse(id)
  if (uv) {
    const upanishadId = id.split('.')[0]
    return {
      id,
      sourceKey: 'upanishad',
      sourceTitle: `Upanishads (${upanishadId})`,
      sanskrit: uv.sanskrit,
      transliteration: uv.transliteration,
      english: uv.english,
      commentary: uv.commentary,
      view: 'upanishad',
      params: { upanishad: upanishadId, verse: id },
    }
  }

  // 2. Check Hanuman Chalisa (e.g. v1, v5)
  const cv = getChalisaVerse(id)
  if (cv) {
    return {
      id,
      sourceKey: 'chalisa',
      sourceTitle: 'Hanuman Chalisa',
      sanskrit: cv.awadhi,
      transliteration: cv.transliteration,
      english: cv.english,
      commentary: cv.commentary,
      view: 'chalisa',
      params: { verse: id },
    }
  }

  // 3. Check Bajrang Baan (e.g. b1, b5)
  const bv = getBaanVerse(id)
  if (bv) {
    return {
      id,
      sourceKey: 'baan',
      sourceTitle: 'Bajrang Baan',
      sanskrit: bv.awadhi,
      transliteration: bv.transliteration,
      english: bv.english,
      commentary: bv.commentary,
      view: 'baan',
      params: { verse: id },
    }
  }

  // 4. Check Shiv Tandav Stotram (e.g. t1, t5)
  const tv = getTandavVerse(id)
  if (tv) {
    return {
      id,
      sourceKey: 'tandav',
      sourceTitle: 'Shiv Tandav Stotram',
      sanskrit: tv.sanskrit,
      transliteration: tv.transliteration,
      english: tv.english,
      commentary: tv.commentary,
      view: 'tandav',
      params: { verse: id },
    }
  }

  // 5. Check Bhagavad Gita (e.g. 1.1, 2.47, 18.66)
  const gv = getVerse(id)
  if (gv) {
    return {
      id,
      sourceKey: 'gita',
      sourceTitle: `Bhagavad Gita ${gv.chapter}.${gv.verse}`,
      sanskrit: gv.sanskrit,
      transliteration: gv.transliteration,
      english: gv.english,
      meaning: gv.meaning,
      commentary: gv.commentary,
      view: 'gita',
      params: { chapter: String(gv.chapter), verse: id },
    }
  }

  // 6. Check Ashtavakra Gita
  const av = getAshtavakraVerse(id)
  if (av) {
    return {
      id,
      sourceKey: 'ashtavakra',
      sourceTitle: `Ashtavakra Gita Ch.${av.chapter} v.${av.number}`,
      sanskrit: av.sanskrit,
      transliteration: av.transliteration,
      english: av.english,
      view: 'ashtavakragita',
      params: { chapter: `ch${av.chapter}`, verse: id },
    }
  }

  // 7. Check Yoga Sutras
  const ysv = getYogaSutra(id)
  if (ysv) {
    return {
      id,
      sourceKey: 'yogasutras',
      sourceTitle: `Yoga Sutras Pada ${ysv.pada} Sutra ${ysv.number}`,
      sanskrit: ysv.sanskrit,
      transliteration: ysv.transliteration,
      english: ysv.english,
      commentary: ysv.commentary,
      view: 'yogasutras',
      params: { pada: `pada${ysv.pada}`, verse: id },
    }
  }

  // Generic fallback if verse metadata was created dynamically
  return {
    id,
    sourceKey: 'gita',
    sourceTitle: `Verse ${id}`,
    sanskrit: '',
    english: 'Verse details available in reader view.',
    view: 'gita',
    params: {},
  }
}

type TabType = 'bookmarks' | 'highlights' | 'notes'
type SourceFilter = 'all' | 'gita' | 'upanishad' | 'ashtavakra' | 'yogasutras' | 'devotional'

export function TreasuryView() {
  const store = useStore()
  const { navigate } = useNav()
  const [activeTab, setActiveTab] = useState<TabType>('bookmarks')
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('all')
  const [colorFilter, setColorFilter] = useState<PastelHighlightColor | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)
  const [noteDraft, setNoteDraft] = useState('')
  const [shareVerse, setShareVerse] = useState<UnifiedVerseDetail | null>(null)

  // Get active item IDs based on tab
  const rawIds =
    activeTab === 'bookmarks'
      ? store.bookmarks
      : activeTab === 'highlights'
        ? store.highlights
        : Object.keys(store.notes)

  // Resolve verse details
  const resolvedVerses = rawIds
    .map((id) => resolveVerseDetail(id))
    .filter((v): v is UnifiedVerseDetail => v !== null)

  // Apply source filter & search query
  const filteredVerses = resolvedVerses.filter((v) => {
    // Color filter for highlights
    if (activeTab === 'highlights' && colorFilter !== 'all') {
      const vColor = store.highlightColors?.[v.id] || 'saffron'
      if (vColor !== colorFilter) return false
    }

    // Source filter
    if (sourceFilter === 'gita' && v.sourceKey !== 'gita') return false
    if (sourceFilter === 'upanishad' && v.sourceKey !== 'upanishad') return false
    if (sourceFilter === 'ashtavakra' && v.sourceKey !== 'ashtavakra') return false
    if (sourceFilter === 'yogasutras' && v.sourceKey !== 'yogasutras') return false
    if (
      sourceFilter === 'devotional' &&
      v.sourceKey !== 'chalisa' &&
      v.sourceKey !== 'baan' &&
      v.sourceKey !== 'tandav'
    )
      return false

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      const matchesId = v.id.toLowerCase().includes(q)
      const matchesTitle = v.sourceTitle.toLowerCase().includes(q)
      const matchesEnglish = v.english.toLowerCase().includes(q)
      const matchesSanskrit = v.sanskrit.toLowerCase().includes(q)
      const noteText = store.notes[v.id] ?? ''
      const matchesNote = noteText.toLowerCase().includes(q)
      return matchesId || matchesTitle || matchesEnglish || matchesSanskrit || matchesNote
    }

    return true
  })

  function handleSaveNote(verseId: string) {
    store.setNote(verseId, noteDraft)
    setEditingNoteId(null)
    toast.success('Note updated')
  }

  return (
    <div className="space-y-6">
      {/* Sacred Header */}
      <Card className="p-6 sm:p-8 relative overflow-hidden card-sacred-glow">
        <div className="absolute -right-8 -top-8 opacity-10 pointer-events-none">
          <LotusIcon size={200} className="text-primary" />
        </div>
        <div className="relative">
          <Badge className="mb-3 bg-saffron-gradient text-white border-0 text-sm px-3 py-1">
            कोशः · Personal Treasury
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
            Your Spiritual Sanctuary
          </h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Your personal collection of bookmarked verses, highlights, and reflective notes across all scriptures —
            the Bhagavad Gita, Upanishads, Yoga Sutras, Ashtavakra Gita, and devotional hymns.
          </p>

          <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-border/50 text-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-saffron-gradient-soft border border-primary/20">
              <Bookmark className="h-4 w-4 text-primary" />
              <span className="font-semibold">{store.bookmarks.length}</span> Bookmarks
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-saffron-gradient-soft border border-primary/20">
              <Highlighter className="h-4 w-4 text-primary" />
              <span className="font-semibold">{store.highlights.length}</span> Highlights
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-saffron-gradient-soft border border-primary/20">
              <NotebookPen className="h-4 w-4 text-primary" />
              <span className="font-semibold">{Object.keys(store.notes).length}</span> Personal Notes
            </div>
          </div>
        </div>
      </Card>

      {/* Main Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeTab === 'bookmarks' ? 'default' : 'outline'}
            onClick={() => setActiveTab('bookmarks')}
            className={cn(
              'rounded-full gap-2 transition-all',
              activeTab === 'bookmarks' && 'bg-saffron-gradient text-white shadow-sm'
            )}
          >
            <Bookmark className="h-4 w-4" />
            <span>Bookmarked Verses</span>
            <Badge variant="secondary" className="ml-1 text-[10px]">{store.bookmarks.length}</Badge>
          </Button>
          <Button
            variant={activeTab === 'highlights' ? 'default' : 'outline'}
            onClick={() => setActiveTab('highlights')}
            className={cn(
              'rounded-full gap-2 transition-all',
              activeTab === 'highlights' && 'bg-saffron-gradient text-white shadow-sm'
            )}
          >
            <Highlighter className="h-4 w-4" />
            <span>Highlights</span>
            <Badge variant="secondary" className="ml-1 text-[10px]">{store.highlights.length}</Badge>
          </Button>
          <Button
            variant={activeTab === 'notes' ? 'default' : 'outline'}
            onClick={() => setActiveTab('notes')}
            className={cn(
              'rounded-full gap-2 transition-all',
              activeTab === 'notes' && 'bg-saffron-gradient text-white shadow-sm'
            )}
          >
            <NotebookPen className="h-4 w-4" />
            <span>Personal Notes</span>
            <Badge variant="secondary" className="ml-1 text-[10px]">{Object.keys(store.notes).length}</Badge>
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved items…"
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-full border border-input bg-background focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      {/* Source & Color Filters */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-muted-foreground mr-1 flex items-center gap-1">
            <Filter className="h-3 w-3" /> Source:
          </span>
          {(['all', 'gita', 'upanishad', 'ashtavakra', 'yogasutras', 'devotional'] as const).map((sf) => (
            <Button
              key={sf}
              size="sm"
              variant={sourceFilter === sf ? 'default' : 'ghost'}
              className={cn(
                'h-7 rounded-full text-xs capitalize',
                sourceFilter === sf && 'bg-primary text-primary-foreground'
              )}
              onClick={() => setSourceFilter(sf)}
            >
              {sf === 'devotional' ? 'Chalisa & Stotram' : sf === 'ashtavakra' ? 'Ashtavakra' : sf === 'yogasutras' ? 'Yoga Sutras' : sf}
            </Button>
          ))}
        </div>

        {activeTab === 'highlights' && (
          <div className="flex flex-wrap items-center gap-1.5 text-xs pt-1 border-t border-border/40">
            <span className="text-muted-foreground mr-1 flex items-center gap-1">
              <Highlighter className="h-3 w-3 text-primary" /> Pastel Hue:
            </span>
            <Button
              size="sm"
              variant={colorFilter === 'all' ? 'default' : 'ghost'}
              className={cn('h-7 rounded-full text-xs', colorFilter === 'all' && 'bg-primary text-primary-foreground')}
              onClick={() => setColorFilter('all')}
            >
              All ({store.highlights.length})
            </Button>
            {(['saffron', 'lotus', 'vermilion', 'ash', 'teal'] as PastelHighlightColor[]).map((c) => {
              const meta = PASTEL_HIGHLIGHTS[c]
              const count = store.highlights.filter((id) => (store.highlightColors?.[id] || 'saffron') === c).length
              return (
                <Button
                  key={c}
                  size="sm"
                  variant={colorFilter === c ? 'default' : 'ghost'}
                  className={cn(
                    'h-7 rounded-full text-xs gap-1.5',
                    colorFilter === c && 'bg-primary text-primary-foreground'
                  )}
                  onClick={() => setColorFilter(c)}
                >
                  <span className={cn('w-2 h-2 rounded-full', meta.dotClass)} />
                  <span>{meta.name}</span>
                  <span className="opacity-60 text-[10px]">({count})</span>
                </Button>
              )
            })}
          </div>
        )}
      </div>

      {/* Verse List */}
      {filteredVerses.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-saffron-gradient-soft flex items-center justify-center">
            <OmSymbol size={32} className="opacity-50" />
          </div>
          <h3 className="font-semibold text-lg mb-1" style={{ fontFamily: 'var(--font-cinzel), var(--font-serif-display), serif' }}>
            {activeTab === 'bookmarks'
              ? 'No Bookmarked Verses Yet'
              : activeTab === 'highlights'
                ? 'No Highlighted Verses Found'
                : 'No Personal Notes Yet'}
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
            {activeTab === 'bookmarks'
              ? 'Click the bookmark icon on any verse while reading scriptures to save it to your personal treasury.'
              : activeTab === 'highlights'
                ? 'Highlight profound verses in your chosen sacred pastel hues to review them anytime in your sanctuary.'
                : 'Add personal reflections and notes to verses as you read.'}
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Button onClick={() => navigate('gita')} className="bg-saffron-gradient text-white gap-2">
              <BookOpen className="h-4 w-4" /> Read Bhagavad Gita
            </Button>
            <Button variant="outline" onClick={() => navigate('upanishad')}>
              Read Upanishads
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredVerses.map((v) => {
            const isBookmarked = store.bookmarks.includes(v.id)
            const isHighlighted = store.highlights.includes(v.id)
            const highlightColor = store.highlightColors?.[v.id] || 'saffron'
            const highlightMeta = PASTEL_HIGHLIGHTS[highlightColor] || PASTEL_HIGHLIGHTS.saffron
            const noteText = store.notes[v.id]
            const isEditingThisNote = editingNoteId === v.id

            return (
              <Card
                key={v.id}
                className={cn(
                  'p-5 sm:p-6 relative overflow-hidden transition-all border group',
                  isHighlighted ? highlightMeta.cardClass : 'hover:border-primary/30'
                )}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className="bg-saffron-gradient text-white border-0 font-mono text-xs">
                      {v.id}
                    </Badge>
                    <Badge variant="outline" className="text-xs" style={{ fontFamily: 'var(--font-cinzel), sans-serif' }}>
                      {v.sourceTitle}
                    </Badge>
                    {isBookmarked && (
                      <Badge variant="secondary" className="text-[10px] gap-1">
                        <BookmarkCheck className="h-3 w-3 text-primary" /> Bookmarked
                      </Badge>
                    )}
                    {isHighlighted && (
                      <Badge variant="outline" className={cn('text-[10px] font-medium border gap-1 shadow-xs', highlightMeta.textClass, highlightMeta.borderClass)}>
                        <span className={cn('w-1.5 h-1.5 rounded-full', highlightMeta.dotClass)} />
                        {highlightMeta.name}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-muted-foreground hover:text-primary"
                      title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                      onClick={() => {
                        store.toggleBookmark(v.id)
                        toast.success(isBookmarked ? 'Removed from Treasury' : 'Saved to Treasury')
                      }}
                    >
                      {isBookmarked ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-muted-foreground hover:text-primary"
                      title="Share verse card"
                      onClick={() => setShareVerse(v)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 text-xs"
                      onClick={() => navigate(v.view, v.params)}
                    >
                      <span>Open</span>
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Sanskrit & English Content */}
                <div className="space-y-2 mb-4">
                  {v.sanskrit && (
                    <p
                      className="text-lg sm:text-xl font-medium leading-[2.2] text-foreground/90"
                      style={{ fontFamily: 'var(--font-devanagari), "Noto Serif Devanagari", serif', whiteSpace: 'pre-line', letterSpacing: '0.025em' }}
                    >
                      {v.sanskrit}
                    </p>
                  )}
                  {v.transliteration && (
                    <p className="text-base italic text-muted-foreground leading-relaxed" style={{ fontFamily: 'var(--font-cormorant), var(--font-serif), Georgia, serif', whiteSpace: 'pre-line' }}>{v.transliteration}</p>
                  )}
                  <p className="text-base sm:text-lg text-foreground/85 leading-relaxed" style={{ fontFamily: 'var(--font-cormorant), var(--font-serif), Georgia, serif', whiteSpace: 'pre-line' }}>{v.english}</p>
                </div>

                {/* Note Section */}
                {noteText && !isEditingThisNote && (
                  <div className="mt-3 p-3.5 rounded-xl bg-saffron-gradient-soft border border-primary/20 relative">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-primary flex items-center gap-1">
                        <NotebookPen className="h-3 w-3" /> Personal Note
                      </span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 text-muted-foreground hover:text-primary"
                        onClick={() => {
                          setEditingNoteId(v.id)
                          setNoteDraft(noteText)
                        }}
                      >
                        <Pencil className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-foreground/90 whitespace-pre-wrap leading-relaxed">{noteText}</p>
                  </div>
                )}

                {/* Inline Note Editor */}
                {isEditingThisNote && (
                  <div className="mt-3 p-3.5 rounded-xl bg-muted/40 border border-border">
                    <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                      <NotebookPen className="h-3 w-3" /> Edit Personal Note
                    </p>
                    <Textarea
                      value={noteDraft}
                      onChange={(e) => setNoteDraft(e.target.value)}
                      placeholder="Write your personal reflection on this verse…"
                      className="min-h-[90px] text-xs bg-background mb-2"
                    />
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" onClick={() => setEditingNoteId(null)} className="h-7 text-xs">
                        Cancel
                      </Button>
                      <Button size="sm" onClick={() => handleSaveNote(v.id)} className="h-7 text-xs bg-saffron-gradient text-white gap-1">
                        <Check className="h-3 w-3" /> Save Note
                      </Button>
                    </div>
                  </div>
                )}

                {/* Quick Add Note Button if no note exists */}
                {!noteText && !isEditingThisNote && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="mt-2 text-xs text-muted-foreground hover:text-primary gap-1 px-2 h-7"
                    onClick={() => {
                      setEditingNoteId(v.id)
                      setNoteDraft('')
                    }}
                  >
                    <NotebookPen className="h-3 w-3" /> Add Reflection Note
                  </Button>
                )}
              </Card>
            )
          })}
        </div>
      )}

      {/* Share Modal */}
      {shareVerse && (
        <ShareCardModal
          open={!!shareVerse}
          onClose={() => setShareVerse(null)}
          title={shareVerse.sourceTitle}
          subtitle={shareVerse.transliteration}
          body={shareVerse.english}
          footer="Sanatan Quest Treasury"
        />
      )}
    </div>
  )
}
