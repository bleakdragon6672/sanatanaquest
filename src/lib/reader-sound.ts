// Web Audio API Paper Rustle Synthesizer & Haptic Feedback Helper
// 100% offline, zero-latency, realistic whisper-quiet paper page flip sound.

let sharedAudioCtx: AudioContext | null = null

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
 * Synthesizes a realistic, whisper-soft paper page turn sound.
 * Uses filtered pink/white noise with a shaped volume and frequency envelope.
 */
export function playPaperFlipSound() {
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const duration = 0.095 // ~95ms subtle paper turn

    // 1. Generate noise buffer (pink-weighted noise for fibrous paper texture)
    const sampleRate = ctx.sampleRate
    const bufferSize = Math.floor(sampleRate * duration)
    const buffer = ctx.createBuffer(1, bufferSize, sampleRate)
    const channelData = buffer.getChannelData(0)

    let b0 = 0
    let b1 = 0
    let b2 = 0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      // Pink noise filter approximation
      b0 = 0.99886 * b0 + white * 0.0555179
      b1 = 0.99332 * b1 + white * 0.0750759
      b2 = 0.96900 * b2 + white * 0.153852
      channelData[i] = (b0 + b1 + b2 + white * 0.5362) * 0.18
    }

    const noiseSource = ctx.createBufferSource()
    noiseSource.buffer = buffer

    // 2. Bandpass filter to sculpt the resonant frequency of turned paper
    const bandpass = ctx.createBiquadFilter()
    bandpass.type = 'bandpass'
    bandpass.frequency.setValueAtTime(1600, now)
    bandpass.frequency.exponentialRampToValueAtTime(750, now + duration)
    bandpass.Q.setValueAtTime(1.4, now)

    // 3. Subtle lowpass to shave off harsh high frequencies
    const lowpass = ctx.createBiquadFilter()
    lowpass.type = 'lowpass'
    lowpass.frequency.setValueAtTime(3200, now)
    lowpass.frequency.exponentialRampToValueAtTime(1200, now + duration)

    // 4. Amplitude envelope: quick soft rise, followed by smooth exponential decay
    const gainNode = ctx.createGain()
    gainNode.gain.setValueAtTime(0.001, now)
    gainNode.gain.linearRampToValueAtTime(0.075, now + 0.015) // gentle whisper volume
    gainNode.gain.exponentialRampToValueAtTime(0.0005, now + duration)

    // Connect node chain
    noiseSource.connect(bandpass)
    bandpass.connect(lowpass)
    lowpass.connect(gainNode)
    gainNode.connect(ctx.destination)

    noiseSource.start(now)
    noiseSource.stop(now + duration)
  } catch {
    // Graceful fallback if audio is blocked or unsupported
  }
}

/**
 * Triggers subtle haptic feedback on devices with vibration support.
 * @param pattern duration in ms, e.g. 10ms for crisp page tick, or [8, 30, 10] for double tap
 */
export function triggerHaptic(pattern: number | number[] = 10) {
  try {
    if (typeof window !== 'undefined' && 'vibrate' in navigator && typeof navigator.vibrate === 'function') {
      navigator.vibrate(pattern)
    }
  } catch {
    // Gracefully ignore if not supported or denied
  }
}
