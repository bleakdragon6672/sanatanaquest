'use client'

import { useState } from 'react'
import { useNav } from '@/components/nav-context'
import { Compass, Sparkles, BookOpen, ArrowRight, CheckCircle2, RefreshCw, HeartHandshake, ShieldAlert, Zap } from 'lucide-react'
import { OmSymbol } from '@/components/spiritual-icons'
import { cn } from '@/lib/utils'

interface DilemmaScenario {
  id: string
  title: string
  sanskrit: string
  modernStruggle: string
  arjunaQuestion: string
  krishnaResponse: {
    sanskritVerse: string
    transliteration: string
    translation: string
    coreLesson: string
  }
  reflectionPrompt: string
  actionableSadhana: string[]
  gitaRef: { chapter: string; verse: string }
}

const DILEMMAS: DilemmaScenario[] = [
  {
    id: 'burnout',
    title: 'Burnout & Overwork Exhaustion',
    sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन',
    modernStruggle: 'Working 60+ hours a week, tied to metrics, promotions, and terrified of falling behind.',
    arjunaQuestion: '“O Krishna, my mind feels drained and heavy. I labor day and night, yet anxiety about the results leaves me depleted and hollow. How do I act without exhausting my soul?”',
    krishnaResponse: {
      sanskritVerse: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
      transliteration: 'karmaṇy-evādhikāras te mā phaleṣu kadācana | mā karma-phala-hetur bhūr mā te saṅgo ’stv akarmaṇi',
      translation: 'You have a right to perform your prescribed duty, but never to its fruits. Never consider yourself the cause of the results, nor be attached to inaction.',
      coreLesson: 'Shift your focus 100% to the mastery and love of the action itself. Offer the outcome to the universe and release the mental weight of expectation.'
    },
    reflectionPrompt: 'What is one work project right now where you are obsessing over the outcome rather than enjoying the craftsmanship of the process?',
    actionableSadhana: [
      'Set an intention before starting any work task: "This effort is my sacred offering."',
      'Take 3 deep Om breaths whenever you feel anxiety rising about deadlines or performance.',
      'Log off at a fixed hour and completely disconnect from metrics for 1 evening.'
    ],
    gitaRef: { chapter: '2', verse: '47' }
  },
  {
    id: 'imposter-syndrome',
    title: 'Imposter Syndrome & Self-Doubt',
    sanskrit: 'उद्धरेदात्मनात्मानम्',
    modernStruggle: 'Feeling unqualified, comparing yourself to peers on social media, and battling inner self-sabotage.',
    arjunaQuestion: '“O Madhusudana, I am plagued by doubts. I feel incompetent and unfit to walk my path. How can I gain unwavering inner confidence?”',
    krishnaResponse: {
      sanskritVerse: 'उद्धरेदात्मनात्मानं नात्मानमवसादयेत्। आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥',
      transliteration: 'uddhared ātmanātmānaṁ nātmānam avasādayet | ātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ',
      translation: 'Elevate yourself through your own mind; do not degrade yourself. For the mind alone is your greatest friend, and the mind alone is your worst enemy.',
      coreLesson: 'Your mind is the tool that shapes your reality. Stop listening to the inner critic; nurture your mind like your truest companion.'
    },
    reflectionPrompt: 'Where in your life have you let negative self-talk override your true potential?',
    actionableSadhana: [
      'Write down 3 things you successfully navigated in the past year whenever doubt strikes.',
      'Replace "I am not ready" with "I am learning and evolving with each step."',
      'Practice 5 minutes of morning breath meditation to quiet mental noise.'
    ],
    gitaRef: { chapter: '6', verse: '5' }
  },
  {
    id: 'anxiety-outcomes',
    title: 'Anxiety for Future Outcomes',
    sanskrit: 'योगस्थः कुरु कर्माणि',
    modernStruggle: 'Catastrophizing about upcoming interviews, exams, financial changes, or life decisions.',
    arjunaQuestion: '“O Janardana, my thoughts race into the unpredictable future. What if I fail? How do I stay grounded when everything feels uncertain?”',
    krishnaResponse: {
      sanskritVerse: 'योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय। सिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते॥',
      transliteration: 'yoga-sthaḥ kuru karmāṇi saṅgaṁ tyaktvā dhanañjaya | siddhy-asiddhyoḥ samo bhūtvā samatvaṁ yoga ucyate',
      translation: 'Established in Yoga, perform your duties, O Dhananjaya, abandoning attachment and remaining steadfast in both success and failure. Equanimity is called Yoga.',
      coreLesson: 'True strength is mental poise. Success and failure are passing waves; your true inner center remains untouched.'
    },
    reflectionPrompt: 'If both success and failure were accepted as valuable lessons, what bold step would you take today?',
    actionableSadhana: [
      'Repeat the mantra: "Samatvam" (Equanimity) when faced with unexpected news.',
      'Write down your worst-case fear, realize you can survive it, then refocus on current action.',
      'Spend 10 minutes meditating on 432Hz Om soundscape.'
    ],
    gitaRef: { chapter: '2', verse: '48' }
  },
  {
    id: 'anger-conflict',
    title: 'Anger & Relational Conflict',
    sanskrit: 'ध्यायतो विषयान्पुंसः',
    modernStruggle: 'Losing temper with loved ones or colleagues, harboring resentment, and reacting impulsively.',
    arjunaQuestion: '“O Krishna, why do people act destructively as if impelled by force, even against their own will?”',
    krishnaResponse: {
      sanskritVerse: 'ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते। सङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते॥',
      transliteration: 'dhyāyato viṣayān puṁsaḥ saṅgas teṣūpajāyate | saṅgāt sañjāyate kāmaḥ kāmāt krodho ’bhijāyate',
      translation: 'Dwelling on sense objects creates attachment; attachment breeds desire, and unfulfilled desire triggers anger.',
      coreLesson: 'Anger stems from unmet desires and attachment to how others "should" behave. Awareness breaks the chain reaction before anger explodes.'
    },
    reflectionPrompt: 'What attachment or hidden expectation was triggered the last time you lost your temper?',
    actionableSadhana: [
      'Implement the 10-second silent pause before responding when irritated.',
      'Ask yourself: "Will this argument matter 5 years from now?"',
      'Send a mental blessing of peace to the person you feel friction with.'
    ],
    gitaRef: { chapter: '2', verse: '62' }
  }
]

