'use client'

import { useEffect, useRef, useState } from 'react'

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = () => setReduced(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

interface CountUpProps {
  value: number
  duration?: number
  decimals?: number
  suffix?: string
  prefix?: string
  className?: string
}

/**
 * Animates a number counting up from its previous value to `value`
 * using an ease-out cubic curve. Respects prefers-reduced-motion by
 * rendering the final value immediately.
 */
export function CountUp({
  value,
  duration = 900,
  decimals = 0,
  suffix = '',
  prefix = '',
  className,
}: CountUpProps) {
  const reduced = usePrefersReducedMotion()
  const [display, setDisplay] = useState(0)
  const displayRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (reduced) {
      displayRef.current = value
      setDisplay(value)
      return
    }
    const from = displayRef.current
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      const next = from + (value - from) * eased
      displayRef.current = next
      setDisplay(next)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [value, duration, reduced])

  const formatted = display.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
