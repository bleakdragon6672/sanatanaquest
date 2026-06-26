'use client'

import { Moon, Sun, Monitor, Flame, Mountain, TreePine } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'

const THEMES = [
  { id: 'light', label: 'Light', icon: Sun, description: 'Warm parchment' },
  { id: 'dark', label: 'Dark', icon: Moon, description: 'Midnight temple' },
  { id: 'system', label: 'System', icon: Monitor, description: 'Match OS' },
  { id: 'amoled', label: 'AMOLED', icon: Moon, description: 'Pure black' },
  { id: 'temple-gold', label: 'Temple Gold', icon: Flame, description: 'Rich golden' },
  { id: 'himalayan-blue', label: 'Himalayan Blue', icon: Mountain, description: 'Cool mountain' },
  { id: 'forest-green', label: 'Forest Green', icon: TreePine, description: 'Ashram green' },
]

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-saffron-gradient-soft">
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {THEMES.map((t) => {
          const Icon = t.icon
          return (
            <DropdownMenuItem
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={theme === t.id ? 'bg-saffron-gradient-soft' : ''}
            >
              <Icon className="mr-2 h-4 w-4" />
              <span>{t.label}</span>
              <span className="ml-auto text-[10px] text-muted-foreground">{t.description}</span>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
