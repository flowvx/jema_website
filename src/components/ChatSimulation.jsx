import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, MapPin, Users, Send, ArrowUp } from 'lucide-react'

/**
 * Panneau droit « Jema Intelligence » simulé.
 * Dialogue scripté montrant le persona : éditrice chaleureuse et experte,
 * qui répond en s'appuyant sur le manuscrit (sourcing) — comme dans l'app.
 */
const SCRIPT = [
  {
    q: 'Où se passe la scène du chapitre 1 ?',
    a: "Selon le chapitre 1, la scène se déroule dans la cabine d'essayage d'une boutique. Darelle s'y observe dans le miroir pendant que Lucien l'attend à l'extérieur. ✍️"
  },
  {
    q: 'Qui est Lucien pour Darelle ?',
    a: "D'après le manuscrit, Lucien est une figure à la fois attirante et source de tension pour Darelle : un mélange d'attente amoureuse et d'appréhension. Voulez-vous que je crée sa fiche de personnage ?"
  },
  {
    q: 'Oui, crée sa fiche.',
    a: "C'est fait : la fiche personnage « Lucien » est créée. Retrouvez-la dans l'onglet Personnages. ✍️"
  }
]

const SUGGESTIONS = SCRIPT.map((s) => s.q)

export default function ChatSimulation() {
  const [tab, setTab] = useState('ai')
  const [messages, setMessages] = useState([])
  const [step, setStep] = useState(0)
  const [typing, setTyping] = useState(false)
  const scrollerRef = useRef(null)

  useEffect(() => {
    const el = scrollerRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, typing])

  const ask = (text, answer) => {
    if (typing) return
    setMessages((m) => [...m, { role: 'user', text }])
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [...m, { role: 'jema', text: answer }])
      setStep((s) => Math.min(s + 1, SCRIPT.length))
    }, 1100)
  }

  const next = SCRIPT[step]

  return (
    <div className="flex h-full flex-col" style={{ background: 'var(--glass-bg-lighter)' }}>
      {/* En-tête */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: '1px solid var(--glass-border)' }}
      >
        <span
          className="grid h-7 w-7 place-items-center rounded-lg text-white"
          style={{ background: 'var(--accent-gradient)' }}
        >
          <Sparkles size={15} />
        </span>
        <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          Jema Intelligence
        </span>
      </div>

      {/* Onglets */}
      <div className="flex items-center gap-1 px-3 pt-2 text-xs">
        {[
          { id: 'ai', label: 'Jema AI', icon: Sparkles },
          { id: 'chars', label: 'Personnages', icon: Users },
          { id: 'places', label: 'Lieux', icon: MapPin }
        ].map((t) => {
          const active = tab === t.id
          const Icon = t.icon
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 font-medium transition-colors"
              style={{
                color: active ? '#fff' : 'var(--text-secondary)',
                background: active ? 'var(--accent-color)' : 'transparent'
              }}
            >
              <Icon size={12} /> {t.label}
            </button>
          )
        })}
      </div>

      {tab === 'ai' ? (
        <>
          <div ref={scrollerRef} className="flex-1 space-y-3 overflow-auto px-4 py-4">
            {messages.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div
                  className="mb-3 grid h-14 w-14 animate-float place-items-center rounded-2xl text-white"
                  style={{ background: 'var(--accent-gradient)' }}
                >
                  <Sparkles size={24} />
                </div>
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  C'est simple, pose-moi ta question.
                </p>
                <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                  Je connais ton univers, tes personnages et tes lieux.
                </p>
              </div>
            )}

            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className="max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed"
                    style={
                      m.role === 'user'
                        ? { background: 'var(--accent-color)', color: '#fff', borderBottomRightRadius: 6 }
                        : {
                            background: 'var(--ai-bubble-bg)',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--glass-border)',
                            borderBottomLeftRadius: 6
                          }
                    }
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {typing && (
              <div className="flex justify-start">
                <div
                  className="flex items-center gap-1 rounded-2xl px-4 py-3"
                  style={{ background: 'var(--ai-bubble-bg)', border: '1px solid var(--glass-border)' }}
                >
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: 'var(--text-muted)' }}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Suggestions + saisie */}
          <div className="px-3 pb-3">
            {next && (
              <button
                onClick={() => ask(next.q, next.a)}
                disabled={typing}
                className="mb-2 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-medium transition-colors disabled:opacity-50"
                style={{ background: 'var(--search-bg)', color: 'var(--text-secondary)', border: '1px solid var(--glass-border)' }}
              >
                <ArrowUp size={13} style={{ color: 'var(--accent-color)' }} />
                {next.q}
              </button>
            )}
            <div
              className="flex items-center gap-2 rounded-xl px-3 py-2"
              style={{ background: 'var(--search-bg)', border: '1px solid var(--glass-border)' }}
            >
              <input
                readOnly
                value=""
                placeholder="Message à Jema…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:opacity-70"
                style={{ color: 'var(--text-primary)' }}
                onFocus={() => next && ask(next.q, next.a)}
              />
              <button
                onClick={() => next && ask(next.q, next.a)}
                disabled={typing || !next}
                aria-label="Envoyer"
                className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-white disabled:opacity-40"
                style={{ background: 'var(--accent-gradient)' }}
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </>
      ) : (
        <BrowserTab kind={tab} />
      )}
    </div>
  )
}

const CHARS = [
  { name: 'Darelle', role: 'Protagoniste', initial: 'D' },
  { name: 'Lucien', role: 'Intérêt romantique', initial: 'L' },
  { name: 'Marco', role: 'Confident', initial: 'M' }
]
const PLACES = [
  { name: "Cabine d'essayage", role: 'Chapitre 1', initial: 'C' },
  { name: 'La boutique', role: 'Récurrent', initial: 'B' }
]

function BrowserTab({ kind }) {
  const items = kind === 'chars' ? CHARS : PLACES
  return (
    <div className="flex-1 space-y-2 overflow-auto px-3 py-4">
      {items.map((it, i) => (
        <motion.div
          key={it.name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          className="glass flex items-center gap-3 rounded-xl p-3"
        >
          <span
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold text-white"
            style={{ background: 'var(--accent-gradient)' }}
          >
            {it.initial}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              {it.name}
            </p>
            <p className="truncate text-xs" style={{ color: 'var(--text-muted)' }}>
              {it.role}
            </p>
          </div>
        </motion.div>
      ))}
      <p className="px-1 pt-2 text-center text-[11px]" style={{ color: 'var(--text-muted)' }}>
        Fiches détectées et rédigées automatiquement par Jema.
      </p>
    </div>
  )
}
