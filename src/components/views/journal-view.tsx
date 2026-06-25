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

async function callAI(body: Record<string, unknown>): Promise<string> {
  const res = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'AI request failed')
  return data.content
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
      setAiSummary(out)
    } catch (e) {
      setAiSummary('I am briefly silent. Please try again. 🙏')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5">
      <Card className="p-6 relative overflow-hidden border-0 bg-gradient-to-br from-[color-mix(in_oklch,var(--saffron)_16%,transparent)] to-card">
        <div className="absolute -right-6 -top-6 opacity-10 pointer-events-none">
          <NotebookPen className="h-40 w-40 text-primary" />
        </div>
        <div className="relative">
          <Badge className="mb-2 bg-saffron-gradient text-white border-0">
            <NotebookPen className="mr-1 h-3 w-3" /> Reflection Journal
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
            The Inner Ledger
          </h1>
          <p className="text-muted-foreground mt-1 max-w-2xl">
            Reflection turns experience into wisdom. Capture insights, gratitude, and reflections.
            Ask the AI for a personalized weekly summary anytime.
          </p>
        </div>
      </Card>

      {/* New entry */}
      <Card className="p-5">
        <h2 className="font-semibold mb-3" style={{ fontFamily: 'var(--font-serif-display), serif' }}>Write Today's Entry</h2>
        <div className="flex flex-wrap gap-2 mb-3">
          {ENTRY_TYPES.map((t) => (
            <Button
              key={t.id}
              size="sm"
              variant={type === t.id ? 'default' : 'outline'}
              className={cn('gap-1.5', type === t.id && 'bg-saffron-gradient text-white')}
              onClick={() => setType(t.id)}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
              <span className="text-xs opacity-70" style={{ fontFamily: 'var(--font-serif-display), serif' }}>{t.sanskrit}</span>
            </Button>
          ))}
        </div>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={ENTRY_TYPES.find((t) => t.id === type)?.placeholder}
          className="min-h-[140px] mb-3"
        />
        <div className="flex justify-end">
          <Button onClick={addEntry} className="bg-saffron-gradient text-white">
            <Plus className="mr-1 h-4 w-4" /> Add Entry
          </Button>
        </div>
      </Card>

      {/* AI weekly summary */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-semibold flex items-center gap-2" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
              <Sparkles className="h-4 w-4 text-primary" /> AI Weekly Spiritual Reflection
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">A personalized summary based on your recent journal and activities</p>
          </div>
          <Button size="sm" onClick={generateSummary} disabled={loading} className="bg-saffron-gradient text-white">
            {loading ? <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> : <Sparkles className="mr-1 h-3.5 w-3.5" />}
            {aiSummary ? 'Regenerate' : 'Generate'}
          </Button>
        </div>
        {loading ? (
          <div className="flex items-center gap-3 text-muted-foreground py-6 justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <span className="text-sm">Reflecting on your week…</span>
          </div>
        ) : aiSummary ? (
          <div className="prose prose-sm max-w-none whitespace-pre-wrap text-foreground/90 leading-relaxed border-l-2 border-primary/40 pl-4">
            {aiSummary}
          </div>
        ) : (
          <div className="text-center py-8">
            <OmSymbol size={48} className="mx-auto mb-3" />
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Generate a warm, personalized summary of your spiritual week — patterns, encouragement, and a fitting verse from the Gita.
            </p>
          </div>
        )}
      </Card>

      {/* Journal history */}
      <Card className="p-5">
        <h2 className="font-semibold mb-3" style={{ fontFamily: 'var(--font-serif-display), serif' }}>Past Entries</h2>
        {store.journal.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <NotebookPen className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No entries yet. Begin your reflection today.</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
            {store.journal.map((entry) => {
              const meta = ENTRY_TYPES.find((t) => t.id === entry.type)
              return (
                <div key={entry.id} className="rounded-xl border border-border p-3 hover:border-primary/30 transition-colors group">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{meta?.icon}</span>
                      <div>
                        <p className="text-xs font-semibold">{meta?.label}</p>
                        <p className="text-[10px] text-muted-foreground">{new Date(entry.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 opacity-0 group-hover:opacity-100"
                      onClick={() => {
                        store.deleteJournal(entry.id)
                        toast.success('Entry deleted')
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-wrap">{entry.content}</p>
                </div>
              )
            })}
          </div>
        )}
      </Card>
    </div>
  )
}
