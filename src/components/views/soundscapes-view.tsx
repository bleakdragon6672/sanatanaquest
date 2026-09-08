'use client'

import { useState, useEffect, useRef } from 'react'
import { Headphones, Play, Pause, Volume2, VolumeX, Timer, Sparkles, Youtube, Radio, CheckCircle, RotateCcw, Volume1 } from 'lucide-react'
import { OmSymbol } from '@/components/spiritual-icons'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'

export type SoundPreset = 'om432' | 'tanpura' | 'singingBowl' | 'gangesRain' | 'bansuri' | 'tandavChant'
export type AudioEngine = 'youtube' | 'webAudio'

interface SoundTrack {
  id: SoundPreset
  title: string
  sanskrit: string
  description: string
  youtubeId: string
  frequency: string
}

const TRACKS: SoundTrack[] = [
  {
    id: 'om432',
    title: '432Hz Om Sacred Chanting',
    sanskrit: 'ॐकार जप 432Hz',
    description: 'Authentic studio vocal Om chanting tuned to 432Hz for deep heart chakra resonance and stillness.',
    youtubeId: '80aU9vIThG8',
    frequency: '432 Hz Vocal'
  },
  {
    id: 'tanpura',
    title: 'Studio Tanpura Drone (C# Sa-Pa)',
    sanskrit: 'शास्त्र तन्पूरा नाद',
    description: 'Pure acoustic Indian classical Tanpura drone recording in C# for traditional sadhana.',
    youtubeId: 'J_R06QzQkS8',
    frequency: 'C# Sa-Pa Drone'
  },
  {
    id: 'singingBowl',
    title: 'Tibetan Singing Bowl Meditation',
    sanskrit: 'तिब्बती घण्टा नाद',
    description: 'Genuine acoustic recording of resonant 7-chakra hand-hammered bronze singing bowls.',
    youtubeId: 'Q5dU6ur4l0U',
    frequency: 'Bronze Overtones'
  },
  {
    id: 'gangesRain',
    title: 'Ganges Rain & Temple Stream',
    sanskrit: 'गंगा तट वृष्टि',
    description: 'Natural high-definition recording of gentle rain falling over temple water and bamboo groves.',
    youtubeId: 'mPZkdNFkNps',
    frequency: 'Natural Rain HD'
  },
  {
    id: 'bansuri',
    title: 'Divine Bamboo Flute (Bansuri)',
    sanskrit: 'दिव्य वेणु नाद',
    description: 'Soulful acoustic meditative bamboo flute accompanied by gentle tanpura resonance.',
    youtubeId: 'f3Q52M12K74',
    frequency: 'Bansuri Raga'
  },
  {
    id: 'tandavChant',
    title: 'Shiv Tandav Sacred Chanting',
    sanskrit: 'शिवताण्डव मन्त्र नाद',
    description: 'Deep Sanskrit Vedic chanting of Shiva Tandav Stotram with resonant damru beats.',
    youtubeId: 'hJ0tE4C4uH4',
    frequency: 'Vedic Chanting'
  }
]

