'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Check, Sparkles, Compass, Clock, Calendar } from 'lucide-react'
import {
  PLAN_CONFIGS,
  type ReadingPlanTier,
  type ReadingPlan,
} from '@/lib/reading-plan-data'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { OmSymbol } from '@/components/spiritual-icons'

interface ReadingPlanPickerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ReadingPlanPickerModal({
  open,
  onOpenChange,
}: ReadingPlanPickerModalProps) {
  const store = useStore()
  const activePlan = store.readingPlan

  const [selectedTier, setSelectedTier] = useState<ReadingPlanTier>(
    activePlan?.tier || 'steady'
  )
  const [customVpd, setCustomVpd] = useState<number>(
    activePlan?.tier === 'custom' ? activePlan.versesPerDay : 3
  )

  const tiers: ReadingPlanTier[] = ['gentle', 'steady', 'intensive', 'custom']

  function handleSavePlan(tier: ReadingPlanTier) {
    const vpd = tier === 'custom' ? customVpd : undefined
    store.updateReadingPlanTier(tier, vpd)
    const config = PLAN_CONFIGS[tier]
    toast.success(`Active plan updated to ${config.name}! 🙏`, {
      description: `Daily target: ${tier === 'custom' ? customVpd : config.versesPerDay} shlokas per day.`,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-6 border-primary/20 bg-background/95 backdrop-blur-xl">
        <DialogHeader className="text-center sm:text-center pb-2">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-saffron-gradient-soft flex items-center justify-center mb-2 border border-primary/20">
            <OmSymbol size={26} className="text-primary" />
          </div>
          <DialogTitle
            className="text-2xl font-bold tracking-tight text-foreground"
            style={{ fontFamily: 'var(--font-cinzel), var(--font-serif-display), serif' }}
          >
            Choose Your Gita Journey
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground/90 max-w-md mx-auto">
            Every pace is sacred. Complete all 700 verses of the Bhagavad Gita at a rhythm that suits your life.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          {tiers.map((tier) => {
            const config = PLAN_CONFIGS[tier]
            const isSelected = selectedTier === tier
            const isActiveCurrent = activePlan?.tier === tier

            const displayVpd = tier === 'custom' ? customVpd : config.versesPerDay
            const displayDays = Math.ceil(700 / displayVpd)
            const displayMonths = (displayDays / 30).toFixed(1)

            return (
              <div
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={cn(
                  'relative rounded-2xl p-4 sm:p-5 border transition-all cursor-pointer flex flex-col justify-between text-left group',
                  isSelected
                    ? 'border-primary shadow-md bg-gradient-to-br from-primary/[0.08] via-card to-card ring-1 ring-primary/40'
                    : 'border-border/60 hover:border-primary/40 bg-card hover:bg-muted/30'
                )}
              >
                {isActiveCurrent && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary text-primary-foreground flex items-center gap-1 shadow-xs">
                    <Check className="w-3 h-3" /> Active
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="text-2xl">{config.icon}</span>
                    <div>
                      <div className="font-bold text-base text-foreground leading-tight">
                        {config.name}
                      </div>
                      <div
                        className="text-xs text-primary font-medium"
                        style={{ fontFamily: 'var(--font-serif-display), serif' }}
                      >
                        {config.sanskritName} · {config.badge}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed mb-4 min-h-[36px]">
                    {config.quote}
                  </p>

                  {tier === 'custom' ? (
                    <div className="space-y-2 py-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Daily Verses:</span>
                        <span className="font-bold text-foreground">{customVpd} / day</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="35"
                        value={customVpd}
                        onChange={(e) => setCustomVpd(parseInt(e.target.value, 10))}
                        className="w-full accent-primary h-1.5 bg-muted rounded-lg cursor-pointer"
                      />
                    </div>
                  ) : null}

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-border/40">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>~{config.minutesPerDay}m / day</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>
                        {displayDays <= 30 ? `${displayDays} Days` : `~${displayMonths} Months`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    size="sm"
                    className={cn(
                      'w-full rounded-xl font-medium transition-all text-xs h-9 cursor-pointer',
                      isSelected
                        ? 'bg-primary text-primary-foreground shadow-xs'
                        : 'bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted'
                    )}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSavePlan(tier)
                    }}
                  >
                    {isActiveCurrent ? 'Keep Active Plan' : `Set as Plan (${displayVpd} / day)`}
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-2 text-center text-xs text-muted-foreground/80 flex items-center justify-center gap-2 pt-2 border-t border-border/40">
          <Compass className="w-3.5 h-3.5 text-primary" />
          <span>You can adjust or recalibrate your pace anytime without losing reading progress.</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
