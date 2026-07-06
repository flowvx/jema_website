import Logo from './Logo.jsx'
import ThemeSwitcher from './ThemeSwitcher.jsx'

export default function Footer() {
  return (
    <footer className="px-4 pb-10 pt-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="glass rounded-3xl px-6 py-8 sm:px-10">
          <div
            className="mt-8 flex flex-col items-center justify-between gap-2 pt-6 text-xs sm:flex-row"
            style={{ borderTop: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}
          >
            <span>© {new Date().getFullYear()} Jema. Tous droits réservés.</span>
            <span>Conçu pour les auteurs · Local-first · Chiffré de bout en bout</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