export function SoundscapesView() {
  const addXp = useStore((s) => s.addXp)
  const [activeTrack, setActiveTrack] = useState<SoundPreset>('om432')
  const [engine, setEngine] = useState<AudioEngine>('youtube')
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(0.8)
  const [isMuted, setIsMuted] = useState<boolean>(false)

  // Timer states (in seconds)
  const [timerDuration, setTimerDuration] = useState<number>(600) // Default 10 min
  const [timeLeft, setTimeLeft] = useState<number>(600)
  const [timerRunning, setTimerRunning] = useState<boolean>(false)
  const [completedSessions, setCompletedSessions] = useState<number>(0)

  // Canvas visualizer ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  // Web Audio refs for fallback engine
  const audioCtxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const activeNodesRef = useRef<AudioNode[]>([])

  const currentTrack = TRACKS.find((t) => t.id === activeTrack) ?? TRACKS[0]

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

  // Stop current Web Audio nodes
  const stopWebAudio = () => {
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

  // Start Web Audio synth preset
  const startWebAudioSound = (preset: SoundPreset) => {
    stopWebAudio()
    const ctx = getAudioContext()
    const master = masterGainRef.current!

    if (preset === 'om432') {
      const freqs = [108, 216, 432, 864]
      const gains = [0.3, 0.25, 0.35, 0.1]
      const nodes: AudioNode[] = []

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const g = ctx.createGain()
        osc.type = idx === 0 ? 'sine' : 'triangle'
        osc.frequency.setValueAtTime(freq, ctx.currentTime)
        g.gain.setValueAtTime(gains[idx], ctx.currentTime)
        osc.connect(g)
        g.connect(master)
        osc.start()
        nodes.push(osc, g)
      })

      activeNodesRef.current = nodes
    } else if (preset === 'tanpura') {
      const stringFreqs = [204.15, 136.1, 136.1, 68.05]
      const nodes: AudioNode[] = []

      let stringIndex = 0
      const pluckNextString = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return
        const freq = stringFreqs[stringIndex]
        const now = ctx.currentTime

        const osc = ctx.createOscillator()
        const g = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, now)
        g.gain.setValueAtTime(0.001, now)
        g.gain.linearRampToValueAtTime(0.3, now + 0.05)
        g.gain.exponentialRampToValueAtTime(0.001, now + 3.0)

        osc.connect(g)
        g.connect(master)
        osc.start(now)
        osc.stop(now + 3.1)

        stringIndex = (stringIndex + 1) % stringFreqs.length
      }

      pluckNextString()
      const interval = setInterval(pluckNextString, 850)
      nodes.push({ disconnect: () => clearInterval(interval) } as unknown as AudioNode)

      activeNodesRef.current = nodes
    } else if (preset === 'singingBowl') {
      const nodes: AudioNode[] = []
      const strikeBowl = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return
        const now = ctx.currentTime
        const osc1 = ctx.createOscillator()
        const osc2 = ctx.createOscillator()
        const g = ctx.createGain()

        osc1.type = 'sine'
        osc2.type = 'sine'
        osc1.frequency.setValueAtTime(528, now)
        osc2.frequency.setValueAtTime(530.5, now)

        g.gain.setValueAtTime(0.001, now)
        g.gain.linearRampToValueAtTime(0.4, now + 0.02)
        g.gain.exponentialRampToValueAtTime(0.001, now + 5.5)

        osc1.connect(g)
        osc2.connect(g)
        g.connect(master)
        osc1.start(now)
        osc2.start(now)
        osc1.stop(now + 5.6)
        osc2.stop(now + 5.6)
      }

      strikeBowl()
      const interval = setInterval(strikeBowl, 5000)
      nodes.push({ disconnect: () => clearInterval(interval) } as unknown as AudioNode)
      activeNodesRef.current = nodes
    } else {
      // Ganges Rain noise buffer
      const bufferSize = ctx.sampleRate * 2
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1

      const noise = ctx.createBufferSource()
      noise.buffer = buffer
      noise.loop = true

      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(700, ctx.currentTime)

      const gRain = ctx.createGain()
      gRain.gain.setValueAtTime(0.3, ctx.currentTime)

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
      if (engine === 'webAudio') stopWebAudio()
      setIsPlaying(false)
    } else {
      if (engine === 'webAudio') startWebAudioSound(activeTrack)
      setIsPlaying(true)
    }
  }

  const changeTrack = (trackId: SoundPreset) => {
    setActiveTrack(trackId)
    setIsPlaying(true)
    if (engine === 'webAudio') {
      startWebAudioSound(trackId)
    }
  }

  const changeEngine = (newEngine: AudioEngine) => {
    if (engine === 'webAudio') stopWebAudio()
    setEngine(newEngine)
    if (isPlaying && newEngine === 'webAudio') {
      startWebAudioSound(activeTrack)
    }
  }

  // Singing bowl completion chime
  const playCompletionChime = () => {
    try {
      const ctx = getAudioContext()
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

  // Cleanup Web Audio on unmount
  useEffect(() => {
    return () => {
      stopWebAudio()
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
              <span>Interactive Sacred Sound Studio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-serif-display">
              Sacred Soundscapes & Meditation <span className="text-muted-foreground text-lg font-normal font-serif">नादयोगः</span>
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl">
              Listen to authentic 432Hz Om chanting, studio Tanpura drones, Tibetan singing bowls, and Bansuri flutes with guaranteed audio playback.
            </p>
          </div>
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-saffron-gradient text-white shadow-lg glow-sacred-pulse">
            <OmSymbol size={32} className="!text-white" />
          </div>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Player Card */}
        <div className="lg:col-span-7 card-sacred-glow rounded-2xl p-6 bg-card border border-border shadow-lg space-y-6">
          {/* Audio Engine Selector Tabs */}
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <div>
              <h2 className="text-lg font-bold font-serif-display text-foreground">{currentTrack.title}</h2>
              <p className="text-xs text-saffron font-serif">{currentTrack.sanskrit}</p>
            </div>

            <div className="flex items-center gap-1.5 bg-muted p-1 rounded-xl">
              <button
                onClick={() => changeEngine('youtube')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5',
                  engine === 'youtube'
                    ? 'bg-saffron-gradient text-white shadow-md'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Youtube className="h-3.5 w-3.5" />
                <span>HD Recording Stream</span>
              </button>
              <button
                onClick={() => changeEngine('webAudio')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5',
                  engine === 'webAudio'
                    ? 'bg-saffron-gradient text-white shadow-md'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Radio className="h-3.5 w-3.5" />
                <span>Acoustic Synth</span>
              </button>
            </div>
          </div>

          {/* Interactive Player Window */}
          {engine === 'youtube' ? (
            <div className="space-y-4">
              <div className="relative w-full aspect-video rounded-2xl bg-black border border-saffron/30 overflow-hidden shadow-xl">
                {isPlaying ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${currentTrack.youtubeId}?autoplay=1&rel=0&modestbranding=1&loop=1`}
                    title={currentTrack.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <div
                    onClick={() => setIsPlaying(true)}
                    className="w-full h-full bg-gradient-to-br from-background via-muted to-background flex flex-col items-center justify-center gap-3 cursor-pointer group"
                  >
                    <div className="h-16 w-16 rounded-full bg-saffron-gradient text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform glow-sacred-pulse">
                      <Play className="h-8 w-8 ml-1" />
                    </div>
                    <span className="text-xs font-bold text-saffron">Click to Play HD Audio Stream</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Press play directly inside the HD stream above for instant live audio chanting.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Web Audio Canvas Waveform */}
              <div className="relative w-full h-44 rounded-2xl bg-gradient-to-br from-background via-muted/40 to-background border border-saffron/30 overflow-hidden flex items-center justify-center shadow-inner">
                <canvas ref={canvasRef} width={600} height={180} className="w-full h-full" />
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-background/90 backdrop-blur-md text-xs font-semibold text-saffron border border-border/80 shadow-sm">
                  <span className={cn('h-2.5 w-2.5 rounded-full', isPlaying ? 'bg-emerald-500 animate-ping' : 'bg-muted-foreground')} />
                  <span>{isPlaying ? 'Synthesizing Audio Tone' : 'Synth Paused'}</span>
                </div>
                <div className="absolute bottom-4 right-4 px-3.5 py-1 rounded-full bg-saffron-gradient text-white font-mono text-xs font-bold shadow-md">
                  {currentTrack.frequency}
                </div>
              </div>

              {/* Web Audio Main Play Button */}
              <div className="flex items-center justify-center gap-4 p-4 rounded-xl bg-muted/40 border border-border">
                <button
                  onClick={togglePlay}
                  className="py-3 px-8 rounded-xl bg-saffron-gradient text-white font-bold text-sm shadow-lg hover:scale-105 transition-all flex items-center gap-2 glow-saffron"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  <span>{isPlaying ? 'Pause Acoustic Synth' : 'Start Acoustic Synth'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Sound Presets Selector */}
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
