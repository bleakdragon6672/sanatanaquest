'use client'

import { useState } from 'react'
import { GraduationCap, Sparkles, BookOpen, RotateCw, CheckCircle2, XCircle, ArrowRight, Award, Trophy } from 'lucide-react'
import { OmSymbol } from '@/components/spiritual-icons'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'

interface ShlokaCard {
  id: string
  title: string
  source: string
  sanskritLines: string[]
  transliteration: string
  translation: string
  quizBlankLine: string
  quizOptions: string[]
  correctOptionIndex: number
}

const SHLOKAS: ShlokaCard[] = [
  {
    id: 'gita-2.47',
    title: 'Nishkama Karma Shloka',
    source: 'Bhagavad Gita 2.47',
    sanskritLines: [
      'कर्मण्येवाधिकारस्ते',
      'मा फलेषु कदाचन।',
      'मा कर्मफलहेतुर्भूर्मा',
      'ते सङ्गोऽस्त्वकर्मणि॥'
    ],
    transliteration: 'karmaṇy-evādhikāras te mā phaleṣu kadācana',
    translation: 'You have a right to perform your prescribed duty, but never to its fruits.',
    quizBlankLine: 'कर्मण्येवाधिकारस्ते मा _____ कदाचन।',
    quizOptions: ['फलेषु', 'कर्मसु', 'धर्मेषु', 'लोकेषु'],
    correctOptionIndex: 0
  },
  {
    id: 'gita-2.20',
    title: 'The Eternal Soul Shloka',
    source: 'Bhagavad Gita 2.20',
    sanskritLines: [
      'न जायते म्रियते वा कदाचिन्',
      'नायं भूत्वा भविता वा न भूयः।',
      'अजो नित्यः शाश्वतोऽयं पुराणो',
      'न हन्यते हन्यमाने शरीरे॥'
    ],
    transliteration: 'na jāyate mriyate vā kadācin nāyaṁ bhūtvā bhavitā vā na bhūyaḥ',
    translation: 'The Soul is never born, nor does it ever die; it is eternal, permanent, and ancient.',
    quizBlankLine: 'अजो नित्यः शाश्वतोऽयं _____ न हन्यते हन्यमाने शरीरे॥',
    quizOptions: ['पुराणो', 'नवीनः', 'अनन्तः', 'महान्'],
    correctOptionIndex: 0
  },
  {
    id: 'yogasutra-1.2',
    title: 'Definition of Yoga',
    source: 'Yoga Sutras 1.2',
    sanskritLines: [
      'योगश्चित्तवृत्तिनिरोधः'
    ],
    transliteration: 'yogaś citta-vṛtti-nirodhaḥ',
    translation: 'Yoga is the complete stilling of the fluctuations of the mind.',
    quizBlankLine: 'योगश्चित्त_____निरोधः',
    quizOptions: ['वृत्ति', 'प्रवृत्ति', 'शांति', 'समाधि'],
    correctOptionIndex: 0
  },
  {
    id: 'gita-18.66',
    title: 'Divine Surrender Shloka',
    source: 'Bhagavad Gita 18.66',
    sanskritLines: [
      'सर्वधर्मान्परित्यज्य',
      'मामेकं शरणं व्रज।',
      'अहं त्वा सर्वपापेभ्यो',
      'मोक्षयिष्यामि मा शुचः॥'
    ],
    transliteration: 'sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja',
    translation: 'Abandon all varieties of dharmas and surrender unto Me alone. I shall liberate you.',
    quizBlankLine: 'सर्वधर्मान्परित्यज्य मामेकं _____ व्रज।',
    quizOptions: ['शरणं', 'भजनं', 'स्मरणं', 'सङ्गं'],
    correctOptionIndex: 0
  }
]

