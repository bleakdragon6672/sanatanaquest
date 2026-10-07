'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Trophy,
  Flame,
  CheckCircle2,
  Settings2,
  Layers,
  Sliders,
  Play,
  Pause,
  ArrowRight,
  ChevronRight,
  Disc,
  Info,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useStore } from '@/lib/store'
import { triggerXpGain } from '@/components/xp-animations'
import {
  playBeadClick,
  playSingingBowlChime,
  triggerMalaHaptic,
  startTanpuraDrone,
  stopTanpuraDrone,
  type BeadMaterial,
} from '@/lib/japa-sound'
import { useVoiceJapa, type VoiceSensitivity } from '@/hooks/use-voice-japa'
import { OmSymbol, LotusIcon } from '@/components/spiritual-icons'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export interface SacredMantra {
  id: string
  name: string
  deity: string
  sanskrit: string
  transliteration: string
  translation: string
  recommendedMaterial: BeadMaterial
  accentColor: string
}

export const SACRED_MANTRAS: SacredMantra[] = [
  {
    id: 'maha-mantra',
    name: 'Hare Krishna Maha-Mantra',
    deity: 'Sri Krishna & Radha',
    sanskrit: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे । हरे राम हरे राम राम राम हरे हरे ॥',
    transliteration: 'hare kṛṣṇa hare kṛṣṇa kṛṣṇa kṛṣṇa hare hare | hare rāma hare rāma rāma rāma hare hare',
    translation: 'O all-attractive Supreme Lord Krishna, O divine energy Radha, please engage me in your loving transcendental service.',
    recommendedMaterial: 'tulsi',
    accentColor: 'from-amber-500/20 via-orange-500/10 to-primary/10 border-amber-500/30 text-amber-600 dark:text-amber-400',
  },
  {
    id: 'shiva-panchakshari',
    name: 'Shiva Panchakshari Mantra',
    deity: 'Lord Shiva',
    sanskrit: 'ॐ नमः शिवाय',
    transliteration: 'oṁ namaḥ śivāya',
    translation: 'I bow with supreme reverence to Lord Shiva, the auspicious, pure, and eternal consciousness of the universe.',
    recommendedMaterial: 'rudraksha',
    accentColor: 'from-orange-500/20 via-rose-500/10 to-amber-500/10 border-orange-500/30 text-orange-600 dark:text-orange-400',
  },
  {
    id: 'gayatri',
    name: 'Maha Gayatri Mantra',
    deity: 'Savitri / Mother Gayatri',
    sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥',
    transliteration: 'oṁ bhūr bhuvaḥ svaḥ tat-savitur vareṇyaṁ bhargo devasya dhīmahi dhiyo yo naḥ pracodayāt',
    translation: 'We meditate on the supreme transcendental radiance of the Divine Sun; may that divine illumination enlighten our intellect and dispel all darkness.',
    recommendedMaterial: 'sphatik',
    accentColor: 'from-yellow-500/20 via-amber-500/10 to-emerald-500/10 border-yellow-500/30 text-yellow-600 dark:text-yellow-400',
  },
  {
    id: 'maha-mrityunjaya',
    name: 'Maha Mrityunjaya Mantra',
    deity: 'Tryambaka Shiva',
    sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् । उर्वारुकमिव बन्धनान्मृत्य pushyeya ॥',
    transliteration: 'oṁ tryambakaṁ yajāmahe sugandhiṁ puṣṭi-vardhanam | urvārukam iva bandhanān mṛtyor mukṣīya māmṛtāt',
    translation: 'We worship the Three-Eyed Lord who is fragrant and nourishes all beings. As a ripe melon is effortlessly freed from its vine, may we be liberated from the bondage of mortality.',
    recommendedMaterial: 'rudraksha',
    accentColor: 'from-cyan-500/20 via-sky-500/10 to-indigo-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400',
  },
  {
    id: 'om-namo-narayanaya',
    name: 'Ashtakshara Narayana Mantra',
    deity: 'Lord Narayana',
    sanskrit: 'ॐ नमो नारायणाय',
    transliteration: 'oṁ namo nārāyaṇāya',
    translation: 'I surrender and offer all my salutations unto Narayana, the supreme resting sanctuary of all living beings.',
    recommendedMaterial: 'chandan',
    accentColor: 'from-emerald-500/20 via-teal-500/10 to-primary/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 'pranava-om',
    name: 'Pranava Om (The Universal Sound)',
    deity: 'Parabrahman',
    sanskrit: 'ॐ',
    transliteration: 'oṁ',
    translation: 'The primordial primordial vibration of supreme consciousness encompassing creation, preservation, and dissolution.',
    recommendedMaterial: 'sphatik',
    accentColor: 'from-purple-500/20 via-violet-500/10 to-indigo-500/10 border-purple-500/30 text-purple-600 dark:text-purple-400',
  },
]

