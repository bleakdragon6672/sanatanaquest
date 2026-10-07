'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

export type VoiceSensitivity = 'whisper' | 'medium' | 'loud'

interface UseVoiceJapaOptions {
  onChantDetected: () => void
  enabled?: boolean
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
  enabled = false,
  sensitivity = 'medium',
  minChantDurationMs = 450,
  cooldownMs = 1200,
}: UseVoiceJapaOptions) {
  const [isListening, setIsListening] = useState(false)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [audioLevel, setAudioLevel] = useState(0)
  const [permissionError, setPermissionError] = useState<string | null>(null)

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

  const startListening = useCallback(async () => {
    stopListening()
    setPermissionError(null)

    try {
      if (typeof window === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
        throw new Error('Microphone access is not supported by your browser')
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      })

      streamRef.current = stream
      setHasPermission(true)

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

              // If user was chanting for at least minChantDuration and paused for at least 380ms
              if (
                silenceDuration >= 380 &&
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
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : 'Could not access microphone. You can continue in manual tap mode.'
      setPermissionError(errorMsg)
      setHasPermission(false)
      stopListening()
    }
  }, [minChantDurationMs, cooldownMs, sensitivity, stopListening])

  useEffect(() => {
    if (enabled && !isListening) {
      startListening()
    } else if (!enabled && isListening) {
      stopListening()
    }
    return () => {
      stopListening()
    }
  }, [enabled, isListening, startListening, stopListening])

  return {
    isListening,
    hasPermission,
    audioLevel,
    permissionError,
    startListening,
    stopListening,
  }
}
