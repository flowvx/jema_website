import { useState } from 'react'
import { Mail, Send, MessageCircle } from 'lucide-react'
import Reveal from './Reveal.jsx'

const CONTACT_EMAIL = 'contact@jema.app'

export default function Contact() {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')

  const mailto = () => {
    const s = encodeURIComponent(subject || 'Retour sur Jema')
    const b = encodeURIComponent(body || '')
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${s}&body=${b}`
  }

  return (
    <section id="contact" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="glass rounded-3xl p-7 sm:p-10">
            <div className="mb-6 flex items-center gap-3">
              <span
                className="grid h-11 w-11 place-items-center rounded-xl text-white"
                style={{ background: 'var(--accent-gradient)' }}
              >
                <MessageCircle size={20} />
              </span>
              <div>
                <h2 className="font-serif text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  Un retour, une question&nbsp;?
                </h2>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Chaque message aide à façonner Jema.
                </p>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                mailto()
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="c-subject" className="mb-1.5 block text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  Sujet
                </label>
                <input
                  id="c-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Une idée, un bug, une suggestion…"
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-shadow focus:ring-2"
                  style={{ background: 'var(--search-bg)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)' }}
                />
              </div>
              <div>
                <label htmlFor="c-body" className="mb-1.5 block text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  Message
                </label>
                <textarea
                  id="c-body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={4}
                  placeholder="Dites-nous tout…"
                  className="w-full resize-none rounded-xl px-4 py-3 text-sm outline-none transition-shadow focus:ring-2"
                  style={{ background: 'var(--search-bg)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)' }}
                />
              </div>
              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                  style={{ background: 'var(--accent-gradient)' }}
                >
                  <Send size={16} /> Ouvrir mon client mail
                </button>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center justify-center gap-2 text-sm font-medium"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <Mail size={15} /> {CONTACT_EMAIL}
                </a>
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
