import { Check, Sparkles } from 'lucide-react'
import Reveal from './Reveal.jsx'

/**
 * Section Licence / offre payante.
 *
 * MASQUÉE tant que la logique de monétisation n'est pas arrêtée : rendre
 * `enabled={true}` depuis App.jsx suffira à l'afficher. Le bouton d'achat
 * appellera alors `onPurchase` (à brancher sur le futur flux de licence).
 */
const PLANS = [
  {
    name: 'Jema',
    price: 'Gratuit',
    tagline: 'Tout pour écrire, en local.',
    features: ['Éditeur paginé complet', 'Correction niveaux 1 & 2', 'Fiches personnages & lieux', 'Statistiques de base'],
    cta: 'Télécharger',
    href: '#download'
  },
  {
    name: 'Jema Pro',
    price: '—',
    tagline: 'Pour les manuscrits ambitieux.',
    features: [
      'Correction niveau 3 (littéraire)',
      'Sauvegarde cloud chiffrée E2E',
      'Analyses avancées & tics de langage',
      'Multi-appareils autorisés'
    ],
    cta: 'Obtenir une licence',
    highlight: true
  }
]

export default function Pricing({ enabled = false, onPurchase }) {
  if (!enabled) return null

  return (
    <section id="pricing" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <Reveal className="mb-10 text-center">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white"
            style={{ background: 'var(--accent-gradient)' }}
          >
            <Sparkles size={13} /> Licences
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold sm:text-4xl" style={{ color: 'var(--text-primary)' }}>
            Choisissez votre formule
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <div
                className="glass flex h-full flex-col rounded-2xl p-6"
                style={p.highlight ? { boxShadow: 'var(--glass-shadow), 0 0 40px var(--accent-glow)' } : undefined}
              >
                <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {p.name}
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {p.tagline}
                </p>
                <p className="mt-4 text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
                  {p.price}
                </p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <Check size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--success-color)' }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => (p.href ? (window.location.hash = p.href) : onPurchase?.(p.name))}
                  className="mt-6 w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
                  style={
                    p.highlight
                      ? { background: 'var(--accent-gradient)', color: '#fff' }
                      : { background: 'var(--search-bg)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)' }
                  }
                >
                  {p.cta}
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