export const BEAD_MATERIALS: {
  id: BeadMaterial
  name: string
  sanskrit: string
  description: string
  color: string
  gradient: string
  borderColor: string
}[] = [
  {
    id: 'tulsi',
    name: 'Sacred Tulsi Wood',
    sanskrit: 'तुलसी',
    description: 'Golden holy basil beads, revered for Krishna & Rama devotion. Purifies heart & aura.',
    color: '#D4A373',
    gradient: 'from-[#E6B88A] to-[#B07D4F]',
    borderColor: '#B07D4F',
  },
  {
    id: 'rudraksha',
    name: 'Himalayan Rudraksha',
    sanskrit: 'रुद्राक्ष',
    description: 'Earthy 5-mukhi seeds from the Himalayas. Sacred tears of Shiva, calms the nervous system.',
    color: '#8C4320',
    gradient: 'from-[#A65B2E] to-[#6E2E12]',
    borderColor: '#6E2E12',
  },
  {
    id: 'chandan',
    name: 'Rakta Chandan (Red Sandalwood)',
    sanskrit: 'रक्तचन्दन',
    description: 'Aromatic red sandalwood. Cools mental agitation, brings profound peace and stability.',
    color: '#9E2A2B',
    gradient: 'from-[#B33939] to-[#781B1C]',
    borderColor: '#781B1C',
  },
  {
    id: 'sphatik',
    name: 'Sphatik (Clear Quartz Crystal)',
    sanskrit: 'स्फटिक',
    description: 'Cool, translucent Himalayan quartz. Amplifies mantra resonance, clarity, and focus.',
    color: '#E0E7FF',
    gradient: 'from-[#F8FAFC] to-[#CBD5E1]',
    borderColor: '#94A3B8',
  },
]

