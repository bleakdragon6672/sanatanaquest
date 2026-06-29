'use client'

import { useState, useEffect, useRef, useCallback, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface VerseSliderProps {
  verseId: string
  children: ReactNode
  onPrevious?: () => void
  onNext?: () => void
  hasPrevious: boolean
  hasNext: boolean
  className?: string
}

// Touch swipe configuration — tuned for deliberate gestures only
const SWIPE_THRESHOLD = 100     // minimum horizontal px to trigger verse change
const VELOCITY_RATIO = 2        // horizontal must be at least this many × vertical
const COOLDOWN_MS = 400         // prevent rapid successive gestures

// Elements that should never trigger verse navigation
const INTERACTIVE_SELECTOR = [
  'button', 'a', 'input', 'textarea', 'select',
  '[role="button"]', '[role="link"]', '[role="tab"]',
  '[contenteditable]', 'label', '.not-verse-swipe',
].join(', ')

export function VerseSlider({
  verseId,
  children,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
  className,
}: VerseSliderProps) {
  const [displayedContent, setDisplayedContent] = useState<{ id: string; node: ReactNode }>({ id: verseId, node: children })
  const [animationClass, setAnimationClass] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const prevVerseIdRef = useRef(verseId)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const touchCancelled = useRef(false)
  const lastSwipeTime = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Animate when verseId changes
  useEffect(() => {
    const prevId = prevVerseIdRef.current
    prevVerseIdRef.current = verseId

    if (prevId === verseId) return

    const oldParts = prevId.split('.').map(Number)
    const newParts = verseId.split('.').map(Number)
    let direction: 'left' | 'right' = 'left'
    for (let i = 0; i < Math.max(oldParts.length, newParts.length); i++) {
      const o = oldParts[i] ?? 0
      const n = newParts[i] ?? 0
      if (n > o) { direction = 'left'; break }
      if (n < o) { direction = 'right'; break }
    }

    setIsAnimating(true)
    setAnimationClass(direction === 'left' ? 'verse-slide-out-left' : 'verse-slide-out-right')

    const timer = setTimeout(() => {
      setDisplayedContent({ id: verseId, node: children })
      setAnimationClass(direction === 'left' ? 'verse-slide-in-right' : 'verse-slide-in-left')

      const timer2 = setTimeout(() => {
        setAnimationClass('')
        setIsAnimating(false)
      }, 300)

      return () => clearTimeout(timer2)
    }, 250)

    return () => clearTimeout(timer)
  }, [verseId])

  // Update content when children change without verseId change (non-animated)
  useEffect(() => {
    if (!isAnimating && verseId === displayedContent.id) {
      setDisplayedContent({ id: verseId, node: children })
    }
  }, [children, verseId, isAnimating, displayedContent.id])

  // Check whether a touch target is an interactive element that should block swipe
  const isInteractiveTarget = useCallback((target: EventTarget | null): boolean => {
    if (!target || !(target instanceof Node)) return false
    const el = target instanceof Element ? target : (target as Node).parentElement
    if (!el) return false

    let current: Element | null = el
    while (current && current !== containerRef.current && current !== document.body) {
      if (current.matches?.(INTERACTIVE_SELECTOR)) return true
      current = current.parentElement
    }
    return false
  }, [])

  // Check whether the user is actively selecting text
  const hasTextSelection = useCallback((): boolean => {
    if (typeof window === 'undefined') return false
    const selection = window.getSelection()
    return selection ? selection.toString().length > 0 : false
  }, [])

  // --- Touch gesture handlers ---
  // Design: evaluate the *full* gesture only on touchend (not mid-gesture).
  // This prevents premature triggering and gives a natural feel like Kindle / Apple Books.

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    // Do not process touches on interactive controls
    if (isInteractiveTarget(e.target)) {
      touchCancelled.current = true
      return
    }

    // Do not process if user has an active text selection
    if (hasTextSelection()) {
      touchCancelled.current = true
      return
    }

    // Enforce cooldown between successive gestures
    if (Date.now() - lastSwipeTime.current < COOLDOWN_MS) {
      touchCancelled.current = true
      return
    }

    touchCancelled.current = false
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }, [isInteractiveTarget, hasTextSelection])

  const handleTouchMove = useCallback((_e: React.TouchEvent) => {
    // Intentionally empty — we evaluate the gesture only at touchend.
    // Not calling preventDefault() preserves smooth vertical scrolling.
  }, [])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchCancelled.current) {
      touchCancelled.current = false
      return
    }

    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    const absDx = Math.abs(dx)
    const absDy = Math.abs(dy)

    // Require horizontal to dominate vertical (prevents scroll → swipe false positives)
    if (absDx < absDy * VELOCITY_RATIO) return

    // Require a deliberate horizontal movement
    if (absDx < SWIPE_THRESHOLD) return

    // Check text selection again in case it started mid-gesture
    if (hasTextSelection()) return

    // Fire navigation callback and set cooldown
    if (dx < 0 && hasNext && onNext) {
      lastSwipeTime.current = Date.now()
      onNext()
    } else if (dx > 0 && hasPrevious && onPrevious) {
      lastSwipeTime.current = Date.now()
      onPrevious()
    }
  }, [hasNext, hasPrevious, onNext, onPrevious])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === 'ArrowRight' && hasNext && onNext) onNext()
      if (e.key === 'ArrowLeft' && hasPrevious && onPrevious) onPrevious()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [hasNext, hasPrevious, onNext, onPrevious])

  return (
    <div
      ref={containerRef}
      className={cn('verse-slider-container', animationClass, className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {displayedContent.node}
    </div>
  )
}
