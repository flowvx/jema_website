import { motion } from 'framer-motion'
import { Download as DownloadIcon, Play, ShieldCheck, Cpu, WifiOff } from 'lucide-react'

const BADGES = [
  { icon: WifiOff, label: '100 % local' },
  { icon: ShieldCheck, label: 'Chiffré E2E' },
  { icon: Cpu, label: 'IA embarquée' }
]

export default function Hero() {
  return (
    <section id="top" className="relative px-4 pt-32 pb-16 sm:px-6 sm:pt-40">
      <div className="mx-auto max-w-4xl text-center">
        <motion.a
          href="#showcase"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
          style={{ color: 'var(--text-secondary)' }}
        >
          <span className="h-2 w-2 rounded-full" style={{ background: 'var(--success-color)' }} />
          Sanctuaire d'écriture augmenté par l'IA
        </motion.a>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-serif text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl"
          style={{ color: 'var(--text-primary)' }}
        >
          Racontez,
          <br className="hidden sm:block" /> <span className="accent-text">on s'occupe du reste.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed sm:text-lg"
          style={{ color: 'var(--text-secondary)' }}
        >
          Jema est l'éditeur littéraire qui écrit à vos côtés&nbsp;: correction fine, fiches de
          personnages et de lieux générées automatiquement, mémoire de votre univers. Tout reste sur
          votre machine.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#download"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5 sm:w-auto"
            style={{ background: 'var(--accent-gradient)' }}
          >
            <DownloadIcon size={18} /> Télécharger Jema
          </a>
          <a
            href="#showcase"
            className="glass inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5 sm:w-auto"
            style={{ color: 'var(--text-primary)' }}
          >
            <Play size={16} /> Essayer la démo
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {BADGES.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 text-xs font-medium"
              style={{ color: 'var(--text-muted)' }}
            >
              <Icon size={14} /> {label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
