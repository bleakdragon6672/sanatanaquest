'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Sparkles, Send, Loader2, GraduationCap, MessageCircle, BookOpen, RefreshCw, User } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useNav } from '@/components/nav-context'
import { getVerse, type Verse } from '@/lib/gita-data'
import { getUpanishadVerse } from '@/lib/upanishad-data'
import { getChalisaVerse } from '@/lib/hanuman-chalisa-data'
import { getBaanVerse } from '@/lib/bajrang-baan-data'
import { getTandavVerse } from '@/lib/shiv-tandav-data'
import { OmSymbol } from '@/components/spiritual-icons'
import { cn } from '@/lib/utils'
import { sanitizeHtml } from '@/lib/sanitize'

interface FoundVerse {
  id: string
  chapter: number
  verse: number
  sanskrit: string
  transliteration: string
  english: string
  meaning?: string
}

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
  verse?: Verse
  mode?: string
  foundVerses?: FoundVerse[]
}

type GuideTab = 'explain' | 'ask' | 'exam'

export function GuideView() {
  const { params } = useNav()
  const [localTab, setLocalTab] = useState<GuideTab>('ask')
  const [localVerse, setLocalVerse] = useState<string | null>(null)
  const [mode, setMode] = useState<'simple' | 'beginner' | 'student' | 'application'>('simple')

  const tab = params.explain ? 'explain' : localTab
  const verseToExplain = params.explain ?? localVerse

  return (
    <div className="space-y-5">
      {/* Header */}
      <Card className="p-6 sm:p-8 relative overflow-hidden border-0 bg-gradient-to-br from-[color-mix(in_oklch,var(--saffron)_16%,transparent)] via-card to-[color-mix(in_oklch,var(--gold)_10%,transparent)]">
        <div className="absolute -right-6 -top-6 opacity-10 pointer-events-none">
          <OmSymbol size={180} />
        </div>
        <div className="relative">
          <Badge className="mb-2 bg-saffron-gradient text-white border-0">
            <Sparkles className="mr-1 h-3 w-3" /> AI Spiritual Guide
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
            Your Guru, always present
          </h1>
          <p className="text-muted-foreground mt-1 max-w-2xl leading-relaxed">
            Ask any question. Get explanations grounded in the Bhagavad Gita. Receive practical guidance
            for study, discipline, stress, and the spiritual path.
          </p>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        <TabButton active={tab === 'ask'} onClick={() => setLocalTab('ask')} icon={<MessageCircle className="h-4 w-4" />} label="Ask Anything" sanskrit="पृच्छ" />
        <TabButton active={tab === 'explain'} onClick={() => setLocalTab('explain')} icon={<BookOpen className="h-4 w-4" />} label="Explain a Verse" sanskrit="व्याख्या" />
        <TabButton active={tab === 'exam'} onClick={() => setLocalTab('exam')} icon={<GraduationCap className="h-4 w-4" />} label="Exam & Student Mode" sanskrit="विद्यार्थी" />
      </div>

      {tab === 'explain' && (
        <ExplainVerse
          verseId={verseToExplain}
          setVerseId={setLocalVerse}
          mode={mode}
          setMode={setMode}
        />
      )}
      {tab === 'ask' && <AskAnything />}
      {tab === 'exam' && <ExamMode />}
    </div>
  )
}

function TabButton({ active, onClick, icon, label, sanskrit }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string; sanskrit: string }) {
  return (
    <Button
      variant={active ? 'default' : 'outline'}
      onClick={onClick}
      className={cn(
        'rounded-full gap-2 transition-all duration-200',
        active ? 'bg-saffron-gradient text-white shadow-md' : 'hover:bg-saffron-gradient-soft hover:border-primary/30',
      )}
    >
      {icon}
      <span>{label}</span>
      <span className="text-xs opacity-70 hidden sm:inline" style={{ fontFamily: 'var(--font-serif-display), serif' }}>{sanskrit}</span>
    </Button>
  )
}

