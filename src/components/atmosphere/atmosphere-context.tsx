'use client'

// AtmosphereProvider — ambient soundscape system wrapping the entire app.
//
// State:
//   - currentAtmosphere: which soundscape is selected (or null = none selected)
//   - isPlaying: whether the audio is currently playing
//   - volume: 0..1 (default 0.2 to avoid startling users)
//   - showPanel: whether the Sheet panel is open
//   - showMiniWidget: derived — true when an atmosphere is selected (and not silent)
//   - visualEffectsEnabled: whether the full-screen animated overlay is shown
//   - reduceMotion: accessibility — disable visual effects even if enabled
//
// Persisted to localStorage['sanatan-quest-atmosphere'] as
// { atmosphereId, volume, visualEffects, reduceMotion }.
//
// Audio playback uses a single HTMLAudioElement with smooth fade in/out
// (20-step interval at 30ms per step = 600ms total fade).
//
// Reverse-engineered from the live deployment bundle (function `ry`).

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'

export interface Atmosphere {
  id: string
  name: string
  sanskritName: string
  description: string
  icon: string
  audio: string // URL to mp3 file; empty string for silent mode
  background:
    | 'flute'
    | 'river'
    | 'forest'
    | 'rain'
    | 'temple'
    | 'night'
    | 'fire'
    | 'garden'
    | 'none'
  recommendedChapters?: number[]
  accentColor: string
}

export const ATMOSPHERES: Atmosphere[] = [
  {
    id: 'vrindavan_flute',
    name: 'Vrindavan Flute',
    sanskritName: 'वृन्दावन',
    description: 'Gentle bansuri flute with peaceful ambience.',
    icon: '🪈',
    audio: '/audio/atmosphere/vrindavan_flute.mp3',
    background: 'flute',
    recommendedChapters: [12, 15],
    accentColor: '#f59e0b',
  },
  {
    id: 'ganga_banks',
    name: 'Banks of Mother Ganga',
    sanskritName: 'गङ्गा',
    description: 'Flowing river with soft natural sounds.',
    icon: '🌊',
    audio: '/audio/atmosphere/ganga_banks.mp3',
    background: 'river',
    recommendedChapters: [2, 8],
    accentColor: '#06b6d4',
  },
  {
    id: 'forest_ashram',
    name: 'Forest Ashram',
    sanskritName: 'आश्रम',
    description: 'Wind through trees, birds, peaceful forest.',
    icon: '🍃',
    audio: '/audio/atmosphere/forest_ashram.mp3',
    background: 'forest',
    recommendedChapters: [3, 4, 5],
    accentColor: '#10b981',
  },
  {
    id: 'monsoon_meditation',
    name: 'Monsoon Meditation',
    sanskritName: 'वर्षा',
    description: 'Gentle rain with distant thunder.',
    icon: '🌧',
    audio: '/audio/atmosphere/monsoon_meditation.mp3',
    background: 'rain',
    recommendedChapters: [6, 7],
    accentColor: '#6366f1',
  },
  {
    id: 'temple_dawn',
    name: 'Temple Dawn',
    sanskritName: 'प्रभात',
    description: 'Morning birds with occasional temple bells.',
    icon: '🌅',
    audio: '/audio/atmosphere/temple_dawn.mp3',
    background: 'temple',
    recommendedChapters: [1, 10, 11],
    accentColor: '#f97316',
  },
  {
    id: 'himalayan_night',
    name: 'Himalayan Night',
    sanskritName: 'हिमालय',
    description: 'Cold mountain wind with crickets.',
    icon: '🌌',
    audio: '/audio/atmosphere/himalayan_night.mp3',
    background: 'night',
    recommendedChapters: [11, 13, 14],
    accentColor: '#818cf8',
  },
  {
    id: 'sacred_fire',
    name: 'Sacred Fire',
    sanskritName: 'अग्नि',
    description: 'Soft crackling fire for evening contemplation.',
    icon: '🔥',
    audio: '/audio/atmosphere/sacred_fire.mp3',
    background: 'fire',
    recommendedChapters: [4, 16, 17],
    accentColor: '#dc2626',
  },
  {
    id: 'garden_serenity',
    name: 'Garden Serenity',
    sanskritName: 'उद्यान',
    description: 'Leaves, breeze and distant birds.',
    icon: '🌿',
    audio: '/audio/atmosphere/garden_serenity.mp3',
    background: 'garden',
    recommendedChapters: [9, 18],
    accentColor: '#84cc16',
  },
  {
    id: 'silent',
    name: 'Silent Mode',
    sanskritName: 'मौन',
    description: 'No ambient audio — pure silence.',
    icon: '🤍',
    audio: '',
    background: 'none',
    accentColor: '#94a3b8',
  },
]

