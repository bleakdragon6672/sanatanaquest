'use client'

import { useState, useEffect, useRef } from 'react'
import { Headphones, Play, Pause, Volume2, VolumeX, Timer, Sparkles, Music, CheckCircle, RotateCcw, Volume1 } from 'lucide-react'
import { OmSymbol } from '@/components/spiritual-icons'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'

export type SoundPreset = 'om432' | 'tanpura' | 'singingBowl' | 'gangesRain' | 'bansuri' | 'tandavChant'

interface SoundTrack {
  id: SoundPreset
  title: string
  sanskrit: string
  description: string
  audioUrl: string
  frequency: string
}

const TRACKS: SoundTrack[] = [
  {
    id: 'om432',
    title: '432Hz Om Sacred Chanting',
    sanskrit: 'ॐकार जप 432Hz',
    description: 'Authentic 432Hz vocal Om meditation soundscape with deep harmonic resonance.',
    audioUrl: '/audio/om432.mp3',
    frequency: '432 Hz Vocal'
  },
  {
    id: 'tanpura',
    title: 'Studio Tanpura Drone (C# Sa-Pa)',
    sanskrit: 'शास्त्र तन्पूरा नाद',
    description: 'Pure acoustic Indian classical Tanpura drone in C# for traditional sadhana.',
    audioUrl: '/audio/tanpura.mp3',
    frequency: 'C# Sa-Pa Drone'
  },
  {
    id: 'singingBowl',
    title: 'Tibetan Singing Bowl Meditation',
    sanskrit: 'तिब्बती घण्टा नाद',
    description: 'Resonant 7-chakra hand-hammered bronze singing bowl overtones.',
    audioUrl: '/audio/singingbowl.mp3',
    frequency: 'Bronze Overtones'
  },
  {
    id: 'gangesRain',
    title: 'Ganges Rain & Temple Stream',
    sanskrit: 'गंगा तट वृष्टि',
    description: 'Gentle rain falling over temple water and bamboo groves.',
    audioUrl: '/audio/gangesrain.mp3',
    frequency: 'Natural Rain HD'
  },
  {
    id: 'bansuri',
    title: 'Divine Bamboo Flute (Bansuri)',
    sanskrit: 'दिव्य वेणु नाद',
    description: 'Soulful acoustic meditative bamboo flute accompanied by tanpura resonance.',
    audioUrl: '/audio/bansuri.mp3',
    frequency: 'Bansuri Raga'
  },
  {
    id: 'tandavChant',
    title: 'Shiv Tandav Sacred Chanting',
    sanskrit: 'शिवताण्डव मन्त्र नाद',
    description: 'Sanskrit Vedic chanting of Shiva Tandav Stotram with resonant damru beats.',
    audioUrl: '/audio/tandav.mp3',
    frequency: 'Vedic Chanting'
  }
]

