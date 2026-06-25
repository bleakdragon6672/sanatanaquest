'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Download, Copy, Check } from 'lucide-react'
import { toast } from 'sonner'
import { OmSymbol } from '@/components/spiritual-icons'

interface Props {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  body: string
  footer?: string
  badge?: string
  variant?: 'saffron' | 'gold' | 'vermilion' | 'dark'
}

const VARIANTS = {
  saffron: {
    bg: 'linear-gradient(135deg, #ff8a3d 0%, #f59e0b 50%, #fbbf24 100%)',
    fg: '#ffffff',
    accent: '#fff5e6',
  },
  gold: {
    bg: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
    fg: '#1a1410',
    accent: '#1a1410',
  },
  vermilion: {
    bg: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #7f1d1d 100%)',
    fg: '#ffffff',
    accent: '#fef3c7',
  },
  dark: {
    bg: 'linear-gradient(135deg, #1a1410 0%, #2d1f17 50%, #1a1410 100%)',
    fg: '#fbbf24',
    accent: '#f59e0b',
  },
}

export function ShareCardModal({
  open,
  onClose,
  title,
  subtitle,
  body,
  footer = 'Sanatan Quest',
  badge,
  variant = 'saffron',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [imgData, setImgData] = useState<string>('')
  const [copied, setCopied] = useState(false)

  const wrapText = useCallback((ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
    const words = text.split(/\s+/)
    const lines: string[] = []
    let current = ''
    for (const w of words) {
      const tryLine = current ? current + ' ' + w : w
      if (ctx.measureText(tryLine).width > maxWidth && current) {
        lines.push(current)
        current = w
      } else {
        current = tryLine
      }
    }
    if (current) lines.push(current)
    return lines.slice(0, 8) // cap
  }, [])

  const drawCard = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const W = 1080
    const H = 1080
    canvas.width = W
    canvas.height = H
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const theme = VARIANTS[variant]

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, W, H)
    const bgStops = variant === 'dark' ? ['#1a1410', '#2d1f17', '#1a1410']
      : variant === 'saffron' ? ['#ff8a3d', '#f59e0b', '#fbbf24']
      : variant === 'gold' ? ['#fbbf24', '#f59e0b', '#d97706']
      : ['#dc2626', '#b91c1c', '#7f1d1d']
    bgStops.forEach((c, i) => bgGrad.addColorStop(i / (bgStops.length - 1), c))
    ctx.fillStyle = bgGrad
    ctx.fillRect(0, 0, W, H)

    // Decorative border
    ctx.strokeStyle = theme.accent
    ctx.globalAlpha = 0.45
    ctx.lineWidth = 4
    ctx.strokeRect(40, 40, W - 80, H - 80)
    ctx.lineWidth = 1
    ctx.strokeRect(56, 56, W - 112, H - 112)
    ctx.globalAlpha = 1

    // Top om + brand
    ctx.fillStyle = theme.fg
    ctx.textAlign = 'center'
    ctx.font = '600 32px "Playfair Display", Georgia, serif'
    ctx.fillText('ॐ', W / 2, 130)

    ctx.font = '500 28px "Inter", system-ui, sans-serif'
    ctx.globalAlpha = 0.85
    ctx.fillText('Sanatan Quest', W / 2, 175)
    ctx.globalAlpha = 1

    // Badge (if provided)
    let topOffset = 240
    if (badge) {
      ctx.font = '600 28px "Inter", system-ui, sans-serif'
      const badgeW = ctx.measureText(badge).width + 80
      const bx = (W - badgeW) / 2
      const by = topOffset
      const bh = 56
      ctx.fillStyle = theme.accent
      ctx.beginPath()
      const r = bh / 2
      ctx.moveTo(bx + r, by)
      ctx.lineTo(bx + badgeW - r, by)
      ctx.quadraticCurveTo(bx + badgeW, by, bx + badgeW, by + r)
      ctx.lineTo(bx + badgeW, by + bh - r)
      ctx.quadraticCurveTo(bx + badgeW, by + bh, bx + badgeW - r, by + bh)
      ctx.lineTo(bx + r, by + bh)
      ctx.quadraticCurveTo(bx, by + bh, bx, by + bh - r)
      ctx.lineTo(bx, by + r)
      ctx.quadraticCurveTo(bx, by, bx + r, by)
      ctx.closePath()
      ctx.fill()
      ctx.fillStyle = variant === 'gold' || variant === 'saffron' ? '#7c2d12' : '#1a1410'
      ctx.fillText(badge, W / 2, by + 38)
      topOffset = by + bh + 70
    }

    // Title
    ctx.fillStyle = theme.fg
    ctx.font = '700 64px "Playfair Display", Georgia, serif'
    const titleLines = wrapText(ctx, title, W - 200)
    let y = topOffset
    titleLines.forEach((line) => {
      ctx.fillText(line, W / 2, y)
      y += 78
    })
    y += 20

    // Subtitle
    if (subtitle) {
      ctx.font = 'italic 400 32px "Playfair Display", Georgia, serif'
      ctx.globalAlpha = 0.85
      ctx.fillText(subtitle, W / 2, y)
      ctx.globalAlpha = 1
      y += 60
    }

    // Body — wrapped, centered
    ctx.font = '400 36px "Inter", system-ui, sans-serif'
    const bodyLines = wrapText(ctx, body, W - 240)
    bodyLines.forEach((line) => {
      ctx.fillText(line, W / 2, y)
      y += 52
    })

    // Footer
    ctx.font = '500 24px "Inter", system-ui, sans-serif'
    ctx.globalAlpha = 0.7
    ctx.fillText('— ' + footer, W / 2, H - 90)
    ctx.globalAlpha = 1

    // Small lotus divider near footer
    ctx.strokeStyle = theme.accent
    ctx.globalAlpha = 0.5
    ctx.beginPath()
    ctx.moveTo(W / 2 - 80, H - 130)
    ctx.lineTo(W / 2 - 16, H - 130)
    ctx.moveTo(W / 2 + 16, H - 130)
    ctx.lineTo(W / 2 + 80, H - 130)
    ctx.stroke()
    ctx.globalAlpha = 1
    ctx.font = '400 20px "Playfair Display", serif'
    ctx.fillText('❁', W / 2, H - 122)

    setImgData(canvas.toDataURL('image/png'))
  }, [variant, title, subtitle, body, footer, badge, wrapText])

  useEffect(() => {
    if (!open) return
    // Slight delay ensures the Radix Dialog portal has mounted the canvas ref.
    const t = setTimeout(() => drawCard(), 50)
    return () => clearTimeout(t)
  }, [open, drawCard])

  async function handleDownload() {
    if (!imgData) return
    const a = document.createElement('a')
    a.href = imgData
    a.download = `sanatan-quest-${Date.now()}.png`
    a.click()
    toast.success('Share card downloaded')
  }

  async function handleCopy() {
    try {
      const blob = await (await fetch(imgData)).blob()
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      setCopied(true)
      toast.success('Image copied to clipboard')
      setTimeout(() => setCopied(false), 1800)
    } catch {
      toast.error('Could not copy — try downloading instead')
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <OmSymbol size={22} /> Shareable Card
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-3">
          <canvas ref={canvasRef} className="hidden" />
          {imgData && (
            <img
              src={imgData}
              alt="Generated share card"
              className="w-full rounded-xl shadow-lg border border-border"
            />
          )}
          <div className="flex gap-2 w-full">
            <Button onClick={handleDownload} className="flex-1 bg-saffron-gradient text-white">
              <Download className="mr-2 h-4 w-4" /> Download PNG
            </Button>
            <Button onClick={handleCopy} variant="outline" className="flex-1">
              {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Perfect for sharing on Instagram, WhatsApp, or X.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
