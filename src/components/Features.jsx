import {
  WifiOff,
  Sparkles,
  Users,
  Search,
  BarChart3,
  Lock,
  FileText,
  Layers
} from 'lucide-react'
import Reveal from './Reveal.jsx'

const FEATURES = [
  {
    icon: WifiOff,
    title: 'Local-first & privé',
    desc: "L'écriture et l'analyse IA tournent sur votre machine. Le cloud n'est qu'une sauvegarde chiffrée de bout en bout, optionnelle."
  },
  {
    icon: Sparkles,
    title: 'Correction à 3 niveaux',
    desc: 'Du simple toilettage orthographique à la reformulation littéraire inspirée de votre style — vous gardez la main.'
  },
  {
    icon: Users,
    title: 'Fiches automatiques',
    desc: "Jema détecte vos personnages et lieux, rédige leurs fiches et tient à jour une mémoire temporelle et spatiale."
  },
  {
    icon: Search,
    title: 'Assistant contextuel',
    desc: "Ctrl+J invoque Jema n'importe où. Elle répond en s'appuyant sur votre manuscrit, avec les sources citées."
  },
  {
    icon: FileText,
    title: 'Éditeur paginé',
    desc: "Un empilement de feuilles A4 comme sur papier, marges et formats ajustables. Vos notes inline sont préservées."
  },
  {
    icon: BarChart3,
    title: 'Statistiques d’écriture',
    desc: 'Mots par jour, jour le plus productif, tics de langage, top 5 des mots — votre productivité en un coup d’œil.'
  },
  {
    icon: Lock,
    title: 'Manuscrit inviolable',
    desc: 'Verrouillage par mot de passe local (Bcrypt), suppression protégée. Votre travail ne se perd jamais par erreur.'
  },
  {
    icon: Layers,
    title: 'Multilingue',
    desc: "Pensée pour écrire dans votre langue. Recherche sémantique et lexicale fusionnées pour tout retrouver."
  }
]

export default function Features() {
  return (
    <section id="features" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-10 text-center">
          <h2 className="font-serif text-3xl font-bold sm:text-4xl" style={{ color: 'var(--text-primary)' }}>
            Tout un atelier, discret et puissant
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
            L'IA reste à portée de main sans jamais interrompre le fil de votre écriture.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 4) * 0.06}>
              <div className="glass group h-full rounded-2xl p-5 transition-transform hover:-translate-y-1">
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl text-white"
                  style={{ background: 'var(--accent-gradient)' }}
                >
                  <f.icon size={20} />
                </span>
                <h3 className="mt-4 text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {f.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
