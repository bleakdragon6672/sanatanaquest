'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface ActionButtonProps {
  icon: LucideIcon
  active?: boolean
  label: string
  onClick: () => void
  shortcut?: string
}

export function ActionButton({ icon: Icon, active, label, onClick, shortcut }: ActionButtonProps) {
  return (
    <Button
      size="icon"
      variant="ghost"
      className={cn(
        'verse-action-btn h-8 w-8 rounded-full transition-all duration-200',
        'hover:scale-110 hover:bg-saffron-gradient-soft',
        'active:scale-95',
        active && 'bg-saffron-gradient-soft text-primary',
      )}
      onClick={onClick}
      title={`${label}${shortcut ? ` (${shortcut})` : ''}`}
    >
      <Icon className={cn('h-4 w-4', active && 'fill-current')} />
      <span className="sr-only">{label}</span>
    </Button>
  )
}

export function ActionButtonRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-0.5">
      {children}
    </div>
  )
}