export function getAtmosphere(id: string): Atmosphere | undefined {
  return ATMOSPHERES.find((a) => a.id === id)
}

export interface AtmosphereContextValue {
  currentAtmosphere: Atmosphere | null
  isPlaying: boolean
  volume: number
  showPanel: boolean
  showMiniWidget: boolean
  visualEffectsEnabled: boolean
  reduceMotion: boolean
  selectAtmosphere: (id: string) => void
  togglePlay: () => void
  stop: () => void
  setVolume: (v: number) => void
  openPanel: () => void
  closePanel: () => void
  togglePanel: () => void
  toggleVisualEffects: () => void
  toggleReduceMotion: () => void
}

const AtmosphereContext = createContext<AtmosphereContextValue | undefined>(undefined)

const STORAGE_KEY = 'sanatan-quest-atmosphere'

interface PersistedAtmosphereState {
  atmosphereId: string | null
  volume: number
  visualEffects: boolean
  reduceMotion: boolean
}

function persistState(
  atmosphere: Atmosphere | null,
  volume: number,
  visualEffects: boolean,
  reduceMotion: boolean,
) {
  try {
    const payload: PersistedAtmosphereState = {
      atmosphereId: atmosphere?.id ?? null,
      volume,
      visualEffects,
      reduceMotion,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    /* ignore quota errors */
  }
}

export function AtmosphereProvider({ children }: { children: ReactNode }) {
  const [currentAtmosphere, setCurrentAtmosphere] = useState<Atmosphere | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(0.2)
  const [showPanel, setShowPanel] = useState(false)
  const [visualEffectsEnabled, setVisualEffects] = useState(true)
  const [reduceMotion, setReduceMotion] = useState(false)

  // Refs to the live audio element + fade-interval timers so we can clean up.
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const previousAudioRef = useRef<HTMLAudioElement | null>(null)

  // On mount, load persisted state from localStorage.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw) as PersistedAtmosphereState
      if (parsed.atmosphereId) {
        const a = getAtmosphere(parsed.atmosphereId)
        if (a) setCurrentAtmosphere(a)
      }
      if (typeof parsed.volume === 'number') setVolumeState(parsed.volume)
      if (typeof parsed.visualEffects === 'boolean') setVisualEffects(parsed.visualEffects)
      if (typeof parsed.reduceMotion === 'boolean') setReduceMotion(parsed.reduceMotion)
    } catch {
      /* ignore parse errors */
    }
  }, [])

  /** Smooth fade-out + play-new-atmosphere with fade-in. */
  const playAtmosphere = useCallback(
    (atmosphere: Atmosphere) => {
      // Silent mode — fade out and stop any current audio.
      if (!atmosphere.audio) {
        if (audioRef.current && fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current)
        }
        if (audioRef.current) {
          const audio = audioRef.current
          const startVol = audio.volume
          let step = 0
          fadeIntervalRef.current = setInterval(() => {
            audio.volume = Math.max(0, startVol * (1 - ++step / 20))
            if (step >= 20) {
              clearInterval(fadeIntervalRef.current!)
              audio.pause()
              audio.currentTime = 0
            }
          }, 30)
        }
        setIsPlaying(false)
        return
      }

      // Fade out the previous audio (if any) before starting the new one.
      if (audioRef.current) {
        previousAudioRef.current = audioRef.current
        const prev = previousAudioRef.current
        const startVol = prev.volume
        let step = 0
        const fadeOut = setInterval(() => {
          prev.volume = Math.max(0, startVol * (1 - ++step / 20))
          if (step >= 20) {
            clearInterval(fadeOut)
            prev.pause()
          }
        }, 30)
      }

      // Start the new audio with a fade-in.
      const audio = new Audio(atmosphere.audio)
      audio.loop = true
      audio.volume = 0
      audioRef.current = audio

      let step = 0
      fadeIntervalRef.current = setInterval(() => {
        audio.volume = Math.min(volume, (++step / 20) * volume)
        if (step >= 20) {
          clearInterval(fadeIntervalRef.current!)
          audio.volume = volume
        }
      }, 30)

      audio.play().catch(() => {
        /* autoplay may be blocked — user can press play in the widget */
      })
      setIsPlaying(true)
    },
    [volume],
  )

  const selectAtmosphere = useCallback(
    (id: string) => {
      const a = getAtmosphere(id)
      if (!a) return
      playAtmosphere(a)
      setCurrentAtmosphere(a)
      persistState(a, volume, visualEffectsEnabled, reduceMotion)
    },
    [playAtmosphere, volume, visualEffectsEnabled, reduceMotion],
  )

  const togglePlay = useCallback(() => {
    if (!audioRef.current || !currentAtmosphere?.audio) {
      // No audio loaded — restart current atmosphere (or do nothing)
      if (currentAtmosphere) playAtmosphere(currentAtmosphere)
      return
    }
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }, [currentAtmosphere, isPlaying, playAtmosphere])

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setIsPlaying(false)
  }, [])

  const setVolume = useCallback(
    (v: number) => {
      setVolumeState(v)
      if (audioRef.current) audioRef.current.volume = v
      persistState(currentAtmosphere, v, visualEffectsEnabled, reduceMotion)
    },
    [currentAtmosphere, visualEffectsEnabled, reduceMotion],
  )

  const openPanel = useCallback(() => setShowPanel(true), [])
  const closePanel = useCallback(() => setShowPanel(false), [])
  const togglePanel = useCallback(() => setShowPanel((s) => !s), [])

  const toggleVisualEffects = useCallback(() => {
    setVisualEffectsEnabled((v) => {
      const next = !v
      persistState(currentAtmosphere, volume, next, reduceMotion)
      return next
    })
  }, [currentAtmosphere, volume, reduceMotion])

  const toggleReduceMotion = useCallback(() => {
    setReduceMotion((r) => {
      const next = !r
      persistState(currentAtmosphere, volume, visualEffectsEnabled, next)
      return next
    })
  }, [currentAtmosphere, volume, visualEffectsEnabled])

  // Cleanup on unmount.
  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause()
      if (previousAudioRef.current) previousAudioRef.current.pause()
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
    }
  }, [])

  const showMiniWidget = !!currentAtmosphere && currentAtmosphere.id !== 'silent'

  return (
    <AtmosphereContext.Provider
      value={{
        currentAtmosphere,
        isPlaying,
        volume,
        showPanel,
        showMiniWidget,
        visualEffectsEnabled,
        reduceMotion,
        selectAtmosphere,
        togglePlay,
        stop,
        setVolume,
        openPanel,
        closePanel,
        togglePanel,
        toggleVisualEffects,
        toggleReduceMotion,
      }}
    >
      {children}
    </AtmosphereContext.Provider>
  )
}

export function useAtmosphere(): AtmosphereContextValue {
  const ctx = useContext(AtmosphereContext)
  if (!ctx) throw new Error('useAtmosphere must be used inside AtmosphereProvider')
  return ctx
}
