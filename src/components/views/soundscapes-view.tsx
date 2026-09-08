'use client'

import { useState, useEffect, useRef } from 'react'
import { Headphones, Play, Pause, Volume2, VolumeX, Timer, Sparkles, Flame, CheckCircle, RotateCcw } from 'lucide-react'
import { OmSymbol } from '@/components/spiritual-icons'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'

type SoundPreset = 'om432' | 'tanpura' | 'singingBowl' | 'gangesRain'

interface SoundTrack {
  id: SoundPreset
  title: string
  sanskrit: string
  description: string
  frequency: string
}

const TRACKS: SoundTrack[] = [
  {
    id: 'om432',
    title: '432Hz Om Sacred Resonance',
    sanskrit: 'ॐकार नाद 432Hz',
    description: 'Pure cosmic sine frequency associated with heart chakra opening and inner stillness.',
    frequency: '432 Hz'
  },
  {
    id: 'tanpura',
    title: 'Tanpura Drone & Harmonics',
    sanskrit: 'तन्पूरा नाद',
    description: 'Traditional Indian classical drone tuning in Pa-Sa harmonic roots for deep meditative absorption.',
    frequency: 'Sa-Pa Drone'
  },
  {
    id: 'singingBowl',
    title: 'Tibetan Singing Bowl Chimes',
    sanskrit: 'नाद घण्टा',
    description: 'Resonant metallic overtone bell synthesizer that clears mental fog and restores focus.',
    frequency: 'Metallic Overtone'
  },
  {
    id: 'gangesRain',
    title: 'Cosmic Ganges Rain & Temple Mist',
    sanskrit: 'गंगा वृष्टि',
    description: 'Organic filtered rain noise simulation providing relaxing white/pink background noise.',
    frequency: 'Pink Noise'
  }
]