async function callAI(body: Record<string, unknown>): Promise<{ content: string; verses?: FoundVerse[] }> {
  const res = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'AI request failed')
  return { content: data.content, verses: data.verses }
}

// ── Typing Indicator ──────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-start gap-2">
      <div className="chat-avatar chat-avatar-guru">
        <OmSymbol size={14} className="!text-white" />
      </div>
      <div className="typing-indicator bg-muted/60 rounded-2xl rounded-tl-sm">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  )
}

// ── Animated Message Text ─────────────────────────────────────────

function AnimatedMessageText({ content, speed = 30 }: { content: string; speed?: number }) {
  const [displayed, setDisplayed] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const indexRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    indexRef.current = 0
    setDisplayed('')
    setIsComplete(false)

    // For short messages, reveal instantly
    if (content.length < 80) {
      setDisplayed(content)
      setIsComplete(true)
      return
    }

    timerRef.current = setInterval(() => {
      indexRef.current += 1
      setDisplayed(content.slice(0, indexRef.current))
      if (indexRef.current >= content.length) {
        if (timerRef.current) clearInterval(timerRef.current)
        setIsComplete(true)
      }
    }, speed)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [content, speed])

  if (isComplete || content.length < 80) {
    return (
      <div
        className="whitespace-pre-wrap leading-relaxed text-sm"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')) }}
      />
    )
  }

  // During animation, render progressive text
  const animatedHtml = sanitizeHtml(displayed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'))
  return (
    <div className="whitespace-pre-wrap leading-relaxed text-sm">
      <span dangerouslySetInnerHTML={{ __html: animatedHtml }} />
      <span className="inline-block w-1.5 h-4 bg-primary/60 ml-0.5 animate-pulse" style={{ verticalAlign: 'text-bottom' }} />
    </div>
  )
}

// ── Explain Verse Tab ─────────────────────────────────────────────

