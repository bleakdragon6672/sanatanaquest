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
      // Rich 432Hz Om Vocal Resonance with deep sub-bass and harmonic shimmer
      const freqs = [108, 216, 432, 864, 1296]
      const gains = [0.35, 0.3, 0.4, 0.12, 0.05]
      const nodes: AudioNode[] = []

      // LFO for organic breath pulsing (0.08 Hz)
      const lfo = ctx.createOscillator()
      const lfoGain = ctx.createGain()
      lfo.frequency.setValueAtTime(0.08, ctx.currentTime)
      lfoGain.gain.setValueAtTime(0.15, ctx.currentTime)
      lfo.start()
      nodes.push(lfo, lfoGain)

      // Filter for warm vocal tone
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(1400, ctx.currentTime)
      lfoGain.connect(filter.frequency)
      filter.connect(master)
      nodes.push(filter)

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const g = ctx.createGain()
        // Subtle detuning for chorusing warmth
        const detune = (idx % 2 === 0 ? 1 : -1) * (idx * 2)
        osc.type = idx === 0 ? 'sine' : idx === 1 ? 'triangle' : 'sine'
        osc.frequency.setValueAtTime(freq, ctx.currentTime)
        osc.detune.setValueAtTime(detune, ctx.currentTime)
        g.gain.setValueAtTime(gains[idx], ctx.currentTime)

        osc.connect(g)
        g.connect(filter)
        osc.start()
        nodes.push(osc, g)
      })

      activeNodesRef.current = nodes
    } else if (preset === 'tanpura') {
      // Authentic 4-String Plucked Tanpura (Pa - Sa - Sa - Sa Low)
      // Pluck frequencies: Pa (204.15 Hz), Sa (136.10 Hz), Sa (136.10 Hz), Low Sa (68.05 Hz)
      const stringFreqs = [204.15, 136.1, 136.1, 68.05]
      const stringDetunes = [0, -3, 3, -1]
      const nodes: AudioNode[] = []

      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(1800, ctx.currentTime)
      filter.connect(master)
      nodes.push(filter)

      let stringIndex = 0
      const pluckNextString = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return
        const freq = stringFreqs[stringIndex]
        const detune = stringDetunes[stringIndex]
        const now = ctx.currentTime

        // String oscillator (sawtooth/triangle blend for rich overtones)
        const osc = ctx.createOscillator()
        const g = ctx.createGain()
        osc.type = stringIndex === 0 ? 'triangle' : 'sine'
        osc.frequency.setValueAtTime(freq, now)
        osc.detune.setValueAtTime(detune, now)

        // String attack-decay envelope (sharp pluck + long resonance)
        g.gain.setValueAtTime(0.001, now)
        g.gain.linearRampToValueAtTime(0.35, now + 0.05)
        g.gain.exponentialRampToValueAtTime(0.001, now + 3.2)

        osc.connect(g)
        g.connect(filter)
        osc.start(now)
        osc.stop(now + 3.3)

        stringIndex = (stringIndex + 1) % stringFreqs.length
      }

      // Initial pluck + repeating sequence every 850ms
      pluckNextString()
      const interval = setInterval(pluckNextString, 850)

      // Store dummy node holding interval cleanup reference
      nodes.push({
        disconnect: () => clearInterval(interval)
      } as unknown as AudioNode)

      activeNodesRef.current = nodes
    } else if (preset === 'singingBowl') {
      // Tibetan Singing Bowl with strike transient & dual frequency warble beating (528 Hz + 530.5 Hz)
      const nodes: AudioNode[] = []

      const strikeBowl = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return
        const now = ctx.currentTime

        // Dual frequencies for acoustic beating
        const osc1 = ctx.createOscillator()
        const osc2 = ctx.createOscillator()
        const g = ctx.createGain()

        osc1.type = 'sine'
        osc2.type = 'sine'
        osc1.frequency.setValueAtTime(528, now)
        osc2.frequency.setValueAtTime(530.5, now) // 2.5Hz natural warble

        // Exponential bowl ring decay (6 seconds)
        g.gain.setValueAtTime(0.001, now)
        g.gain.linearRampToValueAtTime(0.5, now + 0.02)
        g.gain.exponentialRampToValueAtTime(0.001, now + 6.0)

        // Metal attack noise burst
        const bufferSize = ctx.sampleRate * 0.03
        const noiseBuf = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
        const output = noiseBuf.getChannelData(0)
        for (let i = 0; i < bufferSize; i++) output[i] = Math.random() * 2 - 1
        const noiseSrc = ctx.createBufferSource()
        const noiseGain = ctx.createGain()
        noiseSrc.buffer = noiseBuf
        noiseGain.gain.setValueAtTime(0.15, now)
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03)

        noiseSrc.connect(noiseGain)
        noiseGain.connect(master)
        noiseSrc.start(now)

        osc1.connect(g)
        osc2.connect(g)
        g.connect(master)
        osc1.start(now)
        osc2.start(now)
        osc1.stop(now + 6.1)
        osc2.stop(now + 6.1)
      }

      strikeBowl()
      const interval = setInterval(strikeBowl, 5500)
      nodes.push({
        disconnect: () => clearInterval(interval)
      } as unknown as AudioNode)

      activeNodesRef.current = nodes
    } else if (preset === 'gangesRain') {
      // Organic Ganges Rain Pink Noise with gentle wave LFO filtering
      const bufferSize = ctx.sampleRate * 3
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1
        b0 = 0.99886 * b0 + white * 0.0555179
        b1 = 0.99332 * b1 + white * 0.0750759
        b2 = 0.96900 * b2 + white * 0.1538520
        b3 = 0.86650 * b3 + white * 0.3104856
        b4 = 0.55000 * b4 + white * 0.5329522
        b5 = -0.7616 * b5 - white * 0.0168980
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05
        b6 = white * 0.115926
      }

      const noise = ctx.createBufferSource()
      noise.buffer = buffer
      noise.loop = true

      // Dynamic Filter Sweep simulating gentle gusts & river movement
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(650, ctx.currentTime)

      const lfo = ctx.createOscillator()
      const lfoGain = ctx.createGain()
      lfo.frequency.setValueAtTime(0.12, ctx.currentTime)
      lfoGain.gain.setValueAtTime(250, ctx.currentTime)

      const gRain = ctx.createGain()
      gRain.gain.setValueAtTime(0.4, ctx.currentTime)

      lfo.connect(lfoGain)
      lfoGain.connect(filter.frequency)
      noise.connect(filter)
      filter.connect(gRain)
      gRain.connect(master)

      noise.start()
      lfo.start()
      activeNodesRef.current = [noise, filter, lfo, lfoGain, gRain]
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
