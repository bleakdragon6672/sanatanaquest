'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

export type VoiceSensitivity = 'whisper' | 'medium' | 'loud'

interface UseVoiceJapaOptions {
  onChantDetected: () => void
  sensitivity?: VoiceSensitivity
  minChantDurationMs?: number
  cooldownMs?: number
}

// True RMS thresholds in time domain
export const SENSITIVITY_THRESHOLDS: Record<VoiceSensitivity, number> = {
  whisper: 0.018, // Very sensitive, picks up sub-vocal whispers
  medium: 0.040,  // Normal comfortable chanting
  loud: 0.085,   // Loud chanting, ignores background room noise
}

export interface RawAudioError {
  name: string
  message: string
}

export function useVoiceJapa({
  onChantDetected,
  sensitivity = 'medium',
  minChantDurationMs = 280, // ~0.28s of chanting sound
  cooldownMs = 850,         // Minimum gap between counted chants
}: UseVoiceJapaOptions) {
  const [isListening, setIsListening] = useState(false)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [audioLevel, setAudioLevel] = useState(0) // 0 to 1 normalized
  const [rawRms, setRawRms] = useState(0)
  const [permissionError, setPermissionError] = useState<string | null>(null)
  const [rawError, setRawError] = useState<RawAudioError | null>(null)
  const [isPermissionDenied, setIsPermissionDenied] = useState(false)
  const [lastChantTimestamp, setLastChantTimestamp] = useState<number>(0)

  const streamRef = useRef<MediaStream | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const rafIdRef = useRef<number | null>(null)

  // Cadence state machine refs
  const isVocalizingRef = useRef(false)
  const vocalStartTimeRef = useRef(0)
  const silenceStartTimeRef = useRef(0)
  const lastChantTimeRef = useRef(0)
  const hasMetChantDurationRef = useRef(false)

  const callbackRef = useRef(onChantDetected)
  useEffect(() => {
    callbackRef.current = onChantDetected
  }, [onChantDetected])

  const stopListening = useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close().catch(() => {})
      audioCtxRef.current = null
    }
    setIsListening(false)
    setAudioLevel(0)
    setRawRms(0)
    isVocalizingRef.current = false
    hasMetChantDurationRef.current = false
  }, [])

  // Check browser permissions on mount without prematurely blocking the UI
  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.permissions?.query) {
      navigator.permissions
        .query({ name: 'microphone' as PermissionName })
        .then((status) => {
          if (status.state === 'granted') {
            setHasPermission(true)
            setIsPermissionDenied(false)
          }
          status.onchange = () => {
            if (status.state === 'granted') {
              setHasPermission(true)
              setIsPermissionDenied(false)
              setPermissionError(null)
              setRawError(null)
            } else if (status.state === 'denied') {
              setIsPermissionDenied(true)
              setHasPermission(false)
            }
          }
        })
        .catch(() => {})
    }
  }, [])

  const startListening = useCallback(async (): Promise<boolean> => {
    stopListening()
    setPermissionError(null)
    setRawError(null)
    setIsPermissionDenied(false)

    try {
      if (typeof window === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
        throw new Error('Microphone access is not supported by your browser')
      }

      // Universal audio stream request without overconstraining audio drivers
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      streamRef.current = stream
      setHasPermission(true)
      setIsPermissionDenied(false)
      setPermissionError(null)
      setRawError(null)

      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioContextClass) {
        throw new Error('Web Audio API is not supported by your browser')
      }
      const ctx = new AudioContextClass()
      audioCtxRef.current = ctx

      // Resume context if suspended by browser autoplay policy
      if (ctx.state === 'suspended') {
        await ctx.resume().catch(() => {})
      }

      const source = ctx.createMediaStreamSource(stream)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 512
      analyser.smoothingTimeConstant = 0.2
      source.connect(analyser)
      analyserRef.current = analyser

      setIsListening(true)

      const timeDomainData = new Uint8Array(analyser.fftSize)

      const processAudio = () => {
        if (!analyserRef.current) return

        analyserRef.current.getByteTimeDomainData(timeDomainData)

        // Calculate accurate physical RMS volume in time domain
        let sumSquares = 0
        for (let i = 0; i < timeDomainData.length; i++) {
          const norm = (timeDomainData[i] - 128) / 128
          sumSquares += norm * norm
        }
        const rms = Math.sqrt(sumSquares / timeDomainData.length)
        setRawRms(rms)

        // Normalized 0 to 1 for visual UI feedback
        const normalized = Math.min(1, Math.max(0, rms * 4.5))
        setAudioLevel(normalized)

        const threshold = SENSITIVITY_THRESHOLDS[sensitivity]
        const now = Date.now()

        if (rms >= threshold) {
          // User is actively chanting / vocalizing
          if (!isVocalizingRef.current) {
            isVocalizingRef.current = true
            vocalStartTimeRef.current = now
            hasMetChantDurationRef.current = false
          }

          const vocalDuration = now - vocalStartTimeRef.current
          if (vocalDuration >= minChantDurationMs) {
            hasMetChantDurationRef.current = true
          }
          silenceStartTimeRef.current = 0
        } else {
          // Volume dropped below threshold (potential pause between chants)
          if (isVocalizingRef.current) {
            if (!silenceStartTimeRef.current) {
              silenceStartTimeRef.current = now
            } else {
              const pauseDuration = now - silenceStartTimeRef.current

              // If they were chanting for at least minChantDuration and paused for at least 200ms
              if (
                pauseDuration >= 200 &&
                hasMetChantDurationRef.current &&
                now - lastChantTimeRef.current >= cooldownMs
              ) {
                lastChantTimeRef.current = now
                setLastChantTimestamp(now)
                isVocalizingRef.current = false
                hasMetChantDurationRef.current = false
                silenceStartTimeRef.current = 0
                callbackRef.current()
              }
            }
          }
        }

        rafIdRef.current = requestAnimationFrame(processAudio)
      }

      rafIdRef.current = requestAnimationFrame(processAudio)
      return true
    } catch (err: unknown) {
      const errObj = err as { name?: string; message?: string }
      const errName = errObj?.name || 'Error'
      const rawMessage = errObj?.message || String(err)
      const errStr = (errName + ' ' + rawMessage).toLowerCase()

      const isDenied =
        errName === 'NotAllowedError' ||
        errName === 'PermissionDeniedError' ||
        errStr.includes('denied') ||
        errStr.includes('permission')

      const isNotFound =
        errName === 'NotFoundError' ||
        errName === 'DevicesNotFoundError' ||
        errStr.includes('not found')

      const isBusy =
        errName === 'NotReadableError' ||
        errName === 'TrackStartError' ||
        errStr.includes('in use')

      const errorMsg = isDenied
        ? 'Microphone permission blocked. Please check macOS System Settings & browser settings.'
        : isNotFound
        ? 'No microphone found on your computer.'
        : isBusy
        ? 'Microphone is already in use by another tab or app.'
        : rawMessage || 'Could not access microphone.'

      setPermissionError(errorMsg)
      setRawError({ name: errName, message: rawMessage })
      setIsPermissionDenied(isDenied)
      setHasPermission(false)
      stopListening()
      return false
    }
  }, [minChantDurationMs, cooldownMs, sensitivity, stopListening])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening()
    }
  }, [stopListening])

  return {
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
  }
}