function ExplainVerse({
  verseId,
  setVerseId,
  mode,
  setMode,
}: {
  verseId: string | null
  setVerseId: (id: string | null) => void
  mode: 'simple' | 'beginner' | 'student' | 'application'
  setMode: (m: 'simple' | 'beginner' | 'student' | 'application') => void
}) {
  const [explanation, setExplanation] = useState('')
  const [loading, setLoading] = useState(false)
  const [verseInput, setVerseInput] = useState('')

  useEffect(() => {
    if (verseId) {
      void runExplain(verseId, mode)
    }
  }, [verseId, mode])

  async function runExplain(id: string, m: typeof mode) {
    const gv = getVerse(id)
    const uv = getUpanishadVerse(id)
    const cv = getChalisaVerse(id)
    const bv = getBaanVerse(id)
    const tv = getTandavVerse(id)
    const v = gv ?? uv ?? cv ?? bv ?? tv
    if (!v) {
      setExplanation('Verse not found.')
      return
    }
    setLoading(true)
    setExplanation('')
    try {
      const isUpanishad = id.includes('.') && !id.match(/^\d+\.\d+$/)
      const sanskritText = 'sanskrit' in v ? (v as { sanskrit: string }).sanskrit : ('awadhi' in v ? (v as { awadhi: string }).awadhi : '')
      const out = await callAI({
        action: 'explain',
        mode: m,
        verse: {
          id: v.id,
          sanskrit: sanskritText,
          transliteration: v.transliteration,
          english: v.english,
          chapter: gv?.chapter ?? 0,
          verseNum: gv?.verse ?? 0,
          source: isUpanishad ? 'upanishad' : 'gita',
        },
      })
      setExplanation(out.content)
    } catch (e) {
      setExplanation('I am briefly silent. Please try again. 🙏')
    } finally {
      setLoading(false)
    }
  }

  function handleVerseInputSubmit() {
    if (!verseInput.trim()) return
    const gm = verseInput.match(/(\d+)\s*[\.\:\s]\s*(\d+)/)
    if (gm) {
      const id = `${gm[1]}.${gm[2]}`
      if (getVerse(id)) { setVerseId(id); return }
    }
    const um = verseInput.match(/(isha|katha|mandukya)[\.\s]/i)
    if (um) {
      const id = verseInput.trim().toLowerCase()
      if (getUpanishadVerse(id)) { setVerseId(id); return }
    }
    const cm = verseInput.match(/^v(\d+)$/i)
    if (cm) {
      const id = `v${cm[1]}`
      if (getChalisaVerse(id)) { setVerseId(id); return }
    }
    setExplanation('Could not find that verse. Try "2.47" (Gita), "isha.0.1" (Upanishad), or "v5" (Hanuman Chalisa).')
  }

  const gitaVerse = verseId ? getVerse(verseId) : null
  const upanishadVerse = verseId ? getUpanishadVerse(verseId) : null
  const chalisaVerse = verseId ? getChalisaVerse(verseId) : null
  const baanVerse = verseId ? getBaanVerse(verseId) : null
  const tandavVerse = verseId ? getTandavVerse(verseId) : null
  const verse = gitaVerse ?? upanishadVerse ?? chalisaVerse ?? baanVerse ?? tandavVerse
  const verseLabel = gitaVerse
    ? `Bhagavad Gita ${gitaVerse.chapter}.${gitaVerse.verse}`
    : upanishadVerse
      ? upanishadVerse.id
      : chalisaVerse
        ? `Hanuman Chalisa — ${chalisaVerse.type === 'doha' ? 'Doha' : 'Chaupai'} ${chalisaVerse.number}`
        : baanVerse
          ? `Bajrang Baan — ${baanVerse.type === 'doha' ? 'Doha' : 'Chaupai'} ${baanVerse.number}`
          : tandavVerse
            ? `Shiv Tandav Stotram — Stanza ${tandavVerse.number}`
            : ''

  return (
    <div className="space-y-4">
      <Card className="p-5">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" /> Choose a verse to explain
        </h3>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={verseInput}
            onChange={(e) => setVerseInput(e.target.value)}
            placeholder="e.g. 2.47 (Gita), isha.0.1 (Upanishad), v5 (Chalisa), t3 (Tandav)"
            className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
            onKeyDown={(e) => e.key === 'Enter' && handleVerseInputSubmit()}
          />
          <Button onClick={handleVerseInputSubmit} className="bg-saffron-gradient text-white shadow-sm">Explain</Button>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          Or pick a famous verse:{' '}
          {['2.47', '9.22', '18.66', 'isha.0.1', 'katha.1.2.23', 'mandukya.0.1', 'v1', 'v11', 'b1', 'b11', 't1', 't4'].map((id) => (
            <button
              key={id}
              onClick={() => setVerseId(id)}
              className="chat-suggestion-btn mr-1 mb-1"
            >
              {id}
            </button>
          ))}
        </p>

        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground mr-1">Explanation mode:</span>
          {(['simple', 'beginner', 'student', 'application'] as const).map((m) => (
            <Button
              key={m}
              size="sm"
              variant={mode === m ? 'default' : 'outline'}
              className={cn('rounded-full capitalize transition-all', mode === m && 'bg-saffron-gradient text-white shadow-sm')}
              onClick={() => setMode(m)}
            >
              {m === 'application' ? 'Modern Application' : m}
            </Button>
          ))}
        </div>
      </Card>

      {verse && (
        <Card className="p-5 bg-saffron-gradient-soft border-primary/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary/60 to-primary/20" />
          <div className="pl-3">
            <p className="text-[10px] uppercase tracking-widest text-primary/70 mb-1">{verseLabel}</p>
            <p className="sanskrit-text text-lg mb-2" style={{ fontFamily: 'var(--font-serif-display), "Noto Serif Devanagari", serif', whiteSpace: 'pre-line' }}>
              {'sanskrit' in verse ? (verse as { sanskrit: string }).sanskrit : ('awadhi' in verse ? (verse as { awadhi: string }).awadhi : '')}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">{verse.english}</p>
          </div>
        </Card>
      )}

      <Card className="p-5 min-h-[200px]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" /> AI Explanation
          </h3>
          {verseId && !loading && explanation && (
            <Button size="sm" variant="ghost" onClick={() => runExplain(verseId, mode)} className="gap-1.5">
              <RefreshCw className="h-3.5 w-3.5" /> Regenerate
            </Button>
          )}
        </div>
        {loading ? (
          <div className="flex flex-col items-center gap-3 text-muted-foreground py-8 justify-center">
            <div className="relative">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
            <span className="text-sm">The Guru is contemplating your question…</span>
          </div>
        ) : explanation ? (
          <AnimatedMessageText content={explanation} speed={20} />
        ) : (
          <div className="text-sm text-muted-foreground text-center py-8">
            <OmSymbol size={48} className="mx-auto mb-3 opacity-30" />
            <p>Pick a verse to receive the Guru&apos;s explanation.</p>
          </div>
        )}
      </Card>
    </div>
  )
}

