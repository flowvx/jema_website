import { Sun, Moon, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import { THEMES, useTheme } from '../context/ThemeContext.jsx'

const ICONS = { light: Sun, dark: Moon, editorial: BookOpen }

/**
 * Sélecteur de thème segmenté — teste les palettes Clair / Sombre / Éditorial
 * en direct, exactement comme dans l'application.
 */
export default function ThemeSwitcher({ compact = false }) {
  const { theme, setTheme } = useTheme()

  return (
    <div
      role="radiogroup"
      aria-label="Choisir un thème"
      className="glass relative flex items-center gap-1 rounded-full p-1"
    >
      {THEMES.map((t) => {
        const Icon = ICONS[t.id]
        const active = theme === t.id
        return (
          <button
            key={t.id}
            role="radio"
            aria-checked={active}
            aria-label={`Thème ${t.label}`}
            title={`Thème ${t.label}`}
            onClick={() => setTheme(t.id)}
            className="relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors"
            style={{ color: active ? '#fff' : 'var(--text-secondary)' }}
          >
            {active && (
              <motion.span
                layoutId="theme-pill"
                className="absolute inset-0 rounded-full"
                style={{ background: 'var(--accent-gradient)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <Icon size={16} className="relative z-10" />
            {!compact && <span className="relative z-10">{t.label}</span>}
          </button>
        )
      })}
    </div>
  )
}
