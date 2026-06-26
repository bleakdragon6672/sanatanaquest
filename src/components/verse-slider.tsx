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
  const isSwiping = useRef(false)

  // Animate when verseId changes
  useEffect(() => {
    const prevId = prevVerseIdRef.current
    prevVerseIdRef.current = verseId

    // Skip animation on initial mount
    if (prevId === verseId) return

    // Determine direction from verse ID comparison
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

  // Touch swipe handling
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    isSwiping.current = false
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - touchStartX.current
    const dy = e.touches[0].clientY - touchStartY.current
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 30) {
      isSwiping.current = true
    }
  }, [])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!isSwiping.current) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const threshold = 60

    if (dx < -threshold && hasNext && onNext) {
      onNext()
    } else if (dx > threshold && hasPrevious && onPrevious) {
      onPrevious()
    }
    isSwiping.current = false
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
      className={cn('verse-slider-container', animationClass, className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {displayedContent.node}
    </div>
  )
}