// ── Ask Anything Tab ──────────────────────────────────────────────

function ChatInput({ value, onChange, onSend, loading, placeholder }: {
  value: string
  onChange: (v: string) => void
  onSend: () => void
  loading: boolean
  placeholder: string
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustHeight = useCallback(() => {
    const ta = textareaRef.current
    if (ta) {
      ta.style.height = 'auto'
      ta.style.height = Math.min(ta.scrollHeight, 120) + 'px'
    }
  }, [])

  useEffect(() => { adjustHeight() }, [value, adjustHeight])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div className="chat-input-wrapper px-4 py-3">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={1}
        disabled={loading}
        className="flex-1"
      />
      <Button
        onClick={onSend}
        disabled={!value.trim() || loading}
        size="icon"
        className={cn(
          'h-10 w-10 rounded-xl shrink-0 transition-all duration-200',
          value.trim() && !loading
            ? 'bg-saffron-gradient text-white shadow-sm hover:shadow-md'
            : 'bg-muted text-muted-foreground',
        )}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        <span className="sr-only">Send</span>
      </Button>
    </div>
  )
}

function AskAnything() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function send() {
    if (!input.trim() || loading) return
    const question = input.trim()
    setInput('')
    setMessages((m) => [...m, { role: 'user', content: question }])
    setLoading(true)
    try {
      const result = await callAI({ action: 'ask', question })
      setMessages((m) => [...m, { role: 'assistant', content: result.content, foundVerses: result.verses }])
    } catch (e) {
      setMessages((m) => [...m, { role: 'assistant', content: 'I am briefly silent. Please ask again. 🙏' }])
    } finally {
      setLoading(false)
    }
  }

  const SUGGESTIONS = [
    'What does karma yoga mean?',
    'How can I overcome fear and anxiety?',
    'What is the difference between body and soul?',
    'How do I deal with anger?',
    'What is dharma?',
    'How can I find my life purpose?',
  ]

  return (
    <Card className="flex flex-col h-[70vh] min-h-[500px] overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
        {messages.length === 0 && (
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-saffron-gradient flex items-center justify-center shadow-lg">
              <OmSymbol size={24} className="!text-white" />
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto leading-relaxed">
              Ask anything about spirituality, the Gita, life, dharma, the mind, relationships, or your journey.
            </p>
            <div className="flex flex-wrap gap-2 justify-center max-w-xl mx-auto">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => { setInput(s); setTimeout(() => send(), 100) }}
                  className="chat-suggestion-btn"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <MessageBubble key={i} m={m} index={i} />
        ))}
        {loading && <TypingIndicator />}
        <div ref={endRef} />
      </div>
      <div className="border-t border-border/50 p-3 sm:p-4 bg-card/80">
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={send}
          loading={loading}
          placeholder="Ask your question…"
        />
      </div>
    </Card>
  )
}

// ── Exam Mode Tab ────────────────────────────────────────────────