export function DilemmaView() {
  const { navigate } = useNav()
  const [selectedId, setSelectedId] = useState<string>(DILEMMAS[0].id)
  const [step, setStep] = useState<'question' | 'krishna' | 'sadhana'>('question')
  const [completedReflections, setCompletedReflections] = useState<Record<string, boolean>>({})

  const currentScenario = DILEMMAS.find((d) => d.id === selectedId) ?? DILEMMAS[0]

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="card-sacred-glow relative overflow-hidden rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-card via-card/90 to-background border border-saffron/20 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-100 dark:bg-saffron-950/60 text-saffron-600 dark:text-saffron-400 text-xs font-semibold">
              <Compass className="h-3.5 w-3.5" />
              <span>Modern Life & Dharma Guidance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-serif-display">
              Dharma Dilemma Simulator <span className="text-muted-foreground text-lg font-normal font-serif">धर्मसंकटम्</span>
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl">
              Navigate modern struggles — burnout, imposter syndrome, anxiety, and anger — through interactive dialogues with Lord Krishna.
            </p>
          </div>
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-saffron-gradient text-white shadow-lg glow-sacred-pulse">
            <OmSymbol size={32} className="!text-white" />
          </div>
        </div>

        {/* Scenario Selector Pills */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2 scrollbar-none">
          {DILEMMAS.map((item) => {
            const isSelected = item.id === selectedId
            return (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedId(item.id)
                  setStep('question')
                }}
                className={cn(
                  'px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap border flex items-center gap-2',
                  isSelected
                    ? 'bg-saffron-gradient text-white border-transparent shadow-md'
                    : 'bg-card hover:bg-muted text-muted-foreground border-border'
                )}
              >
                <span>{item.title}</span>
                {completedReflections[item.id] && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Interactive Dilemma Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scenario Overview Card */}
        <div className="lg:col-span-4 card-sacred-glow rounded-2xl p-6 bg-card border border-border shadow-lg space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-saffron font-mono">Current Struggle</span>
          <h2 className="text-xl font-bold font-serif-display text-foreground">{currentScenario.title}</h2>
          <p className="text-xs text-saffron font-serif">{currentScenario.sanskrit}</p>

          <div className="p-4 rounded-xl bg-muted/40 border border-border/60 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <ShieldAlert className="h-3.5 w-3.5 text-amber-500" /> Real-World Context
            </h4>
            <p className="text-sm text-foreground leading-relaxed">{currentScenario.modernStruggle}</p>
          </div>

          {/* Stepper Controls */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => setStep('question')}
              className={cn(
                'w-full p-3 rounded-xl text-xs font-medium border text-left transition-all flex items-center justify-between',
                step === 'question' ? 'bg-saffron-gradient-soft border-saffron text-foreground font-bold' : 'bg-card text-muted-foreground'
              )}
            >
              <span>1. Arjuna's Inner Question</span>
              {step === 'question' && <Sparkles className="h-4 w-4 text-saffron" />}
            </button>
            <button
              onClick={() => setStep('krishna')}
              className={cn(
                'w-full p-3 rounded-xl text-xs font-medium border text-left transition-all flex items-center justify-between',
                step === 'krishna' ? 'bg-saffron-gradient-soft border-saffron text-foreground font-bold' : 'bg-card text-muted-foreground'
              )}
            >
              <span>2. Krishna's Eternal Wisdom</span>
              {step === 'krishna' && <Sparkles className="h-4 w-4 text-saffron" />}
            </button>
            <button
              onClick={() => setStep('sadhana')}
              className={cn(
                'w-full p-3 rounded-xl text-xs font-medium border text-left transition-all flex items-center justify-between',
                step === 'sadhana' ? 'bg-saffron-gradient-soft border-saffron text-foreground font-bold' : 'bg-card text-muted-foreground'
              )}
            >
              <span>3. Actionable Sadhana Practice</span>
              {step === 'sadhana' && <Sparkles className="h-4 w-4 text-saffron" />}
            </button>
          </div>
        </div>

        {/* Interactive Dialogue Display */}
        <div className="lg:col-span-8 card-sacred-glow rounded-2xl p-6 sm:p-8 bg-card border border-border shadow-lg space-y-6 flex flex-col justify-between">
          {step === 'question' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/40 flex items-center justify-center font-bold font-serif">
                  अ
                </div>
                <div>
                  <h3 className="font-bold text-base font-serif-display">Arjuna's Dilemma</h3>
                  <p className="text-xs text-muted-foreground">The Seeker's Voice</p>
                </div>
              </div>

              <blockquote className="p-6 rounded-2xl bg-amber-500/10 border-l-4 border-amber-500 text-base font-serif text-foreground italic leading-relaxed shadow-sm">
                {currentScenario.arjunaQuestion}
              </blockquote>

              <button
                onClick={() => setStep('krishna')}
                className="py-3 px-6 rounded-xl bg-saffron-gradient text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 glow-saffron ml-auto"
              >
                <span>Seek Krishna's Counsel</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {step === 'krishna' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-saffron-gradient text-white shadow-md flex items-center justify-center font-bold">
                  <OmSymbol size={22} className="!text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base font-serif-display">Krishna's Counsel</h3>
                  <p className="text-xs text-saffron font-serif">Gita Chapter {currentScenario.gitaRef.chapter}, Verse {currentScenario.gitaRef.verse}</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-saffron-gradient-soft border border-saffron/30 space-y-4 shadow-sm">
                <p className="text-lg font-bold text-foreground font-serif text-center leading-relaxed">
                  {currentScenario.krishnaResponse.sanskritVerse}
                </p>
                <p className="text-xs text-muted-foreground font-mono text-center">
                  {currentScenario.krishnaResponse.transliteration}
                </p>
                <div className="border-t border-saffron/20 pt-4">
                  <p className="text-sm font-medium text-foreground leading-relaxed">
                    "{currentScenario.krishnaResponse.translation}"
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-saffron flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> Core Insight
                </h4>
                <p className="text-sm text-foreground leading-relaxed">
                  {currentScenario.krishnaResponse.coreLesson}
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 pt-2">
                <button
                  onClick={() => navigate('gita', { chapter: currentScenario.gitaRef.chapter, verse: currentScenario.gitaRef.verse })}
                  className="py-2.5 px-4 rounded-xl border border-border hover:bg-muted text-xs font-semibold text-foreground flex items-center gap-2"
                >
                  <BookOpen className="h-4 w-4 text-saffron" />
                  <span>Read Verse in Gita</span>
                </button>
                <button
                  onClick={() => setStep('sadhana')}
                  className="py-3 px-6 rounded-xl bg-saffron-gradient text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 glow-saffron"
                >
                  <span>View Sadhana Plan</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {step === 'sadhana' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-saffron" />
                  <h3 className="font-bold text-base font-serif-display">Daily Action Plan</h3>
                </div>
                <span className="text-xs font-mono text-muted-foreground">Practical Application</span>
              </div>

              <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-saffron">Self-Reflection Question</h4>
                <p className="text-sm font-semibold text-foreground leading-relaxed italic">
                  "{currentScenario.reflectionPrompt}"
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">3 Sadhana Micro-Habits</h4>
                {currentScenario.actionableSadhana.map((habit, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-card border border-border/80 flex items-start gap-3 shadow-sm">
                    <span className="h-6 w-6 shrink-0 rounded-full bg-saffron-gradient text-white text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-foreground font-medium leading-relaxed">{habit}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setCompletedReflections((prev) => ({ ...prev, [selectedId]: true }))
                }}
                className="w-full py-3 rounded-xl bg-saffron-gradient text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 glow-saffron"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Mark Reflection Completed</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