export function SoundscapesView() {
  const addXp = useStore((s) => s.addXp)
  const [activeTrack, setActiveTrack] = useState<SoundPreset>('om432')
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(0.7)
  const [isMuted, setIsMuted] = useState<boolean>(false)

  // Timer states (in seconds)
  const [timerDuration, setTimerDuration] = useState<number>(600) // Default 10 min
  const [timeLeft, setTimeLeft] = useState<number>(600)
  const [timerRunning, setTimerRunning] = useState<boolean>(false)
  const [completedSessions, setCompletedSessions] = useState<number>(0)

  // Canvas visualizer ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  // Web Audio refs
  const audioCtxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const activeNodesRef = useRef<AudioNode[]>([])

  // Initialize Web Audio Context
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      audioCtxRef.current = new AudioCtx()
      const master = audioCtxRef.current.createGain()
      master.gain.value = volume
      master.connect(audioCtxRef.current.destination)
      masterGainRef.current = master
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    return audioCtxRef.current
  }

  // Update volume
  useEffect(() => {
    if (masterGainRef.current) {
      masterGainRef.current.gain.value = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  // Stop current audio nodes
  const stopAudio = () => {
    activeNodesRef.current.forEach(node => {
      try {
        if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
          (node as AudioScheduledSourceNode).stop()
        }
        node.disconnect()
      } catch {
        /* ignore */
      }
    })
    activeNodesRef.current = []
  }

  // Start sound preset synth
  const startSound = (preset: SoundPreset) => {
    stopAudio()
    const ctx = getAudioContext()
    const master = masterGainRef.current!

    if (preset === 'om432') {
      // 432 Hz fundamental + 864 Hz octave harmonic
      const osc1 = ctx.createOscillator()
      const osc2 = ctx.createOscillator()
      const g1 = ctx.createGain()
      const g2 = ctx.createGain()

      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(432, ctx.currentTime)
      g1.gain.setValueAtTime(0.4, ctx.currentTime)

      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(864, ctx.currentTime)
      g2.gain.setValueAtTime(0.1, ctx.currentTime)

      // Low LFO tremolo
      const lfo = ctx.createOscillator()
      const lfoGain = ctx.createGain()
      lfo.frequency.setValueAtTime(0.2, ctx.currentTime) // 0.2 Hz slow breath
      lfoGain.gain.setValueAtTime(0.1, ctx.currentTime)
      lfo.connect(lfoGain)
      lfoGain.connect(g1.gain)

      osc1.connect(g1)
      osc2.connect(g2)
      g1.connect(master)
      g2.connect(master)

      osc1.start()
      osc2.start()
      lfo.start()
      activeNodesRef.current = [osc1, osc2, g1, g2, lfo, lfoGain]
    } else if (preset === 'tanpura') {
      // Root Sa (136.1 Hz C# Om frequency) + Pa (204.15 Hz)
      const oscSa = ctx.createOscillator()
      const oscPa = ctx.createOscillator()
      const gSa = ctx.createGain()
      const gPa = ctx.createGain()

      oscSa.type = 'triangle'
      oscSa.frequency.setValueAtTime(136.1, ctx.currentTime)
      gSa.gain.setValueAtTime(0.35, ctx.currentTime)

      oscPa.type = 'sine'
      oscPa.frequency.setValueAtTime(204.15, ctx.currentTime)
      gPa.gain.setValueAtTime(0.25, ctx.currentTime)

      oscSa.connect(gSa)
      oscPa.connect(gPa)
      gSa.connect(master)
      gPa.connect(master)

      oscSa.start()
      oscPa.start()
      activeNodesRef.current = [oscSa, oscPa, gSa, gPa]
    } else if (preset === 'singingBowl') {
      // Periodic bowl strike synth
      const osc1 = ctx.createOscillator()
      const g1 = ctx.createGain()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(528, ctx.currentTime) // 528 Hz transformation tone
      g1.gain.setValueAtTime(0.3, ctx.currentTime)

      osc1.connect(g1)
      g1.connect(master)
      osc1.start()
      activeNodesRef.current = [osc1, g1]
    } else if (preset === 'gangesRain') {
      // Buffer noise generator
      const bufferSize = ctx.sampleRate * 2
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1
      }
      const noise = ctx.createBufferSource()
      noise.buffer = buffer
      noise.loop = true

      // Filter rain noise
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(800, ctx.currentTime)

      const gRain = ctx.createGain()
      gRain.gain.setValueAtTime(0.2, ctx.currentTime)

      noise.connect(filter)
      filter.connect(gRain)
      gRain.connect(master)

      noise.start()
      activeNodesRef.current = [noise, filter, gRain]
    }
  }

  // Toggle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      stopAudio()
      setIsPlaying(false)
    } else {
      startSound(activeTrack)
      setIsPlaying(true)
    }
  }

  const changeTrack = (trackId: SoundPreset) => {
    setActiveTrack(trackId)
    if (isPlaying) {
      startSound(trackId)
    }
  }

  // Singing bowl completion chime
  const playCompletionChime = () => {
    try {
      const ctx = getAudioContext()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(432, ctx.currentTime)
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

  // Canvas visualizer animation
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
      ctx.lineWidth = 3
      const strokeGrad = ctx.createLinearGradient(0, 0, width, 0)
      strokeGrad.addColorStop(0, '#f59e0b')
      strokeGrad.addColorStop(0.5, '#ea580c')
      strokeGrad.addColorStop(1, '#e11d48')
      ctx.strokeStyle = strokeGrad

      phase += isPlaying ? 0.05 : 0.01
      const amplitude = isPlaying ? 35 : 8

      for (let x = 0; x < width; x++) {
        const y = centerY + Math.sin(x * 0.02 + phase) * amplitude * Math.sin(x * 0.005)
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      animationFrameRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [isPlaying])

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      stopAudio()
    }
  }, [])

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
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
      {/* Header */}
      <div className="card-sacred-glow relative overflow-hidden rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-card via-card/90 to-background border border-saffron/20 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-100 dark:bg-saffron-950/60 text-saffron-600 dark:text-saffron-400 text-xs font-semibold">
              <Headphones className="h-3.5 w-3.5" />
              <span>Nada Yoga Meditation Studio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-serif-display">
              Sacred Soundscapes & Dhyana <span className="text-muted-foreground text-lg font-normal font-serif">नादयोगः</span>
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl">
              Immerse yourself in harmonic 432Hz Om drones, Tanpura acoustics, and a built-in session timer with real-time waveform visualizer.
            </p>
          </div>
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-saffron-gradient text-white shadow-lg glow-sacred-pulse">
            <OmSymbol size={32} className="!text-white" />
          </div>
        </div>
      </div>

      {/* Main Studio Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visualizer & Audio Controls Player Card */}
        <div className="lg:col-span-7 card-sacred-glow rounded-2xl p-6 bg-card border border-border shadow-lg space-y-6">
          {/* Audio Canvas Waveform */}
          <div className="relative w-full h-40 rounded-xl bg-gradient-to-br from-background via-muted/30 to-background border border-saffron/20 overflow-hidden flex items-center justify-center">
            <canvas ref={canvasRef} width={600} height={160} className="w-full h-full" />
            <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-md text-[11px] text-muted-foreground border border-border">
              <span className={cn('h-2 w-2 rounded-full', isPlaying ? 'bg-emerald-500 animate-ping' : 'bg-muted-foreground')} />
              <span>{isPlaying ? 'Synthesizing Audio Wave' : 'Audio Paused'}</span>
            </div>
            <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-saffron-gradient text-white font-mono text-xs font-bold shadow-md">
              {TRACKS.find((t) => t.id === activeTrack)?.frequency}
            </div>
          </div>

          {/* Player Main Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-muted/40 border border-border/50">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button
                onClick={togglePlay}
                className="h-14 w-14 shrink-0 rounded-full bg-saffron-gradient text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all glow-saffron"
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
              </button>
              <div>
                <h3 className="text-base font-bold font-serif-display text-foreground">
                  {TRACKS.find((t) => t.id === activeTrack)?.title}
                </h3>
                <p className="text-xs text-saffron font-serif">
                  {TRACKS.find((t) => t.id === activeTrack)?.sanskrit}
                </p>
              </div>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground"
              >
                {isMuted || volume === 0 ? <VolumeX className="h-5 w-5 text-destructive" /> : <Volume2 className="h-5 w-5" />}
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

          {/* Sound Presets List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Select Soundscape Preset</h4>
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
                      <span className="font-bold text-sm text-foreground">{track.title}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-background border border-border">
                        {track.frequency}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-snug line-clamp-2">
                      {track.description}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Dhyana Meditation Session Timer Card */}
        <div className="lg:col-span-5 card-sacred-glow rounded-2xl p-6 bg-card border border-border shadow-lg space-y-6 flex flex-col justify-between">
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