export function SoundscapesView() {
  const addXp = useStore((s) => s.addXp)
  const [activeTrack, setActiveTrack] = useState<SoundPreset>('om432')
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(0.8)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [duration, setDuration] = useState<number>(15)

  // Timer states (in seconds)
  const [timerDuration, setTimerDuration] = useState<number>(600) // Default 10 min
  const [timeLeft, setTimeLeft] = useState<number>(600)
  const [timerRunning, setTimerRunning] = useState<boolean>(false)
  const [completedSessions, setCompletedSessions] = useState<number>(0)

  // Canvas visualizer ref & audio ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const currentTrack = TRACKS.find((t) => t.id === activeTrack) ?? TRACKS[0]

  // Synchronize HTML5 Audio element play state and volume
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = isMuted ? 0 : volume

    if (isPlaying) {
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Audio playback prevented by browser:', err)
          setIsPlaying(false)
        })
      }
    } else {
      audio.pause()
    }
  }, [isPlaying, activeTrack, volume, isMuted])

  // Handle track change
  const changeTrack = (trackId: SoundPreset) => {
    setActiveTrack(trackId)
    setIsPlaying(true)
    if (audioRef.current) {
      audioRef.current.currentTime = 0
    }
  }

  // Singing bowl completion chime via Web Audio
  const playCompletionChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(528, ctx.currentTime)
      gain.gain.setValueAtTime(0.5, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 4)
    } catch {
      /* ignore */
    }
  }

  // Timer countdown hook
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timerRunning && timeLeft === 0) {
      setTimerRunning(false)
      playCompletionChime()
      addXp(25)
      setCompletedSessions((prev) => prev + 1)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timerRunning, timeLeft])

  // Animated wave visualizer overlay
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let phase = 0
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const width = canvas.width
      const height = canvas.height
      const centerY = height / 2

      ctx.beginPath()
      ctx.lineWidth = 3.5
      const strokeGrad = ctx.createLinearGradient(0, 0, width, 0)
      strokeGrad.addColorStop(0, '#f59e0b')
      strokeGrad.addColorStop(0.5, '#ea580c')
      strokeGrad.addColorStop(1, '#e11d48')
      ctx.strokeStyle = strokeGrad

      phase += isPlaying ? 0.05 : 0.01
      const amplitude = isPlaying ? 40 : 8

      for (let x = 0; x < width; x++) {
        const y = centerY + Math.sin(x * 0.02 + phase) * amplitude * Math.sin(x * 0.005)
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      // Render glowing floating particles
      if (isPlaying) {
        for (let i = 0; i < 6; i++) {
          const px = (Math.sin(phase + i * 1.8) * 0.5 + 0.5) * width
          const py = centerY + Math.cos(phase * 1.5 + i) * 28
          ctx.beginPath()
          ctx.arc(px, py, 3.5, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(245, 158, 11, 0.65)'
          ctx.fill()
        }
      }

      animationFrameRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [isPlaying])

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const setTimerPreset = (minutes: number) => {
    const secs = minutes * 60
    setTimerDuration(secs)
    setTimeLeft(secs)
    setTimerRunning(false)
  }

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Native HTML5 Audio Element (Loads local static MP3 file) */}
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        loop
        onTimeUpdate={() => {
          if (audioRef.current) setCurrentTime(audioRef.current.currentTime)
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) setDuration(audioRef.current.duration || 15)
        }}
      />

      {/* Header */}
      <div className="card-serene relative overflow-hidden rounded-3xl p-6 sm:p-9 bg-gradient-to-br from-card via-card/95 to-primary/[0.04] border border-border/60">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
              <Headphones className="h-3.5 w-3.5" />
              <span>Native Audio Meditation Player</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground" style={{ fontFamily: 'var(--font-cinzel), var(--font-serif-display), serif' }}>
              Sacred Soundscapes & Meditation <span className="text-muted-foreground text-lg font-normal font-serif">नादयोगः</span>
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
              Play native studio MP3 recordings of 432Hz Om chanting, Tanpura drones, Tibetan singing bowls, and Bansuri flutes with guaranteed instant audio playback.
            </p>
          </div>
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-saffron to-gold text-white shadow-xs animate-breathe">
            <OmSymbol size={32} className="!text-white" />
          </div>
        </div>
      </div>

      {/* Pure Audio Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pure Audio Player Card */}
        <div className="lg:col-span-7 card-serene rounded-3xl p-6 bg-card border border-border/60 space-y-6">
          {/* Audio Canvas Waveform */}
          <div className="relative w-full h-44 rounded-2xl bg-gradient-to-br from-background via-muted/40 to-background border border-saffron/30 overflow-hidden flex items-center justify-center shadow-inner">
            <canvas ref={canvasRef} width={600} height={180} className="w-full h-full" />
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-background/90 backdrop-blur-md text-xs font-semibold text-saffron border border-border/80 shadow-sm">
              <span className={cn('h-2.5 w-2.5 rounded-full', isPlaying ? 'bg-emerald-500 animate-ping' : 'bg-muted-foreground')} />
              <span>{isPlaying ? 'Playing Studio MP3 Track' : 'Audio Player Paused'}</span>
            </div>
            <div className="absolute bottom-4 right-4 px-3.5 py-1 rounded-full bg-saffron-gradient text-white font-mono text-xs font-bold shadow-md">
              {currentTrack.frequency}
            </div>
          </div>

          {/* Seek Bar */}
          <div className="space-y-1">
            <input
              type="range"
              min="0"
              max={duration || 15}
              step="0.1"
              value={currentTime}
              onChange={(e) => {
                const val = parseFloat(e.target.value)
                setCurrentTime(val)
                if (audioRef.current) audioRef.current.currentTime = val
              }}
              className="w-full h-1.5 accent-saffron cursor-pointer rounded-lg bg-muted"
            />
            <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Main Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-muted/40 border border-border/60 shadow-sm">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="h-14 w-14 shrink-0 rounded-full bg-saffron-gradient text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all glow-saffron"
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
              </button>
              <div>
                <h3 className="text-base sm:text-lg font-bold font-serif-display text-foreground">{currentTrack.title}</h3>
                <p className="text-xs text-saffron font-serif font-semibold">{currentTrack.sanskrit}</p>
              </div>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground border border-border/60"
              >
                {isMuted || volume === 0 ? <VolumeX className="h-5 w-5 text-destructive" /> : <Volume2 className="h-5 w-5 text-saffron" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value))
                  setIsMuted(false)
                }}
                className="w-28 accent-saffron cursor-pointer"
              />
            </div>
          </div>

          {/* Audio Tracks Selector */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Music className="h-4 w-4 text-saffron" /> Select Studio MP3 Track
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TRACKS.map((track) => {
                const isActive = activeTrack === track.id
                return (
                  <button
                    key={track.id}
                    onClick={() => changeTrack(track.id)}
                    className={cn(
                      'p-4 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between gap-2',
                      isActive
                        ? 'bg-saffron-gradient-soft border-saffron shadow-md glow-saffron'
                        : 'bg-card hover:bg-muted/60 border-border/80'
                    )}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-bold text-xs sm:text-sm text-foreground">{track.title}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-background border border-border">
                        {track.frequency}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-snug line-clamp-2">
                      {track.description}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Dhyana Meditation Session Timer Card */}
        <div className="lg:col-span-5 card-serene rounded-3xl p-6 bg-card border border-border/60 shadow-xs space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <Timer className="h-5 w-5 text-saffron" />
                <h3 className="font-bold text-base font-serif-display">Dhyana Timer</h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-saffron-100 dark:bg-saffron-950/60 text-saffron-600 dark:text-saffron-400">
                +25 XP per session
              </span>
            </div>

            {/* Countdown Display */}
            <div className="flex flex-col items-center justify-center py-6 space-y-3 bg-muted/30 rounded-2xl border border-border/60">
              <span className="text-5xl sm:text-6xl font-extrabold tracking-tight font-mono text-saffron-gradient">
                {formatTime(timeLeft)}
              </span>
              <p className="text-xs text-muted-foreground font-medium">
                {timerRunning ? 'Meditation Session in Progress...' : 'Ready for Dhyana'}
              </p>
            </div>

            {/* Timer Presets */}
            <div className="grid grid-cols-4 gap-2">
              {[5, 10, 15, 30].map((mins) => (
                <button
                  key={mins}
                  onClick={() => setTimerPreset(mins)}
                  className={cn(
                    'py-2 rounded-xl text-xs font-semibold border transition-all',
                    timerDuration === mins * 60 && !timerRunning
                      ? 'bg-saffron-gradient text-white border-transparent shadow-sm'
                      : 'bg-card hover:bg-muted border-border text-foreground'
                  )}
                >
                  {mins} min
                </button>
              ))}
            </div>

            {/* Timer Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className="flex-1 py-3 rounded-xl bg-saffron-gradient text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 glow-saffron"
              >
                {timerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span>{timerRunning ? 'Pause Session' : 'Start Meditation'}</span>
              </button>
              <button
                onClick={() => {
                  setTimeLeft(timerDuration)
                  setTimerRunning(false)
                }}
                className="h-11 w-11 shrink-0 rounded-xl border border-border hover:bg-muted flex items-center justify-center text-muted-foreground"
                title="Reset Timer"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Session Stats */}
          <div className="p-4 rounded-xl bg-saffron-gradient-soft border border-saffron/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-saffron" />
              <span className="text-xs font-medium text-foreground">Completed Sessions Today</span>
            </div>
            <span className="text-sm font-bold text-saffron-gradient font-mono">{completedSessions}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