export function MemorizerView() {
  const addXp = useStore((s) => s.addXp)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [mode, setMode] = useState<'flip' | 'quiz' | 'recite'>('flip')
  const [isFlipped, setIsFlipped] = useState<boolean>(false)
  const [revealedLines, setRevealedLines] = useState<number>(1)

  // Quiz state
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false)
  const [score, setScore] = useState<number>(0)

  const currentShloka = SHLOKAS[currentIndex]

  const handleNext = () => {
    setIsFlipped(false)
    setSelectedOption(null)
    setQuizSubmitted(false)
    setRevealedLines(1)
    setCurrentIndex((prev) => (prev + 1) % SHLOKAS.length)
  }

  const handleQuizSubmit = (optIdx: number) => {
    if (quizSubmitted) return
    setSelectedOption(optIdx)
    setQuizSubmitted(true)
    if (optIdx === currentShloka.correctOptionIndex) {
      addXp(15)
      setScore((prev) => prev + 1)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="card-sacred-glow relative overflow-hidden rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-card via-card/90 to-background border border-saffron/20 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-100 dark:bg-saffron-950/60 text-saffron-600 dark:text-saffron-400 text-xs font-semibold">
              <GraduationCap className="h-3.5 w-3.5" />
              <span>Svadhyaya Shloka Studio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-serif-display">
              Shloka Memorizer & Quiz <span className="text-muted-foreground text-lg font-normal font-serif">स्वाध्यायः</span>
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl">
              Master sacred shlokas through flip cards, fill-in-the-blank quizzes, and line-by-line recitation practice. Earn +15 XP for every correct answer.
            </p>
          </div>
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-saffron-gradient text-white shadow-lg glow-sacred-pulse">
            <OmSymbol size={32} className="!text-white" />
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-2 mt-6">
          <button
            onClick={() => setMode('flip')}
            className={cn(
              'px-4 py-2 rounded-xl text-xs font-semibold transition-all border',
              mode === 'flip' ? 'bg-saffron-gradient text-white border-transparent shadow-md' : 'bg-card text-muted-foreground border-border'
            )}
          >
            1. Flip Card Mode
          </button>
          <button
            onClick={() => setMode('quiz')}
            className={cn(
              'px-4 py-2 rounded-xl text-xs font-semibold transition-all border',
              mode === 'quiz' ? 'bg-saffron-gradient text-white border-transparent shadow-md' : 'bg-card text-muted-foreground border-border'
            )}
          >
            2. Fill-in-Blank Quiz (+15 XP)
          </button>
          <button
            onClick={() => setMode('recite')}
            className={cn(
              'px-4 py-2 rounded-xl text-xs font-semibold transition-all border',
              mode === 'recite' ? 'bg-saffron-gradient text-white border-transparent shadow-md' : 'bg-card text-muted-foreground border-border'
            )}
          >
            3. Recitation Reveal
          </button>
        </div>
      </div>

      {/* Main Shloka Practice Card */}
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between px-2 text-xs font-mono text-muted-foreground">
          <span>Shloka {currentIndex + 1} of {SHLOKAS.length}</span>
          <span className="text-saffron font-bold">Quiz Score: {score}</span>
        </div>

        {/* Mode 1: Interactive Flip Card */}
        {mode === 'flip' && (
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="card-sacred-glow rounded-3xl p-8 sm:p-12 bg-card border border-border shadow-xl cursor-pointer min-h-[320px] flex flex-col items-center justify-center text-center transition-all duration-500 hover:border-saffron/40 relative overflow-hidden"
          >
            <span className="absolute top-4 left-4 text-xs font-mono px-3 py-1 rounded-full bg-saffron-gradient-soft text-saffron font-bold">
              {currentShloka.source}
            </span>
            <div className="absolute top-4 right-4 flex items-center gap-1.5 text-xs text-muted-foreground">
              <RotateCw className="h-3.5 w-3.5 text-saffron" /> Click to flip
            </div>

            {!isFlipped ? (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-foreground leading-relaxed">
                  {currentShloka.sanskritLines.map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </h3>
                <p className="text-xs text-saffron font-serif font-semibold">{currentShloka.title}</p>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in">
                <p className="text-sm font-mono text-muted-foreground">{currentShloka.transliteration}</p>
                <p className="text-base font-medium text-foreground max-w-md mx-auto leading-relaxed">
                  "{currentShloka.translation}"
                </p>
              </div>
            )}
          </div>
        )}

        {/* Mode 2: Fill-in-the-Blanks Quiz */}
        {mode === 'quiz' && (
          <div className="card-sacred-glow rounded-3xl p-8 bg-card border border-border shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-saffron font-mono">{currentShloka.source}</span>
              <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                +15 XP Correct Answer
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-muted/40 border border-border text-center space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Complete the missing word</h4>
              <p className="text-xl font-bold font-serif text-foreground leading-relaxed">
                {currentShloka.quizBlankLine}
              </p>
            </div>

            {/* Quiz Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentShloka.quizOptions.map((option, idx) => {
                const isSelected = selectedOption === idx
                const isCorrect = idx === currentShloka.correctOptionIndex
                return (
                  <button
                    key={idx}
                    onClick={() => handleQuizSubmit(idx)}
                    disabled={quizSubmitted}
                    className={cn(
                      'p-4 rounded-xl border font-serif text-base font-bold transition-all flex items-center justify-between',
                      quizSubmitted
                        ? isCorrect
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                          : isSelected
                          ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                          : 'bg-card border-border text-muted-foreground opacity-50'
                        : 'bg-card hover:bg-saffron-gradient-soft border-border text-foreground'
                    )}
                  >
                    <span>{option}</span>
                    {quizSubmitted && isCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-400" />}
                    {quizSubmitted && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-rose-400" />}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Mode 3: Recitation Reveal */}
        {mode === 'recite' && (
          <div className="card-sacred-glow rounded-3xl p-8 bg-card border border-border shadow-xl space-y-6 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-saffron font-mono">{currentShloka.source}</span>
            <div className="space-y-4 py-4 min-h-[160px] flex flex-col justify-center">
              {currentShloka.sanskritLines.slice(0, revealedLines).map((line, idx) => (
                <div key={idx} className="text-xl font-bold font-serif text-foreground animate-scale-in">
                  {line}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-3">
              {revealedLines < currentShloka.sanskritLines.length ? (
                <button
                  onClick={() => setRevealedLines((prev) => prev + 1)}
                  className="py-2.5 px-5 rounded-xl bg-saffron-gradient text-white font-semibold text-xs shadow-md glow-saffron"
                >
                  Reveal Next Line ({revealedLines}/{currentShloka.sanskritLines.length})
                </button>
              ) : (
                <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-full">
                  Full Shloka Revealed!
                </span>
              )}
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <button
          onClick={handleNext}
          className="w-full py-3.5 rounded-2xl bg-saffron-gradient text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 glow-saffron"
        >
          <span>Next Shloka</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