function ExamMode() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function send() {
    if (!input.trim() || loading) return
    const question = input.trim()
    setInput('')
    setMessages((m) => [...m, { role: 'user', content: question }])
    setLoading(true)
    try {
      const result = await callAI({ action: 'exam', question })
      setMessages((m) => [...m, { role: 'assistant', content: result.content, foundVerses: result.verses }])
    } catch (e) {
      setMessages((m) => [...m, { role: 'assistant', content: 'I am briefly silent. Please ask again. 🙏' }])
    } finally {
      setLoading(false)
    }
  }

  const SUGGESTIONS = [
    'I am scared before my exam.',
    'I cannot focus on my studies.',
    'I keep procrastinating my preparation.',
    'I feel overwhelmed by the syllabus.',
    'I lose motivation quickly while studying.',
    'I get nervous during the actual exam.',
  ]

  return (
    <Card className="flex flex-col h-[70vh] min-h-[500px] overflow-hidden">
      <div className="px-5 py-4 border-b border-border/50 bg-saffron-gradient-soft flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-saffron-gradient flex items-center justify-center shadow-sm">
          <GraduationCap className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="font-semibold text-sm">Exam & Student Mode</p>
          <p className="text-xs text-muted-foreground">Connect Gita teachings to focus, discipline, stress & consistency</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
        {messages.length === 0 && (
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-saffron-gradient flex items-center justify-center shadow-lg">
              <OmSymbol size={24} className="!text-white" />
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto leading-relaxed">
              Student life is its own battlefield. The Gita offers timeless guidance for focus, discipline, stress, and consistency.
            </p>
            <div className="flex flex-wrap gap-2 justify-center max-w-xl mx-auto">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => { setInput(s); setTimeout(() => send(), 100) }}
                  className="chat-suggestion-btn"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <MessageBubble key={i} m={m} index={i} />
        ))}
        {loading && <TypingIndicator />}
        <div ref={endRef} />
      </div>
      <div className="border-t border-border/50 p-3 sm:p-4 bg-card/80">
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={send}
          loading={loading}
          placeholder="Share what&apos;s on your mind as a student…"
        />
      </div>
    </Card>
  )
}

// ── Message Bubble ───────────────────────────────────────────────

function MessageBubble({ m, index }: { m: Message; index: number }) {
  const { navigate } = useNav()

  if (m.role === 'user') {
    return (
      <div className="flex items-start gap-2 justify-end animate-chat-enter-user">
        <div
          className="max-w-[85%] rounded-2xl rounded-tr-sm bg-saffron-gradient text-white px-4 py-2.5 text-sm leading-relaxed shadow-sm"
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {m.content}
        </div>
        <div className="chat-avatar chat-avatar-user">
          <User className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-2 animate-chat-enter">
      <div className="chat-avatar chat-avatar-guru">
        <OmSymbol size={14} className="!text-white" />
      </div>
      <div className="max-w-[85%] space-y-2">
        <div className="rounded-2xl rounded-tl-sm bg-muted/60 px-4 py-3 leading-relaxed shadow-sm">
          <AnimatedMessageText content={m.content} speed={25} />
        </div>
        {m.foundVerses && m.foundVerses.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground px-1 flex items-center gap-1.5">
              <BookOpen className="h-3 w-3" /> Verses from the Gita
            </p>
            {m.foundVerses.map((v) => (
              <button
                key={v.id}
                onClick={() => navigate('gita', { chapter: String(v.chapter), verse: v.id })}
                className="block w-full text-left rounded-xl border border-primary/15 bg-card hover:border-primary/40 hover:bg-saffron-gradient-soft/50 transition-all p-3 group"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="font-mono text-[10px]">{v.id}</Badge>
                  <span className="text-[10px] text-primary/70 group-hover:text-primary group-hover:underline transition-colors">
                    Read full verse →
                  </span>
                </div>
                <p className="text-xs text-foreground/80 line-clamp-2 leading-relaxed">{v.english}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
