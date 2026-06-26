'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'

// Syncs data-theme attribute with 'dark' class for CSS compatibility
function ThemeSync() {
  const { resolvedTheme } = useTheme()
  React.useEffect(() => {
    if (resolvedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
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
      attribute="data-theme"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange={false}
      themes={['light', 'dark', 'system', 'amoled', 'temple-gold', 'himalayan-blue', 'forest-green']}
      {...props}
    >
      <ThemeSync />
      {children}
    </NextThemesProvider>
  )
}
