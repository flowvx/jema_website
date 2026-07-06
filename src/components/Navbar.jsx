import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download as DownloadIcon } from 'lucide-react'
import Logo from './Logo.jsx'
import ThemeSwitcher from './ThemeSwitcher.jsx'

const LINKS = [
  { href: '#showcase', label: 'Découvrir' },
  { href: '#features', label: 'Fonctions' },
  { href: '#download', label: 'Télécharger' },
  { href: '#contact', label: 'Contact' }
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 transition-all duration-300 sm:px-6 ${
          scrolled ? 'mt-2 rounded-2xl glass' : 'bg-transparent'
        }`}
      >
        <a href="#top" className="shrink-0" aria-label="Accueil Jema">
          <Logo />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-accent"
              style={{ color: 'var(--text-secondary)' }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ThemeSwitcher compact />
          </div>
          <a
            href="#download"
            className="hidden items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5 md:inline-flex"
            style={{ background: 'var(--accent-gradient)' }}
          >
            <DownloadIcon size={16} /> Télécharger
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            className="glass grid h-10 w-10 place-items-center rounded-xl md:hidden"
            style={{ color: 'var(--text-primary)' }}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-4 mt-2 rounded-2xl glass p-3 md:hidden"
          >
            <nav className="flex flex-col">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="mt-2 flex items-center justify-between gap-3 px-1">
              <ThemeSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
