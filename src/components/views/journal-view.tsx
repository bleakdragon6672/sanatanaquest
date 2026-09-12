'use client'

import { useState } from 'react'
import { NotebookPen, Sparkles, Trash2, Loader2, Plus } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { useStore, getLevel, type JournalEntry } from '@/lib/store'
import { OmSymbol } from '@/components/spiritual-icons'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const ENTRY_TYPES: { id: JournalEntry['type']; label: string; sanskrit: string; icon: string; placeholder: string }[] = [
  { id: 'reflection', label: 'Reflection', sanskrit: 'मननम्', icon: '🪔', placeholder: 'What did you reflect on today? What did you learn from your practice?' },
  { id: 'insight', label: 'Insight', sanskrit: 'ज्ञानम्', icon: '✨', placeholder: 'What insight arose in your meditation or study today?' },
  { id: 'gratitude', label: 'Gratitude', sanskrit: 'कृतज्ञता', icon: '💛', placeholder: 'What are you grateful for today? Name three things.' },
]

async function callAI(body: Record<string, unknown>): Promise<{ content: string }> {
  const res = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'AI request failed')
  return { content: data.content }
}

export function JournalView() {
  const store = useStore()
  const [type, setType] = useState<JournalEntry['type']>('reflection')
  const [content, setContent] = useState('')
  const [aiSummary, setAiSummary] = useState('')
  const [loading, setLoading] = useState(false)

  function addEntry() {
    if (!content.trim()) {
      toast.error('Write something first')
      return
    }
    store.addJournal(type, content.trim())
    setContent('')
    toast.success('Entry added to your journal')
  }

  async function generateSummary() {
    setLoading(true)
    setAiSummary('')
    try {
      const recent = store.journal.slice(0, 30).map((j) => ({
        date: j.date,
        content: j.content,
        type: j.type,
      }))
      const recentActivities = store.activities.slice(0, 50).map((a) => ({
        date: a.date,
        type: a.type,
        duration: a.duration,
      }))
      const out = await callAI({
        action: 'reflection',
        journal: recent,
        activities: recentActivities,
        streak: store.currentStreak,
        level: getLevel(store.totalXp).name,
      })
      setAiSummary(out.content)
    } catch (e) {
      setAiSummary('I am briefly silent. Please try again. 🙏')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-8">
      {/* Header */}
      <div className="card-serene p-6 sm:p-9 rounded-3xl relative overflow-hidden border border-border/60 bg-gradient-to-br from-card via-card/95 to-primary/[0.05]">
        <div className="absolute -right-6 -top-6 opacity-[0.06] pointer-events-none animate-breathe">
          <NotebookPen className="h-44 w-44 text-primary" />
        </div>
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-3">
            <NotebookPen className="mr-1 h-3.5 w-3.5" /> Reflection Journal
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 text-foreground" style={{ fontFamily: 'var(--font-cinzel), var(--font-serif-display), serif' }}>
            The Inner Sanctuary
          </h1>
          <p className="text-muted-foreground/90 max-w-2xl leading-relaxed text-sm sm:text-base">
            Reflection turns daily occurrences into lasting spiritual realization. Capture your quiet epiphanies, gratitude, and meditative insights.
          </p>
        </div>
      </div>

      {/* New entry */}
      <div className="card-serene p-6 sm:p-7 rounded-3xl border border-border/60 bg-card">
        <h2 className="font-semibold text-base mb-3 text-foreground" style={{ fontFamily: 'var(--font-serif-display), serif' }}>Inscribe Reflection</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {ENTRY_TYPES.map((t) => (
            <Button
              key={t.id}
              size="sm"
              variant={type === t.id ? 'default' : 'outline'}
              className={cn(
                'rounded-full gap-2 px-4 text-xs font-medium transition-all',
                type === t.id
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'border-border/60 text-muted-foreground hover:border-primary/40 hover:bg-primary/5'
              )}
              onClick={() => setType(t.id)}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
              <span className="text-[11px] opacity-60" style={{ fontFamily: 'var(--font-serif-display), serif' }}>{t.sanskrit}</span>
            </Button>
          ))}
        </div>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={ENTRY_TYPES.find((t) => t.id === type)?.placeholder}
          className="min-h-[140px] mb-4 rounded-2xl border-border/60 bg-background text-sm leading-relaxed p-4"
        />
        <div className="flex justify-end">
          <Button
            onClick={addEntry}
            className="rounded-full px-5 bg-primary text-primary-foreground font-medium shadow-xs hover:bg-primary/90"
          >
            <Plus className="mr-1.5 h-4 w-4" /> Inscribe Entry
          </Button>
        </div>
      </div>

      {/* AI weekly summary */}
      <div className="card-serene p-6 sm:p-7 rounded-3xl border border-border/60 bg-card">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="font-semibold text-base flex items-center gap-2 text-foreground" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
              <Sparkles className="h-4 w-4 text-primary" /> AI Spiritual Weekly Synthesis
            </h2>
            <p className="text-xs text-muted-foreground/80 mt-0.5">A meditative synthesis of your recent writings and daily sadhana</p>
          </div>
          <Button
            size="sm"
            onClick={generateSummary}
            disabled={loading}
            className="rounded-full px-4 text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs"
          >
            {loading ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <Sparkles className="mr-1.5 h-3.5 w-3.5" />}
            {aiSummary ? 'Re-synthesize' : 'Synthesize Reflection'}
          </Button>
        </div>
        {loading ? (
          <div className="flex items-center gap-3 text-muted-foreground py-8 justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <span className="text-xs sm:text-sm">Synthesizing the sacred patterns of your week…</span>
          </div>
        ) : aiSummary ? (
          <div className="p-5 rounded-2xl bg-muted/30 border border-border/40 text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap italic">
            {aiSummary}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground/70">
            <OmSymbol size={44} className="mx-auto mb-2.5 opacity-30" />
            <p className="text-xs sm:text-sm max-w-md mx-auto">
              Synthesize a warm, personalized overview of your spiritual journey, identifying mindful patterns and fitting Gita wisdom.
            </p>
          </div>
        )}
      </div>

      {/* Journal history */}
      <div className="card-serene p-6 sm:p-7 rounded-3xl border border-border/60 bg-card">
        <h2 className="font-semibold text-base mb-4 text-foreground" style={{ fontFamily: 'var(--font-serif-display), serif' }}>Past Inscriptions</h2>
        {store.journal.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground/70">
            <NotebookPen className="h-8 w-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm font-medium">No inscriptions yet.</p>
            <p className="text-xs text-muted-foreground/60 mt-0.5">Your reflections will gather here like sacred pearls.</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
            {store.journal.map((entry) => {
              const meta = ENTRY_TYPES.find((t) => t.id === entry.type)
              return (
                <div key={entry.id} className="rounded-2xl border border-border/60 bg-muted/20 p-4 hover:border-primary/40 hover:bg-card transition-all group">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{meta?.icon}</span>
                      <div>
                        <p className="text-xs font-semibold text-foreground">{meta?.label}</p>
                        <p className="text-[10px] text-muted-foreground/70">{new Date(entry.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
                      onClick={() => {
                        store.deleteJournal(entry.id)
                        toast.success('Entry removed')
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed whitespace-pre-wrap">{entry.content}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
