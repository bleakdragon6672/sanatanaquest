'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

export type VoiceSensitivity = 'whisper' | 'medium' | 'loud'

interface UseVoiceJapaOptions {
  onChantDetected: () => void
  sensitivity?: VoiceSensitivity
  minChantDurationMs?: number
  cooldownMs?: number
}

const SENSITIVITY_THRESHOLDS: Record<VoiceSensitivity, number> = {
  whisper: 0.022,
  medium: 0.055,
  loud: 0.11,
}

export function useVoiceJapa({
  onChantDetected,
  sensitivity = 'medium',
  minChantDurationMs = 420,
  cooldownMs = 1100,
}: UseVoiceJapaOptions) {
  const [isListening, setIsListening] = useState(false)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [audioLevel, setAudioLevel] = useState(0)
  const [permissionError, setPermissionError] = useState<string | null>(null)
  const [isPermissionDenied, setIsPermissionDenied] = useState(false)

  const streamRef = useRef<MediaStream | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const rafIdRef = useRef<number | null>(null)

  // Voice state machine refs
  const isSpeakingRef = useRef(false)
  const speechStartTimeRef = useRef(0)
  const silenceStartTimeRef = useRef(0)
  const lastChantTimeRef = useRef(0)

  const callbackRef = useRef(onChantDetected)
  useEffect(() => {
    callbackRef.current = onChantDetected
  }, [onChantDetected])

  // Check initial permission status if supported
  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.permissions?.query) {
      navigator.permissions
        .query({ name: 'microphone' as PermissionName })
        .then((permissionStatus) => {
          if (permissionStatus.state === 'denied') {
            setIsPermissionDenied(true)
            setHasPermission(false)
          } else if (permissionStatus.state === 'granted') {
            setHasPermission(true)
            setIsPermissionDenied(false)
          }
          permissionStatus.onchange = () => {
            if (permissionStatus.state === 'denied') {
              setIsPermissionDenied(true)
              setHasPermission(false)
            } else if (permissionStatus.state === 'granted') {
              setIsPermissionDenied(false)
              setHasPermission(true)
              setPermissionError(null)
            }
          }
        })
        .catch(() => {})
    }
  }, [])

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
    isSpeakingRef.current = false
  }, [])

  const startListening = useCallback(async (): Promise<boolean> => {
    stopListening()
    setPermissionError(null)
    setIsPermissionDenied(false)

    try {
      if (typeof window === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
        throw new Error('Microphone access is not supported by your browser')
      }

      // Explicit user-triggered permission request
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      })

      streamRef.current = stream
      setHasPermission(true)
      setIsPermissionDenied(false)

      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioContextClass()
      audioCtxRef.current = ctx

      const source = ctx.createMediaStreamSource(stream)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 512
      analyser.smoothingTimeConstant = 0.4
      source.connect(analyser)
      analyserRef.current = analyser

      setIsListening(true)

      const bufferLength = analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)

      const processAudio = () => {
        if (!analyserRef.current) return

        analyserRef.current.getByteFrequencyData(dataArray)

        // Calculate Average Volume / RMS
        let sum = 0
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i]
        }
        const avg = sum / bufferLength / 255
        setAudioLevel(avg)

        const threshold = SENSITIVITY_THRESHOLDS[sensitivity]
        const now = Date.now()

        if (avg >= threshold) {
          // Voice energy is active
          if (!isSpeakingRef.current) {
            isSpeakingRef.current = true
            speechStartTimeRef.current = now
          }
          silenceStartTimeRef.current = 0
        } else {
          // In silence / pause
          if (isSpeakingRef.current) {
            if (!silenceStartTimeRef.current) {
              silenceStartTimeRef.current = now
            } else {
              const silenceDuration = now - silenceStartTimeRef.current
              const speechDuration = silenceStartTimeRef.current - speechStartTimeRef.current

              // If user chanted for at least minChantDuration and paused for at least 350ms
              if (
                silenceDuration >= 350 &&
                speechDuration >= minChantDurationMs &&
                now - lastChantTimeRef.current >= cooldownMs
              ) {
                lastChantTimeRef.current = now
                isSpeakingRef.current = false
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
      const isDenied =
        (err as { name?: string })?.name === 'NotAllowedError' ||
        (err as { name?: string })?.name === 'PermissionDeniedError' ||
        String(err).toLowerCase().includes('denied') ||
        String(err).toLowerCase().includes('permission')

      const errorMsg = isDenied
        ? 'Microphone permission was blocked by your browser settings.'
        : err instanceof Error
        ? err.message
        : 'Could not access microphone.'

      setPermissionError(errorMsg)
      setIsPermissionDenied(isDenied)
      setHasPermission(false)
      stopListening()
      return false
    }
  }, [minChantDurationMs, cooldownMs, sensitivity, stopListening])

  // Cleanup on unmount only
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
    permissionError,
    startListening,
    stopListening,
  }
}
