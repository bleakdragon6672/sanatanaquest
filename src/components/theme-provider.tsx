'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'

// Custom dark themes that need the .dark class for Tailwind's dark: variant
const DARK_THEMES = new Set(['dark', 'amoled', 'temple-gold', 'himalayan-blue', 'forest-green'])

function ThemeClassSync() {
  const { resolvedTheme } = useTheme()
  React.useEffect(() => {
    const html = document.documentElement
    if (resolvedTheme && DARK_THEMES.has(resolvedTheme)) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }, [resolvedTheme])
  return null
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange={false}
      themes={['light', 'dark', 'system', 'amoled', 'temple-gold', 'himalayan-blue', 'forest-green']}
      {...props}
    >
      <ThemeClassSync />
      {children}
    </NextThemesProvider>
  )
}
