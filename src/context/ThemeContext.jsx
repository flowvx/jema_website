import { createContext, useContext, useEffect, useState, useCallback } from 'react'

/**
 * Thèmes repris de l'application de bureau Jema :
 *   - light     → clair
 *   - dark      → sombre
 *   - editorial → sépia « manuscrit » (mode éditeur)
 * La classe est posée sur <html> (comme dans l'app) ; les tokens CSS suivent.
 */
export const THEMES = [
  { id: 'light', label: 'Clair' },
  { id: 'dark', label: 'Sombre' },
  { id: 'editorial', label: 'Éditorial' }
]

const ThemeContext = createContext(null)

const STORAGE_KEY = 'jema-website-theme'

function initialTheme() {
  if (typeof window === 'undefined') return 'light'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved && THEMES.some((t) => t.id === saved)) return saved
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(initialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark', 'editorial')
    root.classList.add(theme)
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const cycle = useCallback(() => {
    setTheme((cur) => {
      const idx = THEMES.findIndex((t) => t.id === cur)
      return THEMES[(idx + 1) % THEMES.length].id
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycle }}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme doit être utilisé dans <ThemeProvider>')
  return ctx
}