export function JapaMalaView() {
  const store = useStore()

  // State
  const [currentBead, setCurrentBead] = useState(0) // 0 to 108
  const [completedRounds, setCompletedRounds] = useState(0)
  const [targetRounds, setTargetRounds] = useState(1) // 1, 4, 16, or 0 (endless)
  const [selectedMantra, setSelectedMantra] = useState<SacredMantra>(SACRED_MANTRAS[0])
  const [material, setMaterial] = useState<BeadMaterial>('tulsi')
  const [isVoiceMode, setIsVoiceMode] = useState(true)
  const [sensitivity, setSensitivity] = useState<VoiceSensitivity>('medium')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [hapticsEnabled, setHapticsEnabled] = useState(true)
  const [tanpuraPlaying, setTanpuraPlaying] = useState(false)

  // Modals
  const [mantraModalOpen, setMantraModalOpen] = useState(false)
  const [customMantraInput, setCustomMantraInput] = useState('')
  const [completionModalOpen, setCompletionModalOpen] = useState(false)

  // Session timing & stats
  const [sessionStartTime, setSessionStartTime] = useState<number>(Date.now())
  const [sessionSeconds, setSessionSeconds] = useState(0)
  const [totalSessionChants, setTotalSessionChants] = useState(0)

  // Timer tick
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSeconds(Math.floor((Date.now() - sessionStartTime) / 1000))
    }, 1000)
    return () => clearInterval(timer)
  }, [sessionStartTime])

  // Advance bead logic
  const handleAdvanceBead = (source: 'voice' | 'touch' = 'touch') => {
    setCurrentBead((prev) => {
      const next = prev + 1
      setTotalSessionChants((c) => c + 1)

      // Audio feedback
      if (soundEnabled) {
        if (next === 108) {
          playSingingBowlChime(0.7)
        } else {
          playBeadClick(material, 0.45)
        }
      }

      // Haptics
      if (hapticsEnabled) {
        if (next === 108) {
          triggerMalaHaptic('complete')
        } else if (next === 27 || next === 54 || next === 81) {
          triggerMalaHaptic('quarter')
        } else {
          triggerMalaHaptic('bead')
        }
      }

      // 108 Milestone Check
      if (next >= 108) {
        setCompletedRounds((r) => r + 1)
        triggerXpGain(108)
        toast.success('🪷 1 Full Mala Completed (108 Chants)! +108 Dharma XP', {
          description: `Devotion dedicated to ${selectedMantra.deity}. May inner peace bloom.`,
        })
        setCompletionModalOpen(true)
        return 0 // Reset for next round
      }

      return next
    })
  }

  // Voice Japa Hook
  const { isListening, hasPermission, audioLevel, permissionError } = useVoiceJapa({
    onChantDetected: () => handleAdvanceBead('voice'),
    enabled: isVoiceMode,
    sensitivity,
  })

  // Keyboard shortcut: Spacebar advances bead
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.code === 'Space' && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault()
        handleAdvanceBead('touch')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [material, soundEnabled, hapticsEnabled])

  // Tanpura drone toggle
  const toggleTanpura = () => {
    if (tanpuraPlaying) {
      stopTanpuraDrone()
      setTanpuraPlaying(false)
      toast.info('Tanpura drone stopped')
    } else {
      startTanpuraDrone(0.22)
      setTanpuraPlaying(true)
      toast.success('Tanpura drone started (432Hz harmonic bed)')
    }
  }

  // Stop Tanpura on unmount
  useEffect(() => {
    return () => {
      stopTanpuraDrone()
    }
  }, [])

  // Calculate Chanting Pace (chants per minute)
  const pace = useMemo(() => {
    if (sessionSeconds < 10 || totalSessionChants === 0) return 0
    return Math.round((totalSessionChants / sessionSeconds) * 60)
  }, [totalSessionChants, sessionSeconds])

  // Format Elapsed Time
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60)
    const rem = secs % 60
    return `${mins}:${String(rem).padStart(2, '0')}`
  }

  // Bead points generation for the circular Mala wheel (108 beads)
  const beadPositions = useMemo(() => {
    const total = 108
    const radius = 140 // SVG radius
    const cx = 160
    const cy = 160
    return Array.from({ length: total }, (_, i) => {
      // Start from top (-90 degrees) and rotate clockwise
      const angle = (i / total) * 2 * Math.PI - Math.PI / 2
      const x = cx + radius * Math.cos(angle)
      const y = cy + radius * Math.sin(angle)
      return { index: i, x, y }
    })
  }, [])

  const selectedMaterialMeta = BEAD_MATERIALS.find((m) => m.id === material) || BEAD_MATERIALS[0]

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 stagger-group">
      {/* Sacred Mantra Header Card */}
      <div className="card-serene relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-card via-card/95 to-primary/[0.05] border border-border/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-saffron-gradient-soft border border-primary/20 flex items-center justify-center text-xl shrink-0">
              <OmSymbol size={18} className="text-primary" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-primary font-bold">
                Acoustic Haptic Japa Mala
              </div>
              <h1
                className="text-xl sm:text-2xl font-bold text-foreground leading-tight"
                style={{ fontFamily: 'var(--font-cinzel), var(--font-serif-display), serif' }}
              >
                {selectedMantra.name}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMantraModalOpen(true)}
              className="rounded-xl text-xs h-9 border-primary/30 text-primary hover:bg-primary/10 cursor-pointer"
            >
              <Disc className="w-3.5 h-3.5 mr-1.5" />
              <span>Change Mantra</span>
            </Button>
          </div>
        </div>

        {/* Sanskrit Mantra Display */}
        <div className="p-4 sm:p-5 rounded-2xl bg-muted/30 border border-border/50 text-center relative overflow-hidden">
          <div
            className="text-base sm:text-2xl font-bold text-foreground leading-relaxed tracking-wide mb-2"
            style={{ fontFamily: 'var(--font-noto-devanagari), serif' }}
          >
            {selectedMantra.sanskrit}
          </div>
          <div className="text-xs sm:text-sm text-primary font-medium tracking-wide italic mb-1.5">
            {selectedMantra.transliteration}
          </div>
          <p className="text-[11px] sm:text-xs text-muted-foreground/90 max-w-2xl mx-auto leading-relaxed">
            {selectedMantra.translation}
          </p>
        </div>
      </div>

      {/* Main Japa Mala Interactive Sanctuary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: The 108 Sacred Mala Visualizer */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center card-serene p-6 sm:p-8 rounded-3xl bg-card border border-border/60 relative overflow-hidden select-none">
          {/* Ambient Vocal Prana Aura (Glows dynamically with microphone volume) */}
          <div
            className="absolute rounded-full pointer-events-none transition-all duration-150 ease-out"
            style={{
              width: 320,
              height: 320,
              background: `radial-gradient(circle, ${selectedMaterialMeta.color}35 0%, transparent 70%)`,
              transform: `scale(${1 + audioLevel * 1.8})`,
              opacity: isVoiceMode ? 0.3 + audioLevel * 0.7 : 0.15,
            }}
          />

          {/* SVG 108 Bead Rosary Wheel */}
          <div className="relative w-[300px] h-[300px] sm:w-[320px] sm:h-[320px] flex items-center justify-center">
            <svg
              viewBox="0 0 320 320"
              className="w-full h-full cursor-pointer touch-none"
              onClick={() => handleAdvanceBead('touch')}
              aria-label="Click anywhere on the mala or press Spacebar to advance bead"
            >
              <title>Click anywhere on the mala or press Spacebar to advance bead</title>
              {/* Sacred String Loop */}
              <circle
                cx="160"
                cy="160"
                r="140"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-border/40"
                strokeDasharray="4 4"
              />

              {/* Golden Meru Bead (Guru Bead at top 0/108) */}
              <g className="transition-transform duration-300">
                <circle
                  cx="160"
                  cy="20"
                  r="7.5"
                  fill="#F59E0B"
                  stroke="#D97706"
                  strokeWidth="2"
                  className="filter drop-shadow-md"
                />
                {/* Meru Bead Tassel */}
                <path
                  d="M160 12.5 L157 2 L163 2 Z"
                  fill="#F59E0B"
                  opacity="0.9"
                />
              </g>

              {/* 108 Sacred Beads */}
              {beadPositions.map((pos) => {
                const isPassed = pos.index < currentBead
                const isCurrent = pos.index === currentBead
                const isQuarter = pos.index === 27 || pos.index === 54 || pos.index === 81

                return (
                  <circle
                    key={pos.index}
                    cx={pos.x}
                    cy={pos.y}
                    r={isCurrent ? 6 : isQuarter ? 4.8 : 3.8}
                    fill={
                      isCurrent
                        ? '#F59E0B'
                        : isPassed
                        ? selectedMaterialMeta.color
                        : 'var(--muted)'
                    }
                    stroke={
                      isCurrent
                        ? '#F59E0B'
                        : isPassed
                        ? selectedMaterialMeta.borderColor
                        : 'var(--border)'
                    }
                    strokeWidth={isCurrent ? 2 : 1}
                    className={cn(
                      'transition-all duration-200',
                      isCurrent && 'animate-pulse'
                    )}
                  />
                )
              })}
            </svg>

            {/* Center Tactile Hub (Interactive Tap surface) */}
            <div
              onClick={() => handleAdvanceBead('touch')}
              className="absolute inset-0 m-auto w-36 h-36 sm:w-40 sm:h-40 rounded-full flex flex-col items-center justify-center bg-gradient-to-br from-card via-card/95 to-muted/40 border border-primary/30 shadow-lg cursor-pointer hover:scale-[1.03] active:scale-[0.97] transition-all group"
            >
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary/80 mb-0.5">
                Mala {completedRounds + 1}
              </span>
              <div
                className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors"
                style={{ fontFamily: 'var(--font-cinzel), serif' }}
              >
                {currentBead}
              </div>
              <div className="text-[11px] text-muted-foreground font-medium mt-0.5">
                of 108 Chants
              </div>

              {/* Voice pulse indicator in center */}
              {isVoiceMode && (
                <div className="flex items-center gap-1.5 mt-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] text-primary">
                  <span
                    className={cn(
                      'w-1.5 h-1.5 rounded-full bg-primary transition-transform',
                      audioLevel > 0.04 ? 'scale-150 animate-ping' : 'scale-100'
                    )}
                  />
                  <span>Listening</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Tap Helper Text */}
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground/80 flex items-center justify-center gap-1.5">
              <span>Tap bead wheel, tap center counter, or press</span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-muted border border-border">Spacebar</kbd>
            </p>
          </div>

          {/* Bottom Quick Actions: Undo & Reset Round */}
          <div className="flex items-center gap-3 mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentBead((b) => Math.max(0, b - 1))}
              disabled={currentBead === 0}
              className="text-xs text-muted-foreground hover:text-foreground h-8 rounded-xl cursor-pointer"
            >
              Undo (-1)
            </Button>
            <span className="text-muted-foreground/40">·</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (window.confirm('Reset current 108 round to 0?')) {
                  setCurrentBead(0)
                  toast.info('Round reset to 0')
                }
              }}
              className="text-xs text-muted-foreground hover:text-destructive h-8 rounded-xl cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 mr-1" /> Reset Round
            </Button>
          </div>
        </div>

        {/* Right Column: Mala Controls, Voice Setup & Sacred Sound */}
        <div className="lg:col-span-5 space-y-5">
          {/* Voice Detection / Manual Mode Card */}
          <div className="card-serene p-5 sm:p-6 rounded-3xl bg-card border border-border/60">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className={cn(
                  'w-9 h-9 rounded-xl flex items-center justify-center transition-colors',
                  isVoiceMode ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground'
                )}>
                  {isVoiceMode ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">
                    Hands-Free Voice Japa
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {isVoiceMode ? 'Auto-advances as you chant' : 'Manual tap & spacebar mode'}
                  </div>
                </div>
              </div>

              <Button
                variant={isVoiceMode ? 'default' : 'outline'}
                size="sm"
                onClick={() => setIsVoiceMode(!isVoiceMode)}
                className="rounded-xl text-xs h-8 cursor-pointer"
              >
                {isVoiceMode ? 'Voice ON' : 'Turn Voice ON'}
              </Button>
            </div>

            {/* Voice Sensitivity Slider when voice mode is ON */}
            {isVoiceMode && (
              <div className="pt-3 border-t border-border/40 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-medium">Mic Sensitivity:</span>
                  <div className="flex gap-1.5">
                    {(['whisper', 'medium', 'loud'] as VoiceSensitivity[]).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setSensitivity(mode)}
                        className={cn(
                          'px-2 py-0.5 rounded-lg text-[10px] font-medium transition-all capitalize cursor-pointer',
                          sensitivity === mode
                            ? 'bg-primary text-primary-foreground shadow-xs'
                            : 'bg-muted/60 text-muted-foreground hover:text-foreground'
                        )}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Mic Meter Bar */}
                <div className="space-y-1">
                  <div className="h-1.5 w-full bg-muted/60 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 via-primary to-amber-500 transition-all duration-75 rounded-full"
                      style={{ width: `${Math.min(100, audioLevel * 250)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground/70">
                    <span>Vocal energy</span>
                    <span>{audioLevel > 0.05 ? 'Mantra Detected' : 'Waiting for chant...'}</span>
                  </div>
                </div>

                {permissionError && (
                  <p className="text-[11px] text-amber-600 dark:text-amber-400 bg-amber-500/10 p-2 rounded-lg">
                    {permissionError}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Bead Material Selector */}
          <div className="card-serene p-5 sm:p-6 rounded-3xl bg-card border border-border/60">
            <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground mb-3 block">
              Sacred Bead Material
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {BEAD_MATERIALS.map((mat) => {
                const isSelected = material === mat.id
                return (
                  <button
                    key={mat.id}
                    onClick={() => {
                      setMaterial(mat.id)
                      playBeadClick(mat.id, 0.5)
                      toast.success(`Switched to ${mat.name}`)
                    }}
                    className={cn(
                      'p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1 relative overflow-hidden',
                      isSelected
                        ? 'bg-primary/10 border-primary/50 shadow-xs'
                        : 'bg-muted/20 border-border/60 hover:border-primary/30'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3.5 h-3.5 rounded-full shadow-xs shrink-0"
                        style={{ backgroundColor: mat.color }}
                      />
                      <span className="text-xs font-bold text-foreground truncate">
                        {mat.name.split(' ')[0]}
                      </span>
                    </div>
                    <span className="text-[10px] text-muted-foreground line-clamp-1">
                      {mat.sanskrit}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Sound & Sensory Atmosphere Card */}
          <div className="card-serene p-5 sm:p-6 rounded-3xl bg-card border border-border/60 space-y-3.5">
            <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground block">
              Acoustic & Tactile Sensations
            </span>

            {/* 432Hz Tanpura Drone */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-base">🪕</span>
                <div>
                  <div className="font-semibold text-foreground">432Hz Tanpura Drone</div>
                  <div className="text-[10px] text-muted-foreground">Meditative harmonic acoustic bed</div>
                </div>
              </div>
              <Button
                variant={tanpuraPlaying ? 'default' : 'outline'}
                size="sm"
                onClick={toggleTanpura}
                className="h-8 rounded-xl text-xs cursor-pointer"
              >
                {tanpuraPlaying ? 'Playing' : 'Start'}
              </Button>
            </div>

            {/* Tactile Haptics */}
            <div className="flex items-center justify-between pt-2 border-t border-border/40">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-base">📳</span>
                <div>
                  <div className="font-semibold text-foreground">Tactile Micro-Haptics</div>
                  <div className="text-[10px] text-muted-foreground">Vibrate phone on each bead</div>
                </div>
              </div>
              <Button
                variant={hapticsEnabled ? 'default' : 'outline'}
                size="sm"
                onClick={() => setHapticsEnabled(!hapticsEnabled)}
                className="h-8 rounded-xl text-xs cursor-pointer"
              >
                {hapticsEnabled ? 'On' : 'Off'}
              </Button>
            </div>

            {/* Bead Sound Tock */}
            <div className="flex items-center justify-between pt-2 border-t border-border/40">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-base">🔊</span>
                <div>
                  <div className="font-semibold text-foreground">Acoustic Bead Click</div>
                  <div className="text-[10px] text-muted-foreground">Real wood/seed resonance</div>
                </div>
              </div>
              <Button
                variant={soundEnabled ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="h-8 rounded-xl text-xs cursor-pointer"
              >
                {soundEnabled ? 'On' : 'Off'}
              </Button>
            </div>
          </div>

          {/* Session Statistics Bar */}
          <div className="card-serene p-4 sm:p-5 rounded-2xl bg-muted/20 border border-border/60 grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-lg font-bold text-foreground">{completedRounds}</div>
              <div className="text-[10px] text-muted-foreground uppercase font-medium">Malas Done</div>
            </div>
            <div className="border-x border-border/40">
              <div className="text-lg font-bold text-primary">{pace}</div>
              <div className="text-[10px] text-muted-foreground uppercase font-medium">Chants / Min</div>
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">{formatTime(sessionSeconds)}</div>
              <div className="text-[10px] text-muted-foreground uppercase font-medium">Duration</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mantra Switcher Modal */}
      <Dialog open={mantraModalOpen} onOpenChange={setMantraModalOpen}>
        <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-y-auto p-6 border-primary/20 bg-background/95 backdrop-blur-xl">
          <DialogHeader className="pb-3 border-b border-border/50">
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <Disc className="w-5 h-5 text-primary" />
              <span>Select Sacred Mantra for Japa</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Choose from traditional Vedic, Pauranic, and Krishna mantras, or enter your personal mantra.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 pt-3">
            {SACRED_MANTRAS.map((m) => {
              const isSelected = selectedMantra.id === m.id
              return (
                <div
                  key={m.id}
                  onClick={() => {
                    setSelectedMantra(m)
                    setMaterial(m.recommendedMaterial)
                    setMantraModalOpen(false)
                    toast.success(`Selected ${m.name}`)
                  }}
                  className={cn(
                    'p-4 rounded-2xl border transition-all cursor-pointer group',
                    isSelected
                      ? 'bg-primary/10 border-primary/50 shadow-sm'
                      : 'bg-card border-border/60 hover:border-primary/40 hover:bg-muted/30'
                  )}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                      {m.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                      {m.deity}
                    </span>
                  </div>
                  <div
                    className="text-sm font-semibold text-foreground/90 mb-1"
                    style={{ fontFamily: 'var(--font-noto-devanagari), serif' }}
                  >
                    {m.sanskrit}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {m.translation}
                  </p>
                </div>
              )
            })}

            {/* Custom Mantra Option */}
            <div className="pt-2 border-t border-border/40">
              <span className="text-xs font-semibold text-muted-foreground block mb-2">
                Or enter your own Guru-given mantra:
              </span>
              <div className="flex gap-2">
                <Input
                  value={customMantraInput}
                  onChange={(e) => setCustomMantraInput(e.target.value)}
                  placeholder="e.g. ॐ नमो भगवते वासुदेवाय"
                  className="rounded-xl text-xs h-9"
                />
                <Button
                  size="sm"
                  onClick={() => {
                    if (!customMantraInput.trim()) return
                    const custom: SacredMantra = {
                      id: `custom-${Date.now()}`,
                      name: 'Custom Sacred Mantra',
                      deity: 'Ishta Devata',
                      sanskrit: customMantraInput.trim(),
                      transliteration: customMantraInput.trim(),
                      translation: 'Personal sacred devotional mantra.',
                      recommendedMaterial: 'tulsi',
                      accentColor: 'from-primary/20 to-primary/5 border-primary/30 text-primary',
                    }
                    setSelectedMantra(custom)
                    setMantraModalOpen(false)
                    toast.success('Custom mantra loaded!')
                  }}
                  className="rounded-xl text-xs h-9 px-4 shrink-0"
                >
                  Set Mantra
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 108 Full Mala Completion Celebration Modal */}
      <Dialog open={completionModalOpen} onOpenChange={setCompletionModalOpen}>
        <DialogContent className="sm:max-w-md p-6 text-center border-amber-500/30 bg-gradient-to-b from-card via-card to-amber-500/[0.08] backdrop-blur-xl">
          <div className="mx-auto w-16 h-16 rounded-3xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center text-3xl mb-3 border border-amber-500/30 animate-bounce">
            🪷
          </div>

          <h3
            className="text-xl sm:text-2xl font-bold text-foreground mb-1"
            style={{ fontFamily: 'var(--font-cinzel), serif' }}
          >
            Mala {completedRounds} Completed!
          </h3>

          <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">
            108 sacred repetitions of <span className="font-semibold text-foreground">{selectedMantra.name}</span> fulfilled. May the divine vibration purify your consciousness.
          </p>

          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center gap-3 mb-5">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <div className="text-left">
              <div className="text-xs font-bold text-foreground">+108 Dharma XP Awarded</div>
              <div className="text-[11px] text-muted-foreground">Total Chants this session: {totalSessionChants}</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <Button
              onClick={() => {
                setCompletionModalOpen(false)
                setCurrentBead(0)
                toast.success(`Starting Mala Round ${completedRounds + 1} 🙏`)
              }}
              className="w-full rounded-xl bg-primary text-primary-foreground font-semibold h-10 cursor-pointer"
            >
              <span>Begin Round {completedRounds + 1}</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
            <Button
              variant="outline"
              onClick={() => setCompletionModalOpen(false)}
              className="w-full rounded-xl h-10 border-border/70 text-xs cursor-pointer"
            >
              Rest in Silence
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
