'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { Download, Share, PlusSquare, X, WifiOff, Wifi, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

const DISMISS_KEY = 'vedicquest_pwa_dismissed_at'
const DISMISS_DURATION_DAYS = 7

export function PwaController() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isStandalone, setIsStandalone] = useState(false)
  const [isIos, setIsIos] = useState(false)
  const [showInstallBanner, setShowInstallBanner] = useState(false)
  const [showIosModal, setShowIosModal] = useState(false)
  const [isOffline, setIsOffline] = useState(false)
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null)

  // 1. Check standalone mode & platform
  useEffect(() => {
    if (typeof window === 'undefined') return

    const isStand =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
      document.referrer.includes('android-app://')

    setIsStandalone(isStand)

    const ua = window.navigator.userAgent.toLowerCase()
    const isIosDevice = /iphone|ipad|ipod/.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream
    setIsIos(isIosDevice)

    // Check if dismissed recently
    const dismissedAt = localStorage.getItem(DISMISS_KEY)
    if (dismissedAt) {
      const elapsedDays = (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60 * 24)
      if (elapsedDays < DISMISS_DURATION_DAYS) {
        return
      }
    }

    // Delay prompt appearance so user gets first impression of the app
    const timer = setTimeout(() => {
      if (!isStand) {
        setShowInstallBanner(true)
      }
    }, 15000)

    return () => clearTimeout(timer)
  }, [])

  // 2. Register Service Worker & handle updates
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return

    // Register service worker in production or standard local environment
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        // If an updated worker is waiting
        if (registration.waiting) {
          setWaitingWorker(registration.waiting)
          promptUpdate(registration.waiting)
        }

        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (!newWorker) return

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setWaitingWorker(newWorker)
              promptUpdate(newWorker)
            }
          })
        })
      })
      .catch((err) => {
        console.warn('[PWA] Service worker registration notice:', err)
      })

    function promptUpdate(worker: ServiceWorker) {
      toast('Vedic Quest update available', {
        description: 'A new version with the latest improvements is ready.',
        action: {
          label: 'Update Now',
          onClick: () => {
            worker.postMessage({ type: 'SKIP_WAITING' })
            window.location.reload()
          },
        },
        duration: 10000,
      })
    }
  }, [])

  // 3. Online/Offline detection
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleOnline = () => {
      setIsOffline(false)
      toast.success('Connected back online', {
        icon: <Wifi className="w-4 h-4 text-emerald-500" />,
        description: 'Cloud progress sync is active.',
        duration: 3500,
      })
    }

    const handleOffline = () => {
      setIsOffline(true)
      toast('Offline Mode Active', {
        icon: <WifiOff className="w-4 h-4 text-amber-500" />,
        description: 'Complete Gita, Upanishads & Japa Mala are available offline.',
        duration: 6000,
      })
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    if (!navigator.onLine) {
      setIsOffline(true)
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleInstallClick = useCallback(async () => {
    if (isIos) {
      setShowIosModal(true)
      return
    }

    if (!deferredPrompt) {
      // If no deferred prompt but on mobile, show instructions
      setShowIosModal(true)
      return
    }

    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setShowInstallBanner(false)
      setDeferredPrompt(null)
      toast.success('Thank you for installing Vedic Quest! 🙏')
    }
  }, [deferredPrompt, isIos])

  // 4. Capture native beforeinstallprompt (Android / Chrome / Desktop)
  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowInstallBanner(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall)

    const handleCustomTrigger = () => {
      handleInstallClick()
    }
    window.addEventListener('pwa-install-prompt', handleCustomTrigger)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
      window.removeEventListener('pwa-install-prompt', handleCustomTrigger)
    }
  }, [handleInstallClick])

  const dismissBanner = () => {
    setShowInstallBanner(false)
    localStorage.setItem(DISMISS_KEY, Date.now().toString())
  }

  // If already running in standalone PWA, don't show the prompt
  if (isStandalone) {
    return null
  }

  return (
    <>
      {/* Floating Modern PWA Install Banner */}
      {showInstallBanner && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 max-w-sm w-[calc(100vw-2rem)] sm:w-auto animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-background/95 backdrop-blur-xl p-4 shadow-2xl shadow-amber-950/20 text-foreground">
            {/* Ambient golden aura background */}
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-start gap-3 relative z-10">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-md flex items-center justify-center text-white">
                <span className="text-xl font-bold font-serif">ॐ</span>
              </div>

              <div className="flex-1 pr-6">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-semibold text-foreground tracking-tight">
                    Install Vedic Quest
                  </h4>
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-500 dark:text-amber-400">
                    Offline
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                  Add to home screen for fullscreen zero-lag chanting & offline Gita reading.
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={handleInstallClick}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-zinc-950 text-xs font-semibold shadow-sm transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Install App
                  </button>
                  <button
                    onClick={dismissBanner}
                    className="text-xs text-muted-foreground hover:text-foreground px-2 py-1.5 transition-colors"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={dismissBanner}
                className="absolute top-3 right-3 text-muted-foreground/70 hover:text-foreground p-1 rounded-lg transition-colors"
                aria-label="Dismiss banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* iOS Step-by-Step Install Modal */}
      {showIosModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setShowIosModal(false)}
        >
          <div
            className="w-full max-w-sm rounded-3xl bg-background border border-border p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-500 font-serif text-lg">
                  ॐ
                </div>
                <div>
                  <h3 className="text-base font-semibold leading-tight">Install on iOS</h3>
                  <p className="text-xs text-muted-foreground">Add to iPhone or iPad Home Screen</p>
                </div>
              </div>
              <button
                onClick={() => setShowIosModal(false)}
                className="rounded-full p-1.5 text-muted-foreground hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 pt-2 text-xs text-muted-foreground">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-muted/50 border border-border/50">
                <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 font-semibold text-xs">
                  1
                </div>
                <div>
                  <p className="text-foreground font-medium flex items-center gap-1">
                    Tap the <Share className="w-3.5 h-3.5 text-blue-500 inline" /> Share button
                  </p>
                  <p className="mt-0.5">At the bottom of your Safari browser toolbar.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-muted/50 border border-border/50">
                <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 font-semibold text-xs">
                  2
                </div>
                <div>
                  <p className="text-foreground font-medium flex items-center gap-1">
                    Select <PlusSquare className="w-3.5 h-3.5 text-amber-500 inline" /> &apos;Add to Home Screen&apos;
                  </p>
                  <p className="mt-0.5">Scroll down in the sharing menu and tap &apos;Add to Home Screen&apos;.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-muted/50 border border-border/50">
                <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 font-semibold text-xs">
                  3
                </div>
                <div>
                  <p className="text-foreground font-medium flex items-center gap-1">
                    Tap <Sparkles className="w-3.5 h-3.5 text-amber-500 inline" /> &apos;Add&apos;
                  </p>
                  <p className="mt-0.5">Launch Vedic Quest directly from your home screen in full immersive mode.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIosModal(false)}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-zinc-950 font-semibold text-xs shadow-md transition-colors"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </>
  )
}
