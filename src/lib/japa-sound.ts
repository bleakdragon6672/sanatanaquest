// Web Audio API Synthesizer for Acoustic Japa Mala
// 100% local, zero-latency, authentic sacred instrument and bead acoustic synthesis.

export type BeadMaterial = 'tulsi' | 'rudraksha' | 'chandan' | 'sphatik'

let sharedAudioCtx: AudioContext | null = null
let tanpuraOscs: OscillatorNode[] = []
let tanpuraGain: GainNode | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  try {
    if (!sharedAudioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioContextClass) {
        sharedAudioCtx = new AudioContextClass()
      }
    }
    if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume().catch(() => {})
    }
    return sharedAudioCtx
  } catch {
    return null
  }
}

/**
 * Synthesizes an authentic acoustic wooden, earthy, or crystal bead click.
 */
export function playBeadClick(material: BeadMaterial = 'tulsi', volume = 0.5) {
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const duration = material === 'sphatik' ? 0.28 : 0.08

    if (material === 'sphatik') {
      // Pure crystalline glass-like bell ping
      const osc = ctx.createOscillator()
      const osc2 = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(1760, now) // A6
      osc.frequency.exponentialRampToValueAtTime(1200, now + duration)

      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(3520, now) // A7 overtone

      gain.gain.setValueAtTime(0.001, now)
      gain.gain.linearRampToValueAtTime(0.12 * volume, now + 0.005)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration)

      osc.connect(gain)
      osc2.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc2.start(now)
      osc.stop(now + duration)
      osc2.stop(now + duration)
      return
    }

    // Wooden & seed beads (Tulsi, Chandan, Rudraksha):
    // Combines an impact impulse + filtered resonance body
    const sampleRate = ctx.sampleRate
    const bufferSize = Math.floor(sampleRate * duration)
    const buffer = ctx.createBuffer(1, bufferSize, sampleRate)
    const channelData = buffer.getChannelData(0)

    for (let i = 0; i < bufferSize; i++) {
      channelData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (sampleRate * 0.015))
    }

    const noiseSource = ctx.createBufferSource()
    noiseSource.buffer = buffer

    // Resonant bandpass filter
    const bandpass = ctx.createBiquadFilter()
    bandpass.type = 'bandpass'

    // Tuning per material
    if (material === 'rudraksha') {
      bandpass.frequency.setValueAtTime(480, now)
      bandpass.frequency.exponentialRampToValueAtTime(260, now + duration)
      bandpass.Q.setValueAtTime(3.5, now)
    } else if (material === 'chandan') {
      bandpass.frequency.setValueAtTime(750, now)
      bandpass.frequency.exponentialRampToValueAtTime(380, now + duration)
      bandpass.Q.setValueAtTime(2.8, now)
    } else {
      // Tulsi (standard warm aromatic wood)
      bandpass.frequency.setValueAtTime(880, now)
      bandpass.frequency.exponentialRampToValueAtTime(420, now + duration)
      bandpass.Q.setValueAtTime(3.0, now)
    }

    const gainNode = ctx.createGain()
    gainNode.gain.setValueAtTime(0.001, now)
    gainNode.gain.linearRampToValueAtTime(0.22 * volume, now + 0.003)
    gainNode.gain.exponentialRampToValueAtTime(0.0005, now + duration)

    noiseSource.connect(bandpass)
    bandpass.connect(gainNode)
    gainNode.connect(ctx.destination)

    noiseSource.start(now)
    noiseSource.stop(now + duration)
  } catch {
    // Ignore audio errors
  }
}

/**
 * Synthesizes a deep Tibetan singing bowl / sacred temple bell chime for 108 milestone.
 */
export function playSingingBowlChime(volume = 0.6) {
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const duration = 3.8

    // Fundamental at 432 Hz + sacred harmonic overtones (864Hz, 1296Hz, 1728Hz)
    const frequencies = [432, 864, 1296, 1728]
    const gains = [0.28, 0.14, 0.07, 0.035]

    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(0.001, now)
    masterGain.gain.linearRampToValueAtTime(volume, now + 0.05)
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration)
    masterGain.connect(ctx.destination)

    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const toneGain = ctx.createGain()

      osc.type = 'sine'
      // Subtle natural frequency vibrato
      osc.frequency.setValueAtTime(freq, now)
      osc.frequency.linearRampToValueAtTime(freq + (idx === 0 ? 0.8 : -0.5), now + duration)

      toneGain.gain.value = gains[idx]
      osc.connect(toneGain)
      toneGain.connect(masterGain)

      osc.start(now)
      osc.stop(now + duration)
    })
  } catch {
    // Ignore audio errors
  }
}

/**
 * Triggers subtle haptic feedback for mala bead progression.
 */
export function triggerMalaHaptic(type: 'bead' | 'quarter' | 'complete' = 'bead') {
  try {
    if (typeof window === 'undefined' || !('vibrate' in navigator)) return
    if (type === 'complete') {
      navigator.vibrate([40, 60, 40, 80, 140])
    } else if (type === 'quarter') {
      navigator.vibrate([20, 50, 20])
    } else {
      navigator.vibrate(15)
    }
  } catch {
    // Ignore haptic errors
  }
}

/**
 * Starts a serene, continuous 432Hz Tanpura harmonic drone bed.
 */
export function startTanpuraDrone(volume = 0.25) {
  stopTanpuraDrone()
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const master = ctx.createGain()
    master.gain.setValueAtTime(0.0001, now)
    master.gain.linearRampToValueAtTime(volume * 0.4, now + 2.0)
    master.connect(ctx.destination)
    tanpuraGain = master

    // Tanpura root frequencies around Pa-Sa-Sa-Sa (G3, C4, C4, C3) tuned to 432Hz A
    const freqs = [192.4, 256.9, 257.1, 128.5]
    tanpuraOscs = freqs.map((f, i) => {
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = i % 2 === 0 ? 'sawtooth' : 'sine'
      osc.frequency.setValueAtTime(f, now)

      // Lowpass filter to soften sawtones into rich string warmth
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(600 + i * 150, now)

      g.gain.value = 0.25
      osc.connect(filter)
      filter.connect(g)
      g.connect(master)

      osc.start(now)
      return osc
    })
  } catch {
    // Ignore
  }
}

export function stopTanpuraDrone() {
  if (tanpuraGain && sharedAudioCtx) {
    try {
      const now = sharedAudioCtx.currentTime
      tanpuraGain.gain.linearRampToValueAtTime(0.0001, now + 0.8)
      setTimeout(() => {
        tanpuraOscs.forEach((o) => {
          try {
            o.stop()
            o.disconnect()
          } catch {}
        })
        tanpuraOscs = []
        tanpuraGain = null
      }, 900)
      return
    } catch {}
  }
  tanpuraOscs.forEach((o) => {
    try {
      o.stop()
      o.disconnect()
    } catch {}
  })
  tanpuraOscs = []
  tanpuraGain = null
}
