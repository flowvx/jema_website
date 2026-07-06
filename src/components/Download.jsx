import { Download as DownloadIcon, Check } from 'lucide-react'
import Reveal from './Reveal.jsx'

// Icônes OS en SVG inline (marques → tracé neutre monochrome).
const Windows = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M3 5.5 10.5 4.4v7.1H3V5.5Zm0 13 7.5 1.1v-7H3v5.9Zm8.5 1.2L21 21V12.5h-9.5v7.2Zm0-15.4v7.2H21V3l-9.5 1.3Z" />
  </svg>
)
const Apple = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M16.4 12.9c0-2.4 2-3.6 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.6.9-.7 0-1.9-.9-3.1-.8-1.6 0-3 .9-3.8 2.4-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.2 0 2-1.1 2.8-2.2.9-1.3 1.2-2.5 1.3-2.6-.1 0-2.5-1-2.5-3.8ZM14 5.7c.6-.8 1-1.9.9-3-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2.1-.5 2.8-1.3Z" />
  </svg>
)
const Linux = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2c-2 0-3 1.7-3 3.6 0 1.2.1 2.1-.5 3-.7 1-2 2.2-2.6 3.9-.3.8-.2 1.5 0 2-.5.4-.9 1-.6 1.7.2.6.9.7 1.5 1 .5.2.9.6 1.4.9.6.4 1.3.6 2.4.6s1.8-.2 2.4-.6c.5-.3.9-.7 1.4-.9.6-.3 1.3-.4 1.5-1 .3-.7-.1-1.3-.6-1.7.2-.5.3-1.2 0-2-.6-1.7-1.9-2.9-2.6-3.9-.6-.9-.5-1.8-.5-3C15 3.7 14 2 12 2Zm-1.4 4c.3 0 .5.3.5.7s-.2.7-.5.7-.5-.3-.5-.7.2-.7.5-.7Zm2.8 0c.3 0 .5.3.5.7s-.2.7-.5.7-.5-.3-.5-.7.2-.7.5-.7Z" />
  </svg>
)

const PLATFORMS = [
  { os: 'Windows', Icon: Windows, meta: 'Windows 10/11 · .exe', note: 'Installeur < 300 Mo', primary: true },
  { os: 'macOS', Icon: Apple, meta: 'Apple Silicon & Intel · .dmg', note: 'Universel' },
  { os: 'Linux', Icon: Linux, meta: 'AppImage · .deb', note: 'x86_64' }
]

export default function Download() {
  return (
    <section id="download" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-10 text-center">
          <h2 className="font-serif text-3xl font-bold sm:text-4xl" style={{ color: 'var(--text-primary)' }}>
            Installez Jema
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
            Léger à l'installation. Le moteur IA se télécharge en un clic, au premier usage, avec
            votre accord.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {PLATFORMS.map((p, i) => (
            <Reveal key={p.os} delay={i * 0.08}>
              <div
                className="glass flex h-full flex-col items-center rounded-2xl p-6 text-center transition-transform hover:-translate-y-1"
                style={p.primary ? { boxShadow: 'var(--glass-shadow), 0 0 40px var(--accent-glow)' } : undefined}
              >
                <span style={{ color: 'var(--text-primary)' }}>
                  <p.Icon width={40} height={40} />
                </span>
                <h3 className="mt-4 text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {p.os}
                </h3>
                <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                  {p.meta}
                </p>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
                  style={
                    p.primary
                      ? { background: 'var(--accent-gradient)', color: '#fff' }
                      : { background: 'var(--search-bg)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)' }
                  }
                >
                  <DownloadIcon size={16} /> Télécharger
                </a>
                <span className="mt-3 inline-flex items-center gap-1 text-[11px]" style={{ color: 'var(--success-color)' }}>
                  <Check size={12} /> {p.note}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
          Gratuit. Vos manuscrits vous appartiennent — aucune donnée n'est envoyée sans votre accord.
        </p>
      </div>
    </section>
  )
}
