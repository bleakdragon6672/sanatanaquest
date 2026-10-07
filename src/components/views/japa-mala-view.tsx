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
  AlertCircle,
  RefreshCw,
  Clock,
  Zap,
  Laptop,
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
import {
  useVoiceJapa,
  type VoiceSensitivity,
  SENSITIVITY_THRESHOLDS,
} from '@/hooks/use-voice-japa'
import { OmSymbol, LotusIcon } from '@/components/spiritual-icons'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import dynamic from 'next/dynamic'

const JapaMala3D = dynamic(
  () => import('@/components/japa/japa-mala-3d').then((mod) => mod.JapaMala3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-square max-w-[450px] mx-auto flex items-center justify-center rounded-3xl bg-muted/20 border border-border/40">
        <div className="flex flex-col items-center gap-2 text-muted-foreground text-xs">
          <span className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span>Entering 3D Sanctuary...</span>
        </div>
      </div>
    ),
  }
)

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
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d')
  const [isVoiceMode, setIsVoiceMode] = useState(false)
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
        setIsAutoFlowRunning(false)
        toast.success('🪷 1 Full Mala Completed (108 Chants)! +108 Dharma XP', {
          description: `Devotion dedicated to ${selectedMantra.deity}. May inner peace bloom.`,
        })
        setCompletionModalOpen(true)
        return 0 // Reset for next round
      }

      return next
    })
  }

  // Visual count feedback flash
  const [justCounted, setJustCounted] = useState(false)
  const countTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Hands-free Mode: 'auto' (cadence flow without mic) or 'voice' (microphone)
  const [handsFreeTab, setHandsFreeTab] = useState<'voice' | 'auto'>('auto')
  const [isAutoFlowRunning, setIsAutoFlowRunning] = useState(false)
  const [autoPaceSecs, setAutoPaceSecs] = useState<number>(3.5)

  // Voice Japa Hook
  const {
    isListening,
    hasPermission,
    isPermissionDenied,
    audioLevel,
    rawRms,
    permissionError,
    rawError,
    lastChantTimestamp,
    startListening,
    stopListening,
  } = useVoiceJapa({
    onChantDetected: () => {
      handleAdvanceBead('voice')
      setJustCounted(true)
      if (countTimerRef.current) clearTimeout(countTimerRef.current)
      countTimerRef.current = setTimeout(() => setJustCounted(false), 850)
    },
    sensitivity,
  })

  // Auto-Pace Hands-Free Flow Timer
  useEffect(() => {
    if (!isAutoFlowRunning) return

    const interval = setInterval(() => {
      handleAdvanceBead('touch')
      setJustCounted(true)
      if (countTimerRef.current) clearTimeout(countTimerRef.current)
      countTimerRef.current = setTimeout(() => setJustCounted(false), 850)
    }, autoPaceSecs * 1000)

    return () => clearInterval(interval)
  }, [isAutoFlowRunning, autoPaceSecs, material, soundEnabled, hapticsEnabled])

  // Flash feedback on lastChantTimestamp
  useEffect(() => {
    if (lastChantTimestamp > 0) {
      setJustCounted(true)
      if (countTimerRef.current) clearTimeout(countTimerRef.current)
      countTimerRef.current = setTimeout(() => setJustCounted(false), 850)
    }
    return () => {
      if (countTimerRef.current) clearTimeout(countTimerRef.current)
    }
  }, [lastChantTimestamp])

  // Explicit user action to start/stop voice mode
  const handleToggleVoiceMode = async () => {
    if (isListening) {
      stopListening()
      setIsVoiceMode(false)
      toast.info('Hands-free voice mode turned off')
    } else {
      setIsAutoFlowRunning(false)
      const ok = await startListening()
      if (ok) {
        setIsVoiceMode(true)
        toast.success('🎙️ Microphone active! Chant mantra to advance beads')
      } else {
        setIsVoiceMode(false)
      }
    }
  }

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
        <div className="lg:col-span-7 flex flex-col items-center justify-center card-serene p-5 sm:p-7 rounded-3xl bg-card border border-border/60 relative overflow-hidden select-none">
          {/* Top Bar: Visualizer Mode Toggle */}
          <div className="w-full flex items-center justify-between mb-3 z-10">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground">
                Mala Visualizer
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold border border-amber-500/20 uppercase">
                {selectedMaterialMeta.name.split(' ')[0]} · 108 BEADS
              </span>
            </div>

            {/* 3D vs 2D Toggle */}
            <div className="flex bg-muted/60 p-1 rounded-xl gap-1">
              <button
                onClick={() => setViewMode('3d')}
                className={cn(
                  'px-2.5 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5',
                  viewMode === '3d'
                    ? 'bg-card text-foreground shadow-xs font-bold text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>3D Strand</span>
              </button>
              <button
                onClick={() => setViewMode('2d')}
                className={cn(
                  'px-2.5 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5',
                  viewMode === '2d'
                    ? 'bg-card text-foreground shadow-xs font-bold text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Disc className="w-3.5 h-3.5" />
                <span>2D Orbit</span>
              </button>
            </div>
          </div>

          {/* VIEW 1: 3D SACRED STRAND (GPU-ACCELERATED, ZERO-LAG INSTANCING) */}
          {viewMode === '3d' && (
            <div className="w-full flex flex-col items-center animate-fade-in relative my-1">
              <JapaMala3D
                currentBead={currentBead}
                material={material}
                onAdvanceBead={() => handleAdvanceBead('touch')}
                tanpuraPlaying={tanpuraPlaying}
                justCounted={justCounted}
              />
            </div>
          )}

          {/* VIEW 2: 2D MINIMALIST ORBIT */}
          {viewMode === '2d' && (
            <>
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
              <div className="relative w-[300px] h-[300px] sm:w-[320px] sm:h-[320px] flex items-center justify-center animate-fade-in my-2">
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
              className={cn(
                'absolute inset-0 m-auto w-36 h-36 sm:w-40 sm:h-40 rounded-full flex flex-col items-center justify-center bg-gradient-to-br from-card via-card/95 to-muted/40 border shadow-lg cursor-pointer hover:scale-[1.03] active:scale-[0.97] transition-all group',
                justCounted
                  ? 'border-emerald-500 shadow-emerald-500/30 ring-4 ring-emerald-500/20 scale-105'
                  : 'border-primary/30'
              )}
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

              {/* Status indicator in center */}
              {justCounted ? (
                <div className="flex items-center gap-1 mt-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold animate-pulse">
                  <span>📿 Counted!</span>
                </div>
              ) : isAutoFlowRunning ? (
                <div className="flex items-center gap-1.5 mt-1.5 px-2.5 py-0.5 rounded-full bg-primary/20 border border-primary/40 text-[10px] text-primary font-bold animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                  <span>Auto-Flow ({autoPaceSecs}s)</span>
                </div>
              ) : isListening ? (
                <div className="flex items-center gap-1.5 mt-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] text-emerald-600 dark:text-emerald-400">
                  <span
                    className={cn(
                      'w-1.5 h-1.5 rounded-full bg-emerald-500 transition-transform',
                      rawRms >= SENSITIVITY_THRESHOLDS[sensitivity] ? 'scale-150 animate-ping' : 'scale-100'
                    )}
                  />
                  <span>{rawRms >= SENSITIVITY_THRESHOLDS[sensitivity] ? 'Chanting...' : 'Listening'}</span>
                </div>
              ) : isPermissionDenied || permissionError ? (
                <div className="flex items-center gap-1 mt-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-[10px] text-amber-600 dark:text-amber-400">
                  <AlertCircle className="w-3 h-3" />
                  <span>Tap or Spacebar</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 mt-1.5 px-2.5 py-0.5 rounded-full bg-muted border border-border/60 text-[10px] text-muted-foreground">
                  <span>👆 Tap or Spacebar</span>
                </div>
              )}
            </div>
          </div>
        </>
      )}

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
          {/* Hands-Free Chanting Studio Card */}
          <div className="card-serene p-5 sm:p-6 rounded-3xl bg-card border border-border/60">
            {/* Header with Mode Tabs */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground">
                  Hands-Free Chanting
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                  {handsFreeTab === 'auto'
                    ? isAutoFlowRunning
                      ? 'Flowing 🟢'
                      : 'Auto-Pace'
                    : isListening
                    ? 'Voice Active 🟢'
                    : 'Voice Mic'}
                </span>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="flex bg-muted/60 p-1 rounded-xl gap-1">
                <button
                  onClick={() => {
                    setHandsFreeTab('auto')
                    if (isListening) stopListening()
                  }}
                  className={cn(
                    'px-2.5 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5',
                    handsFreeTab === 'auto'
                      ? 'bg-card text-foreground shadow-xs font-bold'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Auto-Flow</span>
                </button>
                <button
                  onClick={() => {
                    setHandsFreeTab('voice')
                    setIsAutoFlowRunning(false)
                  }}
                  className={cn(
                    'px-2.5 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5',
                    handsFreeTab === 'voice'
                      ? 'bg-card text-foreground shadow-xs font-bold'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>Voice Mic</span>
                </button>
              </div>
            </div>

            {/* TAB 1: AUTO-FLOW MODE (100% RELIABLE, ZERO MIC PERMISSIONS NEEDED) */}
            {handsFreeTab === 'auto' && (
              <div className="space-y-4 animate-fade-in">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Auto-advances beads at your chosen chanting rhythm with authentic bead clicks, haptics, and 108 milestone chime. Perfect for deep meditation with eyes closed!
                </p>

                {/* Pace Selection Chips */}
                <div>
                  <div className="text-[11px] font-semibold text-foreground mb-2 flex items-center justify-between">
                    <span>Chanting Pace:</span>
                    <span className="text-primary font-bold">{autoPaceSecs}s per mantra</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Quick', desc: 'Fast Kirtan', secs: 2.0, icon: Zap },
                      { label: 'Natural', desc: 'Standard Japa', secs: 3.5, icon: Clock },
                      { label: 'Deep', desc: 'Meditative', secs: 5.0, icon: LotusIcon },
                    ].map((p) => {
                      const IconComp = p.icon
                      const isSel = autoPaceSecs === p.secs
                      return (
                        <button
                          key={p.secs}
                          onClick={() => setAutoPaceSecs(p.secs)}
                          className={cn(
                            'p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col',
                            isSel
                              ? 'border-primary bg-primary/10 shadow-xs'
                              : 'border-border/60 bg-muted/30 hover:border-border text-muted-foreground hover:text-foreground'
                          )}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <IconComp className={cn('w-3.5 h-3.5', isSel ? 'text-primary' : 'text-muted-foreground')} />
                            <span className="text-xs font-bold text-foreground">{p.label}</span>
                          </div>
                          <span className="text-[10px] text-muted-foreground">{p.secs}s ({p.desc})</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Big Start / Pause Auto-Flow Button */}
                <Button
                  onClick={() => {
                    if (isAutoFlowRunning) {
                      setIsAutoFlowRunning(false)
                      toast.info('Auto-Flow paused')
                    } else {
                      setIsAutoFlowRunning(true)
                      toast.success(`📿 Auto-Flow started! 1 bead every ${autoPaceSecs} seconds`)
                    }
                  }}
                  className={cn(
                    'w-full h-11 rounded-2xl font-bold text-sm cursor-pointer shadow-sm transition-all',
                    isAutoFlowRunning
                      ? 'bg-amber-600 hover:bg-amber-700 text-white'
                      : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                  )}
                >
                  {isAutoFlowRunning ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      <span>Pause Auto-Flow</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      <span>Start Hands-Free Flow ({autoPaceSecs}s / bead)</span>
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* TAB 2: VOICE ACTIVATED CHANTING */}
            {handsFreeTab === 'voice' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={cn(
                        'w-9 h-9 rounded-xl flex items-center justify-center transition-colors',
                        isListening
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                          : 'bg-muted text-muted-foreground'
                      )}
                    >
                      {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-foreground">
                        Voice Cadence Detection
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        {isListening ? 'Microphone active — chant to advance' : 'Speak mantra aloud to roll bead'}
                      </div>
                    </div>
                  </div>

                  <Button
                    variant={isListening ? 'default' : 'outline'}
                    size="sm"
                    onClick={handleToggleVoiceMode}
                    className={cn(
                      'rounded-xl text-xs h-8 cursor-pointer transition-all',
                      isListening
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                        : 'border-primary/40 text-primary hover:bg-primary/10'
                    )}
                  >
                    {isListening ? 'Voice Active 🟢' : 'Enable Voice'}
                  </Button>
                </div>

                {/* If Permission Denied / Error: Clear Mac & Browser Fix Guide */}
                {(isPermissionDenied || permissionError) && (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3.5 animate-fade-in">
                    <div className="flex items-start gap-2.5">
                      <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div className="text-xs space-y-1">
                        <div className="font-bold text-foreground">
                          Microphone Blocked by Mac / Browser
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-[11px]">
                          If you clicked &ldquo;Allow&rdquo; in the address bar and it is still blocked, <strong>macOS itself has blocked your browser</strong> from accessing microphone hardware.
                        </p>
                      </div>
                    </div>

                    {/* Step-by-Step Fix for Mac & Browser */}
                    <div className="text-[11px] space-y-2 bg-background/80 p-3 rounded-xl border border-amber-500/20">
                      <div className="font-bold text-foreground text-[11px] flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                        <Laptop className="w-3.5 h-3.5" />
                        <span>Fix on macOS (10 Seconds):</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                        <span>Click Apple menu <strong> &gt; System Settings</strong>.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                        <span>Select <strong>Privacy & Security &gt; Microphone</strong> in the left sidebar.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                        <span>Toggle ON the switch for <strong>Google Chrome</strong>, <strong>Brave</strong>, or <strong>Safari</strong>.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">4</span>
                        <span>Click <strong>Reload Page to Apply</strong> below.</span>
                      </div>
                    </div>

                    {/* Technical Diagnostic string */}
                    {rawError && (
                      <div className="text-[10px] font-mono text-muted-foreground bg-muted/70 px-2.5 py-1 rounded-lg border border-border/40">
                        Diagnostic: {rawError.name}: {rawError.message}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <Button
                        size="sm"
                        onClick={() => window.location.reload()}
                        className="h-8 rounded-xl text-xs bg-amber-600 hover:bg-amber-700 text-white font-semibold cursor-pointer shadow-xs"
                      >
                        <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                        <span>Reload Page to Apply</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleToggleVoiceMode}
                        className="h-8 rounded-xl text-xs border-amber-500/40 text-foreground hover:bg-amber-500/10 cursor-pointer"
                      >
                        <span>Try Mic Again</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setHandsFreeTab('auto')}
                        className="h-8 rounded-xl text-xs text-primary hover:bg-primary/10 cursor-pointer"
                      >
                        <span>Switch to Auto-Flow (No Mic Needed) →</span>
                      </Button>
                    </div>
                  </div>
                )}

                {/* Voice Sensitivity Slider & Live Mic Meter when isListening is true */}
                {isListening && (
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

                    {/* Live Mic Meter Bar with Threshold Marker */}
                    <div className="space-y-1.5">
                      <div className="relative h-2 w-full bg-muted/60 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            'h-full transition-all duration-75 rounded-full',
                            rawRms >= SENSITIVITY_THRESHOLDS[sensitivity]
                              ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50'
                              : 'bg-gradient-to-r from-emerald-500/50 via-primary/50 to-amber-500/50'
                          )}
                          style={{ width: `${Math.min(100, (rawRms / 0.12) * 100)}%` }}
                        />
                        {/* Visual threshold line */}
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-amber-500 shadow-xs"
                          style={{ left: `${Math.min(95, (SENSITIVITY_THRESHOLDS[sensitivity] / 0.12) * 100)}%` }}
                          title={`Trigger threshold: ${sensitivity}`}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="flex items-center gap-1 text-muted-foreground/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                          <span>Trigger line</span>
                        </span>
                        <span
                          className={cn(
                            'font-medium transition-colors',
                            rawRms >= SENSITIVITY_THRESHOLDS[sensitivity]
                              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                              : 'text-muted-foreground/70'
                          )}
                        >
                          {rawRms >= SENSITIVITY_THRESHOLDS[sensitivity]
                            ? 'Mantra Detected! 📿'
                            : 'Chant mantra to roll bead...'}
                        </span>
                      </div>
                    </div>
                  </div>
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
